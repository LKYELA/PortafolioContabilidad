// tabs.js
/**
 * Tabs component for landing pages
 */

/**
 * Initializes tabs functionality
 * @param {Object} options - Configuration options
 * @param {string} [options.selector] - Selector for tabs containers (default: '.tabs')
 * @param {string} [options.tabSelector] - Selector for tab buttons (default: '.tab-button')
 * @param {string} [options.panelSelector] - Selector for tab panels (default: '.tab-panel')
 * @param {string} [options.activeClass] - Class for active state (default: 'active')
 * @param {boolean} [options.autoHeight] - Whether to adjust height to match content (default: false)
 */
function initTabs(options = {}) {
  const defaults = {
    selector: '.tabs',
    tabSelector: '.tab-button',
    panelSelector: '.tab-panel',
    activeClass: 'active',
    autoHeight: false
  };
  
  const config = { ...defaults, ...options };
  
  document.querySelectorAll(config.selector).forEach(tabsContainer => {
    const tabs = tabsContainer.querySelectorAll(config.tabSelector);
    const panels = tabsContainer.querySelectorAll(config.panelSelector);
    
    // Add click event to tabs
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', function() {
        // Remove active class from all tabs and panels
        tabs.forEach(t => t.classList.remove(config.activeClass));
        panels.forEach(p => p.classList.remove(config.activeClass));
        
        // Add active class to clicked tab and corresponding panel
        tab.classList.add(config.activeClass);
        if (panels[index]) {
          panels[index].classList.add(config.activeClass);
          
          // Adjust container height if autoHeight is enabled
          if (config.autoHeight) {
            tabsContainer.style.height = panels[index].scrollHeight + 'px';
          }
        }
      });
      
      // Set initial active tab (if none active, activate first)
      if (!tabsContainer.querySelector(`${config.tabSelector}.${config.activeClass}`) && index === 0) {
        tab.classList.add(config.activeClass);
        if (panels[0]) {
          panels[0].classList.add(config.activeClass);
          if (config.autoHeight) {
            tabsContainer.style.height = panels[0].scrollHeight + 'px';
          }
        }
      }
    });
    
    // Handle keyboard navigation
    tabsContainer.addEventListener('keydown', function(e) {
      const focusedTab = document.activeElement;
      if (!focusedTab.classList.contains(config.tabSelector.replace('.', ''))) return;
      
      let index = Array.from(tabs).indexOf(focusedTab);
      
      if (e.key === 'ArrowRight') {
        e.preventDefault();
        tabs[(index + 1) % tabs.length].focus();
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        tabs[(index - 1 + tabs.length) % tabs.length].focus();
      } else if (e.key === 'Home') {
        e.preventDefault();
        tabs[0].focus();
      } else if (e.key === 'End') {
        e.preventDefault();
        tabs[tabs.length - 1].focus();
      }
    });
  });
}

// Usage examples:
// initTabs();
// initTabs({
//   selector: '#feature-tabs',
//   activeClass: 'is-active',
//   autoHeight: true
// });