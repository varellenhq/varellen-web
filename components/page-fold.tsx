'use client'

import { useEffect, useRef, useState } from 'react'
import {
  animate,
  motion,
  useMotionTemplate,
  useMotionValue,
  useTransform,
} from 'motion/react'
import { useTheme } from '@/components/theme-provider'

const BASE = 76 // resting peek size (px)
const HOVER = 104 // size on hover
const THRESHOLD = 150 // drag distance to commit the flip

export function PageFold() {
  const { theme, toggleTheme } = useTheme()
  const size = useMotionValue(BASE)
  const [busy, setBusy] = useState(false)
  const [hovered, setHovered] = useState(false)
  const draggingRef = useRef(false)

  // Use a large constant for PEAK to represent the full screen diagonal
  // We'll calculate the actual required size during the flip
  const [peakSize, setPeakSize] = useState(1500)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // diagonal of the screen * 2 to be safe
      setPeakSize(Math.max(window.innerWidth, window.innerHeight) * 2.5)
    }
  }, [])

  // progress 0 -> 1 from BASE -> peakSize
  const progress = useTransform(size, [BASE, 500], [0, 1]) // capped at 500 for the shadow effect
  const creaseOpacity = useTransform(progress, [0, 1], [0.35, 0.7])
  const shadowBlur = useTransform(size, [BASE, 500], [14, 80])
  const shadowSpread = useTransform(size, [BASE, 500], [-6, -20])
  const shadowFilter = useMotionTemplate`drop-shadow(-2px 2px ${shadowBlur}px rgba(0,0,0,0.5))`

  const px = useMotionTemplate`${size}px`

  // The flap shows the OPPOSITE theme's surface (the back of the page)
  const flapClass =
    theme === 'dark'
      ? 'bg-[#f7f7f7]' // Light theme background
      : 'bg-[#050505]' // Dark theme background
  const labelClass = theme === 'dark' ? 'text-[#0a0a0a]' : 'text-[#f5f5f5]'

  const settle = (to: number) => {
    animate(size, to, { type: 'spring', stiffness: 220, damping: 26 })
  }

  const flip = async () => {
    if (busy) return
    setBusy(true)
    
    // 1. Peel the page across the entire screen
    await animate(size, peakSize, { duration: 0.85, ease: [0.65, 0, 0.1, 1] }).finished
    
    // 2. The screen is now completely covered by the flap (which matches the target theme).
    // Swap the actual DOM theme.
    toggleTheme()
    
    // 3. Wait a tiny bit for React to apply the theme to the DOM underneath
    await new Promise((r) => setTimeout(r, 60))
    
    // 4. Instantly snap the flap back to 0. Since the DOM is now the new theme, this is invisible.
    size.set(0)
    
    // 5. Animate the flap back to its resting BASE size
    await animate(size, BASE, {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    }).finished
    
    setBusy(false)
    setHovered(false)
  }

  // Keyboard support
  const onKey = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      flip()
    }
  }

  useEffect(() => {
    if (busy || draggingRef.current) return
    settle(hovered ? HOVER : BASE)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hovered, busy])

  return (
    <motion.div
      className="fixed right-0 top-0 z-[60] cursor-pointer select-none"
      style={{ width: px, height: px }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0}
      dragMomentum={false}
      onDragStart={() => {
        draggingRef.current = true
      }}
      onDrag={(_, info) => {
        // peeling inward (down-left) grows the fold
        const pull = Math.max(0, -info.offset.x) + Math.max(0, info.offset.y)
        size.set(Math.min(500, BASE + pull))
      }}
      onDragEnd={(_, info) => {
        draggingRef.current = false
        const pull = Math.max(0, -info.offset.x) + Math.max(0, info.offset.y)
        if (pull > THRESHOLD) {
          flip()
        } else {
          settle(hovered ? HOVER : BASE)
        }
      }}
      onTap={() => {
        if (!draggingRef.current) flip()
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      onKeyDown={onKey}
      role="button"
      tabIndex={0}
      aria-label={`Fold the page corner to switch to ${
        theme === 'dark' ? 'light' : 'dark'
      } mode`}
    >
      {/* Soft shadow cast by the lifted flap onto the page */}
      <motion.div
        className="absolute inset-0"
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          background: 'rgba(0,0,0,1)',
          opacity: creaseOpacity,
          filter: shadowFilter,
          boxShadow: undefined,
        }}
        aria-hidden
      />

      {/* The peeled flap — back of the page, opposite theme */}
      <motion.div
        className={`absolute inset-0 ${flapClass}`}
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          filter: shadowFilter,
          marginRight: shadowSpread,
        }}
        aria-hidden
      >
        {/* crease highlight along the hypotenuse */}
        <div
          className="absolute inset-0 opacity-40 transition-opacity duration-300"
          style={{
            background:
              'linear-gradient(225deg, transparent 49.4%, rgba(255,255,255,0.4) 49.7%, rgba(255,255,255,0.05) 50.2%, transparent 51%)',
          }}
        />
        {/* sun/silver highlight */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-50"
          style={{
            background:
              'radial-gradient(120% 120% at 100% 0%, rgba(255,255,255,0.3), transparent 55%)',
          }}
        />
      </motion.div>

      {/* mode label sits in the flap */}
      <motion.span
        className={`pointer-events-none absolute right-2 top-2 font-mono text-[9px] font-medium uppercase tracking-[0.18em] ${labelClass}`}
        style={{ opacity: useTransform(size, [BASE, BASE + 50], [1, 0]) }}
      >
        {theme === 'dark' ? 'Light' : 'Dark'}
      </motion.span>
    </motion.div>
  )
}
