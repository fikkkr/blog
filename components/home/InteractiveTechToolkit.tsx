"use client";

import * as React from "react";
import Link from "next/link";
import { skills, Skill } from "@/data/skills";
import { projects } from "@/data/projects";
import { Badge } from "@/components/ui/Badge";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function InteractiveTechToolkit() {
  const [selectedSkill, setSelectedSkill] = React.useState<Skill>(skills[0]);

  // Find projects matching selected skill
  const relatedProjects = React.useMemo(() => {
    return projects.filter((p) =>
      p.technologies.some(
        (t) => t.toLowerCase() === selectedSkill.name.toLowerCase()
      )
    );
  }, [selectedSkill]);

  return (
    <section className="py-16 border-b border-border/60">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <h2 className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
              Interactive Toolkit &amp; Tech Matrix
            </h2>
          </div>
          <span className="text-xs font-mono-meta text-muted">click to inspect context</span>
        </div>

        {/* Two-Column Explorer: Left = Interactive Chips, Right = Live Context Card */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
          {/* Left: Technology Pills grouped by Category */}
          <div className="md:col-span-7 space-y-4">
            <p className="text-xs text-muted">
              Select a technology to inspect how and where I actually use it in projects.
            </p>

            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => {
                const isSelected = selectedSkill.name === skill.name;
                const projectCount = projects.filter((p) =>
                  p.technologies.some(
                    (t) => t.toLowerCase() === skill.name.toLowerCase()
                  )
                ).length;

                return (
                  <button
                    key={skill.name}
                    type="button"
                    onClick={() => setSelectedSkill(skill)}
                    className={cn(
                      "group px-3 py-1.5 rounded text-xs font-mono-meta transition-all duration-150 text-left flex items-center gap-2 border active:scale-95",
                      isSelected
                        ? "bg-foreground text-background border-foreground font-semibold shadow-xs"
                        : "bg-surface-subtle hover:bg-surface text-muted hover:text-foreground border-border hover:border-zinc-400 dark:hover:border-zinc-600"
                    )}
                  >
                    <span className="transition-transform group-hover:translate-x-0.5">
                      {skill.name}
                    </span>
                    <span
                      className={cn(
                        "text-[9px] px-1 py-0.2 rounded uppercase transition-colors",
                        isSelected
                          ? "bg-background/20 text-background"
                          : "bg-border text-muted group-hover:text-foreground"
                      )}
                    >
                      {skill.status}
                    </span>
                    {projectCount > 0 && !isSelected && (
                      <span className="text-[9px] text-emerald-600 dark:text-emerald-400 font-mono-meta">
                        • {projectCount}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right: Live Inspector Card with Animated Transition */}
          <div className="md:col-span-5 rounded-lg border border-border bg-surface p-5 space-y-4 hover:border-zinc-400/70 dark:hover:border-zinc-600 transition-colors shadow-xs">
            <div
              key={selectedSkill.name}
              className="animate-fade-in-up space-y-4"
            >
              <div className="flex items-center justify-between pb-3 border-b border-border">
                <div>
                  <h3 className="text-base font-bold text-foreground">
                    {selectedSkill.name}
                  </h3>
                  <span className="text-[11px] font-mono-meta text-muted">
                    Domain: {selectedSkill.category}
                  </span>
                </div>
                <Badge
                  variant={
                    selectedSkill.status === "Used"
                      ? "accent"
                      : selectedSkill.status === "Learning"
                      ? "outline"
                      : "default"
                  }
                >
                  {selectedSkill.status}
                </Badge>
              </div>

              {/* Context Narrative */}
              <div className="space-y-1.5 text-xs text-muted leading-relaxed">
                <span className="font-mono-meta uppercase tracking-wider text-[10px] text-muted/70 font-semibold block">
                  Context &amp; Usage
                </span>
                <p className="text-foreground/90">{selectedSkill.context}</p>
              </div>

              {/* Related Projects */}
              <div className="space-y-2 pt-3 border-t border-border">
                <span className="font-mono-meta uppercase tracking-wider text-[10px] text-muted/70 font-semibold block">
                  Connected Projects ({relatedProjects.length})
                </span>
                {relatedProjects.length === 0 ? (
                  <p className="text-xs text-muted italic">
                    Used primarily in local exploratory scripts &amp; system experiments.
                  </p>
                ) : (
                  <div className="space-y-1.5">
                    {relatedProjects.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/projects/${p.slug}`}
                        className="group flex items-center justify-between p-2 rounded bg-surface-subtle hover:bg-surface text-xs text-foreground transition-all duration-150 border border-border/50 hover:border-border active:scale-[0.99]"
                      >
                        <div className="truncate">
                          <span className="font-medium group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                            {p.title}
                          </span>
                          <span className="text-[10px] text-muted block truncate">
                            {p.tagline}
                          </span>
                        </div>
                        <ArrowRight className="w-3.5 h-3.5 text-muted group-hover:text-foreground shrink-0 ml-2 transition-transform duration-150 group-hover:translate-x-1" />
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
