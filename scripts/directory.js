// =============================================
//  CHAMBER CABA - directory.js
//  Fetch members, render cards/list, toggle views
// =============================================

const MEMBERS_URL = 'data/members.json';
const LEVEL_LABELS = { 1: 'Miembro', 2: 'Plata', 3: 'Oro' };
const LEVEL_BADGES = { 1: 'badge-member', 2: 'badge-silver', 3: 'badge-gold' };

let currentView = 'grid'; // default view

// ---- DOM refs ----
const container  = document.getElementById('members-container');
const btnGrid    = document.getElementById('btn-grid');
const btnList    = document.getElementById('btn-list');
const hamburger  = document.getElementById('hamburger');
const navMenu    = document.getElementById('nav-menu');
const yearSpan   = document.getElementById('current-year');
const lastModSpan = document.getElementById('last-modified');

// ---- Footer: year & last modified ----
if (yearSpan)    yearSpan.textContent = new Date().getFullYear();
if (lastModSpan) lastModSpan.textContent = document.lastModified;

// ---- Hamburger nav toggle ----
hamburger?.addEventListener('click', () => {
  const isOpen = navMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
  hamburger.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

// ---- Fetch members ----
async function loadMembers() {
  container.innerHTML = '<p class="loading-msg">Cargando miembros...</p>';

  try {
    const response = await fetch(MEMBERS_URL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    const members = await response.json();
    renderMembers(members);
  } catch (error) {
    container.innerHTML = `<p class="error-msg">Error al cargar los miembros: ${error.message}</p>`;
    console.error('Error fetching members:', error);
  }
}

// ---- Render based on currentView ----
function renderMembers(members) {
  container.innerHTML = '';

  if (currentView === 'grid') {
    container.className = 'grid-view';
    members.forEach(m => container.appendChild(createCard(m)));
  } else {
    container.className = 'list-view';
    members.forEach(m => container.appendChild(createListItem(m)));
  }
}

// ---- Build CARD element ----
function createCard(member) {
  const article = document.createElement('article');
  article.classList.add('member-card');

  const levelClass = LEVEL_BADGES[member.level] || 'badge-member';
  const levelLabel = LEVEL_LABELS[member.level] || 'Miembro';

  article.innerHTML = `
    <div class="card-img-wrap">
      <img
        src="images/${member.image}"
        alt="Logo de ${member.name}"
        loading="lazy"
        onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=card-img-placeholder>🏢</span>'"
      >
    </div>
    <div class="card-body">
      <h3>${member.name}</h3>
      <p class="card-desc">${member.description}</p>
      <p class="card-info">📍 ${member.address}</p>
      <p class="card-info">📞 ${member.phone}</p>
      <p class="card-info">🌐 <a href="${member.website}" target="_blank" rel="noopener">Sitio web</a></p>
    </div>
    <div class="card-footer">
      <span class="badge ${levelClass}">${levelLabel}</span>
    </div>
  `;
  return article;
}

// ---- Build LIST ITEM element ----
function createListItem(member) {
  const item = document.createElement('div');
  item.classList.add('member-list-item');

  const levelClass = LEVEL_BADGES[member.level] || 'badge-member';
  const levelLabel = LEVEL_LABELS[member.level] || 'Miembro';

  item.innerHTML = `
    <div class="list-info">
      <h3>${member.name}</h3>
      <p>${member.address}</p>
    </div>
    <div class="list-contact">
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank" rel="noopener">Sitio web</a>
    </div>
    <span class="badge ${levelClass}">${levelLabel}</span>
  `;
  return item;
}

// ---- View toggle buttons ----
btnGrid?.addEventListener('click', () => {
  currentView = 'grid';
  btnGrid.classList.add('active');
  btnList.classList.remove('active');
  // Re-render without re-fetching (store data)
  fetchAndStore();
});

btnList?.addEventListener('click', () => {
  currentView = 'list';
  btnList.classList.add('active');
  btnGrid.classList.remove('active');
  fetchAndStore();
});

// ---- Store fetched data to avoid repeated requests ----
let cachedMembers = null;

async function fetchAndStore() {
  if (cachedMembers) {
    renderMembers(cachedMembers);
    return;
  }
  container.innerHTML = '<p class="loading-msg">Cargando miembros...</p>';
  try {
    const response = await fetch(MEMBERS_URL);
    if (!response.ok) throw new Error(`HTTP error: ${response.status}`);
    cachedMembers = await response.json();
    renderMembers(cachedMembers);
  } catch (error) {
    container.innerHTML = `<p class="error-msg">Error al cargar los miembros: ${error.message}</p>`;
    console.error('Error fetching members:', error);
  }
}

// ---- Init ----
fetchAndStore();
