import { useRef, useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CustomCursor() {
  const [isVisible, setIsVisible] = useState(false)
  const [isPointer, setIsPointer] = useState(false)
  const [isText, setIsText] = useState(false)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  // Dot - snappy
  const dotX = useSpring(rawX, { stiffness: 800, damping: 40 })
  const dotY = useSpring(rawY, { stiffness: 800, damping: 40 })

  // Ring - laggy, fluid
  const ringX = useSpring(rawX, { stiffness: 120, damping: 22, mass: 0.8 })
  const ringY = useSpring(rawY, { stiffness: 120, damping: 22, mass: 0.8 })

  useEffect(() => {
    const onMove = (e) => {
      rawX.set(e.clientX)
      rawY.set(e.clientY)
      if (!isVisible) setIsVisible(true)
    }

    const onLeave = () => setIsVisible(false)
    const onEnter = () => setIsVisible(true)

    const checkTarget = (e) => {
      const el = e.target
      const style = window.getComputedStyle(el)
      const cursor = style.cursor
      setIsPointer(cursor === 'pointer' || el.tagName === 'A' || el.tagName === 'BUTTON')
      setIsText(cursor === 'text' || el.tagName === 'INPUT' || el.tagName === 'TEXTAREA')
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    window.addEventListener('mousemove', checkTarget, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    document.documentElement.addEventListener('mouseenter', onEnter)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousemove', checkTarget)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.documentElement.removeEventListener('mouseenter', onEnter)
    }
  }, [rawX, rawY, isVisible])

  return (
    <>
      {/* Inner dot */}
      <motion.div
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        className="fixed top-0 left-0 z-[99999] pointer-events-none"
      >
        <motion.div
          animate={{
            width: isPointer ? 6 : isText ? 2 : 5,
            height: isPointer ? 6 : isText ? 18 : 5,
            borderRadius: isText ? 1 : 99,
            backgroundColor: isPointer ? '#C9A84C' : '#f5f5f0',
          }}
          transition={{ type: 'spring', stiffness: 500, damping: 30 }}
          style={{ display: 'block' }}
        />
      </motion.div>

      {/* Outer ring */}
      <motion.div
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        className="fixed top-0 left-0 z-[99998] pointer-events-none"
      >
        <motion.div
          animate={{
            width: isPointer ? 44 : 32,
            height: isPointer ? 44 : 32,
            borderColor: isPointer ? 'rgba(201,168,76,0.6)' : 'rgba(245,245,240,0.2)',
            scale: isPointer ? 1.1 : 1,
          }}
          transition={{ type: 'spring', stiffness: 300, damping: 25 }}
          style={{
            borderRadius: '50%',
            border: '1px solid',
            display: 'block',
          }}
        />
      </motion.div>
    </>
  )
}
