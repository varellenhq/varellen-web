'use client'

import { ScrollReveal, GsapTextReveal } from '@/components/scroll-reveal'

export function SectionHeading({
  label,
  title,
  className = '',
}: {
  label: string
  title: string
  className?: string
}) {
  return (
    <div className={className}>
      <ScrollReveal variant="fade-up">
        <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          <span className="inline-block h-px w-8 bg-silver/60" />
          {label}
        </div>
      </ScrollReveal>
      <h2 className="font-heading mt-6 text-balance text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.025em]">
        <GsapTextReveal text={title} />
      </h2>
    </div>
  )
}
