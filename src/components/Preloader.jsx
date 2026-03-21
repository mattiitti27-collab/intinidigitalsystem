import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    let current = 0
    const duration = 2200
    const interval = 16
    const steps = duration / interval
    const increment = 100 / steps

    const timer = setInterval(() => {
      current += increment
      if (current >= 100) {
        current = 100
        clearInterval(timer)
        setTimeout(() => setDone(true), 300)
        setTimeout(() => onComplete?.(), 1100)
      }
      setCount(Math.floor(current))
    }, interval)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
        >
          {/* Logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16"
          >
            <div className="w-12 h-12 rounded-full border border-[#C9A84C]/40 flex items-center justify-center">
              <span className="font-display text-[#C9A84C] text-lg font-light">S</span>
            </div>
          </motion.div>

          {/* Counter */}
          <div className="relative overflow-hidden">
            <motion.div
              key={count}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="font-display text-[6rem] font-light text-neutral-100 leading-none tabular-nums"
            >
              {String(count).padStart(2, '0')}
            </motion.div>
          </div>

          {/* Progress bar */}
          <div className="mt-12 w-48 h-px bg-white/5 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A84C]/60 to-[#E8C97A]"
              style={{ width: `${count}%` }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Bottom label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.3 }}
            transition={{ delay: 0.4 }}
            className="mt-8 font-mono text-[10px] tracking-[0.3em] uppercase text-neutral-400"
          >
            Caricamento esperienza
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
