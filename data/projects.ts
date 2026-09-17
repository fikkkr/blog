export interface Project {
  slug: string;
  title: string;
  tagline: string;
  description: string;
  category: "Featured" | "Personal" | "School" | "Experimental";
  status: "Active" | "Completed" | "WIP";
  year: string;
  technologies: string[];
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
  caseStudy: {
    whatIsIt: string;
    whyBuilt: string;
    architecture: string[];
    keyFeatures: string[];
    challenges: string[];
    lessonsLearned: string[];
  };
}

export const projects: Project[] = [
  {
    slug: "komunitas",
    title: "KOMUNITAS",
    tagline: "An AI-related project built for LKS Nasional 2026",
    description:
      "A project exploring how AI can be used to make information easier to work with, built as part of LKS Nasional 2026.",
    category: "Featured",
    status: "WIP",
    year: "2026",
    technologies: ["Bun", "Hono", "TypeScript", "Supabase"],
    featured: true,
    repoUrl: "https://github.com/fikkkr/komunitas",
    caseStudy: {
      whatIsIt:
        "KOMUNITAS is an AI-related project developed as part of LKS Nasional 2026.",
      whyBuilt:
        "I wanted to explore how software and AI could be combined to solve a useful information problem while learning through a real competition project.",
      architecture: [
        "The backend context uses Bun, Hono, TypeScript, and Supabase.",
        "The rest of the implementation is still being learned and documented through the project.",
      ],
      keyFeatures: [
        "AI-related functionality.",
        "A project workflow shaped by LKS Nasional 2026.",
      ],
      challenges: [],
      lessonsLearned: [
        "I am learning to understand the code and tools behind an AI feature instead of treating AI as a black box.",
      ],
    },
  },
  {
    slug: "pesantren-attendance",
    title: "Pesantren Attendance System",
    tagline: "A Laravel application for teacher attendance",
    description:
      "An application intended to let teachers record attendance digitally instead of using paper-based attendance.",
    category: "School",
    status: "WIP",
    year: "Unknown",
    technologies: ["Laravel", "PHP"],
    featured: true,
    repoUrl: "https://github.com/fikkkr/pesantren-attendance",
    caseStudy: {
      whatIsIt:
        "A Laravel-based teacher attendance application for a pesantren environment.",
      whyBuilt:
        "The goal was to replace paper-based teacher attendance with a more practical application.",
      architecture: [
        "The project is built with Laravel and PHP.",
      ],
      keyFeatures: [
        "Digital teacher attendance recording.",
      ],
      challenges: [],
      lessonsLearned: [
        "I learned more about turning a paper-based process into a software workflow.",
      ],
    },
  },
  {
    slug: "personal-portfolio",
    title: "Personal Developer Space",
    tagline: "A digital home for projects, writing, and experiments",
    description:
      "This personal developer website documents projects, writing, experiments, and GitHub activity while I learn.",
    category: "Personal",
    status: "Active",
    year: "2026",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "MDX", "GitHub API"],
    featured: true,
    repoUrl: "https://github.com/fikkkr/fik.dev",
    liveUrl: "https://fik.dev",
    caseStudy: {
      whatIsIt:
        "A personal developer website and digital home for documenting projects, writing, experiments, and GitHub activity.",
      whyBuilt:
        "I wanted one place to collect what I am learning and make the process visible without pretending to be an experienced professional engineer.",
      architecture: [
        "The site uses Next.js App Router, TypeScript, Tailwind CSS, local MDX content, and GitHub API data.",
      ],
      keyFeatures: [
        "Project and blog pages.",
        "A command palette, project filters, theme switching, and GitHub activity display.",
      ],
      challenges: [],
      lessonsLearned: [
        "A portfolio can be useful as a learning journal, not only as a collection of finished work.",
      ],
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getFeaturedProjects(): Project[] {
  return projects.filter((p) => p.featured);
}
