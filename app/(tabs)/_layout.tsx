import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#70A1FF',
        tabBarInactiveTintColor: '#A4B0BE',
        headerShown: true,
        headerStyle: {
          backgroundColor: '#1E1E24',
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: {
          color: '#FFFFFF',
          fontWeight: '600',
          fontSize: 18,
        },
        tabBarStyle: {
          backgroundColor: '#1E1E24',
          borderTopWidth: 1,
          borderTopColor: '#2F3542',
          height: 60,
          paddingBottom: 8,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Inicio',
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notas/index"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color }) => (
            <Ionicons name="document-text" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="checklists/index"
        options={{
          title: 'Checklist',
          tabBarIcon: ({ color }) => (
            <Ionicons name="checkbox" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="ideas/index"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color }) => (
            <Ionicons name="bulb" size={22} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="notas/[id]"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="checklists/[id]"
        options={{
          href: null,
        }}
      />

      <Tabs.Screen
        name="ideas/[id]"
        options={{
          href: null,
        }}
      />
    </Tabs>
  );
}