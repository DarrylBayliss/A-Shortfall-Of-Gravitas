import * as React from 'react';
import { Stack } from 'expo-router';
import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { useColorScheme } from '@/hooks/useColorScheme';

const App = () => {

  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
      <Stack.Screen
        name="RocketListScreen"
        options={{title: 'Rockets'}}/>
      <Stack.Screen
        name="RocketDetailScreen"
        options={{title: 'Rocket Detail'}}/>
      </Stack>
      </ThemeProvider>
  );
}

export default App;