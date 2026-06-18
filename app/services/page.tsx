import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ContactCta } from '@/components/sections/contact-cta'
import { SERVICES } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Capabilities — Varellen Technologies',
  description:
    'Artificial Intelligence, Software Engineering, Cybersecurity, Cloud Infrastructure, Automation, and Consulting — engineered to one standard.',
}

export default function ServicesPage() {
  return (
    <main>
      <PageHero
        label="Capabilities"
        title="Six disciplines. One standard of execution."
        intro="From agentic AI to sovereign infrastructure, every engagement is held to a single, uncompromising standard of engineering."
      />

      <section className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 md:px-10">
          {SERVICES.map((service, i) => (
            <ScrollReveal key={service.id} variant="fade-up" delay={i * 0.05}>
              <div className="grid gap-8 border-b border-border py-14 md:grid-cols-[0.5fr_1fr] md:gap-16 md:py-20">
                <div>
                  <span className="font-mono text-xs text-muted-foreground">
                    {service.index}
                  </span>
                  <h2 className="font-heading mt-4 text-balance text-3xl font-medium tracking-tight md:text-5xl">
                    {service.title}
                  </h2>
                </div>
                <div>
                  <p className="max-w-xl text-pretty text-base leading-relaxed text-muted-foreground md:text-lg">
                    {service.summary}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-2.5">
                    {service.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-border bg-card px-4 py-2 font-mono text-[11px] uppercase tracking-[0.1em] text-foreground/80"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      <ContactCta />
    </main>
  )
}
