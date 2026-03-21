import { useRef, useMemo } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  MotionValue,
} from 'framer-motion'

/* ════════════════════════════════════════════════════════════
   CONFIGURAZIONE DEL MANIFESTO
   Ogni oggetto è un "token" che si accende in sequenza.
   type: 'word' | 'break' (a capo)
   accent: true → colore oro invece di bianco
   ════════════════════════════════════════════════════════════ */
const MANIFESTO_TOKENS = [
  { text: 'Design',         type: 'word' },
  { text: '3D.',            type: 'word', accent: true },
  { text: 'Animazioni',     type: 'word' },
  { text: 'cinematografiche.', type: 'word', accent: true },
  { text: null,             type: 'break' },
  { text: 'Performance',    type: 'word' },
  { text: 'enterprise.',    type: 'word', accent: true },
  { text: null,             type: 'break' },
  { text: 'Tutto',          type: 'word' },
  { text: 'questo,',        type: 'word' },
  { text: null,             type: 'break' },
  { text: 'senza',          type: 'word' },
  { text: 'i',              type: 'word' },
  { text: 'costi',          type: 'word' },
  { text: 'delle',          type: 'word' },
  { text: 'grandi',         type: 'word' },
  { text: 'agenzie.',       type: 'word', accent: true },
]

/* Solo i token di tipo 'word' partecipano all'animazione */
const WORD_TOKENS = MANIFESTO_TOKENS.filter(t => t.type === 'word')
const N = WORD_TOKENS.length

/* ── Singola parola animata ──────────────────────────────────── */
function AnimatedWord({ token, index, scrollYProgress }) {
  /* Ogni parola occupa una finestra del 12% del progress totale,
     con un overlap del 4% → le accensioni si sovrappongono leggermente */
  const window = 1 / N
  const start  = index * window * 0.88          // inizia un po' prima
  const mid    = start + window * 0.5
  const end    = start + window * 1.1           // finisce leggermente dopo

  const opacity = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.01), mid, Math.min(1, end)],
    [0.08, 1, 1]
  )
  const blur = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.01), mid],
    [10, 0]
  )
  const y = useTransform(
    scrollYProgress,
    [Math.max(0, start - 0.01), mid],
    [22, 0]
  )

  /* Spring per smorzare le transizioni */
  const springOp   = useSpring(opacity, { damping: 28, stiffness: 180 })
  const springY    = useSpring(y,       { damping: 22, stiffness: 160 })

  return (
    <motion.span
      style={{
        display:        'inline-block',
        opacity:        springOp,
        y:              springY,
        filter:         useTransform(blur, v => `blur(${v}px)`),
        color:          token.accent ? 'var(--gold)' : 'var(--white)',
        marginRight:    '0.28em',
        willChange:     'opacity, transform, filter',
        cursor:         'default',
      }}
    >
      {token.text}
    </motion.span>
  )
}

