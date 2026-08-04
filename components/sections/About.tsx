"use client";

import { m, useReducedMotion } from "framer-motion";
import { BentoCard } from "@/components/ui/BentoCard";
import { Reveal, RevealGroup } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { education, profile, skills } from "@/lib/data";
import { fadeUp, reducedVariants } from "@/lib/motion";

export function About() {
  const reduce = useReducedMotion();

  return (
    <section
      id="about"
      className="mx-auto w-full max-w-[1200px] scroll-mt-24 px-4 py-24 sm:px-6 md:py-32 lg:px-8"
    >
      <SectionHeading index="01" title="About" />

      <RevealGroup
        className="grid grid-cols-1 gap-4 md:grid-cols-6 lg:grid-cols-12"
        staggerChildren={0.06}
      >
        <BentoCard className="md:col-span-6 lg:col-span-7">
          <div className="flex h-full flex-col gap-6 p-6 sm:p-8 md:p-10">
            <p className="text-[17px] leading-[1.7] text-[var(--fg)] md:text-lg">
              {profile.summary}
            </p>
            <p className="text-[15px] leading-[1.7] text-[var(--fg-muted)]">
              I work across the whole path from raw data to a decision someone
              can act on — cleaning and modelling the data, shipping the model,
              then putting the result in front of stakeholders in a form they
              actually read.
            </p>
          </div>
        </BentoCard>

        <BentoCard className="md:col-span-6 lg:col-span-5">
          <div className="flex h-full flex-col gap-5 p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-faint)]">
              Education
            </p>
            <ul className="flex flex-col gap-5">
              {education.map((item) => (
                <li key={item.id}>
                  <p className="font-mono text-xs text-[var(--fg-faint)]">
                    {item.period}
                  </p>
                  <p className="mt-1 font-display text-base font-bold tracking-[-0.02em]">
                    {item.degree}
                  </p>
                  <p className="mt-0.5 text-sm text-[var(--fg-muted)]">
                    {item.school} · <span className="tabular">{item.detail}</span>
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </BentoCard>

        <BentoCard className="md:col-span-6 lg:col-span-12">
          <div className="flex flex-col gap-5 p-6 sm:p-8">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--fg-faint)]">
              Toolkit
            </p>
            <ul className="flex flex-wrap gap-2">
              {skills.map((skill, index) => (
                <m.li
                  key={skill}
                  variants={reduce ? reducedVariants : fadeUp}
                  custom={index}
                  className="rounded-full border border-[var(--border)] bg-[var(--bg-elevated)] px-3.5 py-2 text-[13px] font-medium text-[var(--fg-muted)] transition-colors duration-200 hover:border-[var(--accent)] hover:text-[var(--fg)]"
                >
                  {skill}
                </m.li>
              ))}
            </ul>
          </div>
        </BentoCard>
      </RevealGroup>

      <Reveal delay={0.1} className="mt-4">
        <p className="text-sm text-[var(--fg-muted)]">
          Google Cloud Certified Professional Machine Learning Engineer (2025) ·
          DeepLearning.AI TensorFlow Developer · Google IT Automation with Python
        </p>
      </Reveal>
    </section>
  );
}
