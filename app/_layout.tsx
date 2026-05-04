import { Stack } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PaperProvider } from 'react-native-paper';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* La ruta principal son las pestañas */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          {/* Configuramos 'nueva-nota' como un modal desde la raíz */}
          <Stack.Screen 
            name="nueva-nota" 
            options={{ 
              presentation: 'modal',
              headerShown: true, // Esto permite que el botón 'Salir' que pusimos se vea
              title: 'Nueva entrada'
            }} 
          />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}