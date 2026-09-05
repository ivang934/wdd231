// Hamburger nav + footer year/last-modified now live in scripts/site.js
// (loaded before this file — see index.html).

// ============ Weather (Open-Meteo, no API key required) ============
const WEATHER_LAT = -34.6037;
const WEATHER_LON = -58.3816;

const weatherCodeText = {
  0: "Clear sky", 1: "Mostly clear", 2: "Partly cloudy", 3: "Overcast",
  45: "Fog", 48: "Depositing fog",
  51: "Light drizzle", 53: "Drizzle", 55: "Dense drizzle",
  61: "Light rain", 63: "Rain", 65: "Heavy rain",
  71: "Light snow", 73: "Snow", 75: "Heavy snow",
  80: "Rain showers", 81: "Rain showers", 82: "Violent rain showers",
  95: "Thunderstorm", 96: "Thunderstorm w/ hail", 99: "Thunderstorm w/ hail"
};

async function loadWeather() {
  const container = document.querySelector("#weather-container");
  const url = `https://api.open-meteo.com/v1/forecast?latitude=${WEATHER_LAT}&longitude=${WEATHER_LON}` +
    `&current=temperature_2m,weather_code&daily=temperature_2m_max,temperature_2m_min,weather_code` +
    `&timezone=America%2FArgentina%2FBuenos_Aires&forecast_days=4`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("Weather request failed");
    const data = await response.json();
    renderWeather(data, container);
  } catch (error) {
    container.innerHTML = `<p class="loading-msg">Weather is unavailable right now.</p>`;
    console.error(error);
  }
}

function renderWeather(data, container) {
  const current = data.current;
  const desc = weatherCodeText[current.weather_code] ?? "—";

  let html = `
    <p class="current-temp">${Math.round(current.temperature_2m)}°C</p>
    <p class="weather-desc">${desc}</p>
  `;

  // Skip today's index (0), show next 3 days
  for (let i = 1; i < data.daily.time.length; i++) {
    const day = new Date(data.daily.time[i]).toLocaleDateString("en-US", { weekday: "short" });
    const max = Math.round(data.daily.temperature_2m_max[i]);
    const min = Math.round(data.daily.temperature_2m_min[i]);
    html += `
      <div class="forecast-row">
        <span>${day}</span>
        <span>${weatherCodeText[data.daily.weather_code[i]] ?? "—"}</span>
        <span>${max}° / ${min}°</span>
      </div>
    `;
  }

  container.innerHTML = html;
}

loadWeather();

// ============ Member spotlights ============
// Picks 2-3 random members from silver/gold tiers, per chamber spec.
function loadSpotlights() {
  const container = document.querySelector("#spotlights-container");
  const eligible = members.filter((m) => m.level === "gold" || m.level === "silver");
  const shuffled = [...eligible].sort(() => 0.5 - Math.random());
  const chosen = shuffled.slice(0, 3);

  container.innerHTML = chosen
    .map(
      (m) => `
      <div class="spotlight-card">
        <h3>${m.name}</h3>
        <span class="membership-level">${m.level} member</span>
        <p>${m.description}</p>
        <p class="contact">${m.address} · ${m.phone}</p>
      </div>
    `
    )
    .join("");
}

loadSpotlights();
