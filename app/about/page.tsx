import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";
import { skills } from "@/data/skills";
import { siteConfig } from "@/data/site";
import { BookOpen, Compass, Cpu, Terminal } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description:
    "About Awall, a PPLG student learning software development through projects and debugging.",
};

export default function AboutPage() {
  const frontendSkills = skills.filter((s) => s.category === "Frontend" || (s.category === "Languages" && (s.name === "TypeScript" || s.name === "JavaScript")));
  const backendSkills = skills.filter((s) => s.category === "Backend" || (s.category === "Languages" && (s.name === "PHP" || s.name === "Python")));
  const toolingSkills = skills.filter((s) => s.category === "Data & Tools");

  return (
    <Container size="default" className="py-12 md:py-20 space-y-16">
      {/* Editorial Header */}
      <div className="space-y-4 border-b border-border pb-8">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
            Profile &amp; Perspective
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          About Awall
        </h1>
        <p className="text-sm font-mono-meta text-muted">
          SMK Marhas Margahayu • XII PPLG 1 • {siteConfig.location}
        </p>
      </div>

      {/* Backstory & Narrative */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Terminal className="w-4 h-4 text-emerald-500" />
          <span>The Backstory</span>
        </h2>
        <div className="space-y-4 text-sm sm:text-base text-muted leading-relaxed">
          <p>
            I&apos;m Fikri Awalludin Rahmat, but I usually go by Awall. I got interested in programming because software gives me a way to turn an idea into something that actually works.
          </p>
          <p>
            I&apos;m still learning at SMK Marhas Margahayu in PPLG. Most of what I learn comes from trying to build something, running into a bug, investigating it, and rebuilding with a better understanding of what happened.
          </p>
          <p>
            I like web development, debugging, UI ideas in Figma, and experiments with different technologies. AI can help me explore or write boilerplate, but understanding the code is still my responsibility.
          </p>
        </div>
      </section>

      {/* Currently Learning */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-emerald-500" />
          <span>What I&apos;m Currently Digging Into</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="group p-4 rounded-lg border border-border bg-surface-subtle/30 hover:bg-surface hover:border-zinc-400/80 dark:hover:border-zinc-600 transition-all duration-200 shadow-xs">
            <span className="text-xs font-mono-meta text-emerald-600 dark:text-emerald-400 font-semibold uppercase group-hover:text-emerald-500 transition-colors">
              01 // Backend Architecture
            </span>
            <h3 className="text-sm font-semibold text-foreground mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Modern Laravel &amp; Event Queues</h3>
            <p className="text-xs text-muted leading-relaxed mt-1">
              Learning how Laravel applications connect routes, data, and user actions.
            </p>
          </div>

          <div className="group p-4 rounded-lg border border-border bg-surface-subtle/30 hover:bg-surface hover:border-zinc-400/80 dark:hover:border-zinc-600 transition-all duration-200 shadow-xs">
            <span className="text-xs font-mono-meta text-emerald-600 dark:text-emerald-400 font-semibold uppercase group-hover:text-emerald-500 transition-colors">
              02 // Retrieval Systems
            </span>
            <h3 className="text-sm font-semibold text-foreground mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Vector Search &amp; Semantic Chunking</h3>
            <p className="text-xs text-muted leading-relaxed mt-1">
              Exploring how AI tools can fit into a project without replacing my understanding of the code.
            </p>
          </div>

          <div className="group p-4 rounded-lg border border-border bg-surface-subtle/30 hover:bg-surface hover:border-zinc-400/80 dark:hover:border-zinc-600 transition-all duration-200 shadow-xs">
            <span className="text-xs font-mono-meta text-emerald-600 dark:text-emerald-400 font-semibold uppercase group-hover:text-emerald-500 transition-colors">
              03 // Storage &amp; Indexes
            </span>
            <h3 className="text-sm font-semibold text-foreground mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">B-Tree Indexes &amp; SQL Query Tuning</h3>
            <p className="text-xs text-muted leading-relaxed mt-1">
              Trying to understand what happens inside an application instead of only memorizing a solution.
            </p>
          </div>

          <div className="group p-4 rounded-lg border border-border bg-surface-subtle/30 hover:bg-surface hover:border-zinc-400/80 dark:hover:border-zinc-600 transition-all duration-200 shadow-xs">
            <span className="text-xs font-mono-meta text-emerald-600 dark:text-emerald-400 font-semibold uppercase group-hover:text-emerald-500 transition-colors">
              04 // Frontend Performance
            </span>
            <h3 className="text-sm font-semibold text-foreground mt-1 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">Next.js Server Components &amp; Web Standards</h3>
            <p className="text-xs text-muted leading-relaxed mt-1">
              Practising how a web page becomes a responsive interface through HTML, CSS, React, and Next.js.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Matrix Organized by Domain */}
      <section className="space-y-6">
        <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
          <Cpu className="w-4 h-4 text-emerald-500" />
          <span>Technical Toolkit &amp; Experience</span>
        </h2>
        <div className="space-y-6">
          {/* Frontend */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
              Frontend &amp; UI
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {frontendSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="group p-3 rounded border border-border bg-surface hover:border-zinc-400/80 dark:hover:border-zinc-600 hover:bg-surface-subtle/30 transition-all duration-150 flex flex-col justify-between gap-1.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {skill.name}
                    </span>
                    <Badge variant={skill.status === "Used" ? "accent" : "mono"}>
                      {skill.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{skill.context}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Backend */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
              Backend &amp; Systems
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {backendSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="group p-3 rounded border border-border bg-surface hover:border-zinc-400/80 dark:hover:border-zinc-600 hover:bg-surface-subtle/30 transition-all duration-150 flex flex-col justify-between gap-1.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {skill.name}
                    </span>
                    <Badge variant={skill.status === "Used" ? "accent" : "mono"}>
                      {skill.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{skill.context}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Data & Tools */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
              Data, DevOps &amp; Environment
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {toolingSkills.map((skill) => (
                <div
                  key={skill.name}
                  className="group p-3 rounded border border-border bg-surface hover:border-zinc-400/80 dark:hover:border-zinc-600 hover:bg-surface-subtle/30 transition-all duration-150 flex flex-col justify-between gap-1.5 shadow-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                      {skill.name}
                    </span>
                    <Badge variant={skill.status === "Used" ? "accent" : "mono"}>
                      {skill.status}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted leading-relaxed">{skill.context}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Personal Philosophy */}
      <section className="space-y-4 p-6 rounded-lg border border-border bg-surface-subtle/30 hover:border-zinc-400/60 dark:hover:border-zinc-700 transition-colors">
        <h2 className="text-base font-bold text-foreground flex items-center gap-2">
          <Compass className="w-4 h-4 text-emerald-500" />
          <span>Core Engineering Beliefs</span>
        </h2>
        <ul className="space-y-3 text-xs sm:text-sm text-muted leading-relaxed">
          <li className="flex items-start gap-2.5 p-1 rounded transition-colors hover:text-foreground">
            <span className="text-emerald-500 font-mono-meta mt-0.5">•</span>
            <span>
              <strong className="text-foreground">Solve the actual human problem first.</strong> The most sophisticated architecture is worthless if it doesn&apos;t make life easier for the person using the system.
            </span>
          </li>
          <li className="flex items-start gap-2.5 p-1 rounded transition-colors hover:text-foreground">
            <span className="text-emerald-500 font-mono-meta mt-0.5">•</span>
            <span>
              <strong className="text-foreground">Respect the device and connection.</strong> Not everyone has high-speed fiber or the latest flagship phone. Software should be light, responsive, and survive flaky networks.
            </span>
          </li>
          <li className="flex items-start gap-2.5 p-1 rounded transition-colors hover:text-foreground">
            <span className="text-emerald-500 font-mono-meta mt-0.5">•</span>
            <span>
              <strong className="text-foreground">Understand before memorizing.</strong> I am still a student, and I would rather understand why something works than repeat a solution I do not understand.
            </span>
          </li>
        </ul>
      </section>
    </Container>
  );
}
