import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus } from 'lucide-react'

const faqs = [
  {
    q: 'Quanto tempo ci vuole per consegnare un sito?',
    a: 'Per i pacchetti Starter e Pro la consegna media è di 5–7 giorni lavorativi dal primo appuntamento. Il pacchetto Elite con WebGL custom o e-commerce può richiedere 10–14 giorni. Ogni progetto parte con un kick-off call per definire la timeline esatta — e la rispettiamo.',
  },
  {
    q: 'Devo pagare prima o dopo?',
    a: 'Pagamento a progetto completato e approvato. Nessuna caparra richiesta. Puoi visionare il sito live su un dominio di staging, richiedere revisioni illimitate, e solo quando sei soddisfatto al 100% procediamo con la fattura. Zero rischi per te.',
  },
  {
    q: 'Posso modificare i contenuti da solo dopo la consegna?',
    a: 'Sì. Il pacchetto Pro e Elite include un CMS headless (Sanity o Contentful) con pannello admin semplice come Instagram. Aggiungi post, cambia immagini, modifica testi — tutto senza toccare una riga di codice. Inclusa anche una sessione di formazione dedicata.',
  },
  {
    q: 'Chi ospita il sito? Ci sono costi ricorrenti?',
    a: 'Deploy su Vercel, la piattaforma più veloce del mercato con CDN globale. Piano gratuito sufficiente per la maggior parte dei siti (banda illimitata, SSL incluso). Non ci sono nostre commissioni ricorrenti. Paghi solo l\'eventuale dominio (~10–15€/anno) e il CMS se scegli il piano avanzato.',
  },
  {
    q: 'Usate template o costruite tutto da zero?',
    a: 'Zero template. Ogni sito è scritto in React/Next.js da zero, con design originale in Figma su misura. Questo garantisce prestazioni ottimali, codice pulito e un risultato che nessun competitor può copiare comprando lo stesso template.',
  },
  {
    q: 'Cosa succede se non sono soddisfatto?',
    a: 'Revisioni illimitate durante lo sviluppo fino all\'approvazione. Se dopo la consegna finale non sei soddisfatto del risultato, rimborsiamo integralmente senza domande. In 4 anni non è mai successo — ma la garanzia c\'è e vale.',
  },
  {
    q: 'Fate anche SEO e Google Ads?',
    a: 'SEO tecnico on-page è incluso in tutti i pacchetti: schema markup, meta tag ottimizzati, sitemap, velocità Core Web Vitals. Per campagne Google Ads / Meta Ads gestiamo anche queste su preventivo separato.',
  },
  {
    q: 'Posso avere il codice sorgente?',
    a: 'Sempre. Il codice sorgente è tuo dalla consegna. Nessun lock-in, nessun abbonamento obbligatorio. Puoi spostare il sito su qualsiasi hosting, farlo gestire da chiunque, o continuare con noi per manutenzione e aggiornamenti.',
  },
]

function FaqItem({ item, index }) {
  const [open, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ filter: 'blur(12px)', opacity: 0, y: 20 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-30px' }}
      transition={{ type: 'spring', stiffness: 48, damping: 20, delay: index * 0.06 }}
      className="border-b border-white/[0.06] last:border-0"
    >
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between py-6 text-left group"
      >
        <span className="font-sans text-[15px] text-neutral-300 font-light pr-8 group-hover:text-neutral-100 transition-colors duration-250">
          {item.q}
        </span>
        <motion.div
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="shrink-0 w-7 h-7 rounded-full border border-white/10 flex items-center justify-center
                     group-hover:border-[#C9A84C]/40 transition-colors duration-250"
          style={{ color: open ? '#C9A84C' : '#555' }}
        >
          <Plus size={13} strokeWidth={1.5} />
        </motion.div>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            key="body"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <p className="font-sans text-[13.5px] text-neutral-500 leading-[1.8] pb-7 max-w-3xl">
              {item.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

export default function FAQ() {
  return (
    <section id="faq" className="py-36 px-6 relative">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 55% 45% at 50% 50%, rgba(201,168,76,0.03) 0%, transparent 70%)' }}
      />

      <div className="max-w-4xl mx-auto">
        {/* Header */}
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
              FAQ
            </span>
          </motion.div>

          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <motion.h2
              initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 48, damping: 18, delay: 0.1 }}
              className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light text-neutral-100 leading-tight"
            >
              Hai domande?<br />
              <span className="text-gold">Abbiamo risposte.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-sans text-[13px] text-neutral-600 max-w-xs leading-relaxed md:text-right"
            >
              Ancora dubbi? Scrivici su{' '}
              <a
                href="https://wa.me/393XX000000"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-400/70 hover:text-emerald-400 transition-colors"
              >
                WhatsApp
              </a>{' '}
              — rispondiamo in pochi minuti.
            </motion.p>
          </div>
        </div>

        {/* Accordion */}
        <div className="border-t border-white/[0.06]">
          {faqs.map((item, i) => (
            <FaqItem key={i} item={item} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
