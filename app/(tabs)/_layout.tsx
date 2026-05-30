import React from 'react';
import { useColorScheme, Platform } from 'react-native';
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const currentTheme = colorScheme === 'dark' ? Colors.dark : Colors.light;

  return (
    <Tabs 
      screenOptions={{ 
        tabBarActiveTintColor: currentTheme.primary,
        tabBarInactiveTintColor: currentTheme.textSecondary,
        tabBarStyle: {
          backgroundColor: currentTheme.surface,
          borderTopColor: currentTheme.border,
          borderTopWidth: 1,
          elevation: 0,
          shadowOpacity: 0,
          height: Platform.OS === 'ios' ? 88 : 64,
          paddingBottom: Platform.OS === 'ios' ? 30 : 12,
          paddingTop: 8,
        },
        headerShown: false 
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="file-document-outline" size={size || 24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="checklists"
        options={{
          title: 'Listas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="checkbox-marked-circle-outline" size={size || 24} color={color} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb-on-outline" size={size || 24} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}