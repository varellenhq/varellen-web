'use client'

import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import { useTheme } from '@/components/theme-provider'
import * as THREE from 'three'

/**
 * Floating elements — fast-spinning rings, translucent panels, crystalline fragments.
 * Everything moves with purpose and energy, not sluggishness.
 */
export function FloatingElements({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <group>
      {/* Fast-spinning metallic rings */}
      <Ring position={[-5, 2.5, -2.5]} scale={1.4} isDark={isDark} scrollProgress={scrollProgress} rotAxis="x" speed={0.5} />
      <Ring position={[5.5, -1.8, -1.5]} scale={1.0} isDark={isDark} scrollProgress={scrollProgress} rotAxis="y" speed={0.4} />
      <Ring position={[-2.5, -3.5, 1.5]} scale={0.7} isDark={isDark} scrollProgress={scrollProgress} rotAxis="z" speed={0.6} />
      <Ring position={[3, 4, -4]} scale={0.55} isDark={isDark} scrollProgress={scrollProgress} rotAxis="x" speed={0.7} />
      <Ring position={[-6, 0, -3]} scale={0.4} isDark={isDark} scrollProgress={scrollProgress} rotAxis="y" speed={0.55} />

      {/* Glass panels */}
      <Panel position={[4.5, 3.5, -4.5]} rotation={[0.3, -0.5, 0.1]} isDark={isDark} scrollProgress={scrollProgress} size={[2.8, 0.03, 1.8]} />
      <Panel position={[-5.5, -0.8, -3.5]} rotation={[-0.2, 0.8, -0.15]} isDark={isDark} scrollProgress={scrollProgress} size={[2, 0.025, 1.3]} />
      <Panel position={[2, -3, -5]} rotation={[0.1, 0.3, 0.2]} isDark={isDark} scrollProgress={scrollProgress} size={[1.5, 0.02, 1]} />

      {/* Fast crystalline fragments */}
      <Fragment position={[3.5, -2.8, 2.5]} isDark={isDark} scrollProgress={scrollProgress} type="octahedron" scale={0.35} speed={1.2} />
      <Fragment position={[-4, 4, -2]} isDark={isDark} scrollProgress={scrollProgress} type="tetrahedron" scale={0.4} speed={0.9} />
      <Fragment position={[6.5, 1.5, -3]} isDark={isDark} scrollProgress={scrollProgress} type="octahedron" scale={0.25} speed={1.5} />
      <Fragment position={[-6, -2, 0.5]} isDark={isDark} scrollProgress={scrollProgress} type="icosahedron" scale={0.3} speed={1.0} />
      <Fragment position={[4, 3.5, 1]} isDark={isDark} scrollProgress={scrollProgress} type="dodecahedron" scale={0.2} speed={1.3} />
    </group>
  )
}

function Ring({
  position, scale, isDark, scrollProgress, rotAxis, speed,
}: {
  position: [number, number, number]; scale: number; isDark: boolean
  scrollProgress: React.MutableRefObject<number>; rotAxis: 'x' | 'y' | 'z'; speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const currentColor = useMemo(() => new THREE.Color('#b0b8c8'), [])

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return
    const t = state.clock.elapsedTime
    const sp = scrollProgress.current

    // Fast, visible rotation
    meshRef.current.rotation[rotAxis] = t * speed
    const secAxis = rotAxis === 'x' ? 'z' : rotAxis === 'y' ? 'x' : 'y'
    meshRef.current.rotation[secAxis] = Math.sin(t * speed * 0.7) * 0.5

    meshRef.current.position.y = position[1] + Math.sin(t * 0.6 + position[0]) * 0.5 - sp * 2

    targetColor.set(isDark ? '#b0b8c8' : '#5a6070')
    currentColor.lerp(targetColor, 0.04)
    matRef.current.color.copy(currentColor)

    // Emissive shimmer
    matRef.current.emissiveIntensity = 0.04 + Math.sin(t * 1.5 + position[0]) * 0.03
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      <torusGeometry args={[1, 0.025, 16, 80]} />
      <meshPhysicalMaterial
        ref={matRef}
        color="#b0b8c8"
        metalness={1}
        roughness={0.04}
        clearcoat={1}
        clearcoatRoughness={0.05}
        envMapIntensity={3}
        emissive="#334488"
        emissiveIntensity={0.04}
      />
    </mesh>
  )
}

