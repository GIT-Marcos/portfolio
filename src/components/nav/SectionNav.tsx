import { useEffect, useState } from 'react';
import type { NavItem } from '../../data/navigation';
import { cn } from '../../utils/cn';
import { ThemeToggle } from '../../features/theme/ThemeToggle';
import { LocaleToggle } from '../../features/locale/LocaleToggle';
import { useLocale } from '../../hooks/useLocale';

const NAV_HEIGHT = 40;

const SECTION_LABEL_KEYS: Record<string, string> = {
  contact: 'section.contact',
  projects: 'section.projects',
  techs: 'section.techs',
  skills: 'section.skills',
};

interface SectionNavProps {
  items: readonly NavItem[];
}

export function SectionNav({ items }: SectionNavProps) {
  const { t } = useLocale();
  const maxIndex = items.length - 1;
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const sections = document.querySelectorAll('section');
      const OFFSET = NAV_HEIGHT + 100;

      let current = 0;
      for (let i = 0; i < sections.length; i++) {
        const rect = sections[i].getBoundingClientRect();
        if (rect.top <= OFFSET) {
          current = i;
        }
      }
      setActiveIndex(Math.min(current, maxIndex));
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [maxIndex]);

  const scrollToSection = (index: number) => {
    const section = document.querySelectorAll('section')[index];
    if (!section) return;

    const top = section.getBoundingClientRect().top + window.scrollY - NAV_HEIGHT;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    window.scrollTo({ top, behavior: reduced ? 'instant' : 'smooth' });
  };

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 h-10 border-b border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/80"
      aria-label={t('aria.sectionNav')}
    >
      <div className="mx-auto flex h-full max-w-5xl items-center px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <LocaleToggle />
        </div>
        <div className="flex flex-1 items-center justify-center gap-6 sm:gap-8">
          {items.map((item, index) => {
          const isActive = index === activeIndex;

          return (
            <button
              key={item.id}
              onClick={() => scrollToSection(index)}
              className={cn(
                'relative text-xs font-medium tracking-wider transition-colors duration-200',
                isActive ? 'text-sky-400' : 'text-slate-500 hover:text-slate-300'
              )}
              aria-current={isActive ? 'true' : undefined}
            >
              {t(SECTION_LABEL_KEYS[item.id] as any)}
              {isActive && (
                <span className="absolute -bottom-0.5 left-1/2 h-px w-4 -translate-x-1/2 bg-sky-400" />
              )}
            </button>
          );
        })}
        </div>
      </div>
    </nav>
  );
}
