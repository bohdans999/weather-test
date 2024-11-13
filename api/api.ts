import { IWeatherReport } from '@/types/weather';

const WEATHER_API_URL = process.env.EXPO_PUBLIC_OPEN_WEATHER_URL;
const WEATHER_API_KEY = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY;

export const getWeather = async (
  city: string,
  units: 'metric' | 'imperial' = 'metric',
): Promise<IWeatherReport> => {
  try {
    const res = await fetch(
      `${WEATHER_API_URL}/data/2.5/weather?q=${city}&units=${units}&appid=${WEATHER_API_KEY}`,
    );

    return await res.json();
  } catch (e) {
    throw e;
  }
};
