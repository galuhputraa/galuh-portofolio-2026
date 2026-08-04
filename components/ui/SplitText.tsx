"use client";

import { m, useReducedMotion } from "framer-motion";
import { charReveal, stagger } from "@/lib/motion";

type SplitTextProps = {
  text: string;
  className?: string;
  /** Seconds before the first character starts. */
  delay?: number;
  staggerChildren?: number;
};

/**
 * Reveals a headline one character at a time. The visible characters are
 * aria-hidden and the real string is exposed once via sr-only, so assistive
 * tech reads "Galuh Putra Warman" instead of spelling it out letter by letter.
 */
export function SplitText({
  text,
  className = "",
  delay = 0,
  staggerChildren = 0.03,
}: SplitTextProps) {
  const reduce = useReducedMotion();

  if (reduce) {
    return <span className={className}>{text}</span>;
  }

  const words = text.split(" ");

  return (
    <m.span
      className={className}
      initial="hidden"
      animate="show"
      variants={stagger(delay, staggerChildren)}
      style={{ display: "inline-block", perspective: 800 }}
    >
      <span className="sr-only">{text}</span>
      {words.map((word, wordIndex) => (
        <span
          key={`${word}-${wordIndex}`}
          aria-hidden
          className="inline-block whitespace-nowrap"
        >
          {[...word].map((char, charIndex) => (
            <m.span
              key={`${char}-${charIndex}`}
              variants={charReveal}
              className="inline-block will-change-transform"
            >
              {char}
            </m.span>
          ))}
          {wordIndex < words.length - 1 ? (
            <span className="inline-block">&nbsp;</span>
          ) : null}
        </span>
      ))}
    </m.span>
  );
}
