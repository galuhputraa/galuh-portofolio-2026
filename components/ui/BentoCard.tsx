"use client";

import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import type { PointerEvent, ReactNode } from "react";
import { fadeUp, reducedVariants, spring } from "@/lib/motion";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  /** Adds pointer-tracked 3D tilt + a yellow glow that follows the cursor. */
  tilt?: boolean;
  /** Max rotation in degrees at the card's corners. */
  maxTilt?: number;
  as?: "div" | "article" | "section" | "li";
};

/**
 * The building block of every bento tile: surface, border, hover lift and an
 * optional pointer-driven 3D tilt. Only transform/opacity/background-image
 * animate, so nothing here triggers layout.
 */
export function BentoCard({
  children,
  className = "",
  tilt = false,
  maxTilt = 8,
  as = "div",
}: BentoCardProps) {
  const reduce = useReducedMotion();
  const enableTilt = tilt && !reduce;

  // -0.5 .. 0.5, relative to the card's own box
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  // 0 .. 100%, for the glow gradient
  const gx = useMotionValue(50);
  const gy = useMotionValue(50);

  const rotateX = useSpring(0, spring.tilt);
  const rotateY = useSpring(0, spring.tilt);
  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, var(--accent-glow), transparent 65%)`;

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!enableTilt) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;

    px.set(nx - 0.5);
    py.set(ny - 0.5);
    gx.set(nx * 100);
    gy.set(ny * 100);

    rotateY.set((nx - 0.5) * maxTilt * 2);
    rotateX.set(-(ny - 0.5) * maxTilt * 2);
  }

  function handlePointerLeave() {
    rotateX.set(0);
    rotateY.set(0);
    gx.set(50);
    gy.set(50);
  }

  const MotionTag = m[as];

  return (
    <MotionTag
      variants={reduce ? reducedVariants : fadeUp}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={
        enableTilt
          ? { rotateX, rotateY, transformPerspective: 1000 }
          : undefined
      }
      whileHover={reduce ? undefined : { scale: 1.015 }}
      transition={spring.snappy}
      className={`group relative isolate overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] transition-colors duration-200 hover:border-[var(--border-strong)] ${className}`}
    >
      {enableTilt ? (
        <m.span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ backgroundImage: glow }}
        />
      ) : null}
      {children}
    </MotionTag>
  );
}
