"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { ease } from "@/lib/motion";
import { profile } from "@/lib/data";

/**
 * Full-bleed intro curtain that wipes upward on first paint. Runs on every
 * page load — it is the site's signature moment.
 *
 * Skipped entirely under reduced motion, and it releases the scroll lock the
 * moment it starts wiping (not when the wipe finishes), so the page is
 * interactive underneath while the curtain is still animating away.
 */

/** How long the name holds before the curtain starts lifting. */
const HOLD_MS = 1500;

const noopSubscribe = () => () => {};

export function IntroOverlay() {
  const reduce = useReducedMotion();

  // False on the server and on the first client render, so the markup matches
  // and hydration stays quiet. The curtain only appears once React has taken
  // over — which is also when it can actually animate.
  const mounted = useSyncExternalStore(
    noopSubscribe,
    () => true,
    () => false,
  );

  const [dismissed, setDismissed] = useState(false);
  const visible = mounted && !reduce && !dismissed;

  // One effect owns the scroll lock. Two of them racing over the same inline
  // style meant an unlucky ordering could leave the page permanently locked.
  useEffect(() => {
    if (!visible) {
      document.body.style.removeProperty("overflow");
      return;
    }
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.removeProperty("overflow");
    };
  }, [visible]);

  useEffect(() => {
    if (!visible) return;
    const timer = window.setTimeout(() => setDismissed(true), HOLD_MS);
    return () => window.clearTimeout(timer);
  }, [visible]);

  if (reduce) return null;

  return (
    <AnimatePresence>
      {visible ? (
        <m.div
          key="intro"
          aria-hidden
          className="fixed inset-0 z-[80] grid place-items-center bg-[var(--bg)]"
          initial={{ clipPath: "inset(0 0 0% 0)" }}
          exit={{ clipPath: "inset(0 0 100% 0)" }}
          transition={{ duration: 1.05, ease: ease.inOut }}
        >
          <m.span
            className="max-w-[14ch] px-6 text-center font-display text-[clamp(1.9rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-balance"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16, transition: { duration: 0.45 } }}
            transition={{ duration: 0.85, ease: ease.out }}
          >
            {profile.name}
            <span className="text-[var(--accent-text)]">.</span>
          </m.span>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
