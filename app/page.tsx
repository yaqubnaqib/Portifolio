import Navbar from "@/components/navigation/Navbar";
import Hero from "@/components/hero/Hero";
import BackToTop from "@/components/BackToTop";
import SiteFooter from "@/components/SiteFooter";
import JsonLd from "@/components/seo/JsonLd";
import About from "@/sections/About";
import Services from "@/sections/Services";
import Skills from "@/sections/Skills";
import Experience from "@/sections/Experience";
import Projects from "@/sections/Projects";
import Contacts from "@/sections/Contacts";
import { PROFILE } from "@/data/profile";
import { pageMetadata } from "@/lib/metadata";
import { homeGraph } from "@/lib/structured-data";

export const dynamic = "force-static";

export const metadata = pageMetadata({
  title: `${PROFILE.name} — Frontend Developer in Erbil, Iraq | React & TypeScript`,
  description: PROFILE.metaDescription,
  path: "/",
  type: "profile",
});

export default function HomePage() {
  return (
    <>
      <JsonLd data={homeGraph()} />
      <Navbar />
      <main id="main-content" tabIndex={-1}>
        <Hero />
        <About />
        <Services />
        <Skills />
        <Experience />
        <Projects />
        <Contacts />
      </main>
      <SiteFooter />
      <BackToTop />
    </>
  );
}
