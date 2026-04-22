// 1. Libraries
import { useEffect, useState } from "react";

// 2. Helpers, Hooks & API
import { getWeatherData } from "../../helpers/externalAPI";
import { getWeatherMetrics } from "../../helpers/weatherFields";

// 3. Styled Components
import {
  WeatherContainer,
  TempDisplay,
  TempValue,
  TempUnit,
  WeatherLabel,
  MetricsGrid,
  MetricItem,
  MetricLabel,
  MetricValue,
} from "./Weather.styled";

export const Weather = ({ city, mapType }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (!city) return;
    setWeather(null);
    getWeatherData(city, mapType).then(setWeather);
  }, [city]);

  if (!weather) return null;

  return (
    <WeatherContainer>
      <TempDisplay>
        <img
          src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
          alt="weather icon"
        />
        <TempValue>{Math.round(weather.main.temp)}</TempValue>
        <TempUnit>°C</TempUnit>
        <WeatherLabel>{weather.weather[0].description}</WeatherLabel>
      </TempDisplay>

      <MetricsGrid>
        {getWeatherMetrics(weather).map(({ id, label, value, color }) => (
          <MetricItem key={id}>
            <MetricLabel>{label}</MetricLabel>
            <MetricValue $color={color}>{value}</MetricValue>
          </MetricItem>
        ))}
      </MetricsGrid>
    </WeatherContainer>
  );
};
