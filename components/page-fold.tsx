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
  const [peakSize, setPeakSize] = useState(1500)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      // diagonal of the screen * 2.5 to be safe
      setPeakSize(Math.max(window.innerWidth, window.innerHeight) * 2.5)
    }
  }, [])

  // progress 0 -> 1 from BASE -> peakSize
  const shadowBlur = useTransform(size, [BASE, 500], [15, 60])
  const shadowSpread = useTransform(size, [BASE, 500], [0, 5])
  
  // Clean, realistic drop shadow cast by the flap
  const shadowFilter = useMotionTemplate`drop-shadow(0px 0px ${shadowBlur}px rgba(0,0,0,0.6))`

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
    
    // 1. Peel the page across the entire screen (Sped up)
    await animate(size, peakSize, { duration: 0.55, ease: [0.65, 0, 0.1, 1] }).finished
    
    // 2. The screen is now completely covered by the exposed inverted background.
    // Swap the actual DOM theme.
    toggleTheme()
    
    // 3. Wait a tiny bit for React to apply the theme to the DOM underneath
    await new Promise((r) => setTimeout(r, 30))
    
    // 4. Instantly snap the flap back to 0. Since the DOM is now the new theme, this is invisible.
    size.set(0)
    
    // 5. Animate the flap back to its resting BASE size (Sped up)
    await animate(size, BASE, {
      duration: 0.4,
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
        // Find the maximum drag distance in either the X (left) or Y (down) direction
        // This ensures the fold's corner perfectly aligns with the mouse pointer
        const pull = Math.max(0, -info.offset.x, info.offset.y)
        size.set(Math.min(peakSize, BASE + pull))
      }}
      onDragEnd={(_, info) => {
        draggingRef.current = false
        const pull = Math.max(0, -info.offset.x, info.offset.y)
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
      {/* 1. EXPOSED AREA (Shows the new theme underneath using solid color for max performance) */}
      <motion.div
        className={`absolute inset-0 ${flapClass}`}
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)', // Top-Right triangle
        }}
        aria-hidden
      />

      {/* 2. THE FLAP (Folded over, casting a shadow onto the exposed page) */}
      <motion.div
        className={`absolute inset-0 ${flapClass}`}
        style={{
          clipPath: 'polygon(0 0, 100% 100%, 0 100%)', // Bottom-Left triangle
          filter: shadowFilter, // Realistic drop shadow
        }}
        aria-hidden
      >
        {/* Real paper grain texture */}
        <div
          className="absolute inset-0 mix-blend-overlay opacity-20 pointer-events-none"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />
        
        {/* Photorealistic 3D curl shading */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `linear-gradient(45deg, 
              rgba(0,0,0,0.1) 0%, 
              transparent 20%, 
              ${theme === 'dark' ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.4)'} 45%, 
              rgba(0,0,0,0.5) 50%, 
              transparent 50.5%
            )`,
          }}
        />
      </motion.div>

      {/* 3. MODE LABEL (Sits on the folded flap) */}
      <motion.span
        className={`pointer-events-none absolute left-4 bottom-4 font-mono text-[9px] font-medium uppercase tracking-[0.18em] ${labelClass}`}
        style={{ opacity: useTransform(size, [BASE, BASE + 50], [1, 0]) }}
      >
        {theme === 'dark' ? 'Light' : 'Dark'}
      </motion.span>
    </motion.div>
  )
}
