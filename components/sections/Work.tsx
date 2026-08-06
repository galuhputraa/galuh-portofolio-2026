"use client";

import { BentoCard } from "@/components/ui/BentoCard";
import { LogoChip } from "@/components/ui/LogoChip";
import { RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/lib/data";

export function Work() {
  return (
    <section
      id="work"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <SectionHeading
        index="03"
        title="Selected work"
        description="Machine learning and analytics shipped for enterprise clients across banking, automotive and marketplace."
      />

      <RevealGroup
        className="grid grid-cols-1 gap-4 md:grid-cols-2"
        staggerChildren={0.06}
      >
        {projects.map((project) => (
          <BentoCard key={project.id} as="article" tilt maxTilt={6}>
            <div className="flex h-full flex-col gap-5 p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-[var(--accent-text)]">
                  {project.category}
                </p>
                <LogoChip
                  src={project.contextLogo}
                  alt={project.context}
                  size={32}
                  bleed={project.contextLogo.includes("ilmuone")}
                />
              </div>

              <div>
                <h3 className="font-display text-[20px] font-bold leading-snug tracking-[-0.02em] md:text-[22px]">
                  {project.title}
                </h3>
                <p className="mt-3 text-[15px] leading-relaxed text-[var(--fg-muted)]">
                  {project.description}
                </p>
              </div>

              <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-[var(--border)] pt-5">
                {project.metrics.map((metric) => (
                  <div key={metric.label}>
                    <dd className="tabular font-display text-2xl font-bold leading-none tracking-[-0.03em]">
                      {metric.value}
                    </dd>
                    <dt className="mt-1.5 text-xs leading-tight text-[var(--fg-muted)]">
                      {metric.label}
                    </dt>
                  </div>
                ))}
              </dl>

              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md bg-[var(--bg-elevated)] px-2 py-1 font-mono text-[11px] text-[var(--fg-muted)]"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </BentoCard>
        ))}
      </RevealGroup>
    </section>
  );
}
