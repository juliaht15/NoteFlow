import { Stack } from 'expo-router';
import { MD3DarkTheme, MD3LightTheme, PaperProvider } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useColorScheme } from 'react-native';
import theme from '../constants/theme';

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const currentTheme = isDark ? theme.Colors.dark : theme.Colors.light;

  const paperTheme = {
    ...(isDark ? MD3DarkTheme : MD3LightTheme),
    colors: {
      ...(isDark ? MD3DarkTheme.colors : MD3LightTheme.colors),
      primary: currentTheme.primary,
      background: currentTheme.background,
      surface: currentTheme.surface,
    },
  };

  return (
    <SafeAreaProvider>
      <PaperProvider theme={paperTheme}>
        <StatusBar style={isDark ? 'light' : 'dark'} />
        <Stack
          screenOptions={{
            headerStyle: {
              backgroundColor: currentTheme.background,
            },
            headerTintColor: currentTheme.text,
            headerTitleStyle: {
              fontWeight: '600',
            },
            headerShadowVisible: false,
            contentStyle: {
              backgroundColor: currentTheme.background,
            },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          
          <Stack.Screen 
            name="nueva-nota" 
            options={{ 
              presentation: 'card',
              title: 'Nueva Entrada',
              headerShown: true,
            }} 
          />
        </Stack>
      </PaperProvider>
    </SafeAreaProvider>
  );
}