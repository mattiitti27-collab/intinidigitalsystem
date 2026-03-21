import { useRef, useState, useCallback } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

/* ════════════════════════════════════════════════════════════
   BORDO GRADIENTE ROTANTE — CSS @property + conic-gradient
   ════════════════════════════════════════════════════════════ */
const BORDER_STYLE = `
  @property --ba {
    syntax: '<angle>';
    inherits: false;
    initial-value: 0deg;
  }
  @keyframes spin-border {
    to { --ba: 360deg; }
  }
  .pricing-border-wrap {
    position: relative;
    padding: 1.5px;
    background: conic-gradient(
      from var(--ba),
      rgba(201,169,110,0.08) 0%,
      rgba(232,213,163,0.9) 25%,
      rgba(201,169,110,0.5) 40%,
      rgba(120,80,30,0.2)   55%,
      rgba(180,192,224,0.7) 70%,
      rgba(201,169,110,0.9) 85%,
      rgba(201,169,110,0.08) 100%
    );
    animation: spin-border 5s linear infinite;
    border-radius: 4px;
  }
  .pricing-border-wrap::before {
    content: '';
    position: absolute;
    inset: -8px;
    background: conic-gradient(
      from var(--ba),
      transparent 0%,
      rgba(201,169,110,0.18) 35%,
      rgba(180,192,224,0.25) 60%,
      transparent 100%
    );
    border-radius: 12px;
    z-index: -1;
    filter: blur(16px);
    animation: spin-border 5s linear infinite;
  }
`

/* ── Icona check ─────────────────────────────────────────────── */
const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
    stroke="var(--gold)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
)

/* ── Icona arrow right ───────────────────────────────────────── */
const ArrowRight = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
)

/* ════════════════════════════════════════════════════════════
   PARTICELLE — esplodono dall'origine al mouseEnter del CTA
   ════════════════════════════════════════════════════════════ */
function useParticles() {
  const [particles, setParticles] = useState([])

  const spawnParticles = useCallback((e) => {
    const rect   = e.currentTarget.getBoundingClientRect()
    const originX = e.clientX - rect.left
    const originY = e.clientY - rect.top
    const count   = 16
    const id      = Date.now()

    const newParticles = Array.from({ length: count }, (_, i) => {
      const angle  = (i / count) * Math.PI * 2 + Math.random() * 0.4
      const dist   = 40 + Math.random() * 70
      return {
        id:    `${id}-${i}`,
        x:     originX,
        y:     originY,
        tx:    Math.cos(angle) * dist,
        ty:    Math.sin(angle) * dist,
        size:  2 + Math.random() * 3,
        color: Math.random() > 0.4 ? 'var(--gold)' : 'rgba(245,245,240,0.8)',
        dur:   0.5 + Math.random() * 0.45,
      }
    })
    setParticles(newParticles)
    setTimeout(() => setParticles([]), 900)
  }, [])

  return { particles, spawnParticles }
}

/* ════════════════════════════════════════════════════════════
   FEATURES LIST — feature con checkbox animate
   ════════════════════════════════════════════════════════════ */
const FEATURES = [
  { text: 'Design completamente custom (no template)',    note: '' },
  { text: 'Scena 3D o animazione Hero su misura',         note: '' },
  { text: 'Responsive perfetto su ogni dispositivo',       note: '' },
  { text: 'Performance 90+ su Google PageSpeed',          note: '' },
  { text: 'SEO tecnico e meta tag ottimizzati',           note: '' },
  { text: 'Deploy su CDN globale (Vercel/Netlify)',        note: '' },
  { text: '30 giorni di supporto post-consegna',          note: 'incluso' },
  { text: 'Consegna garantita in 7 giorni lavorativi',    note: 'garantito' },
]

