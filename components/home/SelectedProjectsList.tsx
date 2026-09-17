import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, FolderGit2 } from "lucide-react";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";

export function SelectedProjectsList() {
  return (
    <section className="py-16 border-b border-border/60">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <h2 className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
              Selected Works &amp; Systems
            </h2>
          </div>
          <Link
            href="/projects"
            className="group text-xs font-mono-meta text-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>View all ({projects.length})</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Editorial Project Index Table / List */}
        <div className="divide-y divide-border border-y border-border">
          {projects.map((project) => (
            <div
              key={project.slug}
              className="group py-5 transition-all duration-150 hover:bg-surface-subtle/50 px-2 sm:px-4 rounded flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="space-y-1.5 max-w-xl">
                <div className="flex items-center gap-2.5">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="text-base font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                  >
                    {project.title}
                  </Link>
                  <Badge variant="mono">{project.category}</Badge>
                  <span className="text-[10px] font-mono-meta text-muted">
                    {project.year}
                  </span>
                </div>
                <p className="text-xs text-muted leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap items-center gap-1.5 pt-1">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="text-[11px] font-mono-meta text-muted/80 bg-surface-subtle px-1.5 py-0.5 rounded border border-border/50 transition-colors group-hover:border-border"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="text-[10px] font-mono-meta text-muted/60">
                      +{project.technologies.length - 4}
                    </span>
                  )}
                </div>
              </div>

              {/* Right Action Links */}
              <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
                {project.repoUrl && (
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`Source code for ${project.title}`}
                    className="p-1.5 rounded text-muted hover:text-foreground hover:bg-surface border border-transparent hover:border-border/60 transition-all duration-150"
                    title="View Source"
                  >
                    <FolderGit2 className="w-4 h-4 transition-transform group-hover:-translate-y-0.5" />
                  </a>
                )}
                <Link
                  href={`/projects/${project.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-mono-meta text-muted group-hover:text-foreground transition-colors"
                >
                  <span>Case study</span>
                  <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