function Panel({
  position, rotation, isDark, scrollProgress, size,
}: {
  position: [number, number, number]; rotation: [number, number, number]; isDark: boolean
  scrollProgress: React.MutableRefObject<number>; size: [number, number, number]
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const currentColor = useMemo(() => new THREE.Color('#2a2e38'), [])

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return
    const t = state.clock.elapsedTime
    const sp = scrollProgress.current

    meshRef.current.rotation.y = rotation[1] + Math.sin(t * 0.3) * 0.08
    meshRef.current.rotation.x = rotation[0] + Math.cos(t * 0.35) * 0.05
    meshRef.current.position.y = position[1] + Math.sin(t * 0.5 + position[2]) * 0.4 - sp * 1.5

    targetColor.set(isDark ? '#2a2e38' : '#909498')
    currentColor.lerp(targetColor, 0.04)
    matRef.current.color.copy(currentColor)
  })

  return (
    <mesh ref={meshRef} position={position} rotation={rotation}>
      <boxGeometry args={size} />
      <meshPhysicalMaterial
        ref={matRef}
        color="#2a2e38"
        metalness={0.85}
        roughness={0.05}
        transmission={0.7}
        ior={1.5}
        thickness={0.5}
        envMapIntensity={2.5}
        transparent
        opacity={0.85}
      />
    </mesh>
  )
}

function Fragment({
  position, isDark, scrollProgress, type, scale, speed,
}: {
  position: [number, number, number]; isDark: boolean
  scrollProgress: React.MutableRefObject<number>
  type: 'octahedron' | 'tetrahedron' | 'icosahedron' | 'dodecahedron'; scale: number; speed: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const matRef = useRef<THREE.MeshPhysicalMaterial>(null)
  const targetColor = useMemo(() => new THREE.Color(), [])
  const currentColor = useMemo(() => new THREE.Color('#c8ccd6'), [])

  useFrame((state) => {
    if (!meshRef.current || !matRef.current) return
    const t = state.clock.elapsedTime
    const sp = scrollProgress.current

    // Fast, energetic spin
    meshRef.current.rotation.x = t * speed * 0.8
    meshRef.current.rotation.y = t * speed * 0.6
    meshRef.current.rotation.z = t * speed * 0.3
    meshRef.current.position.y =
      position[1] + Math.sin(t * 0.7 + position[0] * 2) * 0.6 - sp * 1.8

    targetColor.set(isDark ? '#c8ccd6' : '#555b65')
    currentColor.lerp(targetColor, 0.04)
    matRef.current.color.copy(currentColor)

    matRef.current.emissiveIntensity = isDark
      ? 0.06 + Math.sin(t * 1.2 + position[0]) * 0.05
      : 0.02
  })

  return (
    <mesh ref={meshRef} position={position} scale={scale}>
      {type === 'octahedron' && <octahedronGeometry args={[1, 0]} />}
      {type === 'icosahedron' && <icosahedronGeometry args={[1, 0]} />}
      {type === 'tetrahedron' && <tetrahedronGeometry args={[1, 0]} />}
      {type === 'dodecahedron' && <dodecahedronGeometry args={[1, 0]} />}
      <meshPhysicalMaterial
        ref={matRef}
        color="#c8ccd6"
        metalness={0.95}
        roughness={0.06}
        clearcoat={1}
        clearcoatRoughness={0.1}
        envMapIntensity={3}
        emissive="#334488"
        emissiveIntensity={0.06}
      />
    </mesh>
  )
}
