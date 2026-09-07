// app/page.tsx
"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { OrbitalHeroSection } from "@/components/ui/orbital-hero-section";

// SECTION PURPOSE: primary introduction, actions, and responsive ambient artwork.
// Tracks the mobile breakpoint so the canvas can use mobile-specific settings.
function useNarrow(query = "(max-width: 767px)") {
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const sync = () => setNarrow(m.matches);
    sync();
    m.addEventListener("change", sync);
    return () => m.removeEventListener("change", sync);
  }, [query]);
  return narrow;
}

export default function Home() {
  // Shared responsive and accessibility values for the hero effects.
  const narrow = useNarrow();
  const shouldReduceMotion = useReducedMotion();

  return (
    /* First-screen shell; overflow clipping contains the oversized visual layers. */
    <main className="relative min-h-[680px] md:min-h-[760px] lg:h-screen w-full overflow-hidden">
      {/* Starfield, orange glow, scrim, and pointer-tilt background. */}
      <OrbitalHeroSection
        focus={narrow ? [0.5, 0.86] : [0.74, 0.42]}
        scrim={narrow ? "top" : "left"}
        scrimStrength={narrow ? 0.94 : 0.92}
        viewRadius={narrow ? 2.1 : 3.1}
        lead={narrow ? 0.05 : 0.12}
        glow={narrow ? 0.5 : 1}
      >
        {/* Decorative Digital Core with subtle reduced-motion-aware movement. */}
        <motion.div
          className="pointer-events-none absolute inset-x-0 bottom-[-2rem] z-0 mx-auto h-[52%] w-full opacity-55 sm:bottom-[-5rem] sm:h-[68%] md:inset-y-0 md:left-auto md:right-[-7%] md:h-full md:w-[64%] md:opacity-90 lg:right-[-3%] lg:w-[58%] xl:right-[1%] xl:w-[54%]"
          aria-hidden="true"
          animate={
            shouldReduceMotion
              ? undefined
              : {
                  y: [0, -7, 0, 5, 0],
                  rotate: [0, 0.25, 0, -0.2, 0],
                  scale: [1, 1.006, 1, 0.997, 1],
                }
          }
          transition={{
            duration: 16,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        >
          {/* Empty alt text prevents decorative artwork from being announced. */}
          <Image
            src="/human-centered-digital-core-concept.png"
            alt=""
            fill
            priority
            sizes="(max-width: 767px) 100vw, (max-width: 1279px) 64vw, 54vw"
            className="object-contain object-bottom md:object-center"
          />
          {/* Blends the artwork's dark edges into the hero background. */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]/35 md:bg-gradient-to-r md:from-[#050505]/30 md:via-transparent md:to-transparent" />
        </motion.div>

        {/* Content layer; mobile bottom padding reserves space for the artwork. */}
        <div className="relative z-10 flex min-h-[680px] items-start px-6 pb-72 pt-28 sm:px-10 sm:pb-80 sm:pt-32 md:min-h-[760px] md:items-center md:py-28 md:pr-[42%] lg:h-screen lg:px-24 lg:pr-[43%] xl:px-40 xl:pr-[45%]">
          <div className="max-w-[46rem]">
            {/* Compact role label shared with the section-marker styling. */}
            <p className="mb-5 flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] text-[#ffae6e] sm:text-sm">
              <span className="h-px w-9 bg-[#ff6a1a]" aria-hidden="true" />
              User-first software developer
            </p>

            {/* Main value proposition and permanent brand-gradient treatment. */}
            <h1 className="text-[2.8rem] font-extrabold uppercase tracking-[-0.045em] text-white sm:text-6xl lg:text-[5rem] leading-[0.95]">
              I understand it. <br />
              <span className="bg-gradient-to-r from-[#ffa032] via-[#ff5014] to-[#ffaa33] bg-clip-text text-transparent">
                I design it.
              </span>{" "}
              <br />I build it.
            </h1>

            {/* Supporting explanation of the user-first approach. */}
            <p className="mt-6 max-w-xl text-[1.05rem] font-medium leading-relaxed text-white/80 md:mt-8">
              I turn real user needs into accessible, intuitive
              products—combining thoughtful product decisions with reliable
              full-stack engineering.
            </p>

            {/* Primary project CTA and secondary contact CTA. */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <a
                href="#projects"
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-gradient-to-r from-[#ff8a24] to-[#ff5014] px-7 py-3 font-semibold text-white shadow-[0_0_28px_rgba(255,80,20,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_0_36px_rgba(255,80,20,0.35)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8a24]"
              >
                Explore my work
              </a>
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center justify-center rounded-full border border-white/15 bg-white/[0.04] px-7 py-3 font-semibold text-white transition hover:border-[#ff8a24]/60 hover:bg-[#ff8a24]/10 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#ff8a24]"
              >
                Let&apos;s talk
              </a>
            </div>
          </div>
        </div>
      </OrbitalHeroSection>
    </main>
  );
}
