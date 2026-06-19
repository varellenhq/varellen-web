'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTheme } from '@/components/theme-provider'
import * as THREE from 'three'

/**
 * Secondary floating elements — metallic rings, glass panels, geometric fragments.
 * Creates visual depth, architectural feel, and cinematic atmosphere.
 * Each element type has unique motion characteristics and material properties.
 */
export function FloatingElements({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <group>
      {/* Metallic rings — orbiting at different planes */}
      <Ring
        position={[-5, 2.5, -2.5]}
        scale={1.3}
        isDark={isDark}
        scrollProgress={scrollProgress}
        rotAxis="x"
        speed={0.1}
      />
      <Ring
        position={[5.5, -1.8, -1.5]}
        scale={0.9}
        isDark={isDark}
        scrollProgress={scrollProgress}
        rotAxis="y"
        speed={0.08}
      />
      <Ring
        position={[-2.5, -3.5, 1.5]}
        scale={0.65}
        isDark={isDark}
        scrollProgress={scrollProgress}
        rotAxis="z"
        speed={0.12}
      />
      <Ring
        position={[3, 4, -4]}
        scale={0.5}
        isDark={isDark}
        scrollProgress={scrollProgress}
        rotAxis="x"
        speed={0.14}
      />

      {/* Glass panels — floating architectural planes */}
      <Panel
        position={[4.5, 3.5, -4.5]}
        rotation={[0.3, -0.5, 0.1]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        size={[2.8, 0.03, 1.8]}
      />
      <Panel
        position={[-5.5, -0.8, -3.5]}
        rotation={[-0.2, 0.8, -0.15]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        size={[2, 0.025, 1.3]}
      />
      <Panel
        position={[2, -3, -5]}
        rotation={[0.1, 0.3, 0.2]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        size={[1.5, 0.02, 1]}
      />

      {/* Geometric fragments — sharp crystalline shapes */}
      <Fragment
        position={[3.5, -2.8, 2.5]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        type="octahedron"
        scale={0.3}
      />
      <Fragment
        position={[-4, 4, -2]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        type="tetrahedron"
        scale={0.35}
      />
      <Fragment
        position={[6.5, 1.5, -3]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        type="octahedron"
        scale={0.22}
      />
      <Fragment
        position={[-6, -2, 0.5]}
        isDark={isDark}
        scrollProgress={scrollProgress}
        type="icosahedron"
        scale={0.28}
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
  scrollProgress: React.MutableRefObject<number>
  rotAxis: 'x' | 'y' | 'z'
  speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const currentColor = useMemo(() => new THREE.Color('#b0b8c8'), [])

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return
    const t = state.clock.elapsedTime
    const sp = scrollProgress.current

    meshRef.current.rotation[rotAxis] = t * speed
    // Secondary axis rotation for more complex motion
    const secAxis = rotAxis === 'x' ? 'z' : rotAxis === 'y' ? 'x' : 'y'
    meshRef.current.rotation[secAxis] = Math.sin(t * speed * 0.5) * 0.3

    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.18 + position[0]) * 0.35 - sp * 1.4

    targetColor.set(isDark ? '#b0b8c8' : '#5a6070')
    currentColor.lerp(targetColor, 0.02)
    matRef.current.color.copy(currentColor)
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.035, 16, 64]} />
      <meshPhysicalMaterial
        ref={matRef}
        color="#b0b8c8"
        metalness={1}
        roughness={0.08}
        clearcoat={1}
        clearcoatRoughness={0.08}
        envMapIntensity={2.5}
        emissive="#223344"
        emissiveIntensity={0.03}
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
  scrollProgress: React.MutableRefObject<number>
  size: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const currentColor = useMemo(() => new THREE.Color('#2a2e38'), [])

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return
    const t = state.clock.elapsedTime
    const sp = scrollProgress.current

    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.07) * 0.04
    meshRef.current.rotation.x = rotation[0] + Math.cos(t * 0.09) * 0.025
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.13 + position[2]) * 0.25 - sp * 1.0

    targetColor.set(isDark ? '#2a2e38' : '#909498')
    currentColor.lerp(targetColor, 0.02)
    matRef.current.color.copy(currentColor)
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        ref={matRef}
        color="#2a2e38"
        metalness={0.85}
        roughness={0.08}
        transmission={0.6}
        ior={1.5}
        thickness={0.5}
        envMapIntensity={2}
        transparent
        opacity={0.8}
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
  scrollProgress: React.MutableRefObject<number>
  type: 'octahedron' | 'tetrahedron' | 'icosahedron'
  scale: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const currentColor = useMemo(() => new THREE.Color('#c8ccd6'), [])

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return
    const t = state.clock.elapsedTime
    const sp = scrollProgress.current

    meshRef.current.rotation.x = t * 0.15
    meshRef.current.rotation.y = t * 0.1
    meshRef.current.rotation.z = t * 0.05
    meshRef.current.position.y =
      position[1] +
      Math.sin(t * 0.22 + position[0] * 2) * 0.4 -
      sp * 1.2

    targetColor.set(isDark ? '#c8ccd6' : '#555b65')
    currentColor.lerp(targetColor, 0.02)
    matRef.current.color.copy(currentColor)

    // Subtle emissive shimmer
    matRef.current.emissiveIntensity = isDark
      ? 0.03 + Math.sin(t * 0.5 + position[0]) * 0.02
      : 0.01
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {type === 'octahedron' ? (
        <octahedronGeometry args={[1, 0]} />
      ) : type === 'icosahedron' ? (
        <icosahedronGeometry args={[1, 0]} />
      ) : (
        <tetrahedronGeometry args={[1, 0]} />
      )}
      <meshPhysicalMaterial
        ref={matRef}
        color="#c8ccd6"
        metalness={0.92}
        roughness={0.1}
        clearcoat={1}
        clearcoatRoughness={0.15}
        envMapIntensity={2}
        emissive="#223344"
        emissiveIntensity={0.03}
      />
    </mesh>
  )
}
