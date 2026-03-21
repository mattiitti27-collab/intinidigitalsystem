import { useRef, useState, useCallback } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/* ════════════════════════════════════════════════════════════
   ICONE SVG INLINE — minimaliste, stroke-only, no fill
   ════════════════════════════════════════════════════════════ */
const Icon = {
  Cube: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
      <polyline points="3.29 7 12 12 20.71 7"/><line x1="12" y1="22" x2="12" y2="12"/>
    </svg>
  ),
  Zap: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
    </svg>
  ),
  TrendingUp: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"/><polyline points="17 6 23 6 23 12"/>
    </svg>
  ),
  Layers: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2"/><polyline points="2 17 12 22 22 17"/><polyline points="2 12 12 17 22 12"/>
    </svg>
  ),
  Code: () => (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 18 22 12 16 6"/><polyline points="8 6 2 12 8 18"/>
    </svg>
  ),
}

/* ── Micro-pattern SVG: griglia di punti ─────────────────────── */
const DotGridPattern = ({ opacity = 0.12, color = 'currentColor' }) => (
  <svg
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
    aria-hidden="true"
  >
    <defs>
      <pattern id="dot-grid" x="0" y="0" width="24" height="24" patternUnits="userSpaceOnUse">
        <circle cx="1" cy="1" r="1" fill={color} opacity={opacity} />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#dot-grid)" />
  </svg>
)

/* ── Micro-pattern: linee diagonali ──────────────────────────── */
const DiagLinesPattern = ({ opacity = 0.06 }) => (
  <svg
    style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'hidden' }}
    aria-hidden="true"
  >
    <defs>
      <pattern id="diag" x="0" y="0" width="12" height="12" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
        <line x1="0" y1="0" x2="0" y2="12" stroke="rgba(201,169,110,0.18)" strokeWidth="0.5" />
      </pattern>
    </defs>
    <rect width="100%" height="100%" fill="url(#diag)" />
  </svg>
)

