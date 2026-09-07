import Hero from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Services } from "@/components/sections/services";
import { Skills } from "@/components/sections/skills";
import { Experience } from "@/components/sections/experience";
import { Projects } from "@/components/sections/projects";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";
import { projects } from "@/data/projects";
import { randomInt } from "node:crypto";

// HOMEPAGE: composes every section and assigns the anchors used by navigation.
// Render per request so reloading the homepage produces a fresh selection.
export const dynamic = "force-dynamic";

// Fisher-Yates returns four unique records without mutating the shared archive.
const getRandomProjects = () => {
  const shuffled = [...projects];
  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = randomInt(index + 1);
    [shuffled[index], shuffled[randomIndex]] = [
      shuffled[randomIndex],
      shuffled[index],
    ];
  }
  return shuffled.slice(0, 4);
};

export default function Page() {
  const selectedProjects = getRandomProjects();

  return (
    <div>
      <section id="hero">
        <Hero />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="skills">
        <Skills />
      </section>
      <section id="experience">
        <Experience />
      </section>
      <section id="projects">
        <Projects projects={selectedProjects} />
      </section>
      <section id="contact">
        <Contact />
      </section>
      <Footer />
    </div>
  );
}
