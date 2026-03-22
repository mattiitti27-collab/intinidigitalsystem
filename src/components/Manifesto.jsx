import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const phrase = [
  'Design', '3D', 'e', 'animazioni',
  'cinematografiche.', 'Performance', 'enterprise.',
  'Senza', 'i', 'costi', 'delle', 'grandi', 'agenzie.'
]

function Word({ word, progress, index, total }) {
  const start = index / (total + 3)
  const end = (index + 3) / (total + 3)
  const opacity = useTransform(progress, [start, end], [0.07, 1])
  const blur = useTransform(progress, [start, end], [10, 0])
  const sp = useSpring(opacity, { stiffness: 55, damping: 22 })
  const sb = useSpring(blur, { stiffness: 55, damping: 22 })

  return (
    <motion.span
      style={{
        opacity: sp,
        filter: useTransform(sb, v => `blur(${v}px)`),
        display: 'inline-block',
        marginRight: '0.32em',
      }}
    >
      {word}
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const progress = useTransform(scrollYProgress, [0.08, 0.88], [0, 1])
  const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 0.85], [0, 0.8, 0])
  const lineScaleX = useTransform(scrollYProgress, [0.1, 0.5], [0, 1])

  return (
    <section ref={ref} className="relative py-44 px-6 overflow-hidden">
      {/* Radial bg glow */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0"
          style={{ background: 'radial-gradient(ellipse 75% 55% at 50% 50%, rgba(201,168,76,0.055) 0%, transparent 70%)' }}
        />
      </motion.div>

      <div className="max-w-7xl mx-auto">
        {/* Label */}
        <div className="flex items-center gap-4 mb-16">
          <motion.div
            style={{ scaleX: lineScaleX, transformOrigin: 'left' }}
            className="h-px w-12 bg-[#C9A84C]/50"
          />
          <span className="font-mono text-[10px] tracking-[0.38em] uppercase text-[#C9A84C]/55">
            Il nostro manifesto
          </span>
        </div>

        {/* Animated phrase */}
        <p className="font-display text-[clamp(2.4rem,6.2vw,5.8rem)] font-light
                      leading-[1.18] tracking-[-0.02em] text-neutral-100">
          {phrase.map((w, i) => (
            <Word key={i} word={w} progress={progress} index={i} total={phrase.length} />
          ))}
        </p>

        {/* Stats row */}
        <div className="mt-28 grid grid-cols-2 md:grid-cols-4 gap-px bg-white/[0.04]">
          {[
            { n: '80+', label: 'Progetti consegnati' },
            { n: '100%', label: 'Clienti soddisfatti' },
            { n: '< 7gg', label: 'Tempo medio consegna' },
            { n: '4 anni', label: 'Esperienza premium' },
          ].map((s, i) => (
            <motion.div
              key={i}
              initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 48, damping: 18, mass: 1.1, delay: i * 0.1 }}
              className="bg-[#050505] px-10 py-10"
            >
              <div className="font-display text-[2.8rem] font-light text-gold leading-none mb-2">{s.n}</div>
              <div className="font-sans text-[12.5px] text-neutral-600 tracking-wide">{s.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
