"use client";

import { animate, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

type AnimatedCounterProps = {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
};

/**
 * Counts up from 0 the first time it scrolls into view. Renders the final
 * value immediately under reduced motion, and always keeps the true value in
 * the accessible name so screen readers never hear a partial number.
 */
export function AnimatedCounter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.6,
  className = "",
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [counted, setCounted] = useState(0);
  // Under reduced motion the final value is what renders — no effect runs.
  const display = reduce ? value : counted;

  useEffect(() => {
    if (!inView || reduce) return;
    const controls = animate(0, value, {
      duration,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setCounted(Math.round(latest)),
    });
    return () => controls.stop();
  }, [inView, reduce, value, duration]);

  return (
    <span
      ref={ref}
      className={`tabular ${className}`}
      aria-label={`${prefix}${value}${suffix}`}
    >
      <span aria-hidden>
        {prefix}
        {display}
        {suffix}
      </span>
    </span>
  );
}
