import { useEffect } from 'react'
import { useCursor } from './hooks/useCursor'
import Hero      from './components/Hero'
import Manifesto from './components/Manifesto'
import Services  from './components/Services'
import Pricing   from './components/Pricing'
import Footer    from './components/Footer'
import './index.css'

function Nav() {
  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 'var(--z-modal)', padding: '1.5rem 2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid var(--void-border)', background: 'rgba(8,8,8,0.7)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)' }}>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.15rem', fontWeight: 300, letterSpacing: '0.25em', textTransform: 'uppercase', color: 'var(--white)' }}>
        Studio<span style={{ color: 'var(--gold)', marginLeft: '0.2em' }}>·</span>
      </div>
      <nav style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
        {['Lavori', 'Servizi', 'Processo', 'Contatti'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`}
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--white-dim)', textDecoration: 'none', transition: 'color var(--duration-fast) ease' }}
            onMouseEnter={e => (e.target.style.color = 'var(--white)')}
            onMouseLeave={e => (e.target.style.color = 'var(--white-dim)')}
          >{item}</a>
        ))}
        <a href="#pricing"
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--gold)', textDecoration: 'none', padding: '0.55rem 1.2rem', border: '1px solid var(--gold-dim)', borderRadius: '2px', transition: 'all var(--duration-fast) ease' }}
          onMouseEnter={e => { e.target.style.background = 'var(--gold)'; e.target.style.color = 'var(--void)' }}
          onMouseLeave={e => { e.target.style.background = 'transparent'; e.target.style.color = 'var(--gold)' }}
        >Inizia — 349€</a>
      </nav>
    </header>
  )
}

export default function App() {
  const { dotRef, ringRef } = useCursor()
  useEffect(() => {
    document.documentElement.style.cursor = 'none'
    return () => { document.documentElement.style.cursor = '' }
  }, [])

  return (
    <>
      <div ref={dotRef}  className="cursor-dot"  aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true" />
      <Nav />

      {/* FOOTER fixed sotto il main — rivelato dallo scroll */}
      <Footer />

      {/* MAIN copre il footer finché non si arriva in fondo */}
      <main style={{ position: 'relative', zIndex: 1, background: 'var(--void)', paddingBottom: '100vh' }}>
        <Hero />
        <Manifesto />
        <Services />
        <Pricing />
      </main>
    </>
  )
}
