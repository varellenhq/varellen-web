'use client'

import { useRef, useMemo, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ScrollReveal, GsapTextReveal } from '@/components/scroll-reveal'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, RoundedBox } from '@react-three/drei'
import * as THREE from 'three'

const PRINCIPLES = [
  {
    k: '01',
    t: 'Systems, not features',
    d: 'We design coherent systems that compound in value — not disconnected features that decay.',
  },
  {
    k: '02',
    t: 'Defensible by design',
    d: 'Security, observability, and resilience are first-class architectural constraints.',
  },
  {
    k: '03',
    t: 'Built to endure',
    d: 'We optimise for the decade, engineering infrastructure that outlasts the trend cycle.',
  },
]

function PremiumRubiks() {
  const outerGroupRef = useRef<THREE.Group>(null)
  const groupRef = useRef<THREE.Group>(null)
  const pivotRef = useRef<THREE.Group>(null)

  // Create 27 cubies for a 3x3x3 grid
  const cubies = useMemo(() => {
    const arr = []
    const offset = 1.05 // Spacing between cubies
    for (let x = -1; x <= 1; x++) {
      for (let y = -1; y <= 1; y++) {
        for (let z = -1; z <= 1; z++) {
          arr.push({
            x: x * offset,
            y: y * offset,
            z: z * offset,
            id: `${x}${y}${z}`,
          })
        }
      }
    }
    return arr
  }, [])

  // Animation state
  const state = useRef({
    isAnimating: false,
    axis: 'x' as 'x' | 'y' | 'z',
    targetAngle: 0,
    currentAngle: 0,
    speed: 0.08, // Rotation speed
    pause: 0, // Pause between moves
  })

  // Refs to all cubie meshes to attach/detach them dynamically
  const cubieRefs = useRef<THREE.Mesh[]>([])

  useFrame((_, delta) => {
    if (!pivotRef.current || !groupRef.current || !outerGroupRef.current) return

    // Slow global tumble
    outerGroupRef.current.rotation.x += delta * 0.1
    outerGroupRef.current.rotation.y += delta * 0.15

    if (state.current.pause > 0) {
      state.current.pause -= delta
      return
    }

    if (!state.current.isAnimating) {
      // Pick a random move
      const axes = ['x', 'y', 'z']
      const axis = axes[Math.floor(Math.random() * axes.length)] as
        | 'x'
        | 'y'
        | 'z'
      const slices = [-1.05, 0, 1.05]
      const slice = slices[Math.floor(Math.random() * slices.length)]
      const dir = Math.random() > 0.5 ? 1 : -1

      // Reset pivot
      pivotRef.current.rotation.set(0, 0, 0)
      pivotRef.current.updateMatrixWorld()

      // Find all cubies in the chosen slice
      cubieRefs.current.forEach((cubie) => {
        if (!cubie) return
        
        // Get world position and map back to local group coordinates
        const pos = new THREE.Vector3()
        cubie.getWorldPosition(pos)
        groupRef.current!.worldToLocal(pos)

        // If the cubie is on the chosen slice (with small tolerance), attach it to pivot
        if (Math.abs(pos[axis] - slice) < 0.1) {
          pivotRef.current!.attach(cubie)
        }
      })

      state.current.axis = axis
      state.current.targetAngle = (Math.PI / 2) * dir
      state.current.currentAngle = 0
      state.current.isAnimating = true
    } else {
      // Animate the pivot
      const step =
        state.current.targetAngle > 0
          ? state.current.speed
          : -state.current.speed
      state.current.currentAngle += step
      pivotRef.current.rotation[state.current.axis] = state.current.currentAngle

      // Check if move is complete
      if (
        Math.abs(state.current.currentAngle) >=
        Math.abs(state.current.targetAngle)
      ) {
        // Snap to exact 90 degrees
        pivotRef.current.rotation[state.current.axis] = state.current.targetAngle
        pivotRef.current.updateMatrixWorld()

        // Detach cubies back to the main group
        const children = [...pivotRef.current.children]
        children.forEach((child) => {
          groupRef.current!.attach(child)
        })

        state.current.isAnimating = false
        state.current.pause = 0.2 // Brief pause between moves
      }
    }
  })

  return (
    <Float floatIntensity={1} speed={1.5} rotationIntensity={0.2}>
      <group ref={outerGroupRef} scale={1.2}>
        <group ref={groupRef}>
          <group ref={pivotRef} />
          {cubies.map((c, i) => (
            <RoundedBox
              key={c.id}
              args={[0.98, 0.98, 0.98]}
              radius={0.015} // Extremely sharp, precise edges
              smoothness={4}
              position={[c.x, c.y, c.z]}
              ref={(el) => {
                if (el) cubieRefs.current[i] = el as any
              }}
            >
              <meshStandardMaterial
                color="#030303" // Pure black for maximum contrast
                metalness={1}
                roughness={0.05} // Very sharp, mirror-like reflections
                envMapIntensity={3}
              />
              {/* Subtle silver edge highlights for absolute precision */}
              <lineSegments>
                <edgesGeometry args={[new THREE.BoxGeometry(0.98, 0.98, 0.98)]} />
                <lineBasicMaterial color="#1a1a1a" />
              </lineSegments>
            </RoundedBox>
          ))}
        </group>
      </group>
    </Float>
  )
}

