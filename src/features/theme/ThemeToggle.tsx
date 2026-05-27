import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useLocale } from '../../hooks/useLocale';

export function ThemeToggle() {
  const { resolved, toggle } = useTheme();
  const { t } = useLocale();

  return (
    <button
      onClick={toggle}
      aria-label={t('aria.themeToggle')}
      className="rounded-full p-1.5 text-slate-400 transition-colors duration-200 hover:text-sky-400 hover:bg-slate-200 dark:text-slate-500 dark:hover:text-sky-400 dark:hover:bg-slate-800"
    >
      {resolved === 'dark'
        ? <Sun className="h-4 w-4" />
        : <Moon className="h-4 w-4" />
      }
    </button>
  );
}
