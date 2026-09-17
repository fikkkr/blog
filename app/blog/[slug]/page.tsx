import * as React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ArrowRight, Calendar, Clock } from "lucide-react";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { formatDate } from "@/lib/utils";
import { Container } from "@/components/layout/Container";
import { ReadingProgress } from "@/components/blog/ReadingProgress";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { mdxComponents } from "@/components/blog/MDXCustomComponents";

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((p) => ({
    slug: p.slug,
  }));
}

export function generateMetadata({ params }: BlogPostPageProps): Metadata {
  const post = getPostBySlug(params.slug);
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
  };
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getPostBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const allPosts = getAllPosts();
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug);
  const prevPost = currentIndex < allPosts.length - 1 ? allPosts[currentIndex + 1] : null;
  const nextPost = currentIndex > 0 ? allPosts[currentIndex - 1] : null;

  return (
    <>
      <ReadingProgress />
      <Container size="wide" className="py-12 md:py-20">
        {/* Back Link */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="inline-flex items-center gap-1.5 text-xs font-mono-meta text-muted hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to all articles</span>
          </Link>
        </div>

        {/* Article Grid: Left = Content, Right = Sticky TOC on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Article Body */}
          <article className="lg:col-span-8 max-w-2xl space-y-8">
            {/* Header */}
            <header className="space-y-4 pb-8 border-b border-border">
              <div className="flex flex-wrap items-center gap-3 text-xs font-mono-meta text-muted">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5" />
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground leading-[1.2]">
                {post.title}
              </h1>

              <p className="text-base text-muted leading-relaxed">
                {post.description}
              </p>

              {/* Tags */}
              <div className="flex flex-wrap items-center gap-1.5 pt-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono-meta text-muted bg-surface-subtle px-2 py-0.5 rounded border border-border/70"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </header>

            {/* Mobile TOC */}
            <div className="block lg:hidden">
              <TableOfContents headings={post.headings} />
            </div>

            {/* MDX Remote Content */}
            <div className="prose prose-zinc dark:prose-invert max-w-none">
              <MDXRemote source={post.content} components={mdxComponents} />
            </div>

            {/* Previous / Next Article Navigation */}
            <nav
              aria-label="Previous and Next Articles"
              className="pt-10 mt-12 border-t border-border grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {prevPost ? (
                <Link
                  href={`/blog/${prevPost.slug}`}
                  className="group p-4 rounded-lg border border-border bg-surface-subtle/30 hover:bg-surface transition-colors space-y-1"
                >
                  <span className="text-[10px] font-mono-meta uppercase tracking-wider text-muted flex items-center gap-1">
                    <ArrowLeft className="w-3 h-3 group-hover:-translate-x-0.5 transition-transform" />
                    <span>Previous Article</span>
                  </span>
                  <p className="text-xs font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-1">
                    {prevPost.title}
                  </p>
                </Link>
              ) : (
                <div />
              )}

              {nextPost ? (
                <Link
                  href={`/blog/${nextPost.slug}`}
                  className="group p-4 rounded-lg border border-border bg-surface-subtle/30 hover:bg-surface transition-colors space-y-1 text-right sm:col-start-2"
                >
                  <span className="text-[10px] font-mono-meta uppercase tracking-wider text-muted flex items-center justify-end gap-1">
                    <span>Next Article</span>
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                  <p className="text-xs font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 line-clamp-1">
                    {nextPost.title}
                  </p>
                </Link>
              ) : null}
            </nav>
          </article>

          {/* Sticky Desktop TOC Sidebar */}
          <aside className="hidden lg:block lg:col-span-4 sticky top-20 space-y-4">
            <TableOfContents headings={post.headings} />

            <div className="p-4 rounded-lg border border-border bg-surface-subtle/20 space-y-2 text-xs font-mono-meta text-muted">
              <span className="uppercase text-[10px] tracking-wider text-muted/70 font-semibold block">
                Colophon
              </span>
              <p>Markdown rendered via React Server Components.</p>
              <p>Zero tracking cookies.</p>
            </div>
          </aside>
        </div>
      </Container>
    </>
  );
}
