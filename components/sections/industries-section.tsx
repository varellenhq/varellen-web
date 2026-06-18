'use client'

import { motion } from 'motion/react'
import { ScrollReveal, GsapTextReveal } from '@/components/scroll-reveal'
import { INDUSTRIES } from '@/lib/site-data'

export function IndustriesSection() {
  return (
    <section
      id="industries"
      className="overflow-hidden border-t border-border py-28 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 md:px-10">
        <ScrollReveal variant="fade-up">
          <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            <span className="inline-block h-px w-8 bg-silver/60" />
            Industries
          </div>
        </ScrollReveal>
        <h2 className="font-heading mt-6 text-balance text-[clamp(2rem,5vw,4rem)] font-medium leading-[1.02] tracking-[-0.025em]">
          <GsapTextReveal text="Trusted across critical sectors." />
        </h2>
      </div>

      <div className="relative mt-20 flex flex-col gap-px">
        <Marquee items={INDUSTRIES.slice(0, 4)} />
        <Marquee items={INDUSTRIES.slice(4)} reverse />
      </div>

      <div className="mx-auto mt-20 max-w-[1400px] px-5 md:px-10">
        <ScrollReveal variant="stagger" staggerAmount={0.06} staggerSelector=":scope > div">
          <div className="grid grid-cols-2 gap-px md:grid-cols-4">
            {INDUSTRIES.map((industry, i) => (
              <div key={industry} className="group border-t border-border py-6 transition-colors duration-300 hover:bg-secondary/30">
                <span className="font-mono text-[10px] text-muted-foreground">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <p className="mt-2 text-sm font-medium md:text-base">{industry}</p>
              </div>
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}

function Marquee({
  items,
  reverse = false,
}: {
  items: readonly string[]
  reverse?: boolean
}) {
  const row = [...items, ...items, ...items]
  return (
    <div className="flex select-none overflow-hidden border-y border-border py-3">
      <motion.div
        className="flex shrink-0 items-center gap-10 pr-10 md:gap-16 md:pr-16"
        animate={{ x: reverse ? ['-50%', '0%'] : ['0%', '-50%'] }}
        transition={{ duration: 40, ease: 'linear', repeat: Infinity }}
      >
        {[...row, ...row].map((item, i) => (
          <span
            key={i}
            className="font-heading flex items-center gap-10 whitespace-nowrap text-2xl font-medium tracking-tight text-muted-foreground md:gap-16 md:text-5xl"
          >
            {item}
            <span className="text-silver/40">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
