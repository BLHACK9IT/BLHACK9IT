"use client";

import { useRef } from "react";
import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

// SECTION PURPOSE: pinned desktop and compact mobile versions of one career journey.
// Replace this demonstration content with verified career history before launch.
const experiences = [
  {
    year: "2022 — PRESENT",
    role: "Senior Frontend Engineer",
    company: "TechCorp Inc.",
    story:
      "Turning complex requirements into clear, responsive experiences that help users complete important tasks.",
    result: "Design systems · Accessibility · Product delivery",
  },
  {
    year: "2019 — 2022",
    role: "Web Developer",
    company: "Digital Agency",
    story:
      "Building dependable websites across different audiences, devices, goals, and delivery constraints.",
    result: "Responsive products · Performance · Collaboration",
  },
  {
    year: "2017 — 2019",
    role: "Junior Developer",
    company: "StartUp",
    story:
      "Learning to translate feedback into practical improvements while building a strong engineering foundation.",
    result: "Interface development · APIs · Iteration",
  },
];

type JourneyCardProps = {
  experience: (typeof experiences)[number];
  index: number;
  progress: MotionValue<number>;
};

// Each card enters the shared center stage, pauses, then exits upward.
function JourneyCard({ experience, index, progress }: JourneyCardProps) {
  const start = 0.04 + index * 0.3;
  const side = index % 2 === 0 ? -1 : 1;
  const opacity = useTransform(
    progress,
    [start, start + 0.07, start + 0.2, start + 0.29],
    [0, 1, 1, 0],
  );
  const x = useTransform(
    progress,
    [start, start + 0.08, start + 0.2, start + 0.29],
    [side * 180, 0, 0, side * -35],
  );
  const y = useTransform(
    progress,
    [start, start + 0.08, start + 0.2, start + 0.29],
    [230, 0, 0, -340],
  );
  const scale = useTransform(
    progress,
    [start, start + 0.08, start + 0.2, start + 0.29],
    [0.9, 1, 1, 0.92],
  );
  const branch = useTransform(progress, [start + 0.01, start + 0.08], [0, 1]);
  const isLeft = index % 2 === 0;

  return (
    <motion.article
      style={{ opacity, x, y, scale }}
      className={`absolute top-[49%] w-[38%] -translate-y-1/2 ${isLeft ? "left-[5%] text-right" : "right-[5%]"}`}
    >
      <motion.span
        style={{ scaleX: branch, transformOrigin: isLeft ? "right" : "left" }}
        className={`absolute top-5 h-px w-[26%] bg-gradient-to-r ${isLeft ? "-right-[26%] from-[#ff5014] to-[#ffae6e]" : "-left-[26%] from-[#ffae6e] to-[#ff5014]"}`}
      />
      <span className="font-mono text-xs tracking-[.16em] text-[#ff8a24]">
        {experience.year}
      </span>
      <h3 className="mt-3 text-2xl font-medium tracking-[-.025em] xl:text-3xl">
        {experience.role}
      </h3>
      <p className="mt-1 text-sm text-white/40">{experience.company}</p>
      <p
        className={`mt-4 max-w-md text-sm leading-6 text-white/55 ${isLeft ? "ml-auto" : ""}`}
      >
        {experience.story}
      </p>
      <p className="mt-4 text-xs uppercase leading-5 tracking-[.12em] text-[#ffae6e]/75">
        {experience.result}
      </p>
    </motion.article>
  );
}

