// Footer: year, back-to-top, newsletter, scroll animations
import { observeOnScroll, isValidEmail } from './utils.js';

document.addEventListener('DOMContentLoaded', function() {
  // ── Year ──
  const yearEl = document.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Back to top ──
  const backToTopBtn = document.getElementById('back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      backToTopBtn.classList.toggle('visible', window.scrollY > 300);
    }, { passive: true });

    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // ── Newsletter ──
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;

      if (email && isValidEmail(email)) {
        const btn = this.querySelector('button');
        const originalText = btn.textContent;
        btn.textContent = '¡Gracias!';
        btn.disabled = true;

        setTimeout(() => {
          btn.textContent = originalText;
          btn.disabled = false;
          this.reset();
        }, 2000);
      }
    });
  }

  // ── Scroll animations ──
  observeOnScroll('.footer-column, .footer-logo, .footer-bottom', (el) => {
    el.classList.add('visible');
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
});
