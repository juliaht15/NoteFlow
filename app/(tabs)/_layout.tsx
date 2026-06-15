import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs screenOptions={{ tabBarActiveTintColor: 'blue', headerShown: true }}>
      <Tabs.Screen name="index.tsx" options={{ title: 'Inicio', tabBarIcon: ({ color }) => <Ionicons name="home" size={24} color={color} /> }} />
      <Tabs.Screen name="notas/index.tsx" options={{ title: 'Notas', tabBarIcon: ({ color }) => <Ionicons name="document-text" size={24} color={color} /> }} />
      <Tabs.Screen name="checklists/index.tsx" options={{ title: 'Checklist', tabBarIcon: ({ color }) => <Ionicons name="checkbox" size={24} color={color} /> }} />
      <Tabs.Screen name="ideas/index.tsx" options={{ title: 'Ideas', tabBarIcon: ({ color }) => <Ionicons name="bulb" size={24} color={color} /> }} />
    </Tabs>
  );
}