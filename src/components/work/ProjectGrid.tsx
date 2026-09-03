import type { Project } from "@/lib/data/projects";
import { StaggerGroup } from "@/components/motion/Stagger";
import { ProjectCard } from "./ProjectCard";

export function ProjectGrid({ projects }: { projects: Project[] }) {
  return (
    <StaggerGroup as="div" stagger={0.1} className="grid grid-cols-1 gap-4 md:grid-cols-3 md:gap-5">
      {projects.map((project, index) => (
        <ProjectCard key={project.slug} project={project} index={index} featured={index % 3 === 2} />
      ))}
    </StaggerGroup>
  );
}
