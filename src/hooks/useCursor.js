import { useEffect, useRef } from 'react'

/**
 * useCursor — hook che gestisce il cursore custom con:
 * - dot che segue il mouse istantaneamente (RAF)
 * - ring che insegue con inerzia (lerp)
 * - stato hover su elementi interattivi
 * - stato click
 */
export function useCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const ring    = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
  const raf     = useRef(null)

  useEffect(() => {
    const dot  = dotRef.current
    const rng  = ringRef.current
    if (!dot || !rng) return

    const lerp = (a, b, t) => a + (b - a) * t

    const onMove = (e) => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      dot.style.left = `${e.clientX}px`
      dot.style.top  = `${e.clientY}px`
    }

    const onEnter = () => document.body.classList.add('cursor-hover')
    const onLeave = () => document.body.classList.remove('cursor-hover')
    const onDown  = () => document.body.classList.add('cursor-click')
    const onUp    = () => document.body.classList.remove('cursor-click')

    const tick = () => {
      ring.current.x = lerp(ring.current.x, pos.current.x, 0.10)
      ring.current.y = lerp(ring.current.y, pos.current.y, 0.10)
      rng.style.left = `${ring.current.x}px`
      rng.style.top  = `${ring.current.y}px`
      raf.current = requestAnimationFrame(tick)
    }

    // Attach hover detection to all interactive elements
    const attachHover = () => {
      const targets = document.querySelectorAll('a, button, [data-cursor-hover]')
      targets.forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', onMove)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)

    // Small delay to let page render interactive elements
    setTimeout(attachHover, 500)

    raf.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return { dotRef, ringRef }
}
