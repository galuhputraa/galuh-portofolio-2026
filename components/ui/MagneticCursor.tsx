"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect } from "react";
import { spring } from "@/lib/motion";
import { useFinePointer } from "@/lib/use-media-query";

const INTERACTIVE = "a, button, [role='button'], input, summary";

/**
 * A difference-blended dot that springs toward the pointer and swells over
 * anything interactive.
 *
 * Position AND scale are MotionValues, so a pointermove never re-renders
 * React. The previous version held `hovering` in useState, which meant every
 * mouse movement scheduled a render of this component — roughly sixty a
 * second while the cursor was in motion, all to set a value the compositor
 * could have handled alone.
 *
 * Never mounts on touch devices or under reduced motion, and is aria-hidden.
 */
export function MagneticCursor() {
  const reduce = useReducedMotion();
  const finePointer = useFinePointer();
  const enabled = finePointer && !reduce;

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, spring.cursor);
  const sy = useSpring(y, spring.cursor);
  const scale = useSpring(1, spring.snappy);
  const opacity = useSpring(0, spring.snappy);

  useEffect(() => {
    if (!enabled) return;

    function onMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      opacity.set(1);

      const target = event.target as Element | null;
      // MotionValue.set is a no-op when the value is unchanged, so this is
      // safe to call on every move.
      scale.set(target?.closest?.(INTERACTIVE) ? 2.6 : 1);
    }

    function onLeave() {
      opacity.set(0);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, x, y, scale, opacity]);

  if (!enabled) return null;

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] h-4 w-4 rounded-full bg-[var(--accent)] mix-blend-difference"
      style={{
        x: sx,
        y: sy,
        scale,
        opacity,
        translateX: "-50%",
        translateY: "-50%",
      }}
    />
  );
}
