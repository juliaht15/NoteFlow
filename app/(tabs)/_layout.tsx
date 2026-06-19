import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useTheme } from '../../constants/theme';

export default function TabsLayout() {
  const { colors } = useTheme();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.secondaryText,
        tabBarShowLabel: true,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: '600',
          marginBottom: 6,
        },
        tabBarStyle: {
          backgroundColor: colors.surface,
          borderTopColor: 'transparent',
          position: 'absolute',
          bottom: 24,
          left: 18,
          right: 18,
          borderRadius: 24,
          height: 76,
          paddingTop: 8,
          paddingBottom: 10,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 6 },
          shadowOpacity: 0.2,
          shadowRadius: 10,
          elevation: 6,
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
            <MaterialCommunityIcons name="home" color={color} size={size + 2} />
          ),
        }}
      />

      <Tabs.Screen
        name="notas/index"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document" color={color} size={size + 2} />
          ),
        }}
      />

      <Tabs.Screen
        name="checklists/index"
        options={{
          title: 'Checklist',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="checkbox-marked" color={color} size={size + 2} />
          ),
        }}
      />

      <Tabs.Screen
        name="ideas/index"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb" color={color} size={size + 2} />
          ),
        }}
      />

      <Tabs.Screen name="notas/[id]" options={{ href: null }} />
      <Tabs.Screen name="checklists/[id]" options={{ href: null }} />
      <Tabs.Screen name="ideas/[id]" options={{ href: null }} />
    </Tabs>
  );
}