import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ 
      tabBarActiveTintColor: '#2196F3',
      headerShown: true,
      headerTitleAlign: 'center'
    }}>
      {/* 1. Botón Notas (el index.tsx principal) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="file-document" size={26} color={color} />,
        }}
      />

      {/* 2. Botón Ideas */}
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="lightbulb" size={26} color={color} />,
        }}
      />

      {/* 3. Botón Listas (tu archivo app/(tabs)/notas/index.tsx) */}
      <Tabs.Screen
        name="notas/index" 
        options={{
          title: 'Listas',
          tabBarIcon: ({ color }) => <MaterialCommunityIcons name="format-list-checks" size={26} color={color} />,
        }}
      />

      {/* Ocultamos el [id] de las pestañas */}
      <Tabs.Screen name="notas/[id]" options={{ href: null }} />
    </Tabs>
  );
}