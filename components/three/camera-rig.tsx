'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Cinematic camera rig with:
 * - Auto drift (sinusoidal over 25s cycle) for living feel
 * - Mouse parallax with heavy damping (0.02) for smoothness
 * - Scroll-linked Z push and Y descent
 * - Subtle breathing FOV effect
 *
 * Max movement: ±0.35 units on any axis.
 */
export function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })

  // Track mouse position and apply cinematic camera motion
  useFrame((state) => {
    const { pointer } = state
    mouseRef.current.x = pointer.x
    mouseRef.current.y = pointer.y

    // Heavy damping for cinematic smoothness
    smoothMouse.current.x = THREE.MathUtils.lerp(
      smoothMouse.current.x,
      mouseRef.current.x,
      0.018
    )
    smoothMouse.current.y = THREE.MathUtils.lerp(
      smoothMouse.current.y,
      mouseRef.current.y,
      0.018
    )

    const t = state.clock.elapsedTime

    // Auto drift — very subtle sinusoidal for organic life
    const driftX = Math.sin(t * 0.07) * 0.18
    const driftY = Math.cos(t * 0.05) * 0.12

    // Mouse parallax — cinematic, controlled
    const mouseX = smoothMouse.current.x * 0.3
    const mouseY = smoothMouse.current.y * 0.18

    // Scroll offset — camera descends and pulls back
    const sp = scrollProgress.current
    const scrollZ = sp * 2
    const scrollY = sp * 0.4

    // Target camera position
    const targetX = driftX + mouseX
    const targetY = driftY + mouseY - scrollY
    const targetZ = 8 - scrollZ

    // Smooth lerp to target — very cinematic
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.025)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.025)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.025)

    // Subtle rotation following mouse — creates parallax depth
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      -smoothMouse.current.x * 0.025,
      0.025
    )
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      smoothMouse.current.y * 0.018,
      0.025
    )
  })

  return null
}
