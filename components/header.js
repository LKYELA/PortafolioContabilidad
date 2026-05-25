// Header: mobile menu toggle + services scroll animations
import DOMUtils from '../utils/dom-utils.js';

export function init(rootElement, config) {
  const menuToggle = DOMUtils.getElement('.menu-toggle', rootElement);
  const menu = DOMUtils.getElement('#primary-menu', rootElement);
  const header = DOMUtils.getElement('header', rootElement);

  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      menuToggle.classList.toggle('active');

      const isOpen = menu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen);

      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }

  document.addEventListener('click', function(event) {
    // Check if click is outside container and menu is active
    const isClickInsideContainer = event.target.closest('.container');
    const isClickOnMenuToggle = event.target.closest('.menu-toggle');
    if (!isClickInsideContainer && !isClickOnMenuToggle && menu.classList.contains('active')) {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape' && menu.classList.contains('active')) {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

  // Header scroll effect
  const updateHeaderStyle = () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  // Initial check
  updateHeaderStyle();

  // Scroll event listener with throttle using requestAnimationFrame
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateHeaderStyle();
        ticking = false;
      });
      ticking = true;
    }
  });

  // Staggered card delays are set once on init
  const serviceCards = rootElement.querySelectorAll('.service-card');
  serviceCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // Animate service cards when the section scrolls into view
  const servicesSection = DOMUtils.getElement('.services', rootElement);
  if (servicesSection) {
    DOMUtils.observeOnScroll(servicesSection, () => {
      DOMUtils.getElement('.services .section-header')?.classList.add('visible');
      serviceCards.forEach((c) => c.classList.add('visible'));
    }, { threshold: 0.1 });
  }
}
