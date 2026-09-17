"use client";

import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, GitBranch, MapPin, Check, Copy } from "lucide-react";
import { siteConfig } from "@/data/site";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { cn } from "@/lib/utils";

type TerminalTab = "focus" | "status" | "git";

export function HeroSection() {
  const [activeTab, setActiveTab] = React.useState<TerminalTab>("focus");
  const [copied, setCopied] = React.useState(false);
  const terminalRef = React.useRef<HTMLDivElement>(null);

  const handleTerminalPointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch" || !terminalRef.current) return;
    const bounds = terminalRef.current.getBoundingClientRect();
    const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 4;
    const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 4;
    terminalRef.current.style.setProperty("--terminal-x", `${x.toFixed(2)}px`);
    terminalRef.current.style.setProperty("--terminal-y", `${y.toFixed(2)}px`);
  };

  const resetTerminalPointer = () => {
    terminalRef.current?.style.setProperty("--terminal-x", "0px");
    terminalRef.current?.style.setProperty("--terminal-y", "0px");
  };

  const handleCopyCommand = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 1600);
  };

  const getCommandText = () => {
    switch (activeTab) {
      case "focus":
        return "cat current_focus.json";
      case "status":
        return "sh workstation_status.sh";
      case "git":
        return "git log -1 --stat";
    }
  };

  return (
    <section className="pt-10 pb-16 md:pt-16 md:pb-24 border-b border-border/60">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Asymmetric Editorial Identity with Choreographed Entrance */}
        <div className="lg:col-span-7 space-y-6">
          {/* Metadata Row */}
          <div
            className="flex flex-wrap items-center gap-3 animate-fade-in-up"
            style={{ animationDelay: "0ms" }}
          >
            <StatusIndicator />
            <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded border border-border text-xs font-mono-meta text-muted hover:text-foreground transition-colors">
              <MapPin className="w-3 h-3 text-emerald-500" />
              <span>{siteConfig.location}</span>
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-4">
            <h1
              className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-[1.15] animate-fade-in-up"
              style={{ animationDelay: "80ms" }}
            >
              Hi, I&apos;m Awall. <br className="hidden sm:inline" />
              <span className="text-muted font-normal block sm:inline mt-1 sm:mt-0">
                I like building things, breaking them, and figuring out why they broke.
              </span>
            </h1>

            <p
              className="text-sm sm:text-base text-muted leading-relaxed max-w-xl animate-fade-in-up"
              style={{ animationDelay: "140ms" }}
            >
              I&apos;m a student developer from SMK Marhas Margahayu, currently learning software development through projects, experiments, debugging, and curiosity. I care more about understanding how something works than making it look impressive.
            </p>
          </div>

          {/* Quick Action Buttons with Directional Micro-Interactions */}
          <div
            className="flex flex-wrap items-center gap-3 pt-2 animate-fade-in-up"
            style={{ animationDelay: "200ms" }}
          >
            <Link
              href="/projects"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/blog"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-surface-subtle hover:bg-surface text-foreground text-xs font-medium active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>Read Writing</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>

            <Link
              href="/github"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-md border border-border bg-surface-subtle hover:bg-surface text-muted hover:text-foreground text-xs font-mono-meta active:scale-[0.98] transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500"
            >
              <span>GitHub Telemetry</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-muted transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>

        {/* Right Column: Live Interactive Terminal Workstation */}
        <div
          className="lg:col-span-5 animate-fade-in-up"
          style={{ animationDelay: "120ms" }}
        >
          <div
            ref={terminalRef}
            onPointerMove={handleTerminalPointerMove}
            onPointerLeave={resetTerminalPointer}
            className="rounded-lg border border-border bg-surface-subtle/50 hover:border-zinc-400/80 dark:hover:border-zinc-700 transition-[transform,border-color] duration-200 p-4 font-mono-meta text-xs space-y-3 shadow-xs"
            style={{ transform: "translate3d(var(--terminal-x, 0px), var(--terminal-y, 0px), 0)" }}
          >
            {/* Terminal Window Header with Clickable Command Tabs */}
            <div className="flex items-center justify-between pb-3 border-b border-border/80 text-muted">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="w-2.5 h-2.5 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <span className="text-[11px] text-muted ml-1.5">session::workstation</span>
              </div>
              <div className="flex items-center gap-1.5 text-[10px] text-emerald-600 dark:text-emerald-400">
                <GitBranch className="w-3 h-3" />
                <span>fik/main</span>
              </div>
            </div>

            {/* Interactive Tab Switcher */}
            <div className="flex items-center justify-between gap-1 text-[11px] border-b border-border/50 pb-2">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => setActiveTab("focus")}
                  className={cn(
                    "px-2 py-0.5 rounded transition-all duration-150 text-[10px]",
                    activeTab === "focus"
                      ? "bg-foreground text-background font-semibold"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  )}
                >
                  focus.json
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("status")}
                  className={cn(
                    "px-2 py-0.5 rounded transition-all duration-150 text-[10px]",
                    activeTab === "status"
                      ? "bg-foreground text-background font-semibold"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  )}
                >
                  system_status.sh
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab("git")}
                  className={cn(
                    "px-2 py-0.5 rounded transition-all duration-150 text-[10px]",
                    activeTab === "git"
                      ? "bg-foreground text-background font-semibold"
                      : "text-muted hover:text-foreground hover:bg-surface"
                  )}
                >
                  recent_git.log
                </button>
              </div>

              {/* Copy command snippet */}
              <button
                type="button"
                onClick={() => handleCopyCommand(getCommandText())}
                title="Copy command"
                aria-label="Copy terminal command"
                className="p-1 rounded text-muted hover:text-foreground hover:bg-surface transition-colors"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-emerald-500" />
                ) : (
                  <Copy className="w-3 h-3" />
                )}
              </button>
            </div>

            {/* Terminal Content Body */}
            <div className="space-y-2 text-muted min-h-[148px] flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-1.5 text-muted pb-1.5">
                  <span className="text-zinc-400 dark:text-zinc-600 font-semibold">$</span>
                  <span className="text-foreground/90 font-medium">{getCommandText()}</span>
                  <span className="inline-block w-1.5 h-3.5 bg-emerald-500 terminal-cursor ml-0.5" />
                </div>

                {/* Tab: Focus */}
                {activeTab === "focus" && (
                  <div className="p-2.5 rounded bg-background/80 border border-border/70 space-y-1 text-foreground/90 animate-fade-in-up">
                    <p>
                      <span className="text-emerald-600 dark:text-emerald-400">&quot;focus&quot;</span>:{" "}
                      <span>&quot;web development&quot;</span>,
                    </p>
                    <p>
                      <span className="text-emerald-600 dark:text-emerald-400">&quot;studying&quot;</span>: [
                      <span className="text-amber-600 dark:text-amber-400">&quot;debugging&quot;</span>,{" "}
                      <span className="text-amber-600 dark:text-amber-400">&quot;learning by building&quot;</span>],
                    </p>
                    <p>
                      <span className="text-emerald-600 dark:text-emerald-400">&quot;current_quest&quot;</span>:{" "}
                      <span>&quot;understand before memorizing&quot;</span>,
                    </p>
                      <p>
                        <span className="text-emerald-600 dark:text-emerald-400">&quot;approach&quot;</span>:{" "}
                        <span>&quot;build, break, understand, rebuild&quot;</span>
                      </p>
                  </div>
                )}

                {/* Tab: Status */}
                {activeTab === "status" && (
                  <div className="p-2.5 rounded bg-background/80 border border-border/70 space-y-1 text-foreground/90 animate-fade-in-up">
                    <p className="text-muted/80"># personal workspace notes</p>
                    <p>
                      status: <span className="text-emerald-600 dark:text-emerald-400">learning</span>
                    </p>
                    <p>
                      mode: <span className="text-amber-600 dark:text-amber-400">building</span>
                    </p>
                    <p>
                      mindset: <span className="text-emerald-600 dark:text-emerald-400">understand first</span>
                    </p>
                    <p>
                      school: <span className="text-emerald-500 font-semibold">SMK Marhas Margahayu</span>
                    </p>
                  </div>
                )}

                {/* Tab: Git Log */}
                {activeTab === "git" && (
                  <div className="p-2.5 rounded bg-background/80 border border-border/70 space-y-1 text-foreground/90 animate-fade-in-up text-[11px]">
                    <p className="text-muted/80">recent_projects:</p>
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium">- KOMUNITAS</p>
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium">- Pesantren Attendance</p>
                    <p className="text-emerald-600 dark:text-emerald-400 font-medium">- Personal Developer Space</p>
                  </div>
                )}
              </div>

              {/* Status Footer */}
              <div className="pt-2 flex items-center justify-between text-[11px] text-muted/70 border-t border-border/40">
                <span>student workspace • learning in public</span>
                <span className="flex items-center gap-1.5 text-emerald-500 font-semibold">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  learning
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
