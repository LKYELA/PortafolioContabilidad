// Footer functionality for newsletter and back-to-top
document.addEventListener('DOMContentLoaded', function() {
  // Set current year
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
  const backToTopBtn = document.getElementById('back-to-top');
  
  // Back to top button functionality
  if (backToTopBtn) {
    window.addEventListener('scroll', function() {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('visible');
      } else {
        backToTopBtn.classList.remove('visible');
      }
    });
    
    backToTopBtn.addEventListener('click', function(e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Newsletter form submission
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = this.querySelector('input[type="email"]').value;
      
      if (email && email.includes('@')) {
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
  
  // Animate footer elements on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animated');
      }
    });
  }, observerOptions);
  
  const footerElements = document.querySelectorAll('.footer-column, .footer-logo, .footer-bottom');
  footerElements.forEach(el => observer.observe(el));
});