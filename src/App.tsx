import { GithubIcon } from './components/icons/GithubIcon';
import { portfolio } from './data/portfolio';
import { ContactSection } from './features/contact/ContactSection';
import { ProjectsSection } from './features/projects/ProjectsSection';
import { SkillsSection } from './features/skills/SkillsSection';

export default function App() {
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

        {/* 3. Skills — BOTTOM (always last) */}
        <div className="mt-12">
          <SkillsSection skills={skills} />
        </div>
      </main>

      <footer className="border-t border-slate-800/50 bg-slate-950/80 backdrop-blur-md">
        <div className="mx-auto flex h-10 max-w-5xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <span className="text-xs text-slate-500">© 2026 {personalInfo.name}</span>
          <span className="text-xs text-slate-500">Built with React + TypeScript + Vite</span>
          <a
            href="https://github.com/GIT-Marcos/portfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-sky-400 transition-colors"
          >
            <GithubIcon className="h-3.5 w-3.5" />
            Source
          </a>
        </div>
      </footer>
    </>
  );
}
