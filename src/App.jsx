import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Work from './components/Work'
import Services from './components/Services'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import Footer from './components/Footer'

export default function App() {
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
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
      <Preloader onComplete={() => setIsReady(true)} />
      <main className="relative z-10 bg-[#050505]">
        <Hero isReady={isReady} />
        <Manifesto />
        <Work />
        <Services />
        <Testimonials />
        <Pricing />
        <div id="contatti" />
      </main>
      <Footer />
    </div>
  )
}
