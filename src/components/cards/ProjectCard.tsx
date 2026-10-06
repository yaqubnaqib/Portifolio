import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/data/content";

const pillBase =
  "inline-flex items-center justify-center gap-1.5 whitespace-nowrap rounded-full px-4 py-2 min-h-10 text-sm font-medium transition-colors duration-300";
const primaryPill = `${pillBase} bg-[#83c3de] hover:bg-[#9ed3ea] text-[#10303f] dark:bg-[#ADD6E8] dark:hover:bg-[#9cd5ee] dark:text-[#1a1a1a]`;
const secondaryPill = `${pillBase} border-2 border-[#83c3de] text-[#1f4f63] hover:bg-[#E8F4F8] dark:border-[#ADD6E8] dark:text-white dark:hover:bg-[#3a3a3a]`;

/** Screenshot column is 26rem from lg; full card width below that. */
const SCREENSHOT_SIZES =
  "(min-width: 1024px) 26rem, (min-width: 640px) calc(100vw - 5rem), calc(100vw - 3rem)";

export default function ProjectCard({ project }: { project: Project }) {
  const headingId = `project-${project.slug}-title`;
  const caseStudyHref = `/projects/${project.slug}`;

  return (
    <article
      id={`project-${project.slug}`}
      aria-labelledby={headingId}
      className="flex flex-col gap-3 sm:gap-4 justify-center items-center"
    >
      <div className="flex items-center gap-4 w-full max-w-5xl" aria-hidden="true">
        <div className="rounded-full w-4 h-4 sm:w-5 sm:h-5 bg-[#9c9c9c34] dark:bg-[#9c9c9c60]" />
        <div className="text-[2.25rem] sm:text-[3rem] md:text-[3.75rem] font-bold text-[#a4d3e776] leading-none tracking-tight">
          {project.num}
        </div>
      </div>

      <div
        className={`flex flex-col lg:flex-row w-full max-w-5xl p-3 sm:p-4 lg:p-6 transition-shadow duration-300 rounded-xl sm:rounded-2xl bg-white border border-[#e5e7eb] shadow-sm hover:shadow-md dark:bg-[#1f1f1f] dark:border-[#3a3a3a] gap-4 lg:gap-8 items-center ${
          project.reverse ? "lg:flex-row-reverse" : ""
        }`}
      >
        <div className="w-full lg:w-[26rem] flex-shrink-0">
          <Link
            href={caseStudyHref}
            tabIndex={-1}
            aria-hidden="true"
            className="block relative overflow-hidden rounded-lg sm:rounded-xl"
          >
            <Image
              src={project.image.src}
              className="w-full rounded-lg sm:rounded-xl object-cover h-auto"
              alt=""
              width={project.image.width}
              height={project.image.height}
              sizes={SCREENSHOT_SIZES}
            />
          </Link>
        </div>

        <div className="flex flex-col text-left flex-1 min-w-0 space-y-3 sm:space-y-4">
          <div>
            <h3
              id={headingId}
              className="text-xl sm:text-2xl lg:text-3xl font-bold mb-1 text-[#1a1a1a] dark:text-white"
            >
              <Link href={caseStudyHref} className="hover:underline underline-offset-4">
                {project.title}
              </Link>
            </h3>
            <p className="text-sm sm:text-base font-medium text-[#2f6f8a] dark:text-[#9cd5ee] mb-2 sm:mb-3">
              {project.tagline}
            </p>

            <p className="leading-6 sm:leading-7 text-[#4a4a4a] dark:text-[#d0d0d0] text-sm sm:text-base">
              {project.summary}
            </p>
          </div>

          <ul className="flex flex-wrap gap-2 justify-start" aria-label="Tech stack">
            {project.stack.slice(0, 4).map((tool) => (
              <li
                key={tool}
                className="px-3 py-1 rounded-full font-medium text-xs sm:text-sm bg-[#E9EEFA] text-[#2a5fb0] dark:bg-[#3a3a3a] dark:text-[#9cd5ee]"
              >
                {tool}
              </li>
            ))}
          </ul>

          <div className="flex flex-wrap gap-2 sm:gap-3 items-center pt-1">
            <Link href={caseStudyHref} className={primaryPill}>
              Case study<span className="sr-only">: {project.title}</span>
            </Link>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={project.liveUrl}
              className={secondaryPill}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="2"
                stroke="currentColor"
                className="w-4 h-4"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244"
                />
              </svg>
              Live site
              <span className="sr-only">: {project.liveLabel} (opens in a new tab)</span>
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
