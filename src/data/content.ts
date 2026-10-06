// All copy here comes from the current CV (public/yaqub-naqib-frontend-developer-cv.pdf)
// or content already published on the site. Do not add metrics that are not in the CV.
import type { BrandIconName } from "@/components/icons/BrandIcon";

export interface ProjectImage {
  src: string;
  width: number;
  height: number;
  alt: string;
}

export interface Project {
  slug: string;
  num: string;
  title: string;
  /** One line describing what the product is. */
  tagline: string;
  /** Home page card copy. */
  summary: string;
  seoTitle: string;
  seoDescription: string;
  role: string;
  context: string;
  period?: string;
  stack: string[];
  problem: string[];
  roleDetails: string[];
  decisions: string[];
  results: string[];
  liveUrl: string;
  liveLabel: string;
  image: ProjectImage;
  reverse?: boolean;
  updated: string;
  /** "At a glance" key facts, shown at the top of the case study. */
  facts?: Array<{ label: string; value: string }>;
}

export const PROJECTS: Project[] = [
  {
    slug: "izone-iraq",
    num: "01",
    title: "iZone Iraq",
    tagline: "Multi-brand commerce platform for Iraq's largest Apple retailer",
    summary:
      "Multi-brand commerce platform (iZone, Apple Zone, OneStore, Mantiqa Altufaha) serving 60,000+ monthly users. I own the TypeScript frontend: one React Router SSR codebase, a shared Tailwind CSS design system, English, Arabic and Kurdish with full RTL, Laravel API integration, checkout and First Iraqi Bank QR payments. Catalogue LCP went from 3.8s to 1.4s.",
    seoTitle: "iZone Iraq: React e-commerce frontend case study",
    seoDescription:
      "How Yaqub Naqib built the TypeScript frontend for iZone Iraq: one React Router SSR codebase for four brands, 60,000+ monthly users, LCP cut from 3.8s to 1.4s.",
    role: "Frontend Developer",
    context: "Full-time, on-site · Erbil, Iraq",
    period: "Apr 2024 – Present",
    stack: [
      "TypeScript",
      "React",
      "React Router",
      "Tailwind CSS",
      "Jotai",
      "Zod",
      "Laravel API",
      "Mapbox",
      "i18next",
    ],
    problem: [
      "iZone, Iraq's largest Apple retailer, sells through several brands: iZone, Apple Zone, OneStore and Mantiqa Altufaha. Each storefront has to work in English, Arabic and Kurdish, with right-to-left layouts and currency-aware catalogue pricing.",
      "The goal was one codebase that powers every regional storefront without duplicated UI, while staying fast on catalogue and product pages.",
    ],
    roleDetails: [
      "I own the TypeScript frontend for the multi-brand commerce platform, taking features from API contract to live traffic against the Laravel API.",
    ],
    decisions: [
      "One server-rendered React Router codebase and a shared Tailwind CSS design system serve every brand, so a feature ships once instead of once per storefront.",
      "English, Arabic and Kurdish ship with full RTL and currency-aware catalogue pricing against a Laravel API.",
      "Route-level code splitting, below-the-fold lazy loading and product-image preloading on catalogue and product routes.",
      "Checkout and payments built end to end: Mapbox address capture, an in-app wallet with top-up and P2P transfer, and First Iraqi Bank QR payments with status polling, session recovery and full error-state coverage.",
      "Digital Cards (iTunes, Google Play, PlayStation and gaming), IMEI device lookup, live FX rates, community Q&A and in-app customer chat ship on the same platform, gated by server-driven feature flags.",
    ],
    results: [
      "60,000+ monthly users served from one React Router SSR codebase.",
      "Largest Contentful Paint on catalogue and product routes reduced from 3.8s to 1.4s.",
      "Four brands share one Tailwind CSS design system across English, Arabic and Kurdish.",
    ],
    liveUrl: "https://www.izoneiraq.com/",
    liveLabel: "izoneiraq.com",
    image: {
      src: "/images/projects/izone-iraq-storefront-home.webp",
      width: 1600,
      height: 809,
      alt: "iZone Iraq storefront home page with brand shortcuts and quick access to Shop, Digital Cards, Check, Wallet and Bourse",
    },
    facts: [
      { label: "Monthly users", value: "60,000+" },
      { label: "Brands", value: "4 storefronts, one codebase" },
      { label: "Architecture", value: "React Router SSR" },
      { label: "Languages", value: "English, Arabic, Kurdish (full RTL)" },
      { label: "Performance", value: "LCP 3.8s → 1.4s" },
      { label: "Payments", value: "First Iraqi Bank QR, in-app wallet" },
      { label: "Maps", value: "Mapbox address capture" },
    ],
    updated: "2026-10-06",
  },
  {
    slug: "botolon",
    num: "02",
    title: "Botolon",
    tagline: "No-code Meta automation SaaS for Facebook, Instagram and WhatsApp",
    summary:
      "Comment and DM automation platform connected to Meta, used by 50+ business pages across Iraq and the Kurdistan Region. I owned the TypeScript / Next.js client: per-post comment automation, a visual Messenger flow builder, an insights dashboard, subscriptions and regional checkout, localised into eight languages with full RTL.",
    seoTitle: "Botolon: Next.js SaaS frontend case study",
    seoDescription:
      "How Yaqub Naqib built the Next.js client for Botolon, a Meta comment and DM automation SaaS used by 50+ business pages, in eight languages with full RTL.",
    role: "Frontend Developer",
    context: "Contract, remote · Erbil, Iraq",
    period: "Nov 2023 – Apr 2025",
    stack: [
      "TypeScript",
      "React",
      "Next.js",
      "Redux Toolkit",
      "Sass",
      "Meta Graph API",
      "i18next",
      "Chart.js",
      "next-pwa",
      "FIB / FastPay",
    ],
    problem: [
      "Businesses in Iraq and the Kurdistan Region receive comments and messages across Facebook, Instagram and WhatsApp. Botolon is a no-code platform that automates those replies from one product.",
      "Merchants needed to reply 24/7 without duplicating their setup for every page.",
    ],
    roleDetails: [
      "I owned the TypeScript / Next.js client, from the automation features through to the commercial layer.",
    ],
    decisions: [
      "Per-post comment automation against the Meta Graph API: keyword rules, public replies and private Messenger DMs (text, image, audio, video, file), follow-gates, delayed follow-ups, reusable templates, scheduled posts and Reels.",
      "A visual Messenger flow builder with drag-and-drop blocks, galleries, persistent menus and live-chat handoff, plus Instagram quick replies, icebreakers and an insights dashboard for likes, comments and DMs.",
      "The commercial layer: subscription plans, invoicing and regional checkout (FIB, FastPay, card) with payment-status verification, multi-admin invites, a partner/reseller console and an internal ops dashboard for pages, plans and support tickets.",
      "Localised into eight languages including Kurdish, Arabic and Farsi with full RTL, and shipped as a PWA so merchants can run the dashboard from the browser or the home screen.",
    ],
    results: [
      "Used by 50+ business pages across Iraq and the Kurdistan Region, including operators such as Korek Phone.",
      "Facebook, Instagram and WhatsApp covered from one product.",
      "Eight languages with full RTL, installable as a PWA.",
    ],
    liveUrl: "https://www.botolon.com/",
    liveLabel: "botolon.com",
    image: {
      src: "/images/projects/botolon-meta-automation-dashboard.webp",
      width: 1600,
      height: 839,
      alt: "Botolon automation platform landing page",
    },
    facts: [
      { label: "Business pages", value: "50+" },
      { label: "Channels", value: "Facebook, Instagram, WhatsApp" },
      { label: "Languages", value: "8, incl. Kurdish, Arabic, Farsi (RTL)" },
      { label: "Payments", value: "FIB, FastPay, card" },
      { label: "Delivery", value: "Installable PWA" },
    ],
    updated: "2026-10-06",
  },
  {
    slug: "waorders",
    num: "03",
    title: "WAOrders",
    tagline: "WhatsApp ordering platform for restaurants in Iraq",
    summary:
      "WhatsApp ordering platform for restaurants in Iraq, live with paying customers. A multilingual bot (English, Arabic, Kurdish) turns chat into structured orders; merchants manage menus and order status from a real-time dashboard, with RTL and Gemini-assisted replies.",
    seoTitle: "WAOrders: WhatsApp ordering platform case study",
    seoDescription:
      "How Yaqub Naqib designed, built and launched WAOrders, a WhatsApp ordering platform for restaurants in Iraq with a trilingual bot and real-time dashboard.",
    role: "Designer and developer",
    context: "Own product · Iraq",
    stack: [
      "Node.js",
      "Express",
      "React Router",
      "PostgreSQL",
      "Prisma",
      "WhatsApp Cloud API",
      "Gemini",
    ],
    problem: [
      "Restaurant orders arrive on WhatsApp as free-text messages. WAOrders turns those conversations into structured orders that a restaurant can manage, without asking customers to install anything.",
    ],
    roleDetails: [
      "I designed, built and launched the product: the conversational bot, the merchant dashboard, menu management and live order-status updates.",
    ],
    decisions: [
      "A trilingual conversational UX in English, Arabic and Kurdish, with automatic language detection and RTL support.",
      "AI-assisted replies through a Gemini LLM integration.",
      "Built end to end with Node.js/Express, PostgreSQL/Prisma, React Router and the Meta WhatsApp Cloud API.",
      "A real-time merchant dashboard for menus and order status.",
    ],
    results: [
      "Live in production with its first paying restaurant customers.",
      "Runs on a flat-subscription model.",
    ],
    liveUrl: "https://waordersiraq.com/",
    liveLabel: "waordersiraq.com",
    image: {
      src: "/images/projects/waorders-whatsapp-ordering-platform.webp",
      width: 1600,
      height: 782,
      alt: "WAOrders landing page with the headline Every chat becomes an order",
    },
    reverse: true,
    facts: [
      { label: "Status", value: "Live, first paying restaurants" },
      { label: "Languages", value: "English, Arabic, Kurdish (RTL)" },
      { label: "AI", value: "Gemini-assisted replies" },
      { label: "Messaging", value: "WhatsApp Cloud API" },
    ],
    updated: "2026-10-06",
  },
  {
    slug: "erbilianway",
    num: "04",
    title: "ErbilianWay",
    tagline: "Travel booking website for an Erbil tour operator",
    summary:
      "Travel booking platform for an Erbil tour operator. I built the responsive frontend and booking-enquiry flow against a Laravel API so visitors can explore trips and send enquiries from any device.",
    seoTitle: "ErbilianWay: travel booking website case study",
    seoDescription:
      "How Yaqub Naqib built the responsive Vue.js frontend and booking-enquiry flow for ErbilianWay, a travel booking website for an Erbil tour operator.",
    role: "Frontend Developer Intern",
    context: "Internship at Jiasaz for IT Services & Solutions · Erbil, Iraq",
    period: "Jun 2023 – Sep 2023",
    stack: ["Vue.js", "Bootstrap", "Laravel API"],
    problem: [
      "An Erbil tour operator needed a website where visitors can explore trips and send booking enquiries from any device.",
    ],
    roleDetails: [
      "Working with the Jiasaz team, I built the responsive frontend and the booking-enquiry flow against a Laravel API.",
    ],
    decisions: [
      "Vue.js for the interface, with Bootstrap for a responsive layout that works on phones, tablets and desktops.",
      "The booking-enquiry flow talks to the operator's Laravel API.",
    ],
    results: ["The site is live at erbiliantravel.com."],
    liveUrl: "https://erbiliantravel.com/",
    liveLabel: "erbiliantravel.com",
    image: {
      src: "/images/projects/erbilianway-travel-booking-website.webp",
      width: 1600,
      height: 829,
      alt: "ErbilianWay travel booking website home page",
    },
    reverse: true,
    updated: "2026-10-06",
  },
];

