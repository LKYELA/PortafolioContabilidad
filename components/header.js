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
  
  // Add social icons to mobile menu when opened (optional enhancement)
  // This creates a duplicate set of social icons in the mobile menu
  const socialIconsDesktop = document.querySelector('.social-icons');
  if (socialIconsDesktop && menu) {
    // Only add if not already present to avoid duplicates on resize
    if (!menu.querySelector('.social-icons-mobile')) {
      const socialIconsMobile = socialIconsDesktop.cloneNode(true);
      socialIconsMobile.classList.add('social-icons-mobile');
      socialIconsMobile.classList.remove('social-icons');
      menu.appendChild(socialIconsMobile);
    }
  }
});