"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiVercel,
  SiVitest,
  SiFigma,
  SiPostman,
  SiAnthropic,
  SiGooglegemini,
  SiLangchain,
  SiHuggingface,
} from "react-icons/si";

const skills = [
  [
    "React",
    SiReact,
    "Experience",
    "#61dafb",
    18,
    24,
    "Reusable interfaces built around clear states and predictable user journeys.",
  ],
  [
    "Next.js",
    SiNextdotjs,
    "Experience",
    "#fff",
    40,
    16,
    "Fast full-stack products with thoughtful rendering, routing, and delivery.",
  ],
  [
    "TypeScript",
    SiTypescript,
    "Experience",
    "#3178c6",
    61,
    25,
    "Explicit contracts that make growing products safer to change.",
  ],
  [
    "JavaScript",
    SiJavascript,
    "Experience",
    "#f7df1e",
    80,
    18,
    "The browser foundation behind responsive product interactions.",
  ],
  [
    "Tailwind",
    SiTailwindcss,
    "Experience",
    "#06b6d4",
    29,
    46,
    "Consistent responsive styling within a maintainable visual system.",
  ],
  [
    "Node.js",
    SiNodedotjs,
    "Logic",
    "#5fa04e",
    52,
    43,
    "Maintainable server logic and integrations for complete applications.",
  ],
  [
    "Express",
    SiExpress,
    "Logic",
    "#fff",
    73,
    45,
    "Focused APIs with clear routing, validation, and error handling.",
  ],
  [
    "GraphQL",
    SiGraphql,
    "Logic",
    "#e10098",
    89,
    38,
    "Flexible data contracts that deliver exactly what interfaces need.",
  ],
  [
    "PostgreSQL",
    SiPostgresql,
    "Data",
    "#4169e1",
    16,
    68,
    "Structured relational data for products where consistency matters.",
  ],
  [
    "MongoDB",
    SiMongodb,
    "Data",
    "#47a248",
    38,
    69,
    "Flexible document storage for information that evolves quickly.",
  ],
  [
    "Git",
    SiGit,
    "Delivery",
    "#f05032",
    60,
    66,
    "Traceable changes that make iteration and collaboration safer.",
  ],
  [
    "GitHub",
    SiGithub,
    "Delivery",
    "#fff",
    81,
    64,
    "A shared home for code review, context, and collaboration.",
  ],
  [
    "Vercel",
    SiVercel,
    "Delivery",
    "#fff",
    91,
    78,
    "Fast previews and production delivery with measurable performance.",
  ],
  [
    "Vitest",
    SiVitest,
    "Delivery",
    "#6e9f18",
    70,
    84,
    "Automated checks that protect important user flows.",
  ],
  [
    "Figma",
    SiFigma,
    "Experience",
    "#f24e1e",
    45,
    87,
    "Exploring interface decisions before committing to implementation.",
  ],
  [
    "Postman",
    SiPostman,
    "Delivery",
    "#ff6c37",
    23,
    87,
    "Exploring and validating API behavior before it reaches users.",
  ],
  [
    "Claude",
    SiAnthropic,
    "Intelligence",
    "#d4a27f",
    13,
    49,
    "Designing controllable AI experiences with clear context and thoughtful responses.",
  ],
  [
    "Gemini",
    SiGooglegemini,
    "Intelligence",
    "#8ab4f8",
    88,
    57,
    "Building multimodal product experiences that connect language and visual understanding.",
  ],
  [
    "LangChain",
    SiLangchain,
    "Intelligence",
    "#ffffff",
    52,
    63,
    "Connecting models, retrieval, tools, and application logic into manageable workflows.",
  ],
  [
    "Hugging Face",
    SiHuggingface,
    "Intelligence",
    "#ffd21e",
    72,
    70,
    "Exploring open models and practical machine-learning capabilities for product needs.",
  ],
] as const;
const filters = [
  "Ecosystem",
  "Experience",
  "Logic",
  "Intelligence",
  "Data",
  "Delivery",
];

