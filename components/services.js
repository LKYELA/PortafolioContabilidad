// Services Module — Module Pattern implementation
import { observeOnScroll } from './utils.js';
import { SERVICES } from './config.js';

const ServicesModule = (() => {
  const setupScrollAnimation = (rootElement) => {
    const servicesSection = rootElement.querySelector('.services');
    if (!servicesSection) return;

    observeOnScroll('.services', () => {
      servicesSection.querySelectorAll('.service-card').forEach((card) => {
        card.classList.add('visible');
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -50px 0px' });
  };

  const renderServices = (rootElement) => {
    const servicesSection = rootElement.querySelector('.services-grid');
    if (!servicesSection) return;

    // Clear existing content
    servicesSection.innerHTML = '';

    // Generate service cards from SERVICES data
    SERVICES.forEach(service => {
      const serviceCard = document.createElement('div');
      serviceCard.className = 'service-card';
      serviceCard.innerHTML = `
        <div class="service-icon">
          <i class="${service.icon}"></i>
        </div>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
      `;
      servicesSection.appendChild(serviceCard);
    });
  };

  return {
    init(rootElement, config) {
      renderServices(rootElement);
      setupScrollAnimation(rootElement);
    }
  };
})();

export const init = ServicesModule.init;