export function getProject(slug: string): Project | undefined {
  return PROJECTS.find((project) => project.slug === slug);
}

export interface Skill {
  name: string;
  icon: BrandIconName;
}

export interface SkillGroup {
  id: string;
  title: string;
  skills: Skill[];
}

export const SKILL_GROUPS: SkillGroup[] = [
  {
    id: "core",
    title: "Core expertise",
    skills: [
      { name: "React", icon: "react" },
      { name: "TypeScript", icon: "typescript" },
      { name: "React Router", icon: "reactRouter" },
      { name: "Next.js", icon: "nextjs" },
      { name: "Tailwind CSS", icon: "tailwind" },
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML", icon: "html" },
      { name: "CSS", icon: "css" },
    ],
  },
  {
    id: "frontend-ecosystem",
    title: "Frontend ecosystem",
    skills: [
      { name: "Redux", icon: "redux" },
      { name: "Jotai", icon: "jotai" },
      { name: "Zod", icon: "zod" },
      { name: "Radix UI", icon: "radix" },
      { name: "React Native", icon: "reactNative" },
      { name: "Sass", icon: "sass" },
      { name: "Bootstrap", icon: "bootstrap" },
    ],
  },
  {
    id: "backend-api",
    title: "Backend & API integration",
    skills: [
      { name: "Laravel API integration", icon: "laravel" },
      { name: "Node.js", icon: "node" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    id: "tools",
    title: "Tools",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Figma", icon: "figma" },
    ],
  },
];

export const WORKING_KNOWLEDGE = ["Vue.js", "Python", "Django", "MySQL"];

/** Core stack, used for JSON-LD knowsAbout and llms.txt. */
export const CORE_STACK = [
  "React",
  "TypeScript",
  "React Router",
  "Next.js",
  "Tailwind CSS",
  "JavaScript",
  "Node.js",
  "Frontend development",
  "Web performance",
  "Accessibility",
  "Internationalisation and RTL interfaces",
];

export interface Experience {
  id: string;
  title: string;
  company: string;
  companyUrl?: string;
  period: string;
  meta: string;
  highlights: string[];
  caseStudySlug?: string;
}

/** Reverse chronological order. */
export const EXPERIENCES: Experience[] = [
  {
    id: "izone",
    title: "Frontend Developer",
    company: "iZone Iraq",
    companyUrl: "https://www.izoneiraq.com/",
    period: "Apr 2024 – Present",
    meta: "Full-time, on-site · Erbil, Iraq",
    caseStudySlug: "izone-iraq",
    highlights: [
      "Own the TypeScript frontend for iZone's multi-brand commerce platform (iZone, Apple Zone, OneStore, Mantiqa Altufaha), serving 60,000+ monthly users from one React Router SSR codebase and a shared Tailwind CSS design system.",
      "Ship English, Arabic and Kurdish with full RTL and currency-aware catalogue pricing against a Laravel API, so one codebase powers every regional storefront without duplicated UI.",
      "Reduced Largest Contentful Paint on catalogue and product routes from 3.8s to 1.4s with route-level code splitting, below-the-fold lazy loading and product-image preloading.",
      "Built checkout and payments end to end: Mapbox address capture, in-app wallet (top-up and P2P transfer) and First Iraqi Bank QR payments with status polling, session recovery and full error-state coverage.",
      "Delivered Digital Cards (iTunes, Google Play, PlayStation and gaming), IMEI device lookup, live FX rates, community Q&A and in-app customer chat on the same platform, gated by server-driven feature flags.",
    ],
  },
  {
    id: "botolon",
    title: "Frontend Developer",
    company: "Botolon",
    companyUrl: "https://www.botolon.com/",
    period: "Nov 2023 – Apr 2025",
    meta: "Contract, remote · Erbil, Iraq",
    caseStudySlug: "botolon",
    highlights: [
      "Owned the TypeScript / Next.js client for a Meta-connected comment and DM automation platform used by 50+ business pages across Iraq and the Kurdistan Region (including operators such as Korek Phone), covering Facebook, Instagram and WhatsApp from one product.",
      "Shipped per-post comment automation against the Meta Graph API: keyword rules, public replies and private Messenger DMs, follow-gates, delayed follow-ups, reusable templates, scheduled posts and Reels.",
      "Built the visual Messenger flow builder (drag-and-drop blocks, galleries, persistent menus, live-chat handoff) plus Instagram quick replies, icebreakers and an insights dashboard.",
      "Delivered the commercial layer: subscription plans, invoicing and regional checkout (FIB, FastPay, card) with payment-status verification, multi-admin invites, a partner/reseller console and an internal ops dashboard.",
      "Localised the product into eight languages including Kurdish, Arabic and Farsi with full RTL, and shipped it as a PWA.",
    ],
  },
  {
    id: "jiasaz",
    title: "Frontend Developer Intern",
    company: "Jiasaz for IT Services & Solutions",
    period: "Jun 2023 – Sep 2023",
    meta: "Internship · Erbil, Iraq",
    caseStudySlug: "erbilianway",
    highlights: [
      "First professional role: worked on real client projects with the Jiasaz team, including the ErbilianWay travel site frontend. Strengthened problem-solving, teamwork, and delivery under real-world product constraints.",
    ],
  },
];

export const EDUCATION = {
  degree: "BSc Software Engineering",
  school: "Koya University",
  schoolUrl: "https://koyauniversity.org/",
  location: "Koya, Kurdistan Region, Iraq",
  period: "Nov 2020 – May 2024",
  summary:
    "Completed a Software Engineering degree with a foundation in programming, web technologies and modern software development practices.",
} as const;

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ: FaqItem[] = [
  {
    question: "Who is Yaqub Naqib?",
    answer:
      "Yaqub Naqib is a frontend developer based in Erbil, Kurdistan Region, Iraq, with 3+ years of experience owning production commerce and SaaS frontends in React and TypeScript. He currently owns the TypeScript frontend at iZone Iraq.",
  },
  {
    question: "What does Yaqub Naqib build?",
    answer:
      "He builds e-commerce storefronts and SaaS dashboards: server-rendered React Router and Next.js apps, design systems shared across brands, trilingual English, Arabic and Kurdish interfaces with full RTL, and checkout and payment flows. His work includes iZone Iraq, Botolon, WAOrders and ErbilianWay.",
  },
  {
    question: "What is his tech stack?",
    answer:
      "His core stack is React, TypeScript, React Router, Next.js and Tailwind CSS. Around it he uses Redux Toolkit, Jotai, Zod, Radix UI and React Native, integrates backends through Laravel APIs, Node.js and Firebase, and has working knowledge of Vue.js, Python, Django and MySQL.",
  },
  {
    question: "Where is Yaqub Naqib based?",
    answer:
      "He is based in Erbil, in the Kurdistan Region of Iraq. He has worked both on-site in Erbil and remotely, in English-speaking teams.",
  },
  {
    question: "Is he available for new work?",
    answer:
      "Yes. Yaqub is available for freelance and subcontract projects, and open to collaborations and full-time roles.",
  },
  {
    question: "How can I contact Yaqub Naqib?",
    answer:
      "Email yaqub.nq@gmail.com, use the contact form on this site, or message him on LinkedIn.",
  },
];
