import { CORE_STACK, EDUCATION, type Project } from "@/data/content";
import { PROFILE, SOCIALS } from "@/data/profile";
import { CONTENT_UPDATED, SITE_CREATED, SITE_URL, absoluteUrl } from "@/lib/site";

type JsonLdNode = Record<string, unknown>;

export interface JsonLdGraph {
  "@context": "https://schema.org";
  "@graph": JsonLdNode[];
}

export const PERSON_ID = `${SITE_URL}/#person`;
export const WEBSITE_ID = `${SITE_URL}/#website`;

function personNode(): JsonLdNode {
  return {
    "@type": "Person",
    "@id": PERSON_ID,
    name: PROFILE.name,
    givenName: PROFILE.firstName,
    familyName: PROFILE.lastName,
    alternateName: [...PROFILE.alternateNames],
    jobTitle: PROFILE.role,
    description: PROFILE.bio,
    url: absoluteUrl("/"),
    image: {
      "@type": "ImageObject",
      "@id": `${SITE_URL}/#person-image`,
      url: absoluteUrl(PROFILE.photo.src),
      width: PROFILE.photo.width,
      height: PROFILE.photo.height,
      caption: PROFILE.photo.alt,
    },
    email: `mailto:${PROFILE.email}`,
    telephone: PROFILE.phoneHref.replace("tel:", ""),
    address: {
      "@type": "PostalAddress",
      addressLocality: PROFILE.city,
      addressRegion: PROFILE.region,
      addressCountry: PROFILE.countryCode,
    },
    homeLocation: {
      "@type": "Place",
      name: PROFILE.location,
    },
    knowsAbout: CORE_STACK,
    knowsLanguage: PROFILE.languages.map((language) => ({
      "@type": "Language",
      name: language.name,
      alternateName: language.code,
    })),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: EDUCATION.school,
      url: EDUCATION.schoolUrl,
      address: {
        "@type": "PostalAddress",
        addressLocality: "Koya",
        addressRegion: PROFILE.region,
        addressCountry: PROFILE.countryCode,
      },
    },
    hasCredential: {
      "@type": "EducationalOccupationalCredential",
      credentialCategory: "degree",
      name: EDUCATION.degree,
      recognizedBy: { "@type": "CollegeOrUniversity", name: EDUCATION.school },
    },
    worksFor: {
      "@type": "Organization",
      name: PROFILE.employer.name,
      url: PROFILE.employer.url,
    },
    sameAs: SOCIALS.map((social) => social.href),
  };
}

function websiteNode(): JsonLdNode {
  return {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    url: absoluteUrl("/"),
    name: PROFILE.name,
    alternateName: `${PROFILE.name}, ${PROFILE.role}`,
    description: PROFILE.metaDescription,
    inLanguage: "en",
    publisher: { "@id": PERSON_ID },
  };
}

export function homeGraph(): JsonLdGraph {
  const pageUrl = absoluteUrl("/");
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfilePage",
        "@id": `${SITE_URL}/#profilepage`,
        url: pageUrl,
        name: `${PROFILE.name}, ${PROFILE.headline}`,
        description: PROFILE.metaDescription,
        isPartOf: { "@id": WEBSITE_ID },
        mainEntity: { "@id": PERSON_ID },
        about: { "@id": PERSON_ID },
        primaryImageOfPage: { "@id": `${SITE_URL}/#person-image` },
        dateCreated: SITE_CREATED,
        dateModified: CONTENT_UPDATED,
        inLanguage: "en",
      },
      personNode(),
      websiteNode(),
    ],
  };
}

export function projectGraph(project: Project): JsonLdGraph {
  const pageUrl = absoluteUrl(`/projects/${project.slug}`);
  const imageUrl = absoluteUrl(project.image.src);
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${pageUrl}#webpage`,
        url: pageUrl,
        name: project.seoTitle,
        description: project.seoDescription,
        isPartOf: { "@id": WEBSITE_ID },
        breadcrumb: { "@id": `${pageUrl}#breadcrumb` },
        mainEntity: { "@id": `${pageUrl}#case-study` },
        primaryImageOfPage: { "@type": "ImageObject", url: imageUrl },
        dateModified: project.updated,
        inLanguage: "en",
      },
      {
        "@type": "CreativeWork",
        "@id": `${pageUrl}#case-study`,
        name: `${project.title} case study`,
        headline: project.seoTitle,
        description: project.seoDescription,
        url: pageUrl,
        image: {
          "@type": "ImageObject",
          url: imageUrl,
          width: project.image.width,
          height: project.image.height,
        },
        author: { "@id": PERSON_ID },
        creator: { "@id": PERSON_ID },
        dateModified: project.updated,
        keywords: project.stack.join(", "),
        about: {
          "@type": "WebSite",
          name: project.title,
          url: project.liveUrl,
          description: project.tagline,
        },
        inLanguage: "en",
      },
      {
        "@type": "BreadcrumbList",
        "@id": `${pageUrl}#breadcrumb`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: "Projects", item: absoluteUrl("/#projects") },
          { "@type": "ListItem", position: 3, name: project.title, item: pageUrl },
        ],
      },
      personNode(),
      websiteNode(),
    ],
  };
}

/** Serialises JSON-LD safely for inline <script> injection. */
export function serializeJsonLd(data: JsonLdGraph): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
