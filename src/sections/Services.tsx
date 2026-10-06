import type { ReactNode } from "react";
import SectionHeading from "@/components/heading/SectionHeading";

interface Service {
  id: string;
  title: string;
  description: string;
  iconPath: string;
}

const SERVICES: Service[] = [
  {
    id: "web-development",
    title: "React Frontend Development",
    description:
      "Building production storefronts and SaaS with React, TypeScript, React Router, and Next.js — SSR loaders, RTL, payments and APIs that hold up on real traffic.",
    iconPath:
      "M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12M4.157 7.582A8.959 8.959 0 003 12m8.843-4.582A11.98 11.98 0 0012 4.5c-1.36 0-2.673.193-3.843.518m15.686 0A11.953 11.953 0 0112 10.5",
  },
  {
    id: "ui-implementation",
    title: "UI Implementation & Design Systems",
    description:
      "Turning designs into accessible, polished interfaces and shared design systems — like the Tailwind CSS system behind four iZone brands in English, Arabic and Kurdish.",
    iconPath:
      "M9.53 16.122a3 3 0 00-5.78 1.128 2.25 2.25 0 01-2.4 2.245 4.5 4.5 0 008.4-2.245c0-.399-.078-.78-.22-1.128zm0 0a15.998 15.998 0 003.388-1.62m-5.043-.025a15.994 15.994 0 011.622-3.395m3.42 3.42a15.995 15.995 0 004.764-4.648l3.876-5.814a1.151 1.151 0 00-1.597-1.597L14.146 6.32a15.996 15.996 0 00-4.649 4.763m3.42 3.42a6.776 6.776 0 00-3.42-3.42",
  },
  {
    id: "frontend-architecture",
    title: "Frontend Architecture",
    description:
      "Designing and implementing scalable frontend architectures. Setting up project structures, state management, and optimizing performance for large-scale applications.",
    iconPath:
      "M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25a2.25 2.25 0 01-2.25-2.25v-2.25z",
  },
  {
    id: "performance",
    title: "Frontend Performance Optimization",
    description:
      "Cutting load time on real catalogue and product routes — route-level code splitting, lazy loading, image preloading. At iZone, LCP dropped from 3.8s to 1.4s.",
    iconPath:
      "M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z",
  },
];

function ServiceIcon({ path }: { path: string }): ReactNode {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={2}
      stroke="currentColor"
      className="w-12 h-12"
      aria-hidden="true"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d={path} />
    </svg>
  );
}

export default function Services() {
  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      className="min-h-screen py-12 sm:py-16 md:py-20 relative bg-white dark:bg-[#262626]"
    >
      <SectionHeading id="services-heading" title="Services" decoration="What I Do" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {SERVICES.map((service) => (
            <li
              key={service.id}
              className="group rounded-2xl p-6 sm:p-8 md:p-10 transition-shadow duration-300 bg-[#F8FBFD] border border-[#E0EFF5] shadow-sm hover:shadow-md dark:bg-[#242424] dark:border-[#3a3a3a]"
            >
              <div className="mb-6 transition-transform duration-300 group-hover:scale-110 text-[#2f6f8a] dark:text-[#ADD6E8]">
                <ServiceIcon path={service.iconPath} />
              </div>
              <h3 className="text-2xl sm:text-3xl font-bold mb-4 transition-colors duration-300 text-[#1a1a1a] dark:text-white">
                {service.title}
              </h3>
              <p className="text-base sm:text-lg leading-relaxed text-[#4a4a4a] dark:text-[#d0d0d0]">
                {service.description}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
