"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Layers3, ServerCog, Workflow } from "lucide-react";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiFramer,
  SiNodedotjs,
  SiExpress,
  SiGraphql,
  SiPostgresql,
  SiMongodb,
  SiJsonwebtokens,
  SiVercel,
  SiVitest,
} from "react-icons/si";

// SECTION PURPOSE: capability stories, outcomes, and supporting technology choices.
const capabilities = {
  frontend: {
    label: "Frontend experiences",
    icon: Layers3,
    copy: "I turn product ideas into responsive interfaces that feel clear, fast, and natural to use.",
    outcomes: [
      "Responsive across devices",
      "Accessible by default",
      "Clear interaction states",
    ],
    tech: [
      [
        "React",
        SiReact,
        "#61dafb",
        "Reusable, state-driven interfaces built around predictable user journeys.",
      ],
      [
        "Next.js",
        SiNextdotjs,
        "#ffffff",
        "Fast applications shaped by thoughtful rendering and routing decisions.",
      ],
      [
        "TypeScript",
        SiTypescript,
        "#3178c6",
        "Safer development through explicit, maintainable application contracts.",
      ],
      [
        "JavaScript",
        SiJavascript,
        "#f7df1e",
        "The browser foundation behind responsive product interactions.",
      ],
      [
        "Tailwind CSS",
        SiTailwindcss,
        "#06b6d4",
        "Consistent responsive styling within a clear visual system.",
      ],
      [
        "Framer Motion",
        SiFramer,
        "#e96fff",
        "Purposeful motion that explains state changes and guides attention.",
      ],
    ],
  },
  backend: {
    label: "Backend systems",
    icon: ServerCog,
    copy: "I build the dependable logic, data flows, and integrations that keep an experience working.",
    outcomes: [
      "Reliable application logic",
      "Structured, secure data",
      "Maintainable integrations",
    ],
    tech: [
      [
        "Node.js",
        SiNodedotjs,
        "#5fa04e",
        "Maintainable JavaScript services for product logic and integrations.",
      ],
      [
        "Express",
        SiExpress,
        "#ffffff",
        "Focused APIs with clear routing, validation, and error handling.",
      ],
      [
        "GraphQL",
        SiGraphql,
        "#e10098",
        "Flexible contracts that let interfaces request exactly what they need.",
      ],
      [
        "PostgreSQL",
        SiPostgresql,
        "#4169e1",
        "Reliable relational data for products where consistency matters.",
      ],
      [
        "MongoDB",
        SiMongodb,
        "#47a248",
        "Flexible document storage for product data that evolves quickly.",
      ],
      [
        "JWT",
        SiJsonwebtokens,
        "#d8b4fe",
        "Token-based authentication with security and continuity in mind.",
      ],
    ],
  },
  delivery: {
    label: "Full-stack delivery",
    icon: Workflow,
    copy: "I connect product thinking, interface engineering, backend systems, and delivery into one experience.",
    outcomes: [
      "End-to-end ownership",
      "Performance-conscious builds",
      "Confident releases",
    ],
    tech: [
      [
        "Next.js",
        SiNextdotjs,
        "#ffffff",
        "A unified foundation from interface rendering to server logic.",
      ],
      [
        "TypeScript",
        SiTypescript,
        "#3178c6",
        "Shared types keep interface, server, and product logic aligned.",
      ],
      [
        "PostgreSQL",
        SiPostgresql,
        "#4169e1",
        "Structured data foundations for reliable product behavior.",
      ],
      [
        "Vercel",
        SiVercel,
        "#ffffff",
        "Fast preview and production deployments with measurable performance.",
      ],
      [
        "Vitest",
        SiVitest,
        "#6e9f18",
        "Automated checks that protect important user flows from regressions.",
      ],
      [
        "React",
        SiReact,
        "#61dafb",
        "The interface layer that turns the system into a usable product.",
      ],
    ],
  },
} as const;

type CapabilityKey = keyof typeof capabilities;

