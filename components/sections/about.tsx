"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useTransform,
} from "framer-motion";

// SECTION PURPOSE: personal context, portrait interaction, principles, and proof.
// Edit these entries to maintain the three user-first principles on the right.
const principles = [
  {
    number: "01",
    title: "Listen before building",
    description:
      "Understand the person, their context, and the real problem first.",
  },
  {
    number: "02",
    title: "Remove friction",
    description:
      "Make every interaction clear, useful, and easier than the alternative.",
  },
  {
    number: "03",
    title: "Include more people",
    description:
      "Treat accessibility as a product requirement, not a final checklist.",
  },
];

// Edit these values whenever the portfolio statistics change.
const stats = [
  { value: 8, suffix: "+", label: "Projects shipped" },
  { value: 3, suffix: "+", label: "Years building" },
  { value: 12, suffix: "", label: "Core technologies" },
  { value: 1, suffix: "", label: "User-first mission" },
];

// Counts a statistic from zero once when it enters the viewport.
function AnimatedStat({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));

  useEffect(() => {
    if (!isInView) return;
    const controls = animate(count, value, { duration: 1.4, ease: "easeOut" });
    return controls.stop;
  }, [count, isInView, value]);

  return (
    <span ref={ref}>
      <motion.span>{rounded}</motion.span>
      {suffix}
    </span>
  );
}