function FeatureItem({ text, note, delay }) {
  return (
    <motion.li
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        display:     'flex',
        alignItems:  'center',
        gap:         '0.75rem',
        padding:     '0.6rem 0',
        borderBottom:'1px solid rgba(255,255,255,0.04)',
        listStyle:   'none',
      }}
    >
      {/* Check box */}
      <span style={{
        flexShrink:  0,
        width:       '22px',
        height:      '22px',
        border:      '1px solid rgba(201,169,110,0.3)',
        background:  'rgba(201,169,110,0.07)',
        display:     'flex',
        alignItems:  'center',
        justifyContent: 'center',
        borderRadius:'2px',
      }}>
        <CheckIcon />
      </span>

      <span style={{
        fontFamily:  'var(--font-sans)',
        fontSize:    '0.84rem',
        color:       'var(--white-dim)',
        flex:        1,
        lineHeight:  1.4,
      }}>
        {text}
      </span>

      {note && (
        <span style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.58rem',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color:         'var(--gold)',
          padding:       '0.15rem 0.45rem',
          border:        '1px solid rgba(201,169,110,0.25)',
          background:    'rgba(201,169,110,0.06)',
          flexShrink:    0,
        }}>
          {note}
        </span>
      )}
    </motion.li>
  )
}

/* ════════════════════════════════════════════════════════════
   CTA BUTTON — il più bello del sito
   ════════════════════════════════════════════════════════════ */
function GlowCTA({ href = '#contatti' }) {
  const { particles, spawnParticles } = useParticles()
  const [hovered, setHovered] = useState(false)

  return (
    <div style={{ position: 'relative', display: 'inline-flex', alignItems: 'center' }}>
      {/* Particelle */}
      <AnimatePresence>
        {particles.map(p => (
          <motion.span
            key={p.id}
            initial={{ opacity: 1, x: p.x, y: p.y, scale: 1 }}
            animate={{ opacity: 0, x: p.x + p.tx, y: p.y + p.ty, scale: 0 }}
            transition={{ duration: p.dur, ease: 'easeOut' }}
            style={{
              position:    'absolute',
              width:       p.size,
              height:      p.size,
              borderRadius:'50%',
              background:  p.color,
              pointerEvents:'none',
              zIndex:      20,
              top:         0,
              left:        0,
              transform:   'translate(-50%,-50%)',
            }}
          />
        ))}
      </AnimatePresence>

      {/* Outer glow ring */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position:     'absolute',
          inset:        '-12px',
          borderRadius: '4px',
          background:   'radial-gradient(ellipse, rgba(201,169,110,0.22) 0%, transparent 70%)',
          pointerEvents:'none',
          zIndex:       0,
        }}
      />

      {/* Button */}
      <motion.a
        href={href}
        onMouseEnter={(e) => { setHovered(true); spawnParticles(e) }}
        onMouseLeave={() => setHovered(false)}
        whileTap={{ scale: 0.97 }}
        style={{
          position:       'relative',
          zIndex:         1,
          display:        'inline-flex',
          alignItems:     'center',
          gap:            '0.85rem',
          fontFamily:     'var(--font-mono)',
          fontSize:       '0.78rem',
          letterSpacing:  '0.2em',
          textTransform:  'uppercase',
          textDecoration: 'none',
          color:          'var(--void)',
          padding:        '1.1rem 2.8rem',
          cursor:         'none',
          overflow:       'hidden',
          borderRadius:   '2px',
          background:     hovered
            ? 'linear-gradient(105deg, #e8d5a3 0%, #c9a96e 40%, #a07840 100%)'
            : 'linear-gradient(105deg, #c9a96e 0%, #a07840 50%, #c9a96e 100%)',
          backgroundSize: '200% 100%',
          transition:     'background 0.4s ease, box-shadow 0.4s ease',
          boxShadow:      hovered
            ? '0 0 48px rgba(201,169,110,0.55), 0 0 100px rgba(201,169,110,0.18), 0 8px 32px rgba(0,0,0,0.6)'
            : '0 4px 24px rgba(201,169,110,0.2), 0 2px 8px rgba(0,0,0,0.4)',
        }}
      >
        {/* Shimmer interno */}
        <motion.span
          animate={{ x: hovered ? '100%' : '-100%' }}
          transition={{ duration: 0.55, ease: 'easeInOut' }}
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
            pointerEvents:'none',
          }}
        />
        <span style={{ position: 'relative', fontWeight: 400 }}>
          Inizia il tuo progetto
        </span>
        <motion.span
          animate={{ x: hovered ? 5 : 0 }}
          transition={{ duration: 0.25 }}
          style={{ position: 'relative', display: 'flex' }}
        >
          <ArrowRight />
        </motion.span>
      </motion.a>
    </div>
  )
}

