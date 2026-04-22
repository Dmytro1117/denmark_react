import axios from "axios";
import { countryOptions } from "../helpers/constant";

const WEATHER_KEY = "fad9e8bcd1a34f58e68e0530143ae3bb";

export const getCountryData = async (name) => {
  try {
    const trimmed = name.trim();

    if (!/^\p{L}[\p{L}\s'-]*$/u.test(trimmed)) {
      return {
        error: "Only letters are allowed",
        type: "validation",
      };
    }

    const { data } = await axios.get(
      `https://restcountries.com/v3.1/name/${trimmed}?fullText=true`,
    );

    const info = data[0];

    return {
      data: {
        officialName: info.name.official,
        capital: info.capital?.[0],
        region: `${info.region} / ${info.subregion}`,
        population: info.population.toLocaleString(),
        area: `${info.area.toLocaleString()} KM²`,
        currency: `${Object.values(info.currencies)[0].name} (${Object.values(info.currencies)[0].symbol})`,
        languages: Object.values(info.languages).join(", "),
        timezone: info.timezones[0],
        driveSide: info.car.side.toUpperCase(),
        tld: info.tld[0],
        weekStart: info.startOfWeek.toUpperCase(),
        coatOfArms: info.coatOfArms.svg,
      },
    };
  } catch (error) {
    if (error.response?.status === 404) {
      return {
        error: `Country "${name.trim()}" not found`,
        type: "not_found",
      };
    }

    return {
      error: error.message || "Server connection error",
      type: "server",
    };
  }
};

export const getWeatherData = async (point, mapType) => {
  try {
    // 1. fallback місто
    const country = countryOptions.find((opt) => opt.value === mapType);
    const fallbackCity = country?.defaultCity || "Kyiv";

    // 2. пробуємо знайти координати введеного point
    const geoRes = await axios.get(
      `https://api.openweathermap.org/geo/1.0/direct?q=${point}&limit=1&appid=${WEATHER_KEY}`,
    );

    let lat, lon, usedCity;

    if (geoRes.data && geoRes.data.length > 0) {
      const geo = geoRes.data[0];
      lat = geo.lat;
      lon = geo.lon;
      usedCity = geo.name;
    } else {
      // fallback геокодінг
      const fallbackGeo = await axios.get(
        `https://api.openweathermap.org/geo/1.0/direct?q=${fallbackCity}&limit=1&appid=${WEATHER_KEY}`,
      );

      if (!fallbackGeo.data || fallbackGeo.data.length === 0) {
        return null;
      }

      const geo = fallbackGeo.data[0];
      lat = geo.lat;
      lon = geo.lon;
      usedCity = geo.name;
    }

    // 3. отримуємо погоду по координатах
    const weatherRes = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${WEATHER_KEY}`,
    );

    return weatherRes.data;
  } catch (error) {
    return null;
  }
};
