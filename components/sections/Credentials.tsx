"use client";

import Image from "next/image";
import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Download } from "lucide-react";
import { RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { certThumb, certifications, profile } from "@/lib/data";
import { fadeUp, reducedVariants, spring } from "@/lib/motion";
import { useFinePointer } from "@/lib/use-media-query";

export function Credentials() {
  const reduce = useReducedMotion();
  // Touch screens fire hover but never unhover, so a tapped card would stay
  // lifted until something else was tapped.
  const canHover = useFinePointer() && !reduce;

  return (
    <section
      id="credentials"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <SectionHeading
        index="04"
        title="Credentials"
        description="Every card opens the original certificate PDF."
      />

      <RevealGroup
        className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
        staggerChildren={0.04}
      >
        {certifications.map((cert, index) => (
          <m.a
            key={cert.id}
            href={cert.file}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${cert.title}, ${cert.issuer}, ${cert.year} — open certificate PDF in a new tab`}
            variants={reduce ? reducedVariants : fadeUp}
            whileHover={canHover ? { y: -4 } : undefined}
            transition={spring.snappy}
            className={`group flex flex-col overflow-hidden rounded-[var(--radius-card)] border bg-[var(--surface)] transition-colors duration-200 ${
              cert.featured
                ? "border-[var(--accent)]"
                : "border-[var(--border)] hover:border-[var(--border-strong)]"
            }`}
          >
            <span className="relative block aspect-[16/11] overflow-hidden bg-white">
              <Image
                src={certThumb(cert.file)}
                alt=""
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                loading={index < 3 ? "eager" : "lazy"}
                className="object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.04]"
              />
              <span
                aria-hidden
                className="absolute inset-0 ring-1 ring-inset ring-[var(--border)]"
              />
            </span>

            <span className="flex flex-1 flex-col justify-between gap-3 p-5">
              <span className="flex items-start justify-between gap-3">
                <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-[var(--fg-faint)]">
                  {cert.issuer}
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={2}
                  aria-hidden
                  className="shrink-0 text-[var(--fg-faint)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--accent-text)]"
                />
              </span>

              <span>
                <span className="block font-display text-[16px] font-bold leading-snug tracking-[-0.015em]">
                  {cert.title}
                </span>
                <span className="tabular mt-1.5 block font-mono text-xs text-[var(--fg-muted)]">
                  {cert.year}
                </span>
              </span>
            </span>
          </m.a>
        ))}

        <m.a
          href={profile.cv}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download full CV as PDF (opens in a new tab)"
          variants={reduce ? reducedVariants : fadeUp}
          whileHover={canHover ? { y: -4 } : undefined}
          transition={spring.snappy}
          className="group flex min-h-[180px] flex-col justify-between gap-4 rounded-[var(--radius-card)] bg-[var(--accent)] p-6 text-[var(--on-accent)] transition-opacity duration-200 hover:opacity-90"
        >
          <span className="flex items-start justify-between gap-3">
            <span className="font-mono text-[11px] uppercase tracking-[0.14em] opacity-70">
              Full résumé
            </span>
            <Download size={16} strokeWidth={2.25} aria-hidden />
          </span>
          <span className="font-display text-[18px] font-bold leading-snug tracking-[-0.015em]">
            Download CV
            <span className="mt-1 block text-sm font-medium opacity-70">
              PDF · 1 page
            </span>
          </span>
        </m.a>
      </RevealGroup>
    </section>
  );
}
