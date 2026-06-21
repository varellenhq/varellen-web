'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox, MeshTransmissionMaterial } from '@react-three/drei'
import { useTheme } from '@/components/theme-provider'
import * as THREE from 'three'

/**
 * Hero monolith — a commanding architectural centerpiece.
 *
 * Tall obsidian obelisk with:
 * - Assertive rotation (not sluggish)
 * - Bright emissive edge wireframe that pulses with energy
 * - Glass-like clearcoat with high reflections
 * - Responsive scroll parallax
 */
export function Monolith({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const edgeRef = useRef<THREE.LineSegments>(null)
  const edgeMatRef = useRef<THREE.LineBasicMaterial>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const darkColor = useMemo(() => new THREE.Color('#141416'), [])
  const lightColor = useMemo(() => new THREE.Color('#a0a8b4'), [])
  const currentColor = useMemo(() => new THREE.Color('#141416'), [])

  const edgeGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(1.6, 4.4, 1.6)
    return new THREE.EdgesGeometry(box)
  }, [])

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current || !materialRef.current) return

    const t = state.clock.elapsedTime

    // Confident, visible rotation — not sluggish
    groupRef.current.rotation.y = t * 0.25
    groupRef.current.rotation.x = Math.sin(t * 0.4) * 0.06
    groupRef.current.rotation.z = Math.cos(t * 0.35) * 0.03

    // Breathing scale
    const breathe = 1 + Math.sin(t * 1.2) * 0.018
    meshRef.current.scale.setScalar(breathe)

    // Scroll parallax
    const sp = scrollProgress.current
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      0.2 - sp * 4,
      0.06
    )

    // Theme color
    const targetColor = isDark ? darkColor : lightColor
    currentColor.lerp(targetColor, 0.04)
    materialRef.current.color.copy(currentColor)

    materialRef.current.metalness = THREE.MathUtils.lerp(
      materialRef.current.metalness,
      isDark ? 0.97 : 0.85,
      0.04
    )
    materialRef.current.roughness = THREE.MathUtils.lerp(
      materialRef.current.roughness,
      isDark ? 0.04 : 0.1,
      0.04
    )

    // Bright pulsing edges — the "intelligence" signature
    if (edgeMatRef.current) {
      const pulse = 0.35 + Math.sin(t * 2.0) * 0.25
      edgeMatRef.current.opacity = isDark ? pulse : pulse * 0.5
      edgeMatRef.current.color.set(isDark ? '#5588cc' : '#7799bb')
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <RoundedBox
        ref={meshRef}
        args={[1.6, 4.4, 1.6]}
        radius={0.05}
        smoothness={8}
        castShadow
      >
        <meshPhysicalMaterial
          ref={materialRef}
          color="#141416"
          metalness={0.97}
          roughness={0.04}
          clearcoat={1}
          clearcoatRoughness={0.05}
          envMapIntensity={3.5}
          emissive="#1a2240"
          emissiveIntensity={0.12}
        />
      </RoundedBox>

      {/* Bright wireframe edges */}
      <lineSegments ref={edgeRef} geometry={edgeGeo}>
        <lineBasicMaterial
          ref={edgeMatRef}
          color="#5588cc"
          transparent
          opacity={0.35}
          linewidth={1}
        />
      </lineSegments>
    </group>
  )
}
