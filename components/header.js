// Header functionality for mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const menuToggle = document.querySelector('.menu-toggle');
  const menu = document.getElementById('primary-menu');
  
  if (menuToggle && menu) {
    menuToggle.addEventListener('click', function() {
      menu.classList.toggle('active');
      menuToggle.classList.toggle('active');
      
      // Update ARIA attributes
      const isOpen = menu.classList.contains('active');
      menuToggle.setAttribute('aria-expanded', isOpen);
      
      // Optional: prevent body scrolling when menu is open
      if (isOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    });
  }
  
  // Close menu when clicking outside (optional)
  document.addEventListener('click', function(event) {
    if (!event.target.closest('.container') && menu.classList.contains('active')) {
      menu.classList.remove('active');
      menuToggle.classList.remove('active');
      menuToggle.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }
  });

// Handle escape key to close menu
   document.addEventListener('keydown', function(event) {
     if (event.key === 'Escape' && menu.classList.contains('active')) {
       menu.classList.remove('active');
       menuToggle.classList.remove('active');
       menuToggle.setAttribute('aria-expanded', 'false');
       document.body.style.overflow = '';
     }
   });
    
   // Services section animations
   const serviceCards = document.querySelectorAll('.service-card');
   const servicesSection = document.querySelector('.services');
   const servicesHeader = document.querySelector('.services .section-header');
   
   if (serviceCards.length > 0) {
     // Staggered animation for service cards
     serviceCards.forEach((card, index) => {
       card.style.transitionDelay = `${index * 0.1}s`;
     });
   }
   
   // Animate services section on scroll
   const observerOptions = {
     threshold: 0.1
   };
   
   const observer = new IntersectionObserver(function(entries) {
     entries.forEach(entry => {
       if (entry.isIntersecting) {
         if (entry.target === servicesSection) {
           if (servicesHeader) servicesHeader.classList.add('animated');
           serviceCards.forEach(card => {
             card.classList.add('animated');
           });
         }
         observer.unobserve(entry.target);
       }
     });
   }, observerOptions);
   
   if (servicesSection) {
     observer.observe(servicesSection);
   }
});