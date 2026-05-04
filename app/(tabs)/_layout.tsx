import { Stack } from 'expo-router';

export default function NotasLayout() {
  return (
    <Stack>
      {/* Pantalla principal de la lista de notas */}
      <Stack.Screen 
        name="index" 
        options={{ 
          title: 'Mis Notas',
          headerShown: true 
        }} 
      />
      
      {/* Pantalla de edición: Quitamos el encabezado para que no diga "Detalle" */}
      <Stack.Screen 
        name="[id]" 
        options={{ 
          headerShown: false, // Esto elimina el título "Detalle de nota"
          presentation: 'modal' // Opcional: hace que aparezca como una tarjeta desde abajo
        }} 
      />
    </Stack>
  );
}