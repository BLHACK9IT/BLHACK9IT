"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import type { Project } from "@/data/projects";

// SECTION PURPOSE: four server-selected projects presented as a sticky card sequence.
export const Projects = ({ projects }: { projects: Project[] }) => {
  // Touch devices tap a screenshot to toggle its branded color treatment.
  const [revealedImage, setRevealedImage] = useState<string | null>(null);

  return (
    <>
      <section className="relative overflow-clip bg-[#050505] px-6 pb-8 pt-24 text-white sm:px-10 md:pb-10 md:pt-32 lg:px-24 xl:px-40">
        <div className="pointer-events-none absolute left-1/2 top-1/3 h-[36rem] w-[36rem] -translate-x-1/2 rounded-full bg-[#ff5014]/[0.05] blur-[150px]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em] text-[#ffae6e] sm:text-sm"
          >
            <span className="h-px w-9 bg-[#ff6a1a]" />
            05 — Selected work
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mt-8 max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-.045em] sm:text-5xl md:text-6xl lg:text-7xl"
          >
            Products built around{" "}
            <span className="bg-gradient-to-r from-[#ffa032] via-[#ff5014] to-[#ffaa33] bg-clip-text text-transparent">
              real people and real problems.
            </span>
          </motion.h2>

          <div className="mt-16 md:mt-20">
            {projects.map((project, index) => {
              const visualFirst = index % 2 === 1;
              const statusLabel =
                project.status === "live"
                  ? "LIVE"
                  : project.status === "prototype"
                    ? "PROTOTYPE"
                    : "IN DEVELOPMENT";
              return (
                <motion.article
                  key={project.number}
                  initial={{
                    opacity: 0,
                    y: 90,
                    clipPath: "inset(12% 0 0 0 round 2rem)",
                  }}
                  whileInView={{
                    opacity: 1,
                    y: 0,
                    clipPath: "inset(0% 0 0 0 round 2rem)",
                  }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
                  style={{ zIndex: index + 1 }}
                  className="project-panel group relative mb-8 grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909] shadow-[0_-24px_70px_rgba(0,0,0,.42)] last:mb-0 lg:grid-cols-2"
                >
                  {/* Product-stage placeholder can later be replaced by a screenshot or video. */}
                  <div
                    className={`project-visual group/preview relative min-h-[340px] overflow-hidden border-white/10 p-7 sm:p-10 lg:min-h-0 ${project.image ? "cursor-pointer" : ""} ${visualFirst ? "lg:order-1 lg:border-r" : "lg:order-2 lg:border-l"}`}
                    role={project.image ? "button" : undefined}
                    tabIndex={project.image ? 0 : undefined}
                    aria-label={
                      project.image
                        ? `Toggle original colors for ${project.title}`
                        : undefined
                    }
                    aria-pressed={
                      project.image
                        ? revealedImage === project.title
                        : undefined
                    }
                    onClick={() => {
                      if (
                        project.image &&
                        window.matchMedia("(max-width: 767px)").matches
                      )
                        setRevealedImage((current) =>
                          current === project.title ? null : project.title,
                        );
                    }}
                    onKeyDown={(event) => {
                      if (
                        project.image &&
                        (event.key === "Enter" || event.key === " ")
                      ) {
                        event.preventDefault();
                        setRevealedImage((current) =>
                          current === project.title ? null : project.title,
                        );
                      }
                    }}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_45%,rgba(255,106,26,.22),transparent_48%),linear-gradient(145deg,#111,#070707)]" />
                    <div className="absolute inset-[12%] rotate-[-2deg] overflow-hidden rounded-2xl border border-white/10 bg-[#0d0d0d] shadow-2xl transition duration-700 group-hover:rotate-0 group-hover:-translate-y-2">
                      <div className="flex h-10 items-center gap-2 border-b border-white/10 px-4">
                        <i className="h-2 w-2 rounded-full bg-[#ff6a1a]" />
                        <i className="h-2 w-2 rounded-full bg-white/15" />
                        <i className="h-2 w-2 rounded-full bg-white/15" />
                      </div>
                      {project.image ? (
                        <div className="relative h-[calc(100%_-_2.5rem)] overflow-hidden">
                          <Image
                            src={project.image}
                            alt={`${project.title} project preview`}
                            fill
                            sizes="(max-width: 1023px) 80vw, 42vw"
                            className="object-cover object-top transition-[filter] duration-700"
                          />
                          <div
                            className={`pointer-events-none absolute inset-0 bg-[#ff6a1a]/35 mix-blend-color transition-opacity duration-700 group-hover/preview:opacity-0 ${revealedImage === project.title ? "opacity-0" : "opacity-100"}`}
                          />
                          <div
                            className={`pointer-events-none absolute inset-0 bg-gradient-to-br from-[#ff8a24]/20 via-[#ff5014]/10 to-black/25 transition-opacity duration-700 group-hover/preview:opacity-0 ${revealedImage === project.title ? "opacity-0" : "opacity-100"}`}
                          />
                        </div>
                      ) : (
                        <div className="grid h-[calc(100%_-_2.5rem)] grid-cols-[.32fr_.68fr] gap-4 p-5">
                          <div className="rounded-xl bg-white/[.035]" />
                          <div className="space-y-4">
                            <div className="h-8 w-2/3 rounded-lg bg-gradient-to-r from-[#ff8a24]/45 to-[#ff5014]/20" />
                            <div className="h-3 w-full rounded bg-white/[.06]" />
                            <div className="h-3 w-4/5 rounded bg-white/[.06]" />
                            <div className="mt-8 h-24 rounded-xl border border-white/[.06] bg-white/[.025]" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div
                    className={`project-copy flex flex-col justify-between gap-7 p-7 sm:p-10 lg:p-12 ${visualFirst ? "lg:order-2" : "lg:order-1"}`}
                  >
                    <div className="flex items-center justify-between font-mono text-xs tracking-[.14em] text-[#ff8a24]">
                      <span>
                        {project.number} /{" "}
                        {project.featured ? "FEATURED CASE STUDY" : "PROJECT"}
                      </span>
                      <span className="text-white/30">{project.year}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2 w-2 ${project.status === "live" ? "animate-pulse rounded-full bg-[#ff6a1a] shadow-[0_0_12px_#ff5014]" : project.status === "prototype" ? "rotate-45 border border-[#ffae6e]" : "rounded-full border border-white/30"}`}
                      />
                      <span className="font-mono text-[10px] tracking-[.18em] text-[#ffae6e]">
                        {statusLabel}
                      </span>
                    </div>
                    <div className="project-identity">
                      <p className="text-xs uppercase tracking-[.18em] text-white/35">
                        {project.category}
                      </p>
                      <h3 className="mt-3 text-4xl font-medium tracking-[-.04em] sm:text-5xl">
                        {project.title}
                      </h3>
                      <p className="mt-5 text-lg leading-8 text-white/60">
                        {project.summary}
                      </p>
                    </div>
                    <div className="project-details mt-8 grid gap-6 border-y border-white/10 py-7 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] uppercase tracking-[.18em] text-[#ff8a24]">
                          The problem
                        </p>
                        <p className="mt-3 text-sm leading-6 text-white/45">
                          {project.problem}
                        </p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase tracking-[.18em] text-[#ff8a24]">
                          The outcome
                        </p>
                        <p className="mt-3 text-sm leading-6 text-white/45">
                          {project.outcome}
                        </p>
                      </div>
                    </div>
                    <div className="project-meta">
                      <p className="text-sm text-white/45">
                        <span className="text-white/75">Role:</span>{" "}
                        {project.role}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-2">
                        {project.technologies.map((tech) => (
                          <span
                            key={tech}
                            className="rounded-full border border-white/10 px-3 py-1.5 text-[10px] uppercase tracking-wider text-white/40"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="project-links flex flex-wrap gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-3 text-sm text-white/70 transition hover:border-[#ff8a24]/50 hover:text-white"
                        >
                          <FaGithub className="h-4 w-4" />
                          View GitHub
                        </a>
                      )}
                      {project.status === "live" && project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff8a24] to-[#ff5014] px-5 py-3 text-sm font-medium text-white"
                        >
                          Visit live project
                          <ArrowUpRight className="h-4 w-4" />
                        </a>
                      )}
                      {project.status === "prototype" &&
                        project.prototypeUrl && (
                          <a
                            href={project.prototypeUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#ff8a24] to-[#ff5014] px-5 py-3 text-sm font-medium text-white"
                          >
                            View prototype
                            <ArrowUpRight className="h-4 w-4" />
                          </a>
                        )}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>

        {/* Sticky stacking only activates when the complete two-column panel can fit. */}
        <style jsx global>{`
          @media (min-width: 1024px) {
            .project-panel {
              position: sticky;
              top: 6.25rem;
              height: calc(100vh - 7.5rem);
              min-height: 0;
              max-height: 720px;
              margin-bottom: 16vh;
            }
            .project-panel:last-of-type {
              margin-bottom: 0;
            }
          }

          @media (min-width: 1024px) and (max-height: 820px) {
            .project-copy {
              padding: clamp(1rem, 2.6vh, 1.75rem) 2rem;
              gap: clamp(0.55rem, 1.8vh, 1.2rem);
            }
            .project-identity h3 {
              margin-top: 0.2rem;
              font-size: clamp(1.8rem, 4.5vh, 2.4rem);
              line-height: 1;
            }
            .project-identity > p:last-child {
              margin-top: clamp(0.4rem, 1vh, 0.75rem);
              font-size: 0.95rem;
              line-height: 1.45;
            }
            .project-details {
              margin-top: 0;
              padding-block: clamp(0.5rem, 1.4vh, 1rem);
              gap: 0.8rem;
            }
            .project-details p {
              margin-top: 0.3rem;
              font-size: 0.75rem;
              line-height: 1.35;
            }
            .project-meta p {
              font-size: 0.75rem;
            }
            .project-meta > div {
              margin-top: clamp(0.4rem, 1vh, 0.7rem);
              gap: 0.3rem;
            }
            .project-meta span {
              padding: 0.25rem 0.55rem;
              font-size: 0.55rem;
            }
            .project-links a {
              padding: 0.55rem 0.9rem;
              font-size: 0.75rem;
            }
            .project-visual > div:nth-child(2) {
              inset: clamp(5%, 1.8vh, 8%);
            }
          }

          /* Mobile uses the same stacked entrance with denser, viewport-safe content. */
          @media (max-width: 767px) {
            .project-panel {
              position: sticky;
              top: 5.25rem;
              height: calc(100svh - 6.25rem);
              min-height: 0;
              grid-template-rows: 28% 72%;
              margin-bottom: 14vh;
              border-radius: 1.5rem;
            }
            .project-visual {
              min-height: 0;
              padding: 0.6rem;
            }
            .project-visual > div:nth-child(2) {
              inset: 5%;
            }
            .project-copy {
              min-height: 0;
              gap: clamp(0.25rem, 0.72vh, 0.45rem);
              padding: clamp(0.6rem, 1.25vh, 0.85rem) 1rem;
            }
            .project-copy > div:first-child,
            .project-copy > div:nth-child(2) {
              font-size: 0.65rem;
            }
            .project-identity > p:first-child {
              font-size: 0.62rem;
            }
            .project-identity h3 {
              margin-top: 0.12rem;
              font-size: clamp(1.55rem, 7vw, 1.85rem);
              line-height: 1;
            }
            .project-identity > p:last-child {
              display: -webkit-box;
              margin-top: 0.28rem;
              overflow: hidden;
              font-size: 0.8rem;
              line-height: 1.4;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 2;
            }
            .project-details {
              grid-template-columns: repeat(2, minmax(0, 1fr));
              gap: 0.7rem;
              margin-top: 0;
              padding-block: 0.4rem;
            }
            .project-details p {
              display: -webkit-box;
              margin-top: 0.2rem;
              overflow: hidden;
              font-size: 0.7rem;
              line-height: 1.35;
              -webkit-box-orient: vertical;
              -webkit-line-clamp: 3;
            }
            .project-meta p {
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              font-size: 0.7rem;
              line-height: 1.3;
            }
            .project-meta > div {
              margin-top: 0.3rem;
              gap: 0.25rem;
            }
            .project-meta span {
              padding: 0.22rem 0.48rem;
              font-size: 0.55rem;
            }
            .project-meta span:nth-child(n + 4) {
              display: none;
            }
            .project-links {
              gap: 0.4rem;
            }
            .project-links a {
              min-height: 2.625rem;
              padding: 0.5rem 0.75rem;
              font-size: 0.7rem;
            }
            .project-panel:last-of-type {
              margin-bottom: 0;
            }
          }

          /* Every tablet keeps the sticky card entrance instead of dropping to plain flow. */
          @media (min-width: 768px) and (max-width: 1180px) {
            .project-panel {
              position: sticky;
              top: 6.25rem;
              height: calc(100svh - 7.5rem);
              min-height: 0;
              margin-bottom: 16vh;
            }
            .project-visual {
              min-height: 0;
              padding: 1rem;
            }
            .project-visual > div:nth-child(2) {
              inset: 5%;
            }
            .project-copy {
              min-height: 0;
              gap: clamp(0.4rem, 1vh, 0.7rem);
              padding: clamp(1rem, 2vh, 1.4rem) 1.5rem;
            }
            .project-copy > div:first-child,
            .project-copy > div:nth-child(2) {
              font-size: 0.7rem;
            }
            .project-identity > p:first-child {
              font-size: 0.68rem;
            }
            .project-identity h3 {
              margin-top: 0.25rem;
              font-size: clamp(2rem, 4.5vw, 2.6rem);
              line-height: 1;
            }
            .project-identity > p:last-child {
              margin-top: 0.5rem;
              font-size: 0.9rem;
              line-height: 1.45;
            }
            .project-details {
              gap: 1rem;
              margin-top: 0;
              padding-block: 0.65rem;
            }
            .project-details p {
              margin-top: 0.3rem;
              font-size: 0.75rem;
              line-height: 1.4;
            }
            .project-meta p {
              font-size: 0.75rem;
              line-height: 1.4;
            }
            .project-meta > div {
              margin-top: 0.5rem;
              gap: 0.35rem;
            }
            .project-meta span {
              padding: 0.3rem 0.6rem;
              font-size: 0.58rem;
            }
            .project-links {
              gap: 0.5rem;
            }
            .project-links a {
              min-height: 2.75rem;
              padding: 0.55rem 0.9rem;
              font-size: 0.75rem;
            }
            .project-panel:last-of-type {
              margin-bottom: 0;
            }
          }

          /* Portrait tablets reserve more of the card for the complete written case study. */
          @media (min-width: 768px) and (max-width: 1023px) {
            .project-panel {
              grid-template-rows: 32% 68%;
            }
          }

          /* Short tablets compress both regions while preserving the stacked entrance. */
          @media (min-width: 768px) and (max-width: 1023px) and (max-height: 699px) {
            .project-panel {
              grid-template-rows: 22% 78%;
            }
            .project-copy {
              gap: 0.25rem;
              padding: 0.55rem 1.1rem;
            }
            .project-copy > div:first-child,
            .project-copy > div:nth-child(2) {
              font-size: 0.6rem;
            }
            .project-identity h3 {
              margin-top: 0.1rem;
              font-size: 1.6rem;
            }
            .project-identity > p:last-child {
              margin-top: 0.2rem;
              font-size: 0.72rem;
              line-height: 1.3;
            }
            .project-details {
              gap: 0.7rem;
              padding-block: 0.3rem;
            }
            .project-details p {
              margin-top: 0.12rem;
              font-size: 0.64rem;
              line-height: 1.25;
            }
            .project-meta p {
              font-size: 0.65rem;
            }
            .project-meta > div {
              margin-top: 0.2rem;
            }
            .project-meta span {
              padding: 0.18rem 0.42rem;
              font-size: 0.5rem;
            }
            .project-links a {
              min-height: 2.25rem;
              padding: 0.35rem 0.7rem;
              font-size: 0.65rem;
            }
          }

          /* iPad landscape remains two-column, but the copy is sized to fit the viewport. */
          @media (min-width: 1024px) and (max-width: 1180px) {
            .project-panel {
              grid-template-rows: minmax(0, 1fr);
            }
            .project-copy {
              gap: clamp(0.3rem, 0.8vh, 0.55rem);
              padding: clamp(0.75rem, 1.7vh, 1.15rem) 1.5rem;
            }
            .project-identity h3 {
              margin-top: 0.15rem;
              font-size: clamp(1.7rem, 3.2vw, 2.15rem);
            }
            .project-identity > p:last-child {
              margin-top: 0.35rem;
              font-size: 0.82rem;
              line-height: 1.35;
            }
            .project-details {
              gap: 0.75rem;
              padding-block: 0.45rem;
            }
            .project-details p {
              margin-top: 0.2rem;
              font-size: 0.68rem;
              line-height: 1.3;
            }
            .project-meta p {
              font-size: 0.68rem;
            }
            .project-meta > div {
              margin-top: 0.3rem;
              gap: 0.25rem;
            }
            .project-meta span {
              padding: 0.22rem 0.48rem;
              font-size: 0.52rem;
            }
            .project-links a {
              min-height: 2.5rem;
              padding: 0.45rem 0.75rem;
              font-size: 0.68rem;
            }
            .project-visual > div:nth-child(2) {
              inset: 5%;
            }
          }

          /* Respect reduced-motion preferences by disabling sticky stacking. */
          @media (prefers-reduced-motion: reduce) {
            .project-panel {
              position: relative;
              top: auto;
              height: auto;
              margin-bottom: 2rem;
            }
          }
        `}</style>
      </section>
      {/* Outside the sticky boundary so this action cannot slide behind the final card. */}
      <div className="relative z-20 flex justify-center bg-[#050505] px-6 pb-16 pt-8 md:pb-20 md:pt-10">
        <Link
          href="/projects"
          className="group inline-flex min-h-12 items-center gap-3 rounded-full border border-[#ff8a24]/35 bg-[#ff6a1a]/[0.06] px-6 py-3 text-sm font-medium text-white transition duration-300 hover:border-[#ff8a24]/70 hover:bg-[#ff6a1a]/[0.12]"
        >
          View all projects
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
        </Link>
      </div>
    </>
  );
};
