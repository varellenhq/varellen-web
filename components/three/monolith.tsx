'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { useTheme } from '@/components/theme-provider'
import * as THREE from 'three'

/**
 * Cinematic central monolith — the hero centerpiece.
 *
 * A tall architectural obelisk with emissive edge lines that
 * pulse with a breathing rhythm. Slowly rotates with scroll-linked
 * parallax. Physical material with clearcoat for luxury realism.
 */
export function Monolith({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const groupRef = useRef<THREE.Group>(null)
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const edgeRef = useRef<THREE.LineSegments>(null)
  const edgeMatRef = useRef<THREE.LineBasicMaterial>(null)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  // Target colors for smooth theme transitions
  const darkColor = useMemo(() => new THREE.Color('#181818'), [])
  const lightColor = useMemo(() => new THREE.Color('#a0a8b4'), [])
  const currentColor = useMemo(() => new THREE.Color('#181818'), [])

  // Edge geometry for the emissive wireframe outline
  const edgeGeo = useMemo(() => {
    const box = new THREE.BoxGeometry(1.6, 4.2, 1.6)
    return new THREE.EdgesGeometry(box)
  }, [])

  useFrame((state) => {
    if (!groupRef.current || !meshRef.current || !materialRef.current) return

    const t = state.clock.elapsedTime

    // Very slow Y-axis rotation — architectural reveal
    groupRef.current.rotation.y = t * 0.06
    // Subtle cinematic tilt
    groupRef.current.rotation.x = Math.sin(t * 0.12) * 0.03
    groupRef.current.rotation.z = Math.cos(t * 0.1) * 0.015

    // Breathing scale — subtle life
    const breathe = 1 + Math.sin(t * 0.35) * 0.012
    meshRef.current.scale.setScalar(breathe)

    // Scroll-linked Y offset — scene sinks as user scrolls
    const sp = scrollProgress.current
    groupRef.current.position.y = THREE.MathUtils.lerp(
      groupRef.current.position.y,
      0.2 - sp * 3,
      0.03
    )

    // Smooth theme color transition
    const targetColor = isDark ? darkColor : lightColor
    currentColor.lerp(targetColor, 0.02)
    materialRef.current.color.copy(currentColor)

    // Animate material properties for theme
    materialRef.current.metalness = THREE.MathUtils.lerp(
      materialRef.current.metalness,
      isDark ? 0.95 : 0.85,
      0.02
    )
    materialRef.current.roughness = THREE.MathUtils.lerp(
      materialRef.current.roughness,
      isDark ? 0.06 : 0.12,
      0.02
    )

    // Pulsing emissive edges — the "intelligence" glow
    if (edgeMatRef.current) {
      const pulse = 0.15 + Math.sin(t * 0.8) * 0.1
      const edgeAlpha = isDark ? pulse : pulse * 0.6
      edgeMatRef.current.opacity = edgeAlpha
      edgeMatRef.current.color.set(isDark ? '#667788' : '#8899aa')
    }
  })

  return (
    <group ref={groupRef} position={[0, 0.2, 0]}>
      <RoundedBox
        ref={meshRef}
        args={[1.6, 4.2, 1.6]}
        radius={0.06}
        smoothness={8}
        castShadow
      >
        <meshPhysicalMaterial
          ref={materialRef}
          color="#181818"
          metalness={0.95}
          roughness={0.06}
          clearcoat={1}
          clearcoatRoughness={0.08}
          envMapIntensity={2.5}
          emissive="#111122"
          emissiveIntensity={0.05}
        />
      </RoundedBox>

      {/* Emissive wireframe edges — architectural precision lines */}
      <lineSegments ref={edgeRef} geometry={edgeGeo} scale={meshRef.current?.scale.x ?? 1}>
        <lineBasicMaterial
          ref={edgeMatRef}
          color="#667788"
          transparent
          opacity={0.15}
          linewidth={1}
        />
      </lineSegments>
    </group>
  )
}
