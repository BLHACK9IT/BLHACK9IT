"use client";

import { useRef } from "react";
import {
  motion,
  type MotionValue,
  useScroll,
  useTransform,
} from "framer-motion";

// Flexible record shape: add only the fields an experience genuinely needs.
// Optional fields automatically appear in the timeline when supplied.
type ExperienceEntry = {
  id?: string;
  year: string;
  role: string;
  company: string;
  link?: string;
  linkLabel?: string;
  story?: string;
  result?: string;
  location?: string;
  employmentType?: string;
  workMode?: string;
  startDate?: string;
  endDate?: string;
  highlights?: string[];
  technologies?: string[];
  companyLogo?: string;
  featured?: boolean;
  metadata?: Record<string, string>;
};

// SECTION PURPOSE: pinned desktop and compact mobile versions of one career journey.
// Replace this demonstration content with verified career history before launch.
const experiences: ExperienceEntry[] = [
  {
    year: "2026 — PRESENT",
    role: "LEAD DEVELOPER",
    company: "MAVEN AFRICA",
    story:
      "Turning complex requirements into clear, responsive experiences that help users complete important tasks.",
    result: "Design systems · Accessibility · Product delivery",
  },

  {
    year: "2024 — PRESENT",
    role: "Cyber Security Student",
    company: "Lincoln University Malaysia",
    link: "https://www.lincoln.edu.ng/",
    story: "I am building a solid foundation in security principles, network defense, and risk management, preparing to secure digital systems against evolving threats.",
    result: "Security principles · Network defense · Risk management",
  },

  {
    year: "2025 — 2026",
    role: "Intern App Developer",
    company: "IGS",
    link: "https://iglobalsolutions.net",
    story:
      "Developed a frontend prototype with Expo and Tailwind CSS, ensuring a responsive and user-friendly interface.",
    result: "Responsive products · Performance · Collaboration",
  },

  {
    year: "2024 — 2025",
    role: "Student",
    company: "Lincoln College of Science, Management and Technology",
    link: " https://www.lincoln.edu.ng/",
    story:
      "I laid the groundwork for my technical journey, developing problem-solving skills and an understanding of system logic.",
    result: "System logic · Foundational knowledge · Digital understanding",
  },
];

type JourneyCardProps = {
  experience: ExperienceEntry;
  index: number;
  progress: MotionValue<number>;
};

// Optional details stay out of the DOM until a record provides them.
function ExperienceDetails({ experience, alignEnd = false }: { experience: ExperienceEntry; alignEnd?: boolean }) {
  const context = [experience.employmentType, experience.workMode, experience.location].filter(Boolean);

  return (
    <>
      {context.length > 0 && (
        <div className={`mt-4 flex flex-wrap gap-2 text-[9px] uppercase tracking-[.12em] text-white/35 ${alignEnd ? "justify-end" : ""}`}>
          {context.map((item) => <span key={item} className="rounded-full border border-white/10 px-2.5 py-1">{item}</span>)}
        </div>
      )}
      {experience.story && <p className={`mt-4 max-w-md text-sm leading-6 text-white/55 ${alignEnd ? "ml-auto" : ""}`}>{experience.story}</p>}
      {experience.highlights && experience.highlights.length > 0 && (
        <ul className={`mt-4 space-y-1.5 text-xs leading-5 text-white/45 ${alignEnd ? "ml-auto max-w-md" : ""}`}>
          {experience.highlights.map((highlight) => <li key={highlight} className="flex gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#ff8a24]" />{highlight}</li>)}
        </ul>
      )}
      {experience.technologies && experience.technologies.length > 0 && (
        <div className={`mt-4 flex flex-wrap gap-2 ${alignEnd ? "justify-end" : ""}`}>
          {experience.technologies.map((technology) => <span key={technology} className="rounded-full border border-white/10 px-2 py-1 text-[9px] uppercase tracking-[.1em] text-white/40">{technology}</span>)}
        </div>
      )}
      {experience.result && <p className="mt-4 text-xs uppercase leading-5 tracking-[.12em] text-[#ffae6e]/75">{experience.result}</p>}
      {experience.metadata && Object.keys(experience.metadata).length > 0 && (
        <dl className={`mt-4 flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-white/35 ${alignEnd ? "justify-end" : ""}`}>
          {Object.entries(experience.metadata).map(([label, value]) => <div key={label}><dt className="inline uppercase tracking-[.1em] text-white/25">{label}: </dt><dd className="inline">{value}</dd></div>)}
        </dl>
      )}
    </>
  );
}

// Each card enters the shared center stage, pauses, then exits upward.
function JourneyCard({ experience, index, progress }: JourneyCardProps) {
  // Divide the available scroll timeline across the current number of experiences.
  const cardWindow = 0.9 / experiences.length;
  const start = 0.04 + index * cardWindow;
  const enter = start + cardWindow * 0.25;
  const exitStart = start + cardWindow * 0.72;
  const end = start + cardWindow * 0.98;
  const side = index % 2 === 0 ? -1 : 1;
  const opacity = useTransform(
    progress,
    [start, enter, exitStart, end],
    [0, 1, 1, 0],
  );
  const x = useTransform(
    progress,
    [start, enter, exitStart, end],
    [side * 180, 0, 0, side * -35],
  );
  const y = useTransform(
    progress,
    [start, enter, exitStart, end],
    [230, 0, 0, -340],
  );
  const scale = useTransform(
    progress,
    [start, enter, exitStart, end],
    [0.9, 1, 1, 0.92],
  );
  const branch = useTransform(progress, [start + cardWindow * 0.04, enter], [0, 1]);
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
      <p className="mt-1 text-sm text-white/40">
        {experience.link ? (
          <a href={experience.link} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#ffae6e] hover:underline underline-offset-4">
            {experience.company}
          </a>
        ) : (
          experience.company
        )}
      </p>
      <ExperienceDetails experience={experience} alignEnd={isLeft} />
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
    String(Math.min(experiences.length, Math.floor(value * experiences.length) + 1)).padStart(2, "0"),
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
                key={experience.id ?? `${experience.year}-${experience.company}-${experience.role}`}
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
              <motion.span className="text-[#ff8a24]">{stage}</motion.span> / {String(experiences.length).padStart(2, "0")}
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
              key={experience.id ?? `${experience.year}-${experience.company}-${experience.role}`}
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
              <p className="mt-4 text-xs uppercase tracking-[.12em] text-[#ffae6e]/75">
                {experience.link ? (
                  <a href={experience.link} target="_blank" rel="noopener noreferrer" className="transition hover:text-[#ffae6e] hover:underline underline-offset-4">
                    {experience.company}
                  </a>
                ) : (
                  experience.company
                )}
              </p>
              <ExperienceDetails experience={experience} />
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};
