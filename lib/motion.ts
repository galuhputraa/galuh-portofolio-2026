import type { Transition, Variants } from "framer-motion";

/**
 * Shared motion tokens. Every animation on the site pulls its easing and
 * duration from here so the whole page moves with one rhythm.
 *
 * Rules enforced across components:
 *  - transform / opacity only (never width, height, top, left)
 *  - enter 300-600ms, exit ~65% of enter
 *  - prefers-reduced-motion collapses reveals to a plain opacity swap
 */

/** Custom cubic-beziers. `out` is the default for anything entering. */
export const ease = {
  out: [0.16, 1, 0.3, 1],
  inOut: [0.65, 0, 0.35, 1],
  in: [0.7, 0, 0.84, 0],
} as const;

export const spring = {
  soft: { type: "spring", stiffness: 120, damping: 18, mass: 0.9 },
  snappy: { type: "spring", stiffness: 300, damping: 30 },
  cursor: { type: "spring", stiffness: 500, damping: 40, mass: 0.4 },
  tilt: { type: "spring", stiffness: 220, damping: 22, mass: 0.6 },
} satisfies Record<string, Transition>;

/** Standard viewport config — reveal once, slightly before the element lands. */
export const viewport = { once: true, margin: "-80px" } as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: ease.out },
  },
};

/** Parent wrapper that staggers its children. 40ms matches the MD guidance. */
export const stagger = (delayChildren = 0, staggerChildren = 0.04): Variants => ({
  hidden: {},
  show: { transition: { delayChildren, staggerChildren } },
});

/** Per-character hero name reveal. */
export const charReveal: Variants = {
  hidden: { opacity: 0, y: "0.5em", rotateX: -60 },
  show: {
    opacity: 1,
    y: "0em",
    rotateX: 0,
    transition: spring.soft,
  },
};

/** Reduced-motion replacement: same variant names, no movement. */
export const reducedVariants: Variants = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.01 } },
};
