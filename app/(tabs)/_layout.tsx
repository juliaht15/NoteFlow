import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3A86FF',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="notas/index"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note-text-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb-outline" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="checklists"
        options={{
          title: 'Listas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted" color={color} size={size} />
          ),
        }}
      />
    </Tabs>
  );
}