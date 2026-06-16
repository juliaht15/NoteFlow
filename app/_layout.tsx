import { useEffect, useState } from 'react';
import { Stack, useRouter, useSegments } from 'expo-router';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { PaperProvider, MD3LightTheme, MD3DarkTheme } from 'react-native-paper';
import { useColorScheme } from 'react-native';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const segments = useSegments();
  
  // Detectar el esquema de color del sistema (claro/oscuro)
  const colorScheme = useColorScheme();
  const isDark = colorScheme === 'dark';
  const theme = isDark ? MD3DarkTheme : MD3LightTheme;

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setInitializing(false);
    });
    return unsubscribe;
  }, []);

  useEffect(() => {
    if (initializing) return;

    const inTabsGroup = segments[0] === '(tabs)';
    
    if (!user && !inTabsGroup && segments[0] !== 'register') {
      router.replace('/register');
    } else if (user && segments[0] !== '(tabs)') {
      router.replace('/(tabs)');
    }
  }, [user, initializing, segments]);

  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: theme.colors.background } // Color de fondo adaptativo
      }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="register" />
      </Stack>
    </PaperProvider>
  );
}