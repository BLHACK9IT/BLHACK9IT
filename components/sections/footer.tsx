"use client";

// Footer closes the portfolio with availability, navigation, social links, and attribution.
import { motion } from "framer-motion";
import Image from "next/image";
import { ArrowUp, ArrowUpRight, MapPin } from "lucide-react";

const navigation = [
  "About",
  "Services",
  "Skills",
  "Experience",
  "Projects",
  "Contact",
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/BLHACK9IT" },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-adeyeri-4a2156401",
  },
  { label: "Instagram", href: "https://www.instagram.com/_blhack9t" },
  { label: "X / Twitter", href: "https://x.com/_blhack9t" },
];

export const Footer = () => {
  const returnToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="relative overflow-hidden border-t border-white/[0.08] bg-[#050505] px-6 pb-8 pt-8 text-white sm:px-10 md:pb-10 lg:px-24 xl:px-40">
      {/* Ambient glow gives the ending depth without competing with the contact section. */}
      <div className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-[#ff5014]/[0.055] blur-[130px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        {/* Closing call-to-action strip. */}
        <motion.a
          href="#contact"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative flex flex-col gap-6 overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#090909] px-6 py-7 sm:flex-row sm:items-center sm:justify-between sm:px-8 md:py-9"
        >
          <span className="pointer-events-none absolute -right-16 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-[#ff5014]/0 blur-[55px] transition duration-500 group-hover:bg-[#ff5014]/15" />
          <span className="relative flex items-center gap-3 font-mono text-[10px] uppercase tracking-[.19em] text-white/45">
            <i className="h-2 w-2 animate-pulse rounded-full bg-[#ff6a1a] shadow-[0_0_14px_#ff5014]" />
            Available for selected projects
          </span>
          <span className="relative flex items-center gap-3 text-2xl font-medium tracking-[-.035em] sm:text-3xl">
            Let&apos;s make it useful
            <ArrowUpRight className="h-5 w-5 text-[#ff8a24] transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
          </span>
        </motion.a>

        {/* Identity, navigation, and external destinations. */}
        <div className="grid gap-12 py-16 md:grid-cols-[1.35fr_.8fr_.8fr] md:gap-10 md:py-20">
          <div className="relative max-w-md">
            {/* The hero artwork returns as a dark watermark behind the identity copy. */}
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[125%] w-[165%] -translate-x-1/2 -translate-y-1/2 overflow-hidden"
              aria-hidden="true"
            >
              <Image
                src="/human-centered-digital-core-concept.png"
                alt=""
                fill
                sizes="(max-width: 767px) 100vw, 440px"
                className="object-contain opacity-[0.09] brightness-[0.55] saturate-[0.75] [transform:scale(1.3,.92)]"
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(5,5,5,.35)_48%,#050505_78%)]" />
            </div>
            <p className="relative font-mono text-[10px] uppercase tracking-[.22em] text-[#ff9a4d]">
              User-first software developer
            </p>
            <p className="relative mt-5 text-3xl font-medium tracking-[-.04em] sm:text-4xl">
              Daniel Adeyeri
            </p>
            <p className="relative mt-5 max-w-sm text-sm leading-7 text-white/45">
              Designing and engineering digital products around clarity,
              accessibility, and the people who use them.
            </p>
            <p className="relative mt-7 flex items-center gap-2 text-xs text-white/35">
              <MapPin className="h-4 w-4 text-[#ff8a24]" />
              Lagos, Nigeria · WAT
            </p>
          </div>

          <nav aria-label="Footer navigation">
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/30">
              Navigate
            </p>
            <ul className="mt-6 grid grid-cols-2 gap-x-6 gap-y-4 md:grid-cols-1">
              {navigation.map((item, index) => (
                <li key={item}>
                  <a
                    href={`/#${item.toLowerCase()}`}
                    className="group inline-flex items-center gap-3 text-sm text-white/50 transition hover:text-white"
                  >
                    <span className="font-mono text-[9px] text-white/20 transition group-hover:text-[#ff8a24]">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <span className="relative pb-1 after:absolute after:bottom-0 after:left-0 after:h-px after:w-0 after:bg-[#ff8a24] after:transition-all after:duration-300 group-hover:after:w-full">
                      {item}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[.2em] text-white/30">
              Elsewhere
            </p>
            <ul className="mt-6 space-y-4">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group inline-flex items-center gap-2 text-sm text-white/50 transition hover:text-white"
                  >
                    {link.label}
                    <ArrowUpRight className="h-3.5 w-3.5 text-white/20 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#ff8a24]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Final utility row and accessible back-to-top action. */}
        <div className="flex flex-col gap-5 border-t border-white/[0.08] pt-7 text-[10px] uppercase tracking-[.16em] text-white/25 sm:flex-row sm:items-center sm:justify-between">
          <p>© 2026 Daniel Adeyeri</p>
          <p className="text-white/35">
            Designed for people · Built with intention
          </p>
          <button
            type="button"
            onClick={returnToTop}
            className="group inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-white/10 px-4 text-white/45 transition hover:border-[#ff8a24]/35 hover:text-white sm:self-auto"
            aria-label="Back to top"
          >
            Back to top
            <ArrowUp className="h-3.5 w-3.5 text-[#ff8a24] transition-transform group-hover:-translate-y-1" />
          </button>
        </div>
      </div>
    </footer>
  );
};
