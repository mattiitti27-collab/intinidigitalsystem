import { motion } from 'framer-motion'
import { Quote } from 'lucide-react'

const reviews = [
  {
    name: 'Marco Ferretti',
    role: 'CEO, Maison Lumière',
    text: 'Il sito che ci hanno consegnato ha triplicato le conversioni nel primo mese. Non pensavo fosse possibile ottenere questa qualità a questi prezzi.',
    avatar: 'MF',
    accent: '#C9A84C',
  },
  {
    name: 'Giulia Moretti',
    role: 'Founder, Volta Studio',
    text: 'Le animazioni 3D hanno trasformato completamente la percezione del nostro brand. I clienti la prima cosa che dicono è "wow, che sito incredibile".',
    avatar: 'GM',
    accent: '#7080ff',
  },
  {
    name: 'Alessandro Bianchi',
    role: 'CTO, Nuvola SaaS',
    text: 'Performance 100/100 su Lighthouse, consegna in 6 giorni, codice pulitissimo. Raro trovare questo livello di professionalità.',
    avatar: 'AB',
    accent: '#40d090',
  },
]

export default function Testimonials() {
  return (
    <section className="py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        <div className="mb-16">
          <motion.div
            initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 48, damping: 18 }}
            className="flex items-center gap-3 mb-5"
          >
            <div className="h-px w-5 bg-[#C9A84C]/55" />
            <span className="font-mono text-[10.5px] tracking-[0.35em] uppercase text-[#C9A84C]/65">
              Testimonianze
            </span>
          </motion.div>
          <motion.h2
            initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 48, damping: 18, delay: 0.1 }}
            className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light text-neutral-100 leading-tight"
          >
            I clienti parlano.
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {reviews.map((r, i) => (
            <motion.div
              key={i}
              initial={{ filter: 'blur(16px)', opacity: 0, y: 36, scale: 0.95 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ type: 'spring', stiffness: 48, damping: 20, mass: 1.1, delay: i * 0.1 }}
              className="relative p-8 rounded-2xl border border-white/[0.06] bg-white/[0.02] group
                         hover:border-white/10 transition-colors duration-400"
            >
              {/* Quote icon */}
              <div className="mb-6 w-8 h-8 rounded-full flex items-center justify-center"
                style={{ background: r.accent + '12', border: `1px solid ${r.accent}20` }}>
                <Quote size={13} style={{ color: r.accent }} strokeWidth={1.5} />
              </div>

              <p className="font-sans text-[13.5px] text-neutral-400 leading-[1.75] mb-8">
                "{r.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full flex items-center justify-center font-sans
                                text-[11px] font-medium shrink-0"
                  style={{ background: r.accent + '18', color: r.accent }}>
                  {r.avatar}
                </div>
                <div>
                  <div className="font-sans text-[13px] text-neutral-300 font-medium">{r.name}</div>
                  <div className="font-mono text-[10px] tracking-wide text-neutral-700">{r.role}</div>
                </div>
              </div>

              {/* Bottom accent line */}
              <div className="absolute bottom-0 left-8 right-8 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{ background: `linear-gradient(90deg, transparent, ${r.accent}40, transparent)` }}
              />
            </motion.div>
          ))}
        </div>

        {/* Stars row */}
        <motion.div
          initial={{ filter: 'blur(16px)', opacity: 0, y: 20 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 48, damping: 18, delay: 0.35 }}
          className="mt-14 flex items-center justify-center gap-3"
        >
          <div className="flex gap-0.5">
            {[...Array(5)].map((_, i) => (
              <span key={i} className="text-[#C9A84C] text-lg leading-none">★</span>
            ))}
          </div>
          <span className="font-sans text-sm text-neutral-600">
            5.0 su 80+ recensioni verificate
          </span>
        </motion.div>
      </div>
    </section>
  )
}
