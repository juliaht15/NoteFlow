import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: Colors.primary,
      headerShown: true 
    }}>
      <Tabs.Screen
        name="index" // Tu pantalla principal de Notas/Tareas
        options={{
          title: 'Notas',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="clipboard-text" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="lightbulb" size={24} color={color} />,
        }}
      />
      {/* OCULTAR RUTAS INNECESARIAS */}
      <Tabs.Screen name="notas/[id]" options={{ href: null }} />
      <Tabs.Screen name="notas/index" options={{ href: null }} />
    </Tabs>
  );
}