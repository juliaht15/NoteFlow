// E:\Proyectos\noteflow\constants\theme.ts

export const COLORS = {
  light: {
    primary: '#2564cf',
    surface: '#ffffff',
    text: '#252423',
    secondaryText: '#605e5c',
    border: '#edebe9',
    danger: '#d13438',
  },
  dark: {
    primary: '#4794ff',
    surface: '#201f1e',
    text: '#f3f2f1',
    secondaryText: '#c8c6c4',
    border: '#3b3a39',
    danger: '#e81123',
  },
};

export const SPACING = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

export const TYPOGRAPHY = {
  fontSize: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
    xl: 24,
  },
  fontWeight: {
    regular: '400' as const, // Forzamos el tipo para que sea compatible con react-native
    bold: '700' as const,
  },
};

// Accesibilidad: exportamos un objeto para usar fácilmente en StyleSheet
export const theme = {
  colors: COLORS.light, // Por defecto usamos light
  spacing: SPACING,
  typography: TYPOGRAPHY,
};