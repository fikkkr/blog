"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/data/site";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { CommandPalette } from "@/components/command-palette/CommandPalette";
import { MobileNav } from "@/components/layout/MobileNav";
import { Container } from "@/components/layout/Container";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-200 border-b",
        scrolled
          ? "border-border bg-background/95 backdrop-blur-md shadow-xs py-0"
          : "border-border/60 bg-background/80 backdrop-blur-sm"
      )}
    >
      <Container size="wide">
        <div
          className={cn(
            "flex items-center justify-between transition-all duration-200",
            scrolled ? "h-13" : "h-14"
          )}
        >
          {/* Logo / Identifier */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="group flex items-center gap-2 font-mono-meta text-sm font-semibold tracking-tight text-foreground transition-colors hover:text-emerald-600 dark:hover:text-emerald-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60 group-hover:opacity-100" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500 transition-transform group-hover:scale-110" />
              </span>
              <span className="transition-transform duration-150 group-hover:translate-x-0.5">
                fik.dev
              </span>
            </Link>

            <span className="hidden lg:inline-block text-xs font-mono-meta text-muted/50">
              /
            </span>
            <span className="hidden lg:inline-block text-xs font-mono-meta text-muted hover:text-foreground/80 transition-colors">
              {siteConfig.author}
            </span>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            {siteConfig.navItems.map((item) => {
              const isActive =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "group relative px-3 py-1.5 rounded-md text-xs transition-all duration-200 flex items-center gap-1.5",
                    isActive
                      ? "text-foreground font-semibold bg-surface-subtle border border-border/80 shadow-xs"
                      : "text-muted hover:text-foreground hover:bg-surface-subtle/60"
                  )}
                >
                  <span className="relative z-10 transition-transform duration-150 group-hover:-translate-y-0.5">
                    {item.label}
                  </span>
                  {isActive ? (
                    <span className="w-1 h-1 rounded-full bg-emerald-500 transition-transform duration-200 group-hover:scale-125" />
                  ) : (
                    <span className="w-1 h-1 rounded-full bg-transparent group-hover:bg-muted/40 transition-colors" />
                  )}
                  <span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-x-2 -bottom-px h-px origin-center bg-emerald-500 transition-transform duration-200",
                      isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-50"
                    )}
                  />
                  {isActive && (
                    <span className="sr-only">(current page)</span>
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Action Items: Command Palette & Theme Toggle */}
          <div className="hidden md:flex items-center gap-2">
            <CommandPalette />
            <ThemeToggle />
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </Container>
    </header>
  );
}
