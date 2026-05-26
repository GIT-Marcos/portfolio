import type { Project } from '../../domain/entities/portfolio';
import { ProjectCard } from './ProjectCard';

interface ProjectsSectionProps {
  projects: ReadonlyArray<Project>;
}

export function ProjectsSection({ projects }: ProjectsSectionProps) {
  return (
    <section className="w-full">
      <h2 className="mb-6 text-2xl font-bold tracking-tight bg-gradient-to-r from-sky-400 via-sky-300 to-sky-400 bg-clip-text text-transparent">
        Projects
      </h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </section>
  );
}
