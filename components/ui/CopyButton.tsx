"use client";

import * as React from "react";
import { Check, Copy } from "lucide-react";
import { cn } from "@/lib/utils";

interface CopyButtonProps {
  text: string;
  className?: string;
}

export function CopyButton({ text, className }: CopyButtonProps) {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      onClick={handleCopy}
      type="button"
      aria-label={copied ? "Copied code" : "Copy code to clipboard"}
      className={cn(
        "inline-flex items-center gap-1.5 px-2 py-1 text-xs font-mono-meta rounded border transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50",
        copied
          ? "border-emerald-500/40 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 font-medium"
          : "border-border bg-surface-subtle hover:bg-surface text-muted hover:text-foreground",
        className
      )}
    >
      <span className="relative w-3.5 h-3.5 block">
        <Copy
          className={cn(
            "w-3.5 h-3.5 absolute inset-0 transition-transform duration-150",
            copied ? "opacity-0 scale-50 -rotate-45" : "opacity-100 scale-100 rotate-0"
          )}
        />
        <Check
          className={cn(
            "w-3.5 h-3.5 absolute inset-0 text-emerald-500 transition-transform duration-150",
            copied ? "opacity-100 scale-100 rotate-0" : "opacity-0 scale-50 rotate-45"
          )}
        />
      </span>
      <span className="transition-colors duration-150">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}