/* ── Illustrazione interna: grafico performance ──────────────── */
const PerfChart = () => (
  <div style={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem', display: 'flex', alignItems: 'flex-end', gap: '5px', height: '52px' }}>
    {[38, 55, 44, 70, 60, 88, 76, 100].map((h, i) => (
      <motion.div
        key={i}
        initial={{ height: 0, opacity: 0 }}
        whileInView={{ height: `${h}%`, opacity: 1 }}
        transition={{ delay: 0.1 * i, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        style={{
          width:        '6px',
          background:   i === 7
            ? 'var(--gold)'
            : `rgba(201,169,110,${0.15 + i * 0.07})`,
          borderRadius: '2px 2px 0 0',
          alignSelf:    'flex-end',
        }}
      />
    ))}
  </div>
)

/* ── Illustrazione interna: funnel conversione ───────────────── */
const FunnelViz = () => (
  <svg
    viewBox="0 0 120 90"
    style={{ position: 'absolute', bottom: '1rem', right: '1rem', width: '100px', opacity: 0.5 }}
    aria-hidden="true"
  >
    {[
      { w: 100, y: 0,  label: '100%', c: 'rgba(201,169,110,0.7)' },
      { w: 74,  y: 22, label: '74%',  c: 'rgba(201,169,110,0.5)' },
      { w: 50,  y: 44, label: '50%',  c: 'rgba(201,169,110,0.35)' },
      { w: 28,  y: 66, label: '28%',  c: 'rgba(201,169,110,0.2)' },
    ].map(({ w, y, c }, i) => (
      <motion.rect
        key={i}
        x={(100 - w) / 2} y={y} width={w} height={16} rx="3"
        fill={c}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        transition={{ delay: 0.12 * i, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        style={{ transformOrigin: '50px center' }}
      />
    ))}
  </svg>
)

/* ── Illustrazione: orbit rings (3D / WebGL) ─────────────────── */
const OrbitRings = () => (
  <svg
    viewBox="0 0 140 140"
    style={{ position: 'absolute', bottom: '-10px', right: '-10px', width: '160px', opacity: 0.18 }}
    aria-hidden="true"
  >
    <ellipse cx="70" cy="70" rx="65" ry="28" fill="none" stroke="var(--gold)" strokeWidth="0.8" />
    <ellipse cx="70" cy="70" rx="65" ry="28" fill="none" stroke="var(--gold)" strokeWidth="0.8"
      transform="rotate(60 70 70)" />
    <ellipse cx="70" cy="70" rx="65" ry="28" fill="none" stroke="var(--gold)" strokeWidth="0.8"
      transform="rotate(120 70 70)" />
    <circle cx="70" cy="70" r="12" fill="rgba(201,169,110,0.15)" stroke="var(--gold)" strokeWidth="0.8" />
    <circle cx="70" cy="42" r="4" fill="var(--gold)" opacity="0.7" />
  </svg>
)

/* ── Illustrazione: motion path (animazioni) ─────────────────── */
const MotionPath = () => (
  <svg
    viewBox="0 0 160 80"
    style={{ position: 'absolute', bottom: '1.2rem', left: '1.5rem', right: '1.5rem', height: '48px', opacity: 0.35 }}
    aria-hidden="true"
  >
    <motion.path
      d="M 8 60 C 30 60, 40 20, 80 20 S 130 60, 152 20"
      fill="none" stroke="var(--gold)" strokeWidth="1"
      strokeDasharray="200"
      initial={{ strokeDashoffset: 200 }}
      whileInView={{ strokeDashoffset: 0 }}
      transition={{ duration: 1.4, ease: 'easeInOut', delay: 0.3 }}
    />
    <motion.circle
      cx="8" cy="60" r="3.5" fill="var(--gold)"
      initial={{ offsetDistance: '0%' }}
      style={{ offsetPath: "path('M 8 60 C 30 60, 40 20, 80 20 S 130 60, 152 20')" }}
    />
  </svg>
)

/* ── Illustrazione: stack di layer (stack tech) ─────────────── */
const LayerStack = () => (
  <div style={{ position: 'absolute', bottom: '1.2rem', right: '1.5rem', display: 'flex', flexDirection: 'column', gap: '4px' }}>
    {['React', 'Three.js', 'GSAP', 'Vite'].map((l, i) => (
      <motion.div
        key={l}
        initial={{ x: 20, opacity: 0 }}
        whileInView={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.08 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.6rem',
          letterSpacing: '0.1em',
          color:         'var(--gold)',
          opacity:       0.9 - i * 0.15,
          textAlign:     'right',
        }}
      >
        {l}
      </motion.div>
    ))}
  </div>
)

/* ════════════════════════════════════════════════════════════
   HOOK: useTilt — gestione tilt 3D + glow per singola card
   ════════════════════════════════════════════════════════════ */
function useTilt({ maxTilt = 14, glowOpacity = 0.18 } = {}) {
  const ref        = useRef(null)
  const [glow, setGlow] = useState({ x: 50, y: 50, opacity: 0 })

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springCfg = { damping: 22, stiffness: 300, mass: 0.5 }
  const rotateX = useSpring(rawY, springCfg)   // mouse Y → inclina sull'asse X
  const rotateY = useSpring(rawX, springCfg)   // mouse X → inclina sull'asse Y

  const onMouseMove = useCallback((e) => {
    const el   = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const nx   = ((e.clientX - rect.left) / rect.width  - 0.5) * 2   // -1..1
    const ny   = ((e.clientY - rect.top)  / rect.height - 0.5) * 2   // -1..1

    rawX.set(nx * maxTilt)
    rawY.set(-ny * maxTilt)

    // posizione glow in % relativo alla card
    const px = ((e.clientX - rect.left) / rect.width)  * 100
    const py = ((e.clientY - rect.top)  / rect.height) * 100
    setGlow({ x: px, y: py, opacity: glowOpacity })
  }, [maxTilt, glowOpacity, rawX, rawY])

  const onMouseLeave = useCallback(() => {
    rawX.set(0)
    rawY.set(0)
    setGlow(g => ({ ...g, opacity: 0 }))
  }, [rawX, rawY])

  return { ref, rotateX, rotateY, glow, onMouseMove, onMouseLeave }
}

/* ════════════════════════════════════════════════════════════
   BentoCard — card singola con tilt, glow, pattern
   ════════════════════════════════════════════════════════════ */
function BentoCard({
  icon: IconComp,
  label,
  title,
  description,
  accent = 'rgba(201,169,110,',
  pattern  = 'dots',
  children,
  style    = {},
  maxTilt  = 12,
  glowColor = 'rgba(201, 169, 110,',
  delay    = 0,
}) {
  const { ref, rotateX, rotateY, glow, onMouseMove, onMouseLeave } =
    useTilt({ maxTilt, glowOpacity: 0.16 })

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay }}
      style={{
        perspective: '1200px',
        ...style,
      }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle:  'preserve-3d',
          height:          '100%',
          position:        'relative',
          borderRadius:    '2px',
          /* Glassmorphism */
          background:      'rgba(255, 255, 255, 0.03)',
          border:          '1px solid rgba(255, 255, 255, 0.07)',
          backdropFilter:  'blur(24px) saturate(120%)',
          WebkitBackdropFilter: 'blur(24px) saturate(120%)',
          overflow:        'hidden',
          cursor:          'default',
          willChange:      'transform',
        }}
        whileHover={{ scale: 1.008 }}
        transition={{ scale: { duration: 0.3, ease: [0.16, 1, 0.3, 1] } }}
      >
        {/* Pattern di sfondo */}
        {pattern === 'dots'  && <DotGridPattern color="rgba(245,245,240,1)" opacity={0.09} />}
        {pattern === 'diag'  && <DiagLinesPattern />}
        {pattern === 'none'  && null}

        {/* Glow che segue il cursore */}
        <div
          aria-hidden="true"
          style={{
            position:     'absolute',
            inset:        0,
            pointerEvents:'none',
            zIndex:       1,
            background:   `radial-gradient(circle 220px at ${glow.x}% ${glow.y}%, ${glowColor}${glow.opacity}), transparent)`,
            transition:   'opacity 0.35s ease',
          }}
        />

        {/* Bordo glow sottile al top */}
        <div
          aria-hidden="true"
          style={{
            position:     'absolute',
            top:          0,
            left:         '15%',
            right:        '15%',
            height:       '1px',
            background:   `linear-gradient(90deg, transparent, ${glowColor}0.4), transparent)`,
            zIndex:       2,
          }}
        />

        {/* Contenuto */}
        <div
          style={{
            position:  'relative',
            zIndex:    3,
            height:    '100%',
            padding:   'clamp(1.4rem, 2.5vw, 2rem)',
            display:   'flex',
            flexDirection: 'column',
            gap:       '0.75rem',
          }}
        >
          {/* Header: icona + label */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div
              style={{
                color:        'var(--gold)',
                padding:      '0.5rem',
                background:   'rgba(201,169,110,0.08)',
                border:       '1px solid rgba(201,169,110,0.15)',
                borderRadius: '2px',
                display:      'flex',
                alignItems:   'center',
              }}
            >
              <IconComp />
            </div>
            <span
              className="label"
              style={{ opacity: 0.35, fontSize: '0.6rem' }}
            >
              {label}
            </span>
          </div>

          {/* Titolo */}
          <h3
            style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    300,
              fontSize:      'clamp(1.3rem, 2.2vw, 1.9rem)',
              lineHeight:    1.1,
              letterSpacing: '-0.02em',
              color:         'var(--white)',
              marginTop:     '0.25rem',
            }}
          >
            {title}
          </h3>

          {/* Descrizione */}
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize:   '0.82rem',
              lineHeight: 1.65,
              color:      'var(--white-dim)',
              maxWidth:   '32ch',
              flexShrink: 0,
            }}
          >
            {description}
          </p>

          {/* Spazio flessibile per illustrazione */}
          <div style={{ flex: 1, position: 'relative', minHeight: '3rem' }}>
            {children}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   CARD FEATURED: "Design WebGL" — doppia altezza, più ricca
   ════════════════════════════════════════════════════════════ */
