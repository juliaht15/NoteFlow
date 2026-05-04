import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: Colors.primary,
      headerShown: false 
    }}>
      <Tabs.Screen
        name="notas"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color }) => <Ionicons name="document-text" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="checklists"
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color }) => <Ionicons name="list" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color }) => <Ionicons name="bulb" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}