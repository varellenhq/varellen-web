'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'motion/react'
import { ScrollReveal, GsapTextReveal } from '@/components/scroll-reveal'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float } from '@react-three/drei'
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

function SpinningCube() {
  const meshRef = useRef<THREE.Mesh>(null)

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += delta * 0.15
      meshRef.current.rotation.y += delta * 0.2
    }
  })

  return (
    <Float floatIntensity={1.5} speed={1.5} rotationIntensity={0.5}>
      <mesh ref={meshRef}>
        <boxGeometry args={[2.2, 2.2, 2.2]} />
        <meshStandardMaterial
          color="#b0b0b0"
          metalness={0.95}
          roughness={0.15}
          envMapIntensity={1.2}
        />
      </mesh>
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

        {/* Abstract geometric visual with 3D Cube */}
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
              <Canvas camera={{ position: [0, 0, 6], fov: 45 }} dpr={[1, 2]}>
                <ambientLight intensity={0.6} />
                <directionalLight position={[10, 20, 10]} intensity={1.5} />
                <directionalLight position={[-10, -20, -10]} intensity={0.5} />
                <SpinningCube />
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
