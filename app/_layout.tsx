import { Stack } from 'expo-router';
import { PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <StatusBar style="auto" />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: '#3A86FF', // Color primary de tu theme
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        >
          {/* El grupo de pestañas principal */}
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          {/* El modal de creación */}
          <Stack.Screen 
            name="nueva-nota" 
            options={{ 
              presentation: 'modal',
              title: 'Nueva Entrada',
              headerShown: true
            }} 
          />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}