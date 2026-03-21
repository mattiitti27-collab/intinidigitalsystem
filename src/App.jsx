import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import CustomCursor from './components/CustomCursor'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Footer from './components/Footer'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      touchMultiplier: 2,
    })

    let rafId
    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="bg-[#050505]">
      {/* Custom cursor */}
      <CustomCursor />

      {/* Preloader */}
      <Preloader onComplete={() => setIsReady(true)} />

      {/* Main scrollable content — sits above sticky footer */}
      <main className="relative z-10 bg-[#050505]">
        <Hero isReady={isReady} />
        <Manifesto />
        <Services />
        <Pricing />

        {/* Spacer so footer reveal works */}
        <div id="contatti" className="h-screen" />
      </main>

      {/* Footer — sticky reveal behind main content */}
      <Footer />
    </div>
  )
}
