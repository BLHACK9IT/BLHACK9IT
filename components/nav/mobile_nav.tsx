"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  FaInstagram as Instagram,
  FaGithub as Github,
  FaLinkedin as Linkedin,
  FaXTwitter as Twitter,
} from "react-icons/fa6";

interface MobileNavProps {
  activeItem: string | null;
  hoveredItem?: string | null;
  onHover?: (item: string | null) => void;
  onSelect: (item: string) => void;
}

const MenuItems = [
  "About",
  "Services",
  "Skills",
  "Experience",
  "Projects",
  "Contact",
];

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

export default function MobileNav({ activeItem, onSelect }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleItemClick = (item: string) => {
    setIsOpen(false);
    onSelect(item);
  };

  // Prevent background scrolling when menu drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <>
      {/* 1. Backdrop Overlay (Tapping outside closes the drawer) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[90] bg-neutral-950/60 backdrop-blur-sm md:hidden"
          />
        )}
      </AnimatePresence>

      {/* Floating Wrapper for Navbar & Toggle Button */}
      <nav className="fixed top-6 right-6 z-[100] md:hidden">
        {/* 2. Container holding the button so it looks nested inside the UI flow */}
        <div className="relative">
          <button
            onClick={() => setIsOpen(!isOpen)}
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
            className="relative z-[101] flex items-center justify-center rounded-full border border-neutral-800 bg-neutral-950 p-3 text-neutral-400 shadow-2xl backdrop-blur-md transition-colors duration-200 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a24]/70"
          >
            {isOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              </svg>
            )}
          </button>
        </div>

        {/* 3. Slide-in Drawer Menu with Flex Column Structure */}
        <motion.div
          initial={false}
          animate={{ x: isOpen ? "0%" : "100%" }}
          transition={{ type: "spring", stiffness: 320, damping: 34 }}
          className="fixed top-0 right-0 z-[100] flex h-full w-[90vw] flex-col justify-between border-l border-neutral-800 bg-neutral-950/95 px-6 pt-24 pb-8 shadow-2xl backdrop-blur-xl sm:w-80"
          aria-hidden={!isOpen}
        >
          {/* Top Section: Nav Links */}
          <div className="flex flex-col gap-2 overflow-y-auto">
            {MenuItems.map((item, index) => {
              const isActive = activeItem === item;

              return (
                <motion.button
                  key={item}
                  initial={false}
                  animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : 22 }}
                  transition={{
                    duration: 0.28,
                    delay: isOpen ? 0.08 + index * 0.045 : 0,
                  }}
                  onClick={() => handleItemClick(item)}
                  tabIndex={isOpen ? 0 : -1}
                  className="relative w-full cursor-pointer rounded-2xl px-5 py-4 text-left text-base font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a24]/60"
                  style={{
                    border: isActive
                      ? "1px solid #262626"
                      : "1px solid transparent",
                  }}
                >
                  {/* Active State Glow */}
                  {isActive && (
                    <span
                      className="absolute inset-0 rounded-2xl blur-md pointer-events-none z-0"
                      style={{
                        background: `radial-gradient(circle, rgba(255,160,50,0.3) 0%, rgba(255,80,20,0.1) 40%, rgba(0,0,0,0) 70%)`,
                      }}
                    />
                  )}

                  <span
                    className="relative z-10 block transition-colors duration-200"
                    style={{
                      color: isActive ? "#ffffff" : "#a3a3a3",
                    }}
                  >
                    {item}
                  </span>
                </motion.button>
              );
            })}
          </div>

          {/* Bottom Section: Horizontal Social Links */}
          <div className="pt-6 border-t border-neutral-900 mt-auto">
            <div className="flex items-center justify-between gap-2">
              {socialLinks.map((link) => {
                const IconComponent = link.icon;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit my ${link.name}`}
                    className="relative group w-11 h-11 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center text-neutral-400 hover:text-[#ffae6e] hover:border-neutral-700 transition-all duration-200"
                  >
                    <span
                      className="absolute inset-0 rounded-full blur-md pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                      style={{
                        background: `radial-gradient(circle, rgba(255,160,50,0.25) 0%, rgba(255,80,20,0.1) 40%, rgba(0,0,0,0) 70%)`,
                      }}
                    />
                    <IconComponent className="w-4 h-4 relative z-10" />
                  </a>
                );
              })}
            </div>
          </div>
        </motion.div>
      </nav>
    </>
  );
}
