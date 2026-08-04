"use client";

import { m, useReducedMotion } from "framer-motion";
import { ease, viewport } from "@/lib/motion";

type SectionHeadingProps = {
  /** Monospace index label, e.g. "02". */
  index: string;
  title: string;
  description?: string;
};

/** Section header with a clip-path wipe on the title and a growing rule. */
export function SectionHeading({ index, title, description }: SectionHeadingProps) {
  const reduce = useReducedMotion();

  return (
    <div className="mb-10 md:mb-14">
      <m.div
        initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.5, ease: ease.out }}
        className="mb-4 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-[var(--accent-text)]"
      >
        <span>{index}</span>
        <m.span
          aria-hidden
          className="h-px w-12 origin-left bg-[var(--accent)]"
          initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: ease.out, delay: 0.1 }}
        />
      </m.div>

      <m.h2
        initial={
          reduce
            ? { opacity: 0 }
            : { opacity: 0, clipPath: "inset(0 100% 0 0)", y: 8 }
        }
        whileInView={{ opacity: 1, clipPath: "inset(0 0% 0 0)", y: 0 }}
        viewport={viewport}
        transition={{ duration: 0.7, ease: ease.out }}
        className="font-display text-[clamp(1.9rem,4.5vw,3rem)] font-bold leading-[1.05] tracking-[-0.03em]"
      >
        {title}
      </m.h2>

      {description ? (
        <m.p
          initial={reduce ? { opacity: 0 } : { opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewport}
          transition={{ duration: 0.6, ease: ease.out, delay: 0.12 }}
          className="mt-4 max-w-[62ch] text-[15px] leading-relaxed text-[var(--fg-muted)] md:text-base"
        >
          {description}
        </m.p>
      ) : null}
    </div>
  );
}
