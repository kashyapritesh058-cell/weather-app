const btn = document.getElementById("btn");
const input = document.getElementById("city");
const result = document.getElementById("result");

async function getWeather() {
  const city = input.value.trim();
  if (!city) return;
  result.innerHTML = "<p>Load ho raha hai...</p>";
  try {
    const g = await fetch(
      "https://geocoding-api.open-meteo.com/v1/search?count=1&name=" + encodeURIComponent(city)
    ).then(r => r.json());
    if (!g.results) {
      result.innerHTML = "<p>Shehar nahi mila.</p>";
      return;
    }
    const p = g.results[0];
    const w = await fetch(
      "https://api.open-meteo.com/v1/forecast?latitude=" + p.latitude +
      "&longitude=" + p.longitude + "&current_weather=true"
    ).then(r => r.json());
    const c = w.current_weather;
    result.innerHTML =
      '<div class="card"><div class="muted">' + p.name + ", " + p.country + "</div>" +
      '<div class="temp">' + c.temperature + "°C</div>" +
      '<div class="muted">Hawa: ' + c.windspeed + " km/h</div></div>";
  } catch (e) {
    result.innerHTML = "<p>Internet check karo, kuch gadbad hui.</p>";
  }
}

btn.onclick = getWeather;
input.onkeydown = e => { if (e.key === "Enter") getWeather(); };