export const About = () => {
  // Mobile users tap the portrait because touch screens do not have hover.
  const [portraitActive, setPortraitActive] = useState(false);

  return (
    /* Section shell controls spacing, clipping, background, and responsive gutters. */
    <div className="relative overflow-hidden bg-[#050505] px-6 py-24 text-white sm:px-10 md:py-32 lg:px-24 xl:px-40">
      {/* Low-opacity ambient glow behind the portrait side. */}
      <div
        className="pointer-events-none absolute left-[-12rem] top-1/3 h-[28rem] w-[28rem] rounded-full bg-[#ff5014]/[0.06] blur-[120px]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Numbered marker ties the section into the site's navigation language. */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          className="mb-8 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#ffae6e] sm:text-sm"
        >
          <span className="h-px w-9 bg-[#ff6a1a]" aria-hidden="true" />
          01 â€” About me
        </motion.div>

        {/* Large editorial belief statement and brand-color emphasis. */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.65 }}
          className="max-w-5xl text-4xl font-semibold leading-[1.05] tracking-[-0.045em] text-white sm:text-5xl md:text-6xl lg:text-7xl"
        >
          I build software around{" "}
          <span className="bg-gradient-to-r from-[#ffa032] via-[#ff5014] to-[#ffaa33] bg-clip-text text-transparent">
            people
          </span>
          â€”not assumptions.
        </motion.h2>

        {/* Two columns on desktop; portrait then story when stacked on mobile. */}
        <div className="mt-16 grid items-stretch gap-12 md:mt-20 md:grid-cols-[0.82fr_1.18fr] lg:gap-20">
          {/* Left column: portrait treatment and the 2x2 statistics grid. */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7 }}
            className="group/card relative mx-auto flex h-full w-full max-w-md flex-col md:mx-0"
          >
            {/* Outer orange atmosphere around the portrait container. */}
            <div className="absolute -inset-5 rounded-[2.25rem] bg-gradient-to-br from-[#ff8a24]/15 via-transparent to-[#ff5014]/10 blur-2xl" />
            {/* Only the short light trail moves; the portrait frame stays still. */}
            <div
              className="animated-portrait-border pointer-events-none absolute -inset-[2px] aspect-[4/5] rounded-[2.1rem] opacity-80 transition-opacity duration-500 group-hover/card:opacity-100"
              aria-hidden="true"
            />

            {/* Portrait frame and all hover-responsive visual layers. */}
            <button
              type="button"
              aria-label="Toggle portrait color"
              aria-pressed={portraitActive}
              onClick={() => {
                if (window.matchMedia("(max-width: 767px)").matches) {
                  setPortraitActive((active) => !active);
                }
              }}
              className="group relative block aspect-[4/5] w-full cursor-pointer overflow-hidden rounded-[2rem] bg-[#0a0a0a] text-left focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8a24] md:cursor-default"
            >
              {/* Neutral glow at rest; brand-orange glow on hover. */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_38%,rgba(255,255,255,0.12),transparent_42%)] transition-opacity duration-700 group-hover:opacity-0" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_48%_38%,rgba(255,106,26,0.22),transparent_42%)] opacity-0 transition-opacity duration-700 group-hover:opacity-100" />

              {/* Decorative circles sit behind the portrait and recolor on hover. */}
              <div
                className={`absolute inset-[10%] rounded-full border transition-colors duration-700 group-hover:border-[#ff8a24]/30 ${portraitActive ? "border-[#ff8a24]/30" : "border-white/15"}`}
              />
              <div
                className={`absolute inset-[22%] rounded-full border transition-colors duration-700 group-hover:border-[#ff6a1a]/35 ${portraitActive ? "border-[#ff6a1a]/35" : "border-white/20"}`}
              />

              {/* Portrait changes from grayscale to natural color on hover. */}
              <Image
                src="/About me.png"
                alt="Portrait of Daniel Adeyeri"
                fill
                sizes="(max-width: 767px) 100vw, 36vw"
                className="object-cover object-[center_16%] grayscale transition-[filter,transform] duration-700 ease-out group-hover:scale-[1.015] group-hover:grayscale-0"
                style={
                  portraitActive
                    ? { filter: "grayscale(0)", transform: "scale(1.015)" }
                    : undefined
                }
              />

              {/* Subtle surface tint helps the photo blend with the container. */}
              <div className="pointer-events-none absolute inset-0 bg-white/[0.025] transition-colors duration-700 group-hover:bg-[#ff6a1a]/[0.045]" />

              {/* Bottom readability gradient for the location/status labels. */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/70" />

              {/* White light shaft visible at rest. */}
              <div
                className={`pointer-events-none absolute -top-12 left-1/2 h-64 w-[110%] -translate-x-1/2 bg-gradient-to-b from-white/40 via-white/10 to-transparent blur-xl transition-opacity duration-700 group-hover:opacity-0 ${portraitActive ? "opacity-0" : "opacity-80"}`}
                style={{ clipPath: "polygon(32% 0, 68% 0, 100% 100%, 0 100%)" }}
                aria-hidden="true"
              />

              {/* Orange light shaft replaces the white one on hover. */}
              <div
                className={`pointer-events-none absolute -top-12 left-1/2 h-64 w-[110%] -translate-x-1/2 bg-gradient-to-b from-[#ffd7b0]/45 via-[#ff8a24]/15 to-transparent blur-xl transition-opacity duration-700 group-hover:opacity-100 ${portraitActive ? "opacity-100" : "opacity-0"}`}
                style={{ clipPath: "polygon(32% 0, 68% 0, 100% 100%, 0 100%)" }}
                aria-hidden="true"
              />

              {/* Thin top-edge highlight follows the same white-to-orange state. */}
              <div className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/80 to-transparent shadow-[0_0_16px_rgba(255,255,255,0.5)] transition-all duration-700 group-hover:via-[#ffae6e]/90 group-hover:shadow-[0_0_20px_rgba(255,80,20,0.75)]" />

              {/* Location and availability details anchored inside the image. */}
              <div className="absolute inset-x-6 bottom-6 flex items-center justify-between border-t border-white/10 pt-4 text-[0.68rem] uppercase tracking-[0.18em] text-white/45">
                <span>Lagos, Nigeria</span>
                <span className="flex items-center gap-2 text-[#ffae6e]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#ff7a1a] shadow-[0_0_12px_#ff5014]" />
                  Available
                </span>
              </div>
            </button>

            {/* Animated stats align with the bottom of principle 03. */}
            <div className="mt-auto grid grid-cols-2 border-b border-white/10 pt-6">
              {stats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.45, delay: 0.12 + index * 0.08 }}
                  className={`min-w-0 pb-6 ${index % 2 === 0 ? "pr-5" : "border-l border-white/10 pl-5"} ${index > 1 ? "border-t border-white/10 pt-6" : ""}`}
                >
                  <p className="text-3xl font-semibold tracking-[-0.04em] text-white sm:text-4xl">
                    <AnimatedStat value={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="mt-2 text-[0.62rem] font-medium uppercase leading-4 tracking-[0.14em] text-white/40 sm:text-[0.68rem]">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right column: personal narrative followed by development principles. */}
          <div className="flex h-full flex-col">
            {/* Short story explaining the motivation behind the work. */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="max-w-2xl space-y-5 text-base leading-8 text-white/65 sm:text-lg"
            >
              <p>
                I care about the moments where software either helps someone
                move forward or makes them stop and struggle. That is where
                thoughtful engineering matters most.
              </p>
              <p>
                My approach combines product thinking, interface design, and
                full-stack development. I question assumptions early, make
                complexity feel simple, and build experiences that work for real
                people in real situations.
              </p>
            </motion.div>

            {/* Bottom-aligned principles balance the statistics opposite them. */}
            <div className="mt-auto border-t border-white/10 pt-10">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.number}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group grid gap-3 border-b border-white/10 py-6 sm:grid-cols-[3rem_1fr]"
                >
                  <span className="font-mono text-xs text-[#ff8a24]">
                    {principle.number}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-white transition-colors group-hover:text-[#ffae6e]">
                      {principle.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-white/50 sm:text-base">
                      {principle.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Border mask keeps the rotating gradient inside a two-pixel outline. */}
      <style jsx global>{`
        @property --portrait-border-angle {
          syntax: "<angle>";
          initial-value: 0deg;
          inherits: false;
        }

        .animated-portrait-border {
          --portrait-border-angle: 0deg;
          padding: 2px;
          background: conic-gradient(
            from var(--portrait-border-angle),
            transparent 0deg,
            transparent 245deg,
            rgba(255, 174, 110, 0.06) 270deg,
            rgba(255, 138, 36, 0.28) 302deg,
            rgba(255, 106, 26, 0.72) 330deg,
            #ff5014 344deg,
            transparent 360deg
          );
          -webkit-mask:
            linear-gradient(#000 0 0) content-box,
            linear-gradient(#000 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          filter: drop-shadow(0 0 5px rgba(255, 80, 20, 0.4));
          animation: portrait-border-trail 7s linear infinite;
        }

        @keyframes portrait-border-trail {
          to {
            --portrait-border-angle: 360deg;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .animated-portrait-border {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
};