export const Services = () => {
  const [active, setActive] = useState<CapabilityKey>("frontend");
  const [selected, setSelected] = useState(0);
  const capability = capabilities[active];
  const technology = capability.tech[selected];

  const changeCapability = (key: CapabilityKey) => {
    setActive(key);
    setSelected(0);
  };

  return (
    <section className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white sm:px-10 md:py-32 lg:px-24 xl:px-40">
      <div className="pointer-events-none absolute inset-0 opacity-[0.12] [background-image:radial-gradient(rgba(255,255,255,.35)_1px,transparent_1px)] [background-size:28px_28px]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[.24em] text-[#ffae6e] sm:text-sm"
        >
          <span className="h-px w-9 bg-[#ff6a1a]" />
          02 — Services & capabilities
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-.045em] sm:text-5xl md:text-6xl lg:text-7xl"
        >
          From interface to infrastructure, I build the{" "}
          <span className="bg-gradient-to-r from-[#ffa032] via-[#ff5014] to-[#ffaa33] bg-clip-text text-transparent">
            complete experience.
          </span>
        </motion.h2>

        <div
          role="tablist"
          aria-label="Development capabilities"
          className="mt-12 flex gap-2 overflow-x-auto pb-2"
        >
          {(Object.keys(capabilities) as CapabilityKey[]).map((key) => {
            const item = capabilities[key];
            const Icon = item.icon;
            const on = active === key;
            return (
              <button
                key={key}
                role="tab"
                aria-selected={on}
                onClick={() => changeCapability(key)}
                className={`flex min-h-12 shrink-0 items-center gap-2 rounded-full border px-5 text-sm transition focus-visible:outline-2 focus-visible:outline-[#ff8a24] ${on ? "border-[#ff8a24]/50 bg-[#ff6a1a]/10" : "border-white/10 bg-white/[.025] text-white/50"}`}
              >
                <Icon className={`h-4 w-4 ${on ? "text-[#ff8a24]" : ""}`} />
                {key === "delivery"
                  ? "Full-stack"
                  : key[0].toUpperCase() + key.slice(1)}
              </button>
            );
          })}
        </div>

        <div className="mt-6 grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#090909]/90 lg:grid-cols-[.82fr_1.18fr]">
          <div className="border-b border-white/10 p-7 sm:p-10 lg:border-b-0 lg:border-r">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
              >
                <span className="font-mono text-xs text-[#ff8a24]">
                  SELECTED CAPABILITY
                </span>
                <h3 className="mt-5 text-3xl font-medium sm:text-4xl">
                  {capability.label}
                </h3>
                <p className="mt-5 max-w-lg leading-7 text-white/55">
                  {capability.copy}
                </p>
                <div className="mt-9 border-t border-white/10">
                  {capability.outcomes.map((outcome, index) => (
                    <div
                      key={outcome}
                      className="flex gap-4 border-b border-white/10 py-4 text-white/75"
                    >
                      <span className="font-mono text-xs text-[#ff8a24]">
                        0{index + 1}
                      </span>
                      {outcome}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="relative p-7 sm:p-10">
            <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,106,26,.08),transparent_44%)]" />
            <p className="relative text-xs font-semibold uppercase tracking-[.2em] text-white/35">
              Explore the stack
            </p>
            <div className="relative mt-7 grid grid-cols-2 gap-3 sm:grid-cols-3">
              {capability.tech.map((item, index) => {
                const Icon = item[1];
                const on = selected === index;
                return (
                  <button
                    key={item[0]}
                    onMouseEnter={() => setSelected(index)}
                    onFocus={() => setSelected(index)}
                    onClick={() => setSelected(index)}
                    aria-pressed={on}
                    className={`group flex min-h-28 flex-col items-center justify-center gap-3 rounded-2xl border bg-[#0d0d0d] p-4 transition focus-visible:outline-2 focus-visible:outline-[#ff8a24] ${on ? "border-[#ff8a24]/45 shadow-[0_0_30px_rgba(255,80,20,.09)]" : "border-white/[.07] hover:border-white/20"}`}
                  >
                    <Icon
                      className="h-7 w-7 transition group-hover:-translate-y-0.5"
                      style={{ color: on ? item[2] : "#777" }}
                    />
                    <span
                      className={
                        on ? "text-xs text-white" : "text-xs text-white/45"
                      }
                    >
                      {item[0]}
                    </span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={`${active}-${selected}`}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                aria-live="polite"
                className="relative mt-5 min-h-28 rounded-2xl border border-white/[.07] bg-white/[.025] p-5"
              >
                <p className="font-medium text-[#ffae6e]">{technology[0]}</p>
                <p className="mt-2 text-sm leading-6 text-white/50">
                  {technology[3]}
                </p>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
