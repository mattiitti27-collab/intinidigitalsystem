import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [count, setCount] = useState(0)
  const [phase, setPhase] = useState('counting') // counting | done

  useEffect(() => {
    let cur = 0
    const duration = 2000
    const fps = 60
    const steps = duration / (1000 / fps)
    const inc = 100 / steps

    const timer = setInterval(() => {
      cur = Math.min(cur + inc + (cur > 60 ? inc * 0.3 : 0), 100)
      setCount(Math.floor(cur))
      if (cur >= 100) {
        clearInterval(timer)
        setTimeout(() => setPhase('done'), 350)
        setTimeout(() => onComplete?.(), 1200)
      }
    }, 1000 / fps)

    return () => clearInterval(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {phase !== 'done' && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.95, ease: [0.76, 0, 0.24, 1], delay: 0.08 }}
          className="fixed inset-0 z-[9999] bg-[#030303] flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-14"
          >
            <div className="w-11 h-11 rounded-full border border-[#C9A84C]/35
                            flex items-center justify-center">
              <span className="font-display text-[#C9A84C] text-base font-light">S</span>
            </div>
          </motion.div>

          {/* Counter */}
          <div className="overflow-hidden h-28 flex items-center">
            <span className="font-display text-[7.5rem] font-light text-neutral-100
                             leading-none tabular-nums tracking-tighter">
              {String(count).padStart(2, '0')}
            </span>
          </div>

          {/* Progress line */}
          <div className="mt-10 w-40 h-px bg-white/[0.05] relative overflow-hidden rounded-full">
            <motion.div
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                width: `${count}%`,
                background: 'linear-gradient(90deg, rgba(201,168,76,0.5), #E8C97A)',
              }}
              transition={{ ease: 'linear' }}
            />
          </div>

          {/* Label */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.28 }}
            transition={{ delay: 0.5 }}
            className="mt-6 font-mono text-[9px] tracking-[0.38em] uppercase text-neutral-500"
          >
            Caricamento esperienza
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
