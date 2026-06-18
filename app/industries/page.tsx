import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { ContactCta } from '@/components/sections/contact-cta'
import { INDUSTRIES } from '@/lib/site-data'

export const metadata: Metadata = {
  title: 'Industries — Varellen Technologies',
  description:
    'Varellen serves Financial Services, Healthcare, Government, Defense, Technology, Manufacturing, Education, and Energy.',
}

const DETAIL: Record<string, string> = {
  'Financial Services':
    'Secure, high-integrity systems for institutions where trust is non-negotiable.',
  Healthcare:
    'Compliant, resilient platforms that protect sensitive data and lives.',
  Government:
    'Sovereign, auditable infrastructure built for public accountability.',
  Defense:
    'Hardened systems engineered for the most demanding operational environments.',
  Technology:
    'Foundational platforms and AI systems for technology-led organizations.',
  Manufacturing:
    'Automation and intelligence that bring precision to industrial operations.',
  Education:
    'Scalable systems that extend the reach of knowledge and institutions.',
  Energy:
    'Critical infrastructure software engineered for reliability at scale.',
}

export default function IndustriesPage() {
  return (
    <main>
      <PageHero
        label="Industries"
        title="Engineered for sectors where failure is not an option."
        intro="We partner with organizations operating critical infrastructure and high-stakes systems across eight core industries."
      />

      <section className="border-t border-border">
        <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-px px-5 md:grid-cols-2 md:px-10">
          {INDUSTRIES.map((industry, i) => (
            <ScrollReveal key={industry} variant="fade-up" delay={(i % 2) * 0.08}>
              <div className="group flex h-full flex-col justify-between border-b border-border py-12 md:px-8">
                <div className="flex items-start justify-between">
                  <span className="font-mono text-xs text-muted-foreground">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div className="mt-10">
                  <h2 className="font-heading text-balance text-3xl font-medium tracking-tight transition-colors duration-300 group-hover:text-muted-foreground md:text-4xl">
                    {industry}
                  </h2>
                  <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
                    {DETAIL[industry]}
                  </p>
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
