'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { useTheme } from '@/components/theme-provider'
import * as THREE from 'three'

/**
 * Large central graphite structure — the hero centerpiece.
 * Architectural, luxury industrial appearance.
 * Very slow rotation, subtle breathing scale.
 */
export function Monolith({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Target colors for smooth theme transitions
  const darkColor = useMemo(() => new THREE.Color('#1f1f1f'), [])
  const lightColor = useMemo(() => new THREE.Color('#9ca3af'), [])
  const currentColor = useMemo(() => new THREE.Color('#1f1f1f'), [])

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
    
    // Animate premium material properties
    materialRef.current.metalness = THREE.MathUtils.lerp(
      materialRef.current.metalness,
      isDark ? 0.95 : 0.85,
      0.02
    )
    materialRef.current.roughness = THREE.MathUtils.lerp(
      materialRef.current.roughness,
      isDark ? 0.08 : 0.15,
      0.02
    )
  })

  return (
    <RoundedBox 
      ref={meshRef} 
      position={[0, 0.3, 0]} 
      args={[1.6, 3.8, 1.6]} 
      radius={0.08} 
      smoothness={8} 
      castShadow
    >
      <meshPhysicalMaterial
        ref={materialRef}
        color="#1f1f1f"
        metalness={0.95}
        roughness={0.08}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={2}
      />
    </RoundedBox>
  )
}
