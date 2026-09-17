import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, FolderGit2, CheckCircle2 } from "lucide-react";
import { getProjectBySlug } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";

export function FeaturedProjectShowcase() {
  const project = getProjectBySlug("komunitas");
  if (!project) return null;

  return (
    <section className="py-16 border-b border-border/60">
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <h2 className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
              Featured Case Study
            </h2>
          </div>
          <span className="text-xs font-mono-meta text-muted">{project.year}</span>
        </div>

        {/* Editorial Spotlight Card */}
        <div className="group rounded-lg border border-border bg-surface p-6 sm:p-8 space-y-6 hover:border-zinc-400/80 dark:hover:border-zinc-600 transition-all duration-200 shadow-xs">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={`/projects/${project.slug}`}
                className="text-2xl font-bold tracking-tight text-foreground hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
              >
                {project.title}
              </Link>
              <Badge variant="accent">{project.status}</Badge>
              <Badge variant="mono">{project.category}</Badge>
            </div>
            <p className="text-sm font-medium text-muted">{project.tagline}</p>
          </div>

          <p className="text-sm text-muted leading-relaxed max-w-2xl">
            {project.caseStudy.whyBuilt}
          </p>

          {/* Architecture Highlights */}
          <div className="space-y-2 pt-2 border-t border-border/60">
            <p className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
              Key Engineering Decisions
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs text-muted">
              {project.caseStudy.architecture.slice(0, 4).map((item, idx) => (
                <li
                  key={idx}
                  className="flex items-start gap-2.5 bg-surface-subtle/50 hover:bg-surface-subtle hover:border-border p-2.5 rounded border border-border/60 transition-colors duration-150"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                  <span className="leading-snug">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tech Stack & Action Links */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/60">
            <div className="flex flex-wrap items-center gap-1.5">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="text-[11px] font-mono-meta text-muted bg-surface-subtle px-2 py-0.5 rounded border border-border/70 hover:text-foreground transition-colors"
                >
                  {tech}
                </span>
              ))}
            </div>

            <div className="flex items-center gap-3 shrink-0">
              {project.repoUrl && (
                <a
                  href={project.repoUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-mono-meta text-muted hover:text-foreground transition-colors group/link"
                >
                  <FolderGit2 className="w-3.5 h-3.5 transition-transform duration-150 group-hover/link:-translate-y-0.5" />
                  <span>Source</span>
                </a>
              )}
              <Link
                href={`/projects/${project.slug}`}
                className="group/btn inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-surface-subtle hover:bg-surface border border-border text-xs font-medium text-foreground active:scale-[0.98] transition-all duration-150"
              >
                <span>Full Case Study</span>
                <ArrowUpRight className="w-3 h-3 text-muted transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 group-hover/btn:text-foreground" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
