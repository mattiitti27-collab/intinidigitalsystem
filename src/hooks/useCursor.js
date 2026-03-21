import { useEffect, useRef } from 'react'
import { useMotionValue } from 'framer-motion'

export function useCursor() {
  const mouseX = useMotionValue(typeof window !== 'undefined' ? window.innerWidth / 2 : 0)
  const mouseY = useMotionValue(typeof window !== 'undefined' ? window.innerHeight / 2 : 0)
  const isHovering = useRef(false)

  useEffect(() => {
    const handleMove = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      document.documentElement.style.setProperty('--cursor-x', `${e.clientX}px`)
      document.documentElement.style.setProperty('--cursor-y', `${e.clientY}px`)
    }

    window.addEventListener('mousemove', handleMove, { passive: true })
    return () => window.removeEventListener('mousemove', handleMove)
  }, [mouseX, mouseY])

  return { mouseX, mouseY }
}
