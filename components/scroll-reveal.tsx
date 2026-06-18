'use client'

import { useEffect, useRef, type ReactNode } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type RevealVariant = 'fade-up' | 'fade' | 'slide-up' | 'clip-up' | 'stagger'

interface ScrollRevealProps {
  children: ReactNode
  variant?: RevealVariant
  delay?: number
  duration?: number
  y?: number
  staggerAmount?: number
  staggerSelector?: string
  className?: string
  as?: keyof JSX.IntrinsicElements
  scrub?: boolean
  once?: boolean
  start?: string
}

/**
 * GSAP-powered scroll reveal component.
 *
 * Variants:
 * - fade-up: opacity 0→1 + translateY (default)
 * - fade: opacity only
 * - slide-up: clip-path reveal from bottom
 * - clip-up: text clip-path reveal
 * - stagger: staggers children elements
 */
export function ScrollReveal({
  children,
  variant = 'fade-up',
  delay = 0,
  duration = 0.9,
  y = 40,
  staggerAmount = 0.08,
  staggerSelector = ':scope > *',
  className,
  as: Tag = 'div',
  scrub = false,
  once = true,
  start = 'top 88%',
}: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    let tl: gsap.core.Timeline
    const ctx = gsap.context(() => {
      tl = gsap.timeline({
        scrollTrigger: {
          trigger: el,
          start,
          end: scrub ? 'bottom 20%' : undefined,
          scrub: scrub ? 1 : false,
          once,
        },
      })

      switch (variant) {
        case 'fade-up':
          gsap.set(el, { opacity: 0, y })
          tl.to(el, {
            opacity: 1,
            y: 0,
            duration,
            delay,
            ease: 'power3.out',
          })
          break

        case 'fade':
          gsap.set(el, { opacity: 0 })
          tl.to(el, {
            opacity: 1,
            duration,
            delay,
            ease: 'power2.out',
          })
          break

        case 'slide-up':
          gsap.set(el, { opacity: 0, y: y * 1.5 })
          tl.to(el, {
            opacity: 1,
            y: 0,
            duration: duration * 1.2,
            delay,
            ease: 'power3.out',
          })
          break

        case 'clip-up':
          gsap.set(el, {
            clipPath: 'inset(100% 0% 0% 0%)',
            opacity: 0,
          })
          tl.to(el, {
            clipPath: 'inset(0% 0% 0% 0%)',
            opacity: 1,
            duration: duration * 1.1,
            delay,
            ease: 'power3.inOut',
          })
          break

        case 'stagger':
          const items = el.querySelectorAll(staggerSelector)
          if (items.length) {
            gsap.set(items, { opacity: 0, y: y * 0.7 })
            tl.to(items, {
              opacity: 1,
              y: 0,
              duration,
              delay,
              stagger: staggerAmount,
              ease: 'power3.out',
            })
          }
          break
      }
    }, el)

    return () => ctx.revert()
  }, [variant, delay, duration, y, staggerAmount, staggerSelector, scrub, once, start])

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  )
}

/**
 * GSAP text reveal — reveals each word with staggered clip-path animation.
 */
export function GsapTextReveal({
  text,
  className,
  delay = 0,
  as: Tag = 'span',
}: {
  text: string
  className?: string
  delay?: number
  as?: 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'p'
}) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const words = el.querySelectorAll('.gsap-word')
    if (!words.length) return

    const ctx = gsap.context(() => {
      gsap.set(words, { y: '110%' })
      gsap.to(words, {
        y: '0%',
        duration: 0.85,
        stagger: 0.06,
        delay,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 88%',
          once: true,
        },
      })
    }, el)

    return () => ctx.revert()
  }, [delay])

  const words = text.split(' ')

  return (
    // @ts-expect-error dynamic tag
    <Tag ref={ref} className={className}>
      {words.map((word, i) => (
        <span
          key={`${word}-${i}`}
          className="inline-block overflow-hidden align-bottom"
        >
          <span className="gsap-word inline-block">
            {word}
            {i < words.length - 1 ? '\u00A0' : ''}
          </span>
        </span>
      ))}
    </Tag>
  )
}
