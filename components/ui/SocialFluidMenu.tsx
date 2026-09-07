"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle as Menu, X } from "lucide-react";
import {
  FaInstagram as Instagram,
  FaGithub as Github,
  FaLinkedin as Linkedin,
  FaXTwitter as Twitter,
} from "react-icons/fa6";

// CONFIGURATION: update every floating social destination from this list.
const socialLinks = [
  {
    name: "Instagram",
    href: "https://www.instagram.com/_blhack9t?igsi=MThkYnVjMTlvZWVmYQ==",
    icon: Instagram,
  },
  { name: "GitHub", href: "https://github.com/BLHACK9IT", icon: Github },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/daniel-adeyeri-4a2156401",
    icon: Linkedin,
  },
  { name: "X", href: "https://x.com/_blhack9t", icon: Twitter },
];

export default function FloatingSocialMenu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    // FIXED CONTAINER: Matches your nav's vertical center and sits on the right
    <div className="fixed top-6 right-8 z-[100]">
      {/* MAIN TOGGLE BUTTON */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close social links" : "Open social links"}
        className="group relative z-20 flex h-[52px] w-[52px] cursor-pointer items-center justify-center rounded-full border border-neutral-800 bg-neutral-950/95 shadow-2xl backdrop-blur-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a24]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
      >
        {/* Subtle orange glow on hover (matching your nav's hover state) */}
        <span
          className="absolute inset-0 rounded-full blur-md pointer-events-none z-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
          style={{
            background: `radial-gradient(circle, rgba(255,160,50,0.25) 0%, rgba(255,80,20,0.1) 40%, rgba(0,0,0,0) 70%)`,
          }}
        />

        <div className="relative z-10 w-6 h-6 text-[#a3a3a3] group-hover:text-[#ffae6e] transition-colors duration-200">
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: isOpen ? 0 : 1,
              rotate: isOpen ? -90 : 0,
              scale: isOpen ? 0.5 : 1,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <Menu className="w-[22px] h-[22px]" strokeWidth={2.5} />
          </motion.div>

          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={false}
            animate={{
              opacity: isOpen ? 1 : 0,
              rotate: isOpen ? 0 : 90,
              scale: isOpen ? 1 : 0.5,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <X className="w-[22px] h-[22px]" strokeWidth={2.5} />
          </motion.div>
        </div>
      </button>

      {/* EXPANDING SOCIAL LINKS (DROPPING DOWN) */}
      <AnimatePresence>
        {isOpen && (
          // absolute top-0 aligns the origin point with the main button
          <div className="pointer-events-none absolute top-0 right-0 z-10 h-full w-full before:absolute before:top-12 before:right-1 before:h-[15rem] before:w-11 before:rounded-full before:border before:border-white/[0.06] before:bg-neutral-950/70 before:shadow-2xl before:backdrop-blur-md">
            {socialLinks.map((link, idx) => (
              <motion.a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Visit my ${link.name}`}
                style={{ transformOrigin: "right center" }}
                // Positioned specifically so the icons stack exactly under the main button
                className="absolute top-[4px] right-[4px] flex items-center gap-4 pointer-events-auto focus:outline-none group"

                // ANIMATION LOGIC (Expanding DOWNWARDS)
                initial={{ opacity: 0, y: 0, scale: 0.4 }}
                animate={{
                  opacity: 1,
                  y: 64 + idx * 54, // Positive Y pushes the items DOWN
                  scale: 1,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: idx * 0.05, // Forward stagger on open
                  },
                }}
                exit={{
                  opacity: 0,
                  y: 0,
                  scale: 0.4,
                  transition: {
                    type: "spring",
                    stiffness: 400,
                    damping: 25,
                    delay: (socialLinks.length - 1 - idx) * 0.03, // Reverse stagger on close
                  },
                }}
              >
                {/* Social Label (Placed before icon so it renders on the left side) */}
                <span className="text-[#a3a3a3] font-medium tracking-wide text-sm whitespace-nowrap drop-shadow-md group-hover:text-[#ffae6e] transition-colors bg-neutral-950/80 border border-neutral-800 px-3 py-1.5 rounded-full backdrop-blur-md">
                  {link.name}
                </span>

                {/* Social Icon Circle */}
                <div className="w-[44px] h-[44px] rounded-full bg-neutral-950 border border-neutral-800 flex items-center justify-center text-[#a3a3a3] group-hover:border-neutral-700 group-hover:text-[#ffae6e] transition-all duration-200 shadow-lg relative overflow-hidden group-focus-visible:ring-2 group-focus-visible:ring-[#ffae6e]">
                  <span
                    className="absolute inset-0 rounded-full blur-md pointer-events-none z-0 transition-opacity duration-200 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(circle, rgba(255,160,50,0.2) 0%, rgba(255,80,20,0.1) 40%, rgba(0,0,0,0) 70%)`,
                    }}
                  />
                  <link.icon
                    className="w-[18px] h-[18px] relative z-10"
                    strokeWidth={2.5}
                  />
                </div>
              </motion.a>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
