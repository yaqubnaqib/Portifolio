import type { Metadata } from "next";
import Link from "next/link";
import { PROJECTS } from "@/data/content";
import { PROFILE } from "@/data/profile";

export const metadata: Metadata = {
  title: "Page not found",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return (
    <main
      id="main-content"
      className="min-h-screen flex flex-col items-center justify-center px-6 py-16 bg-white dark:bg-[#262626] text-center"
    >
      <p
        className="text-[#2f6f8a] dark:text-[#ADD6E8] text-6xl font-semibold mb-4"
        aria-hidden="true"
      >
        404
      </p>
      <h1 className="text-2xl sm:text-3xl font-semibold text-[#2a2a2a] dark:text-white mb-3">
        Page not found
      </h1>
      <p className="text-[#4a4a4a] dark:text-[#9C9C9C] max-w-md mb-8">
        The page you requested is not part of this portfolio. {PROFILE.name} is a{" "}
        {PROFILE.role.toLowerCase()} in {PROFILE.location}.
      </p>
      <Link
        href="/"
        className="rounded bg-[#83c3de] hover:bg-[#9ed3ea] text-[#10303f] dark:bg-[#ADD6E8] dark:text-[#262626] px-8 py-3 font-semibold transition-colors"
      >
        Back to homepage
      </Link>
      <nav aria-label="Projects" className="mt-10">
        <h2 className="text-lg font-semibold text-[#2a2a2a] dark:text-white mb-3">Projects</h2>
        <ul className="flex flex-wrap justify-center gap-x-5 gap-y-2">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <Link
                href={`/projects/${project.slug}`}
                className="text-[#2f6f8a] dark:text-[#ADD6E8] underline underline-offset-4 py-1 inline-block"
              >
                {project.title}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </main>
  );
}
