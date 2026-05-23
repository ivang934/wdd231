// =============================================
//  CHAMBER CABA - index.js
//  Weather (OpenWeatherMap) + Spotlights
// =============================================

// ⚠️  Replace with your free key from openweathermap.org
const API_KEY = '3fbbb4f82eccb1f208887a9e2e721c6b';

// Buenos Aires, Capital Federal
const LAT   = -34.6037;
const LON   = -58.3816;
const UNITS = 'metric'; // Celsius
const LANG  = 'en';     // weather descriptions in English

const MEMBERS_URL = 'data/members.json';

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
//  WEATHER
// ================================================

async function loadWeather() {
  const container = document.getElementById('weather-container');
  if (!container) return;

  try {
    const currentRes = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&units=${UNITS}&lang=${LANG}&appid=${API_KEY}`
    );
    const forecastRes = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${LAT}&lon=${LON}&units=${UNITS}&lang=${LANG}&appid=${API_KEY}`
    );

    if (!currentRes.ok || !forecastRes.ok) throw new Error('Weather API error');

    const current  = await currentRes.json();
    const forecast = await forecastRes.json();

    container.innerHTML = renderWeather(current, forecast);

  } catch (err) {
    container.innerHTML = `<p class="error-msg">Could not load weather: ${err.message}</p>`;
    console.error('Weather error:', err);
  }
}

function renderWeather(current, forecast) {
  const temp     = Math.round(current.main.temp);
  const desc     = current.weather[0].description;
  const iconCode = current.weather[0].icon;
  const iconUrl  = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

  const days = getThreeDayForecast(forecast.list);

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const forecastHTML = days.map(item => {
    const date    = new Date(item.dt * 1000);
    const dayName = dayNames[date.getDay()];
    const t       = Math.round(item.main.temp);
    const icon    = `https://openweathermap.org/img/wn/${item.weather[0].icon}.png`;
    return `
      <div class="forecast-day">
        <span class="day-name">${dayName}</span>
        <img class="day-icon" src="${icon}" alt="${item.weather[0].description}" width="40" height="40">
        <span class="day-temp">${t}°C</span>
      </div>`;
  }).join('');

  return `
    <div class="weather-current">
      <img src="${iconUrl}" alt="${desc}" width="64" height="64" style="flex-shrink:0">
      <div>
        <div class="weather-temp">${temp}°C</div>
        <div class="weather-desc">${desc}</div>
      </div>
    </div>
    <div class="weather-forecast">
      ${forecastHTML}
    </div>`;
}

function getThreeDayForecast(list) {
  const seen  = new Set();
  const days  = [];
  const today = new Date().getDate();

  for (const item of list) {
    const d      = new Date(item.dt * 1000);
    const dayKey = d.getDate();
    if (dayKey !== today && !seen.has(dayKey) && days.length < 3) {
      seen.add(dayKey);
      days.push(item);
    }
  }
  return days;
}

function renderWeatherPlaceholder() {
  return `
    <div class="weather-current">
      <div class="weather-icon">🌤️</div>
      <div>
        <div class="weather-temp">—°C</div>
        <div class="weather-desc">Set up your API key in index.js</div>
      </div>
    </div>
    <div class="weather-forecast">
      ${['Mon', 'Tue', 'Wed'].map(d => `
        <div class="forecast-day">
          <span class="day-name">${d}</span>
          <div class="day-icon">—</div>
          <span class="day-temp">—°C</span>
        </div>`).join('')}
    </div>
    <p style="font-size:0.75rem;color:var(--clr-muted);margin-top:0.8rem">
      ➜ Get your free key at
      <a href="https://openweathermap.org/api" target="_blank" rel="noopener">openweathermap.org</a>
      and replace <code>YOUR_API_KEY_HERE</code> in <code>scripts/index.js</code>.
    </p>`;
}

// ================================================
//  SPOTLIGHTS
// ================================================

async function loadSpotlights() {
  const container = document.getElementById('spotlights-container');
  if (!container) return;

  try {
    const res = await fetch(MEMBERS_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const members = await res.json();

    // Only Gold (3) and Silver (2) members
    const eligible = members.filter(m => m.level === 2 || m.level === 3);

    // Shuffle and pick 2 or 3
    const shuffled = eligible.sort(() => Math.random() - 0.5);
    const selected = shuffled.slice(0, Math.min(3, shuffled.length));

    container.innerHTML = selected.map(buildSpotlightCard).join('');

  } catch (err) {
    container.innerHTML = `<p class="error-msg">Could not load member spotlights.</p>`;
    console.error('Spotlights error:', err);
  }
}

const LEVEL_LABELS = { 1: 'Member', 2: 'Silver', 3: 'Gold' };
const LEVEL_BADGES = { 1: 'badge-member', 2: 'badge-silver', 3: 'badge-gold' };

function buildSpotlightCard(m) {
  const badgeClass = LEVEL_BADGES[m.level] || 'badge-member';
  const badgeLabel = LEVEL_LABELS[m.level] || 'Member';

  return `
    <div class="spotlight-card">
      <div class="spotlight-logo">
        <img
          src="images/${m.image}"
          alt="${m.name} logo"
          onerror="this.style.display='none'; this.parentElement.innerHTML='<span class=spotlight-logo-placeholder>🏢</span>'"
        >
      </div>
      <div class="spotlight-info">
        <h3>${m.name}</h3>
        <p>📞 ${m.phone}</p>
        <p>📍 ${m.address}</p>
        <a href="${m.website}" target="_blank" rel="noopener">Visit website ↗</a>
        <p><span class="badge ${badgeClass}" style="margin-top:0.4rem">${badgeLabel}</span></p>
      </div>
    </div>`;
}

// ================================================
//  INIT
// ================================================
loadWeather();
loadSpotlights();
