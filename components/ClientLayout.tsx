"use client";

import React, { useState, useEffect } from "react";
import MobileNav from "@/components/nav/mobile_nav";
import DesktopNav from "@/components/nav/desktop_nav";
import SocialLinks from "@/components/ui/SocialFluidMenu";
import ResumeControl from "@/components/ui/ResumeControl";
import { usePathname, useRouter } from "next/navigation";

// Persistent shell: coordinates route-aware navigation and floating social controls.
const MenuItems = [
  "About",
  "Services",
  "Skills",
  "Experience",
  "Projects",
  "Contact",
];

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeItem, setActiveItem] = useState<string | null>(null);
  const [hoveredItem, setHoveredItem] = useState<string | null>(null);
  const pathname = usePathname();
  const router = useRouter();

  // Scroll handler function
  const handleSelect = (item: string) => {
    setActiveItem(item);
    const sectionId = item.toLowerCase();
    if (pathname !== "/") {
      router.push(`/#${sectionId}`);
      return;
    }
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  useEffect(() => {
    const sectionIds = MenuItems.map((item) => item.toLowerCase());
    const allIds = ["hero", ...sectionIds];

    const observerCallback: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.id;
          if (id === "hero") {
            setActiveItem(null);
          } else {
            const matchedItem = id.charAt(0).toUpperCase() + id.slice(1);
            setActiveItem(matchedItem);
          }
        }
      });
    };

    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions,
    );

    allIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <div className="hidden md:block">
        <DesktopNav
          activeItem={activeItem}
          hoveredItem={hoveredItem}
          onHover={setHoveredItem}
          onSelect={handleSelect}
        />
      </div>
      <div className="block md:hidden">
        <MobileNav
          activeItem={activeItem}
          hoveredItem={hoveredItem}
          onHover={setHoveredItem}
          onSelect={handleSelect}
        />
      </div>
      <div className="hidden md:block">
        <SocialLinks />
      </div>
      <ResumeControl />
      {children}
    </>
  );
}
