# DOM Manager Skill Instructions

This skill provides expert knowledge for DOM manipulation specifically tailored for landing pages. It covers selecting elements, traversing and modifying the DOM, handling events, working with classes and styles, creating dynamic content, animating elements, validating forms, implementing lazy loading, managing scroll events, using observers, and performance best practices.

## Selecting Elements

### getElementById
```javascript
const element = document.getElementById('elementId');
```

### querySelector (single element)
```javascript
const element = document.querySelector('.className');
// or
const element = document.querySelector('#elementId');
// or
const element = document.querySelector('div > p');
```

### querySelectorAll (multiple elements)
```javascript
const elements = document.querySelectorAll('.className');
// Returns a NodeList (array-like)
```

## Traversing and Modifying the DOM Tree

### Getting Related Nodes
```javascript
const parent = element.parentNode;
const children = element.children; // HTMLCollection
const firstChild = element.firstChild;
const lastChild = element.lastChild;
const nextSibling = element.nextSibling;
const previousSibling = element.previousSibling;
```

### Creating and Inserting Elements
```javascript
// Create a new element
const newElement = document.createElement('div');
// Set attributes
newElement.setAttribute('class', 'my-class');
// Or using property
newElement.className = 'my-class';

// Insert as last child
parentElement.appendChild(newElement);
// Insert as first child
parentElement.insertBefore(newElement, parentElement.firstChild);
// Insert before a reference element
parentElement.insertBefore(newElement, referenceElement);
// Insert after a reference element
parentElement.insertBefore(newElement, referenceElement.nextSibling);
```

### Removing Elements
```javascript
element.parentNode.removeChild(element);
// Modern way (if supported)
element.remove();
```

### Replacing Elements
```javascript
parentElement.replaceChild(newElement, oldElement);
// Modern way
element.replaceWith(newElement);
```

## Handling Events

### Adding Event Listeners
```javascript
element.addEventListener('click', function(event) {
  console.log('Element clicked');
});

// Using arrow function
element.addEventListener('mouseover', (event) => {
  console.log('Mouse over element');
});
```

### Event Delegation
```javascript
// Instead of adding listeners to each child, add to parent
document.getElementById('parent').addEventListener('click', function(event) {
  if (event.target.matches('.child-button')) {
    console.log('Child button clicked');
  }
});
```

### Preventing Default Behavior
```javascript
element.addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission
  // Handle form via AJAX
});
```

### Stopping Propagation
```javascript
element.addEventListener('click', function(event) {
  event.stopPropagation(); // Prevent event from bubbling up
  // Handle click only on this element
});
```

## Working with Classes and Styles

### classList API
```javascript
// Add a class
element.classList.add('active');
// Remove a class
element.classList.remove('active');
// Toggle a class
element.classList.toggle('active');
// Check if element has a class
if (element.classList.contains('active')) {
  // Do something
}
```

### Inline Styles
```javascript
// Set style
element.style.color = 'red';
element.style.fontSize = '16px';
// Get style (only inline styles)
console.log(element.style.color);
// To get computed styles:
const computedStyle = window.getComputedStyle(element);
console.log(computedStyle.color);
```

## Creating Dynamic Content

### innerHTML
```javascript
// Setting content (be cautious of XSS)
element.innerHTML = '<p>New paragraph</p>';
// Appending content
element.innerHTML += '<p>Another paragraph</p>';
```

### insertAdjacentHTML (safer for inserting at specific positions)
```javascript
element.insertAdjacentHTML('beforebegin', '<p>Before element</p>');
element.insertAdjacentHTML('afterbegin', '<p>Inside element, at the beginning</p>');
element.insertAdjacentHTML('beforeend', '<p>Inside element, at the end</p>');
element.insertAdjacentHTML('afterend', '<p>After element</p>');
```

### Using Templates (template element)
```html
<template id="my-template">
  <div class="item">
    <h3></h3>
    <p></p>
  </div>
</template>
```
```javascript
const template = document.getElementById('my-template');
const clone = template.content.cloneNode(true);
clone.querySelector('h3').textContent = 'Title';
clone.querySelector('p').textContent = 'Description';
document.getElementById('container').appendChild(clone);
```

## Animating Elements

### CSS Transitions (via class changes)
```css
/* In CSS */
.element {
  transition: all 0.3s ease;
}
.element.active {
  transform: scale(1.1);
  opacity: 0.8;
}
```
```javascript
// In JavaScript
element.classList.add('active');
```

### CSS Keyframes
```css
/* In CSS */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
.element {
  animation: fadeIn 0.5s forwards;
}
```
```javascript
// Trigger by adding a class
element.classList.add('fade-in');
```

### requestAnimationFrame (for custom animations)
```javascript
function animate() {
  // Update animation state
  // ...
  requestAnimationFrame(animate);
}
// Start animation
requestAnimationFrame(animate);
```

