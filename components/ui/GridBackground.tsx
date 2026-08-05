"use client";

import {
  m,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import { useWideViewport } from "@/lib/use-media-query";

/**
 * Fixed dot-grid backdrop with a slow bloom that drifts as the page scrolls.
 * Decorative, so it is aria-hidden.
 *
 * Two deliberate limits:
 *
 * - The scroll offset runs through a spring rather than being bound straight
 *   to scrollYProgress. Raw scroll binding moves the layer 1:1 with the wheel,
 *   which reads as jitter on trackpads and on any device with coarse scroll
 *   steps. The spring gives it weight and absorbs the steps.
 * - The bloom is a 520px element under a 120px blur. Compositing that on every
 *   frame is one of the most expensive things a phone GPU can be asked to do,
 *   so it only renders on wide viewports. Small screens keep the grid, which
 *   is nearly free, and lose an effect nobody would miss.
 */
export function GridBackground() {
  const reduce = useReducedMotion();
  const wide = useWideViewport();
  const { scrollYProgress } = useScroll();

  const smooth = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 24,
    restDelta: 0.0005,
  });

  const glowY = useTransform(smooth, [0, 1], ["-10%", "60%"]);
  const glowX = useTransform(smooth, [0, 0.5, 1], ["10%", "70%", "25%"]);
  const gridY = useTransform(smooth, [0, 1], [0, -40]);

  const animate = !reduce;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
    >
      <m.div
        className="dot-grid absolute inset-0 h-[120%]"
        style={animate ? { y: gridY } : undefined}
      />
      {animate && wide ? (
        <m.div
          className="absolute h-[520px] w-[520px] rounded-full blur-[120px]"
          style={{
            top: glowY,
            left: glowX,
            background:
              "radial-gradient(circle, var(--accent-glow), transparent 70%)",
          }}
        />
      ) : null}
      {/* keeps text legible over the bloom */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--bg)]/40 to-[var(--bg)]/80" />
    </div>
  );
}
