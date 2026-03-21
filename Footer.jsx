import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/* ════════════════════════════════════════════════════════════
   MAGNETIC LINK — effetto attrazione al hover
   ════════════════════════════════════════════════════════════ */
function MagneticLink({ children, href, external = false }) {
  const rawX    = useMotionValue(0)
  const rawY    = useMotionValue(0)
  const x       = useSpring(rawX, { damping: 18, stiffness: 220, mass: 0.5 })
  const y       = useSpring(rawY, { damping: 18, stiffness: 220, mass: 0.5 })
  const ref     = useRef(null)
  const [active, setActive] = useState(false)

  const onMove = useCallback((e) => {
    const el   = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx   = ((e.clientX - rect.left) / rect.width  - 0.5) * 2
    const ny   = ((e.clientY - rect.top)  / rect.height - 0.5) * 2
    rawX.set(nx * 10)
    rawY.set(ny * 10)
  }, [rawX, rawY])

  const onLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
    setActive(false)
  }, [rawX, rawY])

  return (
    <motion.a
      ref={ref}
      href={href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noopener noreferrer' : undefined}
      onMouseMove={onMove}
      onMouseEnter={() => setActive(true)}
      onMouseLeave={onLeave}
      style={{
        x,
        y,
        display:        'inline-block',
        fontFamily:     'var(--font-mono)',
        fontSize:       '0.68rem',
        letterSpacing:  '0.18em',
        textTransform:  'uppercase',
        textDecoration: 'none',
        color:          active ? 'var(--white)' : 'var(--white-dim)',
        transition:     'color 0.2s ease',
        cursor:         'none',
      }}
      data-cursor-hover
    >
      {children}
    </motion.a>
  )
}

/* ════════════════════════════════════════════════════════════
   EMAIL FORM — input + submit in stile terminale di lusso
   ════════════════════════════════════════════════════════════ */
function EmailForm() {
  const [email,   setEmail]   = useState('')
  const [focused, setFocused] = useState(false)
  const [sent,    setSent]    = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = useCallback((e) => {
    e.preventDefault()
    if (!email || loading || sent) return
    setLoading(true)
    setTimeout(() => { setLoading(false); setSent(true) }, 1200)
  }, [email, loading, sent])

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
      style={{
        display:        'flex',
        alignItems:     'stretch',
        maxWidth:       '520px',
        width:          '100%',
        position:       'relative',
      }}
    >
      {/* Glow container */}
      <div style={{
        position:     'absolute',
        inset:        '-1px',
        background:   focused
          ? 'linear-gradient(90deg, rgba(201,169,110,0.5), rgba(180,192,224,0.3), rgba(201,169,110,0.5))'
          : 'linear-gradient(90deg, rgba(255,255,255,0.08), rgba(255,255,255,0.04))',
        borderRadius: '2px',
        pointerEvents:'none',
        transition:   'background 0.4s ease',
        zIndex:       0,
      }} />

      {/* Input area */}
      <div style={{
        position:   'relative',
        flex:       1,
        zIndex:     1,
        background: 'rgba(8,8,8,0.9)',
        display:    'flex',
        alignItems: 'center',
        padding:    '0 1.2rem',
        gap:        '0.6rem',
        borderRight:'none',
      }}>
        {/* Prompt symbol */}
        <span style={{
          fontFamily:  'var(--font-mono)',
          fontSize:    '0.75rem',
          color:       'var(--gold)',
          opacity:     focused ? 1 : 0.4,
          transition:  'opacity 0.3s ease',
          flexShrink:  0,
          userSelect:  'none',
        }}>
          {sent ? '✓' : '›'}
        </span>

        {sent ? (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{
              fontFamily:  'var(--font-mono)',
              fontSize:    '0.75rem',
              color:       'var(--gold)',
              letterSpacing:'0.1em',
            }}
          >
            Messaggio ricevuto. Ti rispondo entro 24h.
          </motion.span>
        ) : (
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            placeholder="la.tua@email.com"
            required
            style={{
              flex:          1,
              background:    'transparent',
              border:        'none',
              outline:       'none',
              fontFamily:    'var(--font-mono)',
              fontSize:      '0.78rem',
              letterSpacing: '0.06em',
              color:         'var(--white)',
              padding:       '1rem 0',
              cursor:        'none',
            }}
          />
        )}
      </div>

      {/* Submit button */}
      {!sent && (
        <motion.button
          type="submit"
          whileHover={{ background: 'var(--gold-light)' }}
          whileTap={{ scale: 0.97 }}
          style={{
            position:      'relative',
            zIndex:        1,
            flexShrink:    0,
            background:    'var(--gold)',
            border:        'none',
            padding:       '0 1.6rem',
            fontFamily:    'var(--font-mono)',
            fontSize:      '0.68rem',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color:         'var(--void)',
            cursor:        'none',
            transition:    'background 0.2s ease',
            display:       'flex',
            alignItems:    'center',
            gap:           '0.5rem',
          }}
        >
          {loading ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              style={{ display: 'block', width: '12px', height: '12px', border: '1.5px solid var(--void)', borderTopColor: 'transparent', borderRadius: '50%' }}
            />
          ) : 'Invia'}
        </motion.button>
      )}
    </motion.form>
  )
}

