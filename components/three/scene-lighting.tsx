'use client'

import { useTheme } from '@/components/theme-provider'
import { Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

/**
 * High-contrast cinematic lighting rig.
 * Dramatic, not subtle. Key light is hot, fill is cool blue,
 * rim is crisp white, accent glows from below.
 */
export function SceneLighting() {
  const { theme } = useTheme()
  const keyRef = useRef<THREE.DirectionalLight>(null)
  const fillRef = useRef<THREE.DirectionalLight>(null)
  const rimRef = useRef<THREE.DirectionalLight>(null)
  const accentRef = useRef<THREE.PointLight>(null)
  const ambientRef = useRef<THREE.AmbientLight>(null)
  const isDark = theme === 'dark'

  useFrame(() => {
    if (!keyRef.current || !fillRef.current || !rimRef.current || !ambientRef.current || !accentRef.current) return
    keyRef.current.intensity = THREE.MathUtils.lerp(keyRef.current.intensity, isDark ? 2.8 : 3.2, 0.04)
    fillRef.current.intensity = THREE.MathUtils.lerp(fillRef.current.intensity, isDark ? 0.7 : 0.9, 0.04)
    rimRef.current.intensity = THREE.MathUtils.lerp(rimRef.current.intensity, isDark ? 2.0 : 1.2, 0.04)
    accentRef.current.intensity = THREE.MathUtils.lerp(accentRef.current.intensity, isDark ? 1.5 : 0.5, 0.04)
    ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, isDark ? 0.15 : 0.35, 0.04)
  })

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.15} />
      <directionalLight ref={keyRef} position={[8, 14, 6]} intensity={2.8} color="#fff5e6" />
      <directionalLight ref={fillRef} position={[-7, -4, 5]} intensity={0.7} color="#a0b8e0" />
      <directionalLight ref={rimRef} position={[0, 6, -12]} intensity={2.0} color="#e8ecf4" />
      <pointLight ref={accentRef} position={[0, -5, 2]} intensity={1.5} color="#3366cc" distance={18} decay={2} />
      <Environment preset="studio" environmentIntensity={isDark ? 0.45 : 0.6} />
    </>
  )
}
