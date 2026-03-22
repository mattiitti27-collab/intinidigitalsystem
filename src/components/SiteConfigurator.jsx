import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  X, ArrowRight, ArrowLeft, Check, Sparkles, ExternalLink,
  Monitor, Smartphone,
  Briefcase, Building2, ShoppingBag, Utensils, Wrench,
  Target, Image, ShoppingCart, Star,
  Minimize2, Flame, Diamond, Palette,
  FileText, Grid, MessageSquare, BarChart2, BookOpen, Send,
  LayoutTemplate
} from 'lucide-react'

const STYLE_THEMES = {
  minimal: { bg: '#f8f8f6', bgCard: '#fff', text: '#1a1a1a', accent: '#1a1a1a', accentLight: '#e8e8e4', nav: '#fff', shadow: 'rgba(0,0,0,0.06)', label: 'Minimal & Pulito', mood: 'Bianco · Grigio · Nero' },
  bold:    { bg: '#0d0d0d', bgCard: '#1a1a1a', text: '#fff', accent: '#ff4d00', accentLight: 'rgba(255,77,0,0.15)', nav: '#0d0d0d', shadow: 'rgba(255,77,0,0.15)', label: 'Bold & Audace', mood: 'Nero · Arancione · Bianco' },
  elegante:{ bg: '#0a0907', bgCard: '#110f0c', text: '#e8dcc8', accent: '#c9a84c', accentLight: 'rgba(201,168,76,0.12)', nav: '#0a0907', shadow: 'rgba(201,168,76,0.1)', label: 'Elegante & Raffinato', mood: 'Nero · Oro · Crema' },
  creativo:{ bg: '#f0ebff', bgCard: '#fff', text: '#1a0a3d', accent: '#7c3aed', accentLight: 'rgba(124,58,237,0.1)', nav: '#fff', shadow: 'rgba(124,58,237,0.1)', label: 'Creativo & Originale', mood: 'Lavanda · Viola · Bianco' },
}

const TYPE_CONTENT = {
  freelance: { hero: 'Consulente & Freelance', sub: 'Trasformo le tue idee in risultati concreti', cta: 'Parliamo del tuo progetto', nav: ['Servizi','Portfolio','Chi sono','Contatti'] },
  studio:    { hero: 'Studio & Agenzia', sub: 'Design che converte, strategia che funziona', cta: 'Scopri i servizi', nav: ['Servizi','Lavori','Team','Contatti'] },
  ecommerce: { hero: 'Shop Online Premium', sub: 'I migliori prodotti, consegnati a casa tua', cta: 'Scopri la collezione', nav: ['Shop','Categorie','Chi siamo','Carrello'] },
  ristorante:{ hero: 'Ristorante & Cucina', sub: 'Un viaggio gastronomico senza uguali', cta: 'Prenota un tavolo', nav: ['Menu','Chi siamo','Prenota','Contatti'] },
  artigiano: { hero: "Artigianato d'Eccellenza", sub: 'Fatto a mano, con passione e precisione', cta: 'Vedi i lavori', nav: ['Lavori','Servizi','Chi sono','Preventivo'] },
  altro:     { hero: 'Il Tuo Brand Online', sub: 'Una presenza digitale che ti rappresenta', cta: 'Inizia ora', nav: ['Home','Servizi','Chi siamo','Contatti'] },
}

const ALL_SECTIONS = [
  { id:'hero',          Icon: LayoutTemplate, label:'Hero / Copertina',   desc:'Prima impressione', locked: true },
  { id:'servizi',       Icon: Grid,           label:'Servizi / Prodotti',  desc:'Cosa offri' },
  { id:'portfolio',     Icon: Image,          label:'Portfolio / Lavori',  desc:'I tuoi progetti' },
  { id:'prezzi',        Icon: BarChart2,       label:'Prezzi / Pacchetti', desc:'Tariffe chiare' },
  { id:'testimonianze', Icon: MessageSquare,  label:'Testimonianze',       desc:'Prova sociale' },
  { id:'chi-siamo',     Icon: Briefcase,      label:'Chi sono / Team',     desc:'La tua storia' },
  { id:'blog',          Icon: BookOpen,       label:'Blog / News',         desc:'Contenuti' },
  { id:'contatti',      Icon: Send,           label:'Form Contatti',       desc:'Lead generation' },
]

