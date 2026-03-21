import { useRef, useEffect } from 'react'

export function useMouse() {
  const mouseX = useRef(0)
  const mouseY = useRef(0)

  useEffect(() => {
    const onMove = (e) => {
      mouseX.current = e.clientX
      mouseY.current = e.clientY
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return { mouseX, mouseY }
}
