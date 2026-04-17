// src/app/(public)/page.tsx

import { Hero } from "@/components/sections/hero/Hero";
import { Experience } from "@/components/sections/experience/Experience";
import { Projects } from "@/components/sections/projects/Projects";

export default function HomePage() {
  return (
    <>
      <section id="hero" className="min-h-screen px-6 md:px-10 pt-24 md:pt-20">
        <Hero />
      </section>

      <section id="experience" className="px-6 md:px-10">
        <Experience />
      </section>

      <section id="projects" className="px-6 md:px-10">
        <Projects />
      </section>
    </>
  );
}
