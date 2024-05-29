const axios = require("axios");
const { getCoordinates, getWeather } = require("../weather");

jest.mock("axios");

describe("Weather App", () => {
  it("should fetch coordinates based on address", async () => {
    const address = "Berlin, Germany";
    const coordinates = { lat: 52.52, lon: 13.405 };

    axios.get.mockResolvedValueOnce({
      data: {
        features: [{ geometry: { coordinates: [13.405, 52.52] } }],
      },
    });

    const result = await getCoordinates(address);
    expect(result).toEqual(coordinates);
  });

  it("should fetch weather data based on coordinates", async () => {
    const coordinates = { lat: 52.52, lon: 13.405 };
    const weatherData = {
      temp: 20,
      pressure: 1012,
      humidity: 60,
    };

    axios.get.mockResolvedValueOnce({
      data: {
        main: weatherData,
        weather: [{ main: "Clouds" }],
      },
    });

    const result = await getWeather(coordinates);
    expect(result).toEqual({ ...weatherData, condition: "Clouds" });
  });
});
