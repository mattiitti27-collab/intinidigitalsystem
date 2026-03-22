import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { Globe, Zap, Layers, Sparkles, Code2, BarChart3, ArrowUpRight } from 'lucide-react'

function BentoCard({ children, className = '', colSpan = '', accentColor = '#C9A84C' }) {
  const ref = useRef()
  const [glowPos, setGlowPos] = useState({ x: '50%', y: '50%' })
  const rx = useMotionValue(0)
  const ry = useMotionValue(0)
  const srx = useSpring(rx, { stiffness: 220, damping: 32 })
  const sry = useSpring(ry, { stiffness: 220, damping: 32 })

  const onMove = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    const x = e.clientX - r.left
    const y = e.clientY - r.top
    rx.set(((y - r.height / 2) / r.height) * -7)
    ry.set(((x - r.width / 2) / r.width) * 7)
    setGlowPos({ x: `${(x / r.width) * 100}%`, y: `${(y / r.height) * 100}%` })
  }, [rx, ry])

  const onLeave = useCallback(() => { rx.set(0); ry.set(0) }, [rx, ry])

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ rotateX: srx, rotateY: sry, transformStyle: 'preserve-3d', perspective: '900px' }}
      initial={{ filter: 'blur(16px)', opacity: 0, y: 36, scale: 0.95 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-55px' }}
      transition={{ type: 'spring', stiffness: 48, damping: 20, mass: 1.1 }}
      className={`relative overflow-hidden rounded-2xl border border-white/[0.06]
                  bg-white/[0.025] group ${colSpan} ${className}`}
    >
      {/* Cursor glow */}
      <div className="absolute pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-350"
        style={{
          width: '65%', paddingBottom: '65%', borderRadius: '50%',
          background: `radial-gradient(circle, ${accentColor}18 0%, transparent 70%)`,
          transform: 'translate(-50%,-50%)', left: glowPos.x, top: glowPos.y,
          position: 'absolute',
        }}
      />
      <div style={{ transform: 'translateZ(18px)' }}>{children}</div>
    </motion.div>
  )
}

const services = [
  {
    icon: Globe, title: 'Siti Web Premium',
    desc: 'Landing page, portfolio, corporate site. Design su misura, zero template, zero compromessi. Ogni pixel pensato per convertire.',
    tag: 'Core', cols: 'col-span-2', accent: '#C9A84C',
  },
  {
    icon: Zap, title: 'Performance 100/100',
    desc: 'Core Web Vitals perfetti. Caricamento fulmineo che Google premia e gli utenti amano.',
    tag: 'Tech', cols: '', accent: '#60a0ff',
  },
  {
    icon: Layers, title: 'UI/UX Design',
    desc: 'Wireframe, prototipi interattivi, sistemi di design scalabili e componenti riutilizzabili.',
    tag: 'Design', cols: '', accent: '#a060ff',
  },
  {
    icon: Sparkles, title: 'Animazioni 3D & WebGL',
    desc: 'Esperienze immersive con Three.js, React Three Fiber e shader custom. Il tuo brand in una dimensione che la concorrenza non ha.',
    tag: 'Premium', cols: 'col-span-2', accent: '#ff8040',
  },
  {
    icon: Code2, title: 'CMS & Headless',
    desc: 'Sanity, Contentful, Strapi. Gestisci il contenuto in autonomia.',
    tag: 'Tech', cols: '', accent: '#40d090',
  },
  {
    icon: BarChart3, title: 'SEO & Analytics',
    desc: 'Schema markup, sitemap automatica, GA4 e Search Console integrati.',
    tag: 'Growth', cols: '', accent: '#f0c040',
  },
]

const processSteps = [
  { n: '01', t: 'Discovery', d: 'Chiamata strategica di 30 min. Analizziamo brand, obiettivi e competitor per definire la direzione giusta.' },
  { n: '02', t: 'Design', d: 'Prototipo interattivo in Figma entro 48h. Revisioni illimitate fino all\'approvazione.' },
  { n: '03', t: 'Sviluppo', d: 'Codice React/Next.js pulito, documentato, scalabile. Animazioni e 3D integrati nativamente.' },
  { n: '04', t: 'Launch', d: 'Deploy su Vercel o hosting a scelta. Formazione CMS inclusa e 30 giorni di supporto dedicato.' },
]

export default function Services() {
  return (
    <section id="services" className="py-36 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-20">
          <motion.div
            initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 48, damping: 18, mass: 1.1 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-5 bg-[#C9A84C]/55" />
            <span className="font-mono text-[10.5px] tracking-[0.35em] uppercase text-[#C9A84C]/65">
              Cosa offriamo
            </span>
          </motion.div>
          <motion.h2
            initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 48, damping: 18, mass: 1.1, delay: 0.1 }}
            className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light
                       text-neutral-100 leading-tight max-w-lg"
          >
            Servizi che fanno la
            <span className="text-gold"> differenza.</span>
          </motion.h2>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-3 gap-3.5 auto-rows-[240px]">
          {services.map((s, i) => {
            const Icon = s.icon
            return (
              <BentoCard key={i} colSpan={s.cols} accentColor={s.accent}>
                <div className="p-7 h-full flex flex-col justify-between">
                  <div>
                    <div className="flex items-start justify-between mb-5">
                      <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                        style={{ background: s.accent + '12', border: `1px solid ${s.accent}25` }}>
                        <Icon size={16} style={{ color: s.accent }} strokeWidth={1.5} />
                      </div>
                      <span className="font-mono text-[8.5px] tracking-[0.3em] uppercase text-neutral-700
                                       border border-white/5 px-2 py-0.5 rounded-full">
                        {s.tag}
                      </span>
                    </div>
                    <h3 className="font-display text-[1.3rem] font-light text-neutral-100 mb-2.5 leading-snug">
                      {s.title}
                    </h3>
                    <p className="font-sans text-[12.5px] text-neutral-600 leading-relaxed">{s.desc}</p>
                  </div>
                  <div className="flex items-center gap-1.5 transition-all duration-350 group-hover:translate-x-1"
                    style={{ color: s.accent + '55' }}>
                    <span className="font-mono text-[10px] tracking-wider group-hover:text-[var(--c)]">
                      Scopri
                    </span>
                    <ArrowUpRight size={12} />
                  </div>
                </div>
              </BentoCard>
            )
          })}
        </div>

        {/* Process */}
        <div className="mt-28">
          <motion.h3
            initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 48, damping: 18 }}
            className="font-display text-[2rem] font-light text-neutral-300 mb-14"
          >
            Come lavoriamo.
          </motion.h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {processSteps.map((s, i) => (
              <motion.div
                key={i}
                initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
                whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-30px' }}
                transition={{ type: 'spring', stiffness: 48, damping: 18, mass: 1.1, delay: i * 0.1 }}
                className="relative"
              >
                {/* Connector line */}
                {i < processSteps.length - 1 && (
                  <div className="absolute top-3 left-full w-full h-px bg-gradient-to-r from-white/8 to-transparent
                                  hidden md:block pointer-events-none" />
                )}
                <span className="font-mono text-[9.5px] text-[#C9A84C]/50 tracking-widest block mb-3">{s.n}</span>
                <h4 className="font-display text-xl font-light text-neutral-200 mb-2">{s.t}</h4>
                <p className="font-sans text-[12.5px] text-neutral-600 leading-relaxed">{s.d}</p>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
