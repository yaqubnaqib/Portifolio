import type { Metadata } from "next";
import { PROFILE } from "@/data/profile";

interface PageMetadataInput {
  /** Full <title>; used as-is (not run through the layout template). */
  title: string;
  description: string;
  /** Path on the site, e.g. "/projects/izone-iraq". */
  path: string;
  type?: "profile" | "article";
}

/** Unique title, description, canonical and Open Graph tags for one page. */
export function pageMetadata({
  title,
  description,
  path,
  type = "article",
}: PageMetadataInput): Metadata {
  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
      types: { "text/plain": "/llms.txt" },
    },
    openGraph: {
      type,
      url: path,
      siteName: PROFILE.name,
      locale: "en_US",
      title,
      description,
      ...(type === "profile"
        ? { firstName: PROFILE.firstName, lastName: PROFILE.lastName }
        : { authors: [PROFILE.name] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
