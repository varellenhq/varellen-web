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
  driftSpeed: number
  driftAmplitude: [number, number, number]
  phase: number
}

/**
 * Floating metallic cube clusters — distributed across depth layers.
 * Each cube has independent rotation + sinusoidal drift.
 */
export function CubeCluster({
  scrollProgress,
  count = 10,
}: {
  scrollProgress: React.MutableRefObject<number>
  count?: number
}) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  const cubes = useMemo<CubeData[]>(() => {
    const data: CubeData[] = []
    for (let i = 0; i < count; i++) {
      const layer = i % 3 // 0=foreground, 1=midground, 2=background
      const zBase = layer === 0 ? 2 : layer === 1 ? 0 : -3
      data.push({
        position: [
          (Math.random() - 0.5) * 12,
          (Math.random() - 0.5) * 6,
          zBase + (Math.random() - 0.5) * 2,
        ],
        scale: 0.15 + Math.random() * 0.35,
        rotSpeed: [
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.3,
          (Math.random() - 0.5) * 0.15,
        ],
        driftSpeed: 0.15 + Math.random() * 0.3,
        driftAmplitude: [
          0.2 + Math.random() * 0.4,
          0.15 + Math.random() * 0.3,
          0.1 + Math.random() * 0.2,
        ],
        phase: Math.random() * Math.PI * 2,
      })
    }
    return data
  }, [count])

  return (
    <group>
      {cubes.map((cube, i) => (
        <FloatingCube
          key={i}
          data={cube}
          isDark={isDark}
          scrollProgress={scrollProgress}
        />
      ))}
    </group>
  )
}

function FloatingCube({
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

  const darkColor = useMemo(() => new THREE.Color('#9ca3af'), [])
  const lightColor = useMemo(() => new THREE.Color('#4a4a4a'), [])
  const currentColor = useMemo(() => new THREE.Color('#9ca3af'), [])

  useFrame((state) => {
    if (!meshRef.current || !materialRef.current) return

    const t = state.clock.elapsedTime
    const sp = scrollProgress.current

    // Independent rotation
    meshRef.current.rotation.x += data.rotSpeed[0] * 0.008
    meshRef.current.rotation.y += data.rotSpeed[1] * 0.008
    meshRef.current.rotation.z += data.rotSpeed[2] * 0.008

    // Sinusoidal drift
    const phase = data.phase
    meshRef.current.position.x =
      data.position[0] + Math.sin(t * data.driftSpeed + phase) * data.driftAmplitude[0]
    meshRef.current.position.y =
      data.position[1] +
      Math.cos(t * data.driftSpeed * 0.7 + phase) * data.driftAmplitude[1] -
      sp * 1.5
    meshRef.current.position.z =
      data.position[2] + Math.sin(t * data.driftSpeed * 0.5 + phase + 1) * data.driftAmplitude[2]

    // Theme color
    const targetColor = isDark ? darkColor : lightColor
    currentColor.lerp(targetColor, 0.02)
    materialRef.current.color.copy(currentColor)
  })

  return (
    <RoundedBox 
      ref={meshRef} 
      position={data.position} 
      scale={data.scale}
      args={[1, 1, 1]}
      radius={0.06}
      smoothness={4}
    >
      <meshPhysicalMaterial
        ref={materialRef}
        color="#9ca3af"
        metalness={1}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={2.5}
      />
    </RoundedBox>
  )
}
