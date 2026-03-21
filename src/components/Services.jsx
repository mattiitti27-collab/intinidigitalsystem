import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Globe, Zap, Layers, Sparkles, ArrowUpRight } from 'lucide-react'

function BentoCard({ children, className = '', span = '' }) {
  const cardRef = useRef(null)
  const [glowPos, setGlowPos] = useState({ x: '50%', y: '50%' })
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)

  const springRotateX = useSpring(rotateX, { stiffness: 200, damping: 30 })
  const springRotateY = useSpring(rotateY, { stiffness: 200, damping: 30 })

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect()
    if (!rect) return

    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2

    rotateX.set(((y - centerY) / centerY) * -6)
    rotateY.set(((x - centerX) / centerX) * 6)

    setGlowPos({
      x: `${(x / rect.width) * 100}%`,
      y: `${(y / rect.height) * 100}%`,
    })
  }, [rotateX, rotateY])

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0)
    rotateY.set(0)
  }, [rotateX, rotateY])

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springRotateX,
        rotateY: springRotateY,
        transformStyle: 'preserve-3d',
        transformPerspective: 800,
      }}
      initial={{ filter: 'blur(16px)', opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1 }}
      className={`relative overflow-hidden rounded-3xl border border-white/7 bg-white/[0.03] backdrop-blur-xl group ${span} ${className}`}
    >
      {/* Magnetic glow */}
      <div
        className="absolute pointer-events-none transition-opacity duration-300 opacity-0 group-hover:opacity-100"
        style={{
          width: '60%',
          paddingBottom: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(201,168,76,0.12) 0%, rgba(80,40,200,0.06) 50%, transparent 70%)',
          transform: 'translate(-50%, -50%)',
          left: glowPos.x,
          top: glowPos.y,
          position: 'absolute',
        }}
      />

      {/* Subtle inner border glow */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ boxShadow: 'inset 0 0 30px rgba(201,168,76,0.04)' }} />

      <div style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  )
}

const services = [
  {
    icon: Globe,
    title: 'Siti Web Premium',
    desc: 'Landing page, portfolio, corporate. Design su misura con animazioni che convertono.',
    tag: 'Core',
    size: 'col-span-2',
  },
  {
    icon: Zap,
    title: 'Performance',
    desc: 'Core Web Vitals 100/100. Velocità che Google premia.',
    tag: 'Tech',
    size: '',
  },
  {
    icon: Layers,
    title: 'UI/UX Design',
    desc: 'Wireframe, prototipi interattivi, sistemi di design scalabili.',
    tag: 'Design',
    size: '',
  },
  {
    icon: Sparkles,
    title: 'Animazioni 3D & WebGL',
    desc: 'Esperienze immersive che trasformano visitatori in clienti. Il vostro brand come non è mai stato visto.',
    tag: 'Premium',
    size: 'col-span-2',
  },
]

export default function Services() {
  return (
    <section id="services" className="py-32 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-6 bg-[#C9A84C]/60" />
            <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#C9A84C]/70">
              Cosa offriamo
            </span>
          </motion.div>
          <motion.h2
            initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-neutral-100 leading-tight max-w-xl"
          >
            Servizi che fanno la
            <span className="text-gradient-gold"> differenza.</span>
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-3 gap-4 auto-rows-[260px]">
          {services.map((service, i) => {
            const Icon = service.icon
            return (
              <BentoCard key={i} span={service.size}>
                <div className="p-8 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-6">
                      <div className="w-10 h-10 rounded-xl bg-[#C9A84C]/10 border border-[#C9A84C]/20 flex items-center justify-center">
                        <Icon size={18} className="text-[#C9A84C]" strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-600 border border-white/5 px-2 py-1 rounded-full">
                        {service.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-2xl font-light text-neutral-100 mb-3">
                      {service.title}
                    </h3>
                    <p className="font-sans text-sm text-neutral-500 leading-relaxed">
                      {service.desc}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 text-[#C9A84C]/50 group-hover:text-[#C9A84C] transition-colors duration-400">
                    <span className="font-mono text-xs tracking-wide">Scopri</span>
                    <ArrowUpRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </BentoCard>
            )
          })}
        </div>

        {/* Process */}
        <div className="mt-24 grid grid-cols-4 gap-8">
          {[
            { step: '01', title: 'Brief', desc: 'Analizziamo il tuo brand e obiettivi' },
            { step: '02', title: 'Design', desc: 'Prototipo interattivo in 48h' },
            { step: '03', title: 'Sviluppo', desc: 'Codice pulito, veloce, scalabile' },
            { step: '04', title: 'Launch', desc: 'Deploy e supporto post-lancio' },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: i * 0.1 }}
              className="relative pl-6 border-l border-white/5"
            >
              <span className="font-mono text-[10px] text-neutral-700 tracking-widest">{item.step}</span>
              <h4 className="font-display text-xl font-light text-neutral-200 mt-1 mb-2">{item.title}</h4>
              <p className="font-sans text-sm text-neutral-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