export const Experience = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });
  const line = useTransform(scrollYProgress, [0.03, 0.92], [0, 1]);
  const lightPosition = useTransform(
    scrollYProgress,
    [0.03, 0.92],
    ["0%", "100%"],
  );
  const stage = useTransform(scrollYProgress, (value) =>
    String(Math.min(3, Math.floor(value * 3) + 1)).padStart(2, "0"),
  );
  const instructionOpacity = useTransform(scrollYProgress, [0, 0.06], [1, 0]);

  return (
    <section className="bg-[#050505] text-white">
      {/* Desktop supplies scroll distance while this viewport remains pinned. */}
      <div ref={sectionRef} className="relative hidden h-[380vh] md:block">
        <div className="sticky top-0 h-screen overflow-hidden px-10 lg:px-24 xl:px-40">
          <div className="relative mx-auto h-full max-w-7xl">
            <header className="absolute inset-x-0 top-0 z-20 pb-10 before:pointer-events-none before:absolute before:-inset-x-20 before:inset-y-0 before:-z-10 before:bg-gradient-to-b before:from-[#050505] before:via-[#050505]/95 before:to-transparent">
              {/* The marker shares the navigation's top band without touching its centered links. */}
              <div className="flex items-center justify-between pt-8">
                <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em] text-[#ffae6e]">
                  <span className="h-px w-9 bg-[#ff6a1a]" />
                  04 — Experience
                </p>
                <motion.p
                  style={{ opacity: instructionOpacity }}
                  className="text-xs uppercase tracking-[.16em] text-white/35"
                >
                  ↓ Scroll to trace the journey
                </motion.p>
              </div>
              {/* The statement begins below the fixed navigation band. */}
              <h2 className="mt-10 max-w-2xl text-4xl font-semibold leading-[1.05] tracking-[-.04em] lg:text-5xl">
                The work evolved. The{" "}
                <span className="bg-gradient-to-r from-[#ffa032] via-[#ff5014] to-[#ffaa33] bg-clip-text text-transparent">
                  user stayed central.
                </span>
              </h2>
            </header>

            {/* Fixed path; the fill and leading light move as cards travel upward. */}
            <div className="absolute bottom-[9%] left-1/2 top-[29%] w-px bg-white/10">
              <motion.div
                style={{ scaleY: line, transformOrigin: "top" }}
                className="h-full bg-gradient-to-b from-[#ffa032] to-[#ff5014]"
              />
              <motion.i
                style={{ top: lightPosition }}
                className="absolute -left-[5px] block h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-[#ff6a1a] shadow-[0_0_18px_#ff5014]"
              />
            </div>
            {experiences.map((experience, index) => (
              <JourneyCard
                key={experience.year}
                experience={experience}
                index={index}
                progress={scrollYProgress}
              />
            ))}
            <div className="absolute bottom-[4%] left-1/2 -translate-x-1/2 text-center">
              <i className="mx-auto block h-3 w-3 rounded-full bg-[#ff6a1a] shadow-[0_0_18px_#ff5014]" />
              <p className="mt-3 text-[10px] uppercase tracking-[.2em] text-white/35">
                Still learning · Still listening
              </p>
            </div>
            <div className="absolute bottom-[5%] right-0 font-mono text-xs text-white/35">
              JOURNEY{" "}
              <motion.span className="text-[#ff8a24]">{stage}</motion.span> / 03
            </div>
          </div>
        </div>
      </div>

      {/* Mobile keeps normal scrolling and reveals entries without pinning. */}
      <div className="px-6 py-24 sm:px-10 md:hidden">
        <p className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em] text-[#ffae6e]">
          <span className="h-px w-9 bg-[#ff6a1a]" />
          04 — Experience
        </p>
        <h2 className="mt-6 text-4xl font-semibold leading-tight">
          The work evolved. The{" "}
          <span className="text-[#ff6a1a]">user stayed central.</span>
        </h2>
        <div className="relative mt-14 border-l border-white/10 pl-7">
          {experiences.map((experience) => (
            <motion.article
              key={experience.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="relative pb-14"
            >
              <i className="absolute -left-[2.05rem] top-1 h-2.5 w-2.5 rounded-full bg-[#ff6a1a]" />
              <span className="font-mono text-xs text-[#ff8a24]">
                {experience.year}
              </span>
              <h3 className="mt-3 text-2xl">{experience.role}</h3>
              <p className="text-sm text-white/40">{experience.company}</p>
              <p className="mt-4 leading-7 text-white/55">{experience.story}</p>
              <p className="mt-4 text-xs uppercase tracking-[.1em] text-[#ffae6e]">
                {experience.result}
              </p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
