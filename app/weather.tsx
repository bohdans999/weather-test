import { getWeatherIconUrl } from '@/api/api';
import { useWeatherStore } from '@/store/weatherStore';
import { Unit } from '@/types/weather';
import { capitalizeSentence } from '@/utils/string';
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

      <View>
        <Text style={[styles.text, styles.textBig, styles.textBold]}>
          {selectedWeather?.weather[0].main}
        </Text>
        <Text style={[styles.text, styles.textSmol]}>
          {capitalizeSentence(selectedWeather?.weather[0].description || '')}
        </Text>
        <Text style={[styles.text, styles.textSmol]}>
          Cloud coverage: {selectedWeather?.clouds.all}%
        </Text>
      </View>

      <View>
        <Text style={[styles.text, styles.textBig, styles.textBold]}>
          {selectedWeather?.main.temp}
          {temperatureUnit}
        </Text>

        <Text style={[styles.text, styles.textSmol]}>
          Feels like: {selectedWeather?.main.feels_like}
          {temperatureUnit}
        </Text>
      </View>

      <View>
        <Text style={[styles.text, styles.sectionText]}>Environment:</Text>

        <Text style={[styles.text, styles.textSmol]}>
          Humidity: {selectedWeather?.main.humidity}%
        </Text>
        <Text style={[styles.text, styles.textSmol]}>
          Pressure: {selectedWeather?.main.pressure}hPa
        </Text>
      </View>

      <View>
        <Text style={[styles.text, styles.sectionText]}>Wind:</Text>

        <Text style={[styles.text, styles.textSmol]}>
          Direction: {selectedWeather?.wind.deg}°, {windDirection}
        </Text>
        <Text style={[styles.text, styles.textSmol]}>
          Speed: {selectedWeather?.wind.speed}
          {speedUnit}
        </Text>
        <Text style={[styles.text, styles.textSmol]}>
          Gust: {selectedWeather?.wind.gust}
          {speedUnit}
        </Text>
      </View>
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
    width: 192,
    height: 192,
  },

  text: {
    textAlign: 'center',

    color: 'white',
  },

  textBig: {
    fontSize: 32,
  },

  textSmol: {
    fontSize: 16,
  },

  textBold: {
    fontWeight: 'bold',
  },

  sectionText: {
    marginBottom: 8,
    fontSize: 24,
  },
});
