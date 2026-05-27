import type { Project } from '../../domain/entities/portfolio';
import { cn } from '../../utils/cn';
import { ExternalLink } from 'lucide-react';
import { GithubIcon } from '../../components/icons/GithubIcon';
import { useLocale } from '../../hooks/useLocale';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const { t } = useLocale();
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
        'group relative rounded-xl border bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 dark:bg-slate-900/50',
        isCloud
          ? 'border-sky-300 hover:border-sky-400 dark:border-sky-500/20 dark:hover:border-sky-500/40 dark:hover:shadow-[0_0_24px_-6px_rgba(56,189,248,0.15)]'
          : 'border-emerald-300 hover:border-emerald-400 dark:border-emerald-500/20 dark:hover:border-emerald-500/40 dark:hover:shadow-[0_0_24px_-6px_rgba(16,185,129,0.15)]'
      )}
    >
      {/* Header */}
      <div className="mb-3 flex items-start justify-between gap-2">
        <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100">{name}</h3>
        <div className="flex shrink-0 items-center gap-1.5">
          {isWip && (
            <span aria-label={t('aria.workInProgress')} className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-amber-600 border border-amber-300 dark:bg-amber-500/10 dark:text-amber-400 dark:border-amber-500/20">
              {t('badge.wip')}
            </span>
          )}
          {isAiBuilt && (
            <span aria-label={t('aria.aiBuilt')} className="rounded-full bg-violet-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider text-violet-600 border border-violet-300 dark:bg-violet-500/10 dark:text-violet-400 dark:border-violet-500/20">
              {t('badge.aiOptimized')}
            </span>
          )}
        </div>
      </div>

      {/* Description */}
      <p className="mb-4 text-sm leading-relaxed text-slate-600 dark:text-slate-400">{description}</p>

      {/* Technical Focus */}
      {hasTechnicalFocus && (
        <div className="mb-3">
          <ul className="flex flex-wrap gap-x-3 gap-y-1">
            {technicalFocus.map((item) => (
              <li
                key={item}
                className={cn(
                  'text-xs',
                  isCloud ? 'text-sky-600/70 dark:text-sky-400/70' : 'text-emerald-600/70 dark:text-emerald-400/70'
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
                  isCloud ? 'text-sky-600/70 dark:text-sky-400/70' : 'text-emerald-600/70 dark:text-emerald-400/70'
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
                ? 'bg-sky-100 text-sky-700 border-sky-300 dark:bg-sky-500/5 dark:text-sky-300 dark:border-sky-500/15'
                : 'bg-emerald-100 text-emerald-700 border-emerald-300 dark:bg-emerald-500/5 dark:text-emerald-300 dark:border-emerald-500/15'
            )}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Links */}
      {hasLinks && (
        <div className="flex items-center gap-3 border-t border-slate-200 pt-3 dark:border-slate-800">
          {hasGithub && (
            <a
              href={links.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('aria.githubRepo', { name })}
              className={cn(
                'transition-colors',
                isCloud
                  ? 'text-slate-400 hover:text-sky-600 dark:text-slate-500 dark:hover:text-sky-400'
                  : 'text-slate-400 hover:text-emerald-600 dark:text-slate-500 dark:hover:text-emerald-400'
              )}
            >
              <GithubIcon className="h-4 w-4" />
            </a>
          )}
          {hasDemo && (
            <a
              href={links.demo}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={t('aria.liveDemo', { name })}
              className={cn(
                'transition-colors',
                isCloud
                  ? 'text-slate-400 hover:text-sky-600 dark:text-slate-500 dark:hover:text-sky-400'
                  : 'text-slate-400 hover:text-emerald-600 dark:text-slate-500 dark:hover:text-emerald-400'
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
