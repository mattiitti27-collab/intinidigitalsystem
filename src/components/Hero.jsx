import { useRef, Suspense } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { MeshTransmissionMaterial, Environment, Float } from '@react-three/drei'
import { motion } from 'framer-motion'
import * as THREE from 'three'

// ─── 3D Liquid Sphere ──────────────────────────────────────────────────────────

function LiquidSphere({ mouseRef }) {
  const meshRef = useRef()

  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime

    const targetX = mouseRef?.current
      ? (mouseRef.current.y / window.innerHeight - 0.5) * 0.7
      : Math.sin(t * 0.3) * 0.12

    const targetY = mouseRef?.current
      ? (mouseRef.current.x / window.innerWidth - 0.5) * 0.9
      : t * 0.1

    meshRef.current.rotation.x = THREE.MathUtils.lerp(
      meshRef.current.rotation.x,
      targetX + Math.sin(t * 0.25) * 0.06,
      0.04
    )
    meshRef.current.rotation.y = THREE.MathUtils.lerp(
      meshRef.current.rotation.y,
      targetY,
      0.03
    )
  })

  return (
    <Float speed={1.6} rotationIntensity={0.3} floatIntensity={0.5}>
      <mesh ref={meshRef} scale={1.7}>
        <sphereGeometry args={[1, 128, 128]} />
        <MeshTransmissionMaterial
          thickness={0.5}
          roughness={0}
          transmission={1}
          ior={1.6}
          chromaticAberration={0.08}
          anisotropy={0.4}
          distortion={0.5}
          distortionScale={0.4}
          temporalDistortion={0.25}
          backside={true}
          attenuationColor="#C9A84C"
          attenuationDistance={1.0}
          color="#ffffff"
          samples={8}
        />
      </mesh>
    </Float>
  )
}

// ─── Luma Effect variants ──────────────────────────────────────────────────────

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.14, delayChildren: 0.2 }
  }
}

const wordVariants = {
  hidden: { filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 },
  visible: {
    filter: 'blur(0px)', opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 50, damping: 20, mass: 1 }
  }
}

// ─── Navigation ───────────────────────────────────────────────────────────────

function Nav({ isReady }) {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={isReady ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.2, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-6"
    >
      {/* Logo */}
      <a href="#" className="flex items-center gap-3 group">
        <div className="w-7 h-7 rounded-full border border-[#C9A84C]/40 flex items-center justify-center group-hover:border-[#C9A84C]/80 transition-colors duration-400">
          <span className="font-display text-[#C9A84C] text-xs">S</span>
        </div>
        <span className="font-display text-lg font-light text-neutral-100 tracking-tight">
          Studio<span className="text-[#C9A84C]">.</span>
        </span>
      </a>

      {/* Links */}
      <div className="flex items-center gap-8">
        {[
          { label: 'Servizi', href: '#services' },
          { label: 'Processo', href: '#services' },
          { label: 'Prezzi', href: '#pricing' },
        ].map((item, i) => (
          <a
            key={i}
            href={item.href}
            className="font-sans text-[13px] text-neutral-500 hover:text-neutral-200 transition-colors duration-300 tracking-wide"
          >
            {item.label}
          </a>
        ))}
        <a
          href="#pricing"
          className="btn-sweep px-5 py-2 border border-[#C9A84C]/35 text-[#C9A84C] font-sans text-[13px] rounded-full hover:bg-[#C9A84C]/10 hover:border-[#C9A84C]/60 transition-all duration-400"
        >
          Da 349€ →
        </a>
      </div>
    </motion.nav>
  )
}

// ─── Hero ─────────────────────────────────────────────────────────────────────

