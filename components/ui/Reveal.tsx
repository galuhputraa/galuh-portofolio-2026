"use client";

import { m, useReducedMotion, type Variants } from "framer-motion";
import type { ElementType, ReactNode } from "react";
import { fadeUp, reducedVariants, stagger, viewport } from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  /** Seconds before this element starts revealing. */
  delay?: number;
  as?: ElementType;
  variants?: Variants;
};

/** Fades + lifts an element into view once, or plain-fades under reduced motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = "div",
  variants,
}: RevealProps) {
  const reduce = useReducedMotion();
  const Tag = m[as as keyof typeof m] as ElementType;

  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      transition={{ delay: reduce ? 0 : delay }}
      variants={reduce ? reducedVariants : (variants ?? fadeUp)}
    >
      {children}
    </Tag>
  );
}

type RevealGroupProps = {
  children: ReactNode;
  className?: string;
  delayChildren?: number;
  staggerChildren?: number;
};

/** Parent that staggers any `Reveal`/`m.*` children sharing the same variants. */
export function RevealGroup({
  children,
  className,
  delayChildren = 0,
  staggerChildren = 0.04,
}: RevealGroupProps) {
  const reduce = useReducedMotion();

  return (
    <m.div
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      variants={reduce ? {} : stagger(delayChildren, staggerChildren)}
    >
      {children}
    </m.div>
  );
}
