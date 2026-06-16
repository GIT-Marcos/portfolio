import { GithubIcon } from './components/icons/GithubIcon';
import { useLocale } from './hooks/useLocale';
import { ContactSection } from './features/contact/ContactSection';
import { ProjectsSection } from './features/projects/ProjectsSection';
import { LargeTechsSection } from './features/largetechs/LargeTechsSection';
import { SoftSkillsSection } from './features/softskills/SoftSkillsSection';

export default function App() {
  const { portfolio, t } = useLocale();
  const { personalInfo, projects, skills } = portfolio;

  return (
    <>
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
        {/* 1. Contact — TOP (above the fold) */}
        <ContactSection personalInfo={personalInfo} />

        {/* 2. Projects — MIDDLE */}
        <div className="mt-12">
          <ProjectsSection projects={projects} />
        </div>

        {/* 3. Techs */}
        <div className="mt-12">
          <LargeTechsSection skills={skills} />
        </div>

        {/* 4. Skills — BOTTOM (always last) */}
        <div className="mt-12">
          <SoftSkillsSection skills={skills} />
        </div>
      </main>

      <footer className="border-t border-slate-200/50 bg-white/80 backdrop-blur-md dark:border-slate-800/50 dark:bg-slate-950/80">
        <div className="mx-auto flex h-10 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-xs text-slate-400 dark:text-slate-500">{t('footer.copyright', { name: personalInfo.nameShort })}</span>
          <span className="text-xs text-slate-400 dark:text-slate-500">{t('footer.builtWith')}</span>
          <a
            href="https://github.com/GIT-Marcos/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-400 hover:text-sky-600 transition-colors dark:text-slate-500 dark:hover:text-sky-400"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            {t('footer.source')}
          </a>
        </div>
      </footer>
    </>
  );
}
