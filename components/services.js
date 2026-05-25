// Services section: scroll reveal animations for service cards
import { observeOnScroll } from './utils.js';

export function init(rootElement, config) {
  const servicesSection = rootElement.querySelector('.services');
  if (!servicesSection) return;

  observeOnScroll('.services', () => {
    servicesSection.querySelectorAll('.service-card').forEach((card) => {
      card.classList.add('visible');
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
}