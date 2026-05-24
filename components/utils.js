// Shared utilities: IntersectionObserver factory + form helpers
/**
 * Trigger a callback the first time an element enters the viewport.
 * Usage: observeOnScroll('.my-element', el => el.classList.add('visible'))
 */
export function observeOnScroll(selector, callback, opts = {}) {
  const defaults = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
  };
  const merged = { ...defaults, ...opts };

  const elements = document.querySelectorAll(selector);
  if (!elements.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback(entry.target);
        observer.unobserve(entry.target);
      }
    });
  }, merged);

  elements.forEach((el) => observer.observe(el));
}

/** Validate email with a basic regex */
export function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Mark / clear a form field as invalid (adds / removes .error class) */
export function setFieldError(input, error) {
  if (error) {
    input.classList.add('error');
  } else {
    input.classList.remove('error');
  }
}

/** Validate all required fields in a form and report via callback */
export function validateRequiredFields(form, onError) {
  let valid = true;
  form.querySelectorAll('[required]').forEach((field) => {
    if (!field.value.trim()) {
      setFieldError(field, true);
      if (onError) onError(field, 'required');
      valid = false;
    } else if (field.type === 'email' && !isValidEmail(field.value)) {
      setFieldError(field, true);
      if (onError) onError(field, 'invalid-email');
      valid = false;
    }
  });
  return valid;
}
