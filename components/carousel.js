// Calendar Carousel — click arrows, keyboard nav, and dot indicators
document.addEventListener('DOMContentLoaded', () => {
  const track      = document.getElementById('carouselTrack');
  const prevBtn    = document.getElementById('carouselPrev');
  const nextBtn    = document.getElementById('carouselNext');
  const indicatorsContainer = document.getElementById('carouselIndicators');

  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll('.calendar-card');
  const total = cards.length;
  let currentIndex = 0;

  /* ── helpers ── */

  /** Return the pixel width of one card + gap */
  function getCardUnit() {
    return cards[0].getBoundingClientRect().width + parseFloat(getComputedStyle(track).gap || 0);
  }

  /** Go to index with scroll-snap alignment */
  function goTo(index) {
    if (index < 0) index = 0;
    const maxIndex = Math.max(total - (window.innerWidth >= 700 ? 2 : 1), 0);
    if (index > maxIndex) index = maxIndex;
    currentIndex = index;
    track.scrollTo({
      left: getCardUnit() * currentIndex,
      behavior: 'smooth',
    });
    updateIndicators();
  }

  /* ── dot indicators ── */
  if (indicatorsContainer) {
    const maxIndex = Math.max(total - (window.innerWidth >= 700 ? 2 : 1), 0);
    for (let i = 0; i <= maxIndex; i++) {
      const dot = document.createElement('button');
      dot.setAttribute('aria-label', `Ir a tarjeta ${i + 1}`);
      dot.dataset.index = i;
      indicatorsContainer.appendChild(dot);
    }
  }

  function updateIndicators() {
    if (!indicatorsContainer) return;
    const dots = indicatorsContainer.querySelectorAll('button');
    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === currentIndex);
    });
  }

  /* ── nav buttons ── */
  prevBtn.addEventListener('click', () => goTo(currentIndex - 1));
  nextBtn.addEventListener('click', () => goTo(currentIndex + 1));

  /* ── keyboard arrows ── */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft')  goTo(currentIndex - 1);
    if (e.key === 'ArrowRight') goTo(currentIndex + 1);
  });

  /* ── touch swipe support ── */
  let startX = 0;
  let isSwiping = false;

  track.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    isSwiping = true;
  }, { passive: true });

  track.addEventListener('touchend', (e) => {
    if (!isSwiping) return;
    const diff  = startX - e.changedTouches[0].clientX;
    const unit  = getCardUnit();
    if (diff > unit * 0.25)   goTo(currentIndex + 1);
    if (diff < -unit * 0.25)  goTo(currentIndex - 1);
    isSwiping = false;
  });

  /* ── update on resize ── */
  window.addEventListener('resize', () => updateIndicators());

  /* ── highlight current slide on scroll ── */
  track.addEventListener('scroll', () => {
    const unit = getCardUnit();
    const idx  = Math.round(track.scrollLeft / unit);
    if (idx !== currentIndex) {
      currentIndex = idx;
      updateIndicators();
    }
  }, { passive: true });

  /* ── init ── */
  updateIndicators();
});
