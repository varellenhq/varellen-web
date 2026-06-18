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
const PEAK = 300 // size at full peel / click sweep
const THRESHOLD = 150 // drag distance to commit the flip

export function PageFold() {
  const { theme, toggleTheme } = useTheme()
  const size = useMotionValue(BASE)
  const [busy, setBusy] = useState(false)
  const [hovered, setHovered] = useState(false)
  const draggingRef = useRef(false)

  // progress 0 -> 1 from BASE -> PEAK
  const progress = useTransform(size, [BASE, PEAK], [0, 1])
  const creaseOpacity = useTransform(progress, [0, 1], [0.35, 0.7])
  const shadowBlur = useTransform(size, [BASE, PEAK], [14, 60])
  const shadowSpread = useTransform(size, [BASE, PEAK], [-6, -10])
  const shadowFilter = useMotionTemplate`drop-shadow(-2px 2px ${shadowBlur}px rgba(0,0,0,0.55))`

  const px = useMotionTemplate`${size}px`

  // The flap shows the OPPOSITE theme's surface (the back of the page)
  const flapClass =
    theme === 'dark'
      ? 'from-[#f7f7f7] via-[#e6e8ec] to-[#cdd1d6]'
      : 'from-[#1d1d1d] via-[#0d0d0d] to-[#050505]'
  const labelClass = theme === 'dark' ? 'text-[#0a0a0a]' : 'text-[#f5f5f5]'

  const settle = (to: number) => {
    animate(size, to, { type: 'spring', stiffness: 220, damping: 26 })
  }

  const flip = async () => {
    if (busy) return
    setBusy(true)
    await animate(size, PEAK, { duration: 0.42, ease: [0.4, 0, 0.2, 1] })
      .finished
    toggleTheme()
    await animate(size, BASE, {
      duration: 0.5,
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
        size.set(Math.min(PEAK, BASE + pull))
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
        className={`absolute inset-0 bg-gradient-to-bl ${flapClass}`}
        style={{
          clipPath: 'polygon(100% 0, 100% 100%, 0 0)',
          filter: shadowFilter,
          marginRight: shadowSpread,
        }}
        aria-hidden
      >
        {/* crease highlight along the hypotenuse */}
        <div
          className="absolute inset-0 opacity-60"
          style={{
            background:
              'linear-gradient(225deg, transparent 49.4%, rgba(255,255,255,0.5) 49.7%, rgba(255,255,255,0.05) 50.2%, transparent 51%)',
          }}
        />
        {/* sun/silver highlight */}
        <div
          className="absolute inset-0 mix-blend-overlay"
          style={{
            background:
              'radial-gradient(120% 120% at 100% 0%, rgba(255,255,255,0.45), transparent 55%)',
          }}
        />
      </motion.div>

      {/* mode label sits in the flap */}
      <motion.span
        className={`pointer-events-none absolute right-2 top-2 font-mono text-[9px] font-medium uppercase tracking-[0.18em] ${labelClass}`}
        style={{ opacity: useTransform(progress, [0, 0.15], [1, 0]) }}
      >
        {theme === 'dark' ? 'Light' : 'Dark'}
      </motion.span>
    </motion.div>
  )
}
