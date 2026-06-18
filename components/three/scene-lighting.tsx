'use client'

import { useTheme } from '@/components/theme-provider'
import { Environment } from '@react-three/drei'
import { useFrame } from '@react-three/fiber'
import { useRef } from 'react'
import * as THREE from 'three'

export function SceneLighting() {
  const { theme } = useTheme()
  const keyRef = useRef<THREE.DirectionalLight>(null)
  const fillRef = useRef<THREE.DirectionalLight>(null)
  const rimRef = useRef<THREE.DirectionalLight>(null)
  const ambientRef = useRef<THREE.AmbientLight>(null)

  const isDark = theme === 'dark'

  // Smoothly interpolate lighting values
  useFrame(() => {
    if (!keyRef.current || !fillRef.current || !rimRef.current || !ambientRef.current) return

    const targetKey = isDark ? 1.8 : 2.4
    const targetFill = isDark ? 0.4 : 0.6
    const targetRim = isDark ? 1.2 : 0.8
    const targetAmbient = isDark ? 0.15 : 0.35

    keyRef.current.intensity = THREE.MathUtils.lerp(keyRef.current.intensity, targetKey, 0.02)
    fillRef.current.intensity = THREE.MathUtils.lerp(fillRef.current.intensity, targetFill, 0.02)
    rimRef.current.intensity = THREE.MathUtils.lerp(rimRef.current.intensity, targetRim, 0.02)
    ambientRef.current.intensity = THREE.MathUtils.lerp(ambientRef.current.intensity, targetAmbient, 0.02)
  })

  return (
    <>
      {/* Ambient base */}
      <ambientLight ref={ambientRef} intensity={isDark ? 0.15 : 0.35} />

      {/* Key light — soft white from upper-right */}
      <directionalLight
        ref={keyRef}
        position={[8, 12, 5]}
        intensity={isDark ? 1.8 : 2.4}
        color="#f5f5f0"
        castShadow={false}
      />

      {/* Fill light — subtle graphite warmth from lower-left */}
      <directionalLight
        ref={fillRef}
        position={[-6, -3, 4]}
        intensity={isDark ? 0.4 : 0.6}
        color="#d4d4d4"
      />

      {/* Rim / backlight — silver edge highlight */}
      <directionalLight
        ref={rimRef}
        position={[0, 5, -10]}
        intensity={isDark ? 1.2 : 0.8}
        color="#e8e8e8"
      />

      {/* Environment for realistic reflections — studio look */}
      <Environment preset="studio" environmentIntensity={isDark ? 0.3 : 0.5} />
    </>
  )
}
