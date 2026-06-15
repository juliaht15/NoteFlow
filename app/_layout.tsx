// E:\Proyectos\noteflow\app\_layout.tsx
import { useEffect, useState } from 'react';
import { Stack } from 'expo-router';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../lib/firebaseConfig';
import { useRouter, useSegments } from 'expo-router';

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (initializing) setInitializing(false);
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
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="register" />
    </Stack>
  );
}