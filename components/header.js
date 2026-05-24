// Header: mobile menu toggle + services scroll animations
import { observeOnScroll } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-menu');

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
    if (!event.target.closest('.container') && menu.classList.contains('active')) {
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

  // Staggered card delays are set once on init
  const serviceCards = document.querySelectorAll('.service-card');
  serviceCards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.1}s`;
  });

  // Animate service cards when the section scrolls into view
  const servicesSection = document.querySelector('.services');
  if (servicesSection) {
    observeOnScroll('.services', () => {
      document.querySelector('.services .section-header')?.classList.add('visible');
      serviceCards.forEach((c) => c.classList.add('visible'));
    }, { threshold: 0.1 });
  }
});
