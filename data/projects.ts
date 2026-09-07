// Shared schema consumed by both the homepage showcase and complete archive.
export type Project = {
  number: string;
  title: string;
  category: string;
  year: string;
  summary: string;
  problem: string;
  outcome: string;
  role: string;
  technologies: string[];
  image?: string;
  githubUrl?: string;
  status: "live" | "prototype" | "in-development";
  liveUrl?: string;
  prototypeUrl?: string;
  featured?: boolean;
};

// This is the single project source used by both the homepage and /projects.
export const projects: Project[] = [
  {
    number: "01",
    title: "Project Alpha",
    category: "Product platform",
    year: "2026",
    featured: true,
    status: "prototype",
    summary:
      "A clearer product experience designed to help people complete important tasks with less friction.",
    problem:
      "Users needed a simpler way to understand their next action without navigating unnecessary screens.",
    outcome:
      "A focused journey with clearer hierarchy, responsive behavior, and accessible interaction states.",
    role: "End-to-end product design and development",
    technologies: ["Next.js", "TypeScript", "PostgreSQL", "Expo"],
    githubUrl: "https://github.com/BLHACK9IT",
  },
  {
    number: "02",
    title: "Project Beta",
    category: "Web application",
    year: "2025",
    status: "in-development",
    summary:
      "An information-rich interface that turns complicated data into decisions people can understand.",
    problem:
      "Important information existed, but its structure made comparison and decision-making unnecessarily difficult.",
    outcome:
      "Simplified information architecture with fast filtering and clearer visual relationships.",
    role: "Product thinking, interface engineering, and API integration",
    technologies: ["React", "Laravel", "Node.js", "Tailwind CSS"],
    githubUrl: "https://github.com/BLHACK9IT",
  },
  {
    number: "03",
    title: "Project Gamma",
    category: "AI experience",
    year: "2026",
    status: "prototype",
    summary:
      "An AI-assisted workflow that keeps people informed and in control of every generated result.",
    problem:
      "Users needed intelligent assistance without losing visibility into what the system was doing.",
    outcome:
      "Transparent generation states, editable results, and deliberate user confirmation before important actions.",
    role: "AI interaction design and full-stack implementation",
    technologies: ["Next.js", "TypeScript", "AI SDK", "PostgreSQL"],
    githubUrl: "https://github.com/BLHACK9IT",
  },
  {
    number: "04",
    title: "7.Corp",
    category: "AI content studio",
    year: "2026",
    status: "live",
    summary:
      "An autonomous content studio for creating AI videos and publishing them across social platforms.",
    problem:
      "Creating, editing, scheduling, and distributing video content requires too many disconnected tools and repeated manual work.",
    outcome:
      "One focused workflow brings generation, voiceovers, captions, scheduling, and multi-platform publishing together.",
    role: "Product experience and full-stack implementation",
    technologies: ["Next.js", "TypeScript", "AI", "Automation"],
    image: "/7.Corp.png",
    liveUrl: "https://7corp.vercel.app",
  },
  {
    number: "05",
    title: "CarePath",
    category: "Healthcare portal",
    year: "2026",
    status: "prototype",
    summary:
      "A calm patient portal that makes appointments, results, and next steps easier to understand.",
    problem:
      "People were forced to interpret fragmented medical updates across several disconnected screens.",
    outcome:
      "A plain-language timeline groups the information people need around their immediate care journey.",
    role: "UX strategy, accessible interface design, and frontend development",
    technologies: ["Next.js", "TypeScript", "Supabase", "WCAG"],
    githubUrl: "https://github.com/BLHACK9IT",
  },
  {
    number: "06",
    title: "Ledgerly",
    category: "Finance dashboard",
    year: "2025",
    status: "in-development",
    summary:
      "A personal finance workspace that turns everyday transactions into understandable spending patterns.",
    problem:
      "Dense charts and financial language made it difficult for new users to act on their own data.",
    outcome:
      "Progressive disclosure and human explanations make each insight easier to trust and use.",
    role: "Product architecture and full-stack engineering",
    technologies: ["React", "Node.js", "PostgreSQL", "Recharts"],
    githubUrl: "https://github.com/BLHACK9IT",
  },
  {
    number: "07",
    title: "AccessMap",
    category: "Community platform",
    year: "2026",
    status: "prototype",
    summary:
      "A community-led directory for finding places that meet real accessibility needs before leaving home.",
    problem:
      "Generic venue ratings rarely describe entrances, sensory conditions, or usable facilities.",
    outcome:
      "Structured community reports help people decide whether a destination works for them.",
    role: "User research, interaction design, and application development",
    technologies: ["Next.js", "Mapbox", "Prisma", "PostgreSQL"],
    githubUrl: "https://github.com/BLHACK9IT",
  },
  {
    number: "08",
    title: "FocusRoom",
    category: "Team productivity",
    year: "2025",
    status: "prototype",
    summary:
      "A lightweight collaboration room designed around focused work instead of constant interruption.",
    problem:
      "Teams lost important decisions inside noisy, always-on communication channels.",
    outcome:
      "Time-boxed rooms connect decisions, owners, and follow-up actions in one quiet workflow.",
    role: "Product design and realtime frontend engineering",
    technologies: ["React", "TypeScript", "WebSockets", "Node.js"],
    githubUrl: "https://github.com/BLHACK9IT",
  },
];
