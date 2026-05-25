// Main entry point - Import all modules and initialize them
import { init as initHeader } from './components/header.js';
import { Carousel } from './components/carousel.js';
import { init as initAbout } from './components/about.js';
import { init as initContact } from './components/contact.js';
import { init as initFooter } from './components/footer.js';
import { init as initServices } from './components/services.js';

// Import CAROUSEL_DATA for carousel initialization
import { CAROUSEL_DATA } from './components/config.js';

/**
 * Initialize all components
 */
function initAll() {
  // Initialize header
  initHeader(document.body);
  
  // Initialize carousel
  const carouselElement = document.querySelector('#carouselTrack')?.parentElement;
  if (carouselElement) {
    const carousel = new Carousel(carouselElement, {
      data: CAROUSEL_DATA,
      autoplayDelay: 5000
    });
    carousel.init();
  }
  
  // Initialize about section
  initAbout(document.body, {});
  
  // Initialize contact form
  initContact(document.body, {});
  
  // Initialize footer
  initFooter(document.body, {});
  
  // Initialize services
  initServices(document.body, {});
}

// Initialize when DOM is loaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initAll);
} else {
  initAll();
}