import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    let current = 0
    const interval = setInterval(() => {
      current += Math.random() * 22 + 8
      if (current >= 100) {
        current = 100
        clearInterval(interval)
        setTimeout(() => {
          setVisible(false)
          setTimeout(onComplete, 700)
        }, 350)
      }
      setProgress(Math.min(current, 100))
    }, 90)
    return () => clearInterval(interval)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, filter: 'blur(12px)', scale: 1.02 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#050505] flex flex-col items-center justify-center"
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 12, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="mb-16 text-center"
          >
            <div className="flex items-center gap-3 justify-center mb-2">
              <div className="w-7 h-7 rounded-full border border-[#C9A84C]/50 flex items-center justify-center">
                <span className="font-display text-[#C9A84C] text-[12px]">I</span>
              </div>
              <span className="font-display text-[20px] font-light text-neutral-100 tracking-tight">
                Intini<span className="text-[#C9A84C] font-normal"> DS</span>
              </span>
            </div>
            <span className="font-mono text-[9px] tracking-[0.45em] uppercase text-neutral-700">
              Digital System
            </span>
          </motion.div>

          {/* Progress bar */}
          <div className="w-40 h-px bg-white/5 relative overflow-hidden">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#C9A84C]/60 to-[#E8C97A]"
              style={{ width: `${progress}%` }}
              transition={{ duration: 0.12, ease: 'linear' }}
            />
          </div>

          {/* Counter */}
          <motion.span
            className="mt-4 font-mono text-[10px] tracking-[0.4em] text-neutral-700"
          >
            {Math.round(progress).toString().padStart(2, '0')} %
          </motion.span>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
