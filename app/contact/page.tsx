import type { Metadata } from 'next'
import { PageHero } from '@/components/page-hero'
import { ContactForm } from '@/components/contact-form'
import { ScrollReveal } from '@/components/scroll-reveal'

export const metadata: Metadata = {
  title: 'Contact — Varellen Technologies',
  description:
    'Enterprise, Partnership, Startup, and Government inquiries. Reach Varellen Technologies at varellentech@gmail.com.',
}

export default function ContactPage() {
  return (
    <main>
      <PageHero
        label="Contact"
        title="Start a conversation."
        intro="Whether you represent an enterprise, a government, a partner, or a startup — we'd welcome the opportunity to understand what you're building."
      />

      <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-[1400px]">
          <ScrollReveal variant="fade-up">
            <ContactForm />
          </ScrollReveal>
        </div>
      </section>

      <section className="border-t border-border px-5 py-20 md:px-10 md:py-28">
        <div className="mx-auto flex max-w-[1400px] flex-col gap-10 md:flex-row md:items-end md:justify-between">
          <ScrollReveal variant="fade-up">
            <div>
              <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                Direct
              </span>
              <div className="mt-6 flex flex-col gap-2">
                <a
                  href="mailto:varellentech@gmail.com"
                  className="font-heading text-2xl font-medium tracking-tight transition-colors duration-300 hover:text-muted-foreground md:text-4xl"
                >
                  varellentech@gmail.com
                </a>
                <a
                  href="mailto:varellenhq@gmail.com"
                  className="text-base text-muted-foreground transition-colors duration-300 hover:text-foreground"
                >
                  varellenhq@gmail.com
                </a>
              </div>
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.1}>
            <p className="max-w-xs font-mono text-[11px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
              Varellen Technologies — Intelligence, Engineered.
            </p>
          </ScrollReveal>
        </div>
      </section>
    </main>
  )
}
