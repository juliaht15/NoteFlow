import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* El grupo de pestañas principal */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* El modal de creación */}
      <Stack.Screen 
        name="nueva-nota" 
        options={{ 
          presentation: 'modal',
          title: 'Nueva Entrada'
        }} 
      />
    </Stack>
  );
}