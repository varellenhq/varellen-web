'use client'

import { ScrollReveal, GsapTextReveal } from '@/components/scroll-reveal'

export function PageHero({
  label,
  title,
  intro,
}: {
  label: string
  title: string
  intro?: string
}) {
  return (
    <section className="px-5 pb-16 pt-36 md:px-10 md:pb-24 md:pt-52">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal variant="fade-up">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="inline-block h-px w-10 bg-silver/60" />
            {label}
          </div>
        </ScrollReveal>
        <h1 className="font-heading mt-7 max-w-5xl text-balance text-[clamp(2.6rem,8vw,7rem)] font-medium leading-[0.95] tracking-[-0.03em]">
          <GsapTextReveal text={title} delay={0.1} />
        </h1>
        {intro && (
          <ScrollReveal variant="fade-up" delay={0.3}>
            <p className="mt-9 max-w-2xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
              {intro}
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  )
}
