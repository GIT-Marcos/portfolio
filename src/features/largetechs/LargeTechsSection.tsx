import type { Skills } from '@/domain/entities/portfolio';
import { iconMap } from '@/data/iconMap';
import { sectionTitles } from '@/data/sectionTitles';
import type { ComponentType } from 'react';

interface LargeTechsSectionProps {
  skills: Skills;
}

function TechBadge({ name }: { name: string }) {
  const Icon = iconMap[name] as ComponentType<{ className?: string }> | undefined;

  return (
    <span className="inline-flex items-center gap-3 rounded-xl border border-slate-300 bg-slate-100 px-6 py-2.5 text-base font-medium text-slate-700 shadow-md dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200">
      {Icon ? <Icon className="h-6 w-6 shrink-0" /> : null}
      {name}
    </span>
  );
}

export function LargeTechsSection({ skills }: LargeTechsSectionProps) {
  const allTechs = skills.techs;

  if (allTechs.length === 0) return null;

  return (
    <section className="w-full border-t border-slate-200 pt-10 dark:border-slate-800">
      <h2 className="mb-6 text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-sky-300 dark:to-sky-400">
        {sectionTitles.techs}
      </h2>
      <div className="flex flex-wrap gap-4">
        {allTechs.map((tech) => (
          <TechBadge key={tech} name={tech} />
        ))}
      </div>
    </section>
  );
}
