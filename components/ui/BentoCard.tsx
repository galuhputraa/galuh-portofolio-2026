"use client";

import {
  m,
  useMotionTemplate,
  useMotionValue,
  useReducedMotion,
  useSpring,
} from "framer-motion";
import { useRef, type PointerEvent, type ReactNode } from "react";
import { fadeUp, reducedVariants, spring } from "@/lib/motion";
import { useFinePointer } from "@/lib/use-media-query";

type BentoCardProps = {
  children: ReactNode;
  className?: string;
  /** Adds pointer-tracked 3D tilt + a glow that follows the cursor. */
  tilt?: boolean;
  /** Max rotation in degrees at the card's corners. */
  maxTilt?: number;
  as?: "div" | "article" | "section" | "li";
};

/**
 * The building block of every bento tile: surface, border, hover lift and an
 * optional pointer-driven 3D tilt.
 *
 * Two things keep this smooth:
 *
 * 1. The card's box is measured once per hover, on pointerenter, and cached.
 *    Calling getBoundingClientRect() inside pointermove forces a synchronous
 *    layout on every single event — at 120Hz that is the difference between
 *    a locked frame budget and visible stutter.
 * 2. Everything animated here is a MotionValue, so pointer movement never
 *    triggers a React render. Only transform/opacity/background-image change,
 *    so nothing hits layout.
 *
 * Tilt and hover-scale are gated behind a fine pointer. On a touch screen a tap
 * fires pointermove but never pointerleave, so the card would tilt and stay
 * tilted with no way to reset it.
 */
export function BentoCard({
  children,
  className = "",
  tilt = false,
  maxTilt = 8,
  as = "div",
}: BentoCardProps) {
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const interactive = finePointer && !reduce;
  const enableTilt = tilt && interactive;

  const box = useRef<DOMRect | null>(null);

  const gx = useMotionValue(50);
  const gy = useMotionValue(50);
  const rotateX = useSpring(0, spring.tilt);
  const rotateY = useSpring(0, spring.tilt);
  const glowOpacity = useSpring(0, spring.snappy);

  const glow = useMotionTemplate`radial-gradient(420px circle at ${gx}% ${gy}%, var(--accent-glow), transparent 65%)`;

  function handlePointerEnter(event: PointerEvent<HTMLElement>) {
    if (!enableTilt) return;
    // measured once per hover, then reused for every move
    box.current = event.currentTarget.getBoundingClientRect();
    glowOpacity.set(1);
  }

  function handlePointerMove(event: PointerEvent<HTMLElement>) {
    if (!enableTilt) return;
    const rect = box.current;
    if (!rect) return;

    const nx = (event.clientX - rect.left) / rect.width;
    const ny = (event.clientY - rect.top) / rect.height;

    gx.set(nx * 100);
    gy.set(ny * 100);
    rotateY.set((nx - 0.5) * maxTilt * 2);
    rotateX.set(-(ny - 0.5) * maxTilt * 2);
  }

  function handlePointerLeave() {
    if (!enableTilt) return;
    box.current = null;
    rotateX.set(0);
    rotateY.set(0);
    glowOpacity.set(0);
  }

  const MotionTag = m[as];

  return (
    <MotionTag
      variants={reduce ? reducedVariants : fadeUp}
      onPointerEnter={enableTilt ? handlePointerEnter : undefined}
      onPointerMove={enableTilt ? handlePointerMove : undefined}
      onPointerLeave={enableTilt ? handlePointerLeave : undefined}
      style={
        enableTilt ? { rotateX, rotateY, transformPerspective: 1000 } : undefined
      }
      whileHover={interactive ? { scale: 1.015 } : undefined}
      transition={spring.snappy}
      className={`group relative isolate overflow-hidden rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] transition-colors duration-200 hover:border-[var(--border-strong)] ${className}`}
    >
      {enableTilt ? (
        <m.span
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ backgroundImage: glow, opacity: glowOpacity }}
        />
      ) : null}
      {children}
    </MotionTag>
  );
}
