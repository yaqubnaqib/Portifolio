import SectionHeading from "@/components/heading/SectionHeading";
import ProjectCard from "@/components/cards/ProjectCard";
import { PROJECTS } from "@/data/content";

export default function Projects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="lg:pt-[6rem] md:pt-[4rem] pt-[3rem] pb-12 sm:pb-16 md:pb-20 min-h-screen bg-white dark:bg-[#262626]"
    >
      <SectionHeading id="projects-heading" prefix="My" title="Projects" decoration="My" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-10 sm:space-y-12 lg:space-y-14">
          {PROJECTS.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </div>
    </section>
  );
}
