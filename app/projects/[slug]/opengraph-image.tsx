import { PROJECTS, getProject } from "@/data/content";
import { PROFILE } from "@/data/profile";
import { OG_SIZE, renderOgCard } from "@/lib/og";

export const alt = "Case study by Yaqub Naqib";
export const size = OG_SIZE;
export const contentType = "image/png";

export function generateStaticParams() {
  return PROJECTS.map((project) => ({ slug: project.slug }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const project = getProject((await params).slug);
  return renderOgCard({
    eyebrow: `Case study by ${PROFILE.name}`,
    title: project ? project.title : PROFILE.name,
    subtitle: project ? project.tagline : PROFILE.headline,
    tags: project ? project.stack : [],
  });
}
