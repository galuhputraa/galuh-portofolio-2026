"use client";

import { m, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { useEffect, useState, useSyncExternalStore } from "react";
import { spring } from "@/lib/motion";

const POINTER_FINE = "(pointer: fine)";

function subscribePointer(onChange: () => void) {
  const query = window.matchMedia(POINTER_FINE);
  query.addEventListener("change", onChange);
  return () => query.removeEventListener("change", onChange);
}

/**
 * A difference-blended dot that springs toward the pointer and swells over
 * anything interactive. Desktop pointers only — it never mounts on touch
 * devices or under reduced motion, and it is fully aria-hidden.
 */
export function MagneticCursor() {
  const reduce = useReducedMotion();
  // false on the server and on touch devices, so the cursor never mounts there
  const enabled = useSyncExternalStore(
    subscribePointer,
    () => window.matchMedia(POINTER_FINE).matches,
    () => false,
  );
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, spring.cursor);
  const sy = useSpring(y, spring.cursor);

  useEffect(() => {
    if (!enabled || reduce) return;

    const INTERACTIVE = "a, button, [role='button'], input, summary";

    function onMove(event: PointerEvent) {
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target as Element | null;
      setHovering(Boolean(target?.closest?.(INTERACTIVE)));
    }
    function onLeave() {
      x.set(-100);
      y.set(-100);
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, reduce, x, y]);

  if (!enabled || reduce) return null;

  return (
    <m.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-4 w-4 rounded-full bg-[var(--accent)] mix-blend-difference md:block"
      style={{ x: sx, y: sy, translateX: "-50%", translateY: "-50%" }}
      animate={{ scale: hovering ? 2.6 : 1, opacity: hovering ? 0.85 : 1 }}
      transition={spring.snappy}
    />
  );
}
