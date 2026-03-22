import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { ArrowUpRight, Send, Instagram, Linkedin, Github } from 'lucide-react'

function MagneticLink({ children, href = '#', className = '' }) {
  const ref = useRef()
  const x = useSpring(0, { stiffness: 260, damping: 28 })
  const y = useSpring(0, { stiffness: 260, damping: 28 })

  const onMove = (e) => {
    const r = ref.current?.getBoundingClientRect()
    if (!r) return
    x.set((e.clientX - r.left - r.width / 2) * 0.28)
    y.set((e.clientY - r.top - r.height / 2) * 0.28)
  }

  return (
    <motion.a ref={ref} href={href} style={{ x, y }}
      onMouseMove={onMove} onMouseLeave={() => { x.set(0); y.set(0) }}
      className={`inline-flex items-center gap-1 font-sans text-[13px] text-neutral-600
                  hover:text-neutral-200 transition-colors duration-280 group ${className}`}>
      {children}
      <ArrowUpRight size={12}
        className="opacity-0 group-hover:opacity-100 transition-all duration-280
                   group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.a>
  )
}

function SocialIcon({ href, Icon }) {
  const ref = useRef()
  const x = useSpring(0, { stiffness: 300, damping: 28 })
  const y = useSpring(0, { stiffness: 300, damping: 28 })
  return (
    <motion.a ref={ref} href={href} style={{ x, y }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect()
        if (!r) return
        x.set((e.clientX - r.left - r.width / 2) * 0.35)
        y.set((e.clientY - r.top - r.height / 2) * 0.35)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
      className="w-9 h-9 rounded-full border border-white/8 flex items-center justify-center
                 text-neutral-600 hover:text-neutral-200 hover:border-white/20
                 transition-all duration-280"
    >
      <Icon size={15} strokeWidth={1.5} />
    </motion.a>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [state, setState] = useState('idle') // idle | sending | done

  const submit = (e) => {
    e.preventDefault()
    if (!email || state !== 'idle') return
    setState('sending')
    // Opens email client with pre-filled subject
    window.location.href = `mailto:intini.mattia.rl@gmail.com?subject=Richiesta%20preventivo&body=Ciao%2C%20sono%20interessato%20a%20un%20progetto.%20La%20mia%20email%3A%20${encodeURIComponent(email)}`
    setTimeout(() => { setState('done'); setEmail('') }, 900)
    setTimeout(() => setState('idle'), 4000)
  }

  const navLinks = [
    { group: 'Navigazione', items: [
      { label: 'Home', href: '#home' },
      { label: 'Servizi', href: '#services' },
      { label: 'Lavori', href: '#work' },
      { label: 'Prezzi', href: '#pricing' },
    ]},
    { group: 'Azienda', items: [
      { label: 'Chi siamo', href: '#' },
      { label: 'Blog', href: '#' },
      { label: 'Privacy policy', href: '#' },
      { label: 'Cookie', href: '#' },
    ]},
  ]

  return (
    <footer id="contatti"
      className="sticky bottom-0 z-[-1] bg-[#060606] border-t border-white/[0.04]">
      <div className="max-w-7xl mx-auto px-8 pt-20 pb-10 min-h-[100vh] flex flex-col">

        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-auto pb-20">

          {/* Left — CTA + form */}
          <motion.div
            initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 48, damping: 18 }}
          >
            <span className="font-mono text-[10px] tracking-[0.38em] uppercase text-neutral-700 block mb-8">
              Inizia il tuo progetto
            </span>
            <h3 className="font-display text-[clamp(1.8rem,4vw,3rem)] font-light
                           text-neutral-200 mb-4 leading-tight">
              Parliamoci.<br /><span className="text-gold">Senza impegno.</span>
            </h3>
            <p className="font-sans text-[13.5px] text-neutral-600 mb-6 leading-relaxed max-w-sm">
              Lascia la tua email e ti richiamiamo entro <span className="text-neutral-400">24 ore</span> con
              una proposta su misura. Risposta garantita o rimborso del preventivo — che è gratuito, quindi non perdi nulla.
            </p>

            {/* Direct contacts */}
            <div className="mb-8 space-y-2">
              <a href="mailto:intini.mattia.rl@gmail.com"
                className="flex items-center gap-2.5 font-mono text-[12px] text-neutral-600 hover:text-[#C9A84C] transition-colors duration-300">
                <span className="text-[#C9A84C]/40 text-[10px]">✉</span>
                intini.mattia.rl@gmail.com
              </a>
              <a href="https://wa.me/393345415707" target="_blank" rel="noopener noreferrer"
                className="flex items-center gap-2.5 font-mono text-[12px] text-neutral-600 hover:text-emerald-400 transition-colors duration-300">
                <span className="text-emerald-500/60 text-[10px]">✆</span>
                WhatsApp diretto →
              </a>
            </div>

            {/* Email form — terminal style */}
            <form onSubmit={submit} className="max-w-sm">
              <div className="relative flex items-center border-b border-white/10
                             pb-3 focus-within:border-[#C9A84C]/45 transition-all duration-400 group">
                <span className="font-mono text-[11px] text-[#C9A84C]/40 mr-3 shrink-0
                                 group-focus-within:text-[#C9A84C]/70 transition-colors">
                  →
                </span>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  placeholder="la.tua@email.com"
                  className="flex-1 bg-transparent font-mono text-[13px] text-neutral-300
                             placeholder-neutral-800 outline-none tracking-wide"
                />
                <motion.button
                  type="submit"
                  whileTap={{ scale: 0.85 }}
                  className="ml-4 transition-colors duration-300"
                  style={{ color: state === 'done' ? '#40d090' : '#C9A84C' }}
                >
                  {state === 'idle' && <Send size={14} strokeWidth={1.5} />}
                  {state === 'sending' && (
                    <motion.div animate={{ rotate: 360 }} transition={{ duration: 0.7, repeat: Infinity, ease: 'linear' }}>
                      <Send size={14} strokeWidth={1.5} />
                    </motion.div>
                  )}
                  {state === 'done' && (
                    <motion.span
                      initial={{ scale: 0 }} animate={{ scale: 1 }}
                      className="font-mono text-sm">✓
                    </motion.span>
                  )}
                </motion.button>
              </div>
              <p className="mt-2.5 font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-800">
                {state === 'done' ? '✓ Ricevuto! Ti rispondiamo in 24 ore.' : 'Nessuno spam. Risposta garantita 24h.'}
              </p>
            </form>
          </motion.div>

          {/* Right — links + social */}
          <motion.div
            initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 48, damping: 18, delay: 0.15 }}
            className="flex flex-col justify-between pt-2"
          >
            <div className="grid grid-cols-2 gap-12">
              {navLinks.map((group, gi) => (
                <div key={gi}>
                  <p className="font-mono text-[9px] tracking-[0.38em] uppercase text-neutral-700 mb-5">
                    {group.group}
                  </p>
                  <div className="space-y-3.5">
                    {group.items.map((item, ii) => (
                      <div key={ii}>
                        <MagneticLink href={item.href}>{item.label}</MagneticLink>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-12">
              <p className="font-mono text-[9px] tracking-[0.38em] uppercase text-neutral-700 mb-4">
                Seguici
              </p>
              <div className="flex items-center gap-3">
                <SocialIcon href="#" Icon={Instagram} />
                <SocialIcon href="#" Icon={Linkedin} />
                <SocialIcon href="#" Icon={Github} />
              </div>
            </div>
          </motion.div>
        </div>

        {/* Giant wordmark */}
        <div className="overflow-hidden">
          <motion.div
            initial={{ opacity: 0, y: 80 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="block font-display font-light select-none"
              style={{
                fontSize: 'clamp(3rem, 10vw, 12rem)',
                lineHeight: 0.85,
                letterSpacing: '-0.025em',
                background: 'linear-gradient(180deg, rgba(245,240,230,0.065) 0%, rgba(245,240,230,0.015) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              Intini Digital System
            </span>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-6 pt-6 border-t border-white/[0.04] flex flex-col sm:flex-row
                        items-center justify-between gap-4">
          <span className="font-mono text-[9.5px] tracking-widest uppercase text-neutral-800">
            © 2026 Intini Digital System — P.IVA 00000000000
          </span>
          <div className="flex items-center gap-6">
            <MagneticLink href="#">Privacy</MagneticLink>
            <MagneticLink href="#">Cookie</MagneticLink>
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/60 animate-pulse" />
              <span className="font-mono text-[9.5px] tracking-wide text-neutral-700">
                Disponibili per nuovi progetti
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
