import * as React from "react";
import { cn } from "@/lib/utils";
import { siteConfig } from "@/data/site";

interface StatusIndicatorProps {
  className?: string;
  statusText?: string;
}

export function StatusIndicator({ className, statusText = siteConfig.status }: StatusIndicatorProps) {
  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 px-2.5 py-1 rounded border border-border bg-surface-subtle text-xs text-muted font-mono-meta",
        className
      )}
      title="Current developer status"
    >
      <span className="relative flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
      <span className="uppercase text-[10px] tracking-wider text-muted font-semibold">status</span>
      <span className="text-zinc-400 dark:text-zinc-600">/</span>
      <span className="text-foreground/90 truncate">{statusText}</span>
    </div>
  );
}
