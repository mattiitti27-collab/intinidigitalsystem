import { useRef, useEffect, Suspense } from 'react'
import { motion } from 'framer-motion'
import HeroScene       from './HeroScene'
import MagneticButton  from './MagneticButton'
import ScrollIndicator from './ScrollIndicator'

/* ── Animation Variants ─────────────────────────────────────── */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.11,
      delayChildren:   0.35,
    },
  },
}

// Ogni PAROLA del titolo entra dal basso con blur
const wordVariants = {
  hidden: {
    y:       60,
    opacity: 0,
    filter:  'blur(12px)',
  },
  visible: {
    y:       0,
    opacity: 1,
    filter:  'blur(0px)',
    transition: {
      duration: 1.1,
      ease:     [0.16, 1, 0.3, 1],
    },
  },
}

const subtitleVariants = {
  hidden:   { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.1 },
  },
}

const ctaVariants = {
  hidden:   { opacity: 0, y: 16 },
  visible: {
    opacity: 1,
    y:       0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
  },
}

/* ── Titolo splittato per parola ────────────────────────────── */
function AnimatedTitle({ text }) {
  const lines = text.split('\n')

  return (
    <>
      {lines.map((line, li) => (
        <div
          key={li}
          style={{
            overflow:    'hidden',
            display:     'flex',
            flexWrap:    'wrap',
            gap:         '0 0.28em',
            lineHeight:  1,
          }}
        >
          {line.split(' ').map((word, wi) => (
            <motion.span
              key={`${li}-${wi}`}
              variants={wordVariants}
              style={{
                display:    'inline-block',
                /* L'ultima parola riceve l'accento oro */
                color: (li === lines.length - 1 && wi === line.split(' ').length - 1)
                  ? 'var(--gold)'
                  : 'var(--white)',
              }}
            >
              {word}
            </motion.span>
          ))}
        </div>
      ))}
    </>
  )
}

/* ── Stat badge ─────────────────────────────────────────────── */
function StatBadge({ number, label }) {
  return (
    <div
      style={{
        display:        'flex',
        flexDirection:  'column',
        gap:            '0.2rem',
      }}
    >
      <span
        style={{
          fontFamily:    'var(--font-display)',
          fontSize:      'clamp(1.4rem, 2.5vw, 2rem)',
          fontWeight:    300,
          color:         'var(--gold)',
          lineHeight:    1,
        }}
      >
        {number}
      </span>
      <span
        style={{
          fontFamily:    'var(--font-mono)',
          fontSize:      '0.62rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'var(--white-dim)',
        }}
      >
        {label}
      </span>
    </div>
  )
}

/* ── Hero Main ──────────────────────────────────────────────── */
export default function Hero() {
  const mouseRef = useRef({ x: 0, y: 0 })
  const sectionRef = useRef(null)

  // Normalizza mouse in [-1, 1] relativo al centro dello schermo
  useEffect(() => {
    const handleMove = (e) => {
      mouseRef.current.x = (e.clientX / window.innerWidth  - 0.5) * 2
      mouseRef.current.y = (e.clientY / window.innerHeight - 0.5) * 2
    }
    window.addEventListener('mousemove', handleMove)
    return () => window.removeEventListener('mousemove', handleMove)
  }, [])

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position:   'relative',
        minHeight:  '100vh',
        display:    'flex',
        alignItems: 'center',
        overflow:   'hidden',
        paddingTop: '80px', // nav height
      }}
    >
      {/* ── 3D Background Scene ──────────────────────────── */}
      <Suspense fallback={null}>
        <HeroScene mouseRef={mouseRef} />
      </Suspense>

      {/* ── Gradient overlay: scena → contenuto ─────────── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          inset:      0,
          background: `
            radial-gradient(ellipse 55% 65% at 65% 50%, transparent 0%, rgba(8,8,8,0.55) 70%),
            linear-gradient(to right, rgba(8,8,8,0.92) 0%, rgba(8,8,8,0.6) 42%, rgba(8,8,8,0.08) 75%)
          `,
          zIndex:     1,
          pointerEvents: 'none',
        }}
      />

      {/* ── Contenuto testuale ───────────────────────────── */}
      <div
        style={{
          position:    'relative',
          zIndex:      2,
          width:       '100%',
          maxWidth:    '1400px',
          margin:      '0 auto',
          padding:     'clamp(2rem, 5vw, 5rem) clamp(1.5rem, 5vw, 4rem)',
        }}
      >
        {/* Eye-brow label */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0  }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          style={{
            display:     'flex',
            alignItems:  'center',
            gap:         '0.75rem',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
          }}
        >
          <span
            style={{
              display:      'block',
              width:        '28px',
              height:       '1px',
              background:   'var(--gold)',
            }}
          />
          <span className="label">Studio — Web Design d'Élite</span>
        </motion.div>

        {/* Titolo principale */}
        <motion.h1
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily:  'var(--font-display)',
            fontWeight:  300,
            fontStyle:   'italic',
            fontSize:    'clamp(3rem, 8.5vw, 9.5rem)',
            lineHeight:  1,
            letterSpacing: '-0.03em',
            marginBottom: 'clamp(1.5rem, 3vw, 2.5rem)',
            maxWidth:    '700px',
          }}
        >
          <AnimatedTitle text={'Esperienze\nDigitali d\'Élite.'} />
        </motion.h1>

        {/* Sottotitolo */}
        <motion.p
          variants={subtitleVariants}
          initial="hidden"
          animate="visible"
          style={{
            fontFamily:  'var(--font-sans)',
            fontSize:    'clamp(0.95rem, 1.5vw, 1.15rem)',
            fontWeight:  400,
            lineHeight:  1.65,
            color:       'var(--white-dim)',
            maxWidth:    '420px',
            marginBottom: 'clamp(2rem, 4vw, 3.5rem)',
          }}
        >
          Trasformiamo la tua visione in un sito web che compete con i brand mondiali.
          Animazioni 3D, design esclusivo, conversioni misurabili.
          A partire da <strong style={{ color: 'var(--white)', fontWeight: 600 }}>349€</strong>.
        </motion.p>

        {/* CTA + Stats */}
        <motion.div
          variants={ctaVariants}
          initial="hidden"
          animate="visible"
          style={{
            display:     'flex',
            flexWrap:    'wrap',
            alignItems:  'center',
            gap:         'clamp(1.5rem, 4vw, 3rem)',
          }}
        >
          <MagneticButton href="#pricing">
            Inizia il tuo progetto
          </MagneticButton>

          {/* Divider verticale */}
          <div
            aria-hidden="true"
            style={{
              width:      '1px',
              height:     '44px',
              background: 'var(--void-border)',
              flexShrink: 0,
            }}
          />

          {/* Stats row */}
          <div
            style={{
              display: 'flex',
              gap:     'clamp(1.5rem, 3vw, 2.5rem)',
            }}
          >
            <StatBadge number="48h"  label="Primo Draft" />
            <StatBadge number="100%" label="Custom Design" />
            <StatBadge number="3s"   label="Load Target" />
          </div>
        </motion.div>
      </div>

      {/* ── Scroll indicator ─────────────────────────────── */}
      <ScrollIndicator />

      {/* ── Bordo inferiore decorativo ───────────────────── */}
      <div
        aria-hidden="true"
        style={{
          position:   'absolute',
          bottom:     0,
          left:       0,
          right:      0,
          height:     '1px',
          background: 'linear-gradient(90deg, transparent, var(--gold-dim) 30%, var(--gold-dim) 70%, transparent)',
          zIndex:     3,
          opacity:    0.4,
        }}
      />
    </section>
  )
}
