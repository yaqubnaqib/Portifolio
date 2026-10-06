import type { MetadataRoute } from "next";
import { PROJECTS } from "@/data/content";
import { PROFILE } from "@/data/profile";
import { CONTENT_UPDATED, absoluteUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: absoluteUrl("/"),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 1,
      images: [absoluteUrl(PROFILE.photo.src)],
    },
    ...PROJECTS.map((project) => ({
      url: absoluteUrl(`/projects/${project.slug}`),
      lastModified: project.updated,
      changeFrequency: "monthly" as const,
      priority: 0.8,
      images: [absoluteUrl(project.image.src)],
    })),
    {
      url: absoluteUrl(PROFILE.cvPath),
      lastModified: CONTENT_UPDATED,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
