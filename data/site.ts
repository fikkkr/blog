export const siteConfig = {
  name: "Fikri Awalludin Rahmat",
  shortName: "Awall",
  title: "Awall — Student Developer",
  description:
    "Personal developer space of Fikri Awalludin, a PPLG student learning software development through projects, experiments, and debugging.",
  url: "https://fik.dev",
  ogImage: "/opengraph-image",
  author: "Fikri Awalludin Rahmat",
  location: "Bandung, Indonesia",
  timezone: "Asia/Jakarta",
  status: "learning by building",
  lastDeployNote: "built while learning, breaking, and rebuilding",
  githubUsername: process.env.GITHUB_USERNAME || "fikkkr",
  links: {
    github: "https://github.com/fikkkr",
    twitter: "https://x.com/fikkkr",
    linkedin: "https://linkedin.com/in/fikriawalludin",
  },
  navItems: [
    { label: "Home", href: "/" },
    { label: "About", href: "/about" },
    { label: "Projects", href: "/projects" },
    { label: "Blog", href: "/blog" },
    { label: "GitHub", href: "/github" },
  ],
};

export type SiteConfig = typeof siteConfig;
