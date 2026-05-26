import type { Skills } from '@/domain/entities/portfolio';
import { sectionTitles } from '@/data/sectionTitles';

interface SoftSkillsSectionProps {
  skills: Skills;
}

export function SoftSkillsSection({ skills }: SoftSkillsSectionProps) {
  if (skills.habilidades.length === 0) return null;

  return (
    <section className="w-full border-t border-slate-200 pt-10 dark:border-slate-800">
      <h2 className="mb-6 text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-600 via-sky-500 to-sky-600 bg-clip-text text-transparent dark:from-sky-400 dark:via-sky-300 dark:to-sky-400">
        {sectionTitles.skills}
      </h2>
      <div className="flex flex-wrap gap-2">
        {skills.habilidades.map((habilidad) => (
          <span
            key={habilidad}
            className="rounded-md border border-slate-300 bg-slate-100 px-3 py-1 text-xs font-medium text-slate-700 dark:border-slate-700 dark:bg-slate-800/50 dark:text-slate-200"
          >
            {habilidad}
          </span>
        ))}
      </div>
    </section>
  );
}