export default function Hero({ isReady }) {
  const mouseRef = useRef({ x: 0, y: 0 })

  const handleMouseMove = (e) => {
    mouseRef.current = { x: e.clientX, y: e.clientY }
  }

  const words = [
    { text: 'Esperienze', gold: false },
    { text: 'Digitali', gold: false },
    { text: "d'Élite.", gold: true },
  ]

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={handleMouseMove}
    >
      {/* ── 3D WebGL Canvas ── */}
      <div className="absolute inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 34 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
        >
          <Suspense fallback={null}>
            <Environment preset="night" />
            <LiquidSphere mouseRef={mouseRef} />
            <ambientLight intensity={0.08} />
            <pointLight position={[4, 5, 4]} intensity={0.6} color="#C9A84C" />
            <pointLight position={[-6, -3, 2]} intensity={0.25} color="#3030cc" />
            <pointLight position={[0, -4, -2]} intensity={0.15} color="#ffffff" />
          </Suspense>
        </Canvas>
      </div>

      {/* ── Radial vignette ── */}
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 85% 70% at 50% 50%, transparent 20%, #050505 90%)'
        }}
      />

      {/* ── Bottom fade ── */}
      <div className="absolute bottom-0 left-0 right-0 h-48 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 text-center px-6 max-w-6xl mx-auto">

        {/* Eyebrow pill */}
        <motion.div
          initial={{ filter: 'blur(16px)', opacity: 0, y: 20, scale: 0.95 }}
          animate={isReady ? { filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.1 }}
          className="inline-flex items-center gap-3 mb-10 px-4 py-1.5 rounded-full border border-[#C9A84C]/20 bg-[#C9A84C]/5"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-[#C9A84C] animate-pulse" />
          <span className="font-mono text-[11px] tracking-[0.32em] uppercase text-[#C9A84C]/75">
            Web Design d'Élite — Italia
          </span>
        </motion.div>

        {/* Main headline — word-by-word Luma effect */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate={isReady ? 'visible' : 'hidden'}
          className="font-display text-[clamp(3.2rem,8.5vw,8rem)] font-light leading-[1.04] tracking-[-0.02em] text-neutral-100 mb-6"
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              variants={wordVariants}
              style={{ display: 'inline-block', marginRight: '0.28em' }}
              className={w.gold ? 'text-gradient-gold' : ''}
            >
              {w.text}
            </motion.span>
          ))}
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
          animate={isReady ? { filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.72 }}
          className="font-sans text-[clamp(0.95rem,1.7vw,1.2rem)] font-light text-neutral-500 max-w-lg mx-auto leading-relaxed mb-12"
        >
          Siti web di livello premium a partire da{' '}
          <span className="text-[#C9A84C] font-normal">349€</span>.
          Performance enterprise, animazioni cinematografiche,
          zero compromessi sul design.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
          animate={isReady ? { filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.95 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#pricing"
            className="btn-sweep group relative px-9 py-4 bg-[#C9A84C] text-[#080808] font-sans font-medium text-sm tracking-wide rounded-full transition-all duration-500 hover:bg-[#E8C97A] hover:shadow-[0_0_50px_rgba(201,168,76,0.28)] hover:scale-[1.02]"
            style={{ transform: 'translateZ(0)' }}
          >
            Inizia il tuo progetto
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>

          <a
            href="#services"
            className="px-9 py-4 glass rounded-full font-sans font-light text-sm text-neutral-400 tracking-wide hover:text-neutral-100 hover:border-white/20 transition-all duration-400"
          >
            Scopri i servizi
          </a>
        </motion.div>

        {/* Social proof strip */}
        <motion.div
          initial={{ filter: 'blur(16px)', opacity: 0, y: 20, scale: 0.95 }}
          animate={isReady ? { filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 1.2 }}
          className="mt-16 flex items-center justify-center gap-8"
        >
          {[
            { value: '50+', label: 'Progetti' },
            { value: '5.0★', label: 'Rating medio' },
            { value: '7gg', label: 'Consegna media' },
          ].map((item, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-2xl font-light text-neutral-200">{item.value}</div>
              <div className="font-mono text-[9px] tracking-[0.25em] uppercase text-neutral-700 mt-0.5">{item.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={isReady ? { opacity: 1 } : {}}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-neutral-700">Scroll</span>
        <motion.div
          animate={{ scaleY: [0.4, 1, 0.4], opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-[#C9A84C]/50 to-transparent origin-top"
        />
      </motion.div>

      {/* Nav */}
      <Nav isReady={isReady} />
    </section>
  )
}
