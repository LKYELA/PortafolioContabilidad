// Header Module — Module Pattern implementation
import { observeOnScroll } from './utils.js';

const HeaderModule = (() => {
  let menuToggle = null;
  let menu = null;
  let header = null;
  let ticking = false;

  const cacheElements = (rootElement) => {
    menuToggle = rootElement.querySelector('.menu-toggle');
    menu = rootElement.querySelector('#primary-menu');
    header = rootElement.querySelector('header');
  };

  const setupMenuToggle = () => {
    if (!menuToggle || !menu) return;

    menuToggle.addEventListener('click', () => {
      menu.classList.toggle('active');
      menuToggle.classList.toggle('active');

      const isOpen = menu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen);

      document.body.style.overflow = isOpen ? 'hidden' : '';
    });
  };

  const setupOutsideClick = () => {
    document.addEventListener('click', (event) => {
      const isClickInsideContainer = event.target.closest('.container');
      const isClickOnMenuToggle = event.target.closest('.menu-toggle');

      if (!isClickInsideContainer && !isClickOnMenuToggle && menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  };

  const setupKeydown = () => {
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && menu.classList.contains('active')) {
        menu.classList.remove('active');
        menuToggle.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  };

  const updateHeaderStyle = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  const setupScrollEffect = () => {
    updateHeaderStyle();

    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          updateHeaderStyle();
          ticking = false;
        });
        ticking = true;
      }
    });
  };

  const setupServiceCards = (rootElement) => {
    const serviceCards = rootElement.querySelectorAll('.service-card');
    serviceCards.forEach((card, i) => {
      card.style.transitionDelay = `${i * 0.1}s`;
    });

    const servicesSection = rootElement.querySelector('.services');
    if (servicesSection) {
      observeOnScroll('.services', () => {
        servicesSection.querySelector('.section-header')?.classList.add('visible');
        serviceCards.forEach((c) => c.classList.add('visible'));
      }, { threshold: 0.1 });
    }
  };

  return {
    init(rootElement) {
      cacheElements(rootElement);
      setupMenuToggle();
      setupOutsideClick();
      setupKeydown();
      setupScrollEffect();
      setupServiceCards(rootElement);
    }
  };
})();

export const init = HeaderModule.init;