import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Varellen Technologies privacy policy — how we collect, use, and protect your information.',
}

export default function PrivacyPage() {
  return (
    <main>
      <PageHero
        label="Legal"
        title="Privacy Policy."
        intro="This Privacy Policy describes how Varellen Technologies collects, uses, and protects information when you use our website and services."
      />

      <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[900px]">
          <ScrollReveal variant="fade-up">
            <div className="prose-policy space-y-14">

              <PolicySection
                number="01"
                title="Information We Collect"
                content={[
                  'We collect information you voluntarily provide when you contact us through our inquiry form, including your name, email address, organization name, and the content of your message.',
                  'We automatically collect certain technical information when you visit our website, including your IP address, browser type, operating system, referring URLs, and pages viewed. This data is collected through Vercel Analytics and is used solely for website performance analysis.',
                  'We do not use cookies for tracking or advertising purposes. Essential cookies may be used to maintain your theme preference (dark/light mode).',
                ]}
              />

              <PolicySection
                number="02"
                title="How We Use Your Information"
                content={[
                  'To respond to your inquiries and provide the services you request.',
                  'To improve our website, services, and user experience through aggregate analytics.',
                  'To comply with legal obligations and protect our legitimate business interests.',
                  'We do not sell, rent, or share your personal information with third parties for marketing purposes.',
                ]}
              />

              <PolicySection
                number="03"
                title="Data Protection"
                content={[
                  'We implement appropriate technical and organizational security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.',
                  'All data transmitted through our website is encrypted using industry-standard TLS/SSL protocols.',
                  'We retain your personal information only for as long as necessary to fulfill the purposes for which it was collected, or as required by applicable law.',
                ]}
              />

              <PolicySection
                number="04"
                title="Third-Party Services"
                content={[
                  'Our website uses Vercel Analytics for anonymized performance monitoring. Vercel processes data in accordance with their privacy policy.',
                  'Our website is hosted on Vercel infrastructure, which may process certain technical data as described in Vercel\'s privacy policy.',
                  'We do not integrate third-party advertising networks, social media tracking pixels, or marketing analytics platforms.',
                ]}
              />

              <PolicySection
                number="05"
                title="Your Rights"
                content={[
                  'You have the right to request access to, correction of, or deletion of your personal information.',
                  'You have the right to object to or restrict the processing of your personal information.',
                  'You have the right to data portability where technically feasible.',
                  'To exercise any of these rights, please contact us at varellentech@gmail.com.',
                ]}
              />

              <PolicySection
                number="06"
                title="International Data Transfers"
                content={[
                  'Your information may be transferred to and processed in countries other than your country of residence. We ensure appropriate safeguards are in place to protect your information in accordance with applicable data protection laws.',
                ]}
              />

              <PolicySection
                number="07"
                title="Children\'s Privacy"
                content={[
                  'Our services are not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information.',
                ]}
              />

              <PolicySection
                number="08"
                title="Changes to This Policy"
                content={[
                  'We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the updated policy on this page with a revised effective date.',
                ]}
              />

              <div className="border-t border-border pt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Last Updated — June 2025
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  For questions about this Privacy Policy, contact us at{' '}
                  <a
                    href="mailto:varellentech@gmail.com"
                    className="text-foreground underline underline-offset-4 transition-colors hover:text-muted-foreground"
                  >
                    varellentech@gmail.com
                  </a>
                </p>
              </div>

            </div>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}

function PolicySection({
  number,
  title,
  content,
}: {
  number: string
  title: string
  content: string[]
}) {
  return (
    <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border pt-8">
      <span className="font-mono text-xs text-muted-foreground">{number}</span>
      <div>
        <h2 className="font-heading text-xl font-medium tracking-tight md:text-2xl">
          {title}
        </h2>
        <div className="mt-4 space-y-3">
          {content.map((paragraph, i) => (
            <p
              key={i}
              className="text-sm leading-relaxed text-muted-foreground md:text-base"
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}
