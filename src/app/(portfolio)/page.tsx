// src/app/(portfolio)/page.tsx

export const HomePage = () => {
  return (
    <>
      <section id="hero" className="min-h-screen flex items-center scroll-mt-24">
        Hero Section
      </section>

      <section id="projects" className="min-h-screen scroll-mt-24">
        Projects Section
      </section>

      <section id="skills" className="min-h-screen scroll-mt-24">
        Skills Section
      </section>

      <section id="blog" className="min-h-screen scroll-mt-24">
        Blog Section
      </section>

      <section id="contact" className="min-h-screen scroll-mt-24">
        Contact Section
      </section>
    </>
  );
};

export default HomePage;
