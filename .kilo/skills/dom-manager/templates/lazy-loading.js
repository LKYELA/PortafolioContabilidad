// lazy-loading.js
/**
 * Lazy loading utilities using Intersection Observer and native lazy loading
 */

/**
 * Lazy loads images with Intersection Observer fallback for browsers that don't support native lazy loading
 * @param {Object} options - Configuration options
 * @param {string} [options.selector] - CSS selector for images to lazy load (default: 'img[loading="lazy"], img[data-src]')
 * @param {Object} [options.observerOptions] - Options for Intersection Observer
 */
function lazyLoad(options = {}) {
  const defaults = {
    selector: 'img[loading="lazy"], img[data-src]',
    observerOptions: {
      rootMargin: '50px',
      threshold: 0.01
    }
  };
  
  const config = { ...defaults, ...options };
  
  // Check if native lazy loading is supported
  const supportsLazyLoading = 'loading' in HTMLImageElement.prototype;
  
  if (supportsLazyLoading) {
    // Just add loading attribute if not present (for images that might have it via JS)
    document.querySelectorAll(config.selector).forEach(img => {
      if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
      }
    });
    return;
  }
  
  // Fallback to Intersection Observer for older browsers
  const images = document.querySelectorAll(config.selector);
  
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        // Load from data-src if available
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        // Load srcset if available
        if (img.dataset.srcset) {
          img.srcset = img.dataset.srcset;
          img.removeAttribute('data-srcset');
        }
        // Remove the lazy loading class if present
        img.classList.remove('lazy');
        obs.unobserve(img);
      }
    });
  }, config.observerOptions);
  
  images.forEach(img => {
    // Only observe if we need to load via JS (has data-src or data-srcset)
    if (img.dataset.src || img.dataset.srcset) {
      observer.observe(img);
    }
    // Add a class for styling placeholder state if needed
    img.classList.add('lazy');
  });
  
  return observer;
}

/**
 * Creates a placeholder for lazy loaded elements
 * @param {Object} options - Placeholder options
 * @param {number} [options.width] - Width of placeholder
 * @param {number} [options.height] - Height of placeholder
 * @param {string} [options.backgroundColor] - Background color
 * @returns {string} - SVG placeholder as data URL
 */
function createPlaceholder(options = {}) {
  const defaults = {
    width: 100,
    height: 100,
    backgroundColor: '#eee'
  };
  
  const config = { ...defaults, ...options };
  
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" width="${config.width}" height="${config.height}">
      <rect width="100%" height="100%" fill="${config.backgroundColor}"/>
    </svg>
  `;
  
  return `data:image/svg+xml;base64,${btoa(svg)}`;
}

// Usage examples:
// Basic lazy loading with Intersection Observer fallback
// lazyLoad();
//
// Custom selector and options
// lazyLoad({
//   selector: '.lazy-img',
//   observerOptions: {
//     rootMargin: '100px',
//     threshold: 0.05
//   }
// });
//
// Creating a placeholder
// const placeholder = createPlaceholder({ width: 200, height: 150, backgroundColor: '#f0f0f0' });