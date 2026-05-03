import { Tabs } from 'expo-router';
import { Colors } from '../../constants/theme';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: Colors.primary, // Ahora será el nuevo azul
      headerStyle: {
        backgroundColor: Colors.surface,
      },
      headerTintColor: Colors.text,
    }}>
      {/* Tus Tabs.Screen aquí */}
    </Tabs>
  );
}