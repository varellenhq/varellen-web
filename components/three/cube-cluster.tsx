'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { RoundedBox } from '@react-three/drei'
import { useTheme } from '@/components/theme-provider'
import * as THREE from 'three'

interface CubeData {
  position: [number, number, number]
  scale: number
  rotSpeed: [number, number, number]
  orbitRadius: number
  orbitSpeed: number
  orbitPhase: number
  yOffset: number
}

/**
 * Orbiting cube constellation — fast, deliberate, energetic.
 * Cubes orbit the central monolith at different radii and speeds,
 * with independent tumble rotation. Emissive surfaces interact
 * with bloom for cinematic glow.
 */
export function CubeCluster({
  scrollProgress,
  count = 14,
}: {
  scrollProgress: React.MutableRefObject<number>
  count?: number
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const cubes = useMemo<CubeData[]>(() => {
    const data: CubeData[] = []
    for (let i = 0; i < count; i++) {
      const ring = i % 3
      const radius = ring === 0 ? 3 + Math.random() * 2 : ring === 1 ? 5.5 + Math.random() * 2 : 8 + Math.random() * 2
      data.push({
        position: [0, 0, 0],
        scale: 0.1 + Math.random() * 0.28,
        rotSpeed: [
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 2.5,
          (Math.random() - 0.5) * 1.5,
        ],
        orbitRadius: radius,
        orbitSpeed: (0.15 + Math.random() * 0.35) * (Math.random() > 0.5 ? 1 : -1),
        orbitPhase: Math.random() * Math.PI * 2,
        yOffset: (Math.random() - 0.5) * 5,
      })
    }
    return data
  }, [count])

  return (
    <group>
      {cubes.map((cube, i) => (
        <OrbitingCube
          key={i}
          data={cube}
          isDark={isDark}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  )
}

function OrbitingCube({
  data,
  isDark,
  scrollProgress,
}: {
  data: CubeData
  isDark: boolean
  scrollProgress: React.MutableRefObject<number>
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshPhysicalMaterial>(null)

  const darkColor = useMemo(() => new THREE.Color('#8a9aaf'), [])
  const lightColor = useMemo(() => new THREE.Color('#4a4f5a'), [])
  const currentColor = useMemo(() => new THREE.Color('#8a9aaf'), [])

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return

    const t = state.clock.elapsedTime
    const sp = scrollProgress.current

    // Fast independent tumble rotation
    meshRef.current.rotation.x += data.rotSpeed[0] * 0.012
    meshRef.current.rotation.y += data.rotSpeed[1] * 0.012
    meshRef.current.rotation.z += data.rotSpeed[2] * 0.012

    // Orbital motion around center
    const angle = t * data.orbitSpeed + data.orbitPhase
    meshRef.current.position.x = Math.cos(angle) * data.orbitRadius
    meshRef.current.position.z = Math.sin(angle) * data.orbitRadius * 0.6
    meshRef.current.position.y = data.yOffset + Math.sin(t * 0.8 + data.orbitPhase) * 0.5 - sp * 2.5

    // Theme color
    const targetColor = isDark ? darkColor : lightColor
    currentColor.lerp(targetColor, 0.04)
    materialRef.current.color.copy(currentColor)

    // Bright emissive pulse
    const emPulse = Math.sin(t * 1.5 + data.orbitPhase) * 0.5 + 0.5
    materialRef.current.emissiveIntensity = isDark ? emPulse * 0.18 : emPulse * 0.06
  })

  return (
    <RoundedBox
      ref={meshRef}
      scale={data.scale}
      args={[1, 1, 1]}
      radius={0.06}
      smoothness={4}
    >
      <meshPhysicalMaterial
        ref={materialRef}
        color="#8a9aaf"
        metalness={1}
        roughness={0.05}
        clearcoat={1}
        clearcoatRoughness={0.08}
        envMapIntensity={3.5}
        emissive="#3355aa"
        emissiveIntensity={0.08}
      />
    </RoundedBox>
  )
}
