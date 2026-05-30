import { StyleSheet } from 'react-native';

export const Colors = {
  light: {
    primary: '#007AFF',
    background: '#FFFFFF',
    surface: '#FFFFFF',
    text: '#242424',
    textSecondary: '#707070',
    border: '#E5E5EA',
    success: '#34C759',
    error: '#FF3B30',
    noteColor: '#FFFFFF',
    ideaColor: '#FFF9C4',
    checklistColor: '#FFFFFF',
    overlay: 'rgba(0, 0, 0, 0.03)',
    disabled: '#E5E5EA',
  },
  dark: {
    primary: '#0A84FF',
    background: '#121212',
    surface: '#1C1C1E',
    text: '#F5F5F5',
    textSecondary: '#8E8E93',
    border: '#2C2C2E',
    success: '#30D158',
    error: '#FF453A',
    noteColor: '#1C1C1E',
    ideaColor: '#2C2C2E',
    checklistColor: '#1C1C1E',
    overlay: 'rgba(255, 255, 255, 0.03)',
    disabled: '#2C2C2E',
  },
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
};

export const BorderRadius = {
  none: 0,
  sm: 4,
  md: 8,
  round: 9999,
};

export const Layout = {
  separatorHeight: StyleSheet.hairlineWidth,
};

export type ThemeColors = typeof Colors.light;
export type ThemeSpacing = typeof Spacing;
export type ThemeBorderRadius = typeof BorderRadius;

const theme = { Colors, Spacing, BorderRadius, Layout };
export default theme;