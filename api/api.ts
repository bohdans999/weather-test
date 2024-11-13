import { IWeatherReport } from '@/types/weather';

const WEATHER_API_URL = process.env.EXPO_PUBLIC_OPEN_WEATHER_URL;
const WEATHER_API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;

export const getWeather = async (
  city: string,
  units: 'metric' | 'imperial' = 'metric',
): Promise<IWeatherReport | { message: string }> => {
  const res = await fetch(
    `${WEATHER_API_URL}/data/2.5/weather?q=${city}&units=${units}&appid=${WEATHER_API_KEY}`,
  );

  if (!res.ok) {
    throw await res.json();
  }

  return await res.json();
};
