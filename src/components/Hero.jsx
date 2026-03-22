import { useRef, Suspense, useMemo, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Environment, Float, ContactShadows } from '@react-three/drei'
import { motion, AnimatePresence } from 'framer-motion'
import * as THREE from 'three'

function LiquidMetalBlob({ mouseRef }) {
  const meshRef = useRef()
  const geometry = useMemo(() => {
    const g = new THREE.SphereGeometry(1.55, 96, 96)
    g.setAttribute('_origin', g.attributes.position.clone())
    return g
  }, [])
  useFrame((state) => {
    if (!meshRef.current) return
    const t = state.clock.elapsedTime
    const pos = geometry.attributes.position
    const orig = geometry.attributes._origin
    for (let i = 0; i < pos.count; i++) {
      const ox = orig.getX(i), oy = orig.getY(i), oz = orig.getZ(i)
      const n =
        Math.sin(ox * 2.2 + t * 0.85) * Math.cos(oy * 1.9 + t * 0.72) * 0.4 +
        Math.sin(oy * 2.7 + t * 1.05) * Math.cos(oz * 2.1 + t * 0.61) * 0.3 +
        Math.cos(ox * 1.6 + oz * 2.3 + t * 0.78) * 0.3
      const amp = 0.19
      pos.setXYZ(i, ox + n * amp, oy + n * amp * 0.85, oz + n * amp)
    }
    pos.needsUpdate = true
    geometry.computeVertexNormals()
    if (mouseRef?.current) {
      const tx = (mouseRef.current.y / window.innerHeight - 0.5) * 0.55
      const ty = (mouseRef.current.x / window.innerWidth - 0.5) * 0.7
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, tx, 0.03)
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, ty + t * 0.06, 0.03)
    } else {
      meshRef.current.rotation.y += 0.004
    }
  })
  return (
    <Float speed={1.1} rotationIntensity={0.12} floatIntensity={0.35}>
      <mesh ref={meshRef} geometry={geometry} castShadow>
        <meshStandardMaterial metalness={1.0} roughness={0.04} color="#d8d8d8" envMapIntensity={2.8} />
      </mesh>
    </Float>
  )
}

function Scene({ mouseRef }) {
  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight position={[4, 6, 3]} intensity={3.5} color="#C9A84C" />
      <pointLight position={[-5, -2, 2]} intensity={2.0} color="#3050dd" />
      <pointLight position={[0, -5, -1]} intensity={1.2} color="#ffffff" />
      <pointLight position={[3, -3, 4]} intensity={0.8} color="#ff6030" />
      <Environment preset="studio" background={false} intensity={1.4} />
      <LiquidMetalBlob mouseRef={mouseRef} />
      <ContactShadows position={[0, -2.5, 0]} opacity={0.25} scale={5} blur={2.5} far={4} color="#C9A84C" />
    </>
  )
}

const containerV = { hidden: {}, visible: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } } }
const wordV = {
  hidden: { filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 },
  visible: { filter: 'blur(0px)', opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 48, damping: 18, mass: 1.1 } }
}
const fadeUp = (delay = 0) => ({
  hidden: { filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 },
  visible: { filter: 'blur(0px)', opacity: 1, y: 0, scale: 1, transition: { type: 'spring', stiffness: 48, damping: 18, mass: 1.1, delay } }
})

