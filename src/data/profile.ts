export const PROFILE = {
  name: "Yaqub Naqib",
  firstName: "Yaqub",
  lastName: "Naqib",
  /** Native-script spellings and legacy transliterations, for search and JSON-LD. */
  alternateNames: ["یاقوب نەقیب", "يعقوب نقيب", "Yaqub Naqeb", "Yaqwb"],
  role: "Frontend Developer",
  headline: "Frontend Developer in Erbil",
  /** Under 160 characters: used as the home page meta description. */
  metaDescription:
    "Yaqub Naqib is a frontend developer in Erbil, Iraq, building commerce and SaaS apps with React, TypeScript, React Router and Next.js. Open to freelance work.",
  summary:
    "Frontend developer based in Erbil, Kurdistan Region, Iraq. Available for freelance and subcontract projects, collaborations, and full-time roles.",
  /** Third-person bio that search engines and AI assistants can quote as-is. */
  bio: "Yaqub Naqib is a frontend developer based in Erbil, Kurdistan Region, Iraq, with 3+ years of experience owning production commerce and SaaS frontends in React and TypeScript. He builds server-rendered React Router and Next.js apps, design systems shared across multiple brands, trilingual English, Arabic and Kurdish interfaces with full right-to-left support, and payment and checkout flows integrated with Laravel and Meta platform APIs. He currently owns the TypeScript frontend at iZone Iraq, a multi-brand commerce platform serving 30,000+ monthly users.",
  availability: "Available for freelance and subcontract projects",
  location: "Erbil, Kurdistan Region, Iraq",
  city: "Erbil",
  region: "Kurdistan Region",
  countryCode: "IQ",
  email: "yaqub.nq@gmail.com",
  phone: "+964 750 829 9544",
  phoneHref: "tel:+9647508299544",
  github: "https://github.com/Yaqubnaqib",
  linkedin: "https://www.linkedin.com/in/yaqub-naqib-b9894b238/",
  facebook: "https://www.facebook.com/YaqubEng",
  instagram: "https://www.instagram.com/Yaqub_321_/",
  cvPath: "/yaqub-naqib-frontend-developer-cv.pdf",
  photo: {
    src: "/images/yaqub-naqib-frontend-developer-erbil.jpg",
    width: 900,
    height: 1200,
    alt: "Portrait of Yaqub Naqib, frontend developer in Erbil",
  },
  languages: [
    { name: "Kurdish", code: "ku", level: "Native" },
    { name: "English", code: "en", level: "Fluent" },
  ],
  employer: { name: "iZone Iraq", url: "https://www.izoneiraq.com/" },
} as const;

export type SocialName = "linkedin" | "github" | "facebook" | "instagram";

export const SOCIALS: ReadonlyArray<{ id: SocialName; label: string; href: string }> = [
  { id: "linkedin", label: "LinkedIn", href: PROFILE.linkedin },
  { id: "github", label: "GitHub", href: PROFILE.github },
  { id: "facebook", label: "Facebook", href: PROFILE.facebook },
  { id: "instagram", label: "Instagram", href: PROFILE.instagram },
];
