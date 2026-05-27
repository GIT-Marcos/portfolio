import { useContext } from 'react';
import { LocaleContext } from '../i18n/LocaleProvider';
import type { LocaleContextValue } from '../i18n/LocaleProvider';

export function useLocale(): LocaleContextValue {
  const ctx = useContext(LocaleContext);
  if (!ctx) {
    throw new Error('useLocale debe usarse dentro de <LocaleProvider>');
  }
  return ctx;
}
