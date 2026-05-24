// infinite-scroll.js
/**
 * Infinite scroll implementation for landing pages
 */

/**
 * Sets up infinite scroll functionality
 * @param {Object} options - Configuration options
 * @param {string} [options.containerSelector] - Selector for scroll container (default: window)
 * @param {string} [options.itemSelector] - Selector for items to monitor (default: '.infinite-scroll-item')
 * @param {Function} options.loadMoreItems - Function to call when more items are needed
 * @param {number} [options.threshold] - Pixels from bottom to trigger load (default: 200)
 * @param {boolean} [options.hasMore] - Whether more items are available (default: true)
 */
function initInfiniteScroll(options = {}) {
  const defaults = {
    containerSelector: window,
    itemSelector: '.infinite-scroll-item',
    threshold: 200,
    hasMore: true
  };
  
  const config = { ...defaults, ...options };
  
  if (!options.loadMoreItems || typeof options.loadMoreItems !== 'function') {
    throw new Error('loadMoreItems function is required');
  }
  
  const container = config.containerSelector === window ? window : document.querySelector(config.containerSelector);
  if (!container) {
    throw new Error('Container not found');
  }
  
  let isLoading = false;
  
  function checkScroll() {
    if (!config.hasMore || isLoading) return;
    
    const containerHeight = container === window ? 
      window.innerHeight : 
      container.getBoundingClientRect().height;
    
    const scrollPosition = container === window ?
      window.pageYOffset :
      container.scrollTop;
    
    const containerScrollHeight = container === window ?
      document.documentElement.scrollHeight :
      container.scrollHeight;
    
    const distanceFromBottom = containerScrollHeight - scrollPosition - containerHeight;
    
    if (distanceFromBottom < config.threshold) {
      loadMore();
    }
  }
  
  async function loadMore() {
    isLoading = true;
    
    try {
      await config.loadMoreItems();
    } catch (error) {
      console.error('Error loading more items:', error);
    } finally {
      isLoading = false;
    }
  }
  
  // Set up scroll listener
  container.addEventListener('scroll', checkScroll);
  
  // Initial check in case content already exceeds viewport
  checkScroll();
  
  // Return cleanup function
  return function destroy() {
    container.removeEventListener('scroll', checkScroll);
  };
}

// Usage examples:
// const destroyInfiniteScroll = initInfiniteScroll({
//   loadMoreItems: async () => {
//     const response = await fetch('/api/items?offset=' + currentOffset);
//     const items = await response.json();
//     // Append items to container
//     items.forEach(item => {
//       const div = document.createElement('div');
//       div.className = 'infinite-scroll-item';
//       div.textContent = item.title;
//       document.getElementById('items-container').appendChild(div);
//     });
//     currentOffset += items.length;
//     // Check if we've reached the end
//     if (items.length === 0) {
//       // No more items
//     }
//   },
//   threshold: 150
// });
//
// // To destroy when no longer needed:
// // destroyInfiniteScroll();