function FeaturedCard({ delay = 0 }) {
  const { ref, rotateX, rotateY, glow, onMouseMove, onMouseLeave } =
    useTilt({ maxTilt: 8, glowOpacity: 0.22 })

  const stats = [
    { val: '60fps',  desc: 'Animazioni fluide' },
    { val: 'WebGL2', desc: 'Rendering avanzato' },
    { val: '< 2s',   desc: 'Time to interactive' },
  ]

  return (
    <motion.div
      initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
      whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay }}
      style={{ perspective: '1200px', gridRow: 'span 2' }}
    >
      <motion.div
        ref={ref}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: 'preserve-3d',
          height:         '100%',
          position:       'relative',
          borderRadius:   '2px',
          background:     'rgba(255,255,255,0.035)',
          border:         '1px solid rgba(255,255,255,0.09)',
          backdropFilter: 'blur(24px) saturate(130%)',
          WebkitBackdropFilter: 'blur(24px) saturate(130%)',
          overflow:       'hidden',
          willChange:     'transform',
        }}
        whileHover={{ scale: 1.006 }}
        transition={{ scale: { duration: 0.4 } }}
      >
        {/* Pattern punti */}
        <DotGridPattern color="rgba(245,245,240,1)" opacity={0.07} />

        {/* Glow angolo in alto a destra — colore indigo/blu */}
        <div aria-hidden="true" style={{
          position:    'absolute',
          top:         '-60px',
          right:       '-60px',
          width:       '280px',
          height:      '280px',
          borderRadius:'50%',
          background:  'radial-gradient(circle, rgba(40,40,120,0.35) 0%, transparent 70%)',
          pointerEvents:'none',
          zIndex:      1,
        }} />

        {/* Glow cursore */}
        <div aria-hidden="true" style={{
          position:     'absolute',
          inset:        0,
          pointerEvents:'none',
          zIndex:       1,
          background:   `radial-gradient(circle 280px at ${glow.x}% ${glow.y}%, rgba(201,169,110,${glow.opacity}), transparent)`,
          transition:   'opacity 0.35s ease',
        }} />

        {/* Bordo top glow */}
        <div aria-hidden="true" style={{
          position:   'absolute', top: 0, left: '10%', right: '10%', height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(201,169,110,0.5), transparent)',
          zIndex:     2,
        }} />

        {/* Orbit rings decorative */}
        <OrbitRings />

        {/* Contenuto */}
        <div style={{
          position:      'relative',
          zIndex:        3,
          height:        '100%',
          padding:       'clamp(1.6rem, 2.8vw, 2.4rem)',
          display:       'flex',
          flexDirection: 'column',
          gap:           '1rem',
        }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{
              color: 'var(--gold)', padding: '0.5rem',
              background: 'rgba(201,169,110,0.08)',
              border: '1px solid rgba(201,169,110,0.15)',
              borderRadius: '2px', display: 'flex', alignItems: 'center',
            }}>
              <Icon.Cube />
            </div>
            <span className="label" style={{ opacity: 0.35, fontSize: '0.6rem' }}>Servizio Flagship</span>
          </div>

          {/* Titolo grande */}
          <div>
            <h3 style={{
              fontFamily:    'var(--font-display)',
              fontStyle:     'italic',
              fontWeight:    300,
              fontSize:      'clamp(1.8rem, 3vw, 2.8rem)',
              lineHeight:    1.05,
              letterSpacing: '-0.025em',
              color:         'var(--white)',
              marginBottom:  '0.75rem',
            }}>
              Design<br />
              <span style={{ color: 'var(--gold)' }}>WebGL</span>
            </h3>
            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize:   '0.83rem',
              lineHeight: 1.7,
              color:      'var(--white-dim)',
              maxWidth:   '30ch',
            }}>
              Esperienze tridimensionali in-browser con React Three Fiber,
              shader GLSL custom e fisica realistica. Il tuo brand nella
              terza dimensione.
            </p>
          </div>

          {/* Stats */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginTop: 'auto' }}>
            {stats.map(({ val, desc }, i) => (
              <motion.div
                key={val}
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
                style={{
                  display:     'flex',
                  alignItems:  'center',
                  gap:         '0.75rem',
                  padding:     '0.55rem 0.8rem',
                  background:  'rgba(255,255,255,0.03)',
                  border:      '1px solid rgba(255,255,255,0.06)',
                  borderRadius:'2px',
                }}
              >
                <span style={{
                  fontFamily:    'var(--font-mono)',
                  fontSize:      '0.72rem',
                  color:         'var(--gold)',
                  letterSpacing: '0.05em',
                  minWidth:      '52px',
                }}>{val}</span>
                <span style={{ width: '1px', height: '14px', background: 'var(--void-border)' }} />
                <span style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize:   '0.75rem',
                  color:      'var(--white-dim)',
                }}>{desc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   SERVICES — Export principale
   ════════════════════════════════════════════════════════════ */
export default function Services() {
  return (
    <section
      id="servizi"
      style={{
        position:   'relative',
        padding:    'clamp(5rem, 10vw, 9rem) clamp(1.5rem, 5vw, 4rem)',
        overflow:   'hidden',
      }}
    >
      {/* ── Sfondo atmosferico ────────────────────────────── */}
      <div aria-hidden="true" style={{
        position:    'absolute',
        inset:       0,
        background:  `
          radial-gradient(ellipse 50% 60% at 80% 20%, rgba(26,26,74,0.25) 0%, transparent 70%),
          radial-gradient(ellipse 40% 50% at 10% 80%, rgba(201,169,110,0.07) 0%, transparent 70%)
        `,
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1300px', margin: '0 auto' }}>

        {/* ── Header sezione ────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 'clamp(3rem, 6vw, 5rem)' }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
            <div style={{ width: '28px', height: '1px', background: 'var(--gold)' }} />
            <span className="label">Cosa facciamo</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
            <h2 style={{
              fontFamily:    'var(--font-display)',
              fontWeight:    300,
              fontSize:      'clamp(2.2rem, 5vw, 4.5rem)',
              lineHeight:    1.05,
              letterSpacing: '-0.025em',
              color:         'var(--white)',
            }}>
              Ogni pixel,<br />
              <span style={{ color: 'var(--gold)' }}>giustificato.</span>
            </h2>
            <p style={{
              fontFamily:  'var(--font-sans)',
              fontSize:    '0.88rem',
              lineHeight:  1.7,
              color:       'var(--white-dim)',
              maxWidth:    '36ch',
              paddingBottom: '0.4rem',
            }}>
              Costruiamo esperienze digitali che convertono, non solo siti
              che "sembrano belli". Performance e design come un'unica disciplina.
            </p>
          </div>
        </motion.div>

        {/* ════════════════════════════════════════════════════
            BENTO GRID — Layout asimmetrico 3 colonne
            Col 1: Featured (span 2 righe)
            Col 2-3: 4 card più piccole in 2×2
            ════════════════════════════════════════════════════ */}
        <div style={{
          display:             'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows:    'auto auto',
          gap:                 'clamp(0.75rem, 1.5vw, 1rem)',
        }}>

          {/* Card 1 FEATURED — col 1, row 1-2 */}
          <FeaturedCard delay={0} />

          {/* Card 2 — Performance Estreme */}
          <BentoCard
            icon={Icon.Zap}
            label="Core Vitals"
            title="Performance Estreme"
            description="LCP sotto 1.2s, CLS zero, FID nullo. Ottimizziamo ogni millisecondo perché Google — e i tuoi utenti — lo premiano."
            pattern="dots"
            glowColor="rgba(180, 220, 255,"
            delay={0.1}
          >
            <PerfChart />
          </BentoCard>

          {/* Card 3 — Conversion Rate */}
          <BentoCard
            icon={Icon.TrendingUp}
            label="CRO"
            title="Conversion Rate"
            description="Design guidato dai dati. A/B test, heatmap, friction analysis. Ogni scelta estetica è validata da numeri reali."
            pattern="diag"
            glowColor="rgba(180, 255, 200,"
            delay={0.15}
          >
            <FunnelViz />
          </BentoCard>

          {/* Card 4 — Animazioni Cinematografiche */}
          <BentoCard
            icon={Icon.Layers}
            label="Motion Design"
            title="Animazioni Cinematografiche"
            description="Framer Motion, GSAP, Lenis. Scroll fluido, transizioni che narrano il brand, micro-interazioni che incantano."
            pattern="none"
            glowColor="rgba(201, 169, 110,"
            delay={0.2}
          >
            <MotionPath />
          </BentoCard>

          {/* Card 5 — Stack Tecnico */}
          <BentoCard
            icon={Icon.Code}
            label="Stack"
            title="Tech Enterprise"
            description="React, Vite, TypeScript, Tailwind. Architettura scalabile, CI/CD, deploy su edge network globale."
            pattern="dots"
            glowColor="rgba(201, 169, 110,"
            delay={0.25}
          >
            <LayerStack />
          </BentoCard>

        </div>

        {/* ── Footer sezione: contatore ─────────────────────── */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.4 }}
          style={{
            marginTop:     'clamp(3rem, 5vw, 4rem)',
            paddingTop:    'clamp(1.5rem, 3vw, 2rem)',
            borderTop:     '1px solid var(--void-border)',
            display:       'flex',
            justifyContent:'space-between',
            alignItems:    'center',
            flexWrap:      'wrap',
            gap:           '1rem',
          }}
        >
          {[
            ['40+', 'Progetti completati'],
            ['100%', 'Clienti soddisfatti'],
            ['7gg',  'Tempo medio di consegna'],
            ['349€', 'Prezzo di partenza'],
          ].map(([val, label]) => (
            <div key={val} style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
              <span style={{
                fontFamily:    'var(--font-display)',
                fontSize:      'clamp(1.6rem, 3vw, 2.4rem)',
                fontWeight:    300,
                color:         'var(--gold)',
                lineHeight:    1,
              }}>{val}</span>
              <span style={{
                fontFamily:    'var(--font-mono)',
                fontSize:      '0.62rem',
                letterSpacing: '0.16em',
                textTransform: 'uppercase',
                color:         'var(--white-dim)',
              }}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
