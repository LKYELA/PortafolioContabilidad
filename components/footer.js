// Footer Module — Module Pattern implementation
import { FOOTER, CONTACT } from './config.js';

const FooterModule = (() => {
  let yearEl = null;
  let footer = null;
  let columns = [];
  let observer = null;

  const setYear = () => {
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  };

  const setupScrollReveal = () => {
    if (!footer) return;

    columns = footer.querySelectorAll('.footer-col');
    if (!columns.length) return;

    observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    columns.forEach((col) => observer.observe(col));
  };

  const populateFooterContent = (rootElement) => {
    // Update brand
    const brandNameEl = rootElement.querySelector('.footer-logo-text');
    if (brandNameEl) {
      brandNameEl.textContent = FOOTER.brand.name;
    }

    const brandTaglineEl = rootElement.querySelector('.footer-tagline');
    if (brandTaglineEl) {
      brandTaglineEl.textContent = FOOTER.brand.tagline;
    }

    // Update services
    const servicesNav = rootElement.querySelector('.footer-services .footer-nav ul');
    if (servicesNav) {
      servicesNav.innerHTML = '';
      FOOTER.services.forEach(service => {
        const li = document.createElement('li');
        li.innerHTML = `<a href="#services">${service}</a>`;
        servicesNav.appendChild(li);
      });
    }

    // Update contact info using CONTACT data
    const contactList = rootElement.querySelector('.footer-contact-list');
    if (contactList) {
      contactList.innerHTML = '';
      const contactItems = [
        { icon: 'fas fa-phone-alt', href: `tel:${CONTACT.phone.replace(/\s+/g, '')}`, text: CONTACT.phone },
        { icon: 'fas fa-envelope', href: `mailto:${CONTACT.email}`, text: CONTACT.email },
        { icon: 'fas fa-map-marker-alt', href: '#', text: CONTACT.address },
        { icon: 'far fa-clock', href: '#', text: CONTACT.hours }
      ];
      
      contactItems.forEach((item, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <i class="${item.icon} footer-contact-icon"></i>
          <a href="${item.href}" data-contact-${index === 0 ? 'phone-link' : index === 1 ? 'email-link' : index === 2 ? 'address-link' : 'hours-link'}>${item.text}</a>
        `;
        contactList.appendChild(li);
      });
    }

    // Update copyright
    const copyrightEl = rootElement.querySelector('.footer-copyright');
    if (copyrightEl) {
      copyrightEl.innerHTML = FOOTER.copyright;
    }
  };

  return {
    init(rootElement, config) {
      yearEl = rootElement.getElementById('current-year');
      footer = rootElement.querySelector('.modern-footer');

      setYear();
      populateFooterContent(rootElement);
      setupScrollReveal();
    }
  };
})();

export const init = FooterModule.init;