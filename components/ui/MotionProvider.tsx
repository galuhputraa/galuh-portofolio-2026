"use client";

import { LazyMotion, domAnimation } from "framer-motion";
import type { ReactNode } from "react";

/**
 * Loads only the DOM animation feature set (~18kb) instead of the full
 * framer-motion bundle (~34kb). Every animated component in this app uses
 * `m.*` rather than `motion.*` so it stays inside this budget.
 */
export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={domAnimation} strict>
      {children}
    </LazyMotion>
  );
}
