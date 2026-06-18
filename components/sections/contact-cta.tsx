'use client'

import Link from 'next/link'
import { useRef, useEffect } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { ScrollReveal } from '@/components/scroll-reveal'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

export function ContactCta() {
  const headingRef = useRef<HTMLHeadingElement>(null)

  useEffect(() => {
    const el = headingRef.current
    if (!el) return

    const chars = el.querySelectorAll('.cta-char')
    if (!chars.length) return

    const ctx = gsap.context(() => {
      gsap.set(chars, { opacity: 0, y: 30 })
      gsap.to(chars, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        stagger: 0.015,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [])

  const line1 = "Let's build"
  const line2 = 'something serious.'

  return (
    <section className="border-t border-border px-5 py-28 md:px-10 md:py-44">
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal variant="fade-up">
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Start a Conversation
          </div>
        </ScrollReveal>

        <Link href="/contact" className="group mt-8 block">
          <h2
            ref={headingRef}
            className="font-heading text-balance text-[clamp(2.6rem,9vw,8rem)] font-medium leading-[0.95] tracking-[-0.03em]"
          >
            <span className="inline-flex items-start gap-3">
              {line1.split('').map((char, i) => (
                <span key={i} className="cta-char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
              <ArrowUpRight className="mt-2 size-8 text-muted-foreground transition-all duration-300 group-hover:rotate-45 group-hover:text-foreground md:size-16" />
            </span>
            <span className="block text-muted-foreground transition-colors duration-300 group-hover:text-foreground">
              {line2.split('').map((char, i) => (
                <span key={i} className="cta-char inline-block" style={{ whiteSpace: char === ' ' ? 'pre' : undefined }}>
                  {char === ' ' ? '\u00A0' : char}
                </span>
              ))}
            </span>
          </h2>
        </Link>

        <ScrollReveal variant="fade-up" delay={0.1}>
          <div className="mt-14 flex flex-col gap-8 border-t border-border pt-10 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-col gap-2">
              <a
                href="mailto:varellentech@gmail.com"
                className="text-lg font-medium transition-colors hover:text-muted-foreground"
              >
                varellentech@gmail.com
              </a>
              <a
                href="mailto:varellenhq@gmail.com"
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                varellenhq@gmail.com
              </a>
            </div>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center gap-2.5 rounded-full bg-foreground px-8 py-4 text-sm font-medium text-background transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
            >
              Make an Inquiry
              <ArrowUpRight className="size-4" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
