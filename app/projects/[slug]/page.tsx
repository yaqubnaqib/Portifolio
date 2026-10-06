import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/navigation/Navbar";
import SiteFooter from "@/components/SiteFooter";
import ThemeToggleButton from "@/components/hero/ThemeToggleButton";
import JsonLd from "@/components/seo/JsonLd";
import { PROJECTS, getProject } from "@/data/content";
import { PROFILE } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";
import { projectGraph } from "@/lib/structured-data";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export const dynamicParams = false;

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const project = getProject((await params).slug);
  if (!project) return {};
  return pageMetadata({
    title: `${project.seoTitle} | ${PROFILE.name}`,
    description: project.seoDescription,
    path: `/projects/${project.slug}`,
  });
}

const sectionHeading = "text-2xl sm:text-3xl font-semibold text-[#1a1a1a] dark:text-white mb-4";
const bodyText = "text-base sm:text-lg leading-relaxed text-[#3a3a3a] dark:text-[#d0d0d0]";

export default async function ProjectPage({ params }: ProjectPageProps) {
  const project = getProject((await params).slug);
  if (!project) notFound();

  const index = PROJECTS.findIndex((item) => item.slug === project.slug);
  const otherProjects = PROJECTS.filter((item) => item.slug !== project.slug);
  const next = PROJECTS[(index + 1) % PROJECTS.length];

  return (
    <>
      <JsonLd data={projectGraph(project)} />
      <Navbar />
      <main id="main-content" tabIndex={-1} className="bg-white dark:bg-[#262626]">
        <article aria-labelledby="case-study-title">
          <header className="relative bg-gradient-to-b from-[#EAF5FA] to-white dark:from-[#1f1f1f] dark:to-[#262626] px-4 sm:px-6 lg:px-8 pt-24 sm:pt-28 pb-10">
            <div className="absolute top-4 left-4 sm:top-6 sm:left-6 md:top-8 md:left-8">
              <ThemeToggleButton />
            </div>
            <div className="max-w-5xl mx-auto">
              <nav aria-label="Breadcrumb" className="mb-6 text-sm">
                <ol className="flex flex-wrap items-center gap-2 text-[#4d5a60] dark:text-[#9C9C9C]">
                  <li>
                    <Link href="/" className="underline-offset-4 hover:underline py-1">
                      Home
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li>
                    <Link href="/#projects" className="underline-offset-4 hover:underline py-1">
                      Projects
                    </Link>
                  </li>
                  <li aria-hidden="true">/</li>
                  <li aria-current="page" className="text-[#1a1a1a] dark:text-white">
                    {project.title}
                  </li>
                </ol>
              </nav>

              <p className="text-sm font-semibold uppercase tracking-wider text-[#2f6f8a] dark:text-[#9cd5ee] mb-3">
                Case study · {project.num}
              </p>
              <h1
                id="case-study-title"
                className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-[#1a1a1a] dark:text-white"
              >
                {project.title}: {project.tagline}
              </h1>
              <p className={`${bodyText} mt-5 max-w-3xl`}>{project.summary}</p>

              <dl className="mt-8 grid gap-4 sm:grid-cols-3 text-sm sm:text-base">
                <div>
                  <dt className="font-semibold text-[#1a1a1a] dark:text-white">Role</dt>
                  <dd className="text-[#3a3a3a] dark:text-[#d0d0d0]">{project.role}</dd>
                </div>
                <div>
                  <dt className="font-semibold text-[#1a1a1a] dark:text-white">Context</dt>
                  <dd className="text-[#3a3a3a] dark:text-[#d0d0d0]">{project.context}</dd>
                </div>
                {project.period && (
                  <div>
                    <dt className="font-semibold text-[#1a1a1a] dark:text-white">Period</dt>
                    <dd className="text-[#3a3a3a] dark:text-[#d0d0d0]">{project.period}</dd>
                  </div>
                )}
              </dl>

              <p className="mt-8">
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded inline-block bg-[#83c3de] hover:bg-[#9ed3ea] text-[#10303f] dark:bg-[#ADD6E8] dark:hover:bg-[#9cd5ee] dark:text-[#262626] font-semibold py-3 px-6 transition-colors duration-300"
                >
                  Visit {project.liveLabel}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              </p>
            </div>
          </header>

          <div className="px-4 sm:px-6 lg:px-8 pb-16">
            <div className="max-w-5xl mx-auto">
              <figure className="-mt-2 mb-12">
                <Image
                  src={project.image.src}
                  alt={project.image.alt}
                  width={project.image.width}
                  height={project.image.height}
                  sizes="(min-width: 1088px) 1024px, calc(100vw - 2rem)"
                  priority
                  className="w-full h-auto rounded-xl sm:rounded-2xl border border-[#e5e7eb] dark:border-[#3a3a3a] shadow-md"
                />
                <figcaption className="mt-3 text-sm text-[#4d5a60] dark:text-[#9C9C9C]">
                  {project.image.alt}.
                </figcaption>
              </figure>

              <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
                <div className="space-y-12">
                  <section aria-labelledby="problem">
                    <h2 id="problem" className={sectionHeading}>
                      The problem
                    </h2>
                    <div className={`${bodyText} space-y-4`}>
                      {project.problem.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  <section aria-labelledby="role">
                    <h2 id="role" className={sectionHeading}>
                      My role
                    </h2>
                    <div className={`${bodyText} space-y-4`}>
                      {project.roleDetails.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                    </div>
                  </section>

                  <section aria-labelledby="decisions">
                    <h2 id="decisions" className={sectionHeading}>
                      Key decisions
                    </h2>
                    <ul className={`${bodyText} list-disc pl-5 space-y-3`}>
                      {project.decisions.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>

                  <section aria-labelledby="results">
                    <h2 id="results" className={sectionHeading}>
                      Results
                    </h2>
                    <ul className={`${bodyText} list-disc pl-5 space-y-3`}>
                      {project.results.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </section>
                </div>

                <aside aria-labelledby="stack" className="lg:sticky lg:top-24 self-start">
                  <h2
                    id="stack"
                    className="text-xl font-semibold text-[#1a1a1a] dark:text-white mb-4"
                  >
                    Stack
                  </h2>
                  <ul className="flex flex-wrap gap-2">
                    {project.stack.map((tool) => (
                      <li
                        key={tool}
                        className="px-3 py-1.5 rounded-full font-medium text-sm bg-[#E9EEFA] text-[#2a5fb0] dark:bg-[#3a3a3a] dark:text-[#9cd5ee]"
                      >
                        {tool}
                      </li>
                    ))}
                  </ul>
                </aside>
              </div>

              <nav
                aria-label="More case studies"
                className="mt-16 pt-10 border-t border-[#e5e7eb] dark:border-[#3a3a3a]"
              >
                <h2 className="text-xl sm:text-2xl font-semibold text-[#1a1a1a] dark:text-white mb-5">
                  More case studies by {PROFILE.name}
                </h2>
                <ul className="grid gap-4 sm:grid-cols-3">
                  {otherProjects.map((item) => (
                    <li key={item.slug}>
                      <Link
                        href={`/projects/${item.slug}`}
                        className="block h-full rounded-xl border border-[#E0EFF5] bg-[#F8FBFD] dark:bg-[#242424] dark:border-[#3a3a3a] p-4 hover:shadow-md transition-shadow duration-300"
                      >
                        <span className="block font-semibold text-[#1a1a1a] dark:text-white">
                          {item.title} case study
                        </span>
                        <span className="block mt-1 text-sm text-[#4d5a60] dark:text-[#9C9C9C]">
                          {item.tagline}
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3 text-[#2f6f8a] dark:text-[#ADD6E8] font-medium">
                  <Link
                    href="/#projects"
                    className="underline decoration-2 underline-offset-4 hover:opacity-80"
                  >
                    ← Back to all projects
                  </Link>
                  {next && next.slug !== project.slug && (
                    <Link
                      href={`/projects/${next.slug}`}
                      className="underline decoration-2 underline-offset-4 hover:opacity-80"
                    >
                      Next: {next.title} case study →
                    </Link>
                  )}
                  <Link
                    href="/#contact"
                    className="underline decoration-2 underline-offset-4 hover:opacity-80"
                  >
                    Work with {PROFILE.firstName}
                  </Link>
                </div>
              </nav>
            </div>
          </div>
        </article>
      </main>
      <SiteFooter />
    </>
  );
}
