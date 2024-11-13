import { getWeatherIconUrl } from '@/api/api';
import { useWeatherStore } from '@/store/weatherStore';
import { Unit } from '@/types/weather';
import { useMemo } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

const windDirections = {
  0: 'N',
  22.5: 'NNE',
  45: 'NE',
  67.5: 'ENE',
  90: 'E',
  112.5: 'ESE',
  135: 'SE',
  157.5: 'SSE',
  180: 'S',
  202.5: 'SSW',
  225: 'SW',
  247.5: 'WSW',
  270: 'W',
  292.5: 'WNW',
  315: 'NW',
  337.5: 'NNW',
};

export default function WeatherPage() {
  const { selectedWeather } = useWeatherStore();

  const temperatureUnit = useMemo(
    () => (selectedWeather?.measurement === Unit.METRIC ? '°C' : '°F'),
    [selectedWeather?.measurement],
  );

  const speedUnit = useMemo(
    () => (selectedWeather?.measurement === Unit.METRIC ? 'm/s' : 'mi/h'),
    [selectedWeather?.measurement],
  );

  const windDirection = useMemo(
    () =>
      Object.entries(windDirections).reduce((prev, curr) => {
        if (
          Math.abs(+curr[0] - (selectedWeather?.wind.deg || 0)) <
          Math.abs(+prev[0] - (selectedWeather?.wind.deg || 0))
        ) {
          return curr;
        }

        return prev;
      })[1],
    [selectedWeather?.wind.deg],
  );

  return (
    <View style={styles.container}>
      <Image
        style={styles.image}
        src={getWeatherIconUrl(selectedWeather?.weather[0].icon || '01d')}
      />

      <Text style={styles.text}>{selectedWeather?.weather[0].main}</Text>
      <Text style={styles.text}>{selectedWeather?.weather[0].description}</Text>

      <Text style={styles.text}>Cloud coverage: {selectedWeather?.clouds.all}%</Text>
      <Text style={styles.text}>
        Temperature: {selectedWeather?.main.temp}
        {temperatureUnit}
      </Text>
      <Text style={styles.text}>
        Feels like: {selectedWeather?.main.feels_like}
        {temperatureUnit}
      </Text>

      <Text style={styles.text}>Humidity: {selectedWeather?.main.humidity}%</Text>
      <Text style={styles.text}>Pressure: {selectedWeather?.main.pressure}hPa</Text>

      <Text style={styles.text}>
        Direction: {selectedWeather?.wind.deg}°, {windDirection}
      </Text>
      <Text style={styles.text}>
        Speed: {selectedWeather?.wind.speed}
        {speedUnit}
      </Text>
      <Text style={styles.text}>
        Gust: {selectedWeather?.wind.gust}
        {speedUnit}
      </Text>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 32,

    backgroundColor: '#222',

    alignItems: 'center',
    display: 'flex',
    gap: 32,
  },

  image: {
    width: 128,
    height: 128,
  },

  text: {
    textAlign: 'center',

    fontSize: 16,
    color: 'white',
  },
});
