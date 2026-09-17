"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  FolderGit2,
  FileText,
  Sun,
  Moon,
  Home,
  User,
  ExternalLink,
  Code2,
  Sparkles,
  Terminal,
} from "lucide-react";
import { siteConfig } from "@/data/site";
import { projects } from "@/data/projects";

interface CommandItem {
  id: string;
  label: string;
  category: "Navigation" | "Projects" | "Writing" | "Actions" | "System";
  shortcut?: string;
  icon: React.ElementType;
  onSelect: () => void;
  metadata?: string;
}

export function CommandPalette() {
  const [open, setOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [easterEggMessage, setEasterEggMessage] = React.useState<string | null>(null);

  const router = useRouter();
  const { setTheme, resolvedTheme } = useTheme();
  const inputRef = React.useRef<HTMLInputElement>(null);
  const listRef = React.useRef<HTMLDivElement>(null);

  // Toggle with Cmd+K / Ctrl+K
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open]);

  // Focus input on open & lock body scroll
  React.useEffect(() => {
    if (open) {
      setIsMounted(true);
      return;
    }

    const timeout = window.setTimeout(() => setIsMounted(false), 180);
    return () => window.clearTimeout(timeout);
  }, [open]);

  React.useEffect(() => {
    if (open) {
      setQuery("");
      setSelectedIndex(0);
      setEasterEggMessage(null);
      document.body.style.overflow = "hidden";
      setTimeout(() => inputRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  const runCommand = (action: () => void) => {
    setOpen(false);
    action();
  };

  const isDark = resolvedTheme === "dark";

  // Build command list
  const baseItems = React.useMemo<CommandItem[]>(() => [
    // Navigation
    {
      id: "nav-home",
      label: "Go to Home",
      category: "Navigation",
      icon: Home,
      shortcut: "H",
      onSelect: () => router.push("/"),
    },
    {
      id: "nav-about",
      label: "Go to About (Profile & Tech)",
      category: "Navigation",
      icon: User,
      shortcut: "A",
      onSelect: () => router.push("/about"),
    },
    {
      id: "nav-projects",
      label: "Go to Projects Directory",
      category: "Navigation",
      icon: FolderGit2,
      shortcut: "P",
      onSelect: () => router.push("/projects"),
    },
    {
      id: "nav-blog",
      label: "Go to Blog Articles",
      category: "Navigation",
      icon: FileText,
      shortcut: "B",
      onSelect: () => router.push("/blog"),
    },
    {
      id: "nav-github",
      label: "Go to GitHub Telemetry",
      category: "Navigation",
      icon: Code2,
      shortcut: "G",
      onSelect: () => router.push("/github"),
    },
    // Projects
    ...projects.map((p) => ({
      id: `proj-${p.slug}`,
      label: `Project: ${p.title}`,
      category: "Projects" as const,
      metadata: p.technologies.slice(0, 3).join(", "),
      icon: FolderGit2,
      onSelect: () => router.push(`/projects/${p.slug}`),
    })),
    // Writing
    {
      id: "post-hello-world",
      label: "Article: Why I Keep This Digital Home",
      category: "Writing",
      metadata: "Personal, Learning",
      icon: FileText,
      onSelect: () => router.push("/blog/hello-world"),
    },
    {
      id: "post-komunitas-rag",
      label: "Article: Building KOMUNITAS While Learning",
      category: "Writing",
      metadata: "KOMUNITAS, AI, Learning",
      icon: FileText,
      onSelect: () => router.push("/blog/building-komunitas-ai"),
    },
    {
      id: "post-system-arch",
      label: "Article: Learning by Debugging School Projects",
      category: "Writing",
      metadata: "Learning, Debugging, School",
      icon: FileText,
      onSelect: () => router.push("/blog/exploring-system-architecture"),
    },
    // Actions
    {
      id: "action-theme",
      label: isDark ? "Switch to Light Theme" : "Switch to Dark Theme",
      category: "Actions",
      icon: isDark ? Sun : Moon,
      shortcut: "T",
      onSelect: () => setTheme(isDark ? "light" : "dark"),
    },
    {
      id: "action-github-repo",
      label: "View Portfolio Source Code on GitHub",
      category: "Actions",
      icon: ExternalLink,
      onSelect: () => window.open(siteConfig.links.github, "_blank"),
    },
  ], [isDark, router, setTheme]);

  // Filter items
  const filteredItems = React.useMemo(() => {
    const q = query.toLowerCase().trim();
    if (!q) return baseItems;

    // Check easter egg triggers
    if (q === "status" || q === "whoami" || q === "easteregg" || q === "fik") {
      const easterEggItem: CommandItem = {
        id: "sys-easter-egg",
        label: `System Identity: Fikri Awalludin (@fik) — ${siteConfig.status}`,
        category: "System",
        icon: Terminal,
        onSelect: () => {
          setEasterEggMessage("☕ Fun fact: this site was built with zero UI component libraries and zero AI boilerplate!");
        },
      };
      return [easterEggItem];
    }

    return baseItems.filter(
      (item) =>
        item.label.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.metadata?.toLowerCase().includes(q)
    );
  }, [baseItems, query]);

  // Reset selected index when filtered list changes
  React.useEffect(() => {
    setSelectedIndex(0);
  }, [filteredItems]);

  // Keyboard navigation within the list
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % Math.max(1, filteredItems.length));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filteredItems.length) % Math.max(1, filteredItems.length));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const item = filteredItems[selectedIndex];
      if (item) {
        runCommand(item.onSelect);
      }
    }
  };

  // Scroll active item into view
  React.useEffect(() => {
    if (!listRef.current) return;
    const activeEl = listRef.current.querySelector(`[data-index="${selectedIndex}"]`);
    if (activeEl) {
      activeEl.scrollIntoView({ block: "nearest" });
    }
  }, [selectedIndex]);

  return (
    <>
      {!open && (
      <button
        onClick={() => setOpen(true)}
        type="button"
        aria-label="Open command palette"
        className="hidden md:inline-flex items-center gap-2 px-2.5 py-1 text-xs font-mono-meta rounded border border-border bg-surface-subtle hover:bg-surface text-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
      >
        <Search className="w-3.5 h-3.5" />
        <span>Search / Jump</span>
        <kbd className="px-1.5 py-0.5 text-[10px] bg-background border border-border rounded text-muted">
          ⌘K
        </kbd>
      </button>
      )}

      {isMounted && (
    <div
      className={`fixed inset-0 z-50 flex items-start justify-center pt-20 sm:pt-28 px-4 bg-black/60 backdrop-blur-sm transition-opacity duration-180 ${
        open ? "opacity-100" : "pointer-events-none opacity-0"
      }`}
      onClick={() => setOpen(false)}
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
    >
      <div
        className={`relative w-full max-w-lg bg-surface border border-border rounded-lg shadow-2xl overflow-hidden flex flex-col max-h-[80vh] ${
          open ? "command-palette-enter" : "command-palette-exit"
        }`}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleKeyDown}
      >
        {/* Search Input */}
        <div className="flex items-center gap-3 px-4 py-3.5 border-b border-border bg-surface-subtle/50">
          <Search className="w-4 h-4 text-muted shrink-0" />
          <input
            ref={inputRef}
            type="text"
            placeholder="Type a command, page, or project..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full bg-transparent text-foreground placeholder:text-muted focus:outline-none text-sm font-sans"
          />
          {query && (
            <button
              onClick={() => setQuery("")}
              aria-label="Clear input"
              className="text-xs text-muted hover:text-foreground px-1"
            >
              ×
            </button>
          )}
          <kbd className="px-1.5 py-0.5 text-[10px] font-mono-meta bg-surface border border-border rounded text-muted shrink-0">
            ESC
          </kbd>
        </div>

        {/* Easter egg alert */}
        {easterEggMessage && (
          <div className="mx-3 my-2 p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-600 dark:text-emerald-400 font-mono-meta flex items-center gap-2 animate-fade-in-up">
            <Sparkles className="w-4 h-4 shrink-0" />
            <span>{easterEggMessage}</span>
          </div>
        )}

        {/* Command List */}
        <div ref={listRef} className="overflow-y-auto p-2 space-y-0.5">
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-sm text-muted">
              No results found for &ldquo;<span className="text-foreground">{query}</span>&rdquo;
            </div>
          ) : (
            filteredItems.map((item, idx) => {
              const Icon = item.icon;
              const isSelected = idx === selectedIndex;
              return (
                <button
                  key={item.id}
                  data-index={idx}
                  onClick={() => runCommand(item.onSelect)}
                  onMouseEnter={() => setSelectedIndex(idx)}
                  className={`w-full text-left flex items-center justify-between py-2 rounded text-xs transition-all duration-100 ${
                    isSelected
                      ? "bg-surface-subtle text-foreground border border-border shadow-xs pl-3.5 pr-3"
                      : "text-muted hover:text-foreground border border-transparent pl-3 pr-3"
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    <Icon className={`w-4 h-4 shrink-0 transition-colors ${isSelected ? "text-emerald-500" : "text-muted"}`} />
                    <span className="truncate font-medium">{item.label}</span>
                    {item.metadata && (
                      <span className="text-[10px] font-mono-meta text-muted/70 truncate">
                        • {item.metadata}
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-2">
                    <span className="text-[10px] font-mono-meta uppercase tracking-wider text-muted/60">
                      {item.category}
                    </span>
                    {item.shortcut && (
                      <kbd className="px-1.5 py-0.5 text-[10px] font-mono-meta bg-surface border border-border rounded text-muted">
                        {item.shortcut}
                      </kbd>
                    )}
                  </div>
                </button>
              );
            })
          )}
        </div>

        {/* Footer shortcuts helper */}
        <div className="px-4 py-2 border-t border-border bg-surface-subtle/30 flex items-center justify-between text-[11px] font-mono-meta text-muted">
          <div className="flex items-center gap-3">
            <span>↑↓ Navigate</span>
            <span>↵ Select</span>
            <span>Esc Close</span>
          </div>
          <span className="text-[10px] text-muted/70">fik.dev/cmd</span>
        </div>
      </div>
    </div>
      )}
    </>
  );
}
