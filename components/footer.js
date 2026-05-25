// Footer: year + scroll-reveal
export function init(rootElement, config) {
  // ── Year ──
  const yearEl = rootElement.getElementById('current-year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // ── Scroll reveal on footer columns ──
  const footer = rootElement.querySelector('.modern-footer');
  if (!footer) return;

  const columns = footer.querySelectorAll('.footer-col');
  if (!columns.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  columns.forEach((col) => observer.observe(col));
}
