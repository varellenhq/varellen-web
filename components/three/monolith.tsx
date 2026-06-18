'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTheme } from '@/components/theme-provider'
import * as THREE from 'three'

/**
 * Large central graphite structure — the hero centerpiece.
 * Architectural, luxury industrial appearance.
 * Very slow rotation, subtle breathing scale.
 */
export function Monolith({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshStandardMaterial>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Target colors for smooth theme transitions
  const darkColor = useMemo(() => new THREE.Color('#2a2a2a'), [])
  const lightColor = useMemo(() => new THREE.Color('#8a8a8a'), [])
  const currentColor = useMemo(() => new THREE.Color('#2a2a2a'), [])

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return

    const t = state.clock.elapsedTime

    // Very slow Y-axis rotation
    meshRef.current.rotation.y = t * 0.08
    // Subtle tilt
    meshRef.current.rotation.x = Math.sin(t * 0.15) * 0.04
    meshRef.current.rotation.z = Math.cos(t * 0.12) * 0.02

    // Breathing scale
    const breathe = 1 + Math.sin(t * 0.4) * 0.015
    meshRef.current.scale.setScalar(breathe)

    // Scroll-linked Y offset
    const sp = scrollProgress.current
    meshRef.current.position.y = THREE.MathUtils.lerp(
      meshRef.current.position.y,
      0.3 - sp * 2.5,
      0.03
    )

    // Smooth theme color transition
    const targetColor = isDark ? darkColor : lightColor
    currentColor.lerp(targetColor, 0.02)
    materialRef.current.color.copy(currentColor)
    materialRef.current.metalness = THREE.MathUtils.lerp(
      materialRef.current.metalness,
      isDark ? 0.92 : 0.85,
      0.02
    )
    materialRef.current.roughness = THREE.MathUtils.lerp(
      materialRef.current.roughness,
      isDark ? 0.12 : 0.18,
      0.02
    )
  })

  return (
    <mesh ref={meshRef} position={[0, 0.3, 0]} castShadow>
      <boxGeometry args={[1.6, 3.8, 1.6, 2, 2, 2]} />
      <meshStandardMaterial
        ref={materialRef}
        color="#2a2a2a"
        metalness={0.92}
        roughness={0.12}
        envMapIntensity={1.2}
      />
    </mesh>
  )
}
