"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Terminal, ExternalLink } from "lucide-react";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const [isOpen, setIsOpen] = React.useState(false);
  const [isMounted, setIsMounted] = React.useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  // Close when pathname changes
  React.useEffect(() => {
    closeMenu();
  }, [pathname]);

  React.useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
      return;
    }

    const timeout = window.setTimeout(() => setIsMounted(false), 220);
    return () => window.clearTimeout(timeout);
  }, [isOpen]);

  // Lock body scroll when open
  React.useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  // Handle escape key
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="md:hidden flex items-center gap-2">
      <ThemeToggle />
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close menu" : "Open menu"}
        className="p-2 rounded-md border border-border bg-surface-subtle text-muted hover:text-foreground transition-all duration-150 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500/50"
      >
        <span className="sr-only">Toggle Menu</span>
        <span className="relative w-5 h-5 block">
          <Menu
            className={cn(
              "w-5 h-5 absolute inset-0 transition-transform duration-200",
              isOpen ? "opacity-0 rotate-90 scale-75" : "opacity-100 rotate-0 scale-100"
            )}
          />
          <X
            className={cn(
              "w-5 h-5 absolute inset-0 transition-transform duration-200",
              isOpen ? "opacity-100 rotate-0 scale-100" : "opacity-0 -rotate-90 scale-75"
            )}
          />
        </span>
      </button>

      {isMounted && (
        <div
          className={cn(
            "fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity duration-200",
            isOpen ? "opacity-100" : "pointer-events-none opacity-0"
          )}
          onClick={closeMenu}
        >
          <div
            className={cn(
              "fixed top-0 right-0 bottom-0 w-3/4 max-w-xs bg-surface border-l border-border p-6 flex flex-col justify-between shadow-2xl transition-transform duration-200 ease-out",
              isOpen ? "translate-x-0" : "translate-x-full"
            )}
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-border">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-emerald-500" />
                  <span className="font-mono-meta text-xs font-semibold uppercase tracking-wider text-foreground">
                    Navigation
                  </span>
                </div>
                <button
                  onClick={closeMenu}
                  aria-label="Close menu"
                  className="p-1.5 rounded text-muted hover:text-foreground hover:bg-surface-subtle transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Links */}
              <nav className="flex flex-col gap-2 mt-6">
                {siteConfig.navItems.map((item, idx) => {
                  const isActive = pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      style={{ transitionDelay: isOpen ? `${idx * 35}ms` : "0ms" }}
                      className={cn(
                        "flex items-center justify-between px-3 py-2.5 rounded-md text-sm font-medium transition-all duration-150",
                        isActive
                          ? "bg-surface-subtle text-foreground border border-border font-semibold shadow-xs"
                          : "text-muted hover:text-foreground hover:bg-surface-subtle/50 active:translate-x-1"
                      )}
                    >
                      <span>{item.label}</span>
                      {isActive && (
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                      )}
                    </Link>
                  );
                })}
              </nav>
            </div>

            {/* Bottom info */}
            <div className="pt-6 border-t border-border space-y-4">
              <div className="text-xs font-mono-meta text-muted space-y-1">
                <p className="text-foreground font-medium">{siteConfig.name}</p>
                <p className="text-[11px] text-muted/80">{siteConfig.location}</p>
              </div>
              <div className="flex items-center gap-3 text-xs">
                <a
                  href={siteConfig.links.github}
                  target="_blank"
                  rel="noreferrer"
                  className="text-muted hover:text-foreground flex items-center gap-1 font-mono-meta transition-colors"
                >
                  GitHub <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
