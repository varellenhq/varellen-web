import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'
import { Shield, Lock, Eye, AlertTriangle, FileCheck, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Security',
  description:
    'Varellen Technologies security policy — our commitment to protecting your data and our responsible disclosure program.',
}

const PRINCIPLES = [
  {
    icon: Shield,
    title: 'Defense in Depth',
    body: 'We apply multiple layers of security controls across our infrastructure, code, and operational processes. No single point of failure.',
  },
  {
    icon: Lock,
    title: 'Encryption Everywhere',
    body: 'All data in transit is protected by TLS 1.3. Sensitive data at rest is encrypted using AES-256. Keys are managed through hardware-backed solutions.',
  },
  {
    icon: Eye,
    title: 'Continuous Monitoring',
    body: 'Automated security scanning, dependency auditing, and infrastructure monitoring run continuously across all systems and deployments.',
  },
  {
    icon: AlertTriangle,
    title: 'Incident Response',
    body: 'We maintain documented incident response procedures with defined escalation paths. Critical vulnerabilities are triaged within 24 hours.',
  },
  {
    icon: FileCheck,
    title: 'Secure Development',
    body: 'All code undergoes peer review, static analysis, and automated testing before deployment. Dependencies are audited and pinned.',
  },
  {
    icon: Mail,
    title: 'Responsible Disclosure',
    body: 'We welcome security researchers to report vulnerabilities responsibly. We commit to acknowledging reports within 48 hours.',
  },
]

export default function SecurityPage() {
  return (
    <main>
      <PageHero
        label="Security"
        title="Security is architectural."
        intro="At Varellen Technologies, security is a first-class engineering constraint — not an afterthought. It is designed into every system, process, and engagement."
      />

      {/* Security Principles Grid */}
      <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <ScrollReveal variant="stagger" staggerAmount={0.07} staggerSelector=":scope > div">
            <div className="grid gap-px border border-border md:grid-cols-2 lg:grid-cols-3">
              {PRINCIPLES.map((principle, i) => {
                const Icon = principle.icon
                return (
                  <div
                    key={principle.title}
                    className="group h-full border border-border bg-card p-8 transition-all duration-500 hover:bg-secondary md:p-10"
                  >
                    <div className="flex items-center gap-4">
                      <Icon className="size-5 text-muted-foreground" strokeWidth={1.5} />
                      <span className="font-mono text-xs text-muted-foreground">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <h3 className="font-heading mt-6 text-xl font-medium tracking-tight md:text-2xl">
                      {principle.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                      {principle.body}
                    </p>
                  </div>
                )
              })}
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Responsible Disclosure */}
      <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[900px]">
          <ScrollReveal variant="fade-up">
            <div className="space-y-14">

              <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-8">
                <span className="font-mono text-xs text-muted-foreground">01</span>
                <div>
                  <h2 className="font-heading text-xl font-medium tracking-tight md:text-2xl">
                    Responsible Disclosure Program
                  </h2>
                  <div className="mt-4 space-y-3">
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      We value the work of security researchers who help us maintain the
                      security of our systems. If you discover a vulnerability, we ask
                      that you disclose it responsibly.
                    </p>
                    <p className="text-sm leading-relaxed text-muted-foreground md:text-base">
                      Please report security vulnerabilities to{' '}
                      <a
                        href="mailto:varellentech@gmail.com"
                        className="text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
                      >
                        varellentech@gmail.com
                      </a>{' '}
                      with the subject line &ldquo;Security Disclosure&rdquo;.
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-8">
                <span className="font-mono text-xs text-muted-foreground">02</span>
                <div>
                  <h2 className="font-heading text-xl font-medium tracking-tight md:text-2xl">
                    What We Ask
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Provide sufficient detail to reproduce the vulnerability.',
                      'Allow reasonable time for remediation before public disclosure.',
                      'Do not access, modify, or delete data belonging to others.',
                      'Do not degrade the performance or availability of our services.',
                      'Act in good faith to avoid privacy violations and disruptions.',
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
                      >
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-silver/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-8">
                <span className="font-mono text-xs text-muted-foreground">03</span>
                <div>
                  <h2 className="font-heading text-xl font-medium tracking-tight md:text-2xl">
                    Our Commitment
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {[
                      'Acknowledge receipt of your report within 48 hours.',
                      'Provide an initial assessment within 5 business days.',
                      'Keep you informed of remediation progress.',
                      'Credit researchers who report valid vulnerabilities (with your permission).',
                      'Not pursue legal action against researchers acting in good faith.',
                    ].map((item, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground md:text-base"
                      >
                        <span className="mt-1.5 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-silver/60" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-border pt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Last Updated — June 2025
                </p>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
