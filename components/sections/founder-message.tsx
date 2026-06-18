'use client'

import { ScrollReveal, GsapTextReveal } from '@/components/scroll-reveal'

export function FounderMessage() {
  return (
    <section className="border-t border-border px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1100px] text-center">
        <ScrollReveal variant="fade-up">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            From the Founder
          </div>
        </ScrollReveal>

        <blockquote className="font-heading mt-10 text-balance text-[clamp(1.6rem,4vw,3.2rem)] font-medium leading-[1.15] tracking-[-0.02em]">
          <GsapTextReveal
            text={"\u201CWe believe the future belongs to organizations that can combine intelligence, engineering, and execution. Varellen exists to help build that future.\u201D"}
            delay={0.1}
          />
        </blockquote>

        <ScrollReveal variant="fade-up" delay={0.3}>
          <div className="mt-12 flex flex-col items-center gap-1">
            <div className="font-mono text-sm font-medium uppercase tracking-[0.14em]">
              Ashok Pasala
            </div>
            <div className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Founder &amp; CEO
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
