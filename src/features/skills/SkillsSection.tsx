import type { Skills } from '../../domain/entities/portfolio';
import { cn } from '../../utils/cn';

interface SkillsSectionProps {
  skills: Skills;
}

interface SkillGroupProps {
  title: string;
  items: ReadonlyArray<string>;
  accentClass: string;
  borderClass: string;
  bgClass: string;
}

function SkillGroup({ title, items, accentClass, borderClass, bgClass }: SkillGroupProps) {
  if (items.length === 0) return null;

  return (
    <div>
      <h3 className="mb-3 text-sm font-medium text-slate-400 uppercase tracking-wider">
        {title}
      </h3>
      <div className="flex flex-wrap gap-2">
        {items.map((skill) => (
          <span
            key={skill}
            className={cn(
              'rounded-md border px-3 py-1 text-xs font-medium',
              accentClass,
              borderClass,
              bgClass
            )}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export function SkillsSection({ skills }: SkillsSectionProps) {
  return (
    <section className="w-full border-t border-slate-800 pt-10">
      <h2 className="mb-6 text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 bg-clip-text text-transparent">
        Skills
      </h2>
      <div className="grid gap-8 sm:grid-cols-3">
        <SkillGroup
          title="Core"
          items={skills.core}
          accentClass="text-emerald-300"
          borderClass="border-emerald-500/20"
          bgClass="bg-emerald-500/5"
        />
        <SkillGroup
          title="AI & Tooling"
          items={skills.aiTools}
          accentClass="text-violet-300"
          borderClass="border-violet-500/20"
          bgClass="bg-violet-500/5"
        />
        <SkillGroup
          title="Testing & QA"
          items={skills.testing}
          accentClass="text-sky-300"
          borderClass="border-sky-500/20"
          bgClass="bg-sky-500/5"
        />
      </div>
    </section>
  );
}
