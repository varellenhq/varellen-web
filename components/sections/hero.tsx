'use client'

import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { ArrowRight, ArrowDown } from 'lucide-react'
import gsap from 'gsap'

const EngineScene = dynamic(
  () =>
    import('@/components/three/engine-scene').then((m) => ({
      default: m.EngineScene,
    })),
  { 
    ssr: false,
    loading: () => <div className="absolute inset-0 -z-10 bg-transparent" />
  }
)

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const labelRef = useRef<HTMLDivElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const descRef = useRef<HTMLParagraphElement>(null)
  const ctaRef = useRef<HTMLDivElement>(null)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.3 })

      // Label fade in
      if (labelRef.current) {
        gsap.set(labelRef.current, { opacity: 0, y: 12 })
        tl.to(labelRef.current, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power3.out',
        })
      }

      // Heading lines reveal
      const lines = h1Ref.current?.querySelectorAll('.hero-line')
      if (lines?.length) {
        gsap.set(lines, { y: '110%' })
        tl.to(
          lines,
          {
            y: '0%',
            duration: 1,
            stagger: 0.15,
            ease: 'power3.out',
          },
          '-=0.4'
        )
      }

      // Description
      if (descRef.current) {
        gsap.set(descRef.current, { opacity: 0, y: 16 })
        tl.to(
          descRef.current,
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: 'power3.out',
          },
          '-=0.5'
        )
      }

      // CTAs
      if (ctaRef.current) {
        const buttons = ctaRef.current.children
        gsap.set(buttons, { opacity: 0, y: 16 })
        tl.to(
          buttons,
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
          },
          '-=0.4'
        )
      }

      // Scroll indicator
      if (scrollRef.current) {
        gsap.set(scrollRef.current, { opacity: 0 })
        tl.to(
          scrollRef.current,
          {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          },
          '-=0.2'
        )
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative flex min-h-[100svh] flex-col justify-center overflow-hidden px-5 pb-20 pt-28 md:px-10"
    >
      {/* 3D Scene Background */}
      <EngineScene />

      {/* Gradient overlays for text readability */}
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-t from-background via-background/50 to-background/20" />
      <div className="pointer-events-none absolute inset-0 -z-[5] bg-gradient-to-r from-background/70 via-transparent to-transparent" />

      <div className="mx-auto w-full max-w-[1400px]">
        <div
          ref={labelRef}
          className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground"
        >
          <span className="inline-block h-px w-10 bg-silver/60" />
          Varellen Technologies
        </div>

        <h1
          ref={h1Ref}
          className="font-heading mt-7 text-balance text-[clamp(2.5rem,10.5vw,11rem)] font-medium leading-[0.92] tracking-[-0.03em]"
        >
          <span className="block overflow-hidden">
            <span className="hero-line block">Intelligence,</span>
          </span>
          <span className="block overflow-hidden text-muted-foreground">
            <span className="hero-line block">Engineered.</span>
          </span>
        </h1>

        <p
          ref={descRef}
          className="mt-8 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground sm:text-base md:text-lg"
        >
          Building intelligent systems, software, infrastructure, and security
          solutions for the organizations shaping tomorrow.
        </p>

        <div
          ref={ctaRef}
          className="mt-11 flex flex-col gap-3 sm:flex-row sm:items-center"
        >
          <Link
            href="/contact"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full bg-foreground px-7 py-3.5 text-sm font-medium text-background transition-all duration-300 hover:scale-[1.02] hover:opacity-90"
          >
            Start a Project
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/services"
            className="group inline-flex items-center justify-center gap-2.5 rounded-full border border-border px-7 py-3.5 text-sm font-medium transition-all duration-300 hover:bg-secondary"
          >
            Explore Capabilities
          </Link>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 items-center gap-2 font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground md:flex"
      >
        <ArrowDown className="size-3.5" />
        Scroll
      </div>
    </section>
  )
}
