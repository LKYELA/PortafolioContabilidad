// accordion.js
/**
 * Accordion component for landing pages
 */

/**
 * Initializes accordion functionality
 * @param {Object} options - Configuration options
 * @param {string} [options.selector] - Selector for accordion containers (default: '.accordion')
 * @param {string} [options.itemSelector] - Selector for accordion items (default: '.accordion-item')
 * @param {string} [options.triggerSelector] - Selector for accordion triggers (default: '.accordion-trigger')
 * @param {string} [options.panelSelector] - Selector for accordion panels (default: '.accordion-panel')
 * @param {boolean} [options.closeOthers] - Whether to close other items when one opens (default: true)
 * @param {string} [options.activeClass] - Class for active state (default: 'active')
 */
function initAccordion(options = {}) {
  const defaults = {
    selector: '.accordion',
    itemSelector: '.accordion-item',
    triggerSelector: '.accordion-trigger',
    panelSelector: '.accordion-panel',
    closeOthers: true,
    activeClass: 'active'
  };
  
  const config = { ...defaults, ...options };
  
  document.querySelectorAll(config.selector).forEach(accordion => {
    // Add click event to triggers
    accordion.querySelectorAll(config.triggerSelector).forEach(trigger => {
      trigger.addEventListener('click', function() {
        const item = this.closest(config.itemSelector);
        const isActive = item.classList.contains(config.activeClass);
        
        if (config.closeOthers) {
          // Close all other items
          accordion.querySelectorAll(config.itemSelector).forEach(otherItem => {
            if (otherItem !== item) {
              otherItem.classList.remove(config.activeClass);
              const panel = otherItem.querySelector(config.panelSelector);
              if (panel) {
                panel.style.maxHeight = null;
              }
            }
          });
        }
        
        // Toggle current item
        if (isActive) {
          item.classList.remove(config.activeClass);
          const panel = item.querySelector(config.panelSelector);
          if (panel) {
            panel.style.maxHeight = null;
          }
        } else {
          item.classList.add(config.activeClass);
          const panel = item.querySelector(config.panelSelector);
          if (panel) {
            panel.style.maxHeight = panel.scrollHeight + 'px';
          }
        }
      });
    });
    
    // Initialize panels height
    accordion.querySelectorAll(`${config.itemSelector}.${config.activeClass} ${config.panelSelector}`).forEach(panel => {
      panel.style.maxHeight = panel.scrollHeight + 'px';
    });
  });
}

// Usage examples:
// initAccordion();
// initAccordion({
//   selector: '#faq-accordion',
//   closeOthers: false,
//   activeClass: 'open'
// });