import { portfolio } from './data/portfolio';
import { ContactSection } from './features/contact/ContactSection';
import { ProjectsSection } from './features/projects/ProjectsSection';
import { SkillsSection } from './features/skills/SkillsSection';

export default function App() {
  const { personalInfo, projects, skills } = portfolio;

  return (
    <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      {/* 1. Contact — TOP (above the fold) */}
      <ContactSection personalInfo={personalInfo} />

      {/* 2. Projects — MIDDLE */}
      <div className="mt-12">
        <ProjectsSection projects={projects} />
      </div>

      {/* 3. Skills — BOTTOM (always last) */}
      <div className="mt-12 mb-8">
        <SkillsSection skills={skills} />
      </div>
    </main>
  );
}
