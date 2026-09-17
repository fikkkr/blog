export interface Skill {
  name: string;
  category: "Languages" | "Frontend" | "Backend" | "Data & Tools";
  status: "Used" | "Learning" | "Exploring";
  context: string;
  relatedProjects: string[];
}

export const skills: Skill[] = [
  {
    name: "TypeScript",
    category: "Languages",
    status: "Learning",
    context: "Using it while learning how typed web applications are structured.",
    relatedProjects: ["komunitas", "personal-portfolio"],
  },
  {
    name: "JavaScript",
    category: "Languages",
    status: "Used",
    context: "Used for browser interactions and the small experiments that help me understand web behavior.",
    relatedProjects: ["komunitas", "personal-portfolio", "pesantren-attendance"],
  },
  {
    name: "PHP",
    category: "Languages",
    status: "Learning",
    context: "Learning backend development by building with Laravel.",
    relatedProjects: ["pesantren-attendance"],
  },
  {
    name: "Next.js",
    category: "Frontend",
    status: "Learning",
    context: "Using the App Router to learn how pages, layouts, metadata, and server-rendered content fit together.",
    relatedProjects: ["komunitas", "personal-portfolio"],
  },
  {
    name: "React",
    category: "Frontend",
    status: "Learning",
    context: "Practising component composition and small interactive UI states.",
    relatedProjects: ["komunitas", "personal-portfolio"],
  },
  {
    name: "Tailwind CSS",
    category: "Frontend",
    status: "Used",
    context: "Used to build responsive layouts and keep this site visually consistent.",
    relatedProjects: ["komunitas", "pesantren-attendance", "personal-portfolio"],
  },
  {
    name: "Laravel",
    category: "Backend",
    status: "Learning",
    context: "Learning how a Laravel application handles routes, data, and forms.",
    relatedProjects: ["pesantren-attendance"],
  },
  {
    name: "Git & GitHub",
    category: "Data & Tools",
    status: "Used",
    context: "Keeping track of experiments and projects while learning in public.",
    relatedProjects: ["komunitas", "pesantren-attendance", "personal-portfolio"],
  },
  {
    name: "Figma",
    category: "Data & Tools",
    status: "Exploring",
    context: "Exploring interface ideas before turning them into working pages.",
    relatedProjects: ["personal-portfolio"],
  },
  {
    name: "HTML & CSS",
    category: "Languages",
    status: "Used",
    context: "The foundation I return to when learning how the web is actually rendered.",
    relatedProjects: ["pesantren-attendance"],
  },
];
