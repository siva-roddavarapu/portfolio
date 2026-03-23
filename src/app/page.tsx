// src/app/page.tsx
import { Sidebar } from "@/components/layout/Sidebar";
import { MobileNav } from "@/components/layout/MobileNav";

export default function Page() {
  return (
    <div className="flex">
      <Sidebar />
      <MobileNav />

      <main className="md:ml-64 px-6 pt-20 flex-1">
        <div>

        <section id="hero" className="min-h-screen scroll-mt-20">
          Hero
        </section>
        <section id="projects" className="min-h-screen scroll-mt-20">
          Projects
        </section>
        <section id="skills" className="min-h-screen scroll-mt-20">
          Skills
        </section>
        <section id="blog" className="min-h-screen scroll-mt-20">
          Blog
        </section>
        <section id="contact" className="min-h-screen scroll-mt-20">
          Contact
        </section>
        </div>
      </main>
    </div>
  );
}
