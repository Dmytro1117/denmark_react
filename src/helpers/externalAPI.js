import axios from "axios";
import { countryOptions } from "../helpers/constant";

const RESTCOUNTRIES_KEY = import.meta.env.VITE_RESTCOUNTRIES_KEY;
const WEATHER_KEY = import.meta.env.VITE_WEATHER_KEY;

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
      `https://api.restcountries.com/countries/v5?names.common=${trimmed}&strict=true`,
      {
        headers: {
          Authorization: `Bearer ${RESTCOUNTRIES_KEY}`,
        },
      },
    );

    const info = data?.data?.objects?.find(
      (item) => item.names?.common?.toLowerCase() === trimmed.toLowerCase(),
    );

    if (!info) {
      return {
        error: `Country "${trimmed}" not found`,
        type: "not_found",
      };
    }

    return {
      data: {
        officialName: info.names?.official,
        capital: info.capitals?.[0]?.name,
        region: [info.region, info.subregion].filter(Boolean).join(" / "),
        population: info.population?.toLocaleString(),
        area: info.area?.kilometers?.toLocaleString()
          ? `${info.area.kilometers.toLocaleString()} KM²`
          : null,
        currency: info.currencies
          ? `${info.currencies[0].name} (${info.currencies[0].symbol || info.currencies[0].code})`
          : null,
        languages: info.languages?.map((lang) => lang.name).join(", "),
        timezone: info.timezones?.[0],
        driveSide: info.cars?.driving_side?.toUpperCase(),
        tld: info.tlds?.[0],
        weekStart: info.date?.start_of_week?.toUpperCase(),
        coatOfArms: info.flag?.url_svg,
        description: info.descriptions?.short,
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
