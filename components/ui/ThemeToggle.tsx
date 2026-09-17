"use client";

import * as React from "react";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle({ className }: { className?: string }) {
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);
  const viewTransitionRef = React.useRef<ReturnType<NonNullable<Document["startViewTransition"]>> | null>(null);
  const themeRef = React.useRef(resolvedTheme);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  React.useEffect(() => {
    themeRef.current = resolvedTheme;
  }, [resolvedTheme]);

  if (!mounted) {
    return (
      <button
        aria-label="Toggle theme"
        className={`p-2 rounded-md border border-border bg-surface-subtle text-muted hover:text-foreground transition-colors ${className}`}
        disabled
      >
        <span className="w-4 h-4 block" />
      </button>
    );
  }

  const isDark = resolvedTheme === "dark";

  const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
    const nextTheme = themeRef.current === "dark" ? "light" : "dark";
    themeRef.current = nextTheme;
    const canUseViewTransition =
      typeof document !== "undefined" &&
      typeof document.startViewTransition === "function" &&
      typeof window !== "undefined" &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (!canUseViewTransition) {
      document.documentElement.classList.add("theme-fallback-transition");
      setTheme(nextTheme);
      window.setTimeout(() => {
        document.documentElement.classList.remove("theme-fallback-transition");
      }, 250);
      return;
    }

    if (viewTransitionRef.current) {
      setTheme(nextTheme);
      return;
    }

    const button = event.currentTarget.getBoundingClientRect();
    document.documentElement.style.setProperty("--theme-x", `${button.left + button.width / 2}px`);
    document.documentElement.style.setProperty("--theme-y", `${button.top + button.height / 2}px`);

    try {
      const transition = document.startViewTransition?.(() => setTheme(nextTheme));
      if (!transition) {
        setTheme(nextTheme);
        return;
      }
      viewTransitionRef.current = transition;
      transition.finished.then(() => {
        viewTransitionRef.current = null;
      }, () => {
        viewTransitionRef.current = null;
      });
    } catch {
      setTheme(nextTheme);
    }
  };

  return (
    <button
      onClick={handleToggle}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
      className={`relative p-2 rounded-md border border-border bg-surface-subtle hover:bg-surface text-muted hover:text-foreground transition-all duration-200 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50 ${className}`}
      title={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      <span className="relative w-4 h-4 block">
        <Sun
          className={`w-4 h-4 text-amber-400 absolute inset-0 transition-all duration-200 ease-out ${
            isDark ? "opacity-100 rotate-0 scale-100" : "opacity-0 rotate-[20deg] scale-50"
          }`}
        />
        <Moon
          className={`w-4 h-4 text-zinc-700 dark:text-zinc-300 absolute inset-0 transition-all duration-200 ease-out ${
            isDark ? "opacity-0 -rotate-[20deg] scale-50" : "opacity-100 rotate-0 scale-100"
          }`}
        />
      </span>
    </button>
  );
}
