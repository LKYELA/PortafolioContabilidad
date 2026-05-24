// smooth-scroll.js
/**
 * Smooth scroll utilities for landing pages
 */

/**
 * Smoothly scroll to an element
 * @param {Element|string} target - The target element or CSS selector
 * @param {Object} options - Scroll options
 * @param {number} [options.offset] - Offset in pixels from the target
 * @param {string} [options.behavior] - Scroll behavior ('smooth' or 'auto')
 * @param {number} [options.duration] - Duration in milliseconds for custom animation
 */
function smoothScrollTo(target, options = {}) {
  const el = typeof target === 'string' ? document.querySelector(target) : target;
  if (!el) return;
  
  const defaults = {
    offset: 0,
    behavior: 'smooth',
    duration: null
  };
  
  const config = { ...defaults, ...options };
  
  const elementPosition = el.getBoundingClientRect().top;
  const offsetPosition = elementPosition + window.pageYOffset + config.offset;
  
  if (config.behavior === 'smooth' && 'scrollBehavior' in document.documentElement.style) {
    // Use native smooth scroll if supported
    window.scrollTo({
      top: offsetPosition,
      behavior: config.behavior
    });
  } else if (config.duration) {
    // Custom animated scroll
    const startPosition = window.pageYOffset;
    const distance = offsetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / config.duration, 1);
      
      // Easing function (easeInOutCubic)
      const easeProgress = progress < 0.5 
        ? 4 * progress * progress * progress 
        : 1 - Math.pow(-2 * progress + 2, 3) / 2;
      
      window.scrollTo(0, startPosition + distance * easeProgress);
      
      if (timeElapsed < config.duration) {
        requestAnimationFrame(animation);
      }
    }
    
    requestAnimationFrame(animation);
  } else {
    // Instant scroll
    window.scrollTo(0, offsetPosition);
  }
}

/**
 * Add smooth scroll behavior to anchor links
 * @param {string} selector - CSS selector for anchor links (default: 'a[href^="#"]')
 * @param {Object} options - Scroll options (same as smoothScrollTo)
 */
function enableSmoothScroll(selector = 'a[href^="#"]', options = {}) {
  document.querySelectorAll(selector).forEach(link => {
    link.addEventListener('click', function(e) {
      // Only prevent default if it's an anchor link to same page
      if (this.getAttribute('href').startsWith('#') && 
          this.getAttribute('href') !== '#') {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          smoothScrollTo(targetElement, options);
        }
      }
    });
  });
}

/**
 * Scroll to top button functionality
 * @param {Object} options - Options object
 * @param {string} [options.buttonSelector] - Selector for scroll to top button
 * @param {number} [options.offset] - Scroll offset before showing button (default: 300)
 * @param {Object} [options.scrollOptions] - Options passed to smoothScrollTo
 */
function scrollToTop(options = {}) {
  const defaults = {
    buttonSelector: '.scroll-to-top',
    offset: 300,
    scrollOptions: { behavior: 'smooth' }
  };
  
  const config = { ...defaults, ...options };
  const button = document.querySelector(config.buttonSelector);
  
  if (!button) return;
  
  // Show/hide button based on scroll position
  function toggleButton() {
    if (window.pageYOffset > config.offset) {
      button.classList.add('visible');
    } else {
      button.classList.remove('visible');
    }
  }
  
  // Scroll to top when button clicked
  button.addEventListener('click', function(e) {
    e.preventDefault();
    smoothScrollTo(document.documentElement, config.scrollOptions);
  });
  
  // Initial check and scroll listener
  toggleButton();
  window.addEventListener('scroll', toggleButton);
}

// Usage examples:
// Basic smooth scroll to element
// smoothScrollTo('#section-2', { offset: -20 });
//
// Enable smooth scroll for all anchor links
// enableSmoothScroll('a[href^="#"]', { offset: -70, duration: 800 });
//
// Scroll to top button
// scrollToTop({ 
//   buttonSelector: '#top-btn',
//   offset: 200,
//   scrollOptions: { behavior: 'smooth', duration: 500 }
// });