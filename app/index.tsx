import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { getWeather } from '@/api/api';
import { useWeatherStore } from '@/store/weatherStore';
import { IWeatherReport } from '@/types/weather';
import { useRouter } from 'expo-router';
import { useState } from 'react';

export default function HomeScreen() {
  const router = useRouter();
  const { selectWeather } = useWeatherStore();

  // State of the input value
  const [search, setSearch] = useState('');

  // Error state
  const [error, setError] = useState('');

  // Fetching state
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = () => {
    setIsLoading(true);
    getWeather(search)
      .then(data => {
          console.log('🔔🔔🔔 ~ file: index.tsx:29 ~ handleSearch ~ data => ', data);
        selectWeather(data as IWeatherReport);
        router.navigate('/weather');
      })
      .catch(e => {
        setError(`${e.message[0].toUpperCase()}${e.message.slice(1)}`);
      })
      .finally(() => setIsLoading(false));
  };

  const handleChangeText = (value: string) => {
    if (error) {
      setError('');
    }

    setSearch(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      <TextInput
        value={search}
        onChangeText={handleChangeText}
        placeholder='Enter city...'
        style={styles.input}
      />

      <Pressable
        style={styles.button}
        onPress={handleSearch}
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
    justifyContent: 'center',
    display: 'flex',
    gap: 32,
  },

  input: {
    width: '100%',
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
});
