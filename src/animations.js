// animations.js — curve di easing e variants Framer Motion riutilizzabili

// ─── Easing curves ────────────────────────────────────────────────────────────
export const EASE_OUT_EXPO   = [0.16, 1, 0.3, 1]
export const EASE_OUT_CIRC   = [0, 0.55, 0.45, 1]
export const SPRING_SOFT     = { type: 'spring', damping: 28, stiffness: 180, mass: 0.8 }
export const SPRING_SNAPPY   = { type: 'spring', damping: 22, stiffness: 300, mass: 0.5 }

// ─── Variants ─────────────────────────────────────────────────────────────────
export const containerVariants = (delay = 0, stagger = 0.1) => ({
  hidden:  {},
  visible: {
    transition: { delayChildren: delay, staggerChildren: stagger },
  },
})

export const itemVariants = {
  hidden:  { opacity: 0, y: 24, filter: 'blur(8px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 0.9, ease: EASE_OUT_EXPO },
  },
}

export const headlineVariants = {
  hidden:  { opacity: 0, y: 40, filter: 'blur(12px)' },
  visible: {
    opacity: 1, y: 0, filter: 'blur(0px)',
    transition: { duration: 1.1, ease: EASE_OUT_EXPO },
  },
}

export const slideInLeft = {
  hidden:  { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

export const slideInRight = {
  hidden:  { opacity: 0, x: 20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: EASE_OUT_EXPO } },
}

export const fadeVariants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.6, ease: EASE_OUT_CIRC } },
}
