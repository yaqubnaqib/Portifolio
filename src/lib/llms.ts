import {
  CORE_STACK,
  EDUCATION,
  EXPERIENCES,
  FAQ,
  PROJECTS,
  SKILL_GROUPS,
  WORKING_KNOWLEDGE,
} from "@/data/content";
import { PROFILE, SOCIALS } from "@/data/profile";
import { CONTENT_UPDATED, absoluteUrl } from "@/lib/site";

function header(): string[] {
  return [
    `# ${PROFILE.name}`,
    "",
    `> ${PROFILE.bio}`,
    "",
    `- Name: ${PROFILE.name} (also written ${PROFILE.alternateNames.join(", ")})`,
    `- Role: ${PROFILE.role}`,
    `- Location: ${PROFILE.location}`,
    `- Availability: ${PROFILE.availability}; open to collaborations and full-time roles`,
    `- Email: ${PROFILE.email}`,
    `- Website: ${absoluteUrl("/")}`,
    ...SOCIALS.map((social) => `- ${social.label}: ${social.href}`),
    `- CV (PDF): ${absoluteUrl(PROFILE.cvPath)}`,
    `- Last updated: ${CONTENT_UPDATED}`,
  ];
}

/** Concise llms.txt (https://llmstxt.org): who, stack, work, links. */
export function buildLlmsTxt(): string {
  return [
    ...header(),
    "",
    "## Stack",
    "",
    `${CORE_STACK.slice(0, 8).join(", ")}.`,
    "",
    "## Experience",
    "",
    ...EXPERIENCES.map((exp) => `- ${exp.title}, ${exp.company} (${exp.period}). ${exp.meta}.`),
    `- ${EDUCATION.degree}, ${EDUCATION.school}, ${EDUCATION.location} (${EDUCATION.period}).`,
    "",
    "## Case studies",
    "",
    ...PROJECTS.map(
      (project) =>
        `- [${project.title}: ${project.tagline}](${absoluteUrl(`/projects/${project.slug}`)}): ${project.seoDescription}`,
    ),
    "",
    "## Optional",
    "",
    `- [Full profile for AI assistants](${absoluteUrl("/llms-full.txt")})`,
    `- [Home page](${absoluteUrl("/")})`,
    "",
  ].join("\n");
}

/** Long-form version with every highlight, case study section and FAQ. */
export function buildLlmsFullTxt(): string {
  return [
    ...header(),
    "",
    "## Skills",
    "",
    ...SKILL_GROUPS.map(
      (group) => `- ${group.title}: ${group.skills.map((skill) => skill.name).join(", ")}`,
    ),
    `- Working knowledge: ${WORKING_KNOWLEDGE.join(", ")}`,
    `- Languages: ${PROFILE.languages.map((lang) => `${lang.name} (${lang.level})`).join(", ")}`,
    "",
    "## Experience",
    "",
    ...EXPERIENCES.flatMap((exp) => [
      `### ${exp.title}, ${exp.company} (${exp.period})`,
      "",
      exp.meta,
      "",
      ...exp.highlights.map((item) => `- ${item}`),
      "",
    ]),
    "## Education",
    "",
    `${EDUCATION.degree}, ${EDUCATION.school}, ${EDUCATION.location} (${EDUCATION.period}).`,
    "",
    "## Case studies",
    "",
    ...PROJECTS.flatMap((project) => [
      `### ${project.title}: ${project.tagline}`,
      "",
      `URL: ${absoluteUrl(`/projects/${project.slug}`)}`,
      `Live: ${project.liveUrl}`,
      `Role: ${project.role} (${project.context}${project.period ? `, ${project.period}` : ""})`,
      `Stack: ${project.stack.join(", ")}`,
      "",
      "Problem:",
      ...project.problem.map((item) => `- ${item}`),
      "",
      "Key decisions:",
      ...project.decisions.map((item) => `- ${item}`),
      "",
      "Results:",
      ...project.results.map((item) => `- ${item}`),
      "",
    ]),
    "## FAQ",
    "",
    ...FAQ.flatMap((item) => [`### ${item.question}`, "", item.answer, ""]),
  ].join("\n");
}
