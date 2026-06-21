import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ScrollReveal } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description:
    'Varellen Technologies terms of service — the agreement governing your use of our website and services.',
}

export default function TermsPage() {
  return (
    <main>
      <PageHero
        label="Legal"
        title="Terms of Service."
        intro="Please read these Terms of Service carefully before using the Varellen Technologies website or engaging our services."
      />

      <section className="border-t border-border px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[900px]">
          <ScrollReveal variant="fade-up">
            <div className="space-y-14">

              <TermsSection
                number="01"
                title="Acceptance of Terms"
                content={[
                  'By accessing or using the Varellen Technologies website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, you may not access or use our services.',
                  'We reserve the right to modify these terms at any time. Continued use of our services following any changes constitutes acceptance of the revised terms.',
                ]}
              />

              <TermsSection
                number="02"
                title="Services"
                content={[
                  'Varellen Technologies provides technology consulting, software engineering, artificial intelligence, cybersecurity, cloud infrastructure, and automation services as described on our website.',
                  'Specific service engagements are governed by separate statements of work or service agreements executed between Varellen Technologies and the client.',
                  'We reserve the right to modify, suspend, or discontinue any aspect of our services at any time without prior notice.',
                ]}
              />

              <TermsSection
                number="03"
                title="Intellectual Property"
                content={[
                  'All content on this website — including text, graphics, logos, icons, images, code, and the overall design — is the property of Varellen Technologies and is protected by applicable intellectual property laws.',
                  'You may not reproduce, distribute, modify, create derivative works from, or commercially exploit any content from this website without our express written permission.',
                  'All trademarks, service marks, and trade names used on this website are the property of Varellen Technologies or their respective owners.',
                ]}
              />

              <TermsSection
                number="04"
                title="Confidentiality"
                content={[
                  'Any information shared during consultations, project discussions, or through our inquiry forms is treated as confidential unless otherwise agreed.',
                  'Varellen Technologies will not disclose confidential information to third parties except as required by law or as necessary to perform the contracted services.',
                  'Specific confidentiality obligations for client engagements are defined in the applicable service agreement.',
                ]}
              />

              <TermsSection
                number="05"
                title="Limitation of Liability"
                content={[
                  'Varellen Technologies provides this website and its content on an "as is" basis without warranties of any kind, whether express or implied.',
                  'To the maximum extent permitted by law, Varellen Technologies shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of our website or services.',
                  'Our total liability for any claim arising from these terms shall not exceed the amount you paid for the specific service giving rise to the claim.',
                ]}
              />

              <TermsSection
                number="06"
                title="Indemnification"
                content={[
                  'You agree to indemnify and hold harmless Varellen Technologies, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your violation of these terms or your use of our services.',
                ]}
              />

              <TermsSection
                number="07"
                title="Governing Law"
                content={[
                  'These Terms of Service shall be governed by and construed in accordance with applicable laws. Any disputes arising from these terms shall be resolved through binding arbitration or in the courts of competent jurisdiction.',
                ]}
              />

              <TermsSection
                number="08"
                title="Severability"
                content={[
                  'If any provision of these terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary so that the remaining provisions shall remain in full force and effect.',
                ]}
              />

              <div className="border-t border-border pt-10">
                <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  Last Updated — June 2025
                </p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                  For questions about these Terms of Service, contact us at{' '}
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

function TermsSection({
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
