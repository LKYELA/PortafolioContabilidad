// Site initialization: inject config values into DOM
import { SITE, CONTACT, LINKS, NAV, MESSAGES } from './config.js';
import { initializeAll } from './index.js';

// Attach config to window for use by other modules that expect window globals
window.SITE = SITE;
window.CONTACT = CONTACT;
window.LINKS = LINKS;
window.NAV = NAV;
window.MESSAGES = MESSAGES;
window.siteName = SITE.name;
window.contactInfo = CONTACT;

export class SiteInitializer {
  init() {
    initializeAll();
  }
}

new SiteInitializer().init();