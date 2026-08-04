"use client";

import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";

/**
 * Fixed dot-grid backdrop with a slow yellow bloom that drifts as the page
 * scrolls. Purely decorative, so it is aria-hidden and freezes under reduced
 * motion (the grid stays, the drift stops).
 */
export function GridBackground() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const glowY = useTransform(scrollYProgress, [0, 1], ["-10%", "60%"]);
  const glowX = useTransform(scrollYProgress, [0, 0.5, 1], ["10%", "70%", "25%"]);
  const gridY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <m.div
        className="dot-grid absolute inset-0 h-[120%]"
        style={reduce ? undefined : { y: gridY }}
      />
      {!reduce && (
        <m.div
          className="absolute h-[520px] w-[520px] rounded-full blur-[120px]"
          style={{
            top: glowY,
            left: glowX,
            background:
              "radial-gradient(circle, var(--accent-glow), transparent 70%)",
          }}
        />
      )}
      {/* keeps text legible over the bloom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/40 to-[var(--bg)]/80" />
    </div>
  );
}
