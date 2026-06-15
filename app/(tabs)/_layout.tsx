// E:\Proyectos\noteflow\app\(tabs)\_layout.tsx
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: true }}>
      <Tabs.Screen name="index" options={{ title: 'Inicio', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="notas" options={{ title: 'Notas', tabBarIcon: ({ color }) => <Ionicons name="document-text" size={24} color={color} /> }} />
      <Tabs.Screen name="checklists" options={{ title: 'Checklist', tabBarIcon: ({ color }) => <Ionicons name="checkbox" size={24} color={color} /> }} />
      <Tabs.Screen name="ideas" options={{ title: 'Ideas', tabBarIcon: ({ color }) => <Ionicons name="bulb" size={24} color={color} /> }} />
    </Tabs>
  );
}