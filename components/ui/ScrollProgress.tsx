"use client";

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";

/** 2px yellow bar pinned to the top edge, tracking page scroll. */
export function ScrollProgress() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 220,
    damping: 40,
    restDelta: 0.001,
  });

  if (reduce) return null;

  return (
    <m.div
      aria-hidden
      className="fixed inset-x-0 top-0 z-50 h-[2px] origin-left bg-[var(--accent)]"
      style={{ scaleX }}
    />
  );
}
