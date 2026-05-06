class Typewriter {
  constructor(element, words, wait = 3000) {
    this.element = element;
    this.words = words;
    this.txt = '';
    this.wordIndex = 0;
    this.wait = parseInt(wait, 10);
    this.type();
    this.isDeleting = false;
  }

  type() {
    const current = this.wordIndex % this.words.length;
    const fullTxt = this.words[current];

    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }

    this.element.textContent = this.txt;

    let typeSpeed = 100;

    if (this.isDeleting) {
      typeSpeed /= 2;
    }

    if (!this.isDeleting && this.txt === fullTxt) {
      typeSpeed = this.wait;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === '') {
      this.isDeleting = false;
      this.wordIndex++;
      typeSpeed = 500;
    }

    setTimeout(() => this.type(), typeSpeed);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const typewriterElement = document.getElementById('typewriter');
  const heroName = document.querySelector('.hero-name');
  const heroSubheading = document.querySelector('.hero-subheading');


  // Trigger load animations
  setTimeout(() => {
    heroName.classList.add('animate');
  }, 100);

  setTimeout(() => {
    new Typewriter(typewriterElement, window.portfolioConfig.roles);
  }, 600);

  setTimeout(() => {
    heroSubheading.classList.add('animate');
  }, 1200);


});
