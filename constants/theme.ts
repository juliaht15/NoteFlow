export const Colors = {
  // Brand & UI
  primary: '#3A86FF',
  background: '#F8F9FA',
  surface: '#FFFFFF',
  text: '#1F2937',
  textSecondary: '#6B7280',
  border: '#E5E7EB',
  success: '#10B981',
  error: '#EF4444',

  // Colores suaves para las tarjetas (Backgrounds)
  noteColor: '#E0E7FF',      // Azul suave
  ideaColor: '#FED7AA',      // Naranja suave
  checklistColor: '#D1FAE5', // Verde suave

  // Variantes para estados de presión o sombras
  overlay: 'rgba(0, 0, 0, 0.05)',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
};

// Tipado para el objeto global del tema
export type ThemeColors = typeof Colors;
export type ThemeSpacing = typeof Spacing;

export default { Colors, Spacing };