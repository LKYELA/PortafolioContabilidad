// Init Module — Module Pattern implementation
import { SITE, CONTACT, LINKS, NAV, MESSAGES, STATISTICS, SKILLS, SERVICES, TESTIMONIALS, FOOTER } from './config.js';
import { initializeAll } from './index.js';

const InitModule = (() => {
  const config = { SITE, CONTACT, LINKS, NAV, MESSAGES, STATISTICS, SKILLS, SERVICES, TESTIMONIALS, FOOTER };

  const attachToWindow = () => {
    window.SITE = SITE;
    window.CONTACT = CONTACT;
    window.LINKS = LINKS;
    window.NAV = NAV;
    window.MESSAGES = MESSAGES;
    window.STATISTICS = STATISTICS;
    window.SKILLS = SKILLS;
    window.SERVICES = SERVICES;
    window.TESTIMONIALS = TESTIMONIALS;
    window.FOOTER = FOOTER;
    window.siteName = SITE.name;
    window.contactInfo = CONTACT;
  };

  return {
    init() {
      attachToWindow();
      initializeAll();
    }
  };
})();

export class SiteInitializer {
  init() {
    InitModule.init();
  }
}

new SiteInitializer().init();