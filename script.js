const apiKey = '0c44889f20d1ce52ecc366a76da65b41';

function getWeather() {

  const cityInput = document.getElementById('cityInput').value.trim();
  const city = encodeURIComponent(cityInput);

  if (cityInput === '') {
    alert('Please enter a city name');
    return;
  }

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(url)
    .then(response => response.json())
    .then(data => {

      if (data.cod == 200) {

        const temp = data.main.temp;
        const desc = data.weather[0].description;
        const humidity = data.main.humidity;
        const wind = data.wind.speed;
        const icon = data.weather[0].icon;

        document.getElementById('weatherIcon').src =
          `https://openweathermap.org/img/wn/${icon}@2x.png`;

        document.getElementById('weatherText').innerHTML = `
          <strong>${cityInput.toUpperCase()}</strong><br>
          🌡️ Temperature: ${temp}°C<br>
          🌥️ ${desc}<br>
          💧 Humidity: ${humidity}%<br>
          💨 Wind Speed: ${wind} m/s
        `;

      } else {
        document.getElementById('weatherText').innerHTML = '❌ City not found!';
      }

    })
    .catch(() => {
      document.getElementById('weatherText').innerHTML = '⚠️ Error fetching weather!';
    });
}
