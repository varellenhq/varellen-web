'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTheme } from '@/components/theme-provider'
import * as THREE from 'three'

/**
 * Secondary floating elements — metallic rings, abstract panels, geometric fragments.
 * Creates visual depth and architectural feel.
 */
export function FloatingElements({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <group>
      {/* Metallic rings */}
      <Ring
        position={[-4.5, 2.2, -2]}
        scale={1.2}
        isDark={isDark}
        scrollProgress={scrollProgress}
        rotAxis="x"
        speed={0.12}
      />
      <Ring
        position={[5, -1.5, -1]}
        scale={0.8}
        isDark={isDark}
        scrollProgress={scrollProgress}
        rotAxis="y"
        speed={0.09}
      />
      <Ring
        position={[-2, -3, 1]}
        scale={0.6}
        isDark={isDark}
        scrollProgress={scrollProgress}
        rotAxis="z"
        speed={0.15}
      />

      {/* Abstract panels */}
      <Panel
        position={[4, 3, -4]}
        rotation={[0.3, -0.5, 0.1]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        size={[2.5, 0.04, 1.5]}
      />
      <Panel
        position={[-5, -0.5, -3]}
        rotation={[-0.2, 0.8, -0.15]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        size={[1.8, 0.03, 1.2]}
      />

      {/* Geometric fragments */}
      <Fragment
        position={[3, -2.5, 2]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        type="octahedron"
        scale={0.35}
      />
      <Fragment
        position={[-3.5, 3.5, -1.5]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        type="tetrahedron"
        scale={0.4}
      />
      <Fragment
        position={[6, 1, -2.5]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        type="octahedron"
        scale={0.25}
      />
    </group>
  )
}

function Ring({
  position,
  scale,
  isDark,
  scrollProgress,
  rotAxis,
  speed,
}: {
  position: [number, number, number]
  scale: number
  isDark: boolean
  scrollProgress: number
  rotAxis: 'x' | 'y' | 'z'
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const currentColor = useMemo(() => new THREE.Color('#b0b0b0'), [])

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return
    const t = state.clock.elapsedTime

    meshRef.current.rotation[rotAxis] = t * speed
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.2 + position[0]) * 0.3 - scrollProgress * 1.2

    targetColor.set(isDark ? '#b0b0b0' : '#5a5a5a')
    currentColor.lerp(targetColor, 0.02)
    matRef.current.color.copy(currentColor)
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.04, 16, 48]} />
      <meshStandardMaterial
        ref={matRef}
        color="#b0b0b0"
        metalness={0.95}
        roughness={0.1}
        envMapIntensity={1.3}
      />
    </mesh>
  )
}

function Panel({
  position,
  rotation,
  isDark,
  scrollProgress,
  size,
}: {
  position: [number, number, number]
  rotation: [number, number, number]
  isDark: boolean
  scrollProgress: number
  size: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const currentColor = useMemo(() => new THREE.Color('#333333'), [])

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return
    const t = state.clock.elapsedTime

    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.08) * 0.05
    meshRef.current.rotation.x = rotation[0] + Math.cos(t * 0.1) * 0.03
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.15 + position[2]) * 0.2 - scrollProgress * 0.8

    targetColor.set(isDark ? '#333333' : '#999999')
    currentColor.lerp(targetColor, 0.02)
    matRef.current.color.copy(currentColor)
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshStandardMaterial
        ref={matRef}
        color="#333333"
        metalness={0.88}
        roughness={0.2}
        envMapIntensity={0.9}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

function Fragment({
  position,
  isDark,
  scrollProgress,
  type,
  scale,
}: {
  position: [number, number, number]
  isDark: boolean
  scrollProgress: number
  type: 'octahedron' | 'tetrahedron'
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshStandardMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const currentColor = useMemo(() => new THREE.Color('#d0d0d0'), [])

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return
    const t = state.clock.elapsedTime

    meshRef.current.rotation.x = t * 0.18
    meshRef.current.rotation.y = t * 0.12
    meshRef.current.position.y =
      position[1] +
      Math.sin(t * 0.25 + position[0] * 2) * 0.35 -
      scrollProgress * 1.0

    targetColor.set(isDark ? '#d0d0d0' : '#606060')
    currentColor.lerp(targetColor, 0.02)
    matRef.current.color.copy(currentColor)
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {type === 'octahedron' ? (
        <octahedronGeometry args={[1, 0]} />
      ) : (
        <tetrahedronGeometry args={[1, 0]} />
      )}
      <meshStandardMaterial
        ref={matRef}
        color="#d0d0d0"
        metalness={0.9}
        roughness={0.14}
        envMapIntensity={1.1}
      />
    </mesh>
  )
}
