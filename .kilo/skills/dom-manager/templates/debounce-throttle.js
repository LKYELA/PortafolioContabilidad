// debounce-throttle.js
/**
 * Debounce function: returns a function that, as long as it continues to be invoked, 
 * will not be triggered. The function will be called after it stops being called for 
 * N milliseconds. If `immediate` is true, trigger the function on the leading edge, 
 * instead of the trailing.
 * @param {Function} func - The function to debounce
 * @param {number} wait - The number of milliseconds to delay
 * @param {boolean} immediate - Whether to trigger on the leading edge
 * @returns {Function} - A debounced version of the function
 */
function debounce(func, wait, immediate) {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    const later = function() {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

/**
 * Throttle function: returns a function that, when invoked, will only trigger the 
 * original function at most once per every wait milliseconds.
 * @param {Function} func - The function to throttle
 * @param {number} wait - The number of milliseconds to throttle (minimum interval)
 * @returns {Function} - A throttled version of the function
 */
function throttle(func, wait) {
  let context, args, timeout, result;
  let previous = 0;
  return function() {
    const now = Date.now();
    const remaining = wait - (now - previous);
    context = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = now;
      result = func.apply(context, args);
      context = args = null;
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now();
        timeout = null;
        result = func.apply(context, args);
        context = args = null;
      }, remaining);
    }
    return result;
  };
}

// Usage examples:
// const debouncedResize = debounce(() => {
//   console.log('Window resized');
// }, 250);
// window.addEventListener('resize', debouncedResize);
//
// const throttledScroll = throttle(() => {
//   console.log('Window scrolled');
// }, 100);
// window.addEventListener('scroll', throttledScroll);