'use client'

import { useState, useRef, useEffect } from 'react'
import { Plus } from 'lucide-react'
import { ScrollReveal, GsapTextReveal } from '@/components/scroll-reveal'
import { SERVICES } from '@/lib/site-data'
import gsap from 'gsap'

export function ServicesSection() {
  const [active, setActive] = useState<string | null>(SERVICES[0].id)

  return (
    <section
      id="services"
      className="border-t border-border px-5 py-28 md:px-10 md:py-40"
    >
      <div className="mx-auto max-w-[1400px]">
        <ScrollReveal variant="fade-up">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="inline-block h-px w-8 bg-silver/60" />
            Capabilities
          </div>
        </ScrollReveal>
        <h2 className="font-heading mt-6 text-balance text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.025em]">
          <GsapTextReveal text="Six disciplines, one standard." />
        </h2>

        <div className="mt-16 border-t border-border">
          {SERVICES.map((service, i) => (
            <ServiceRow
              key={service.id}
              service={service}
              isOpen={active === service.id}
              onToggle={() =>
                setActive(active === service.id ? null : service.id)
              }
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ServiceRow({
  service,
  isOpen,
  onToggle,
  index,
}: {
  service: (typeof SERVICES)[number]
  isOpen: boolean
  onToggle: () => void
  index: number
}) {
  const rowRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!contentRef.current) return
    const el = contentRef.current

    if (isOpen) {
      gsap.set(el, { height: 'auto', opacity: 1 })
      const h = el.scrollHeight
      gsap.fromTo(
        el,
        { height: 0, opacity: 0 },
        { height: h, opacity: 1, duration: 0.5, ease: 'power3.out' }
      )
    } else {
      gsap.to(el, {
        height: 0,
        opacity: 0,
        duration: 0.4,
        ease: 'power3.inOut',
      })
    }
  }, [isOpen])

  return (
    <ScrollReveal variant="fade-up" delay={index * 0.05} y={20}>
      <div ref={rowRef} className="border-b border-border">
        <button
          onClick={onToggle}
          className="group flex w-full items-center gap-5 py-7 text-left md:gap-10 md:py-9"
          aria-expanded={isOpen}
        >
          <span className="font-mono text-xs text-muted-foreground md:text-sm">
            {service.index}
          </span>
          <span className="font-heading relative flex-1 text-balance text-2xl font-medium tracking-tight transition-colors group-hover:text-muted-foreground md:text-4xl">
            {service.title}
            {/* Hover line animation */}
            <span
              ref={lineRef}
              className="absolute -bottom-1 left-0 h-px w-0 bg-foreground/30 transition-all duration-500 group-hover:w-full"
            />
          </span>
          <span className="hidden max-w-md flex-1 text-sm leading-relaxed text-muted-foreground lg:block">
            {service.summary}
          </span>
          <Plus
            className={`size-5 shrink-0 text-muted-foreground transition-transform duration-300 ${
              isOpen ? 'rotate-45' : ''
            }`}
          />
        </button>

        <div
          ref={contentRef}
          className="overflow-hidden"
          style={{ height: 0, opacity: 0 }}
        >
          <div className="flex flex-wrap gap-2.5 pb-9 pl-9 md:pl-[4.5rem]">
            <p className="mb-2 w-full max-w-xl text-sm leading-relaxed text-muted-foreground lg:hidden">
              {service.summary}
            </p>
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
  )
}
