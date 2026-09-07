import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { projects } from "@/data/projects";
import { ProjectsArchive } from "@/components/projects/ProjectsArchive";

// ARCHIVE PAGE: owns route metadata and framing; ProjectsArchive owns interaction.
export const metadata: Metadata = {
  title: "All Projects | Portfolio",
  description:
    "A complete collection of user-first products and engineering work.",
};

export default function ProjectsPage() {
  return (
    <main
      id="projects"
      className="min-h-screen overflow-hidden bg-[#050505] px-6 pb-24 pt-36 text-white sm:px-10 md:pt-44 lg:px-24 xl:px-40"
    >
      <div className="pointer-events-none fixed left-1/2 top-1/4 h-[40rem] w-[40rem] -translate-x-1/2 rounded-full bg-[#ff5014]/[0.05] blur-[160px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Link
          href="/#projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[.18em] text-white/45 transition hover:text-[#ff9a4d]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to portfolio
        </Link>

        <header className="mt-12 border-b border-white/10 pb-14 md:flex md:items-end md:justify-between md:gap-12">
          <div>
            <p className="font-mono text-xs uppercase tracking-[.24em] text-[#ff9a4d]">
              Project archive / {String(projects.length).padStart(2, "0")}
            </p>
            <h1 className="mt-6 max-w-4xl text-5xl font-semibold leading-[.98] tracking-[-.055em] sm:text-6xl lg:text-8xl">
              The complete{" "}
              <span className="bg-gradient-to-r from-[#ffa032] via-[#ff5014] to-[#ffaa33] bg-clip-text text-transparent">
                work.
              </span>
            </h1>
          </div>
          <p className="mt-8 max-w-md text-base leading-7 text-white/50 md:mt-0">
            Products, experiments, and systems shaped around clear decisions,
            accessible interactions, and useful outcomes.
          </p>
        </header>

        <ProjectsArchive projects={projects} />
      </div>
    </main>
  );
}
