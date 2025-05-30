const apiKey = "YOUR_API_KEY_HERE"; // Replace this with your real API key

async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  if (!city) return alert("Please enter a city name.");

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

async function getWeatherByLocation() {
  if (!navigator.geolocation) {
    return alert("Geolocation is not supported by your browser.");
  }

  navigator.geolocation.getCurrentPosition(async (position) => {
    const { latitude, longitude } = position.coords;
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
  }, () => {
    alert("Unable to retrieve your location.");
  });
}

async function fetchWeather(url) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error("City not found");
    const data = await res.json();

    const { name, main, weather, wind } = data;

    document.getElementById("weatherResult").innerHTML = `
      <h2>${name}</h2>
      <p><strong>${weather[0].main}</strong> - ${weather[0].description}</p>
      <p>🌡️ Temperature: ${main.temp}°C</p>
      <p>💨 Wind Speed: ${wind.speed} m/s</p>
      <p>☁️ Humidity: ${main.humidity}%</p>
    `;
  } catch (error) {
    document.getElementById("weatherResult").textContent = error.message;
  }
}
