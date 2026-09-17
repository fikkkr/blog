"use client";

import * as React from "react";
import { HeadingItem } from "@/lib/posts";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: HeadingItem[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "0% 0% -60% 0%",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const el = document.getElementById(heading.id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <nav
      aria-label="Table of contents"
      className="space-y-2 p-4 rounded-lg border border-border bg-surface-subtle/30"
    >
      <div className="flex items-center gap-2 pb-2 border-b border-border text-[11px] font-mono-meta uppercase tracking-wider text-muted font-semibold">
        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
        <span>Table of Contents</span>
      </div>

      <ul className="space-y-1 text-xs font-mono-meta pt-1 border-l border-border/50 pl-2">
        {headings.map((heading) => {
          const isActive = activeId === heading.id;
          return (
            <li
              key={heading.id}
              className={cn(
                "transition-all duration-150 relative",
                heading.level === 3 ? "ml-2.5 text-[11px]" : "ml-0"
              )}
            >
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setActiveId(heading.id);
                  history.pushState(null, "", `#${heading.id}`);
                }}
                className={cn(
                  "block py-1 pl-2 -ml-[9px] rounded-r border-l-2 transition-all duration-150",
                  isActive
                    ? "border-emerald-500 text-emerald-600 dark:text-emerald-400 font-semibold bg-emerald-500/5"
                    : "border-transparent text-muted hover:text-foreground hover:border-zinc-400 dark:hover:border-zinc-600 hover:pl-2.5"
                )}
              >
                {heading.text}
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
