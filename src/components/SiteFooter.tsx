import Link from "next/link";
import { PROJECTS } from "@/data/content";
import { PROFILE, SOCIALS } from "@/data/profile";

const footerLink =
  "inline-block py-1 text-[#4d5a60] hover:text-[#1a1a1a] dark:text-[#9C9C9C] dark:hover:text-[#ADD6E8] transition-colors duration-300 underline-offset-4 hover:underline";

export default function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#F8FCFD] dark:bg-[#1f1f1f] border-t border-[#e5e7eb] dark:border-[#3a3a3a] px-4 sm:px-6 md:px-10 lg:px-16 py-12 sm:py-14">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 border-b border-[#e5e7eb] dark:border-[#3a3a3a]">
          <div>
            <p className="text-2xl sm:text-3xl font-semibold text-[#1a1a1a] dark:text-white">
              Have a project in mind?
            </p>
            <p className="mt-2 text-[#4a4a4a] dark:text-[#d0d0d0]">{PROFILE.availability}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={`mailto:${PROFILE.email}`}
              className="rounded inline-block bg-[#83c3de] hover:bg-[#9ed3ea] text-[#10303f] dark:bg-[#ADD6E8] dark:hover:bg-[#9cd5ee] dark:text-[#262626] font-semibold py-3 px-6 transition-colors duration-300"
            >
              Email {PROFILE.firstName}
            </a>
            <a
              href={PROFILE.cvPath}
              download="Yaqub-Naqib-Frontend-Developer-CV.pdf"
              className="rounded inline-block border-2 border-[#83c3de] text-[#1f4f63] hover:bg-white dark:border-[#88a3ae] dark:text-white dark:hover:bg-[#53595c] font-medium py-2.5 px-6 transition-colors duration-300"
            >
              Download CV<span className="sr-only"> (PDF)</span>
            </a>
          </div>
        </div>

        <div className="grid gap-8 sm:grid-cols-3 pt-10 text-sm sm:text-base">
          <nav aria-label="Projects">
            <h2 className="font-semibold text-[#1a1a1a] dark:text-white mb-3">Projects</h2>
            <ul className="space-y-1">
              {PROJECTS.map((project) => (
                <li key={project.slug}>
                  <Link href={`/projects/${project.slug}`} className={footerLink}>
                    {project.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Elsewhere">
            <h2 className="font-semibold text-[#1a1a1a] dark:text-white mb-3">Elsewhere</h2>
            <ul className="space-y-1">
              {SOCIALS.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className={footerLink}
                  >
                    {social.label}
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <h2 className="font-semibold text-[#1a1a1a] dark:text-white mb-3">{PROFILE.name}</h2>
            <p className="text-[#4d5a60] dark:text-[#9C9C9C]">
              {PROFILE.role}
              <br />
              {PROFILE.location}
            </p>
          </div>
        </div>

        <p className="mt-10 text-[#4d5a60] dark:text-[#9C9C9C] text-sm">
          © {year} {PROFILE.name}
        </p>
      </div>
    </footer>
  );
}
