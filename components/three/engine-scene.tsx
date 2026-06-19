'use client'

import { Suspense, useEffect, useRef, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Monolith } from './monolith'
import { CubeCluster } from './cube-cluster'
import { FloatingElements } from './floating-elements'
import { SceneLighting } from './scene-lighting'
import { CameraRig } from './camera-rig'
import { ParticleField } from './particle-field'
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
import * as THREE from 'three'

/**
 * "The Engine of Intelligence" — cinematic 3D hero scene.
 *
 * Features:
 * - Floating metallic monolith centerpiece with emissive edges
 * - Orbiting cube clusters with reflective materials
 * - Atmospheric particle field for depth
 * - Cinematic post-processing: bloom, vignette
 * - Exponential fog for atmospheric depth
 * - Scroll-linked parallax and camera movement
 *
 * Conditionally simplified on mobile for performance.
 */
export function EngineScene() {
  const containerRef = useRef<HTMLDivElement>(null)
  const scrollProgress = useRef(0)
  const [isMobile, setIsMobile] = useState(false)

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
      scrollProgress.current = progress
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const dpr = isMobile
    ? Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 1.5)
    : Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 -z-10"
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
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.1,
        }}
        style={{ background: 'transparent' }}
      >
        <Suspense fallback={null}>
          {/* Atmospheric fog for cinematic depth */}
          <fog attach="fog" args={['#000000', 6, 22]} />

          <CameraRig scrollProgress={scrollProgress} />
          <SceneLighting />
          <Monolith scrollProgress={scrollProgress} />
          <CubeCluster
            scrollProgress={scrollProgress}
            count={isMobile ? 5 : 12}
          />
          {!isMobile && <FloatingElements scrollProgress={scrollProgress} />}
          <ParticleField count={isMobile ? 60 : 200} />

          {/* Cinematic post-processing */}
          <EffectComposer>
            <Bloom
              intensity={isMobile ? 0.3 : 0.5}
              luminanceThreshold={0.6}
              luminanceSmoothing={0.9}
              mipmapBlur
            />
            <Vignette
              offset={0.3}
              darkness={0.7}
            />
          </EffectComposer>
        </Suspense>
      </Canvas>
    </div>
  )
}
