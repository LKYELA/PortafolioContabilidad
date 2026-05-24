// intersection-observer.js
/**
 * Creates an Intersection Observer for lazy loading or visibility detection
 * @param {Function} callback - Function to call when elements intersect
 * @param {Object} options - Observer options
 * @param {Object} [options.root] - The element that is used as the viewport
 * @param {string|string[]} [options.rootMargin] - Margin around the root
 * @param {number} [options.threshold] - Visibility ratio (0-1) or array of ratios
 * @returns {IntersectionObserver} - The observer instance
 */
function createIntersectionObserver(callback, options = {}) {
  const defaults = {
    root: null, // viewport
    rootMargin: '0px',
    threshold: 0.1 // 10% visibility
  };
  
  const config = { ...defaults, ...options };
  return new IntersectionObserver(callback, config);
}

/**
 * Lazy loads images using Intersection Observer
 * @param {string|NodeList} selector - CSS selector or NodeList of images
 * @param {Object} options - Observer options
 */
function lazyLoadImages(selector, options = {}) {
  const images = typeof selector === 'string' 
    ? document.querySelectorAll(selector) 
    : selector;
  
  if (!images.length) return;
  
  const observer = createIntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Load the actual image from data-src attribute
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        // Optional: load srcset for responsive images
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }
        obs.unobserve(img);
      }
    });
  }, options);
  
  images.forEach(img => {
    observer.observe(img);
  });
  
  return observer;
}

// Usage examples:
// Basic intersection observer for visibility detection
// const observer = createIntersectionObserver((entries) => {
//   entries.forEach(entry => {
//     if (entry.isIntersecting) {
//       console.log('Element is visible');
//       entry.target.classList.add('visible');
//     }
//   });
// }, { threshold: 0.5 });
// observer.observe(document.querySelector('#myElement'));

// Lazy loading images
// lazyLoadImages('img[data-src]');
// lazyLoadImages('.lazy-load', { threshold: 0.2, rootMargin: '50px' });