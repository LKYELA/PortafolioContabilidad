// modal.js
/**
 * Modal/popup component for landing pages
 */

/**
 * Creates and manages a modal
 * @param {Object} options - Configuration options
 * @param {string} [options.content] - HTML content for the modal
 * @param {string} [options.title] - Title for the modal
 * @param {boolean} [options.closeOnClickOutside] - Whether clicking outside closes modal (default: true)
 * @param {boolean} [options.closeOnEscape] - Whether pressing Escape closes modal (default: true)
 * @returns {Object} - Modal instance with open/close methods
 */
function createModal(options = {}) {
  const defaults = {
    content: '',
    title: '',
    closeOnClickOutside: true,
    closeOnEscape: true
  };
  
  const config = { ...defaults, ...options };
  
  // Create modal element if it doesn't exist
  let modal = document.getElementById('kilo-modal');
  if (!modal) {
    modal = document.createElement('div');
    modal.id = 'kilo-modal';
    modal.className = 'kilo-modal';
    modal.innerHTML = `
      <div class="kilo-modal-backdrop"></div>
      <div class="kilo-modal-content">
        ${config.title ? `<h2 class="kilo-modal-title">${config.title}</h2>` : ''}
        <div class="kilo-modal-body">${config.content}</div>
        <button class="kilo-modal-close" aria-label="Close modal">&times;</button>
      </div>
    `;
    document.body.appendChild(modal);
    
    // Add click event to backdrop and close button
    modal.querySelector('.kilo-modal-backdrop').addEventListener('click', close);
    modal.querySelector('.kilo-modal-close').addEventListener('click', close);
  }
  
  // Update content if provided
  if (config.content !== undefined) {
    modal.querySelector('.kilo-modal-body').innerHTML = config.content;
  }
  if (config.title !== undefined) {
    const titleElement = modal.querySelector('.kilo-modal-title');
    if (titleElement) {
      titleElement.innerHTML = config.title;
    } else if (config.title) {
      const titleElement = document.createElement('h2');
      titleElement.className = 'kilo-modal-title';
      titleElement.innerHTML = config.title;
      modal.querySelector('.kilo-modal-content').insertBefore(titleElement, modal.querySelector('.kilo-modal-body'));
    }
  }
  
  function open() {
    modal.classList.add('open');
    document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    
    // Focus on first focusable element or close button
    const focusableElements = modal.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])');
    if (focusableElements.length > 0) {
      focusableElements[0].focus();
    } else {
      modal.querySelector('.kilo-modal-close').focus();
    }
  }
  
  function close() {
    modal.classList.remove('open');
    document.body.style.overflow = ''; // Restore scrolling
  }
  
  // Close on Escape key
  if (config.closeOnEscape) {
    const escapeListener = function(e) {
      if (e.key === 'Escape' && modal.classList.contains('open')) {
        close();
      }
    };
    document.addEventListener('keydown', escapeListener);
    
    // Cleanup function to remove listener
    const cleanup = () => {
      document.removeEventListener('keydown', escapeListener);
    };
    
    // Return cleanup function along with open/close
    return { open, close, cleanup };
  }
  
  return { open, close };
}

// Usage examples:
// const modal = createModal({
//   title: 'Welcome',
//   content: '<p>This is a modal!</p><button>Click me</button>'
// });
// 
// // Open the modal
// modal.open();
// 
// // Close the modal
// modal.close();
// 
// // With cleanup (if using closeOnEscape)
// const modalWithEscape = createModal({ content: 'Hello' });
// modalWithEscape.open();
// // Later...
// modalWithEscape.cleanup();