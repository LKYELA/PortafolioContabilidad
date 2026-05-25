// About Module — Module Pattern implementation
import { observeOnScroll } from './utils.js';
import { STATISTICS, SKILLS, ANIMATION } from './config.js';

const AboutModule = (() => {
  let statNumbers = null;

  const initCounterAnimation = (elements, stats) => {
    const animateCounter = (element, target) => {
      let current = 0;
      const increment = target / ANIMATION.counterIncrementDivisor;
      const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
          clearInterval(timer);
          element.textContent = target + '+';
        } else {
          element.textContent = Math.floor(current) + '+';
        }
      }, ANIMATION.counterTickMs);
    };

    statNumbers = elements;
    statNumbers.forEach((stat, index) => {
      // Map statistics to elements in order: yearsExperience, happyClients, projectsCompleted, professionalCertifications
      const statKeys = ['yearsExperience', 'happyClients', 'projectsCompleted', 'professionalCertifications'];
      const key = statKeys[index];
      const target = stats[key];
      if (!isNaN(target)) animateCounter(stat, target);
    });
  };

  const populateAboutContent = (rootElement) => {
    // Update description texts
    const descriptionEls = rootElement.querySelectorAll('[data-about-description]');
    descriptionEls.forEach((el, index) => {
      // For now, we'll keep the original texts since they weren't moved to config
      // In a real implementation, these would come from config.about.descriptions
    });

    const descriptionTwoEls = rootElement.querySelectorAll('[data-about-description-two]');
    descriptionTwoEls.forEach((el, index) => {
      // For now, we'll keep the original texts since they weren't moved to config
      // In a real implementation, these would come from config.about.descriptions
    });

    // Update skills list
    const skillsList = rootElement.querySelector('[data-skills-list]');
    if (skillsList) {
      skillsList.innerHTML = '';
      SKILLS.forEach(skill => {
        const li = document.createElement('li');
        li.innerHTML = `<span class="skill-tag">${skill}</span>`;
        skillsList.appendChild(li);
      });
    }
  };

  const setupScrollAnimation = () => {
    observeOnScroll('.about', () => {
      document.querySelector('.about-text-content')?.classList.add('visible');
      document.querySelector('.about-image-container')?.classList.add('visible');
    }, { threshold: 0.2, rootMargin: `${ANIMATION.observeDefaultRootMargin}` });

    observeOnScroll('.about-stats', () => {
      const stats = document.querySelectorAll('.stat-number');
      initCounterAnimation(stats, STATISTICS);
    }, { threshold: 0.5, rootMargin: `${ANIMATION.observeDefaultRootMargin}` });
  };

  return {
    init(rootElement, config) {
      const aboutSection = rootElement.querySelector('.about');
      if (!aboutSection) return;

      populateAboutContent(rootElement);
      setupScrollAnimation();
    }
  };
})();

export const init = AboutModule.init;