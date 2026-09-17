import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, GitFork, Star, FolderGit2 } from "lucide-react";
import { getGithubRepos, computeLanguageStats } from "@/lib/github";

export async function GitHubTelemetryWidget() {
  const repos = await getGithubRepos();
  const topRepos = repos.slice(0, 4);
  const languageStats = computeLanguageStats(repos).slice(0, 4);

  return (
    <section className="py-16">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            <h2 className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
              Live GitHub Telemetry
            </h2>
          </div>
          <Link
            href="/github"
            className="group text-xs font-mono-meta text-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>Full repository dashboard</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <p className="text-[10px] font-mono-meta uppercase tracking-wider text-muted/70">
          {repos[0]?.dataSource === "fallback" ? "Fallback GitHub data" : "Live GitHub data"}
        </p>

        {/* Language Composition Bar */}
        {languageStats.length > 0 && (
          <div className="p-4 rounded-lg border border-border bg-surface-subtle/30 space-y-2.5">
            <div className="flex items-center justify-between text-xs font-mono-meta text-muted">
              <span className="font-semibold text-[11px]">Codebase Composition</span>
              <span className="text-[10px] text-muted/70">based on public repositories</span>
            </div>
            {/* Visual Bar with Animation */}
            <div className="h-2 w-full bg-border/50 rounded-full overflow-hidden flex animate-bar-fill">
              {languageStats.map((stat) => (
                <div
                  key={stat.language}
                  style={{
                    width: `${stat.percentage}%`,
                    backgroundColor: stat.color,
                  }}
                  className="transition-opacity duration-150 hover:opacity-80"
                  title={`${stat.language}: ${stat.percentage}%`}
                />
              ))}
            </div>
            {/* Legend */}
            <div className="flex flex-wrap items-center gap-3 pt-1 text-[11px] font-mono-meta text-muted">
              {languageStats.map((stat) => (
                <div key={stat.language} className="flex items-center gap-1.5 hover:text-foreground transition-colors">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{ backgroundColor: stat.color }}
                  />
                  <span>{stat.language}</span>
                  <span className="text-muted/60">{stat.percentage}%</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 2-Column Grid of Top Repositories */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {topRepos.map((repo) => (
            <a
              key={repo.id}
              href={repo.html_url}
              target="_blank"
              rel="noreferrer"
              className="group p-4 rounded-lg border border-border bg-surface hover:border-zinc-400/80 dark:hover:border-zinc-600 transition-all duration-150 flex flex-col justify-between shadow-xs active:scale-[0.99]"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FolderGit2 className="w-4 h-4 text-muted group-hover:text-emerald-500 transition-colors" />
                    <span className="text-sm font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {repo.name}
                    </span>
                  </div>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted opacity-60 group-hover:opacity-100 transition-all duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
                <p className="text-xs text-muted line-clamp-2 leading-relaxed">
                  {repo.description || "Public repository"}
                </p>
              </div>

              <div className="flex items-center justify-between pt-3 mt-2 border-t border-border/60 text-xs font-mono-meta text-muted">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500" />
                  <span>{repo.language || "Code"}</span>
                </div>
                <div className="flex items-center gap-3">
                  {repo.stargazers_count > 0 && (
                    <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500/20" />
                      <span>{repo.stargazers_count}</span>
                    </span>
                  )}
                  {repo.forks_count > 0 && (
                    <span className="flex items-center gap-1 group-hover:text-foreground transition-colors">
                      <GitFork className="w-3 h-3" />
                      <span>{repo.forks_count}</span>
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