export function Philosophy() {
  const imageRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: imageRef,
    offset: ['start end', 'end start'],
  })
  const gradientY = useTransform(scrollYProgress, [0, 1], ['0%', '20%'])

  return (
    <section className="relative overflow-hidden border-t border-border px-5 py-28 md:px-10 md:py-40">
      <div className="mx-auto grid max-w-[1400px] items-center gap-16 lg:grid-cols-2">
        <div>
          <ScrollReveal variant="fade-up">
            <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              <span className="inline-block h-px w-8 bg-silver/60" />
              Technology Philosophy
            </div>
          </ScrollReveal>
          <ScrollReveal variant="fade-up" delay={0.05}>
            <h2 className="font-heading mt-6 text-balance text-[clamp(2rem,4.5vw,3.6rem)] font-medium leading-[1.05] tracking-[-0.025em]">
              We build the systems serious organizations rely on.
            </h2>
          </ScrollReveal>

          <div className="mt-12 space-y-px">
            {PRINCIPLES.map((p, i) => (
              <ScrollReveal key={p.k} variant="fade-up" delay={0.1 + i * 0.08}>
                <div className="grid grid-cols-[auto_1fr] gap-6 border-t border-border py-7">
                  <span className="font-mono text-xs text-muted-foreground">
                    {p.k}
                  </span>
                  <div>
                    <h3 className="font-heading text-xl font-medium tracking-tight">
                      {p.t}
                    </h3>
                    <p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                      {p.d}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Abstract geometric visual with 3D Rubiks Cube */}
        <div ref={imageRef} className="relative">
          <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border bg-card">
            {/* Animated gradient background simulating metallic surface */}
            <motion.div
              style={{ y: gradientY }}
              className="absolute inset-0"
            >
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'linear-gradient(165deg, var(--secondary) 0%, var(--card) 30%, var(--muted) 60%, var(--card) 100%)',
                }}
              />
              {/* Grid pattern overlay */}
              <div
                className="absolute inset-0 opacity-[0.05]"
                style={{
                  backgroundImage:
                    'linear-gradient(var(--foreground) 1px, transparent 1px), linear-gradient(90deg, var(--foreground) 1px, transparent 1px)',
                  backgroundSize: '32px 32px',
                  backgroundPosition: 'center',
                }}
              />
              {/* Radial glow */}
              <div
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(circle at 50% 50%, var(--silver) 0%, transparent 60%)',
                  opacity: 0.1,
                }}
              />
            </motion.div>

            {/* React Three Fiber Cube */}
            <div className="absolute inset-0 opacity-90">
              <Canvas camera={{ position: [0, 0, 9], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.5} />
                <directionalLight position={[10, 20, 10]} intensity={1.8} />
                <directionalLight position={[-10, -20, -10]} intensity={0.5} />
                <PremiumRubiks />
                <Environment preset="city" />
              </Canvas>
            </div>

            <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-background/80 via-background/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-6 md:p-8 pointer-events-none">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver">
                Engineered Infrastructure
              </span>
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-silver">
                VAR—∞
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
