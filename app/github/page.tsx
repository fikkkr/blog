import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { getGithubRepos, getGithubUser, computeLanguageStats } from "@/lib/github";
import { GitHubDashboardClient } from "@/components/github/GitHubDashboardClient";
import { siteConfig } from "@/data/site";

export const metadata: Metadata = {
  title: "GitHub Dashboard & Open Source Telemetry",
  description:
    "Explore public repositories, code contributions, and language distribution for Fikri Awalludin.",
};

export default async function GitHubPage() {
  const [user, repos] = await Promise.all([getGithubUser(), getGithubRepos()]);
  const languageStats = computeLanguageStats(repos);

  return (
    <Container size="default" className="py-12 md:py-20 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
            Open Source Telemetry
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          GitHub Repositories
        </h1>
        <p className="text-sm text-muted max-w-xl leading-relaxed">
          A live snapshot of public repositories maintained under{" "}
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            className="text-foreground underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-500"
          >
            @{siteConfig.githubUsername}
          </a>
          . Filter by language or sort by stars.
        </p>
      </div>

      <GitHubDashboardClient
        user={user}
        repos={repos}
        languageStats={languageStats}
      />
    </Container>
  );
}
