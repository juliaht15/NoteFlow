import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#3A86FF',
        tabBarInactiveTintColor: '#9CA3AF',
        headerShown: true, // Cambiado a true para que veas el título y no se vea vacío
        headerTitleAlign: 'center',
      }}
    >
      {/* 1. NOTAS: Apunta al index.tsx que está en la raíz de (tabs) */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note-text-outline" color={color} size={size} />
          ),
        }}
      />

      {/* 2. LISTAS: Apunta al archivo checklists.tsx que tienes en (tabs) */}
      <Tabs.Screen
        name="checklists"
        options={{
          title: 'Listas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-checks" color={color} size={size} />
          ),
        }}
      />

      {/* 3. IDEAS: Apunta al archivo ideas.tsx que tienes en (tabs) */}
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb-outline" color={color} size={size} />
          ),
        }}
      />

      {/* OCULTAR RUTAS DUPLICADAS: Para que no salgan iconos extra abajo */}
      <Tabs.Screen name="notas/index" options={{ href: null }} />
      <Tabs.Screen name="notas/[id]" options={{ href: null }} />
      <Tabs.Screen name="notas/_layout" options={{ href: null }} />
    </Tabs>
  );
}