import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight, FolderGit2, ExternalLink, CheckCircle2, AlertCircle, Lightbulb, Layers } from "lucide-react";
import { projects, getProjectBySlug } from "@/data/projects";
import { Container } from "@/components/layout/Container";
import { Badge } from "@/components/ui/Badge";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: ProjectPageProps): Metadata {
  const project = getProjectBySlug(params.slug);
  if (!project) {
    return { title: "Project Not Found" };
  }
  return {
    title: `${project.title} — Case Study`,
    description: project.description,
  };
}

export default function ProjectCaseStudyPage({ params }: ProjectPageProps) {
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <Container size="default" className="py-12 md:py-20 space-y-12">
      {/* Back Link with Directional Hover */}
      <Link
        href="/projects"
        className="group inline-flex items-center gap-1.5 text-xs font-mono-meta text-muted hover:text-foreground transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5 transition-transform duration-150 group-hover:-translate-x-1" />
        <span>Back to all projects</span>
      </Link>

      {/* Case Study Header with Staggered Entrance */}
      <div className="space-y-4 border-b border-border pb-8 animate-fade-in-up">
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="accent">{project.status}</Badge>
          <Badge variant="mono">{project.category}</Badge>
          <span className="text-xs font-mono-meta text-muted">{project.year}</span>
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          {project.title}
        </h1>

        <p className="text-base text-muted max-w-2xl leading-relaxed">
          {project.tagline}
        </p>

        {/* Links Bar */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-surface-subtle hover:bg-surface border border-border text-xs font-mono-meta text-foreground transition-all duration-150 active:scale-95"
            >
              <FolderGit2 className="w-3.5 h-3.5 transition-transform group-hover/btn:-translate-y-0.5" />
              <span>Source Repository</span>
              <ExternalLink className="w-3 h-3 text-muted transition-transform group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          )}
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer"
              className="group/btn inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-foreground text-background text-xs font-medium hover:opacity-90 transition-all duration-150 active:scale-95"
            >
              <span>Live Application</span>
              <ArrowUpRight className="w-3.5 h-3.5 transition-transform duration-150 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
            </a>
          )}
        </div>
      </div>

      {/* Content Sections */}
      <div className="space-y-12 text-sm sm:text-base leading-relaxed">
        {/* What is it? */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="text-emerald-500 font-mono-meta text-sm">01 //</span>
            <span>Context</span>
          </h2>
          <p className="text-muted leading-relaxed">
            {project.caseStudy.whatIsIt}
          </p>
        </section>

        {/* Why did I build it? */}
        <section className="space-y-3">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="text-emerald-500 font-mono-meta text-sm">02 //</span>
            <span>Problem</span>
          </h2>
          <p className="text-muted leading-relaxed">
            {project.caseStudy.whyBuilt}
          </p>
        </section>

        {/* Architecture & How It Works */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="text-emerald-500 font-mono-meta text-sm">03 //</span>
            <span>Approach</span>
          </h2>
          <div className="grid grid-cols-1 gap-3">
            {project.caseStudy.architecture.map((item, index) => (
              <div
                key={index}
                className="group p-4 rounded-lg border border-border bg-surface-subtle/40 hover:bg-surface-subtle/80 hover:border-zinc-400/80 dark:hover:border-zinc-600 text-xs sm:text-sm text-foreground/90 font-mono-meta flex items-start gap-3 transition-all duration-150 shadow-xs"
              >
                <Layers className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5 transition-transform group-hover:scale-110" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Key Features */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="text-emerald-500 font-mono-meta text-sm">04 //</span>
            <span>What I Built</span>
          </h2>
          <ul className="space-y-2.5">
            {project.caseStudy.keyFeatures.map((feat, index) => (
              <li key={index} className="flex items-start gap-3 text-xs sm:text-sm text-muted hover:text-foreground transition-colors">
                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-snug">{feat}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Challenges & Solutions */}
        {project.caseStudy.challenges.length > 0 && <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="text-emerald-500 font-mono-meta text-sm">05 //</span>
            <span>Engineering Challenges</span>
          </h2>
          <div className="space-y-3">
            {project.caseStudy.challenges.map((challenge, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-border bg-surface-subtle/30 hover:bg-surface-subtle/60 hover:border-zinc-400/80 dark:hover:border-zinc-600 text-xs sm:text-sm text-muted hover:text-foreground flex items-start gap-3 transition-all duration-150"
              >
                <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{challenge}</span>
              </div>
            ))}
          </div>
        </section>}

        {/* Lessons Learned */}
        <section className="space-y-4">
          <h2 className="text-lg font-bold text-foreground flex items-center gap-2">
            <span className="text-emerald-500 font-mono-meta text-sm">06 //</span>
            <span>What I Learned</span>
          </h2>
          <div className="space-y-3">
            {project.caseStudy.lessonsLearned.map((lesson, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40 hover:bg-emerald-500/10 text-xs sm:text-sm text-foreground/90 flex items-start gap-3 transition-all duration-150"
              >
                <Lightbulb className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{lesson}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Tech Stack Footer */}
        <section className="space-y-3 pt-6 border-t border-border">
          <h3 className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
            Technologies &amp; Libraries Used
          </h3>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((t) => (
              <Badge key={t} variant="mono" size="md">
                {t}
              </Badge>
            ))}
          </div>
        </section>
      </div>
    </Container>
  );
}
