const axios = require("axios");

const getCoordinates = async (address) => {
  const apiKey = "YOUR_OPENROUTESERVICE_API_KEY";
  const response = await axios.get(
    `https://api.openrouteservice.org/geocode/search?api_key=${apiKey}&text=${address}`
  );
  const coordinates = response.data.features[0].geometry.coordinates;
  return { lat: coordinates[1], lon: coordinates[0] };
};

const getWeather = async (coordinates) => {
  const apiKey = "YOUR_OPENWEATHERMAP_API_KEY";
  const response = await axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${apiKey}`
  );
  const { temp, pressure, humidity } = response.data.main;
  const condition = response.data.weather[0].main;
  return { temp, pressure, humidity, condition };
};

module.exports = { getCoordinates, getWeather };
