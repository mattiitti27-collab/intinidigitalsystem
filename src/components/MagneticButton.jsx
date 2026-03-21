import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

/**
 * MagneticButton — il puntatore del mouse attrae il bottone
 * entro un raggio di 60px con forza configurabile.
 */
export default function MagneticButton({
  children,
  strength = 0.35,
  radius   = 80,
  href,
  onClick,
  style = {},
  ...props
}) {
  const ref = useRef(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const springConfig = { damping: 18, stiffness: 200, mass: 0.6 }
  const x = useSpring(rawX, springConfig)
  const y = useSpring(rawY, springConfig)

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const cx = rect.left + rect.width  / 2
    const cy = rect.top  + rect.height / 2
    const dx = e.clientX - cx
    const dy = e.clientY - cy
    const dist = Math.sqrt(dx * dx + dy * dy)

    if (dist < radius) {
      rawX.set(dx * strength)
      rawY.set(dy * strength)
    }
  }

  const handleMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  const Tag = href ? 'a' : 'button'

  return (
    <motion.div
      ref={ref}
      style={{ display: 'inline-block', ...style }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      data-cursor-hover
    >
      <motion.div style={{ x, y }}>
        <Tag
          href={href}
          onClick={onClick}
          style={{
            display:         'inline-flex',
            alignItems:      'center',
            gap:             '0.75rem',
            fontFamily:      'var(--font-mono)',
            fontSize:        '0.72rem',
            letterSpacing:   '0.2em',
            textTransform:   'uppercase',
            textDecoration:  'none',
            color:           'var(--void)',
            background:      'var(--gold)',
            padding:         '1rem 2.2rem',
            border:          'none',
            cursor:          'none',
            outline:         'none',
            position:        'relative',
            overflow:        'hidden',
            transition:      'background var(--duration-fast) ease',
          }}
          {...props}
        >
          {/* Shimmer sweep */}
          <motion.span
            style={{
              position:   'absolute',
              inset:      0,
              background: 'linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.22) 50%, transparent 65%)',
              transform:  'translateX(-100%)',
            }}
            whileHover={{ transform: 'translateX(100%)' }}
            transition={{ duration: 0.55, ease: 'easeInOut' }}
          />
          <span style={{ position: 'relative', zIndex: 1 }}>{children}</span>
          {/* Arrow indicator */}
          <motion.span
            style={{
              position:   'relative',
              zIndex:     1,
              display:    'inline-block',
              fontSize:   '0.9rem',
              lineHeight: 1,
            }}
            initial={{ x: 0 }}
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            →
          </motion.span>
        </Tag>
      </motion.div>
    </motion.div>
  )
}