/* ════════════════════════════════════════════════════════════
   FOOTER — Export principale
   Il footer vive in `position: fixed; bottom: 0; z-index: 0`
   Il main content ha z-index: 1 e un padding-bottom = altezza footer
   così viene "svelato" dallo scroll.
   ════════════════════════════════════════════════════════════ */
export default function Footer() {
  const year = new Date().getFullYear()

  const SOCIAL = [
    { label: 'Instagram', href: '#' },
    { label: 'LinkedIn',  href: '#' },
    { label: 'Behance',   href: '#' },
    { label: 'GitHub',    href: '#' },
  ]

  const NAV = [
    { label: 'Lavori',    href: '#lavori' },
    { label: 'Servizi',   href: '#servizi' },
    { label: 'Processo',  href: '#processo' },
    { label: 'Pricing',   href: '#pricing' },
  ]

  return (
    <footer
      id="contatti"
      style={{
        /* ── REVEAL EFFECT ──
           Fixed in basso con z-index: 0 → il main lo copre.
           Man mano che si scrolla fino alla fine del main,
           il footer emerge da sotto. */
        position:        'fixed',
        bottom:          0,
        left:            0,
        right:           0,
        zIndex:          0,
        minHeight:       '100vh',
        background:      'var(--void)',
        display:         'flex',
        flexDirection:   'column',
        justifyContent:  'space-between',
        overflow:        'hidden',
        padding:         'clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem) clamp(1.5rem, 3vw, 2.5rem)',
      }}
    >
      {/* ── Glow decorativo ─────────────────────────────── */}
      <div aria-hidden="true" style={{
        position:     'absolute',
        inset:        0,
        background:   `
          radial-gradient(ellipse 55% 40% at 50% 100%, rgba(201,169,110,0.08) 0%, transparent 65%),
          radial-gradient(ellipse 30% 30% at 20% 50%, rgba(26,26,74,0.25) 0%, transparent 60%)
        `,
        pointerEvents:'none',
        zIndex:       0,
      }} />

      {/* ── Noise texture (stessa del body ma più intensa) ── */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        inset:         0,
        opacity:       0.025,
        backgroundImage:"url(\"data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
        backgroundSize:'256px 256px',
        pointerEvents: 'none',
        zIndex:        0,
      }} />

      {/* ── Top: nav + social ────────────────────────────── */}
      <div style={{
        position:       'relative',
        zIndex:         1,
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'flex-start',
        flexWrap:       'wrap',
        gap:            '1.5rem',
      }}>
        {/* Wordmark */}
        <div style={{
          fontFamily:    'var(--font-display)',
          fontSize:      '1.1rem',
          fontWeight:    300,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color:         'var(--white)',
        }}>
          Studio<span style={{ color: 'var(--gold)', marginLeft: '0.2em' }}>·</span>
        </div>

        {/* Nav links */}
        <nav style={{ display: 'flex', gap: 'clamp(1.5rem, 3vw, 2.5rem)', flexWrap: 'wrap' }}>
          {NAV.map(({ label, href }) => (
            <MagneticLink key={label} href={href}>{label}</MagneticLink>
          ))}
        </nav>
      </div>

      {/* ── Centro: scritta gigante + form ──────────────── */}
      <div style={{ position: 'relative', zIndex: 1 }}>
        {/* Scritta monumentale */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            marginBottom: 'clamp(2rem, 5vw, 4rem)',
            overflow:     'hidden',
          }}
        >
          {/* Label sopra */}
          <div style={{
            display:     'flex',
            alignItems:  'center',
            gap:         '0.75rem',
            marginBottom:'1rem',
          }}>
            <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
            <span className="label">Pronto a costruire qualcosa di straordinario?</span>
          </div>

          {/* Testo enorme */}
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    300,
            fontStyle:     'italic',
            fontSize:      'clamp(4rem, 14vw, 14rem)',
            lineHeight:    0.88,
            letterSpacing: '-0.04em',
            color:         'var(--white)',
            margin:        0,
          }}>
            Iniziamo
            <span style={{ color: 'var(--gold)' }}>.</span>
          </h2>
        </motion.div>

        {/* Form + descrizione */}
        <div style={{
          display:   'flex',
          flexWrap:  'wrap',
          alignItems:'flex-end',
          gap:       'clamp(2rem, 4vw, 4rem)',
        }}>
          <div>
            <p style={{
              fontFamily:   'var(--font-sans)',
              fontSize:     '0.85rem',
              lineHeight:   1.7,
              color:        'var(--white-dim)',
              maxWidth:     '34ch',
              marginBottom: '1.5rem',
            }}>
              Inserisci la tua email e ti contatterò entro 24 ore con un
              preventivo gratuito e personalizzato.
            </p>
            <EmailForm />
          </div>

          {/* Contatto diretto */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <span className="label" style={{ opacity: 0.35, marginBottom: '0.25rem' }}>
              Contatto diretto
            </span>
            <a
              href="mailto:ciao@studio-elite.it"
              style={{
                fontFamily:    'var(--font-display)',
                fontStyle:     'italic',
                fontSize:      'clamp(1.1rem, 2.5vw, 1.6rem)',
                fontWeight:    300,
                color:         'var(--gold)',
                textDecoration:'none',
                letterSpacing: '-0.01em',
                transition:    'color 0.2s ease',
              }}
              onMouseEnter={e => (e.target.style.color = 'var(--gold-light)')}
              onMouseLeave={e => (e.target.style.color = 'var(--gold)')}
            >
              ciao@studio-elite.it
            </a>
            <a
              href="https://wa.me/39123456789"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.72rem',
                letterSpacing: '0.1em',
                color:         'var(--white-dim)',
                textDecoration:'none',
                transition:    'color 0.2s ease',
              }}
              onMouseEnter={e => (e.target.style.color = 'var(--white)')}
              onMouseLeave={e => (e.target.style.color = 'var(--white-dim)')}
            >
              WhatsApp disponibile →
            </a>
          </div>
        </div>
      </div>

      {/* ── Bottom bar: social + copyright ──────────────── */}
      <div style={{
        position:       'relative',
        zIndex:         1,
        display:        'flex',
        justifyContent: 'space-between',
        alignItems:     'center',
        flexWrap:       'wrap',
        gap:            '1rem',
        paddingTop:     'clamp(1.5rem, 3vw, 2rem)',
        borderTop:      '1px solid var(--void-border)',
      }}>
        {/* Social links */}
        <div style={{ display: 'flex', gap: 'clamp(1.2rem, 2.5vw, 2rem)', flexWrap: 'wrap' }}>
          {SOCIAL.map(({ label, href }) => (
            <MagneticLink key={label} href={href} external>{label}</MagneticLink>
          ))}
        </div>

        {/* Copyright */}
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.15em',
          textTransform: 'uppercase',
          color:         'rgba(245,245,240,0.2)',
        }}>
          © {year} Studio — Web Design d'Élite. Tutti i diritti riservati.
        </span>
      </div>
    </footer>
  )
}
