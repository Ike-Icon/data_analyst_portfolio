class StickyNavigation {
  constructor() {
    this.tabs = document.querySelectorAll('.ai-intro-tab');
    this.slider = document.querySelector('.ai-intro-tab-slider');
    this.currentTab = null;
    this.offset = 70;

    this.init();
  }

  init() {
    this.tabs.forEach(tab => {
      tab.addEventListener('click', (e) => this.handleClick(e, tab));
    });

    window.addEventListener('scroll', () => this.handleScroll());

    // Initialize slider on load
    window.addEventListener('load', () => {
      this.setActiveTab(this.tabs[0]);
    });
  }

  handleClick(event, tab) {
    event.preventDefault();

    const target = document.querySelector(tab.getAttribute('href'));
    const top = target.offsetTop - this.offset;

    window.scrollTo({
      top: top,
      behavior: 'smooth'
    });

    this.setActiveTab(tab);
  }

  handleScroll() {
    this.tabs.forEach(tab => {
      const section = document.querySelector(tab.getAttribute('href'));
      const top = section.offsetTop - this.offset;
      const bottom = top + section.offsetHeight;

      if (window.scrollY >= top && window.scrollY < bottom) {
        this.setActiveTab(tab);
      }
    });
  }

  setActiveTab(tab) {
    this.tabs.forEach(t => t.classList.remove('active'));
    tab.classList.add('active');

    this.moveSlider(tab);
  }

  moveSlider(tab) {
    this.slider.style.width = tab.offsetWidth + 'px';
    this.slider.style.left = tab.offsetLeft + 'px';
  }
}

new StickyNavigation();