export const Skills = () => {
  const [filter, setFilter] = useState("Ecosystem");
  const [active, setActive] = useState(0);
  const selected = skills[active];
  const SelectedIcon = selected[1];
  const changeFilter = (next: string) => {
    setFilter(next);
    if (next !== "Ecosystem") {
      const first = skills.findIndex((skill) => skill[2] === next);
      if (first >= 0) setActive(first);
    }
  };
  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white sm:px-10 md:py-32 lg:px-24 xl:px-40">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em] text-[#ffae6e] sm:text-sm"
        >
          <span className="h-px w-9 bg-[#ff6a1a]" />
          03 — Skills & toolkit
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-.045em] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          Different tools. One{" "}
          <span className="bg-gradient-to-r from-[#ffa032] via-[#ff5014] to-[#ffaa33] bg-clip-text text-transparent">
            connected product system.
          </span>
        </motion.h2>
        <div className="mt-10 flex gap-2 overflow-x-auto pb-2">
          {filters.map((x) => (
            <button
              key={x}
              onClick={() => changeFilter(x)}
              aria-pressed={filter === x}
              className={`shrink-0 rounded-full border px-5 py-3 font-mono text-xs uppercase tracking-[.12em] transition focus-visible:outline-2 focus-visible:outline-[#ff8a24] ${filter === x ? "border-[#ff8a24]/50 bg-[#ff6a1a]/10" : "border-white/10 text-white/45"}`}
            >
              {x}
            </button>
          ))}
        </div>
        <div className="mt-6 grid gap-5 lg:grid-cols-[1.4fr_.6fr]">
          <div className="relative h-[600px] overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909] sm:h-[680px]">
            <div className="absolute inset-0 opacity-[.12] [background-image:radial-gradient(rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:26px_26px]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,80,20,.1),transparent_50%)]" />
            {skills.map((s, i) => {
              const Icon = s[1],
                on = i === active,
                relevant = filter === "Ecosystem" || filter === s[2];
              const size = 70 + (i % 4) * 10;
              return (
                <motion.button
                  key={s[0]}
                  onMouseEnter={() => setActive(i)}
                  onFocus={() => setActive(i)}
                  onClick={() => setActive(i)}
                  aria-pressed={on}
                  animate={{
                    opacity: relevant ? 1 : 0.12,
                    scale: on ? 1.22 : relevant ? 1 : 0.82,
                    zIndex: on ? 50 : relevant ? 20 : 0,
                  }}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-[35%_55%_42%_58%] border border-white/10 bg-[#111] shadow-xl hover:border-[#ff8a24]/50 focus-visible:outline-2 focus-visible:outline-[#ff8a24]"
                  style={{
                    left: `${s[4]}%`,
                    top: `${s[5]}%`,
                    width: size,
                    height: size,
                    pointerEvents: relevant ? "auto" : "none",
                  }}
                >
                  <Icon
                    className="h-[36%] w-[36%]"
                    style={{ color: on ? s[3] : "#737373" }}
                  />
                  {on && (
                    <motion.span
                      initial={{ opacity: 0, y: 5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute -top-9 whitespace-nowrap rounded-full border border-[#ff8a24]/30 bg-[#080808] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#ffae6e]"
                    >
                      {s[0]}
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>
          <AnimatePresence mode="wait">
            <motion.aside
              key={selected[0]}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              aria-live="polite"
              className="flex min-h-64 flex-col rounded-[2rem] border border-white/10 bg-white/[.025] p-8"
            >
              <span className="text-xs uppercase tracking-[.2em] text-[#ff8a24]">
                Active tool
              </span>
              <SelectedIcon
                className="mt-10 h-12 w-12"
                style={{ color: selected[3] }}
              />
              <p className="mt-5 text-xs uppercase tracking-wider text-white/35">
                {selected[2]}
              </p>
              <h3 className="mt-2 text-3xl">{selected[0]}</h3>
              <p className="mt-5 leading-7 text-white/50">{selected[6]}</p>
              <p className="mt-auto border-t border-white/10 pt-6 text-sm text-white/35">
                Tools change. The responsibility to build clear, dependable
                experiences does not.
              </p>
            </motion.aside>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};
