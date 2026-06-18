import React from 'react';
import { StyleSheet } from 'react-native';
import { Stack } from 'expo-router';
import { useTheme } from '../constants/theme';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

// Fuerza la carga de la persistencia nativa de Firebase nada más arrancar la app
import '../lib/firebaseConfig'; 

export default function RootLayout() {
  const { colors } = useTheme();

  return (
    <GestureHandlerRootView style={styles.container}>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.surface,
          },
          headerTintColor: colors.text,
          headerShadowVisible: false,
          contentStyle: { backgroundColor: colors.background }
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ title: 'Crear Cuenta' }} />
      </Stack>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
});