import { useColorScheme } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const COLORS = {
  light: {
    primary: '#2564cf',
    surface: '#ffffff',
    surfaceVariant: '#f3f2f1',
    background: '#f3f2f1',
    text: '#252423',
    secondaryText: '#605e5c',
    border: '#edebe9',
    danger: '#d13438',
    error: '#d13438',
    disabled: '#a19f9d',
  },
  dark: {
    primary: '#4794ff',
    surface: '#201f1e',
    surfaceVariant: '#292827',
    background: '#11100f',
    text: '#f3f2f1',
    secondaryText: '#c8c6c4',
    border: '#3b3a39',
    danger: '#e81123',
    error: '#e81123',
    disabled: '#797775',
  },
};

export const SPACING = { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 };
export const TYPOGRAPHY = {
  fontSize: { xs: 12, sm: 14, md: 16, lg: 20, xl: 24 },
  fontWeight: { regular: '400' as const, bold: '700' as const },
};

export const useTheme = () => {
  const systemScheme = useColorScheme();
  const [isDarkMode, setIsDarkMode] = useState(systemScheme === 'dark');

  useEffect(() => {
    AsyncStorage.getItem('theme_mode').then((savedMode) => {
      if (savedMode !== null) {
        setIsDarkMode(savedMode === 'dark');
      } else {
        setIsDarkMode(systemScheme === 'dark');
      }
    });
  }, [systemScheme]);

  const toggleTheme = async () => {
    const nextMode = !isDarkMode;
    setIsDarkMode(nextMode);
    await AsyncStorage.setItem('theme_mode', nextMode ? 'dark' : 'light');
  };

  return {
    colors: COLORS[isDarkMode ? 'dark' : 'light'],
    spacing: SPACING,
    typography: TYPOGRAPHY,
    isDarkMode,
    toggleTheme,
  };
};