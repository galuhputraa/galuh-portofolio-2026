"use client";

import Image from "next/image";
import { m, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowUpRight, MapPin } from "lucide-react";
import { useRef } from "react";
import { AnimatedCounter } from "@/components/ui/AnimatedCounter";
import { BentoCard } from "@/components/ui/BentoCard";
import { SplitText } from "@/components/ui/SplitText";
import { links, profile, stats } from "@/lib/data";
import { ease, fadeUp, reducedVariants, stagger } from "@/lib/motion";

export function Hero() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const photoY = useTransform(scrollYProgress, [0, 1], [0, 40]);

  return (
    <section
      ref={sectionRef}
      className="mx-auto w-full max-w-[1200px] px-4 pt-28 sm:px-6 md:pt-36 lg:px-8"
    >
      <m.div
        initial="hidden"
        animate="show"
        variants={reduce ? {} : stagger(0.9, 0.08)}
        className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12"
      >
        {/* Profile — the anchor tile */}
        <BentoCard
          tilt
          maxTilt={5}
          className="md:col-span-6 lg:col-span-7 lg:row-span-2"
        >
          <div className="flex h-full flex-col justify-between gap-8 p-6 sm:p-8 md:p-10">
            <div className="flex items-start gap-5">
              <m.div
                style={reduce ? undefined : { y: photoY }}
                className="relative shrink-0"
              >
                <Image
                  src={profile.photo}
                  alt={`Portrait of ${profile.name}`}
                  width={96}
                  height={96}
                  priority
                  sizes="(max-width: 640px) 72px, 96px"
                  className="h-[72px] w-[72px] rounded-full object-cover object-[50%_22%] ring-1 ring-[var(--border-strong)] sm:h-24 sm:w-24"
                />
                <span
                  aria-hidden
                  className="absolute -inset-1 -z-10 rounded-full bg-[var(--accent-glow)] blur-lg"
                />
              </m.div>

              <div className="pt-1">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--accent-text)]">
                  {profile.role}
                </p>
                <p className="mt-2 flex items-center gap-1.5 text-sm text-[var(--fg-muted)]">
                  <MapPin size={14} strokeWidth={1.75} aria-hidden />
                  {profile.location}
                </p>
              </div>
            </div>

            <h1 className="font-display text-[clamp(2.5rem,8vw,5rem)] font-bold leading-[0.95] tracking-[-0.04em]">
              <SplitText text={profile.firstName} delay={1.0} />
              <br />
              <span className="text-[var(--fg-muted)]">
                <SplitText text={profile.lastName} delay={1.2} />
              </span>
            </h1>

            <m.p
              variants={reduce ? reducedVariants : fadeUp}
              className="max-w-[52ch] text-[15px] leading-relaxed text-[var(--fg-muted)] sm:text-base"
            >
              {profile.tagline}
            </m.p>

            <m.div
              variants={reduce ? reducedVariants : fadeUp}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="inline-flex min-h-11 items-center gap-2 rounded-full bg-[var(--pill)] px-6 text-sm font-semibold text-[var(--pill-fg)] transition-opacity duration-200 hover:opacity-90"
              >
                See selected work
                <ArrowDown size={15} strokeWidth={2.25} aria-hidden />
              </a>
              <a
                href={links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center gap-2 rounded-full border border-[var(--border-strong)] px-6 text-sm font-semibold transition-colors duration-200 hover:bg-[var(--surface-hover)]"
              >
                LinkedIn
                <ArrowUpRight size={15} strokeWidth={2.25} aria-hidden />
              </a>
            </m.div>
          </div>
        </BentoCard>

        {/* Currently at — the credibility anchor of the hero */}
        <BentoCard tilt className="md:col-span-6 lg:col-span-5">
          <div className="flex h-full flex-col items-center justify-center gap-6 p-8 text-center sm:p-10">
            <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-faint)]">
              <span className="relative flex h-2 w-2" aria-hidden>
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--accent)]" />
              </span>
              Currently
            </div>

            {/* Full logo, no chip — sized against the role headline below it.
                alt is empty because "Bank Mandiri" is spelled out right after,
                so announcing it twice adds nothing. */}
            <span className="rounded-2xl px-4 py-3 [background:var(--logo-plate)]">
              <Image
                src={profile.currentCompanyLogo}
                alt=""
                width={1280}
                height={377}
                sizes="(max-width: 640px) 170px, 200px"
                className="h-auto w-[170px] sm:w-[200px]"
              />
            </span>

            <div>
              <p className="font-display text-[clamp(1.6rem,3.6vw,2.25rem)] font-bold leading-[1.1] tracking-[-0.03em]">
                {profile.currentRole}
              </p>
              <p className="mt-2 text-base font-semibold text-[var(--accent-text)]">
                {profile.currentCompany}
              </p>
              <p className="mt-1 text-sm text-[var(--fg-muted)]">
                {profile.currentCompanyNote}
              </p>
            </div>
          </div>
        </BentoCard>

        {/* Stats strip */}
        <BentoCard className="md:col-span-6 lg:col-span-5">
          <dl className="grid h-full grid-cols-3 divide-x divide-[var(--border)]">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col justify-center gap-1 px-3 py-6 text-center sm:px-4 sm:py-7"
              >
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-display text-[clamp(1.5rem,3.5vw,2rem)] font-bold leading-none tracking-[-0.03em] text-[var(--accent-text)]">
                  <AnimatedCounter
                    value={stat.value}
                    prefix={"prefix" in stat ? stat.prefix : ""}
                    suffix={stat.suffix}
                  />
                </dd>
                <p
                  aria-hidden
                  className="text-[11px] leading-tight text-[var(--fg-muted)] sm:text-xs"
                >
                  {stat.label}
                </p>
              </div>
            ))}
          </dl>
        </BentoCard>
      </m.div>

      <m.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: reduce ? 0 : 2, duration: 0.6, ease: ease.out }}
        className="mt-10 flex justify-center"
      >
        <span
          aria-hidden
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--fg-faint)]"
        >
          Scroll
        </span>
      </m.div>
    </section>
  );
}
