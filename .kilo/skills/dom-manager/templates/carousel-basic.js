// carousel-basic.js
/**
 * Basic carousel/slider component for landing pages
 */

/**
 * Initializes a basic carousel
 * @param {Object} options - Configuration options
 * @param {string} [options.selector] - Selector for carousel container (default: '.carousel')
 * @param {string} [options.slideSelector] - Selector for slides (default: '.carousel-slide')
 * @param {number} [options.autoplayDelay] - Delay between slides in ms (0 to disable, default: 3000)
 * @param {boolean} [options.showNavigation] - Whether to show navigation arrows (default: true)
 * @param {boolean} [options.showDots] - Whether to show dot indicators (default: true)
 * @param {boolean} [options.pauseOnHover] - Whether to pause autoplay on hover (default: true)
 */
function initCarousel(options = {}) {
  const defaults = {
    selector: '.carousel',
    slideSelector: '.carousel-slide',
    autoplayDelay: 3000,
    showNavigation: true,
    showDots: true,
    pauseOnHover: true
  };
  
  const config = { ...defaults, ...options };
  
  document.querySelectorAll(config.selector).forEach(carousel => {
    const slides = carousel.querySelectorAll(config.slideSelector);
    if (slides.length === 0) return;
    
    let currentIndex = 0;
    let autoplayTimer = null;
    
    // Create navigation elements if needed
    if (config.showNavigation) {
      const prevButton = document.createElement('button');
      prevButton.className = 'carousel-nav prev';
      prevButton.innerHTML = '&lt;';
      prevButton.setAttribute('aria-label', 'Previous slide');
      
      const nextButton = document.createElement('button');
      nextButton.className = 'carousel-nav next';
      nextButton.innerHTML = '&gt;';
      nextButton.setAttribute('aria-label', 'Next slide');
      
      carousel.appendChild(prevButton);
      carousel.appendChild(nextButton);
    }
    
    // Create dots if needed
    if (config.showDots) {
      const dotsContainer = document.createElement('div');
      dotsContainer.className = 'carousel-dots';
      
      slides.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.className = 'carousel-dot';
        dot.setAttribute('aria-label', `Slide ${index + 1}`);
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
      });
      
      carousel.appendChild(dotsContainer);
    }
    
    // Update slide visibility
    function updateSlides() {
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
      });
      
      // Update dots
      const dots = carousel.querySelectorAll('.carousel-dot');
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
      });
    }
    
    // Go to specific slide
    function goToSlide(index) {
      currentIndex = (index + slides.length) % slides.length;
      updateSlides();
    }
    
    // Go to next slide
    function nextSlide() {
      goToSlide(currentIndex + 1);
    }
    
    // Go to previous slide
    function prevSlide() {
      goToSlide(currentIndex - 1);
    }
    
    // Start autoplay
    function startAutoplay() {
      if (config.autoplayDelay > 0) {
        autoplayTimer = setInterval(nextSlide, config.autoplayDelay);
      }
    }
    
    // Stop autoplay
    function stopAutoplay() {
      if (autoplayTimer) {
        clearInterval(autoplayTimer);
        autoplayTimer = null;
      }
    }
    
    // Event listeners
    if (config.showNavigation) {
      carousel.querySelector('.carousel-nav.prev').addEventListener('click', (e) => {
        e.stopPropagation();
        prevSlide();
        if (config.pauseOnHover) stopAutoplay();
      });
      
      carousel.querySelector('.carousel-nav.next').addEventListener('click', (e) => {
        e.stopPropagation();
        nextSlide();
        if (config.pauseOnHover) stopAutoplay();
      });
    }
    
    // Pause on hover
    if (config.pauseOnHover && config.autoplayDelay > 0) {
      carousel.addEventListener('mouseenter', stopAutoplay);
      carousel.addEventListener('mouseleave', startAutoplay);
    }
    
    // Touch support (basic)
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', e => {
      touchStartX = e.changedTouches[0].screenX;
    });
    
    carousel.addEventListener('touchend', e => {
      touchEndX = e.changedTouches[0].screenX;
      const diff = touchStartX - touchEndX;
      
      if (Math.abs(diff) > 50) { // threshold
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
        if (config.pauseOnHover) stopAutoplay();
      }
    });
    
    // Initialize
    updateSlides();
    startAutoplay();
  });
}

// Usage examples:
// initCarousel();
// initCarousel({
//   selector: '#hero-carousel',
//   autoplayDelay: 5000,
//   showNavigation: false,
//   pauseOnHover: false
// });