import * as React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "default" | "outline" | "accent" | "status" | "mono";
  size?: "sm" | "md";
}

export function Badge({
  className,
  variant = "default",
  size = "sm",
  children,
  ...props
}: BadgeProps) {
  const base = "inline-flex items-center gap-1.5 font-medium transition-colors select-none";

  const sizeClasses = {
    sm: "text-xs px-2 py-0.5 rounded",
    md: "text-xs px-2.5 py-1 rounded-md",
  };

  const variantClasses = {
    default: "bg-surface-subtle text-muted border border-border/80 hover:text-foreground",
    outline: "border border-border text-muted hover:border-zinc-400 dark:hover:border-zinc-600",
    accent: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20",
    status: "bg-surface-subtle text-foreground border border-border",
    mono: "font-mono-meta text-[11px] bg-surface-subtle text-muted border border-border/70",
  };

  return (
    <span
      className={cn(base, sizeClasses[size], variantClasses[variant], className)}
      {...props}
    >
      {children}
    </span>
  );
}
