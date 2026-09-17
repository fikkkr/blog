"use client";

import * as React from "react";
import Image from "next/image";
import {
  Search,
  ArrowUpRight,
  GitFork,
  Star,
  FolderGit2,
  ExternalLink,
  MapPin,
} from "lucide-react";
import { GithubRepo, GithubUser, LanguageStat } from "@/lib/github";
import { formatDate, cn } from "@/lib/utils";

interface GitHubDashboardClientProps {
  user: GithubUser;
  repos: GithubRepo[];
  languageStats: LanguageStat[];
}

export function GitHubDashboardClient({
  user,
  repos,
  languageStats,
}: GitHubDashboardClientProps) {
  const [searchQuery, setSearchQuery] = React.useState("");
  const [selectedLanguage, setSelectedLanguage] = React.useState<string>("All");
  const [sortBy, setSortBy] = React.useState<"updated" | "stars">("updated");

  // Extract unique languages
  const availableLanguages = React.useMemo(() => {
    const langs = new Set<string>();
    repos.forEach((r) => {
      if (r.language) langs.add(r.language);
    });
    return ["All", ...Array.from(langs)];
  }, [repos]);

  // Filter & Sort
  const filteredRepos = React.useMemo(() => {
    return repos
      .filter((repo) => {
        const matchesLang =
          selectedLanguage === "All" || repo.language === selectedLanguage;

        const q = searchQuery.toLowerCase().trim();
        const matchesSearch =
          !q ||
          repo.name.toLowerCase().includes(q) ||
          (repo.description && repo.description.toLowerCase().includes(q)) ||
          repo.topics.some((t) => t.toLowerCase().includes(q));

        return matchesLang && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === "stars") {
          return b.stargazers_count - a.stargazers_count;
        }
        return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      });
  }, [repos, selectedLanguage, searchQuery, sortBy]);

  return (
    <div className="space-y-10">
      {/* Profile Overview Card */}
      <div className="p-6 sm:p-8 rounded-lg border border-border bg-surface flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="flex items-start sm:items-center gap-4">
          <div className="relative w-16 h-16 rounded-full overflow-hidden border border-border shrink-0 bg-surface-subtle">
            <Image
              src={user.avatar_url}
              alt={user.name}
              fill
              className="object-cover"
              sizes="64px"
            />
          </div>
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-foreground">{user.name}</h2>
              <span className="text-xs font-mono-meta text-muted">@{user.login}</span>
            </div>
            <p className="text-xs sm:text-sm text-muted max-w-md leading-relaxed">
              {user.bio || "Student and software developer exploring open source software."}
            </p>
            <p className="text-[10px] font-mono-meta uppercase tracking-wider text-muted/70">
              {user.dataSource === "fallback" ? "Fallback data" : "Live GitHub data"}
            </p>
            {user.location && (
              <div className="flex items-center gap-1.5 text-xs font-mono-meta text-muted pt-1">
                <MapPin className="w-3 h-3 text-emerald-500" />
                <span>{user.location}</span>
              </div>
            )}
          </div>
        </div>

        {/* User Stats & External Link */}
        <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-3 pt-4 sm:pt-0 border-t sm:border-t-0 border-border">
          <div className="flex items-center gap-4 text-xs font-mono-meta text-muted">
            <span title="Public repositories">
              <strong className="text-foreground">{user.public_repos}</strong> repos
            </span>
            <span>•</span>
            <span title="Followers">
              <strong className="text-foreground">{user.followers}</strong> followers
            </span>
          </div>

          <a
            href={user.html_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-mono-meta bg-surface-subtle hover:bg-surface border border-border text-foreground transition-colors"
          >
            <span>GitHub Profile</span>
            <ExternalLink className="w-3 h-3 text-muted" />
          </a>
        </div>
      </div>

      {/* Language Breakdown Bar */}
      {languageStats.length > 0 && (
        <div className="p-5 rounded-lg border border-border bg-surface-subtle/30 space-y-3">
          <div className="flex items-center justify-between text-xs font-mono-meta text-muted">
            <span className="font-semibold uppercase tracking-wider text-[10px]">
              Language Distribution
            </span>
            <span className="text-[10px] text-muted/70">Calculated across active repos</span>
          </div>

          <div className="h-2.5 w-full bg-border/40 rounded-full overflow-hidden flex animate-bar-fill">
            {languageStats.map((stat) => (
              <div
                key={stat.language}
                style={{
                  width: `${stat.percentage}%`,
                  backgroundColor: stat.color,
                }}
                className="transition-opacity duration-150 hover:opacity-80 cursor-pointer"
                onClick={() => setSelectedLanguage(stat.language)}
                title={`${stat.language}: ${stat.percentage}% (click to filter)`}
              />
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1 text-xs font-mono-meta text-muted">
            {languageStats.map((stat) => (
              <button
                key={stat.language}
                onClick={() => setSelectedLanguage(stat.language)}
                className="flex items-center gap-1.5 hover:text-foreground transition-all duration-150 active:scale-95"
              >
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: stat.color }}
                />
                <span className={selectedLanguage === stat.language ? "text-foreground font-semibold" : ""}>
                  {stat.language}
                </span>
                <span className="text-muted/60">{stat.percentage}%</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Controls: Search, Language Filter & Sort Switcher */}
      <div className="space-y-4 pb-2 border-b border-border">
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center">
          {/* Search */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter repositories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 rounded text-xs font-mono-meta bg-surface-subtle border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-shadow duration-150"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                aria-label="Clear filter"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-foreground p-0.5"
              >
                ×
              </button>
            )}
          </div>

          {/* Sort Switcher */}
          <div className="flex items-center gap-1 bg-surface-subtle p-1 rounded border border-border text-xs font-mono-meta">
            <span className="text-muted px-2 text-[11px]">Sort:</span>
            <button
              onClick={() => setSortBy("updated")}
              className={cn(
                "px-2.5 py-0.5 rounded transition-all duration-150 active:scale-95",
                sortBy === "updated"
                  ? "bg-surface text-foreground font-semibold shadow-xs"
                  : "text-muted hover:text-foreground"
              )}
            >
              Recently Updated
            </button>
            <button
              onClick={() => setSortBy("stars")}
              className={cn(
                "px-2.5 py-0.5 rounded transition-all duration-150 active:scale-95",
                sortBy === "stars"
                  ? "bg-surface text-foreground font-semibold shadow-xs"
                  : "text-muted hover:text-foreground"
              )}
            >
              Stars
            </button>
          </div>
        </div>

        {/* Language Filter Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          {availableLanguages.map((lang) => {
            const isActive = selectedLanguage === lang;
            return (
              <button
                key={lang}
                onClick={() => setSelectedLanguage(lang)}
                className={cn(
                  "px-2.5 py-1 rounded text-xs font-mono-meta transition-all duration-150 active:scale-95",
                  isActive
                    ? "bg-foreground text-background font-semibold shadow-xs"
                    : "bg-surface-subtle hover:bg-surface text-muted hover:text-foreground border border-border hover:border-zinc-400 dark:hover:border-zinc-600"
                )}
              >
                {lang}
              </button>
            );
          })}
        </div>
      </div>

      {/* Repositories Grid with Smooth Filter Transitions */}
      {filteredRepos.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-border rounded-lg space-y-2 animate-fade-in-up">
          <p className="text-sm font-medium text-foreground">No repositories found.</p>
          <p className="text-xs text-muted">Try clearing your search query or language filter.</p>
          <button
            onClick={() => {
              setSelectedLanguage("All");
              setSearchQuery("");
            }}
            className="mt-2 text-xs font-mono-meta text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div key={`${selectedLanguage}-${searchQuery}-${sortBy}`} className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredRepos.map((repo, idx) => (
            <div
              key={repo.id}
              style={{
                animation: `fadeInUpSubtle 0.28s var(--ease-out-cubic) ${Math.min(idx * 30, 200)}ms backwards`,
              }}
              className="group p-5 rounded-lg border border-border bg-surface hover:border-zinc-400/80 dark:hover:border-zinc-600 transition-all duration-150 flex flex-col justify-between space-y-4 shadow-xs active:scale-[0.99]"
            >
              <div className="space-y-2">
                <div className="flex items-start justify-between gap-2">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="text-base font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors flex items-center gap-1.5 break-all"
                  >
                    <FolderGit2 className="w-4 h-4 shrink-0 text-muted group-hover:text-emerald-500 transition-colors" />
                    <span>{repo.name}</span>
                  </a>
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-1 rounded text-muted hover:text-foreground shrink-0 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    aria-label={`Open ${repo.name} on GitHub`}
                  >
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </a>
                </div>

                <p className="text-xs text-muted leading-relaxed line-clamp-2">
                  {repo.description || "No description provided."}
                </p>

                {repo.topics.length > 0 && (
                  <div className="flex flex-wrap gap-1 pt-1">
                    {repo.topics.slice(0, 3).map((topic) => (
                      <span
                        key={topic}
                        className="text-[10px] font-mono-meta text-muted/80 bg-surface-subtle px-1.5 py-0.5 rounded border border-border/60 group-hover:border-border transition-colors"
                      >
                        {topic}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* Repo Footer Metadata */}
              <div className="flex items-center justify-between pt-3 border-t border-border/60 text-xs font-mono-meta text-muted">
                <div className="flex items-center gap-2">
                  {repo.language && (
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-500" />
                      <span>{repo.language}</span>
                    </span>
                  )}
                  <span>•</span>
                  <span>Updated {formatDate(repo.updated_at)}</span>
                </div>

                <div className="flex items-center gap-3 shrink-0">
                  <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                    <Star className="w-3.5 h-3.5 text-amber-500 fill-amber-500/20" />
                    <span>{repo.stargazers_count}</span>
                  </span>
                  <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                    <GitFork className="w-3.5 h-3.5" />
                    <span>{repo.forks_count}</span>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
