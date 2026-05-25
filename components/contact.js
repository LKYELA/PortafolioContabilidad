// Contact: form validation, submission, and scroll animations
import { observeOnScroll, isValidEmail, setFieldError, validateRequiredFields } from './utils.js';

export function init(rootElement, config) {
  const contactForm = rootElement.getElementById('contact-form');
  const submitBtn = rootElement.getElementById('contact-submit');
  const formStatus = rootElement.getElementById('contact-form-status');

  if (!contactForm) return;

  // ── Live validation on blur ──
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

  // ── Submit ──
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const isValid = validateRequiredFields(this, (field, type) => {
      if (type === 'required') {
        setFieldError(field, true);
      } else if (type === 'invalid-email') {
        setFieldError(field, true);
        // Optionally, you can set a custom message for email
        // We'll rely on the general message below, but you could set a field-specific message here.
      }
    });

    if (!isValid) {
      formStatus.textContent = 'Por favor completa todos los campos correctamente.';
      formStatus.className = 'contact-form-status error-msg';
      return;
    }

    // Simulate submit — replace with real API call
    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').classList.add('hidden');
    submitBtn.querySelector('.btn-loading').classList.remove('hidden');

    setTimeout(() => {
      formStatus.textContent = '¡Gracias! Tu mensaje ha sido enviado. Te responderemos pronto.';
      formStatus.className = 'contact-form-status success';
      contactForm.reset();

      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').classList.remove('hidden');
      submitBtn.querySelector('.btn-loading').classList.add('hidden');

      setTimeout(() => {
        formStatus.textContent = '';
        formStatus.className = 'contact-form-status';
      }, 5000);
    }, 1500);
  });

  // ── Scroll animations ──
  observeOnScroll('.contact', () => {
    document.querySelector('.contact .section-header')?.classList.add('visible');
    document.querySelector('.contact-content')?.classList.add('visible');
    document.querySelector('.form-header')?.classList.add('visible');
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
}
