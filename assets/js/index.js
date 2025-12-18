/* Javascript général*/

document.addEventListener("DOMContentLoaded", () => {
  const sections = document.querySelectorAll("main > div, footer, nav");

  sections.forEach(section => {
    let revealElements = Array.from(section.querySelectorAll("[data-reveal]"));

    
    revealElements.sort((a, b) => a.getBoundingClientRect().left - b.getBoundingClientRect().left);

    revealElements.forEach((el, i) => {
      
      let baseDelay;
      if(section.tagName.toLowerCase() === 'footer') {
        baseDelay = 70; 
      } else if(section.tagName.toLowerCase() === 'nav') {
        baseDelay = 160; 
      } else {
        baseDelay = 250; 
      }
      el.dataset.delay = i * baseDelay;

      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        setTimeout(() => el.classList.add("revealed"), el.dataset.delay);
      }
    });

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if(entry.isIntersecting && !entry.target.classList.contains("revealed")) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => entry.target.classList.add("revealed"), delay);
        }
      });
    }, { threshold: 0.1 });

    revealElements.forEach(el => observer.observe(el));
  });
});


/* Page Menu */

const filters = document.querySelectorAll('.tab-class .nav-link');
const lineActive = document.querySelector('.line-active');
const cards = document.querySelectorAll('.menu-card');

function moveLine(filter) {
  const ul = filter.closest('ul');
  const rect = filter.getBoundingClientRect();
  const ulRect = ul.getBoundingClientRect();
  lineActive.style.left =
    rect.left - ulRect.left + (rect.width - 80) / 2 + 'px';
}

function filterCards(category) {
  cards.forEach(card => {
    if (card.dataset.category === category) {
      card.classList.remove('d-none');
    } else {
      card.classList.add('d-none');
      card.classList.remove('animate'); 
    }
  });
}

function animateVisibleCards() {
const visibleCards = Array.from(cards)
  .filter(card => !card.classList.contains('d-none'))
  .sort((a, b) => {
    const rectA = a.getBoundingClientRect();
    const rectB = b.getBoundingClientRect();
    if (rectA.top === rectB.top) {
      return rectA.left - rectB.left;
    }
    return rectA.top - rectB.top;
  });

  visibleCards.forEach((card, index) => {
    card.classList.remove('animate');
    void card.offsetWidth; 
    setTimeout(() => {
      card.classList.add('animate');
    }, index * 250); 
  });
}

const activeFilter =
  document.querySelector('.tab-class .nav-link.active') || filters[0];
const initialCategory = activeFilter.dataset.filter;

moveLine(activeFilter);
filterCards(initialCategory);
animateVisibleCards(initialCategory);

filters.forEach(filter => {
  filter.addEventListener('click', e => {
    e.preventDefault();

    const category = filter.dataset.filter;

    filters.forEach(f => f.classList.remove('active'));
    filter.classList.add('active');

    moveLine(filter);

    filterCards(category);
    setTimeout(() => animateVisibleCards(category), 50);
  });
});












