import { useContext } from 'react';
import { ThemeContext } from '../features/theme/ThemeProvider';

export type Theme = 'light' | 'dark' | 'system';

export type ThemeContextValue = {
  resolved: Exclude<Theme, 'system'>;
  preference: Theme;
  setPreference: (theme: Theme) => void;
  toggle: () => void;
};

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme debe usarse dentro de <ThemeProvider>');
  }
  return ctx;
}
