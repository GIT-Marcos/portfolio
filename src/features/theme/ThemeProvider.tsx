import { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import type { Theme, ThemeContextValue } from '../../hooks/useTheme';

export const ThemeContext = createContext<ThemeContextValue | null>(null);

function getSystemDark(): boolean {
  return window.matchMedia('(prefers-color-scheme: dark)').matches;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreferenceState] = useState<Theme>(() => {
    const stored = localStorage.getItem('theme') as Theme | null;
    return stored ?? 'system';
  });

  const [systemDark, setSystemDark] = useState(getSystemDark);

  const resolved = useMemo<'light' | 'dark'>(
    () => (preference === 'system' ? (systemDark ? 'dark' : 'light') : preference),
    [preference, systemDark],
  );

  const setPreference = useCallback((theme: Theme) => {
    setPreferenceState(theme);
    if (theme === 'system') {
      localStorage.removeItem('theme');
    } else {
      localStorage.setItem('theme', theme);
    }
  }, []);

  const toggle = useCallback(() => {
    setPreference(resolved === 'dark' ? 'light' : 'dark');
  }, [resolved, setPreference]);

  useEffect(() => {
    const root = document.documentElement;
    if (resolved === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [resolved]);

  useEffect(() => {
    if (preference !== 'system') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = () => setSystemDark(mq.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, [preference]);

  const value = useMemo<ThemeContextValue>(
    () => ({ resolved, preference, setPreference, toggle }),
    [resolved, preference, setPreference, toggle],
  );

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}
