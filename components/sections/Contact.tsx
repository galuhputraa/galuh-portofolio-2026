"use client";

import { m, useReducedMotion } from "framer-motion";
import { ArrowUpRight, Mail } from "lucide-react";
import { LinkedInIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { links } from "@/lib/data";
import { fadeUp, reducedVariants, spring } from "@/lib/motion";
import { useFinePointer } from "@/lib/use-media-query";

const channels = [
  {
    id: "email",
    label: "Email",
    value: links.email,
    href: `mailto:${links.email}`,
    Icon: Mail,
    external: false,
  },
  {
    id: "linkedin",
    label: "LinkedIn",
    value: "/in/galuh-putra-warman",
    href: links.linkedin,
    Icon: LinkedInIcon,
    external: true,
  },
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: links.whatsappLabel,
    href: links.whatsapp,
    Icon: WhatsAppIcon,
    external: true,
  },
] as const;

export function Contact() {
  const reduce = useReducedMotion();
  // Touch screens fire hover but never unhover, so a tapped card would stay
  // lifted until something else was tapped.
  const canHover = useFinePointer() && !reduce;

  return (
    <section
      id="contact"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <SectionHeading
        index="05"
        title="Let's talk"
        description="Open to conversations about applied AI, computer vision and data products."
      />

      <RevealGroup
        className="grid grid-cols-1 gap-3 md:grid-cols-3"
        staggerChildren={0.06}
      >
        {channels.map(({ id, label, value, href, Icon, external }) => (
          <m.a
            key={id}
            href={href}
            {...(external
              ? { target: "_blank", rel: "noopener noreferrer" }
              : {})}
            aria-label={
              external ? `${label}: ${value} (opens in a new tab)` : `${label}: ${value}`
            }
            variants={reduce ? reducedVariants : fadeUp}
            whileHover={canHover ? { y: -4 } : undefined}
            transition={spring.snappy}
            className="group flex min-h-[148px] flex-col justify-between gap-6 rounded-[var(--radius-card)] border border-[var(--border)] bg-[var(--surface)] p-6 transition-colors duration-200 hover:border-[var(--accent)] sm:p-7"
          >
            <span className="flex items-start justify-between gap-3">
              <span className="grid h-11 w-11 place-items-center rounded-full bg-[var(--bg-elevated)] text-[var(--accent-text)] transition-colors duration-200 group-hover:bg-[var(--accent)] group-hover:text-[var(--on-accent)]">
                <Icon size={18} aria-hidden />
              </span>
              <ArrowUpRight
                size={17}
                strokeWidth={2}
                aria-hidden
                className="text-[var(--fg-faint)] transition-all duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--fg)]"
              />
            </span>
            <span>
              <span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--fg-faint)]">
                {label}
              </span>
              <span className="mt-1.5 block break-all font-display text-[17px] font-bold tracking-[-0.02em]">
                {value}
              </span>
            </span>
          </m.a>
        ))}
      </RevealGroup>

      <Reveal delay={0.1} className="mt-6">
        <p className="text-sm text-[var(--fg-muted)]">
          Based in Jakarta, Indonesia · GMT+7 · usually replies within a day.
        </p>
      </Reveal>
    </section>
  );
}
