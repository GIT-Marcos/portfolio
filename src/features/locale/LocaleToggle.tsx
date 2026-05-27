import { useLocale } from '../../hooks/useLocale';

export function LocaleToggle() {
  const { locale, setLocale } = useLocale();

  return (
    <button
      onClick={() => setLocale(locale === 'es' ? 'en' : 'es')}
      aria-label={locale === 'es' ? 'Switch to English' : 'Cambiar a Español'}
      className="rounded-full px-2 py-0.5 text-xs font-semibold tracking-wider text-slate-400 transition-colors duration-200 hover:text-sky-400 hover:bg-slate-200 dark:text-slate-500 dark:hover:text-sky-400 dark:hover:bg-slate-800"
    >
      {locale === 'es' ? 'EN' : 'ES'}
    </button>
  );
}
