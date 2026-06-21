'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Dynamic particle field — fast-rising luminous motes with varied sizes.
 * Additive blending creates ethereal glow that interacts with bloom.
 * Particles move fast enough to be visually engaging, not static dust.
 */
export function ParticleField({ count = 300 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, speeds, phases, sizes } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const phases = new Float32Array(count)
    const sizes = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 24
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 18

      speeds[i] = 0.04 + Math.random() * 0.12
      phases[i] = Math.random() * Math.PI * 2
      sizes[i] = 0.015 + Math.random() * 0.04
    }

    return { positions, speeds, phases, sizes }
  }, [count])

  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    return geo
  }, [positions])

  useFrame((state) => {
    if (!meshRef.current) return
    const posAttr = meshRef.current.geometry.getAttribute('position')
    const t = state.clock.elapsedTime

    for (let i = 0; i < count; i++) {
      const i3 = i * 3
      // Fast upward rise
      posAttr.array[i3 + 1] += speeds[i] * 0.04
      // Active horizontal drift
      posAttr.array[i3] += Math.sin(t * 0.8 + phases[i]) * 0.003
      posAttr.array[i3 + 2] += Math.cos(t * 0.6 + phases[i]) * 0.003

      // Wrap
      if (posAttr.array[i3 + 1] > 8) {
        posAttr.array[i3 + 1] = -8
      }
    }
    posAttr.needsUpdate = true

    // Visible rotation
    meshRef.current.rotation.y = t * 0.03
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.04}
        color="#aabbee"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
