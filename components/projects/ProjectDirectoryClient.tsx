"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowUpRight, FolderGit2, ExternalLink } from "lucide-react";
import { Project } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";

interface ProjectDirectoryClientProps {
  initialProjects: Project[];
}

const CATEGORIES = ["All", "Featured", "Personal", "School", "Experimental"] as const;

export function ProjectDirectoryClient({ initialProjects }: ProjectDirectoryClientProps) {
  const [selectedCategory, setSelectedCategory] = React.useState<string>("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredProjects = React.useMemo(() => {
    return initialProjects.filter((project) => {
      // Category filter
      const matchesCategory =
        selectedCategory === "All" ||
        project.category.toLowerCase() === selectedCategory.toLowerCase() ||
        (selectedCategory === "Featured" && project.featured);

      // Search query filter
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        project.title.toLowerCase().includes(q) ||
        project.tagline.toLowerCase().includes(q) ||
        project.description.toLowerCase().includes(q) ||
        project.technologies.some((t) => t.toLowerCase().includes(q));

      return matchesCategory && matchesSearch;
    });
  }, [initialProjects, selectedCategory, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Controls Bar: Search & Category Pills */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-stretch sm:items-center pb-6 border-b border-border">
        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-1.5">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                className={cn(
                  "px-3 py-1.5 rounded text-xs font-mono-meta transition-all duration-150 active:scale-95",
                  isActive
                    ? "bg-foreground text-background font-semibold shadow-xs"
                    : "bg-surface-subtle hover:bg-surface text-muted hover:text-foreground border border-border"
                )}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-64">
          <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search projects or tech..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-1.5 rounded text-xs font-mono-meta bg-surface-subtle border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-emerald-500 transition-shadow duration-150"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-foreground p-0.5"
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Projects List with Smooth Entrance */}
      {filteredProjects.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-border rounded-lg space-y-2 animate-fade-in-up">
          <p className="text-sm font-medium text-foreground">No projects matched your criteria.</p>
          <p className="text-xs text-muted">Try adjusting your keyword search or category filter.</p>
          <button
            onClick={() => {
              setSelectedCategory("All");
              setSearchQuery("");
            }}
            className="mt-2 text-xs font-mono-meta text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Reset filters
          </button>
        </div>
      ) : (
        <div key={`${selectedCategory}-${searchQuery}`} className="space-y-6">
          {filteredProjects.map((project, idx) => (
            <article
              key={project.slug}
              style={{
                animation: `fadeInUpSubtle 0.28s var(--ease-out-cubic) ${Math.min(idx * 40, 200)}ms backwards`,
              }}
              className="group p-6 rounded-lg border border-border bg-surface hover:border-zinc-400/80 dark:hover:border-zinc-600 transition-all duration-150 space-y-4 shadow-xs"
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <Link
                      href={`/projects/${project.slug}`}
                      className="text-lg font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                    >
                      {project.title}
                    </Link>
                    <Badge variant="accent">{project.status}</Badge>
                    <Badge variant="mono">{project.category}</Badge>
                    <span className="text-xs font-mono-meta text-muted">
                      {project.year}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-medium text-muted">
                    {project.tagline}
                  </p>
                </div>

                {/* Direct Action Links */}
                <div className="flex items-center gap-2 shrink-0">
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded text-muted hover:text-foreground border border-border bg-surface-subtle hover:bg-surface transition-all duration-150 active:scale-95"
                      title="View GitHub Repository"
                      aria-label={`Source repository for ${project.title}`}
                    >
                      <FolderGit2 className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="p-1.5 rounded text-muted hover:text-foreground border border-border bg-surface-subtle hover:bg-surface transition-all duration-150 active:scale-95"
                      title="Visit Live Application"
                      aria-label={`Live demo for ${project.title}`}
                    >
                      <ExternalLink className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                    </a>
                  )}
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-medium bg-surface-subtle hover:bg-surface border border-border text-foreground transition-all duration-150 active:scale-95"
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-muted transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-foreground" />
                  </Link>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {project.description}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-2 border-t border-border/60">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[11px] font-mono-meta text-muted bg-surface-subtle px-2 py-0.5 rounded border border-border/70 hover:text-foreground transition-colors"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
