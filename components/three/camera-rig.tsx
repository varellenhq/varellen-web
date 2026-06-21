'use client'

import { useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

/**
 * Responsive cinematic camera rig — snappy, alive.
 */
export function CameraRig({ scrollProgress }: { scrollProgress: React.MutableRefObject<number> }) {
  const { camera } = useThree()
  const smoothMouse = useRef({ x: 0, y: 0 })

  useFrame((state) => {
    const { pointer } = state

    smoothMouse.current.x = THREE.MathUtils.lerp(smoothMouse.current.x, pointer.x, 0.06)
    smoothMouse.current.y = THREE.MathUtils.lerp(smoothMouse.current.y, pointer.y, 0.06)

    const t = state.clock.elapsedTime
    const sp = scrollProgress.current

    const targetX = Math.sin(t * 0.15) * 0.25 + smoothMouse.current.x * 0.5
    const targetY = Math.cos(t * 0.12) * 0.15 + smoothMouse.current.y * 0.3 - sp * 0.5
    const targetZ = 8 - sp * 2.5

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05)

    camera.rotation.y = THREE.MathUtils.lerp(camera.rotation.y, -smoothMouse.current.x * 0.04, 0.05)
    camera.rotation.x = THREE.MathUtils.lerp(camera.rotation.x, smoothMouse.current.y * 0.03, 0.05)
  })

  return null
}
