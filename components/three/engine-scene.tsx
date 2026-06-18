'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Monolith } from './monolith'
import { CubeCluster } from './cube-cluster'
import { FloatingElements } from './floating-elements'
import { SceneLighting } from './scene-lighting'
import { CameraRig } from './camera-rig'

/**
 * "The Engine of Intelligence" — main 3D scene.
 *
 * Renders floating metallic monoliths, cube clusters, rings, panels, and fragments
 * with premium studio lighting and subtle camera interaction.
 *
 * Conditionally simplified on mobile for performance.
 */
export function EngineScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const onScroll = () => {
      const vh = window.innerHeight
      const progress = Math.min(window.scrollY / (vh * 1.5), 1)
      setScrollProgress(progress)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Delay ready state to prevent layout shift
  useEffect(() => {
    const timer = setTimeout(() => setIsReady(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const dpr = isMobile ? Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5) : Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10"
      style={{ opacity: isReady ? 1 : 0, transition: 'opacity 1.2s ease-out' }}
    >
      <Canvas
        dpr={dpr}
        camera={{ position: [0, 0, 8], fov: 45 }}
        gl={{
          antialias: !isMobile,
          alpha: true,
          powerPreference: 'high-performance',
          stencil: false,
          depth: true,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          <CameraRig scrollProgress={scrollProgress} />
          <SceneLighting />
          <Monolith scrollProgress={scrollProgress} />
          <CubeCluster
            scrollProgress={scrollProgress}
            count={isMobile ? 4 : 10}
          />
          {!isMobile && <FloatingElements scrollProgress={scrollProgress} />}
        </Suspense>
      </Canvas>
    </div>
  )
}
