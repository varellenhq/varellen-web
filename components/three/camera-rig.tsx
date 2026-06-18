'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Extremely subtle camera rig:
 * - Auto drift (sinusoidal over 20s cycle)
 * - Mouse parallax (0.02 damping)
 * - Scroll-linked Z and rotation shift
 *
 * Max movement: ±0.3 units on any axis.
 */
export function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  const mouseRef = useRef({ x: 0, y: 0 })
  const smoothMouse = useRef({ x: 0, y: 0 })

  // Track mouse position (normalized -1 to 1)
  useFrame((state) => {
    const { pointer } = state
    mouseRef.current.x = pointer.x
    mouseRef.current.y = pointer.y

    // Smooth mouse following
    smoothMouse.current.x = THREE.MathUtils.lerp(
      smoothMouse.current.x,
      mouseRef.current.x,
      0.02
    )
    smoothMouse.current.y = THREE.MathUtils.lerp(
      smoothMouse.current.y,
      mouseRef.current.y,
      0.02
    )

    const t = state.clock.elapsedTime

    // Auto drift — very subtle sinusoidal
    const driftX = Math.sin(t * 0.08) * 0.15
    const driftY = Math.cos(t * 0.06) * 0.1

    // Mouse parallax — extremely subtle
    const mouseX = smoothMouse.current.x * 0.25
    const mouseY = smoothMouse.current.y * 0.15

    // Scroll offset
    const sp = scrollProgress.current
    const scrollZ = sp * 1.5
    const scrollY = sp * 0.3

    // Target camera position
    const targetX = driftX + mouseX
    const targetY = driftY + mouseY - scrollY
    const targetZ = 8 - scrollZ

    // Smooth lerp to target
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.03)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.03)

    // Subtle rotation following mouse
    camera.rotation.y = THREE.MathUtils.lerp(
      camera.rotation.y,
      -smoothMouse.current.x * 0.02,
      0.03
    )
    camera.rotation.x = THREE.MathUtils.lerp(
      camera.rotation.x,
      smoothMouse.current.y * 0.015,
      0.03
    )
  })

  return null
}
