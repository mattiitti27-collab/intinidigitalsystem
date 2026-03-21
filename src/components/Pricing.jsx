import { motion } from 'framer-motion'
import { Check, ArrowRight } from 'lucide-react'

const benefits = [
  'Design su misura — nessun template',
  'Animazioni Framer Motion incluse',
  'Mobile-first & responsive',
  'SEO tecnico ottimizzato',
  'Core Web Vitals 90+',
  'Consegna in 5–10 giorni lavorativi',
  'Revisioni illimitate nel progetto',
  '30 giorni di supporto post-lancio',
]

const packages = [
  {
    name: 'Starter',
    price: '349',
    desc: 'Per chi inizia. Presenza digitale seria.',
    features: ['Landing page 1 sezione', 'Design premium', 'Mobile responsive', 'Form contatti'],
    highlight: false,
  },
  {
    name: 'Pro',
    price: '749',
    desc: 'Il più scelto. Risultati garantiti.',
    features: ['Fino a 5 pagine', 'Animazioni avanzate', 'CMS integrato', '3D elements', 'Analytics setup', 'SEO completo'],
    highlight: true,
  },
  {
    name: 'Elite',
    price: '1.490',
    desc: "Per chi non accetta compromessi.",
    features: ['Pagine illimitate', 'WebGL 3D custom', 'E-commerce ready', 'Dashboard admin', 'Manutenzione 6 mesi', 'Priority support'],
    highlight: false,
  },
]

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 }
  }
}

const itemVariants = {
  hidden: { filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 },
  visible: {
    filter: 'blur(0px)', opacity: 1, y: 0, scale: 1,
    transition: { type: 'spring', stiffness: 50, damping: 20, mass: 1 }
  }
}

function PricingCard({ pkg, index }) {
  return (
    <motion.div
      variants={itemVariants}
      className={`relative rounded-3xl overflow-hidden ${
        pkg.highlight ? 'animated-border' : 'border border-white/7'
      }`}
      style={pkg.highlight ? {
        boxShadow: '0 20px 80px rgba(201,168,76,0.08), 0 0 0 0 transparent',
      } : {}}
    >
      {pkg.highlight && (
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/60 to-transparent" />
      )}

      {pkg.highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-[#C9A84C] rounded-full">
          <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-[#050505] font-medium">
            Più scelto
          </span>
        </div>
      )}

      <div className={`p-8 h-full flex flex-col ${pkg.highlight ? 'bg-[#0a0a0a]' : 'bg-white/[0.02]'}`}>
        {/* Header */}
        <div className="mb-8">
          <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-600 mb-4">{pkg.name}</p>
          <div className="flex items-baseline gap-1 mb-3">
            <span className="font-sans text-sm text-neutral-500">€</span>
            <span className="font-display text-6xl font-light text-neutral-100 leading-none">{pkg.price}</span>
          </div>
          <p className="font-sans text-sm text-neutral-500">{pkg.desc}</p>
        </div>

        {/* Features */}
        <motion.ul
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-30px' }}
          className="space-y-3 flex-1 mb-8"
        >
          {pkg.features.map((feature, i) => (
            <motion.li
              key={i}
              variants={itemVariants}
              className="flex items-center gap-3"
            >
              <div className={`w-4 h-4 rounded-full border flex items-center justify-center flex-shrink-0 ${
                pkg.highlight
                  ? 'border-[#C9A84C]/50 bg-[#C9A84C]/10'
                  : 'border-white/10 bg-white/5'
              }`}>
                <Check size={9} className={pkg.highlight ? 'text-[#C9A84C]' : 'text-neutral-400'} strokeWidth={2.5} />
              </div>
              <span className="font-sans text-sm text-neutral-400">{feature}</span>
            </motion.li>
          ))}
        </motion.ul>

        {/* CTA */}
        <a
          href="#contatti"
          className={`btn-sweep group relative flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-sans text-sm transition-all duration-500 ${
            pkg.highlight
              ? 'bg-[#C9A84C] text-[#050505] hover:bg-[#E8C97A] hover:shadow-[0_0_30px_rgba(201,168,76,0.25)]'
              : 'border border-white/10 text-neutral-300 hover:border-white/20 hover:text-neutral-100'
          }`}
        >
          Inizia ora
          <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
        </a>
      </div>
    </motion.div>
  )
}

export default function Pricing() {
  return (
    <section id="pricing" className="py-32 px-6 relative">
      {/* Bg glow */}
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_60%_40%_at_50%_50%,rgba(201,168,76,0.04)_0%,transparent_70%)]" />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1 }}
            className="flex items-center justify-center gap-3 mb-6"
          >
            <div className="h-px w-6 bg-[#C9A84C]/60" />
            <span className="font-mono text-[11px] tracking-[0.35em] uppercase text-[#C9A84C]/70">Investimento</span>
            <div className="h-px w-6 bg-[#C9A84C]/60" />
          </motion.div>

          <motion.h2
            initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.1 }}
            className="font-display text-[clamp(2.5rem,5vw,4.5rem)] font-light text-neutral-100 leading-tight mb-4"
          >
            Qualità d'agenzia,
            <br />
            <span className="text-gradient-gold">prezzi accessibili.</span>
          </motion.h2>

          <motion.p
            initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.2 }}
            className="font-sans text-neutral-500 max-w-md mx-auto"
          >
            Nessun costo nascosto. Nessun abbonamento mensile obbligatorio.
            Paghi il progetto, possiedi il risultato.
          </motion.p>
        </div>

        {/* Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-50px' }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4"
        >
          {packages.map((pkg, i) => (
            <PricingCard key={i} pkg={pkg} index={i} />
          ))}
        </motion.div>

        {/* Trust signals */}
        <motion.div
          initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
          whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.3 }}
          className="mt-16 flex flex-wrap justify-center gap-8 text-center"
        >
          {[
            '✦ Nessun anticipo',
            '✦ Soddisfatti o rimborsati',
            '✦ NDA disponibile',
            '✦ Fattura elettronica',
          ].map((item, i) => (
            <span key={i} className="font-mono text-[10px] tracking-[0.2em] uppercase text-neutral-600">
              {item}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
