import { Hero } from "@/components/sections/hero/Hero";

export default function HomePage() {
  return (
    <>
      <section id="hero" className="min-h-screen px-6 md:px-10 py-24">
        <Hero />
      </section>

      <section id="projects" className="min-h-screen px-6 md:px-10 py-24">
        Projects
      </section>

      <section id="skills" className="min-h-screen px-6 md:px-10 py-24">
        Skills
      </section>

      <section id="blog" className="min-h-screen px-6 md:px-10 py-24">
        Blog
      </section>

      <section id="contact" className="min-h-screen px-6 md:px-10 py-24">
        Contact
      </section>
    </>
  );
}
