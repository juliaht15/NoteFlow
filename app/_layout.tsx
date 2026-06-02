import { PaperProvider, MD3LightTheme } from 'react-native-paper';
import { Stack } from 'expo-router';
import { Colors } from '@/constants/theme';

const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: Colors.primary,
    background: Colors.background,
    surface: Colors.surface,
  },
};

export default function RootLayout() {
  return (
    <PaperProvider theme={theme}>
      <Stack screenOptions={{ 
        headerShown: false,
        contentStyle: { backgroundColor: Colors.background }
      }} />
    </PaperProvider>
  );
}