'use client'

import Link from 'next/link'
import { ScrollReveal } from '@/components/scroll-reveal'

const COLS = [
  {
    title: 'Capabilities',
    links: [
      { label: 'Artificial Intelligence', href: '/services' },
      { label: 'Software Engineering', href: '/services' },
      { label: 'Cybersecurity', href: '/services' },
      { label: 'Cloud Infrastructure', href: '/services' },
    ],
  },
  {
    title: 'Company',
    links: [
      { label: 'About', href: '/about' },
      { label: 'Industries', href: '/industries' },
      { label: 'Security', href: '/security' },
      { label: 'Contact', href: '/contact' },
    ],
  },
  {
    title: 'Contact',
    links: [
      { label: 'varellentech@gmail.com', href: 'mailto:varellentech@gmail.com' },
      { label: 'varellenhq@gmail.com', href: 'mailto:varellenhq@gmail.com' },
    ],
  },
  {
    title: 'Social',
    links: [
      { label: 'GitHub (@varellenhq)', href: 'https://github.com/varellenhq' },
      { label: 'GitHub (@varellen)', href: 'https://github.com/varellen' },
      { label: 'LinkedIn', href: 'https://linkedin.com/in/varellen-technologies-8ab599417/' },
      { label: 'X (Twitter)', href: 'https://x.com/varellenhq' },
    ],
  },
]

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/privacy' },
  { label: 'Terms of Service', href: '/terms' },
  { label: 'Security', href: '/security' },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-5 py-16 md:px-10 md:py-24">
        <ScrollReveal variant="stagger" staggerAmount={0.08} staggerSelector=":scope > div">
          <div className="grid grid-cols-2 gap-x-6 gap-y-12 md:grid-cols-4 lg:grid-cols-[1.4fr_repeat(4,1fr)] lg:gap-14">
            <div className="col-span-2 md:col-span-4 lg:col-span-1">
              <div className="font-heading text-2xl font-semibold tracking-tight">
                Varellen
              </div>
              <p className="mt-4 max-w-xs text-pretty text-[13px] leading-relaxed text-muted-foreground">
                Intelligence, Engineered. Building intelligent systems for the
                organizations shaping tomorrow.
              </p>
              <div className="mt-8">
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-foreground">
                  Ashok Raj Pasala
                </p>
                <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
                  Founder & CEO
                </p>
              </div>
            </div>

            {COLS.map((col) => (
              <div key={col.title}>
                <h3 className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
                  {col.title}
                </h3>
                <ul className="mt-5 space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link
                        href={link.href}
                        target={link.href.startsWith('http') ? '_blank' : undefined}
                        rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-sm text-foreground/80 transition-colors duration-300 hover:text-foreground"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </ScrollReveal>

        {/* Bottom bar — copyright + legal links */}
        <div className="mt-16 flex flex-col gap-6 border-t border-border pt-8 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              &copy; {new Date().getFullYear()} Varellen Technologies
            </p>
            <span className="hidden h-3 w-px bg-border sm:block" />
            <p className="font-mono text-[11px] uppercase tracking-[0.16em] text-muted-foreground">
              Precision &middot; Trust &middot; Engineering Excellence
            </p>
          </div>
          <nav className="flex flex-wrap items-center gap-4 md:gap-6" aria-label="Legal">
            {LEGAL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground transition-colors duration-300 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </footer>
  )
}
