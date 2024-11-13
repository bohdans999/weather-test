import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { getWeather } from '@/api/api';
import RadioButtonsSelector from '@/components/RadioButton';
import { useWeatherStore } from '@/store/weatherStore';
import { IWeatherReport, Unit } from '@/types/weather';
import { capitalizeSentence } from '@/utils/string';
import { useRouter } from 'expo-router';
import { useState } from 'react';

const units = [Unit.METRIC, Unit.IMPERIAL];

export default function HomeScreen() {
  const router = useRouter();
  const { selectWeather } = useWeatherStore();

  // State of the input value
  const [search, setSearch] = useState('');

  // Error state
  const [error, setError] = useState('');

  // Fetching state
  const [isLoading, setIsLoading] = useState(false);

  // Unit of measurement state
  const [unit, setUnit] = useState(Unit.METRIC);

  // Recent reports queries state
  const [reports, setReports] = useState<{ [key: string]: string }>({});

  // Fetches weather data
  const handleSearch = (query: string) => {
    if (!search) {
      setError('Please type in city name');
      return;
    }

    setIsLoading(true);
    getWeather(query, unit)
      .then(data => {
        // Selects data and redirects to the details page
        const report = data as IWeatherReport;

        selectWeather(report);
        // Saving the report id and name to Object (wanted to use Map, but basically same thing in this context)
        setReports(rs => {
          rs[report.id] = report.name;
          return rs;
        });
        router.navigate('/weather');
      })
      .catch(e => {
        // Sets error message
        setError(capitalizeSentence(e.message));
      })
      .finally(() => setIsLoading(false));
  };

  // On text change deletes error message, if exists
  const handleChangeText = (value: string) => {
    if (error) {
      setError('');
    }

    setSearch(value);
  };

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.itemsContainer}
    >
      <Text style={styles.title}>Weather App</Text>

      <TextInput
        value={search}
        onChangeText={handleChangeText}
        placeholder='Enter city...'
        style={styles.input}
      />

      <RadioButtonsSelector
        options={units}
        selectedOption={unit}
        selectOption={setUnit}
      />

      <Pressable
        style={styles.button}
        onPress={() => handleSearch(search)}
      >
        <Text>Search</Text>
      </Pressable>

      {isLoading ? (
        <ActivityIndicator
          size='large'
          color='#03cafc'
        />
      ) : (
        <Text style={styles.error}>{error}</Text>
      )}

      {Object.keys(reports).length > 0 && (
        <View>
          <Text style={styles.queryTitle}>Recent queries:</Text>

          <ScrollView contentContainerStyle={styles.reports}>
            {Object.entries(reports).map(([id, name]) => (
              <Pressable
                key={id}
                style={styles.button}
                onPress={() => handleSearch(name)}
              >
                <Text style={styles.report}>{name}</Text>
              </Pressable>
            ))}
          </ScrollView>
        </View>
      )}
    </ScrollView>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    padding: 32,
    paddingTop: 128,

    backgroundColor: '#222',
  },

  itemsContainer: {
    alignItems: 'center',
    display: 'flex',
    gap: 32,
  },

  input: {
    width: '100%',
    maxWidth: 600,
    padding: 8,

    backgroundColor: 'white',
    borderRadius: 12,
  },

  title: {
    textAlign: 'center',

    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },

  queryTitle: {
    marginBottom: 16,

    textAlign: 'center',

    fontSize: 24,
    color: 'white',
    fontWeight: 'bold',
  },

  button: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 24,
  },

  error: {
    width: '100%',
    textAlign: 'center',

    color: 'red',
  },

  reports: {
    gap: 8,
    alignItems: 'center',
    display: 'flex',

    marginBottom: 64,
  },

  report: {
    minWidth: 48,
    textAlign: 'center',
  },
});
