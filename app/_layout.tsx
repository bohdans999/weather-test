import { useWeatherStore } from '@/store/weatherStore';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const { selectedWeather } = useWeatherStore();

  // Loading fonts
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  // Showing loading screen until fully loaded
  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name='weather'
          options={{
            headerShown: true,
            title: `Weather in ${selectedWeather?.name}`,
            headerStyle: { backgroundColor: '#181818' },
            headerTintColor: 'white'
          }}
        />
      </Stack>

      <StatusBar style='auto' />
    </>
  );
}
