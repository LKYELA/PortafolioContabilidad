// Carousel Module — Module Pattern implementation
export class Carousel {
  #rootElement;
  #options;
  #track;
  #prevBtn;
  #nextBtn;
  #indicatorsContainer;
  #cards = [];
  #total = 0;
  #currentIndex = 0;
  #autoplayInterval = null;

  constructor(rootElement, options = {}) {
    this.#rootElement = rootElement;
    this.#options = {
      data: [],
      autoplayDelay: 3000,
      ...options
    };
  }

  init() {
    this._cacheElements();
    this._validateData();
    this.render(this.#options.data);
    this._setup();
  }

  _cacheElements() {
    this.#track = this.#rootElement.querySelector('#carouselTrack');
    this.#prevBtn = this.#rootElement.querySelector('#carouselPrev');
    this.#nextBtn = this.#rootElement.querySelector('#carouselNext');
    this.#indicatorsContainer = this.#rootElement.querySelector('#carouselIndicators');

    if (!this.#track || !this.#prevBtn || !this.#nextBtn) {
      console.error('Carousel elements not found');
      return;
    }
  }

  _validateData() {
    const { data } = this.#options;
    if (data === undefined || !Array.isArray(data)) {
      console.error('Carousel data is missing or invalid');
      return false;
    }
    return true;
  }

  render(data) {
    if (!this._validateData()) return;

    this.#track.innerHTML = data.map((item, index) => `
      <div class="calendar-card">
        <div class="card-number">${item.number}</div>
        <h3 class="card-title">${item.title}</h3>
        <table class="card-table">
          <thead><tr>${item.headers.map(h => `<th>${h}</th>`).join('')}</tr></thead>
          <tbody>
            ${item.rows.map(row => `
              <tr>${row.map(cell => `<td>${cell}</td>`).join('')}</tr>
            `).join('')}
          </tbody>
        </table>
      </div>
    `).join('');
  }

  next() {
    this._goTo(this.#currentIndex + 1);
  }

  prev() {
    this._goTo(this.#currentIndex - 1);
  }

  _goTo(index) {
    if (this.#total === 0) return;

    if (index < 0) index = 0;
    const maxIndex = this._getMaxIndex();
    if (index > maxIndex) index = maxIndex;
    this.#currentIndex = index;

    this.#track.scrollTo({
      left: this._getCardUnit() * this.#currentIndex,
      behavior: 'smooth',
    });
    this._updateIndicators();
  }

  _attachEvents() {
    this.#prevBtn.addEventListener('click', () => this.prev());
    this.#nextBtn.addEventListener('click', () => this.next());

    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') this.prev();
      if (e.key === 'ArrowRight') this.next();
    });

    let startX = 0;
    let isSwiping = false;

    this.#track.addEventListener('touchstart', (e) => {
      startX = e.touches[0].clientX;
      isSwiping = true;
    }, { passive: true });

    this.#track.addEventListener('touchend', (e) => {
      if (!isSwiping) return;
      const diff = startX - e.changedTouches[0].clientX;
      const unit = this._getCardUnit();
      if (diff > unit * 0.25) this.next();
      if (diff < -unit * 0.25) this.prev();
      isSwiping = false;
    });

    window.addEventListener('resize', () => {
      const maxIndex = this._getMaxIndex();
      this.#currentIndex = Math.min(this.#currentIndex, maxIndex);
      this._updateIndicators();
    });
  }

  startAutoplay() {
    if (this.#autoplayInterval) return;
    const delay = this.#options.autoplayDelay;
    this.#autoplayInterval = setInterval(() => this.next(), delay);
  }

  stopAutoplay() {
    if (this.#autoplayInterval) {
      clearInterval(this.#autoplayInterval);
      this.#autoplayInterval = null;
    }
  }

  _setup() {
    this.#cards = this.#track.querySelectorAll('.calendar-card');
    this.#total = this.#cards.length;

    if (this.#total === 0) {
      console.warn('No carousel cards found after render');
      return;
    }

    if (this.#indicatorsContainer) {
      const maxIndex = this._getMaxIndex();
      this.#indicatorsContainer.innerHTML = '';
      for (let i = 0; i <= maxIndex; i++) {
        const dot = document.createElement('button');
        dot.setAttribute('aria-label', `Ir a tarjeta ${i + 1}`);
        dot.setAttribute('aria-selected', 'false');
        dot.dataset.index = i;
        this.#indicatorsContainer.appendChild(dot);
      }
    }

    this._attachEvents();
    this._updateIndicators();

    const maxIndex = this._getMaxIndex();
    this.#currentIndex = Math.min(this.#currentIndex, maxIndex);
    this._goTo(this.#currentIndex);
  }

  _getCardUnit() {
    return this.#cards[0].getBoundingClientRect().width +
           parseFloat(getComputedStyle(this.#track).gap || 0);
  }

  _getMaxIndex() {
    return Math.max(this.#total - (window.innerWidth >= 700 ? 2 : 1), 0);
  }

  _updateIndicators() {
    if (!this.#indicatorsContainer) return;
    const dots = this.#indicatorsContainer.querySelectorAll('button');
    dots.forEach((dot, i) => {
      const isActive = i === this.#currentIndex;
      dot.classList.toggle('active', isActive);
      dot.setAttribute('aria-selected', isActive);
    });
  }
}