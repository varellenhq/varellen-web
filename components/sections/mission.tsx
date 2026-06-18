'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ScrollReveal } from '@/components/scroll-reveal'

const WORDS =
  'To engineer intelligent systems that empower organizations, governments, enterprises, and innovators to operate at a higher level of capability, security, and efficiency.'.split(
    ' ',
  )

export function Mission() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.85', 'start 0.3'],
  })

  return (
    <section className="border-t border-border px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] gap-12 md:grid-cols-[0.3fr_1fr]">
        <ScrollReveal variant="fade-up" delay={0}>
          <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            Mission
          </div>
        </ScrollReveal>
        <div ref={ref}>
          <p className="font-heading text-pretty text-[clamp(1.6rem,3.6vw,3rem)] font-medium leading-[1.18] tracking-[-0.02em]">
            {WORDS.map((word, i) => (
              <Word
                key={i}
                word={word}
                progress={scrollYProgress}
                range={[i / WORDS.length, (i + 1) / WORDS.length]}
              />
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}

function Word({
  word,
  progress,
  range,
}: {
  word: string
  progress: ReturnType<typeof useScroll>['scrollYProgress']
  range: [number, number]
}) {
  const opacity = useTransform(progress, range, [0.15, 1])
  return (
    <motion.span style={{ opacity }} className="inline-block">
      {word}
      {'\u00A0'}
    </motion.span>
  )
}
