import { useRef, useState } from 'react'
import { motion, useSpring } from 'framer-motion'
import { ArrowUpRight, Send } from 'lucide-react'

function MagneticLink({ children, href = '#' }) {
  const ref = useRef(null)
  const x = useSpring(0, { stiffness: 300, damping: 30 })
  const y = useSpring(0, { stiffness: 300, damping: 30 })

  const handleMouseMove = (e) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distX = (e.clientX - centerX) * 0.3
    const distY = (e.clientY - centerY) * 0.3
    x.set(distX)
    y.set(distY)
  }

  const handleMouseLeave = () => {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x, y, display: 'inline-block' }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="font-sans text-sm text-neutral-500 hover:text-neutral-200 transition-colors duration-300 tracking-wide group flex items-center gap-1"
    >
      {children}
      <ArrowUpRight
        size={12}
        className="opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </motion.a>
  )
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (email) {
      setSent(true)
      setTimeout(() => setSent(false), 3000)
      setEmail('')
    }
  }

  return (
    <footer id="contatti"
      className="sticky bottom-0 z-[-1] bg-[#080808] border-t border-white/5"
      style={{ minHeight: '100vh' }}
    >
      <div className="max-w-7xl mx-auto px-8 pt-24 pb-16 flex flex-col min-h-screen">
        {/* Top section */}
        <div className="grid grid-cols-2 gap-20 mb-auto pb-20">
          {/* Left: brand + form */}
          <div>
            <motion.div
              initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1 }}
            >
              <p className="font-mono text-[10px] tracking-[0.35em] uppercase text-neutral-600 mb-8">
                Inizia il tuo progetto
              </p>
              <h3 className="font-display text-3xl font-light text-neutral-200 mb-6 leading-snug">
                Pronti quando
                <br />
                <span className="text-gradient-gold">lo sei tu.</span>
              </h3>
              <p className="font-sans text-sm text-neutral-600 mb-10 leading-relaxed max-w-xs">
                Lascia la tua email e ti ricontattiamo entro 24 ore con una proposta personalizzata.
              </p>

              {/* Email form */}
              <form onSubmit={handleSubmit} className="relative max-w-sm">
                <div className="flex items-center border-b border-white/10 pb-3 focus-within:border-[#C9A84C]/50 transition-colors duration-400">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="la.tua@email.com"
                    className="flex-1 bg-transparent font-mono text-sm text-neutral-300 placeholder-neutral-700 outline-none tracking-wide"
                  />
                  <motion.button
                    type="submit"
                    whileTap={{ scale: 0.9 }}
                    className="ml-4 text-[#C9A84C] hover:text-[#E8C97A] transition-colors duration-300"
                  >
                    {sent ? (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="font-mono text-xs tracking-widest"
                      >
                        ✓
                      </motion.span>
                    ) : (
                      <Send size={16} strokeWidth={1.5} />
                    )}
                  </motion.button>
                </div>
                <p className="mt-2 font-mono text-[9px] tracking-widest uppercase text-neutral-700">
                  Nessuno spam. Mai.
                </p>
              </form>
            </motion.div>
          </div>

          {/* Right: links */}
          <motion.div
            initial={{ filter: 'blur(16px)', opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', stiffness: 50, damping: 20, mass: 1, delay: 0.15 }}
            className="grid grid-cols-2 gap-12 pt-8"
          >
            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-neutral-700 mb-6">Servizi</p>
              <div className="space-y-4">
                <MagneticLink>Siti Web</MagneticLink>
                <MagneticLink>E-Commerce</MagneticLink>
                <MagneticLink>UI Design</MagneticLink>
                <MagneticLink>Animazioni 3D</MagneticLink>
              </div>
            </div>
            <div>
              <p className="font-mono text-[9px] tracking-[0.35em] uppercase text-neutral-700 mb-6">Contatti</p>
              <div className="space-y-4">
                <MagneticLink>Email</MagneticLink>
                <MagneticLink>Instagram</MagneticLink>
                <MagneticLink>LinkedIn</MagneticLink>
                <MagneticLink>Dribbble</MagneticLink>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Giant wordmark */}
        <div className="relative overflow-hidden mt-8">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <span
              className="block font-display font-light leading-[0.85] select-none"
              style={{
                fontSize: 'clamp(5rem, 16vw, 18rem)',
                background: 'linear-gradient(180deg, rgba(245,245,240,0.07) 0%, rgba(245,245,240,0.02) 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                letterSpacing: '-0.02em',
              }}
            >
              Studio.
            </span>
          </motion.div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-6 border-t border-white/5 flex items-center justify-between">
          <span className="font-mono text-[10px] text-neutral-700 tracking-wide">
            © 2024 Studio. Tutti i diritti riservati.
          </span>
          <div className="flex items-center gap-6">
            <MagneticLink>Privacy</MagneticLink>
            <MagneticLink>Cookie</MagneticLink>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/70 animate-pulse" />
              <span className="font-mono text-[10px] text-neutral-600">Disponibili per nuovi progetti</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
