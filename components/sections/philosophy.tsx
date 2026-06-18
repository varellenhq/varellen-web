'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ScrollReveal, GsapTextReveal } from '@/components/scroll-reveal'

const PRINCIPLES = [
  {
    k: '01',
    t: 'Systems, not features',
    d: 'We design coherent systems that compound in value — not disconnected features that decay.',
  },
  {
    k: '02',
    t: 'Defensible by design',
    d: 'Security, observability, and resilience are first-class architectural constraints.',
  },
  {
    k: '03',
    t: 'Built to endure',
    d: 'We optimise for the decade, engineering infrastructure that outlasts the trend cycle.',
  },
]

export function Philosophy() {
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const gradientY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section className="relative overflow-hidden border-t border-border px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
        <div>
          <ScrollReveal variant="fade-up">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="inline-block h-px w-8 bg-silver/60" />
              Technology Philosophy
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.05}>
            <h2 className="font-heading mt-6 text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.025em]">
              We build the systems serious organizations rely on.
            </h2>
          </ScrollReveal>

          <div className="mt-12 space-y-px">
            {PRINCIPLES.map((p, i) => (
              <ScrollReveal key={p.k} variant="fade-up" delay={0.1 + i * 0.08}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border py-7">
                  <span className="font-mono text-xs text-muted-foreground">
                    {p.k}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-medium tracking-tight">
                      {p.t}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {p.d}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Abstract geometric visual replacing the static image */}
        <div ref={imageRef} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card">
            {/* Animated gradient background simulating metallic surface */}
            <motion.div
              style={{ y: gradientY }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(165deg, var(--secondary) 0%, var(--card) 30%, var(--muted) 60%, var(--card) 100%)',
                }}
              />
              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                  backgroundPosition: 'center',
                }}
              />
              {/* Radial glow */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, var(--silver) 0%, transparent 60%)',
                  opacity: 0.1,
                }}
              />
            </motion.div>

            {/* "Engineered Infrastructure" UI Rings */}
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Outer Ring */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
                className="absolute size-[60%] rounded-full border border-dashed border-silver/30"
              />
              {/* Middle Ring */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
                className="absolute size-[45%] rounded-full border-[1.5px] border-silver/40"
              />
              {/* Inner Circle pulsing */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 4, ease: 'easeInOut', repeat: Infinity }}
                className="absolute size-[15%] rounded-full bg-silver/20 backdrop-blur-md border border-silver/50"
              />
              
              {/* Crosshair lines */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-full w-[1px] bg-silver/10" />
                <div className="absolute h-[1px] w-full bg-silver/10" />
              </div>
            </div>

            <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 md:p-8">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver">
                Engineered Infrastructure
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver">
                VAR—∞
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
