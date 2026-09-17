import { siteConfig } from "@/data/site";

export interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  topics: string[];
  fork: boolean;
  archived: boolean;
  dataSource?: "live" | "fallback";
}

export interface GithubUser {
  login: string;
  name: string;
  avatar_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  following: number;
  html_url: string;
  location: string | null;
  company: string | null;
  dataSource?: "live" | "fallback";
}

export interface LanguageStat {
  language: string;
  count: number;
  percentage: number;
  color: string;
}

const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: "#3178c6",
  JavaScript: "#f7df1e",
  PHP: "#4f5d95",
  Python: "#3572A5",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Shell: "#89e051",
  Lua: "#000080",
  Blade: "#f7523f",
};

function getFallbackUser(username: string): GithubUser {
  return {
    login: username,
    name: "Fikri Awalludin Rahmat",
    avatar_url: `https://github.com/${username}.png`,
    bio: "GitHub data is temporarily unavailable.",
    public_repos: 0,
    followers: 0,
    following: 0,
    html_url: `https://github.com/${username}`,
    location: null,
    company: null,
    dataSource: "fallback",
  };
}

function getFallbackRepos(): GithubRepo[] {
  return [];
}

export async function getGithubUser(): Promise<GithubUser> {
  const username = siteConfig.githubUsername;
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "fik-portfolio-app",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(`https://api.github.com/users/${username}`, {
      headers,
      next: { revalidate: 3600 },
    });

    if (!res.ok) {
      console.warn(`GitHub user fetch returned status ${res.status}, using fallback.`);
      return getFallbackUser(username);
    }

    const data = await res.json();
    return {
      login: data.login || username,
      name: data.name || "Fikri Awalludin Rahmat",
      avatar_url: data.avatar_url || `https://github.com/${username}.png`,
      bio: data.bio || null,
      public_repos: typeof data.public_repos === "number" ? data.public_repos : 0,
      followers: typeof data.followers === "number" ? data.followers : 0,
      following: typeof data.following === "number" ? data.following : 0,
      html_url: data.html_url || `https://github.com/${username}`,
      location: data.location || null,
      company: data.company || null,
      dataSource: "live",
    };
  } catch (error) {
    console.warn("GitHub user fetch failed, using fallback:", error);
    return getFallbackUser(username);
  }
}

export async function getGithubRepos(): Promise<GithubRepo[]> {
  const username = siteConfig.githubUsername;
  try {
    const headers: HeadersInit = {
      Accept: "application/vnd.github.v3+json",
      "User-Agent": "fik-portfolio-app",
    };
    if (process.env.GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
    }

    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=30`,
      {
        headers,
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      console.warn(`GitHub repos fetch returned status ${res.status}, using fallback.`);
      return getFallbackRepos();
    }

    const data = (await res.json()) as Array<{
      id: number;
      name: string;
      full_name: string;
      description: string | null;
      html_url: string;
      stargazers_count?: number;
      forks_count?: number;
      language?: string | null;
      updated_at: string;
      created_at: string;
      topics?: string[];
      fork?: boolean;
      archived?: boolean;
    }>;
    if (!Array.isArray(data)) {
      return getFallbackRepos();
    }

    return data
      .filter((repo) => !repo.fork)
      .map((repo) => ({
        id: repo.id,
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count || 0,
        forks_count: repo.forks_count || 0,
        language: repo.language || null,
        updated_at: repo.updated_at,
        created_at: repo.created_at,
        topics: Array.isArray(repo.topics) ? repo.topics : [],
        fork: Boolean(repo.fork),
        archived: Boolean(repo.archived),
        dataSource: "live",
      }));
  } catch (error) {
    console.warn("GitHub repos fetch failed, using fallback:", error);
    return getFallbackRepos();
  }
}

export function computeLanguageStats(repos: GithubRepo[]): LanguageStat[] {
  const languageCounts: Record<string, number> = {};
  let totalWithLang = 0;

  repos.forEach((repo) => {
    if (repo.language) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
      totalWithLang++;
    }
  });

  if (totalWithLang === 0) return [];

  return Object.entries(languageCounts)
    .map(([language, count]) => ({
      language,
      count,
      percentage: Math.round((count / totalWithLang) * 100),
      color: LANGUAGE_COLORS[language] || "#71717a",
    }))
    .sort((a, b) => b.count - a.count);
}
