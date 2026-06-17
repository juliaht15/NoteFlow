import React from 'react';
import { Tabs } from 'expo-router';
import { useTheme } from '../../constants/theme';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: 'transparent',
          position: 'absolute',
          bottom: 20,
          left: 16,
          right: 16,
          borderRadius: 16,
          height: 64,
          paddingBottom: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.15,
          shadowRadius: 8,
          elevation: 5,
        },
        headerStyle: {
          backgroundColor: colors.surface,
        },
        headerTintColor: colors.text,
        headerShadowVisible: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="notas/index"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="checklists/index"
        options={{
          title: 'Checklist',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="checkbox-marked" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ideas/index"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb" color={color} size={size} />
          ),
        }}
      />

      {/* Ocultar las rutas dinámicas de la barra de pestañas */}
      <Tabs.Screen name="notas/[id]" options={{ href: null }} />
      <Tabs.Screen name="checklists/[id]" options={{ href: null }} />
      <Tabs.Screen name="ideas/[id]" options={{ href: null }} />
      
      {/* Si el archivo settings.tsx está dentro de app/(tabs)/settings.tsx, se declara aquí sin pestaña */}
      <Tabs.Screen name="settings" options={{ href: null }} />
    </Tabs>
  );
}