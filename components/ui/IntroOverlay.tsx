"use client";

import { AnimatePresence, m, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { ease } from "@/lib/motion";
import { profile } from "@/lib/data";

/**
 * Full-bleed intro curtain that wipes upward on first paint. Skipped entirely
 * under reduced motion, and it releases the scroll lock as soon as it exits so
 * it can never trap the page.
 */
export function IntroOverlay() {
  const reduce = useReducedMotion();
  const [dismissed, setDismissed] = useState(false);
  // Reduced motion skips the curtain entirely rather than dismissing it later.
  const visible = !reduce && !dismissed;

  useEffect(() => {
    if (reduce) return;
    document.body.style.overflow = "hidden";
    const timer = window.setTimeout(() => setDismissed(true), 1100);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflow = "";
    };
  }, [reduce]);

  useEffect(() => {
    if (!visible) document.body.style.overflow = "";
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
          transition={{ duration: 0.8, ease: ease.inOut }}
        >
          <m.span
            className="max-w-[14ch] px-6 text-center font-display text-[clamp(1.9rem,6vw,4rem)] font-bold leading-[1.05] tracking-[-0.04em] text-balance"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14, transition: { duration: 0.35 } }}
            transition={{ duration: 0.55, ease: ease.out }}
          >
            {profile.name}
            <span className="text-[var(--accent-text)]">.</span>
          </m.span>
        </m.div>
      ) : null}
    </AnimatePresence>
  );
}
