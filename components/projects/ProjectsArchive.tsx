"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/data/projects";

const filters = ["All", "Live", "Prototype", "AI", "Web"] as const;
type Filter = (typeof filters)[number];

const statusLabel = {
  live: "Live",
  prototype: "Prototype",
  "in-development": "In development",
};

const belongsToFilter = (project: Project, filter: Filter) => {
  if (filter === "All") return true;
  if (filter === "Live") return project.status === "live";
  if (filter === "Prototype") return project.status === "prototype";
  const searchable =
    `${project.category} ${project.technologies.join(" ")}`.toLowerCase();
  if (filter === "AI") return searchable.includes("ai");
  return (
    searchable.includes("react") ||
    searchable.includes("next.js") ||
    searchable.includes("web")
  );
};

export function ProjectsArchive({ projects }: { projects: Project[] }) {
  const [filter, setFilter] = useState<Filter>("All");
  const [activeProject, setActiveProject] = useState<string | null>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const visibleProjects = projects.filter((project) =>
    belongsToFilter(project, filter),
  );
  const { scrollYProgress } = useScroll({
    target: gridRef,
    offset: ["start 75%", "end 35%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 24,
    mass: 0.35,
  });

  return (
    <section className="mt-10 md:mt-14">
      <div className="flex flex-col gap-5 border-b border-white/10 pb-7 sm:flex-row sm:items-end sm:justify-between">
        <div
          className="flex max-w-full gap-2 overflow-x-auto pb-1"
          aria-label="Filter projects"
        >
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              aria-pressed={filter === item}
              className={`relative shrink-0 rounded-full border px-4 py-2.5 font-mono text-[10px] uppercase tracking-[.15em] transition ${filter === item ? "border-[#ff8a24]/60 text-white" : "border-white/10 text-white/40 hover:border-white/20 hover:text-white/70"}`}
            >
              {filter === item && (
                <motion.span
                  layoutId="archive-filter"
                  className="absolute inset-0 -z-10 rounded-full bg-[#ff6a1a]/15"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              {item}
            </button>
          ))}
        </div>
        <p className="shrink-0 font-mono text-[10px] uppercase tracking-[.18em] text-white/35">
          <span className="text-[#ff9a4d]">
            {String(visibleProjects.length).padStart(2, "0")}
          </span>{" "}
          projects shown
        </p>
      </div>

      <div ref={gridRef} className="relative mt-12">
        <div className="absolute -left-5 top-0 hidden h-full w-px bg-white/[.06] xl:block">
          <motion.span
            style={{ scaleY: progress }}
            className="absolute inset-0 origin-top bg-gradient-to-b from-[#ff9a32] via-[#ff5014] to-transparent shadow-[0_0_14px_rgba(255,80,20,.5)]"
          />
        </div>

        <motion.div layout className="grid gap-5 md:grid-cols-2 xl:gap-7">
          <AnimatePresence mode="popLayout">
            {visibleProjects.map((project, index) => (
              <div
                key={project.number}
                className={index % 2 === 1 ? "md:pt-14" : ""}
              >
                <motion.article
                  layout
                  initial={{
                    opacity: 0,
                    y: 55,
                    clipPath: "inset(8% 0 0 0 round 1.75rem)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    clipPath: "inset(0% 0 0 0 round 1.75rem)",
                  }}
                  exit={{
                    opacity: 0,
                    scale: 0.96,
                    transition: { duration: 0.22 },
                  }}
                  viewport={{ once: true, amount: 0.18 }}
                  transition={{
                    duration: 0.65,
                    delay: (index % 2) * 0.08,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  onHoverStart={() => setActiveProject(project.number)}
                  onHoverEnd={() => setActiveProject(null)}
                  className="group relative flex min-h-[34rem] flex-col overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090909] transition-colors duration-500 hover:border-[#ff7a24]/35"
                >
                  <motion.div
                    animate={{
                      opacity: activeProject === project.number ? 1 : 0,
                    }}
                    className="pointer-events-none absolute -right-20 -top-20 z-10 h-56 w-56 rounded-full bg-[#ff5a18]/10 blur-[65px]"
                  />
                  <div className="relative h-56 overflow-hidden border-b border-white/10 bg-[radial-gradient(circle_at_50%_40%,rgba(255,106,26,.2),transparent_52%),linear-gradient(145deg,#121212,#080808)] sm:h-64">
                    {project.image ? (
                      <Image
                        src={project.image}
                        alt={`${project.title} preview`}
                        fill
                        sizes="(max-width: 767px) 100vw, 50vw"
                        className="object-cover object-top saturate-0 transition duration-700 ease-out group-hover:scale-[1.035] group-hover:saturate-100"
                      />
                    ) : (
                      <div className="absolute inset-[12%] rotate-[-2deg] overflow-hidden rounded-xl border border-white/10 bg-[#0d0d0d] transition duration-700 ease-out group-hover:rotate-0 group-hover:-translate-y-2 group-hover:scale-[1.02]">
                        <div className="flex h-9 items-center gap-2 border-b border-white/10 px-4">
                          <i className="h-2 w-2 rounded-full bg-[#ff6a1a]" />
                          <i className="h-2 w-2 rounded-full bg-white/15" />
                          <i className="h-2 w-2 rounded-full bg-white/15" />
                        </div>
                        <div className="grid h-[calc(100%_-_2.25rem)] grid-cols-[.3fr_.7fr] gap-4 p-4">
                          <span className="rounded-lg bg-white/[.035]" />
                          <div className="space-y-3">
                            <span className="block h-7 w-2/3 rounded-md bg-[#ff6a1a]/25" />
                            <span className="block h-2.5 w-full rounded bg-white/[.06]" />
                            <span className="block h-2.5 w-4/5 rounded bg-white/[.06]" />
                            <span className="mt-5 block h-16 rounded-lg border border-white/[.06]" />
                          </div>
                        </div>
                      </div>
                    )}
                    <span className="absolute right-5 top-5 font-mono text-xs tracking-[.16em] text-white/40">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>

                  <div className="relative z-20 flex flex-1 flex-col p-6 sm:p-8">
                    <div className="flex items-center justify-between gap-4 font-mono text-[10px] uppercase tracking-[.16em]">
                      <span className="text-[#ff9a4d]">
                        {statusLabel[project.status]}
                      </span>
                      <span className="text-white/30">{project.year}</span>
                    </div>
                    <p className="mt-7 text-[10px] uppercase tracking-[.2em] text-white/35">
                      {project.category}
                    </p>
                    <h2 className="mt-2 text-3xl font-medium tracking-[-.04em] sm:text-4xl">
                      {project.title}
                    </h2>
                    <p className="mt-4 text-sm leading-6 text-white/50">
                      {project.summary}
                    </p>
                    <motion.div
                      initial="rest"
                      whileInView="visible"
                      viewport={{ once: true }}
                      variants={{
                        rest: {},
                        visible: {
                          transition: {
                            staggerChildren: 0.055,
                            delayChildren: 0.18,
                          },
                        },
                      }}
                      className="mt-6 flex flex-wrap gap-2"
                    >
                      {project.technologies.map((technology) => (
                        <motion.span
                          variants={{
                            rest: { opacity: 0, y: 8 },
                            visible: { opacity: 1, y: 0 },
                          }}
                          key={technology}
                          className="rounded-full border border-white/10 px-2.5 py-1 text-[9px] uppercase tracking-wider text-white/40"
                        >
                          {technology}
                        </motion.span>
                      ))}
                    </motion.div>
                    <div className="mt-auto flex flex-wrap gap-3 pt-8">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-xs text-white/65 transition hover:border-[#ff8a24]/50 hover:text-white"
                        >
                          <FaGithub className="h-4 w-4" />
                          GitHub
                        </a>
                      )}
                      {project.status === "live" && project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#ff8a24] to-[#ff5014] px-4 py-2 text-xs font-medium"
                        >
                          View live
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {project.status === "prototype" &&
                        project.prototypeUrl && (
                          <a
                            href={project.prototypeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-gradient-to-r from-[#ff8a24] to-[#ff5014] px-4 py-2 text-xs font-medium"
                          >
                            View prototype
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                    </div>
                  </div>
                </motion.article>
              </div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
