export const Colors = {
  light: {
    primary: '#007AFF',        // Azul nativo iOS
    background: '#F2F2F7',     // Gris claro nativo de iOS (estilo Notas/To-Do)
    surface: '#FFFFFF',        // Tarjetas blancas limpias
    text: '#000000',           // Texto principal de alto contraste
    textSecondary: '#8E8E93',  // Subtítulos y fechas (gris nativo muted)
    border: '#E5E5EA',         // Separadores ultrafinos nativos
    success: '#34C759',        // Verde éxito iOS
    error: '#FF3B30',          // Rojo error iOS
    noteColor: '#F2F2F7',      // Nota estándar minimalista
    ideaColor: '#FFF9C4',      // Amarillo suave premium para ideas
    checklistColor: '#FFFFFF', // Fondo blanco limpio para tareas
    overlay: 'rgba(0, 0, 0, 0.05)',
    disabled: '#C7C7CC',
  },
  dark: {
    primary: '#0A84FF',        // Azul brillante modo oscuro
    background: '#000000',     // Negro puro (OLED friendly como iOS Notes)
    surface: '#1C1C1E',        // Tarjetas gris oscuro nativas
    text: '#FFFFFF',           // Texto blanco puro
    textSecondary: '#8E8E93',  // Gris muted modo oscuro
    border: '#38383A',         // Separadores oscuros finos
    success: '#30D158',        // Verde éxito oscuro
    error: '#FF453A',          // Rojo error oscuro
    noteColor: '#1C1C1E',
    ideaColor: '#2C2C2E',
    checklistColor: '#1C1C1E',
    overlay: 'rgba(255, 255, 255, 0.05)',
    disabled: '#48484A',
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const BorderRadius = {
  sm: 6,
  md: 12,
  lg: 16, // Radio de 16px para tarjetas premium según .cursorrules
  round: 9999,
};

export type ThemeColors = typeof Colors.light;
export type ThemeSpacing = typeof Spacing;
export type ThemeBorderRadius = typeof BorderRadius;

export default { Colors, Spacing, BorderRadius };