"use client";

import { useEffect } from "react";

/**
 * Guarantees a reload lands at the top of the page.
 *
 * Browsers default to `history.scrollRestoration = "auto"`, so refreshing
 * halfway down restores that offset. On this site the intro curtain covers the
 * viewport for the first second, so the restore is invisible while it happens
 * and then the curtain lifts on a mid-page section — the visitor has no idea
 * where they are. Mobile Safari makes it worse: `body { overflow: hidden }`
 * does not reliably lock scrolling there, so the restore and the lock fight
 * each other.
 *
 * The inline script in `app/layout.tsx` switches restoration off before the
 * browser can act. This is the belt-and-braces half: if a browser restored
 * anyway, put it back at the top.
 *
 * A deep link keeps its anchor — `/#work` shared in a message must still land
 * on Selected work.
 */
export function ScrollReset() {
  useEffect(() => {
    if (window.location.hash) return;
    // `scroll-behavior: smooth` is set globally; this jump must not animate.
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  return null;
}
