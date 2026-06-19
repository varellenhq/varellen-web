'use client'

import { useTheme } from '@/components/theme-provider'
import { Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

/**
 * Cinematic studio lighting rig.
 *
 * Three-point lighting with color temperature separation:
 * - Key light: warm white from upper-right (simulates sunlight)
 * - Fill light: cool blue from lower-left (atmosphere)
 * - Rim/back light: silver edge highlight from behind (depth separation)
 * - Accent light: subtle blue from below (sci-fi / intelligence feel)
 *
 * All lights smoothly interpolate between dark and light theme values.
 */
export function SceneLighting() {
  const { theme } = useTheme()
  const keyRef = useRef<THREE.DirectionalLight>(null)
  const fillRef = useRef<THREE.DirectionalLight>(null)
  const rimRef = useRef<THREE.DirectionalLight>(null)
  const accentRef = useRef<THREE.PointLight>(null)
  const ambientRef = useRef<THREE.AmbientLight>(null)

  const isDark = theme === 'dark'

  // Smoothly interpolate lighting values for premium transitions
  useFrame(() => {
    if (!keyRef.current || !fillRef.current || !rimRef.current || !ambientRef.current || !accentRef.current) return

    const targetKey = isDark ? 2.0 : 2.6
    const targetFill = isDark ? 0.5 : 0.7
    const targetRim = isDark ? 1.4 : 0.9
    const targetAccent = isDark ? 0.8 : 0.3
    const targetAmbient = isDark ? 0.12 : 0.3

    keyRef.current.intensity = THREE.MathUtils.lerp(keyRef.current.intensity, targetKey, 0.02)
    fillRef.current.intensity = THREE.MathUtils.lerp(fillRef.current.intensity, targetFill, 0.02)
    rimRef.current.intensity = THREE.MathUtils.lerp(rimRef.current.intensity, targetRim, 0.02)
    accentRef.current.intensity = THREE.MathUtils.lerp(accentRef.current.intensity, targetAccent, 0.02)
    ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbient, 0.02)
  })

  return (
    <>
      {/* Ambient base — very subtle */}
      <ambientLight ref={ambientRef} intensity={isDark ? 0.12 : 0.3} />

      {/* Key light — warm white from upper-right (cinematic sun) */}
      <directionalLight
        ref={keyRef}
        position={[8, 14, 6]}
        intensity={isDark ? 2.0 : 2.6}
        color="#fff8ef"
        castShadow={false}
      />

      {/* Fill light — cool blue from lower-left (atmospheric) */}
      <directionalLight
        ref={fillRef}
        position={[-7, -4, 5]}
        intensity={isDark ? 0.5 : 0.7}
        color="#c8d4e8"
      />

      {/* Rim / backlight — crisp silver for edge separation */}
      <directionalLight
        ref={rimRef}
        position={[0, 6, -12]}
        intensity={isDark ? 1.4 : 0.9}
        color="#e0e4ec"
      />

      {/* Accent glow from below — subtle intelligence / sci-fi feel */}
      <pointLight
        ref={accentRef}
        position={[0, -5, 2]}
        intensity={isDark ? 0.8 : 0.3}
        color="#4466aa"
        distance={15}
        decay={2}
      />

      {/* Environment for realistic metallic reflections */}
      <Environment preset="studio" environmentIntensity={isDark ? 0.35 : 0.55} />
    </>
  )
}
