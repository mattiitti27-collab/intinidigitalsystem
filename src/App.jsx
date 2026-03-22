import { useState, useEffect } from 'react'
import Lenis from 'lenis'
import Preloader from './components/Preloader'
import Hero from './components/Hero'
import Manifesto from './components/Manifesto'
import Work from './components/Work'
import Services from './components/Services'
import WhyUs from './components/WhyUs'
import Pricing from './components/Pricing'
import Testimonials from './components/Testimonials'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import SiteConfigurator from './components/SiteConfigurator'
import ConfiguratorSection from './components/ConfiguratorSection'

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [configuratorOpen, setConfiguratorOpen] = useState(false)

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.85,
    })
    let rafId
    function raf(time) { lenis.raf(time); rafId = requestAnimationFrame(raf) }
    rafId = requestAnimationFrame(raf)
    return () => { cancelAnimationFrame(rafId); lenis.destroy() }
  }, [])

  // Global access to open configurator (for Hero and nav)
  useEffect(() => {
    window.__openConfigurator = () => setConfiguratorOpen(true)
    return () => { delete window.__openConfigurator }
  }, [])

  return (
    <div className="bg-[#050505]">
      <Preloader onComplete={() => setIsReady(true)} />
      <main className="relative z-10 bg-[#050505]">
        <Hero isReady={isReady} onOpenConfigurator={() => setConfiguratorOpen(true)} />
        <Manifesto />
        <Work />
        <Services />
        <ConfiguratorSection onOpen={() => setConfiguratorOpen(true)} />
        <WhyUs />
        <Testimonials />
        <Pricing onOpenConfigurator={() => setConfiguratorOpen(true)} />
        <FAQ />
        <div id="contatti" />
      </main>
      <Footer />
      <WhatsAppButton />
      {/* Global configurator — accessible from anywhere */}
      <SiteConfigurator isOpen={configuratorOpen} onClose={() => setConfiguratorOpen(false)} />
    </div>
  )
}
