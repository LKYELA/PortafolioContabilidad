// add-event-listener.js
/**
 * Adds an event listener to an element
 * @param {Element|string} element - The element or CSS selector
 * @param {string} eventType - The type of event (e.g., 'click', 'mouseover')
 * @param {Function} handler - The function to call when event occurs
 * @param {Object} options - Optional options object (useCapture, passive, etc.)
 * @returns {Element} - The element for chaining
 */
function addEventListener(element, eventType, handler, options) {
  const el = typeof element === 'string' ? document.querySelector(element) : element;
  if (el) {
    el.addEventListener(eventType, handler, options);
  }
  return el;
}

// Usage examples:
// addEventListener('#myButton', 'click', () => console.log('Clicked'));
// addEventListener('.menu-item', 'mouseover', handler, { passive: true });