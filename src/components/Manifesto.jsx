import { useRef } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'

const manifestoText = [
  'Design', '3D.', 'Animazioni', 'cinematografiche.',
  'Performance', 'enterprise.', 'Senza', 'i', 'costi',
  'delle', 'grandi', 'agenzie.'
]

function AnimatedWord({ word, progress, totalWords, index }) {
  const start = index / (totalWords + 2)
  const end = (index + 2.5) / (totalWords + 2)

  const opacity = useTransform(progress, [start, end], [0.08, 1])
  const blur = useTransform(progress, [start, end], [12, 0])

  const springOpacity = useSpring(opacity, { stiffness: 60, damping: 20 })
  const springBlur = useSpring(blur, { stiffness: 60, damping: 20 })

  return (
    <motion.span
      style={{
        opacity: springOpacity,
        filter: useTransform(springBlur, (v) => `blur(${v}px)`),
        display: 'inline-block',
        marginRight: '0.3em',
      }}
    >
      {word}
    </motion.span>
  )
}

export default function Manifesto() {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8], [0, 0.6, 0])
  const progress = useTransform(scrollYProgress, [0.05, 0.85], [0, 1])

  return (
    <section
      ref={ref}
      className="relative py-40 px-6 overflow-hidden"
    >
      {/* Illuminated background */}
      <motion.div
        style={{ opacity: bgOpacity }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(201,168,76,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_40%_40%_at_50%_50%,rgba(80,60,200,0.04)_0%,transparent_60%)]" />
      </motion.div>

      {/* Top separator */}
      <div className="max-w-7xl mx-auto mb-16 flex items-center gap-4">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
        <span className="font-mono text-[10px] tracking-[0.35em] uppercase text-neutral-600">Il nostro manifesto</span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
      </div>

      {/* Main manifesto text */}
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-display text-[clamp(2.5rem,6.5vw,6rem)] font-light leading-[1.15] tracking-tight text-neutral-100">
          {manifestoText.map((word, i) => (
            <AnimatedWord
              key={i}
              word={word}
              progress={progress}
              totalWords={manifestoText.length}
              index={i}
            />
          ))}
        </p>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto mt-28 grid grid-cols-3 gap-px bg-white/5">
        {[
          { value: '48h', label: 'Tempo di consegna medio' },
          { value: '100%', label: 'Soddisfazione clienti' },
          { value: '6+', label: 'Anni di esperienza' },
        ].map((stat, i) => (
          <motion.div
            key={i}
            initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              type: 'spring', stiffness: 50, damping: 20, mass: 1,
              delay: i * 0.12
            }}
            className="bg-[#050505] p-10 text-center"
          >
            <div className="font-display text-5xl font-light text-gradient-gold mb-2">{stat.value}</div>
            <div className="font-sans text-sm text-neutral-500 tracking-wide">{stat.label}</div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
