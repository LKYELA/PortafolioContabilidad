const DOMUtils = {
  observeOnScroll(element, callback, options = {}) {
    const defaults = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    };
    const merged = { ...defaults, ...options };

    const el = element instanceof Element ? element : document.querySelector(element);
    if (!el) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          callback(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, merged);

    observer.observe(el);
    return observer;
  },

  delegateEvent(parent, event, selector, handler) {
    parent.addEventListener(event, (e) => {
      const target = e.target.closest(selector);
      if (target) {
        handler.call(target, e);
      }
    });
  },

  getElement(selector, parent = document) {
    return parent.querySelector(selector);
  },

  createElementFromHTML(htmlString) {
    const template = document.createElement('template');
    template.innerHTML = htmlString.trim();
    return template.content.firstChild;
  },
};

export default DOMUtils;