"use client";

import * as React from "react";
import Link from "next/link";
import { Search, ArrowUpRight } from "lucide-react";
import { PostMetadata } from "@/lib/posts";
import { formatDate, cn } from "@/lib/utils";

interface BlogSearchClientProps {
  posts: PostMetadata[];
  tags: { tag: string; count: number }[];
}

export function BlogSearchClient({ posts, tags }: BlogSearchClientProps) {
  const [selectedTag, setSelectedTag] = React.useState<string | null>(null);
  const [searchQuery, setSearchQuery] = React.useState("");

  const filteredPosts = React.useMemo(() => {
    return posts.filter((post) => {
      const matchesTag = !selectedTag || post.tags.includes(selectedTag);

      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        post.title.toLowerCase().includes(q) ||
        post.description.toLowerCase().includes(q) ||
        post.tags.some((t) => t.toLowerCase().includes(q));

      return matchesTag && matchesSearch;
    });
  }, [posts, selectedTag, searchQuery]);

  return (
    <div className="space-y-8">
      {/* Search Input & Tag Filters */}
      <div className="space-y-4 pb-6 border-b border-border">
        {/* Search */}
        <div className="relative max-w-md">
          <Search className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search articles by title, topic, or keyword..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded text-xs font-mono-meta bg-surface-subtle border border-border text-foreground placeholder:text-muted focus:outline-none focus:ring-1 focus:ring-emerald-500"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-muted hover:text-foreground"
            >
              ×
            </button>
          )}
        </div>

        {/* Tag Pills */}
        <div className="flex flex-wrap items-center gap-1.5 pt-1">
          <button
            type="button"
            onClick={() => setSelectedTag(null)}
            className={cn(
              "px-2.5 py-1 rounded text-xs font-mono-meta transition-all duration-150 active:scale-95",
              selectedTag === null
                ? "bg-foreground text-background font-semibold shadow-xs"
                : "bg-surface-subtle text-muted hover:text-foreground border border-border"
            )}
          >
            All Posts ({posts.length})
          </button>
          {tags.map(({ tag, count }) => {
            const isActive = selectedTag === tag;
            return (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(isActive ? null : tag)}
                className={cn(
                  "px-2.5 py-1 rounded text-xs font-mono-meta transition-all duration-150 active:scale-95",
                  isActive
                    ? "bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 border border-emerald-500/40 font-semibold shadow-xs"
                    : "bg-surface-subtle text-muted hover:text-foreground border border-border hover:border-zinc-400 dark:hover:border-zinc-600"
                )}
              >
                #{tag} <span className="text-muted/60">({count})</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Post List */}
      {filteredPosts.length === 0 ? (
        <div className="p-12 text-center border border-dashed border-border rounded-lg space-y-2 animate-fade-in-up">
          <p className="text-sm font-medium text-foreground">No articles match your search.</p>
          <p className="text-xs text-muted">Try a different keyword or clear your tag filter.</p>
          <button
            onClick={() => {
              setSelectedTag(null);
              setSearchQuery("");
            }}
            className="mt-2 text-xs font-mono-meta text-emerald-600 dark:text-emerald-400 hover:underline"
          >
            Reset filter
          </button>
        </div>
      ) : (
        <div key={`${selectedTag}-${searchQuery}`} className="space-y-6">
          {filteredPosts.map((post, idx) => (
            <article
              key={post.slug}
              style={{
                animation: `fadeInUpSubtle 0.28s var(--ease-out-cubic) ${Math.min(idx * 40, 200)}ms backwards`,
              }}
              className="group p-5 rounded-lg border border-border/70 hover:border-zinc-400/80 dark:hover:border-zinc-600 bg-surface-subtle/20 hover:bg-surface transition-all duration-150 space-y-2.5 shadow-xs active:scale-[0.99]"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div className="flex items-center gap-2">
                  <Link
                    href={`/blog/${post.slug}`}
                    className="text-lg font-bold text-foreground group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors"
                  >
                    {post.title}
                  </Link>
                  <ArrowUpRight className="w-3.5 h-3.5 text-muted opacity-0 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-150 shrink-0" />
                </div>
                <div className="flex items-center gap-2 text-xs font-mono-meta text-muted shrink-0">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span>•</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-muted leading-relaxed">
                {post.description}
              </p>

              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                {post.tags.map((tag) => (
                  <button
                    key={tag}
                    onClick={(e) => {
                      e.preventDefault();
                      setSelectedTag(tag);
                    }}
                    className="text-[10px] font-mono-meta text-muted/70 bg-surface px-2 py-0.5 rounded border border-border/60 hover:text-foreground hover:border-zinc-400 transition-colors"
                  >
                    #{tag}
                  </button>
                ))}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
