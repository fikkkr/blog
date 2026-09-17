import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { getAllPosts } from "@/lib/posts";
import { formatDate } from "@/lib/utils";

export function RecentWriting() {
  const posts = getAllPosts().slice(0, 3);

  return (
    <section className="py-16 border-b border-border/60">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
            <h2 className="text-xs font-mono-meta uppercase tracking-wider text-muted font-semibold">
              Recent Writing &amp; Notes
            </h2>
          </div>
          <Link
            href="/blog"
            className="group text-xs font-mono-meta text-muted hover:text-foreground transition-colors flex items-center gap-1"
          >
            <span>All posts</span>
            <ArrowUpRight className="w-3 h-3 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <div className="space-y-4">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block p-4 sm:p-5 rounded-lg border border-border/70 hover:border-zinc-400/80 dark:hover:border-zinc-600 bg-surface-subtle/30 hover:bg-surface transition-all duration-150 shadow-xs active:scale-[0.99]"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 pb-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-semibold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                    {post.title}
                  </h3>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-150 shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono-meta text-muted shrink-0">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
              <p className="text-xs sm:text-sm text-muted line-clamp-2 leading-relaxed mt-1">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-1.5 mt-3">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[10px] font-mono-meta text-muted/70 bg-surface px-2 py-0.5 rounded border border-border/60 group-hover:border-border transition-colors"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
