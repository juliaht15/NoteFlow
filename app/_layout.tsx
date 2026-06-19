import React from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '../constants/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { PaperProvider } from 'react-native-paper';
import { StatusBar } from 'expo-status-bar';

import '../lib/firebaseConfig'; 

export default function RootLayout() {
  const { colors, paperTheme, isDarkMode } = useTheme();

  return (
    <GestureHandlerRootView style={styles.container}>
      <PaperProvider theme={paperTheme}>
        <StatusBar style={isDarkMode ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: colors.surface,
            },
            headerTintColor: colors.text,
            headerShadowVisible: false,
            contentStyle: { backgroundColor: colors.background } // Esto se actualiza reactivamente ahora
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="register" options={{ title: 'Crear Cuenta' }} />
        </Stack>
      </PaperProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});