/* ════════════════════════════════════════════════════════════
   PRICING — Export principale
   ════════════════════════════════════════════════════════════ */
export default function Pricing() {
  const cardRef  = useRef(null)
  const inView   = useInView(cardRef, { once: true, margin: '-100px' })

  return (
    <section
      id="pricing"
      style={{
        position:       'relative',
        padding:        'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
        display:        'flex',
        flexDirection:  'column',
        alignItems:     'center',
        overflow:       'hidden',
      }}
    >
      {/* Inject stili border animato */}
      <style>{BORDER_STYLE}</style>

      {/* ── Sfondo atmosferico sezione ─────────────────────── */}
      <div aria-hidden="true" style={{
        position:    'absolute',
        inset:       0,
        background:  `
          radial-gradient(ellipse 60% 50% at 50% 60%, rgba(60,20,120,0.18) 0%, transparent 65%),
          radial-gradient(ellipse 40% 40% at 50% 30%, rgba(201,169,110,0.07) 0%, transparent 60%)
        `,
        pointerEvents:'none',
        zIndex:      0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, width: '100%', maxWidth: '760px' }}>

        {/* ── Header sezione ──────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', marginBottom: 'clamp(2.5rem, 5vw, 4rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '28px', height: '1px', background: 'var(--gold)' }} />
            <span className="label">Investimento</span>
            <div style={{ width: '28px', height: '1px', background: 'var(--gold)' }} />
          </div>
          <h2 style={{
            fontFamily:    'var(--font-display)',
            fontWeight:    300,
            fontSize:      'clamp(2.2rem, 5vw, 4rem)',
            lineHeight:    1.05,
            letterSpacing: '-0.025em',
            color:         'var(--white)',
          }}>
            Un prezzo onesto.<br />
            <span style={{ color: 'var(--gold)' }}>Un risultato straordinario.</span>
          </h2>
        </motion.div>

        {/* ════════════════════════════════════════════════
            CARD PRICING con bordo animato
            ════════════════════════════════════════════════ */}
        <motion.div
          ref={cardRef}
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Wrapper bordo rotante */}
          <div className="pricing-border-wrap">
            <div style={{
              background:          'rgba(10,9,12,0.96)',
              backdropFilter:      'blur(40px)',
              WebkitBackdropFilter:'blur(40px)',
              borderRadius:        '3px',
              padding:             'clamp(2rem, 4vw, 3.5rem)',
              boxShadow:           `
                0 0 60px rgba(80, 20, 180, 0.18),
                0 0 120px rgba(201,169,110,0.08),
                0 40px 80px rgba(0,0,0,0.7),
                inset 0 1px 0 rgba(255,255,255,0.05)
              `,
            }}>

              {/* ── Top bar: badge + prezzo ──────────────── */}
              <div style={{
                display:        'flex',
                alignItems:     'flex-start',
                justifyContent: 'space-between',
                flexWrap:       'wrap',
                gap:            '1.5rem',
                marginBottom:   'clamp(1.5rem, 3vw, 2.5rem)',
                paddingBottom:  'clamp(1.5rem, 3vw, 2.5rem)',
                borderBottom:   '1px solid rgba(255,255,255,0.06)',
              }}>
                {/* Titolo pacchetto */}
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.75rem' }}>
                    <span style={{
                      fontFamily:    'var(--font-mono)',
                      fontSize:      '0.6rem',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase',
                      color:         'var(--void)',
                      background:    'var(--gold)',
                      padding:       '0.2rem 0.6rem',
                      borderRadius:  '1px',
                    }}>
                      Più richiesto
                    </span>
                  </div>
                  <h3 style={{
                    fontFamily:    'var(--font-display)',
                    fontStyle:     'italic',
                    fontWeight:    300,
                    fontSize:      'clamp(1.6rem, 3.5vw, 2.6rem)',
                    color:         'var(--white)',
                    lineHeight:    1,
                    letterSpacing: '-0.02em',
                  }}>
                    Pacchetto Élite
                  </h3>
                  <p style={{
                    fontFamily: 'var(--font-sans)',
                    fontSize:   '0.8rem',
                    color:      'var(--white-dim)',
                    marginTop:  '0.5rem',
                    lineHeight: 1.5,
                  }}>
                    Sito web premium, animazioni 3D, deploy incluso.
                  </p>
                </div>

                {/* Prezzo */}
                <div style={{ textAlign: 'right' }}>
                  <div style={{ display: 'flex', alignItems: 'baseline', gap: '0.2rem', justifyContent: 'flex-end' }}>
                    <span style={{
                      fontFamily:  'var(--font-mono)',
                      fontSize:    '0.9rem',
                      color:       'var(--gold)',
                      alignSelf:   'flex-start',
                      marginTop:   '0.5rem',
                    }}>€</span>
                    <motion.span
                      initial={{ opacity: 0, y: 20 }}
                      animate={inView ? { opacity: 1, y: 0 } : {}}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                      style={{
                        fontFamily:    'var(--font-display)',
                        fontWeight:    300,
                        fontSize:      'clamp(3.5rem, 8vw, 6rem)',
                        color:         'var(--white)',
                        lineHeight:    1,
                        letterSpacing: '-0.03em',
                      }}
                    >
                      349
                    </motion.span>
                  </div>
                  <div style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.62rem',
                    letterSpacing: '0.12em',
                    color:         'var(--white-dim)',
                    textTransform: 'uppercase',
                    marginTop:     '0.3rem',
                  }}>
                    pagamento unico
                  </div>
                  {/* Valore percepito barrato */}
                  <div style={{
                    fontFamily:      'var(--font-mono)',
                    fontSize:        '0.7rem',
                    color:           'rgba(245,245,240,0.25)',
                    textDecoration:  'line-through',
                    marginTop:       '0.25rem',
                  }}>
                    Valore di mercato: €1.800+
                  </div>
                </div>
              </div>

              {/* ── Features list ────────────────────────── */}
              <ul style={{ margin: 0, padding: 0, marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)' }}>
                {inView && FEATURES.map((f, i) => (
                  <FeatureItem key={i} text={f.text} note={f.note} delay={i * 0.07} />
                ))}
              </ul>

              {/* ── Note opzionali ────────────────────────── */}
              <div style={{
                display:     'flex',
                gap:         '0.6rem',
                flexWrap:    'wrap',
                marginBottom:'clamp(2rem, 4vw, 3rem)',
              }}>
                {['E-commerce +€150', 'Blog CMS +€80', 'Multilingua +€120'].map(addon => (
                  <span key={addon} style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.65rem',
                    letterSpacing: '0.1em',
                    color:         'var(--white-dim)',
                    padding:       '0.3rem 0.7rem',
                    border:        '1px solid rgba(255,255,255,0.07)',
                    background:    'rgba(255,255,255,0.02)',
                    borderRadius:  '1px',
                  }}>
                    {addon}
                  </span>
                ))}
              </div>

              {/* ── CTA ──────────────────────────────────── */}
              <div style={{
                display:        'flex',
                flexDirection:  'column',
                alignItems:     'center',
                gap:            '1rem',
              }}>
                <GlowCTA href="#contatti" />
                <span style={{
                  fontFamily:  'var(--font-mono)',
                  fontSize:    '0.62rem',
                  letterSpacing:'0.12em',
                  textTransform:'uppercase',
                  color:       'var(--white-dim)',
                  opacity:     0.5,
                }}>
                  Nessuna sorpresa. Preventivo gratuito in 24h.
                </span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── Garanzia sotto la card ──────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          style={{
            marginTop:      'clamp(2rem, 4vw, 3rem)',
            display:        'flex',
            justifyContent: 'center',
            gap:            'clamp(1.5rem, 4vw, 3.5rem)',
            flexWrap:       'wrap',
          }}
        >
          {[
            ['🔒', 'Pagamento sicuro'],
            ['↺',  'Revisioni illimitate'],
            ['✦',  'Garanzia 30 giorni'],
          ].map(([icon, label]) => (
            <div key={label} style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '0.5rem',
            }}>
              <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>{icon}</span>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.65rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         'var(--white-dim)',
              }}>
                {label}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
