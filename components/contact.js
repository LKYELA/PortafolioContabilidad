// Contact Module — Module Pattern implementation
import { observeOnScroll, isValidEmail, setFieldError, validateRequiredFields } from './utils.js';
import { MESSAGES, CONTACT } from './config.js';

const ContactModule = (() => {
  let contactForm = null;
  let submitBtn = null;
  let formStatus = null;

  const setupLiveValidation = () => {
    contactForm.querySelectorAll('input[required], textarea[required]').forEach((field) => {
      field.addEventListener('blur', function() {
        if (this.hasAttribute('required') && !this.value.trim()) {
          setFieldError(this, true);
        } else {
          setFieldError(this, false);
        }
      });

      field.addEventListener('input', function() {
        setFieldError(this, false);
      });
    });
  };

  const setupSubmitHandler = () => {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();

      const isValid = validateRequiredFields(this, (field, type) => {
        setFieldError(field, true);
      });

      if (!isValid) {
        formStatus.textContent = MESSAGES.contactValidating;
        formStatus.className = 'contact-form-status error-msg';
        return;
      }

      submitBtn.disabled = true;
      submitBtn.querySelector('.btn-text').classList.add('hidden');
      submitBtn.querySelector('.btn-loading').classList.remove('hidden');

      setTimeout(() => {
        formStatus.textContent = MESSAGES.contactSuccess;
        formStatus.className = 'contact-form-status success';
        contactForm.reset();

        submitBtn.disabled = false;
        submitBtn.querySelector('.btn-text').classList.remove('hidden');
        submitBtn.querySelector('.btn-loading').classList.add('hidden');

        setTimeout(() => {
          formStatus.textContent = '';
          formStatus.className = 'contact-form-status';
        }, CONTACT.statusClearDelay);
      }, CONTACT.formSubmitDelay);
    });
  };

  const setupScrollAnimation = () => {
    observeOnScroll('.contact', () => {
      document.querySelector('.contact .section-header')?.classList.add('visible');
      document.querySelector('.contact-content')?.classList.add('visible');
      document.querySelector('.form-header')?.classList.add('visible');
    }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  };

  return {
    init(rootElement, config) {
      contactForm = rootElement.getElementById('contact-form');
      submitBtn = rootElement.getElementById('contact-submit');
      formStatus = rootElement.getElementById('contact-form-status');

      if (!contactForm) return;

      setupLiveValidation();
      setupSubmitHandler();
      setupScrollAnimation();
    }
  };
})();

export const init = ContactModule.init;