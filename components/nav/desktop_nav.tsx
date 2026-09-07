"use client";

// Desktop navigation receives shared active/hover state from ClientLayout.
interface DesktopNavProps {
  activeItem: string | null;
  hoveredItem: string | null;
  onHover: (item: string | null) => void;
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

export default function DesktopNav({
  activeItem,
  hoveredItem,
  onHover,
  onSelect,
}: DesktopNavProps) {
  return (
    <nav
      className="fixed top-6 left-1/2 z-[100]"
      style={{ transform: "translateX(-50%)" }}
    >
      <div className="flex items-center gap-0.5 rounded-full border border-neutral-800 bg-neutral-950/95 px-3 py-2.5 shadow-2xl backdrop-blur-md">
        {MenuItems.map((item) => {
          const isActive = activeItem === item;
          const isHovered = hoveredItem === item;

          return (
            <button
              key={item}
              onClick={() => onSelect(item)}
              onMouseEnter={() => onHover(item)}
              onMouseLeave={() => onHover(null)}
              aria-current={isActive ? "page" : undefined}
              className="relative cursor-pointer select-none rounded-full px-4 py-2.5 text-sm font-medium transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#ff8a24]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#050505]"
              style={{
                border: isActive
                  ? "1px solid #262626"
                  : "1px solid transparent",
              }}
            >
              {isActive && (
                <span
                  className="absolute inset-0 rounded-full blur-md pointer-events-none z-0"
                  style={{
                    background: `radial-gradient(circle, rgba(255,160,50,0.4) 0%, rgba(255,80,20,0.2) 40%, rgba(0,0,0,0) 70%)`,
                  }}
                />
              )}

              {isHovered && !isActive && (
                <span
                  className="absolute inset-0 rounded-full blur-md pointer-events-none z-0 transition-opacity duration-200"
                  style={{
                    background: `radial-gradient(circle, rgba(255,160,50,0.25) 0%, rgba(255,80,20,0.1) 40%, rgba(0,0,0,0) 70%)`,
                  }}
                />
              )}

              <span
                className="relative z-10 block transition-colors duration-200"
                style={{
                  color: isActive
                    ? "#ffffff"
                    : isHovered
                      ? "#ffae6e"
                      : "#a3a3a3",
                }}
              >
                {item}
              </span>
              {isActive && (
                <span className="absolute bottom-1 left-1/2 z-10 h-1 w-1 -translate-x-1/2 rounded-full bg-[#ff8a24] shadow-[0_0_8px_#ff5014]" />
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
}
