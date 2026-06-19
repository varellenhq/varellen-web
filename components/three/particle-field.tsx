'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Ambient particle field — floating luminous dust motes.
 * Creates cinematic atmosphere and depth. Each particle has
 * independent drift speed and subtle glow via additive blending.
 */
export function ParticleField({ count = 200 }: { count?: number }) {
  const meshRef = useRef<THREE.Points>(null)

  const { positions, speeds, phases } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const speeds = new Float32Array(count)
    const phases = new Float32Array(count)

    for (let i = 0; i < count; i++) {
      // Distribute in a wide volume around the scene
      positions[i * 3] = (Math.random() - 0.5) * 20
      positions[i * 3 + 1] = (Math.random() - 0.5) * 14
      positions[i * 3 + 2] = (Math.random() - 0.5) * 16

      speeds[i] = 0.02 + Math.random() * 0.06
      phases[i] = Math.random() * Math.PI * 2
    }

    return { positions, speeds, phases }
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
      // Gentle upward float + sinusoidal drift
      posAttr.array[i3 + 1] += speeds[i] * 0.015
      posAttr.array[i3] += Math.sin(t * 0.3 + phases[i]) * 0.001
      posAttr.array[i3 + 2] += Math.cos(t * 0.2 + phases[i]) * 0.001

      // Wrap particles that float too high
      if (posAttr.array[i3 + 1] > 7) {
        posAttr.array[i3 + 1] = -7
      }
    }
    posAttr.needsUpdate = true

    // Slow global rotation for living feel
    meshRef.current.rotation.y = t * 0.008
  })

  return (
    <points ref={meshRef} geometry={geometry}>
      <pointsMaterial
        size={0.035}
        color="#ffffff"
        transparent
        opacity={0.4}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  )
}
