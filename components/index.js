// Component registry
import { CAROUSEL_DATA } from './config.js';
import { Carousel } from './carousel.js';
import { init as initAbout } from './about.js';
import { init as initHeader } from './header.js';
import { init as initContact } from './contact.js';
import { init as initFooter } from './footer.js';
import { init as initServices } from './services.js';

// Site initialization functions - uses window globals set by init.js
export const siteInitializer = {
  init: (rootElement) => {
    // Inject site name
    rootElement.querySelectorAll('[data-site-name]').forEach(el => {
      el.textContent = window.SITE?.name || '';
    });
    
    // Inject role and specialty
    rootElement.querySelectorAll('[data-site-role]').forEach(el => {
      el.innerHTML = `${window.SITE?.role || ''}<br><span data-site-specialty>${window.SITE?.specialty || ''}</span>`;
    });
    
    // Inject contact info
    rootElement.querySelectorAll('[data-contact-tagline]').forEach(el => {
      el.textContent = window.MESSAGES?.contactTagline || '';
    });
    
    rootElement.querySelectorAll('[data-contact-phone-link]').forEach(el => {
      el.href = `tel:${(window.CONTACT?.phone || '').replace(/\s+/g, '')}`;
    });
    
    rootElement.querySelectorAll('[data-contact-phone]').forEach(el => {
      el.textContent = window.CONTACT?.phone || '';
    });
    
    rootElement.querySelectorAll('[data-contact-email-link]').forEach(el => {
      el.href = `mailto:${window.CONTACT?.email || ''}`;
    });
    
    rootElement.querySelectorAll('[data-contact-email]').forEach(el => {
      el.textContent = window.CONTACT?.email || '';
    });
    
    rootElement.querySelectorAll('[data-contact-address]').forEach(el => {
      el.textContent = window.CONTACT?.address || '';
    });
    
    rootElement.querySelectorAll('[data-contact-hours]').forEach(el => {
      el.textContent = window.CONTACT?.hours || '';
    });
    
    // Inject social links
    rootElement.querySelectorAll('[data-link-facebook]').forEach(el => {
      el.href = window.LINKS?.facebook || '#';
    });
    
    rootElement.querySelectorAll('[data-link-whatsapp]').forEach(el => {
      el.href = window.LINKS?.whatsapp || '#';
    });
    
    rootElement.querySelectorAll('[data-link-linkedin]').forEach(el => {
      el.href = window.LINKS?.linkedin || '#';
    });
    
    rootElement.querySelectorAll('[data-link-instagram]').forEach(el => {
      el.href = window.LINKS?.instagram || '#';
    });
    
    // Inject nav labels
    rootElement.querySelectorAll('[data-nav-about]').forEach(el => {
      el.textContent = window.NAV?.about || '';
    });
    
    rootElement.querySelectorAll('[data-nav-services]').forEach(el => {
      el.textContent = window.NAV?.services || '';
    });
    
    rootElement.querySelectorAll('[data-nav-contact]').forEach(el => {
      el.textContent = window.NAV?.contact || '';
    });
    
    rootElement.querySelectorAll('[data-nav-cta]').forEach(el => {
      el.textContent = window.NAV?.cta || '';
    });
    
    // Set current year
    const yearEl = rootElement.getElementById('current-year');
    if (yearEl) {
      yearEl.textContent = new Date().getFullYear();
    }
  }
};

// Component registry
export const componentRegistry = {
  SiteInitializer: siteInitializer,
   Carousel: {
     init: (rootElement) => {
       const carouselElement = rootElement.querySelector('#carouselTrack')?.parentElement;
       if (carouselElement) {
         const carousel = new Carousel(carouselElement, {
           data: CAROUSEL_DATA,
           autoplayDelay: 5000
         });
         carousel.init();
       }
     }
   },
  Header: {
    init: (rootElement) => {
      initHeader(rootElement, {});
    }
  },
  About: {
    init: (rootElement) => {
      initAbout(rootElement, {});
    }
  },
  Contact: {
    init: (rootElement) => {
      initContact(rootElement, {});
    }
  },
  Footer: {
    init: (rootElement) => {
      initFooter(rootElement, {});
    }
  },
  Services: {
    init: (rootElement) => {
      initServices(rootElement, {});
    }
  }
};

export function initializeAll() {
  document.addEventListener('DOMContentLoaded', () => {
    Object.values(componentRegistry).forEach(component => {
      if (component.init) {
        component.init(document.body);
      }
    });
  });
}