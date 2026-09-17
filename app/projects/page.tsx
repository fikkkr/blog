import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { projects } from "@/data/projects";
import { ProjectDirectoryClient } from "@/components/projects/ProjectDirectoryClient";

export const metadata: Metadata = {
  title: "Projects & Systems",
  description:
    "Explore software projects, offline systems, and web tools built by Fikri Awalludin.",
};

export default function ProjectsPage() {
  return (
    <Container size="default" className="py-12 md:py-20 space-y-10">
      {/* Editorial Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
            Archive &amp; Case Studies
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Projects &amp; Systems
        </h1>
        <p className="text-sm text-muted max-w-xl leading-relaxed">
          A selection of real applications, offline tools, and technical experiments I&apos;ve engineered.
          Click any project to inspect its architecture and lessons learned.
        </p>
      </div>

      <ProjectDirectoryClient initialProjects={projects} />
    </Container>
  );
}
