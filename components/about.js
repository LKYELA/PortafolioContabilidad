// About section functionality
document.addEventListener('DOMContentLoaded', function() {
  const aboutSection = document.querySelector('.about');
  const textContent = document.querySelector('.about-text-content');
  const imageContainer = document.querySelector('.about-image-container');
  
  if (!aboutSection) return;
  
  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
  };
  
  const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        if (textContent) textContent.classList.add('animated');
        if (imageContainer) imageContainer.classList.add('animated');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);
  
  observer.observe(aboutSection);
  
  // Animated counter for stats
  const statNumbers = document.querySelectorAll('.stat-number');
  
  const animateCounter = (element, target) => {
    let current = 0;
    const increment = target / 50;
    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        clearInterval(timer);
        element.textContent = target + '+';
      } else {
        element.textContent = Math.floor(current) + '+';
      }
    }, 30);
  };
  
  // Trigger counter animation when stats are visible
  const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        statNumbers.forEach(stat => {
          const target = parseInt(stat.textContent);
          if (!isNaN(target)) {
            animateCounter(stat, target);
          }
        });
        statsObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  const statsContainer = document.querySelector('.about-stats');
  if (statsContainer) {
    statsObserver.observe(statsContainer);
  }
});