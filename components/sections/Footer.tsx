"use client";

import { m, useReducedMotion } from "framer-motion";
import { Reveal } from "@/components/ui/Reveal";
import { profile } from "@/lib/data";
import { ease, viewport } from "@/lib/motion";

export function Footer() {
  const reduce = useReducedMotion();

  return (
    <footer className="mx-auto w-full max-w-[1200px] px-4 pb-14 pt-8 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center gap-8 border-t border-[var(--border)] pt-14">
        <Reveal>
          <div className="flex items-center gap-4">
            <m.span
              aria-hidden
              className="h-px w-10 origin-right bg-[var(--fg-faint)]"
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: ease.out }}
            />
            <span
              className="text-[clamp(3.5rem,11vw,4.6rem)] leading-none"
              style={{ fontFamily: "var(--font-script)" }}
            >
              {profile.monogram}
            </span>
            <m.span
              aria-hidden
              className="h-px w-10 origin-left bg-[var(--fg-faint)]"
              initial={reduce ? { scaleX: 1 } : { scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={viewport}
              transition={{ duration: 0.6, ease: ease.out }}
            />
          </div>
        </Reveal>

        <Reveal delay={0.08}>
          <p className="text-center text-[13px] text-[var(--fg-faint)]">
            © {new Date().getFullYear()} {profile.name} · {profile.location}
          </p>
        </Reveal>
      </div>
    </footer>
  );
}
