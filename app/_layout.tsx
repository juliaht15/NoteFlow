import React from 'react';
import { useColorScheme } from 'react-native';
import { Stack } from 'expo-router';
import { Provider as PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { Colors } from '../constants/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';

  const paperTheme = isDark
    ? { ...MD3DarkTheme, colors: { ...MD3DarkTheme.colors, primary: Colors.dark.primary, background: Colors.dark.surface } }
    : { ...MD3LightTheme, colors: { ...MD3LightTheme.colors, primary: Colors.light.primary, background: Colors.light.surface } };

  return (
    <PaperProvider theme={paperTheme}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        <Stack.Screen 
          name="nueva-nota" 
          options={{ 
            headerShown: false, 
            presentation: 'modal',
          }} 
        />
      </Stack>
    </PaperProvider>
  );
}