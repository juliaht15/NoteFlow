import { Tabs } from 'expo-router';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: Colors.placeholder,
        tabBarStyle: {
          borderTopWidth: 1,
          borderTopColor: Colors.border,
          height: 60,
          paddingBottom: 8,
        },
        headerStyle: {
          backgroundColor: Colors.surface,
        },
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="notas/index"
        options={{
          title: 'Mis Notas',
          headerTitle: 'NoteFlow',
          tabBarLabel: 'Notas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="note-text" color={color} size={size} />
          ),
        }}
      />
      
      <Tabs.Screen
        name="checklists"
        options={{
          title: 'Checklists',
          tabBarLabel: 'Tareas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-checks" color={color} size={size} />
          ),
        }}
      />

      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarLabel: 'Ideas',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="lightbulb" color={color} size={size} />
          ),
        }}
      />

      {/* ESTO OCULTA LA PESTAÑA DE DETALLE DEL MENÚ INFERIOR */}
      <Tabs.Screen
        name="notas/[id]"
        options={{
          href: null, // Al poner href null, desaparece de la barra inferior
          title: 'Detalle de Nota',
        }}
      />
    </Tabs>
  );
}