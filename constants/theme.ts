import { StyleSheet } from 'react-native';

export const Colors = {
  light: {
    primary: '#007AFF',        // Azul plano estilo Microsoft To Do / iOS
    background: '#FFFFFF',     // Fondo blanco limpio y directo para el lienzo principal
    surface: '#FFFFFF',        // Filas fluidas integradas en el fondo
    text: '#242424',           // Negro suave/antracita para evitar fatiga visual
    textSecondary: '#707070',  // Gris plano para subtítulos y metadatos
    border: '#E5E5EA',         // Separador ultrafino (estilo línea divisoria)
    success: '#34C759',        // Verde para estados completados
    error: '#FF3B30',          // Rojo para alertas o borrados
    noteColor: '#FFFFFF',      // Color uniforme integrado
    ideaColor: '#FFF9C4',      // Toque sutil de color opcional para ideas rápidas
    checklistColor: '#FFFFFF', // Fondo plano para tareas
    overlay: 'rgba(0, 0, 0, 0.03)',
    disabled: '#E5E5EA',
  },
  dark: {
    primary: '#0A84FF',        // Azul brillante modo oscuro
    background: '#121212',     // Negro mate/oscuro plano (estilo moderno)
    surface: '#1C1C1E',        // Filas fluidas en modo oscuro
    text: '#F5F5F5',           // Blanco roto para legibilidad
    textSecondary: '#8E8E93',  // Gris muted modo oscuro
    border: '#2C2C2E',         // Separador sutil oscuro
    success: '#30D158',
    error: '#FF453A',
    noteColor: '#1C1C1E',
    ideaColor: '#2C2C2E',
    checklistColor: '#1C1C1E',
    overlay: 'rgba(255, 255, 255, 0.03)',
    disabled: '#2C2C2E',
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,                      // Optimizado para listas compactas fluidas
  lg: 16,                      // Margen lateral estándar de Microsoft To Do
  xl: 24,
  xxl: 32,
};

export const BorderRadius = {
  none: 0,                     // Para las filas fluidas que ocupan todo el ancho
  sm: 4,
  md: 8,                       // Para pequeños elementos contenedores o inputs
  round: 9999,                 // Esencial para los selectores circulares (checkboxes)
};

// Grosor estándar para separadores minimalistas interactivos
export const Layout = {
  separatorHeight: StyleSheet.hairlineWidth,
};

export type ThemeColors = typeof Colors.light;
export type ThemeSpacing = typeof Spacing;
export type ThemeBorderRadius = typeof BorderRadius;

export default { Colors, Spacing, BorderRadius, Layout };