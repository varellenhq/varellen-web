import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { SectionHeading } from '@/components/section-heading'
import { ScrollReveal } from '@/components/scroll-reveal'
import { WhyVarellen } from '@/components/sections/why-varellen'
import { ContactCta } from '@/components/sections/contact-cta'

export const metadata: Metadata = {
  title: 'About — Varellen Technologies',
  description:
    'Varellen Technologies engineers intelligent systems, software, infrastructure, and security solutions. Founded by Ashok Pasala.',
}

export default function AboutPage() {
  return (
    <main>
      <PageHero
        label="About"
        title="A technology company built on engineering."
        intro="Varellen Technologies exists to build the intelligent systems that power the world's most demanding organizations — with precision, security, and a long-term view."
      />

      {/* Mission & Vision */}
      <section className="border-t border-border px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto grid max-w-[1400px] gap-16 md:grid-cols-2">
          <ScrollReveal variant="fade-up">
            <div className="flex h-full flex-col border-t border-border pt-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Mission
              </span>
              <p className="font-heading mt-8 text-balance text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                To engineer intelligent systems that empower organizations,
                governments, enterprises, and innovators to operate at a higher
                level of capability, security, and efficiency.
              </p>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.1}>
            <div className="flex h-full flex-col border-t border-border pt-8">
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Vision
              </span>
              <p className="font-heading mt-8 text-balance text-2xl font-medium leading-snug tracking-tight md:text-3xl">
                To become one of the world&apos;s most trusted technology
                companies — building infrastructure, software, AI systems, and
                security solutions that shape the future.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Founder */}
      <section className="border-t border-border px-5 py-24 md:px-10 md:py-32">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            label="Leadership"
            title="Founder & Chief Executive."
            className="max-w-3xl"
          />
          <div className="mt-16 grid gap-12 md:grid-cols-[0.8fr_1.2fr] md:gap-20">
            <ScrollReveal variant="fade-up">
              <div className="border-t border-border pt-8">
                <div className="font-heading text-3xl font-medium tracking-tight md:text-4xl">
                  Ashok Pasala
                </div>
                <div className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Founder &amp; CEO
                </div>
              </div>
            </ScrollReveal>
            <ScrollReveal variant="fade-up" delay={0.1}>
              <blockquote className="font-heading text-balance text-2xl font-medium leading-[1.25] tracking-tight md:text-[2rem]">
                &ldquo;We believe the future belongs to organizations that can combine
                intelligence, engineering, and execution. Varellen exists to
                help build that future.&rdquo;
              </blockquote>
            </ScrollReveal>
          </div>
        </div>
      </section>

      <WhyVarellen />
      <ContactCta />
    </main>
  )
}