function MobileMenu({ open, onClose, onOpenConfigurator }) {
  const links = [
    { label: 'Servizi', href: '#services' },
    { label: 'Lavori', href: '#work' },
    { label: 'Prezzi', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-[200] flex flex-col"
          style={{ background: 'rgba(5,5,5,0.97)', backdropFilter: 'blur(24px)' }}
        >
          <div className="flex items-center justify-between px-8 h-16">
            <a href="#" onClick={onClose} className="flex items-center gap-2.5">
              <div className="w-6 h-6 rounded-full border border-[#C9A84C]/50 flex items-center justify-center">
                <span className="font-display text-[#C9A84C] text-[11px]">I</span>
              </div>
              <span className="font-display text-[17px] font-light text-neutral-100 tracking-tight">
                Intini<span className="text-[#C9A84C] font-normal"> DS</span>
              </span>
            </a>
            <button onClick={onClose}
              className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center text-neutral-500 hover:text-neutral-100 transition-colors">
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <line x1="1" y1="1" x2="13" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                <line x1="13" y1="1" x2="1" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>
          <div className="flex-1 flex flex-col justify-center px-8 gap-1">
            {links.map((l, i) => (
              <motion.a key={i} href={l.href} onClick={onClose}
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.08 + i * 0.07, type: 'spring', stiffness: 60, damping: 18 }}
                className="font-display text-[2.8rem] font-light text-neutral-300 hover:text-neutral-100 hover:translate-x-2 transition-all duration-300 py-2 leading-tight">
                {l.label}
              </motion.a>
            ))}
            <motion.div initial={{ opacity: 0, x: -24 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.38, type: 'spring', stiffness: 60, damping: 18 }}
              className="mt-8 flex flex-col gap-3">
              <button onClick={() => { onClose(); onOpenConfigurator && onOpenConfigurator() }}
                className="inline-flex items-center gap-2 px-7 py-4 border border-[#C9A84C]/40 text-[#C9A84C] font-sans text-[14px] rounded-full w-fit hover:bg-[#C9A84C]/10 transition-all duration-300">
                ✦ Configura il tuo sito
              </button>
              <a href="#contatti" onClick={onClose}
                className="inline-flex items-center gap-2 px-7 py-4 bg-[#C9A84C] text-[#080808] font-sans font-medium text-[14px] rounded-full w-fit hover:bg-[#E8C97A] transition-all duration-300">
                Preventivo gratuito →
              </a>
            </motion.div>
          </div>
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
            className="px-8 pb-10 flex flex-col gap-2">
            <a href="mailto:info@intinitds.com" className="font-mono text-[11px] text-neutral-700 hover:text-[#C9A84C] transition-colors">info@intinitds.com</a>
            <a href="https://wa.me/393XX000000" target="_blank" rel="noopener noreferrer" className="font-mono text-[11px] text-neutral-700 hover:text-emerald-400 transition-colors">WhatsApp →</a>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

function Nav({ isReady, onOpenConfigurator }) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const links = [
    { label: 'Servizi', href: '#services' },
    { label: 'Lavori', href: '#work' },
    { label: 'Prezzi', href: '#pricing' },
    { label: 'FAQ', href: '#faq' },
  ]
  return (
    <>
      <MobileMenu open={mobileOpen} onClose={() => setMobileOpen(false)} onOpenConfigurator={onOpenConfigurator} />
      <motion.nav
        initial={{ opacity: 0, y: -18 }}
        animate={isReady ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.15, duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        className="fixed top-0 left-0 right-0 z-50 nav-glass"
      >
        <div className="max-w-7xl mx-auto px-8 h-16 flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-6 h-6 rounded-full border border-[#C9A84C]/50 flex items-center justify-center transition-all duration-300 group-hover:border-[#C9A84C] group-hover:bg-[#C9A84C]/10">
              <span className="font-display text-[#C9A84C] text-[11px]">I</span>
            </div>
            <span className="font-display text-[17px] font-light text-neutral-100 tracking-tight">
              Intini<span className="text-[#C9A84C] font-normal"> DS</span>
            </span>
          </a>
          <div className="hidden md:flex items-center gap-8">
            {links.map((l, i) => (
              <a key={i} href={l.href} className="font-sans text-[13px] text-neutral-500 hover:text-neutral-100 transition-colors duration-250 tracking-wide">{l.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-2">
            <button onClick={onOpenConfigurator} className="btn-sweep flex items-center gap-1.5 px-4 py-2 rounded-full border border-[#C9A84C]/35 text-[#C9A84C] font-sans text-[12.5px] hover:bg-[#C9A84C]/8 hover:border-[#C9A84C]/70 transition-all duration-350">
              <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
              Configura il sito
            </button>
            <a href="#contatti" className="btn-sweep hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#C9A84C] text-[#080808] font-sans text-[13px] font-medium hover:bg-[#E8C97A] transition-all duration-350">
              Preventivo <span className="text-[11px]">→</span>
            </a>
          </div>
          <button onClick={() => setMobileOpen(true)}
            className="md:hidden flex flex-col justify-center items-end gap-[5px] w-10 h-10 rounded-full border border-white/10 hover:border-white/20 transition-colors"
            aria-label="Apri menu">
            <span className="block w-4 h-px bg-neutral-400" />
            <span className="block w-4 h-px bg-neutral-400" />
            <span className="block w-2.5 h-px bg-neutral-400" />
          </button>
        </div>
      </motion.nav>
    </>
  )
}

const words = [
  { text: 'Esperienze', gold: false },
  { text: 'Digitali', gold: false },
  { text: "d'Élite.", gold: true },
]

export default function Hero({ isReady, onOpenConfigurator }) {
  const mouseRef = useRef({ x: 0, y: 0 })
  return (
    <section id="home" className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      onMouseMove={(e) => { mouseRef.current = { x: e.clientX, y: e.clientY } }}>
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 0, 5.2], fov: 34 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping }}
          dpr={[1, 1.8]} shadows>
          <Suspense fallback={null}><Scene mouseRef={mouseRef} /></Suspense>
        </Canvas>
      </div>
      <div className="absolute inset-0 z-[1] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 65% at 50% 50%, transparent 15%, #050505 88%)' }} />
      <div className="absolute bottom-0 inset-x-0 h-56 z-[1] pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent, #050505)' }} />

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div variants={fadeUp(0.1)} initial="hidden" animate={isReady ? 'visible' : 'hidden'}
          className="inline-flex items-center gap-2.5 mb-10 px-4 py-1.5 rounded-full border border-[#C9A84C]/18 bg-[#C9A84C]/5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80 animate-pulse shrink-0" />
          <span className="font-mono text-[10.5px] tracking-[0.32em] uppercase text-[#C9A84C]/70">Disponibili per nuovi progetti</span>
        </motion.div>
        <motion.h1 variants={containerV} initial="hidden" animate={isReady ? 'visible' : 'hidden'}
          className="font-display text-[clamp(3.4rem,8.8vw,8.2rem)] font-light leading-[1.03] tracking-[-0.025em] text-neutral-100 mb-7">
          {words.map((w, i) => (
            <motion.span key={i} variants={wordV} style={{ display: 'inline-block', marginRight: '0.26em' }}
              className={w.gold ? 'text-gold' : ''}>{w.text}</motion.span>
          ))}
        </motion.h1>
        <motion.p variants={fadeUp(0.74)} initial="hidden" animate={isReady ? 'visible' : 'hidden'}
          className="font-sans text-[clamp(0.95rem,1.65vw,1.18rem)] font-light text-neutral-500 max-w-[520px] mx-auto leading-[1.75] mb-12">
          Siti web premium a partire da{' '}<span className="text-[#C9A84C] font-normal">349€</span>.
          Animazioni 3D cinematografiche, performance 100/100 e design che converte — consegnato in{' '}
          <span className="text-neutral-300 font-normal">meno di 7 giorni</span>.
        </motion.p>
        <motion.div variants={fadeUp(0.96)} initial="hidden" animate={isReady ? 'visible' : 'hidden'}
          className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <a href="#contatti" className="btn-sweep group px-9 py-[14px] bg-[#C9A84C] text-[#080808] font-sans font-medium text-[13.5px] tracking-wide rounded-full transition-all duration-450 hover:bg-[#E8C97A] hover:shadow-[0_0_55px_rgba(201,168,76,0.3)]">
            Richiedi preventivo gratuito
            <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">→</span>
          </a>
          <a href="#work" className="px-9 py-[14px] glass rounded-full font-sans font-light text-[13.5px] text-neutral-400 tracking-wide hover:text-neutral-100 hover:border-white/15 transition-all duration-400">
            Guarda i lavori
          </a>
          <button onClick={onOpenConfigurator} className="group flex items-center gap-2 px-7 py-[14px] rounded-full font-sans font-light text-[13.5px] text-[#C9A84C] tracking-wide border border-[#C9A84C]/25 hover:border-[#C9A84C]/55 hover:bg-[#C9A84C]/5 transition-all duration-400">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="transition-transform group-hover:rotate-12"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
            Configura il tuo sito
          </button>
        </motion.div>
        <motion.div variants={fadeUp(1.2)} initial="hidden" animate={isReady ? 'visible' : 'hidden'}
          className="mt-16 flex items-center justify-center gap-10">
          {[{ v: '80+', l: 'Progetti completati' }, { v: '5.0★', l: 'Rating clienti' }, { v: '< 7gg', l: 'Consegna media' }].map((s, i) => (
            <div key={i} className="text-center">
              <div className="font-display text-[1.6rem] font-light text-neutral-200 leading-none">{s.v}</div>
              <div className="font-mono text-[9px] tracking-[0.28em] uppercase text-neutral-700 mt-1.5">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
      <motion.div initial={{ opacity: 0 }} animate={isReady ? { opacity: 1 } : {}} transition={{ delay: 1.7, duration: 1 }}
        className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2.5">
        <span className="font-mono text-[8.5px] tracking-[0.45em] uppercase text-neutral-700">Scroll</span>
        <motion.div animate={{ scaleY: [0.3, 1, 0.3], opacity: [0.2, 0.7, 0.2] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-9 bg-gradient-to-b from-[#C9A84C]/45 to-transparent origin-top" />
      </motion.div>
      <Nav isReady={isReady} onOpenConfigurator={onOpenConfigurator} />
    </section>
  )
}
