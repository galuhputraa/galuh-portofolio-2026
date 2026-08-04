"use client";

import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useSyncExternalStore } from "react";

const noopSubscribe = () => () => {};

/** Light/dark switch. The icon stays neutral until the client takes over, so
 *  the server and first client render agree. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      aria-label={
        mounted
          ? isDark
            ? "Switch to light theme"
            : "Switch to dark theme"
          : "Toggle theme"
      }
      className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-[var(--border)] bg-[var(--surface)] text-[var(--fg-muted)] transition-colors duration-200 hover:border-[var(--border-strong)] hover:text-[var(--fg)]"
    >
      {mounted && !isDark ? (
        <Moon size={17} strokeWidth={1.75} aria-hidden />
      ) : (
        <Sun size={17} strokeWidth={1.75} aria-hidden />
      )}
    </button>
  );
}
