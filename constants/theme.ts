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

  // Categorías de notas
  noteColor: '#E0E7FF',      // Azul suave
  ideaColor: '#FEF9C3',      // Amarillo suave (más estándar para ideas/bombillas)
  checklistColor: '#D1FAE5', // Verde suave

  // Estados
  overlay: 'rgba(0, 0, 0, 0.05)',
  disabled: '#9CA3AF',
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export type ThemeColors = typeof Colors;
export type ThemeSpacing = typeof Spacing;

export default { Colors, Spacing };