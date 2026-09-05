// =============================================
//  CHAMBER CABA - discover.js  (ES Module)
//  Renders place cards + localStorage visit msg
// =============================================

import { places } from '../data/places.mjs';

// ---- Footer: copyright year & last modified ----
const yearSpan    = document.getElementById('current-year');
const lastModSpan = document.getElementById('last-modified');
if (yearSpan)    yearSpan.textContent    = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = document.lastModified;

// ---- Hamburger nav toggle ----
const hamburger = document.getElementById('hamburger');
const navMenu   = document.getElementById('nav-menu');
hamburger?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// ================================================
//  VISIT TRACKING (localStorage)
// ================================================

function handleVisitMessage() {
  const msgEl     = document.getElementById('visit-message');
  if (!msgEl) return;

  const lastVisit = localStorage.getItem('lastVisit');
  const now       = Date.now();

  let message;

  if (!lastVisit) {
    message = 'Welcome! Let us know if you have any questions.';
  } else {
    const msPerDay  = 1000 * 60 * 60 * 24;
    const daysPassed = Math.floor((now - Number(lastVisit)) / msPerDay);

    if (daysPassed < 1) {
      message = 'Back so soon! Awesome!';
    } else if (daysPassed === 1) {
      message = 'You last visited 1 day ago.';
    } else {
      message = `You last visited ${daysPassed} days ago.`;
    }
  }

  msgEl.textContent = message;
  localStorage.setItem('lastVisit', now);
}

// ================================================
//  RENDER CARDS
// ================================================

function renderCards() {
  const grid = document.getElementById('discover-grid');
  if (!grid) return;

  grid.innerHTML = places.map((place) => `
    <article class="discover-card">
      <h2>${place.name}</h2>
      <figure>
        <img
          src="${place.image}"
          alt="${place.name}"
          width="300"
          height="200"
          loading="lazy"
          onerror="this.src='images/placeholder.webp'; this.onerror=null"
        >
      </figure>
      <address>${place.address}</address>
      <p>${place.description}</p>
      <button type="button" class="btn-learn-more" aria-label="Learn more about ${place.name}">Learn More</button>
    </article>
  `).join('');

  // "Learn More" buttons — placeholder action
  grid.querySelectorAll('.btn-learn-more').forEach(btn => {
    btn.addEventListener('click', () => {
      alert(`More information about this location coming soon!`);
    });
  });
}

// ================================================
//  INIT
// ================================================
handleVisitMessage();
renderCards();
