export const getWeatherMetrics = (data) => [
  {
    id: "feels",
    label: "FEELS LIKE",
    value: `${Math.round(data.main.feels_like)}°C`,
  },
  { id: "wind", label: "WIND", value: `${data.wind.speed} m/s` },
  {
    id: "vis",
    label: "VISIBILITY",
    value: `${(data.visibility / 1000).toFixed(1)} km`,
  },
  { id: "clouds", label: "CLOUDINESS", value: `${data.clouds.all}%` },
  {
    id: "sunrise",
    label: "SUNRISE",
    value: new Date(data.sys.sunrise * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    color: "#1374ceb6",
  },
  {
    id: "sunset",
    label: "SUNSET",
    value: new Date(data.sys.sunset * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    color: "#99072483",
  },
];
