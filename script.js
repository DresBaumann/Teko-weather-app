const { getCoordinates, getWeather } = require("./weather");

document
  .getElementById("address-form")
  .addEventListener("submit", async (event) => {
    event.preventDefault();
    const address = document.getElementById("address").value;

    try {
      const coordinates = await getCoordinates(address);
      const weatherData = await getWeather(coordinates);

      document.getElementById(
        "temperature"
      ).innerText = `Temperature: ${weatherData.temp}°C`;
      document.getElementById(
        "pressure"
      ).innerText = `Pressure: ${weatherData.pressure} hPa`;
      document.getElementById(
        "humidity"
      ).innerText = `Humidity: ${weatherData.humidity}%`;

      const sun = document.getElementById("sun");
      const clouds = document.getElementById("clouds");

      if (weatherData.condition === "Clear") {
        sun.style.display = "block";
        clouds.style.display = "none";
      } else if (weatherData.condition === "Clouds") {
        sun.style.display = "none";
        clouds.style.display = "block";
      } else {
        sun.style.display = "none";
        clouds.style.display = "none";
      }

      document.getElementById("weather").style.display = "block";
    } catch (error) {
      console.error("Error fetching weather data:", error);
    }
  });