const STEPS = [
  { id:'type',     label:'Attività', question:'Che tipo di attività hai?' },
  { id:'goal',     label:'Obiettivo', question:'Qual è il tuo obiettivo principale?' },
  { id:'style',    label:'Stile', question:'Che stile preferisci per il sito?' },
  { id:'sections', label:'Sezioni', question:'Quali sezioni ti servono?' },
  { id:'budget',   label:'Budget', question:'Qual è il tuo budget indicativo?' },
]

const OPTS = {
  type: [
    { value:'freelance',   Icon:Briefcase,   label:'Freelance / Consulente' },
    { value:'studio',      Icon:Building2,   label:'Studio / Agenzia' },
    { value:'ecommerce',   Icon:ShoppingBag, label:'E-commerce / Shop' },
    { value:'ristorante',  Icon:Utensils,    label:'Ristorante / Bar' },
    { value:'artigiano',   Icon:Wrench,      label:'Artigiano / Costruttore' },
    { value:'altro',       Icon:Sparkles,    label:'Altro' },
  ],
  goal: [
    { value:'clienti',   Icon:Target,       label:'Trovare nuovi clienti' },
    { value:'portfolio', Icon:Image,        label:'Mostrare il mio lavoro' },
    { value:'vendite',   Icon:ShoppingCart, label:'Vendere online' },
    { value:'brand',     Icon:Star,         label:'Rafforzare il brand' },
  ],
  style: [
    { value:'minimal',  Icon:Minimize2, label:'Minimal & Pulito',    sub:'Bianco · Grigio · Nero' },
    { value:'bold',     Icon:Flame,     label:'Bold & Audace',       sub:'Nero · Arancione · Bianco' },
    { value:'elegante', Icon:Diamond,   label:'Elegante & Raffinato',sub:'Nero · Oro · Crema' },
    { value:'creativo', Icon:Palette,   label:'Creativo & Originale',sub:'Lavanda · Viola · Bianco' },
  ],
  budget: [
    { value:'starter',    Icon:FileText, label:'Fino a €500',      sub:'Landing essenziale' },
    { value:'pro',        Icon:Sparkles, label:'€500 – €1.000',    sub:'Sito completo' },
    { value:'elite',      Icon:Diamond,  label:'Oltre €1.000',     sub:'Progetto su misura' },
    { value:'flessibile', Icon:Target,   label:'Da definire',      sub:'Parliamone insieme' },
  ],
}

const RECS = {
  starter:    { name:'Starter', price:'349',   accent:'#a0a0a0', desc:'Landing page professionale su misura, consegnata in 5 giorni.' },
  pro:        { name:'Pro',     price:'749',   accent:'#C9A84C', desc:'Sito completo, CMS headless, SEO e 30 giorni di supporto dedicato.' },
  elite:      { name:'Elite',   price:'1.490', accent:'#b482ff', desc:'3D custom, e-commerce, dashboard admin e 6 mesi di supporto.' },
  flessibile: { name:'Pro',     price:'749',   accent:'#C9A84C', desc:'Iniziamo con una call gratuita per trovare la soluzione giusta.' },
}

function getRec(answers, sections) {
  const b = answers.budget
  const n = (sections || []).length
  if (b === 'elite' || n >= 6) return RECS.elite
  if (b === 'pro' || n >= 4 || b === 'flessibile') return RECS.pro
  return RECS.starter
}

