import * as React from "react";
import Link from "next/link";
import { CopyButton } from "@/components/ui/CopyButton";
import { slugify } from "@/lib/utils";

function extractText(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children) && children.props?.children) {
    return extractText(children.props.children);
  }
  return "";
}

export const mdxComponents = {
  h1: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className="text-2xl sm:text-3xl font-bold tracking-tight text-foreground mt-8 mb-4"
      {...props}
    >
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = extractText(children);
    const id = slugify(text);
    return (
      <h2
        id={id}
        className="group text-xl sm:text-2xl font-bold tracking-tight text-foreground mt-10 mb-3 pt-4 border-t border-border/60 scroll-mt-20 flex items-center justify-between"
        {...props}
      >
        <span>{children}</span>
        <a
          href={`#${id}`}
          className="opacity-0 group-hover:opacity-100 text-muted hover:text-foreground text-sm font-mono-meta transition-opacity ml-2"
          aria-label={`Link to ${text}`}
        >
          #
        </a>
      </h2>
    );
  },
  h3: ({ children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) => {
    const text = extractText(children);
    const id = slugify(text);
    return (
      <h3
        id={id}
        className="text-lg font-semibold text-foreground mt-6 mb-2 scroll-mt-20"
        {...props}
      >
        {children}
      </h3>
    );
  },
  p: ({ children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p
      className="text-sm sm:text-base text-muted leading-relaxed my-4"
      {...props}
    >
      {children}
    </p>
  ),
  ul: ({ children, ...props }: React.HTMLAttributes<HTMLUListElement>) => (
    <ul className="list-disc list-outside pl-5 my-4 space-y-2 text-sm sm:text-base text-muted" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="list-decimal list-outside pl-5 my-4 space-y-2 text-sm sm:text-base text-muted" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: React.HTMLAttributes<HTMLQuoteElement>) => (
    <blockquote
      className="border-l-2 border-emerald-500 pl-4 my-6 text-sm sm:text-base italic text-foreground/90 bg-surface-subtle/30 py-2 pr-3 rounded-r"
      {...props}
    >
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }: React.HTMLAttributes<HTMLPreElement>) => {
    const codeString = extractText(children);
    return (
      <div className="group my-6 rounded-lg border border-border bg-surface-subtle/80 hover:border-zinc-400/80 dark:hover:border-zinc-600 transition-colors duration-150 overflow-hidden shadow-xs">
        <div className="flex items-center justify-between px-3 py-1.5 bg-surface border-b border-border/80 text-[11px] font-mono-meta text-muted">
          <span className="group-hover:text-foreground transition-colors">code snippet</span>
          <CopyButton text={codeString} />
        </div>
        <pre
          className="p-4 overflow-x-auto text-xs sm:text-sm font-mono-meta leading-relaxed text-foreground"
          {...props}
        >
          {children}
        </pre>
      </div>
    );
  },
  code: ({ className, children, ...props }: React.HTMLAttributes<HTMLElement>) => {
    // If inside pre, render directly
    if (className) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }
    // Inline code
    return (
      <code
        className="px-1.5 py-0.5 rounded text-[13px] font-mono-meta bg-surface-subtle border border-border/70 text-foreground font-medium"
        {...props}
      >
        {children}
      </code>
    );
  },
  hr: () => <hr className="my-8 border-border" />,
  a: ({ href = "", children, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) => {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="text-emerald-600 dark:text-emerald-400 underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-500 transition-colors"
          {...props}
        >
          {children}
        </a>
      );
    }
    return (
      <Link
        href={href}
        className="text-emerald-600 dark:text-emerald-400 underline underline-offset-4 decoration-emerald-500/40 hover:decoration-emerald-500 transition-colors"
        {...props}
      >
        {children}
      </Link>
    );
  },
};
