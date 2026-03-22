import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Sparkles, Monitor, ArrowRight, Check, Layers, Palette, Layout, Zap } from 'lucide-react'

const features = [
  { icon: Palette, text: '4 stili visivi con palette live' },
  { icon: Layout, text: '8 sezioni configurabili' },
  { icon: Monitor, text: 'Preview browser in tempo reale' },
  { icon: Zap, text: 'Pacchetto consigliato personalizzato' },
]

export default function ConfiguratorSection({ onOpen }) {
  const ref = useRef()
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section ref={ref} id="configuratore" className="py-28 px-6 relative overflow-hidden">
      {/* BG glow */}
      <div className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 65% 55% at 50% 50%, rgba(201,168,76,0.055) 0%, transparent 70%)' }} />

      <div className="max-w-5xl mx-auto">
        <div className="relative rounded-2xl border border-[#C9A84C]/15 overflow-hidden"
          style={{ background: 'linear-gradient(135deg, rgba(201,168,76,0.04) 0%, rgba(255,255,255,0.01) 50%, rgba(201,168,76,0.03) 100%)' }}>
          
          {/* Top gradient line */}
          <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-[#C9A84C]/55 to-transparent" />
          
          <div className="flex flex-col lg:flex-row items-stretch">
            
            {/* LEFT: copy */}
            <div className="flex-1 p-8 md:p-10 lg:p-12 flex flex-col">
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
                <div className="flex items-center gap-2 mb-5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center"
                    style={{ background: 'rgba(201,168,76,0.12)', border: '1px solid rgba(201,168,76,0.25)' }}>
                    <Sparkles size={15} className="text-[#C9A84C]" />
                  </div>
                  <div>
                    <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]/60 block">Novità — Prova prima di investire</span>
                  </div>
                </div>

                <h2 className="font-display text-[clamp(1.8rem,3.5vw,2.8rem)] font-light text-neutral-100 leading-tight mb-4">
                  Progetta il tuo sito<br />
                  <span className="text-gold">in 2 minuti.</span>
                </h2>

                <p className="font-sans text-[14px] text-neutral-500 leading-relaxed mb-7 max-w-md">
                  Rispondi a <span className="text-neutral-300">5 domande</span> e vedi nascere il tuo sito in tempo reale —
                  stile, colori, struttura e sezioni. Il configuratore ti consiglia il pacchetto su misura e genera il preventivo automaticamente.
                </p>

                <ul className="space-y-2.5 mb-8">
                  {features.map(({ icon: Icon, text }, i) => (
                    <motion.li key={i} initial={{ opacity: 0, x: -16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.15 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                      className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                        style={{ background: 'rgba(201,168,76,0.1)', border: '1px solid rgba(201,168,76,0.2)' }}>
                        <Icon size={11} className="text-[#C9A84C]" />
                      </div>
                      <span className="font-sans text-[13px] text-neutral-400">{text}</span>
                    </motion.li>
                  ))}
                </ul>

                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={onOpen}
                  className="btn-sweep group inline-flex items-center gap-2.5 px-8 py-4 rounded-xl font-sans text-[14px] font-medium transition-all duration-300 hover:shadow-[0_0_50px_rgba(201,168,76,0.2)]"
                  style={{ background: '#C9A84C', color: '#080808' }}>
                  <Sparkles size={14} />
                  Avvia il configuratore
                  <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                </motion.button>
                <p className="font-mono text-[9.5px] tracking-widest uppercase text-neutral-700 mt-3">
                  Gratuito · Nessuna registrazione richiesta
                </p>
              </motion.div>
            </div>

            {/* RIGHT: mock preview */}
            <div className="hidden lg:flex w-[380px] shrink-0 items-center justify-center p-8 relative">
              <motion.div
                initial={{ opacity: 0, x: 40 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.25, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                className="w-full max-w-[300px]">
                
                {/* Mock browser */}
                <div className="rounded-xl overflow-hidden border border-white/[0.06]"
                  style={{ boxShadow: '0 20px 60px rgba(0,0,0,0.5)' }}>
                  {/* Browser bar */}
                  <div className="flex items-center gap-2 px-3 py-2" style={{ background: '#0d0d0d', borderBottom: '1px solid rgba(255,255,255,0.06)' }}>
                    <div className="flex gap-1.5">
                      <div className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                      <div className="w-2 h-2 rounded-full bg-[#febc2e]" />
                      <div className="w-2 h-2 rounded-full bg-[#28c840]" />
                    </div>
                    <div className="flex-1 mx-2 h-4 rounded bg-[#1a1a1a]" style={{ border: '1px solid rgba(255,255,255,0.05)' }} />
                  </div>
                  
                  {/* Mock site content */}
                  <div style={{ background: '#0a0907', padding: '0 0 8px' }}>
                    {/* Nav */}
                    <div style={{ background: '#0a0907', borderBottom: '1px solid rgba(255,255,255,0.06)', padding: '7px 10px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                      <div style={{ fontSize: 7, fontWeight: 700, color: '#e8dcc8' }}>◆ <span style={{ color: '#c9a84c' }}>Studio</span></div>
                      <div style={{ display: 'flex', gap: 6 }}>
                        {['Servizi','Portfolio','Prezzi'].map((n, i) => (
                          <div key={i} style={{ fontSize: 5, color: i === 0 ? '#e8dcc8' : 'rgba(232,220,200,0.4)' }}>{n}</div>
                        ))}
                        <div style={{ fontSize: 5, background: '#c9a84c', color: '#000', padding: '1.5px 6px', borderRadius: 20 }}>CTA →</div>
                      </div>
                    </div>
                    {/* Hero */}
                    <div style={{ padding: '14px 10px', textAlign: 'center', background: 'linear-gradient(135deg, #0a0907, #110f0c)', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <div style={{ fontSize: 5, color: '#c9a84c', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 4, opacity: 0.7 }}>✦ Disponibile</div>
                      <div style={{ fontSize: 13, fontWeight: 700, color: '#e8dcc8', marginBottom: 4, letterSpacing: '-0.02em', lineHeight: 1.15 }}>Studio & Agenzia</div>
                      <div style={{ fontSize: 6, color: 'rgba(232,220,200,0.45)', marginBottom: 7, lineHeight: 1.4 }}>Design che converte, strategia che funziona</div>
                      <div style={{ display: 'inline-flex', gap: 4 }}>
                        <div style={{ background: '#c9a84c', color: '#000', borderRadius: 20, padding: '3px 10px', fontSize: 5.5, fontWeight: 600 }}>Scopri i servizi</div>
                        <div style={{ border: '1px solid rgba(255,255,255,0.1)', borderRadius: 20, padding: '3px 10px', fontSize: 5.5, color: 'rgba(232,220,200,0.4)' }}>Lavori →</div>
                      </div>
                    </div>
                    {/* Services */}
                    <div style={{ padding: '10px', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <div style={{ fontSize: 5, color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Servizi</div>
                      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 3 }}>
                        {['Design','Dev','SEO'].map((s, i) => (
                          <div key={i} style={{ background: 'rgba(201,168,76,0.08)', borderRadius: 3, padding: '5px 3px', textAlign: 'center' }}>
                            <div style={{ fontSize: 8, marginBottom: 1 }}>✦</div>
                            <div style={{ fontSize: 4.5, color: '#e8dcc8' }}>{s}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                    {/* Testimonials */}
                    <div style={{ padding: '10px' }}>
                      <div style={{ fontSize: 5, color: '#c9a84c', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 5 }}>Testimonianze</div>
                      {[1, 2].map(i => (
                        <div key={i} style={{ background: 'rgba(201,168,76,0.05)', borderRadius: 3, padding: '5px 6px', marginBottom: 3 }}>
                          <div style={{ display: 'flex', gap: 2, marginBottom: 2 }}>
                            {[1,2,3,4,5].map(s => <span key={s} style={{ fontSize: 4.5, color: '#c9a84c' }}>★</span>)}
                          </div>
                          <div style={{ height: 2.5, background: 'rgba(255,255,255,0.08)', borderRadius: 2, marginBottom: 1.5 }} />
                          <div style={{ height: 2.5, width: '65%', background: 'rgba(255,255,255,0.05)', borderRadius: 2 }} />
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Floating "LIVE" badge */}
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="absolute -top-3 -right-3 flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                  style={{ background: '#C9A84C', boxShadow: '0 4px 20px rgba(201,168,76,0.4)' }}>
                  <div className="w-1.5 h-1.5 rounded-full bg-black/40 animate-pulse" />
                  <span className="font-mono text-[9px] font-bold text-black tracking-wider">LIVE</span>
                </motion.div>

                {/* Step labels floating */}
                {[
                  { label: 'Tipo attività', pos: '-left-8 top-16', delay: 0 },
                  { label: 'Stile visivo', pos: '-left-10 top-1/2', delay: 0.15 },
                  { label: 'Sezioni scelte', pos: '-left-8 bottom-16', delay: 0.3 },
                ].map(({ label, pos, delay }, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, x: -10 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.6 + delay, duration: 0.5 }}
                    className={`absolute ${pos} flex items-center gap-1.5`}>
                    <div className="h-px w-5 bg-[#C9A84C]/30" />
                    <span className="font-mono text-[8px] tracking-widest uppercase text-neutral-700 whitespace-nowrap">{label}</span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
