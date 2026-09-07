// components/ui/orbital-hero-section.tsx
"use client";

import React, { useRef, useEffect } from "react";

interface OrbitalHeroSectionProps {
  children?: React.ReactNode;
  focus?: [number, number];
  scrim?: "top" | "left" | "right" | "bottom";
  scrimStrength?: number;
  glow?: number;
  viewRadius?: number;
  lead?: number;
}

export const OrbitalHeroSection: React.FC<OrbitalHeroSectionProps> = ({
  children,
  focus = [0.5, 0.5],
  scrim = "top",
  scrimStrength = 0.9,
  glow = 1,
  viewRadius = 3,
  lead = 0.1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const [fx, fy] = focus;

  const scrimGradient =
    scrim === "top"
      ? "bg-gradient-to-b"
      : scrim === "left"
        ? "bg-gradient-to-r"
        : scrim === "right"
          ? "bg-gradient-to-l"
          : "bg-gradient-to-t";

  const stars = React.useMemo(
    () =>
      Array.from({ length: 110 }, (_, index) => {
        // Deterministic values keep server and client output identical.
        const seeded = (offset: number) => {
          const value = Math.sin((index + 1) * (offset + 12.9898)) * 43758.5453;
          return value - Math.floor(value);
        };

        return {
          left: seeded(1) * 100,
          top: seeded(2) * 100,
          size: 0.5 + seeded(3) * 2,
          opacity: 0.15 + seeded(4) * 0.55,
          duration: 2.5 + seeded(5) * 3.5,
          delay: seeded(6) * 3,
        };
      }),
    [],
  );

  // Mouse tilt for background only
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const precisePointer = window.matchMedia(
      "(hover: hover) and (pointer: fine)",
    ).matches;
    if (reduceMotion || !precisePointer) return;

    let targetRotX = 0;
    let targetRotY = 0;
    let currentRotX = 0;
    let currentRotY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      targetRotY = (x - 0.5) * 14;
      targetRotX = (0.5 - y) * 14;
    };

    const handleMouseLeave = () => {
      targetRotX = 0;
      targetRotY = 0;
    };

    let animationFrame = 0;
    const applyTilt = () => {
      currentRotX += (targetRotX - currentRotX) * 0.08;
      currentRotY += (targetRotY - currentRotY) * 0.08;

      const tiltContainer = container.querySelector(
        "#tiltContainer",
      ) as HTMLDivElement;
      if (tiltContainer) {
        tiltContainer.style.transform = `rotateX(${currentRotX}deg) rotateY(${currentRotY}deg)`;
      }

      animationFrame = requestAnimationFrame(applyTilt);
    };

    container.addEventListener("mousemove", handleMouseMove);
    container.addEventListener("mouseleave", handleMouseLeave);
    animationFrame = requestAnimationFrame(applyTilt);

    return () => {
      container.removeEventListener("mousemove", handleMouseMove);
      container.removeEventListener("mouseleave", handleMouseLeave);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full overflow-hidden bg-[#050505]"
      style={{ perspective: "1000px" }}
    >
      {/* Tilt Container: Scaled up to 120% with negative offsets so the edges never show when tilting */}
      <div
        id="tiltContainer"
        className="absolute -inset-[10%] w-[120%] h-[120%] bg-[#050505]"
        style={{ transformStyle: "preserve-3d", willChange: "transform" }}
      >
        {/* Background Glow / Sun */}
        <div
          className="absolute w-[800px] h-[800px] rounded-full blur-[120px] pointer-events-none transition-all duration-700 ease-in-out"
          style={{
            background: `radial-gradient(circle, rgba(255,160,50,${glow * 0.4}) 0%, rgba(255,80,20,${glow * 0.2}) 40%, rgba(0,0,0,0) 70%)`,
            left: `calc(${fx * 100}% - 400px)`,
            top: `calc(${fy * 100}% - 400px)`,
            transform: `scale(${Math.max(0.75, viewRadius / 3)}) translateX(${lead * 40}px)`,
          }}
        />

        {/* Scrim Overlay */}
        <div
          className={`absolute inset-0 pointer-events-none ${scrimGradient} from-black via-black/80 to-transparent transition-all duration-700`}
          style={{ opacity: scrimStrength }}
        />

        {/* Starfield */}
        <div className="absolute inset-0 pointer-events-none">
          {stars.map((star, i) => (
            <div
              key={i}
              className="absolute rounded-full bg-white"
              style={{
                left: `${star.left}%`,
                top: `${star.top}%`,
                width: star.size,
                height: star.size,
                opacity: star.opacity,
                boxShadow: `0 0 ${star.size * 2}px rgba(255,255,255,${star.opacity * 0.5})`,
                animation: `twinkle ${star.duration}s ease-in-out infinite alternate`,
                animationDelay: `${star.delay}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Children Content Layer: Stays completely static and un-tilted on top */}
      <div className="relative z-10 w-full h-full pointer-events-auto">
        {children}
      </div>

      <style jsx>{`
        @keyframes twinkle {
          0% {
            opacity: 0.2;
          }
          100% {
            opacity: 0.9;
          }
        }
        @media (prefers-reduced-motion: reduce) {
          div {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  );
};
