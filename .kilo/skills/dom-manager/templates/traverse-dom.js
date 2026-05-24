// traverse-dom.js
/**
 * DOM traversal utilities
 */

/**
 * Get parent element matching a selector
 * @param {Element} element - Starting element
 * @param {string} selector - CSS selector to match
 * @returns {Element|null} - Matching parent or null
 */
function closestParent(element, selector) {
  if (!element) return null;
  if (element.matches(selector)) return element;
  return closestParent(element.parentNode, selector);
}

/**
 * Get all children matching a selector
 * @param {Element} element - Parent element
 * @param {string} selector - CSS selector to match
 * @returns {Element[]} - Array of matching children
 */
function getChildren(element, selector) {
  if (!element) return [];
  return Array.from(element.children).filter(child => 
    child.matches ? child.matches(selector) : false
  );
}

/**
 * Get next sibling element matching a selector
 * @param {Element} element - Starting element
 * @param {string} selector - CSS selector to match
 * @returns {Element|null} - Matching next sibling or null
 */
function nextSibling(element, selector) {
  if (!element) return null;
  let sibling = element.nextElementSibling;
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.nextElementSibling;
  }
  return null;
}

/**
 * Get previous sibling element matching a selector
 * @param {Element} element - Starting element
 * @param {string} selector - CSS selector to match
 * @returns {Element|null} - Matching previous sibling or null
 */
function previousSibling(element, selector) {
  if (!element) return null;
  let sibling = element.previousElementSibling;
  while (sibling) {
    if (sibling.matches(selector)) return sibling;
    sibling = sibling.previousElementSibling;
  }
  return null;
}

/**
 * Get first child element matching a selector
 * @param {Element} element - Parent element
 * @param {string} selector - CSS selector to match
 * @returns {Element|null} - Matching first child or null
 */
function firstChild(element, selector) {
  if (!element) return null;
  for (const child of element.children) {
    if (child.matches(selector)) return child;
  }
  return null;
}

/**
 * Get last child element matching a selector
 * @param {Element} element - Parent element
 * @param {string} selector - CSS selector to match
 * @returns {Element|null} - Matching last child or null
 */
function lastChild(element, selector) {
  if (!element) return null;
  for (let i = element.children.length - 1; i >= 0; i--) {
    const child = element.children[i];
    if (child.matches(selector)) return child;
  }
  return null;
}

// Export for use in other modules (if using ES modules)
// export { closestParent, getChildren, nextSibling, previousSibling, firstChild, lastChild };