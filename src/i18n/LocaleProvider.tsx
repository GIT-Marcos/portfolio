import { createContext, useCallback, useMemo, useState } from 'react';
import type { Portfolio } from '../domain/entities/portfolio';
import { mapPortfolio } from '../domain/mappers/portfolio-mapper';
import { rawUserData } from '../data/user-data';
import { rawUserDataEn } from '../data/user-data-en';
import { translations } from './locales';
import type { Locale, TranslationKey } from './locales';

export interface LocaleContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: TranslationKey, vars?: Record<string, string>) => string;
  portfolio: Portfolio;
}

export const LocaleContext = createContext<LocaleContextValue | null>(null);

function detectLocale(): Locale {
  const stored = localStorage.getItem('locale');
  if (stored === 'es' || stored === 'en') return stored;
  for (const lang of navigator.languages) {
    if (lang.startsWith('en')) return 'en';
    if (lang.startsWith('es')) return 'es';
  }
  return 'es';
}

export function LocaleProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(detectLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    localStorage.setItem('locale', next);
  }, []);

  const portfolio = useMemo<Portfolio>(() => {
    const raw = locale === 'en' ? rawUserDataEn : rawUserData;
    return mapPortfolio(raw as unknown as Record<string, unknown>);
  }, [locale]);

  const t = useCallback(
    (key: TranslationKey, vars?: Record<string, string>): string => {
      let str: string = translations[locale][key];
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          str = str.replace(`{${k}}`, v);
        }
      }
      return str;
    },
    [locale],
  );

  const value = useMemo<LocaleContextValue>(
    () => ({ locale, setLocale, t, portfolio }),
    [locale, setLocale, t, portfolio],
  );

  return (
    <LocaleContext.Provider value={value}>
      {children}
    </LocaleContext.Provider>
  );
}
