"use client";

import { m, useMotionValueEvent, useScroll } from "framer-motion";
import { useState } from "react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { nav, profile } from "@/lib/data";
import { ease } from "@/lib/motion";

/** Floating nav pill. Condenses once the hero is scrolled past. */
export function Nav() {
  const { scrollY } = useScroll();
  const [condensed, setCondensed] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setCondensed(latest > 120);
  });

  return (
    <header className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6">
      <m.nav
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.6, ease: ease.out }}
        className={`mx-auto flex max-w-[1200px] items-center justify-between gap-4 rounded-full border px-3 py-2 transition-colors duration-300 ${
          condensed
            ? "border-[var(--border)] bg-[var(--bg-elevated)]/85 backdrop-blur-xl"
            : "border-transparent bg-transparent"
        }`}
      >
        <a
          href="#top"
          className="ml-2 font-display text-sm font-bold tracking-[-0.02em]"
          aria-label={`${profile.name} — back to top`}
        >
          {profile.firstName}
          <span className="text-[var(--accent-text)]">.</span>
        </a>

        <ul className="hidden items-center gap-1 md:flex">
          {nav.map((item) => (
            <li key={item.href}>
              <a
                href={item.href}
                className="inline-flex min-h-9 items-center rounded-full px-3.5 text-sm text-[var(--fg-muted)] transition-colors duration-200 hover:bg-[var(--surface-hover)] hover:text-[var(--fg)]"
              >
                {item.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/* Stays subordinate while the hero's own CTA is on screen, then
              takes over as the primary action once the hero scrolls away. */}
          <a
            href="#contact"
            className={`hidden min-h-9 items-center rounded-full px-4 text-sm font-semibold transition-colors duration-300 sm:inline-flex ${
              condensed
                ? "bg-[var(--pill)] text-[var(--pill-fg)] hover:opacity-90"
                : "border border-[var(--border-strong)] text-[var(--fg-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--fg)]"
            }`}
          >
            Get in touch
          </a>
          <ThemeToggle />
        </div>
      </m.nav>
    </header>
  );
}
