// About section: scroll animations + stat counter
import { observeOnScroll } from './utils.js';

export function init(rootElement, config) {
  const aboutSection = rootElement.querySelector('.about');
  if (!aboutSection) return;

  // Animate text and image blocks
  observeOnScroll('.about', () => {
    document.querySelector('.about-text-content')?.classList.add('visible');
    document.querySelector('.about-image-container')?.classList.add('visible');
  }, { threshold: 0.2, rootMargin: '0px 0px -50px 0px' });

  // Stat counter
  const statNumbers = rootElement.querySelectorAll('.stat-number');

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

  observeOnScroll('.about-stats', () => {
    statNumbers.forEach((stat) => {
      const target = parseInt(stat.textContent, 10);
      if (!isNaN(target)) animateCounter(stat, target);
    });
  }, { threshold: 0.5 });
}
