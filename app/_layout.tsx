// E:\Proyectos\noteflow\app\_layout.tsx
import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      {/* Esto conecta el layout raíz con la estructura de pestañas */}
      <Stack.Screen name="(tabs)" />
    </Stack>
  );
}