/* ─── LIVE PREVIEW ─── */
function LivePreview({ answers, sections, viewMode }) {
  const type = answers.type || 'freelance'
  const style = answers.style || 'elegante'
  const t = STYLE_THEMES[style]
  const c = TYPE_CONTENT[type]
  const isDark = ['bold','elegante'].includes(style)
  const border = isDark ? 'rgba(255,255,255,0.07)' : 'rgba(0,0,0,0.07)'
  const textSub = isDark ? 'rgba(255,255,255,0.45)' : 'rgba(0,0,0,0.45)'
  const isMob = viewMode === 'mobile'

  const renderSection = (sid) => {
    const base = { padding: isMob ? '10px 8px' : '12px 10px', borderBottom: `1px solid ${border}` }
    const hdr = { fontSize: isMob ? 4.5 : 5.5, fontWeight:600, color:t.accent, marginBottom:5, letterSpacing:'0.09em', textTransform:'uppercase' }

    if (sid === 'servizi') return (
      <div key={sid} style={base}>
        <div style={hdr}>Servizi</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:3}}>
          {['Design','Dev','SEO'].map((s,i) => (
            <div key={i} style={{background:t.accentLight,borderRadius:3,padding:'4px 3px',textAlign:'center'}}>
              <div style={{fontSize:7,marginBottom:2}}>✦</div>
              <div style={{fontSize:isMob?4:4.5,color:t.text}}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    )
    if (sid === 'portfolio') return (
      <div key={sid} style={base}>
        <div style={hdr}>Portfolio</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(2,1fr)',gap:3}}>
          {[1,2,3,4].map(i => <div key={i} style={{background:t.accentLight,borderRadius:3,aspectRatio:'16/9'}} />)}
        </div>
      </div>
    )
    if (sid === 'prezzi') return (
      <div key={sid} style={base}>
        <div style={hdr}>Prezzi</div>
        <div style={{display:'grid',gridTemplateColumns:'repeat(3,1fr)',gap:3}}>
          {['Base','Pro','Elite'].map((p,i) => (
            <div key={i} style={{border:`1px solid ${i===1?t.accent:border}`,borderRadius:3,padding:'5px 3px',textAlign:'center',background:i===1?t.accentLight:'transparent'}}>
              <div style={{fontSize:isMob?4:4.5,color:t.text,fontWeight:500,marginBottom:1}}>{p}</div>
              <div style={{fontSize:6.5,color:i===1?t.accent:textSub,fontWeight:600}}>€{[99,249,499][i]}</div>
            </div>
          ))}
        </div>
      </div>
    )
    if (sid === 'testimonianze') return (
      <div key={sid} style={base}>
        <div style={hdr}>Testimonianze</div>
        {[1,2].map(i => (
          <div key={i} style={{background:t.accentLight,borderRadius:3,padding:'4px 5px',marginBottom:2}}>
            <div style={{display:'flex',gap:2,marginBottom:2}}>
              {[1,2,3,4,5].map(s => <span key={s} style={{fontSize:4.5,color:t.accent}}>★</span>)}
            </div>
            <div style={{height:2.5,background:isDark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.1)',borderRadius:2,marginBottom:2}} />
            <div style={{height:2.5,width:'60%',background:isDark?'rgba(255,255,255,0.06)':'rgba(0,0,0,0.06)',borderRadius:2}} />
          </div>
        ))}
      </div>
    )
    if (sid === 'chi-siamo') return (
      <div key={sid} style={base}>
        <div style={hdr}>Chi siamo</div>
        <div style={{display:'flex',gap:5,alignItems:'center'}}>
          <div style={{width:24,height:24,borderRadius:3,background:t.accentLight,flexShrink:0}} />
          <div style={{flex:1}}>
            {[100,80,90].map((w,i) => <div key={i} style={{height:2.5,width:`${w}%`,background:isDark?'rgba(255,255,255,0.08)':'rgba(0,0,0,0.08)',borderRadius:2,marginBottom:2}} />)}
          </div>
        </div>
      </div>
    )
    if (sid === 'blog') return (
      <div key={sid} style={base}>
        <div style={hdr}>Blog</div>
        {[1,2].map(i => (
          <div key={i} style={{display:'flex',gap:4,alignItems:'center',marginBottom:3}}>
            <div style={{width:18,height:12,borderRadius:2,background:t.accentLight,flexShrink:0}} />
            <div style={{flex:1}}>
              <div style={{height:2.5,background:isDark?'rgba(255,255,255,0.1)':'rgba(0,0,0,0.1)',borderRadius:2,marginBottom:2}} />
              <div style={{height:2.5,width:'65%',background:isDark?'rgba(255,255,255,0.05)':'rgba(0,0,0,0.05)',borderRadius:2}} />
            </div>
          </div>
        ))}
      </div>
    )
    if (sid === 'contatti') return (
      <div key={sid} style={{padding: isMob ? '10px 8px' : '12px 10px'}}>
        <div style={hdr}>Contatti</div>
        {['Nome','Email','Messaggio'].map((f,i) => (
          <div key={i} style={{height:i===2?12:6,border:`1px solid ${border}`,borderRadius:2,marginBottom:3}} />
        ))}
        <div style={{height:8,background:t.accent,borderRadius:2,display:'flex',alignItems:'center',justifyContent:'center'}}>
          <div style={{fontSize:isMob?4:5,color:isDark?'#000':'#fff',fontWeight:600}}>Invia →</div>
        </div>
      </div>
    )
    return null
  }

  return (
    <motion.div key={style+type} initial={{opacity:0,scale:0.97}} animate={{opacity:1,scale:1}} transition={{duration:0.4,ease:[0.22,1,0.36,1]}}
      style={{width:isMob?130:'100%',margin:isMob?'0 auto':0,fontFamily:'system-ui',borderRadius:7,overflow:'hidden',background:t.bg,boxShadow:`0 8px 40px ${t.shadow}`,border:`1px solid ${border}`}}>
      {/* Nav */}
      <div style={{background:t.nav,borderBottom:`1px solid ${border}`,padding:isMob?'4px 7px':'5px 9px',display:'flex',alignItems:'center',justifyContent:'space-between'}}>
        <div style={{fontSize:isMob?4.5:6,fontWeight:700,color:t.text}}>◆ <span style={{color:t.accent}}>Brand</span></div>
        <div style={{display:'flex',gap:isMob?3:5}}>
          {c.nav.slice(0,isMob?2:4).map((n,i) => (
            <div key={i} style={{fontSize:isMob?3.5:5,color:i===0?t.text:textSub}}>{n}</div>
          ))}
        </div>
      </div>
      {/* Hero */}
      <div style={{background:`linear-gradient(135deg, ${t.bg}, ${t.bgCard})`,padding:isMob?'12px 8px':'16px 10px',borderBottom:`1px solid ${border}`,textAlign:'center'}}>
        <div style={{fontSize:isMob?4:5.5,color:t.accent,letterSpacing:'0.18em',textTransform:'uppercase',marginBottom:4,opacity:0.8}}>
          {answers.goal==='vendite'?'🛍 Shop':answers.goal==='portfolio'?'✦ Portfolio':'✦ Disponibile'}
        </div>
        <div style={{fontSize:isMob?9:13,fontWeight:700,color:t.text,lineHeight:1.15,marginBottom:4,letterSpacing:'-0.02em'}}>
          {c.hero}
        </div>
        <div style={{fontSize:isMob?4.5:6,color:textSub,marginBottom:7,lineHeight:1.5}}>{c.sub}</div>
        <div style={{display:'inline-flex',gap:3}}>
          <div style={{background:t.accent,color:isDark?'#000':'#fff',borderRadius:20,padding:isMob?'2.5px 7px':'3.5px 9px',fontSize:isMob?4.5:5.5,fontWeight:600}}>{c.cta}</div>
          {!isMob && <div style={{border:`1px solid ${border}`,borderRadius:20,padding:'3.5px 9px',fontSize:5.5,color:textSub}}>Scopri di più</div>}
        </div>
      </div>
      {/* Sections */}
      <AnimatePresence mode="popLayout">
        {(sections||[]).filter(s=>s!=='hero').map(sid => (
          <motion.div key={sid} initial={{opacity:0,height:0}} animate={{opacity:1,height:'auto'}} exit={{opacity:0,height:0}} transition={{duration:0.3,ease:[0.22,1,0.36,1]}} style={{overflow:'hidden'}}>
            {renderSection(sid)}
          </motion.div>
        ))}
      </AnimatePresence>
    </motion.div>
  )
}

/* ─── STEP DOTS ─── */
function Steps({ current, total }) {
  return (
    <div className="flex items-center gap-1">
      {Array.from({length:total}).map((_,i) => (
        <div key={i} className="flex items-center">
          <motion.div animate={{
            background: i < current ? '#C9A84C' : i === current ? '#C9A84C' : 'rgba(255,255,255,0.07)',
          }} transition={{duration:0.3}} className="w-6 h-6 rounded-full flex items-center justify-center relative"
            style={{border: i <= current ? '1.5px solid #C9A84C' : '1.5px solid rgba(255,255,255,0.1)'}}>
            {i < current
              ? <Check size={10} className="text-black" strokeWidth={2.5}/>
              : <span className="font-mono text-[9px] text-neutral-400">{i+1}</span>
            }
            {i === current && (
              <motion.div className="absolute inset-0 rounded-full" style={{border:'1.5px solid #C9A84C'}}
                animate={{scale:[1,1.6],opacity:[0.5,0]}} transition={{duration:1.5,repeat:Infinity}} />
            )}
          </motion.div>
          {i < total-1 && <motion.div animate={{background: i<current?'#C9A84C':'rgba(255,255,255,0.07)'}} style={{width:20,height:1,margin:'0 2px'}} transition={{duration:0.4}} />}
        </div>
      ))}
    </div>
  )
}

/* ─── MAIN ─── */
export default function SiteConfigurator({ isOpen, onClose }) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState({})
  const [done, setDone] = useState(false)
  const [viewMode, setViewMode] = useState('desktop')
  const [sections, setSections] = useState(['hero','servizi','contatti'])

  const cur = STEPS[step]
  const rec = done ? getRec(answers, sections) : null

  const reset = () => { setStep(0); setAnswers({}); setDone(false); setSections(['hero','servizi','contatti']) }

  const pick = (v) => {
    const next = { ...answers, [cur.id]: v }
    setAnswers(next)
    setTimeout(() => {
      if (step < STEPS.length - 1) setStep(s => s+1)
      else setDone(true)
    }, 200)
  }

  const toggleSec = (id) => {
    if (id === 'hero') return
    setSections(p => p.includes(id) ? p.filter(s=>s!==id) : [...p, id])
  }

  const isStyleStep = cur?.id === 'style'
  const isSecStep = cur?.id === 'sections'

  const waMsg = done && rec ? encodeURIComponent(
    `Ciao! Ho configurato il mio sito:\n` +
    `• Attività: ${TYPE_CONTENT[answers.type]?.hero || answers.type}\n` +
    `• Stile: ${STYLE_THEMES[answers.style]?.label || answers.style}\n` +
    `• Sezioni: ${sections.filter(s=>s!=='hero').join(', ')}\n` +
    `• Pacchetto: ${rec.name} (€${rec.price})\n\nPossiamo parlarne?`
  ) : ''

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}
          className="fixed inset-0 z-[200] flex items-center justify-center p-3 md:p-5"
          style={{background:'rgba(0,0,0,0.93)',backdropFilter:'blur(20px)'}}
          onClick={e => e.target===e.currentTarget && onClose()}>
          <motion.div
            initial={{scale:0.9,opacity:0,y:30}} animate={{scale:1,opacity:1,y:0}} exit={{scale:0.9,opacity:0,y:30}}
            transition={{type:'spring',stiffness:55,damping:17}}
            className="relative w-full rounded-2xl border border-white/[0.07] overflow-hidden flex flex-col"
            style={{background:'#080808',maxWidth:940,maxHeight:'94vh',height:'94vh'}}>

            {/* TOP BAR */}
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/[0.06] shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl flex items-center justify-center shrink-0"
                  style={{background:'rgba(201,168,76,0.1)',border:'1px solid rgba(201,168,76,0.22)'}}>
                  <Sparkles size={14} className="text-[#C9A84C]" />
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-mono text-[9px] tracking-[0.35em] uppercase text-[#C9A84C]/60">Configuratore & Simulatore Live</span>
                    {!done && <span className="px-2 py-0.5 rounded-full bg-emerald-400/10 font-mono text-[8px] text-emerald-400/70 tracking-widest">● LIVE</span>}
                  </div>
                  {!done && <Steps current={step} total={STEPS.length} />}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {!done && (
                  <div className="hidden md:flex items-center gap-0.5 p-1 rounded-lg" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                    {[{id:'desktop',Icon:Monitor},{id:'mobile',Icon:Smartphone}].map(({id,Icon}) => (
                      <button key={id} onClick={()=>setViewMode(id)}
                        className="w-7 h-7 rounded-md flex items-center justify-center transition-all"
                        style={{background:viewMode===id?'rgba(201,168,76,0.15)':'transparent',color:viewMode===id?'#C9A84C':'#555'}}>
                        <Icon size={12} />
                      </button>
                    ))}
                  </div>
                )}
                <button onClick={onClose}
                  className="w-8 h-8 rounded-full border border-white/[0.08] flex items-center justify-center text-neutral-600 hover:text-neutral-200 hover:border-white/20 transition-all">
                  <X size={14} />
                </button>
              </div>
            </div>

            {/* BODY */}
            <div className="flex flex-1 overflow-hidden">

              {/* LEFT: Questions */}
              <div className="flex flex-col w-full md:w-[44%] md:border-r border-white/[0.06] overflow-y-auto">
                <div className="px-6 py-7">
                  <AnimatePresence mode="wait">
                    {!done ? (
                      <motion.div key={step} initial={{opacity:0,x:22}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-22}} transition={{duration:0.27,ease:[0.22,1,0.36,1]}}>
                        <div className="font-mono text-[9px] tracking-[0.28em] uppercase text-neutral-700 mb-2">
                          Passo {step+1} di {STEPS.length} — {cur.label}
                        </div>
                        <h3 className="font-display text-[1.22rem] font-light text-neutral-100 mb-6 leading-tight">{cur.question}</h3>

                        {/* SECTIONS STEP */}
                        {isSecStep ? (
                          <div>
                            <p className="font-sans text-[11.5px] text-neutral-600 mb-4 leading-relaxed">
                              Seleziona una o più sezioni. <span className="text-neutral-400">Hero è sempre inclusa.</span>
                            </p>
                            <div className="grid grid-cols-2 gap-2 mb-5">
                              {ALL_SECTIONS.map(({id,Icon,label,desc,locked}) => {
                                const sel = sections.includes(id)
                                return (
                                  <motion.button key={id} whileHover={{scale:locked?1:1.02}} whileTap={{scale:locked?1:0.97}}
                                    onClick={()=>!locked && toggleSec(id)}
                                    className="flex items-center gap-2.5 px-3 py-2.5 rounded-xl border text-left transition-all"
                                    style={{borderColor:sel?'rgba(201,168,76,0.45)':'rgba(255,255,255,0.05)',background:sel?'rgba(201,168,76,0.05)':'rgba(255,255,255,0.015)',cursor:locked?'default':'pointer'}}>
                                    <div className="w-6 h-6 rounded-lg flex items-center justify-center shrink-0"
                                      style={{background:sel?'rgba(201,168,76,0.15)':'rgba(255,255,255,0.04)',border:`1px solid ${sel?'rgba(201,168,76,0.3)':'rgba(255,255,255,0.07)'}`}}>
                                      {sel ? <Check size={9} className="text-[#C9A84C]" strokeWidth={2.5}/> : <Icon size={9} className="text-neutral-600" />}
                                    </div>
                                    <div>
                                      <div className="font-sans text-[11px] text-neutral-300 leading-none mb-0.5">{label}</div>
                                      <div className="font-mono text-[9px] text-neutral-700">{desc}</div>
                                    </div>
                                  </motion.button>
                                )
                              })}
                            </div>
                            <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                              onClick={()=>setStep(s=>s+1)}
                              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-sans text-[13px] font-medium transition-all"
                              style={{background:'#C9A84C',color:'#080808'}}>
                              Avanti <ArrowRight size={14}/>
                            </motion.button>
                          </div>
                        ) : isStyleStep ? (
                          /* STYLE STEP */
                          <div className="grid grid-cols-2 gap-2.5">
                            {OPTS.style.map(({value,Icon,label,sub}) => {
                              const t = STYLE_THEMES[value]
                              return (
                                <motion.button key={value} whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                                  onClick={()=>pick(value)}
                                  className="flex flex-col gap-2.5 p-3.5 rounded-xl border text-left transition-all"
                                  style={{borderColor:answers.style===value?'rgba(201,168,76,0.5)':'rgba(255,255,255,0.06)',background:answers.style===value?'rgba(201,168,76,0.05)':'rgba(255,255,255,0.02)'}}>
                                  <div className="flex gap-1.5">
                                    <div style={{width:11,height:11,borderRadius:2,background:t.bg,border:'1px solid rgba(255,255,255,0.12)'}} />
                                    <div style={{width:11,height:11,borderRadius:2,background:t.accent}} />
                                    <div style={{width:11,height:11,borderRadius:2,background:t.text,border:'1px solid rgba(0,0,0,0.15)'}} />
                                  </div>
                                  <div>
                                    <div className="font-sans text-[12px] text-neutral-300 font-medium leading-none mb-1">{label}</div>
                                    <div className="font-mono text-[9px] text-neutral-600">{sub}</div>
                                  </div>
                                </motion.button>
                              )
                            })}
                          </div>
                        ) : (
                          /* OTHER STEPS */
                          <div className="grid grid-cols-2 gap-2.5">
                            {(OPTS[cur?.id]||[]).map(({value,Icon,label,sub}) => (
                              <motion.button key={value} whileHover={{scale:1.02}} whileTap={{scale:0.97}}
                                onClick={()=>pick(value)}
                                className="flex flex-col items-start gap-2 px-4 py-3.5 rounded-xl border text-left transition-all"
                                style={{borderColor:answers[cur?.id]===value?'rgba(201,168,76,0.5)':'rgba(255,255,255,0.06)',background:answers[cur?.id]===value?'rgba(201,168,76,0.06)':'rgba(255,255,255,0.02)'}}>
                                <div className="w-7 h-7 rounded-lg flex items-center justify-center"
                                  style={{background:'rgba(255,255,255,0.04)',border:'1px solid rgba(255,255,255,0.07)'}}>
                                  <Icon size={13} className="text-neutral-400"/>
                                </div>
                                <div>
                                  <div className="font-sans text-[12px] text-neutral-300 leading-none mb-1">{label}</div>
                                  {sub && <div className="font-mono text-[9px] text-neutral-700">{sub}</div>}
                                </div>
                              </motion.button>
                            ))}
                          </div>
                        )}

                        {step > 0 && !isSecStep && (
                          <button onClick={()=>setStep(s=>s-1)}
                            className="mt-6 flex items-center gap-2 font-mono text-[9.5px] tracking-widest uppercase text-neutral-700 hover:text-neutral-400 transition-colors">
                            <ArrowLeft size={11}/> Indietro
                          </button>
                        )}
                      </motion.div>

                    ) : (
                      /* RESULT */
                      <motion.div key="result" initial={{opacity:0,y:16}} animate={{opacity:1,y:0}} transition={{duration:0.4,ease:[0.22,1,0.36,1]}}>
                        <div className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-700 mb-4">✓ Configurazione completata</div>
                        <h3 className="font-display text-[1.35rem] font-light text-neutral-100 mb-1">Il tuo sito è pronto</h3>
                        <p className="font-sans text-[12.5px] text-neutral-600 mb-6 leading-relaxed">Ecco la simulazione e il pacchetto consigliato per la tua attività.</p>

                        {/* Package card */}
                        <div className="rounded-xl border p-5 mb-5" style={{borderColor:`${rec.accent}35`,background:`${rec.accent}09`}}>
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <span className="font-mono text-[9px] tracking-[0.3em] uppercase block mb-1" style={{color:rec.accent}}>Consigliato per te</span>
                              <h4 className="font-display text-xl font-light text-neutral-100">Pacchetto {rec.name}</h4>
                            </div>
                            <div className="text-right">
                              <span className="font-display text-2xl font-light text-neutral-100">€{rec.price}</span>
                              <span className="font-mono text-[8.5px] text-neutral-600 block">una tantum</span>
                            </div>
                          </div>
                          <p className="font-sans text-[12px] text-neutral-500 leading-relaxed">{rec.desc}</p>
                        </div>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {[
                            answers.type && TYPE_CONTENT[answers.type]?.hero,
                            answers.style && STYLE_THEMES[answers.style]?.label,
                            ...sections.filter(s=>s!=='hero').map(s=>ALL_SECTIONS.find(a=>a.id===s)?.label),
                          ].filter(Boolean).map((tag,i) => (
                            <span key={i} className="flex items-center gap-1 px-2.5 py-1 rounded-full font-sans text-[10.5px] text-neutral-500"
                              style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.07)'}}>
                              <Check size={8} className="text-[#C9A84C]" strokeWidth={2.5}/>{tag}
                            </span>
                          ))}
                        </div>

                        {/* CTAs */}
                        <div className="flex flex-col gap-2.5">
                          <a href={`https://wa.me/393345415707?text=${waMsg}`} target="_blank" rel="noopener noreferrer"
                            className="flex items-center justify-center gap-2 py-3.5 rounded-xl font-sans text-[13px] font-medium transition-all hover:shadow-[0_0_40px_rgba(201,168,76,0.25)]"
                            style={{background:'#C9A84C',color:'#080808'}}>
                            <svg viewBox="0 0 24 24" width="14" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                            Richiedi preventivo su WhatsApp
                            <ExternalLink size={12}/>
                          </a>
                          <a href={`mailto:info@intinitds.com?subject=Preventivo ${rec.name}&body=Ciao!%0AHo configurato il sito: tipo ${answers.type}, stile ${answers.style}, sezioni ${sections.join(', ')}.%0APacchetto suggerito: ${rec.name} €${rec.price}.%0AQuando possiamo sentirci?`}
                            className="flex items-center justify-center gap-2 py-3 rounded-xl font-sans text-[12.5px] text-neutral-400 hover:text-neutral-200 transition-all"
                            style={{border:'1px solid rgba(255,255,255,0.08)'}}>
                            Scrivi una email
                          </a>
                          <button onClick={reset} className="font-mono text-[9.5px] tracking-widest uppercase text-neutral-700 hover:text-neutral-400 transition-colors text-center mt-1">
                            ← Riconfigura
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {/* RIGHT: Live Preview */}
              <div className="hidden md:flex flex-col flex-1 bg-[#050505] overflow-y-auto">
                {/* Preview header */}
                <div className="flex items-center justify-between px-5 py-3 border-b border-white/[0.04] shrink-0">
                  <span className="font-mono text-[9px] tracking-[0.3em] uppercase text-neutral-700">Anteprima Live</span>
                  <div className="flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-[9px] text-neutral-700">Aggiornamento in tempo reale</span>
                  </div>
                </div>

                <div className="flex-1 p-5 flex flex-col">
                  {/* Browser chrome */}
                  <div className="rounded-xl overflow-hidden border border-white/[0.06] flex flex-col flex-1">
                    <div className="flex items-center gap-2 px-3 py-2 shrink-0" style={{background:'#0d0d0d',borderBottom:'1px solid rgba(255,255,255,0.05)'}}>
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-[#ff5f57]"/>
                        <div className="w-2 h-2 rounded-full bg-[#febc2e]"/>
                        <div className="w-2 h-2 rounded-full bg-[#28c840]"/>
                      </div>
                      <div className="flex-1 mx-2 rounded-md flex items-center px-2 py-1"
                        style={{background:'#1a1a1a',border:'1px solid rgba(255,255,255,0.06)'}}>
                        <span className="font-mono text-[9px] text-neutral-600">tuosito.com</span>
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto bg-[#111]" style={{padding: viewMode==='mobile'?'16px':'10px'}}>
                      <LivePreview answers={answers} sections={sections} viewMode={viewMode} />
                    </div>
                  </div>

                  {/* Info pills */}
                  <div className="flex flex-wrap items-center gap-x-4 gap-y-1.5 mt-3">
                    {answers.style && (() => {
                      const t = STYLE_THEMES[answers.style]
                      return (
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-[9px] text-neutral-700 uppercase tracking-widest">Stile:</span>
                          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full" style={{background:'rgba(255,255,255,0.03)',border:'1px solid rgba(255,255,255,0.06)'}}>
                            <div className="flex gap-1">
                              {[t.bg,t.accent,t.text].map((c,i) => <div key={i} style={{width:8,height:8,borderRadius:2,background:c,border:'1px solid rgba(255,255,255,0.08)'}}/>)}
                            </div>
                            <span className="font-mono text-[9px] text-neutral-500">{t.label}</span>
                          </div>
                        </div>
                      )
                    })()}
                    <div className="flex items-center gap-1.5">
                      <span className="font-mono text-[9px] text-neutral-700 uppercase tracking-widest">{sections.length} sezioni:</span>
                      <div className="flex flex-wrap gap-1">
                        {sections.map(s => (
                          <span key={s} className="font-mono text-[8.5px] text-neutral-600 px-1.5 py-0.5 rounded"
                            style={{background:'rgba(201,168,76,0.07)',border:'1px solid rgba(201,168,76,0.14)'}}>
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
