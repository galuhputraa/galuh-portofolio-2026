"use client";

import { m, useReducedMotion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { LogoChip } from "@/components/ui/LogoChip";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/lib/data";
import { ease, viewport } from "@/lib/motion";

export function Experience() {
  const reduce = useReducedMotion();
  const listRef = useRef<HTMLOListElement>(null);

  const { scrollYProgress } = useScroll({
    target: listRef,
    offset: ["start 70%", "end 60%"],
  });
  const spineScale = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 34,
    restDelta: 0.001,
  });

  return (
    <section
      id="experience"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <SectionHeading
        index="02"
        title="Experience"
        description="Three and a half years across enterprise consulting and banking technology."
      />

      <div className="relative">
        {/* Spine — track plus a fill that grows with scroll. */}
        <div
          aria-hidden
          className="absolute left-[23px] top-2 hidden h-[calc(100%-1rem)] w-px bg-[var(--border)] sm:block"
        />
        {!reduce && (
          <m.div
            aria-hidden
            className="absolute left-[23px] top-2 hidden h-[calc(100%-1rem)] w-px origin-top bg-[var(--accent)] sm:block"
            style={{ scaleY: spineScale }}
          />
        )}

        <ol ref={listRef} className="flex flex-col gap-3">
          {experience.map((role, index) => (
            <m.li
              key={role.id}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{
                duration: 0.6,
                ease: ease.out,
                delay: reduce ? 0 : index * 0.06,
              }}
              className="relative"
            >
              <article className="group grid grid-cols-1 gap-4 rounded-[var(--radius-card)] border border-transparent bg-[var(--surface)]/60 p-5 transition-colors duration-300 hover:border-[var(--border-strong)] hover:bg-[var(--surface)] sm:grid-cols-[48px_1fr] sm:gap-6 sm:p-6 md:p-7">
                <div className="relative z-10">
                  <LogoChip
                    src={role.logo}
                    alt={role.logoAlt}
                    size={48}
                    bleed={role.logo.includes("ilmuone")}
                  />
                </div>

                <div className="min-w-0">
                  <p className="font-mono text-xs uppercase tracking-[0.12em] text-[var(--fg-faint)]">
                    {role.period}
                  </p>
                  <h3 className="mt-2 font-display text-[19px] font-bold leading-snug tracking-[-0.02em] md:text-[21px]">
                    {role.role}
                  </h3>
                  <p className="mt-1 text-[15px] font-semibold text-[var(--accent-text)]">
                    {role.company}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--fg-muted)]">
                    {role.location}
                  </p>

                  {role.description ? (
                    <p className="mt-4 max-w-[68ch] text-[15px] leading-relaxed text-[var(--fg-muted)]">
                      {role.description}
                    </p>
                  ) : null}

                  {role.highlights ? (
                    <ul className="mt-4 flex flex-col gap-2">
                      {role.highlights.map((highlight) => (
                        <li
                          key={highlight}
                          className="flex gap-3 text-[14.5px] leading-relaxed text-[var(--fg-muted)]"
                        >
                          <span
                            aria-hidden
                            className="mt-[9px] h-1 w-1 shrink-0 rounded-full bg-[var(--accent)]"
                          />
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
              </article>
            </m.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
