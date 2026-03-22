import { motion } from 'framer-motion'
import { Check, X, Minus } from 'lucide-react'

const rows = [
  { feature: 'Prezzo medio per sito', ids: '€349–1.490', agency: '€3.000–15.000', freelancer: '€500–3.000' },
  { feature: 'Tempo di consegna', ids: '5–7 giorni', agency: '4–12 settimane', freelancer: '2–8 settimane' },
  { feature: 'Design 100% su misura', ids: true, agency: true, freelancer: 'Dipende' },
  { feature: 'Animazioni 3D / WebGL', ids: true, agency: 'Raro / costoso', freelancer: false },
  { feature: 'Performance 100/100', ids: true, agency: 'Spesso no', freelancer: 'Dipende' },
  { feature: 'Pagamento post-consegna', ids: true, agency: false, freelancer: false },
  { feature: 'Codice sorgente consegnato', ids: true, agency: false, freelancer: 'A volte' },
  { feature: 'Supporto 30+ giorni incluso', ids: true, agency: 'A pagamento', freelancer: false },
  { feature: 'Comunicazione diretta', ids: true, agency: 'Account manager', freelancer: true },
]

function Cell({ value, highlight }) {
  if (value === true) return (
    <div className="flex justify-center">
      <span className={`flex items-center gap-1 font-mono text-[10px] tracking-wide ${highlight ? 'text-[#C9A84C]' : 'text-emerald-400/70'}`}>
        <Check size={12} strokeWidth={2.5} /> Sì
      </span>
    </div>
  )
  if (value === false) return (
    <div className="flex justify-center">
      <span className="flex items-center gap-1 font-mono text-[10px] text-neutral-700">
        <X size={11} strokeWidth={2} /> No
      </span>
    </div>
  )
  return (
    <div className={`font-sans text-[12px] text-center ${highlight ? 'text-[#C9A84C]' : 'text-neutral-500'}`}>
      {value}
    </div>
  )
}

export default function WhyUs() {
  return (
    <section className="py-28 px-6 relative">
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(201,168,76,0.025) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-14 text-center">
          <motion.div
            initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 48, damping: 18 }}
            className="flex items-center justify-center gap-3 mb-5">
            <div className="h-px w-5 bg-[#C9A84C]/55" />
            <span className="font-mono text-[10.5px] tracking-[0.35em] uppercase text-[#C9A84C]/65">Perché noi</span>
            <div className="h-px w-5 bg-[#C9A84C]/55" />
          </motion.div>
          <motion.h2
            initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 48, damping: 18, delay: 0.1 }}
            className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light text-neutral-100 leading-tight">
            Il meglio delle due opzioni.<br />
            <span className="text-gold">Nessun compromesso.</span>
          </motion.h2>
        </div>

        {/* Table */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ type: 'spring', stiffness: 48, damping: 20, delay: 0.15 }}
          className="rounded-2xl border border-white/[0.06] overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-4 bg-white/[0.02] border-b border-white/[0.06]">
            <div className="px-6 py-4" />
            {[
              { label: 'Intini DS', highlight: true },
              { label: 'Grande Agenzia', highlight: false },
              { label: 'Freelancer', highlight: false },
            ].map((col, i) => (
              <div key={i} className={`px-4 py-4 text-center ${col.highlight ? 'bg-[#C9A84C]/[0.05]' : ''}`}>
                <span className={`font-mono text-[9.5px] tracking-[0.3em] uppercase ${col.highlight ? 'text-[#C9A84C]/80' : 'text-neutral-700'}`}>
                  {col.label}
                </span>
                {col.highlight && (
                  <div className="mt-1.5 mx-auto w-fit px-2 py-0.5 rounded-full bg-[#C9A84C] text-[#080808] font-mono text-[7.5px] tracking-widest uppercase">
                    ★ Best
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div key={i} className={`grid grid-cols-4 border-b border-white/[0.04] last:border-0 ${i % 2 === 0 ? '' : 'bg-white/[0.008]'}`}>
              <div className="px-6 py-4 font-sans text-[12.5px] text-neutral-500">{row.feature}</div>
              <div className="px-4 py-4 flex items-center justify-center bg-[#C9A84C]/[0.03]">
                <Cell value={row.ids} highlight />
              </div>
              <div className="px-4 py-4 flex items-center justify-center">
                <Cell value={row.agency} />
              </div>
              <div className="px-4 py-4 flex items-center justify-center">
                <Cell value={row.freelancer} />
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
