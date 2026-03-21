import { motion } from 'framer-motion'
import { Check, ArrowRight, Zap } from 'lucide-react'

const packages = [
  {
    name: 'Starter',
    price: '349',
    priceNote: 'una tantum',
    desc: 'Per chi vuole una presenza digitale seria senza spreco di budget.',
    features: [
      'Landing page (fino a 3 sezioni)',
      'Design su misura premium',
      'Mobile-first responsive',
      'Animazioni Framer Motion',
      'Form di contatto',
      'Deploy incluso',
    ],
    cta: 'Inizia ora',
    highlight: false,
    accent: 'rgba(255,255,255,0.08)',
  },
  {
    name: 'Pro',
    price: '749',
    priceNote: 'una tantum',
    desc: 'Il pacchetto più scelto. Tutto il necessario per un sito che si distingue.',
    features: [
      'Fino a 6 pagine complete',
      'Animazioni avanzate + micro-interazioni',
      'CMS headless integrato',
      'Elementi 3D WebGL',
      'SEO tecnico completo',
      'Analytics & Search Console',
      '30 gg supporto dedicato',
    ],
    cta: 'Scegli Pro',
    highlight: true,
    accent: '#C9A84C',
  },
  {
    name: 'Elite',
    price: '1.490',
    priceNote: 'una tantum',
    desc: 'Per chi non accetta compromessi. L\'esperienza digitale definitiva.',
    features: [
      'Pagine illimitate',
      'WebGL 3D custom su misura',
      'E-commerce completo',
      'Dashboard admin custom',
      'Integrazioni API & terze parti',
      'Manutenzione 6 mesi inclusa',
      'Priority support diretto',
    ],
    cta: 'Contattaci',
    highlight: false,
    accent: 'rgba(255,255,255,0.08)',
  },
]

const fadeUp = (delay = 0) => ({
  hidden: { filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 },
  visible: {
    filter: 'blur(0px)', opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 48, damping: 18, mass: 1.1, delay }
  }
})

function PricingCard({ pkg, index }) {
  return (
    <motion.div
      variants={fadeUp(index * 0.12)}
      className={`relative flex flex-col rounded-2xl overflow-hidden
                  ${pkg.highlight ? 'animated-border' : 'border border-white/[0.06]'}`}
    >
      {/* Popular badge */}
      {pkg.highlight && (
        <>
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/70 to-transparent" />
          <div className="absolute -top-[1px] left-1/2 -translate-x-1/2">
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 bg-[#C9A84C] rounded-b-xl">
              <Zap size={9} className="text-[#080808]" />
              <span className="font-mono text-[8.5px] tracking-[0.3em] uppercase text-[#080808] font-medium">
                Più scelto
              </span>
            </div>
          </div>
        </>
      )}

      <div className={`flex-1 flex flex-col p-8 pt-10 ${pkg.highlight ? 'bg-[#0a0a0a]' : 'bg-white/[0.018]'}`}>
        {/* Header */}
        <div className="mb-8">
          <span className="font-mono text-[9.5px] tracking-[0.3em] uppercase text-neutral-700 block mb-5">
            {pkg.name}
          </span>
          <div className="flex items-start gap-1 mb-1">
            <span className="font-sans text-sm text-neutral-600 mt-2.5">€</span>
            <span className="font-display text-[3.8rem] font-light leading-none text-neutral-100">
              {pkg.price}
            </span>
          </div>
          <span className="font-mono text-[9.5px] tracking-widest uppercase text-neutral-700">
            {pkg.priceNote}
          </span>
          <p className="font-sans text-[13px] text-neutral-500 mt-4 leading-relaxed">{pkg.desc}</p>
        </div>

        {/* Features */}
        <motion.ul
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          transition={{ staggerChildren: 0.07 }}
          className="space-y-3 flex-1 mb-9"
        >
          {pkg.features.map((f, i) => (
            <motion.li
              key={i}
              variants={fadeUp(0)}
              className="flex items-start gap-3"
            >
              <div className="mt-0.5 w-4 h-4 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background: pkg.highlight ? 'rgba(201,168,76,0.12)' : 'rgba(255,255,255,0.04)',
                  border: `1px solid ${pkg.highlight ? 'rgba(201,168,76,0.3)' : 'rgba(255,255,255,0.08)'}`,
                }}>
                <Check size={9}
                  className={pkg.highlight ? 'text-[#C9A84C]' : 'text-neutral-500'}
                  strokeWidth={2.5}
                />
              </div>
              <span className="font-sans text-[13px] text-neutral-500 leading-snug">{f}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <a href="#contatti"
          className={`btn-sweep group flex items-center justify-center gap-2 py-3.5 px-6
                      rounded-xl font-sans text-[13.5px] font-medium transition-all duration-400
                      ${pkg.highlight
                        ? 'bg-[#C9A84C] text-[#080808] hover:bg-[#E8C97A] hover:shadow-[0_0_40px_rgba(201,168,76,0.25)]'
                        : 'border border-white/8 text-neutral-400 hover:text-neutral-100 hover:border-white/20'
                      }`}>
          {pkg.cta}
          <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-36 px-6 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 40% at 50% 50%, rgba(201,168,76,0.04) 0%, transparent 70%)' }}
      />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            variants={fadeUp(0)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex items-center justify-center gap-3 mb-5"
          >
            <div className="h-px w-5 bg-[#C9A84C]/55" />
            <span className="font-mono text-[10.5px] tracking-[0.35em] uppercase text-[#C9A84C]/65">Investimento</span>
            <div className="h-px w-5 bg-[#C9A84C]/55" />
          </motion.div>
          <motion.h2
            variants={fadeUp(0.1)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light text-neutral-100 leading-tight mb-5"
          >
            Qualità d'agenzia,<br />
            <span className="text-gold">prezzi accessibili.</span>
          </motion.h2>
          <motion.p
            variants={fadeUp(0.2)}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="font-sans text-[13.5px] text-neutral-600 max-w-md mx-auto leading-relaxed"
          >
            Nessun costo ricorrente obbligatorio. Nessun template.
            Paghi il progetto, possiedi il codice sorgente.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          transition={{ staggerChildren: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {packages.map((pkg, i) => (
            <PricingCard key={i} pkg={pkg} index={i} />
          ))}
        </motion.div>

        {/* Trust strip */}
        <motion.div
          variants={fadeUp(0.4)}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="mt-14 pt-10 border-t border-white/[0.05] flex flex-wrap items-center
                     justify-center gap-x-10 gap-y-3"
        >
          {[
            { icon: '✦', text: 'Pagamento a progetto completato' },
            { icon: '✦', text: 'NDA su richiesta' },
            { icon: '✦', text: 'Codice sorgente consegnato' },
            { icon: '✦', text: 'Fattura elettronica' },
          ].map((t, i) => (
            <span key={i} className="font-mono text-[9.5px] tracking-[0.22em] uppercase text-neutral-700 flex items-center gap-2">
              <span className="text-[#C9A84C]/40">{t.icon}</span>
              {t.text}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
