'use client'

import { ScrollReveal, GsapTextReveal } from '@/components/scroll-reveal'
import { VALUES } from '@/lib/site-data'

export function WhyVarellen() {
  return (
    <section className="border-t border-border px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal variant="fade-up">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="inline-block h-px w-8 bg-silver/60" />
            Why Varellen
          </div>
        </ScrollReveal>
        <h2 className="font-heading mt-6 text-balance text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.025em]">
          <GsapTextReveal text="The principles behind the work." />
        </h2>

        <ScrollReveal variant="stagger" staggerAmount={0.07} staggerSelector=":scope > div">
          <div className="mt-16 grid gap-px border border-border md:grid-cols-2 lg:grid-cols-3">
            {VALUES.map((value, i) => (
              <div
                key={value.title}
                className="group h-full border border-border bg-card p-8 transition-all duration-500 hover:bg-secondary md:p-10"
              >
                <span className="font-mono text-xs text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <h3 className="font-heading mt-6 text-xl font-medium tracking-tight md:text-2xl">
                  {value.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {value.body}
                </p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
