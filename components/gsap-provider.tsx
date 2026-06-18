'use client'

import { useEffect, useRef, createContext, useContext } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Lenis from 'lenis'

// Register GSAP plugins
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type GsapContextValue = {
  lenis: Lenis | null
}

const GsapContext = createContext<GsapContextValue>({ lenis: null })

export function useGsap() {
  return useContext(GsapContext)
}

/**
 * Global GSAP + Lenis smooth scroll provider.
 * Connects Lenis to GSAP's ticker for synchronized scroll-triggered animations.
 */
export function GsapProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)

  useEffect(() => {
    // Initialize Lenis smooth scroll
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      touchMultiplier: 1.5,
    })
    lenisRef.current = lenis

    // Connect Lenis to GSAP ticker
    const onRaf = (time: number) => {
      lenis.raf(time * 1000)
    }
    gsap.ticker.add(onRaf)

    // Update ScrollTrigger on Lenis scroll
    lenis.on('scroll', ScrollTrigger.update)

    // Set GSAP defaults for premium feel
    gsap.defaults({
      ease: 'power3.out',
      duration: 0.9,
    })

    return () => {
      gsap.ticker.remove(onRaf)
      lenis.destroy()
    }
  }, [])

  return (
    <GsapContext.Provider value={{ lenis: lenisRef.current }}>
      {children}
    </GsapContext.Provider>
  )
}