/* ── Glow radiale decorativo ─────────────────────────────────── */
function RadialGlow({ color, x, y, size, opacity }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position:    'absolute',
        left:        x,
        top:         y,
        width:       size,
        height:      size,
        transform:   'translate(-50%, -50%)',
        borderRadius:'50%',
        background:  `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity,
        pointerEvents:'none',
        filter:      'blur(40px)',
      }}
    />
  )
}

/* ── Counter animato nello sticky panel ──────────────────────── */
function ScrollProgress({ scrollYProgress }) {
  const scaleX = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, 1]),
    { damping: 30, stiffness: 200 }
  )

  return (
    <div
      style={{
        position:   'absolute',
        bottom:     '2.5rem',
        left:       '50%',
        transform:  'translateX(-50%)',
        width:      '120px',
        zIndex:     5,
      }}
    >
      <div
        style={{
          width:        '100%',
          height:       '1px',
          background:   'var(--void-border)',
          position:     'relative',
          overflow:     'hidden',
        }}
      >
        <motion.div
          style={{
            position:   'absolute',
            inset:      0,
            background: 'linear-gradient(90deg, var(--gold-dim), var(--gold))',
            scaleX,
            transformOrigin: 'left',
          }}
        />
      </div>
    </div>
  )
}

/* ── Label laterale ──────────────────────────────────────────── */
function SideLabel({ scrollYProgress }) {
  const opacity = useTransform(scrollYProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])

  return (
    <motion.div
      style={{
        position:      'absolute',
        left:          'clamp(1.5rem, 3vw, 3rem)',
        top:           '50%',
        transform:     'translateY(-50%)',
        opacity,
        display:       'flex',
        flexDirection: 'column',
        alignItems:    'center',
        gap:           '1rem',
        zIndex:        5,
      }}
    >
      <span
        className="label"
        style={{
          writingMode:  'vertical-rl',
          textOrientation: 'mixed',
          transform:    'rotate(180deg)',
          opacity:      0.45,
        }}
      >
        Manifesto
      </span>
      <div
        style={{
          width:      '1px',
          height:     '48px',
          background: 'linear-gradient(to bottom, var(--gold-dim), transparent)',
        }}
      />
    </motion.div>
  )
}

/* ════════════════════════════════════════════════════════════
   MANIFESTO — Export principale
   ════════════════════════════════════════════════════════════ */
export default function Manifesto() {
  const containerRef = useRef(null)

  /* scrollYProgress: 0 quando il container entra in viewport,
     1 quando esce — su un'altezza di 350vh dà molto "respiro" */
  const { scrollYProgress } = useScroll({
    target:  containerRef,
    offset:  ['start start', 'end end'],
  })

  /* Ricostruiamo la sequenza con indice globale per le sole 'word' */
  let wordIndex = 0
  const renderedTokens = MANIFESTO_TOKENS.map((token, i) => {
    if (token.type === 'break') {
      return <br key={`br-${i}`} />
    }
    const wi = wordIndex++
    return (
      <AnimatedWord
        key={`w-${i}`}
        token={token}
        index={wi}
        scrollYProgress={scrollYProgress}
      />
    )
  })

  /* Opacità dell'eye-brow label */
  const eyebrowOp = useTransform(scrollYProgress, [0, 0.08, 0.92, 1], [0, 1, 1, 0])
  const eyebrowY  = useTransform(scrollYProgress, [0, 0.08], [20, 0])

  /* Opacità del claim sotto il manifesto */
  const claimOp = useTransform(scrollYProgress, [0.75, 0.88], [0, 1])
  const claimY  = useTransform(scrollYProgress, [0.75, 0.88], [30, 0])

  return (
    /* Container alto: 350vh = spazio di scroll per l'animazione */
    <section
      ref={containerRef}
      id="manifesto"
      style={{
        position: 'relative',
        height:   '350vh',
      }}
    >
      {/* ── Sticky Viewport ────────────────────────────────── */}
      <div
        style={{
          position:       'sticky',
          top:            0,
          height:         '100vh',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'center',
          overflow:       'hidden',
        }}
      >
        {/* ── Glow background atmosferico ──────────────────── */}
        <RadialGlow
          color="rgba(201, 169, 110, 0.12)"
          x="20%"  y="30%"
          size="600px"
          opacity={0.8}
        />
        <RadialGlow
          color="rgba(26, 26, 74, 0.35)"
          x="80%"  y="70%"
          size="700px"
          opacity={0.7}
        />
        <RadialGlow
          color="rgba(201, 169, 110, 0.06)"
          x="60%"  y="20%"
          size="400px"
          opacity={0.9}
        />
        <RadialGlow
          color="rgba(8, 8, 40, 0.5)"
          x="15%"  y="80%"
          size="500px"
          opacity={0.6}
        />

        {/* ── Griglia decorativa sottile ────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position:    'absolute',
            inset:       0,
            backgroundImage: `
              linear-gradient(rgba(201,169,110,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(201,169,110,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
            maskImage:      'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
            WebkitMaskImage:'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
          }}
        />

        {/* ── Label laterale ───────────────────────────────── */}
        <SideLabel scrollYProgress={scrollYProgress} />

        {/* ── Contenuto centrale ───────────────────────────── */}
        <div
          style={{
            position:    'relative',
            zIndex:      3,
            width:       '100%',
            maxWidth:    '1100px',
            margin:      '0 auto',
            padding:     'clamp(1.5rem, 5vw, 4rem) clamp(1.5rem, 8vw, 8rem)',
            textAlign:   'center',
          }}
        >
          {/* Eye-brow */}
          <motion.div
            style={{
              opacity:       eyebrowOp,
              y:             eyebrowY,
              display:       'flex',
              alignItems:    'center',
              justifyContent:'center',
              gap:           '0.75rem',
              marginBottom:  'clamp(2rem, 4vw, 3.5rem)',
            }}
          >
            <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
            <span className="label">La nostra filosofia</span>
            <div style={{ width: '24px', height: '1px', background: 'var(--gold)' }} />
          </motion.div>

          {/* Testo manifesto principale */}
          <h2
            style={{
              fontFamily:   'var(--font-display)',
              fontWeight:   300,
              fontSize:     'clamp(2rem, 5.5vw, 5.2rem)',
              lineHeight:   1.12,
              letterSpacing:'-0.02em',
              margin:       0,
            }}
          >
            {renderedTokens}
          </h2>

          {/* Claim sotto — appare alla fine dello scroll */}
          <motion.div
            style={{
              opacity:       claimOp,
              y:             useSpring(claimY, { damping: 22, stiffness: 160 }),
              marginTop:     'clamp(2.5rem, 5vw, 4rem)',
              display:       'flex',
              alignItems:    'center',
              justifyContent:'center',
              gap:           '1.5rem',
              flexWrap:      'wrap',
            }}
          >
            {[
              ['01', 'Design su misura'],
              ['02', 'Consegna in 7 giorni'],
              ['03', 'Garanzia soddisfatti'],
            ].map(([num, label]) => (
              <div
                key={num}
                style={{
                  display:       'flex',
                  alignItems:    'center',
                  gap:           '0.75rem',
                  padding:       '0.6rem 1.2rem',
                  border:        '1px solid var(--void-border)',
                  background:    'rgba(255,255,255,0.02)',
                }}
              >
                <span
                  style={{
                    fontFamily:    'var(--font-mono)',
                    fontSize:      '0.6rem',
                    color:         'var(--gold)',
                    letterSpacing: '0.1em',
                  }}
                >
                  {num}
                </span>
                <span
                  style={{
                    fontFamily:    'var(--font-sans)',
                    fontSize:      '0.78rem',
                    color:         'var(--white-dim)',
                    letterSpacing: '0.06em',
                  }}
                >
                  {label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ── Barra progresso scroll ────────────────────────── */}
        <ScrollProgress scrollYProgress={scrollYProgress} />

        {/* ── Bordo inferiore ──────────────────────────────── */}
        <div
          aria-hidden="true"
          style={{
            position:   'absolute',
            bottom:     0,
            left:       0,
            right:      0,
            height:     '1px',
            background: 'linear-gradient(90deg, transparent, var(--gold-dim) 30%, var(--gold-dim) 70%, transparent)',
            opacity:    0.3,
          }}
        />
      </div>
    </section>
  )
}
