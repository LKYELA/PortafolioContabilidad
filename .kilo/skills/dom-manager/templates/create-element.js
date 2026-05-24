// create-element.js
/**
 * Creates an element with optional attributes, classes, and content
 * @param {string} tag - The HTML tag name (e.g., 'div', 'p', 'section')
 * @param {Object} options - Options object
 * @param {Object} [options.attributes] - Key-value pairs of attributes
 * @param {string|string[]} [options.classes] - Class name(s) to add
 * @param {string} [options.text] - Text content (uses textContent)
 * @param {string} [options.html] - HTML content (uses innerHTML, use with caution)
 * @param {Node[]} [options.children] - Child nodes to append
 * @returns {Element} - The created element
 */
function createElement(tag, options = {}) {
  const element = document.createElement(tag);
  
  // Set attributes
  if (options.attributes) {
    Object.entries(options.attributes).forEach(([key, value]) => {
      if (value === false) return; // Skip false values
      if (value === true) {
        element.setAttribute(key, ''); // Boolean attribute
      } else {
        element.setAttribute(key, value);
      }
    });
  }
  
  // Add classes
  if (options.classes) {
    const classes = Array.isArray(options.classes) ? options.classes : [options.classes];
    element.classList.add(...classes);
  }
  
  // Set text content
  if (options.text !== undefined && options.text !== null) {
    element.textContent = options.text;
  }
  
  // Set HTML content (be cautious of XSS)
  if (options.html !== undefined && options.html !== null) {
    element.innerHTML = options.html;
  }
  
  // Append children
  if (options.children) {
    const children = Array.isArray(options.children) ? options.children : [options.children];
    children.forEach(child => {
      if (child instanceof Node) {
        element.appendChild(child);
      } else if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      }
    });
  }
  
  return element;
}

// Usage examples:
// const div = createElement('div', {
//   attributes: { id: 'myDiv', 'data-value': 42 },
//   classes: ['container', 'box'],
//   text: 'Hello World',
//   children: [
//     createElement('span', { text: 'Child' })
//   ]
// });