### GSAP Basics (if included)
```javascript
// Import GSAP (if available)
// import { gsap } from "gsap";
// gsap.to(element, { duration: 1, x: 100, opacity: 0.5 });
```

## Form Validation

### Input Events
```javascript
const input = document.getElementById('email');
input.addEventListener('input', function(event) {
  const value = event.target.value;
  // Validate value
  if (!validateEmail(value)) {
    input.setCustomValidity('Please enter a valid email');
  } else {
    input.setCustomValidity(''); // Clear error
  }
});
```

### Regex Validation
```javascript
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
```

### Custom Validation Messages
```javascript
form.addEventListener('submit', function(event) {
  if (!form.checkValidity()) {
    event.preventDefault();
    // Show custom messages
  }
});
```

## Lazy Loading

### Intersection Observer
```javascript
const images = document.querySelectorAll('img[data-src]');
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    }
  });
});

images.forEach(img => {
  observer.observe(img);
});
```

### native lazy loading
```html
<img src="image.jpg" loading="lazy" alt="Description">
```

## Scroll Events

### Basic Scroll Listener
```javascript
window.addEventListener('scroll', function() {
  console.log(window.scrollY);
});
```

### Smooth Scroll
```javascript
// Using scrollTo with behavior
window.scrollTo({
  top: 1000,
  behavior: 'smooth'
});

// For anchor links (with CSS)
/* In CSS */
html {
  scroll-behavior: smooth;
}
```

### ScrollSpy (highlighting nav links based on scroll position)
```javascript
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

function activateNavLink() {
  let index = sections.length;
  
  while (--index && window.scrollY + 50 < sections[index].offsetTop) {}
  
  navLinks.forEach(link => link.classList.remove('active'));
  navLinks[index].classList.add('active');
}

window.addEventListener('scroll', activateNavLink);
activateNavLink(); // Call on load
```

## Observers

### Intersection Observer (as above for lazy loading)
```javascript
const observer = new IntersectionObserver(callback, options);
```

### Resize Observer
```javascript
const resizeObserver = new ResizeObserver(entries => {
  for (let entry of entries) {
    console.log('Element resized:', entry.contentRect);
  }
});

resizeObserver.observe(element);
// To disconnect
// resizeObserver.disconnect();
```

### Mutation Observer
```javascript
const mutationObserver = new MutationObserver(mutations => {
  mutations.forEach(mutation => {
    console.log(mutation);
  });
});

// Configuration
const config = { attributes: true, childList: true, subtree: true };

// Start observing
mutationObserver.observe(targetNode, config);

// Later, can stop observing
// mutationObserver.disconnect();
```

## Performance Best Practices

### Avoid Layout Thrashing
```javascript
// Bad: reading and writing in a loop causes layout thrashing
for (let i = 0; i < elements.length; i++) {
  elements[i].style.top = elements[i].offsetTop + 10 + 'px';
}

// Good: read first, then write
const tops = [];
for (let i = 0; i < elements.length; i++) {
  tops.push(elements[i].offsetTop);
}
for (let i = 0; i < elements.length; i++) {
  elements[i].style.top = tops[i] + 10 + 'px';
}
```

### Use DocumentFragment for Bulk Insertions
```javascript
const fragment = document.createDocumentFragment();
for (let i = 0; i < 100; i++) {
  const li = document.createElement('li');
  li.textContent = `Item ${i}`;
  fragment.appendChild(li);
}
document.getElementById('list').appendChild(fragment);
```

### Debounce and Throttle
See templates/debounce-throttle.js

### Request Animation Frame for Visual Changes
```javascript
function onScroll() {
  // Instead of direct style changes that may cause layout thrashing
  requestAnimationFrame(() => {
    // Update styles here
  });
}
window.addEventListener('scroll', onScroll);
```

## Common Pitfalls and Cross-Browser Compatibility

### Pitfall 1: Forgetting to wait for DOMContentLoaded
```javascript
// Bad: script in head trying to access elements
// Good: either put script at end of body or wait for DOMContentLoaded
document.addEventListener('DOMContentLoaded', function() {
  // DOM is ready
});
```

### Pitfall 2: Using innerHTML unsafely (XSS risk)
```javascript
// Bad: inserting user input directly
element.innerHTML = userInput;

// Good: sanitize or use textContent for text
element.textContent = userInput;
// Or use a library like DOMPurify for HTML
```

### Pitfall 3: Not cleaning up event listeners and observers
```javascript
// Always clean up when element is removed or component unmounts
element.removeEventListener('click', handler);
observer.disconnect();
```

### Cross-Browser Tips
- Use feature detection instead of browser detection
- Consider polyfills for newer APIs (like Intersection Observer) for older browsers
- Test in target browsers
- Use CSS prefixes when necessary (or use tools like Autoprefixer)