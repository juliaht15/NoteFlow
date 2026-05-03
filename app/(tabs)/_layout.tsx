import { Stack } from 'expo-router';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  // Detecta si el celular está en modo claro u oscuro
  const colorScheme = useColorScheme();

  // Elige el tema de Paper basado en el sistema
  const theme = colorScheme === 'dark' ? MD3DarkTheme : MD3LightTheme;

  return (
    <PaperProvider theme={theme}>
      {/* El Stack maneja la navegación de pantallas completas y modales */}
      <Stack>
        {/* Pantalla principal que contiene las pestañas */}
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        
        {/* Ruta para el modal de nueva nota (se verá por encima de todo) */}
        <Stack.Screen 
          name="nueva-nota" 
          options={{ 
            presentation: 'modal',
            title: 'Crear contenido' 
          }} 
        />
      </Stack>
    </PaperProvider>
  );
}