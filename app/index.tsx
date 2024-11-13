import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import { useState } from 'react';

export default function HomeScreen() {
  //   const apiUrl = process.env.EXPO_PUBLIC_OPEN_WEATHER_API_KEY; // TODO: Change later
  const [search, setSearch] = useState('');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Weather App</Text>

      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder='Enter city...'
        style={styles.input}
      />

      <Pressable style={styles.button}>
        <Text>Search</Text>
      </Pressable>
    </View>
  );
}

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
});
