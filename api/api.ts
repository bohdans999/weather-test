import { IWeatherReport, Unit } from '@/types/weather';

const WEATHER_API_URL = process.env.EXPO_PUBLIC_OPEN_WEATHER_URL;
const WEATHER_STATIC_URL = process.env.EXPO_PUBLIC_OPEN_WEATHER_STATIC_URL;
const WEATHER_API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;

// Fetches weather report
export const getWeather = async (
  city: string,
  units: Unit = Unit.METRIC,
): Promise<IWeatherReport | { message: string }> => {
  const res = await fetch(
    `${WEATHER_API_URL}/data/2.5/weather?q=${city}&units=${units}&appid=${WEATHER_API_KEY}`,
  );

  if (!res.ok) {
    throw await res.json();
  }

  const data = await res.json();

  return {
    ...data,
    measurement: units,
  };
};

// Gets static image
export const getWeatherIconUrl = (icon: string) => {
  return `${WEATHER_STATIC_URL}/img/wn/${icon}@2x.png`;
};
