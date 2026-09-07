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
  /**
   * Project visual source. Use a local public path ("/project.png") or a full
   * hosted URL ("https://images.example.com/project.png").
   *
   * Hosted images must have their domain allowed in next.config.ts before
   * Next.js can optimise and display them.
   */
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
    title: "Timeless Interior Design",
    category: "Product platform",
    year: "2025",
    featured: true,
    status: "prototype",
    summary:
      "Designed and developed a responsive ecommerce website for Timeless Home Design, featuring a modern interface, intuitive product navigation, and an optimized experience across mobile and desktop devices",
    problem:
      "The business needed an online presence that reflected the quality and aesthetic of their Home Interior Decorations, but lacked the technical resources to create one",
    outcome:
      "The website now serves as a scalable online showroom, handling thousands of visitors and supporting future expansion into new product lines and services",
    role: "Product design and full-stack development",
    technologies: ["laravel", "Tailwind"],
    image: "/timeless-interior-design.png",
    githubUrl: "https://github.com/BLHACK9IT/Timeless_Interior_Design.git",
  },
  {
    number: "02",
    title: "BlhackEABot",
    category: "Command Line Application",
    year: "2026",
    status: "prototype",
    summary:
      "A CLI-based EA bot that interacts with ChatGPT to help traders make informed decisions. The bot can analyze market data, provide insights, and execute trades based on user commands.",
    problem:
      "Traders needed a quick and easy way to access market insights and execute trades without having to switch between different platforms.",
    outcome:
      "Traders can now get instant market insights and execute trades directly from the command line and the bot executed the trades base on proven strategies.",

    role: " ",
    technologies: ["Python", "Numpy", "Pandas"],
    image: "/blhack-ea-bot.png",
    githubUrl: "https://github.com/BLHACK9IT/BLHACK_BOT.git",
  },
  {
    number: "03",
    title: "Druppa Api",
    category: "Api development",
    year: "2025",
    status: "prototype",
    summary:
      "Druppa is Pharmacy Api that provides access to real-time stock market data. It is a RESTful API that allows Druppa Application to access real-time stock data and also allows pharmacists to create an account and manage their pharmacy, and also for user's to shop from the app.",
    problem:
      "Druppa is a Pharmacy Application that allows pharmacists to create an account and manage their pharmacy, and also for user's to shop from the app. but it lacks an API that can be used to access real-time stock data from multiple exchanges around the world.",
    outcome:
      "Developed a RESTful API for Druppa Application that provides access to real-time stock market data and allows pharmacists to create an account and manage their pharmacy, and also for user's to shop from the app.",
    role: "API development",
    technologies: ["Laravel", "Php"],
    image: "/druppa-api.png",
    githubUrl: "https://github.com/BLHACK9IT/Druppa-Admin-Api.git",
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
    title: "Druppa App",
    category: "Mobile ",
    year: "2025",
    status: "prototype",
    summary:
      "A pharmacy and grocery shopping application that lets users conveniently purchase everyday essentials and pharmaceutical products in one place. and also allows pharmacists to create an account and manage their pharmacy.",
    problem:
      "Users needed one convenient place to buy everyday groceries and access the prescription products that support their health and wellbeing",
    outcome:
      "Druppa is a comprehensive pharmacy and grocery app that brings convenience, health, and seamless shopping together in one unified platform",
    role: "UX/UI Design and Frontend Development",
    technologies: ["Expo", "Typescript", "React Native"],
    image: "/druppa-app.png",
    githubUrl: "https://github.com/BLHACK9IT",
  },
  // {
  //   number: "06",
  //   title: "Ledgerly",
  //   category: "Finance dashboard",
  //   year: "2025",
  //   status: "in-development",
  //   summary:
  //     "A personal finance workspace that turns everyday transactions into understandable spending patterns.",
  //   problem:
  //     "Dense charts and financial language made it difficult for new users to act on their own data.",
  //   outcome:
  //     "Progressive disclosure and human explanations make each insight easier to trust and use.",
  //   role: "Product architecture and full-stack engineering",
  //   technologies: ["React", "Node.js", "PostgreSQL", "Recharts"],
  //   githubUrl: "https://github.com/BLHACK9IT",
  // },
  // {
  //   number: "07",
  //   title: "AccessMap",
  //   category: "Community platform",
  //   year: "2026",
  //   status: "prototype",
  //   summary:
  //     "A community-led directory for finding places that meet real accessibility needs before leaving home.",
  //   problem:
  //     "Generic venue ratings rarely describe entrances, sensory conditions, or usable facilities.",
  //   outcome:
  //     "Structured community reports help people decide whether a destination works for them.",
  //   role: "User research, interaction design, and application development",
  //   technologies: ["Next.js", "Mapbox", "Prisma", "PostgreSQL"],
  //   githubUrl: "https://github.com/BLHACK9IT",
  // },
  // {
  //   number: "08",
  //   title: "FocusRoom",
  //   category: "Team productivity",
  //   year: "2025",
  //   status: "prototype",
  //   summary:
  //     "A lightweight collaboration room designed around focused work instead of constant interruption.",
  //   problem:
  //     "Teams lost important decisions inside noisy, always-on communication channels.",
  //   outcome:
  //     "Time-boxed rooms connect decisions, owners, and follow-up actions in one quiet workflow.",
  //   role: "Product design and realtime frontend engineering",
  //   technologies: ["React", "TypeScript", "WebSockets", "Node.js"],
  //   githubUrl: "https://github.com/BLHACK9IT",
  // },
];
