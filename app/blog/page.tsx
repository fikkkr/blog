import * as React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import { getAllPosts, getAllTags } from "@/lib/posts";
import { BlogSearchClient } from "@/components/blog/BlogSearchClient";

export const metadata: Metadata = {
  title: "Writing & Engineering Notes",
  description:
    "Reflections, technical deep dives, and architecture notes by Fikri Awalludin.",
};

export default function BlogPage() {
  const posts = getAllPosts();
  const tags = getAllTags();

  return (
    <Container size="default" className="py-12 md:py-20 space-y-10">
      {/* Header */}
      <div className="space-y-3 border-b border-border pb-6">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
            Technical Journal
          </span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
          Writing &amp; Notes
        </h1>
        <p className="text-sm text-muted max-w-xl leading-relaxed">
          Thoughts on building web applications, database performance, offline resilience, and keeping software simple.
        </p>
      </div>

      <BlogSearchClient posts={posts} tags={tags} />
    </Container>
  );
}
