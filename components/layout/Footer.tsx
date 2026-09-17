"use client";

import * as React from "react";
import Link from "next/link";
import { siteConfig } from "@/data/site";
import { Container } from "@/components/layout/Container";
import { StatusIndicator } from "@/components/ui/StatusIndicator";
import { Clock, ExternalLink } from "lucide-react";

export function Footer() {
  const [bandungTime, setBandungTime] = React.useState<string>("");

  React.useEffect(() => {
    const updateTime = () => {
      try {
        const time = new Intl.DateTimeFormat("en-US", {
          timeZone: "Asia/Jakarta",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setBandungTime(time);
      } catch {
        setBandungTime("");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="mt-24 border-t border-border/80 bg-surface/40 transition-colors">
      <Container size="wide" className="py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-8 border-b border-border/60">
          {/* Left Column: Developer Status & Location */}
          <div className="space-y-3">
            <StatusIndicator />
            <div className="flex items-center gap-2 text-xs font-mono-meta text-muted">
              <Clock className="w-3.5 h-3.5 text-muted" />
              <span>Bandung, ID (WIB)</span>
              {bandungTime && (
                <>
                  <span className="text-zinc-400 dark:text-zinc-600">•</span>
                  <span className="text-foreground/90 font-medium tabular-nums">{bandungTime}</span>
                </>
              )}
            </div>
          </div>

          {/* Right Column: Links & Feeds */}
          <div className="flex flex-wrap items-center gap-4 text-xs font-mono-meta text-muted">
            <a
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className="group hover:text-foreground transition-colors flex items-center gap-1"
            >
              <span>GitHub</span>
              <ExternalLink className="w-3 h-3 opacity-60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className="group hover:text-foreground transition-colors flex items-center gap-1"
            >
              <span>X</span>
              <ExternalLink className="w-3 h-3 opacity-60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group hover:text-foreground transition-colors flex items-center gap-1"
            >
              <span>LinkedIn</span>
              <ExternalLink className="w-3 h-3 opacity-60 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
            <Link href="/sitemap.xml" className="hover:text-foreground transition-colors">
              Sitemap
            </Link>
          </div>
        </div>

        {/* Bottom Colophon */}
        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-[11px] font-mono-meta text-muted/70">
          <p>
            © {new Date().getFullYear()} {siteConfig.name}. Designed with restraint, no AI templates.
          </p>
          <p className="text-muted/60">
            {siteConfig.lastDeployNote}
          </p>
        </div>
      </Container>
    </footer>
  );
}
