import type { Project } from '../../domain/entities/portfolio';
import { cn } from '../../utils/cn';
import { Github, ExternalLink } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const {
    name,
    type,
    status,
    links,
    stack,
    description,
    technicalFocus,
    features,
    isAiBuilt,
  } = project;

  const isCloud = type === 'cloud';
  const isWip = status === 'in-development';
  const hasGithub = links.github !== undefined;
  const hasDemo = links.demo !== undefined;
  const hasLinks = hasGithub || hasDemo;
  const hasTechnicalFocus = technicalFocus !== undefined && technicalFocus.length > 0;
  const hasFeatures = features !== undefined && features.length > 0;

  return (
    <article
      className={cn(
        'group relative rounded-xl border bg-slate-900/50 p-5 transition-all duration-300 hover:-translate-y-0.5',
        isCloud
          ? 'border-sky-500/20 hover:border-sky-500/40 hover:shadow-[0_0_24px_-6px_rgba(56,189,248,0.15)]'
          : 'border-emerald-500/20 hover:border-emerald-500/40 hover:shadow-[0_0_24px_-6px_rgba(16,185,129,0.15)]'
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-100">{name}</h3>
        <div className="flex shrink-0 items-center gap-1.5">
          {isWip && (
            <span className="rounded-full bg-amber-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-400 border border-amber-500/20">
              WIP
            </span>
          )}
          {isAiBuilt && (
            <span className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-400 border border-violet-500/20">
              AI-Optimized
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-slate-400">{description}</p>

      {/* Technical Focus */}
      {hasTechnicalFocus && (
        <div className="mb-3">
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {technicalFocus.map((item) => (
              <li
                key={item}
                className={cn(
                  'text-xs',
                  isCloud ? 'text-sky-400/70' : 'text-emerald-400/70'
                )}
              >
                ▸ {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Features */}
      {hasFeatures && (
        <div className="mb-3">
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {features.map((item) => (
              <li
                key={item}
                className={cn(
                  'text-xs',
                  isCloud ? 'text-sky-400/70' : 'text-emerald-400/70'
                )}
              >
                ▸ {item}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Stack */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {stack.map((tech) => (
          <span
            key={tech}
            className={cn(
              'rounded-md px-2 py-0.5 text-[11px] font-medium border',
              isCloud
                ? 'bg-sky-500/5 text-sky-300 border-sky-500/15'
                : 'bg-emerald-500/5 text-emerald-300 border-emerald-500/15'
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {hasLinks && (
        <div className="flex items-center gap-3 border-t border-slate-800 pt-3">
          {hasGithub && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} — GitHub Repository`}
              className={cn(
                'transition-colors',
                isCloud
                  ? 'text-slate-500 hover:text-sky-400'
                  : 'text-slate-500 hover:text-emerald-400'
              )}
            >
              <Github className="h-4 w-4" />
            </a>
          )}
          {hasDemo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${name} — Live Demo`}
              className={cn(
                'transition-colors',
                isCloud
                  ? 'text-slate-500 hover:text-sky-400'
                  : 'text-slate-500 hover:text-emerald-400'
              )}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          )}
        </div>
      )}
    </article>
  );
}
