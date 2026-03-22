import { useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'

const projects = [
  {
    id: '01',
    title: 'Maison Lumière',
    category: 'E-Commerce Luxury',
    year: '2024',
    tags: ['WebGL', 'Framer Motion', 'Shopify'],
    color: '#C9A84C',
    bg: 'from-[#1a1408] to-[#080808]',
    aspect: 'col-span-2 row-span-2',
    // Mock UI elements for large card
    mockType: 'ecommerce',
  },
  {
    id: '02',
    title: 'Volta Studio',
    category: 'Portfolio Architecture',
    year: '2024',
    tags: ['React', '3D', 'GSAP'],
    color: '#7080ff',
    bg: 'from-[#0a0b1a] to-[#080808]',
    aspect: 'col-span-1 row-span-1',
    mockType: 'portfolio',
  },
  {
    id: '03',
    title: 'Nuvola SaaS',
    category: 'Dashboard & App',
    year: '2024',
    tags: ['Next.js', 'Tailwind', 'SaaS'],
    color: '#40b887',
    bg: 'from-[#071410] to-[#080808]',
    aspect: 'col-span-1 row-span-1',
    mockType: 'saas',
  },
  {
    id: '04',
    title: 'Ferro & Fuoco',
    category: 'Restaurant Branding',
    year: '2023',
    tags: ['Cinema 4D', 'WebGL', 'CMS'],
    color: '#e05030',
    bg: 'from-[#160806] to-[#080808]',
    aspect: 'col-span-1 row-span-1',
    mockType: 'restaurant',
  },
  {
    id: '05',
    title: 'Meridiano Capital',
    category: 'Finance Corporate',
    year: '2023',
    tags: ['React', 'Lottie', 'SEO'],
    color: '#a0a8c0',
    bg: 'from-[#0e0e14] to-[#080808]',
    aspect: 'col-span-1 row-span-1',
    mockType: 'finance',
  },
]

// Browser frame mock for large card
function BrowserMockLarge({ color }) {
  return (
    <div className="absolute inset-x-6 top-12 bottom-2 rounded-xl overflow-hidden border border-white/10"
      style={{ background: 'rgba(0,0,0,0.5)' }}>
      {/* Browser chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/[0.07] bg-black/40">
        <span className="w-2 h-2 rounded-full bg-white/10" />
        <span className="w-2 h-2 rounded-full bg-white/10" />
        <span className="w-2 h-2 rounded-full bg-white/10" />
        <div className="ml-2 flex-1 h-4 rounded bg-white/5 flex items-center px-2">
          <span className="font-mono text-[7px] text-white/20">maisonlumiere.it</span>
        </div>
      </div>
      {/* Fake page content */}
      <div className="p-4 space-y-2.5">
        {/* Hero area */}
        <div className="h-14 rounded-lg w-full" style={{ background: `linear-gradient(135deg, ${color}15, ${color}05)` }} />
        {/* Grid */}
        <div className="grid grid-cols-3 gap-2">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="rounded aspect-square" style={{ background: i === 0 ? `${color}20` : 'rgba(255,255,255,0.04)' }} />
          ))}
        </div>
        {/* Text lines */}
        <div className="space-y-1.5 pt-1">
          <div className="h-1.5 rounded-full w-3/4" style={{ background: `${color}30` }} />
          <div className="h-1.5 rounded-full w-1/2 bg-white/5" />
          <div className="h-1.5 rounded-full w-2/3 bg-white/5" />
        </div>
        {/* CTA */}
        <div className="h-6 w-20 rounded-full mt-1" style={{ background: `${color}35` }} />
      </div>
    </div>
  )
}

// Small card mock
function SmallMock({ type, color }) {
  if (type === 'saas') {
    return (
      <div className="absolute inset-x-4 top-8 bottom-2 rounded-lg overflow-hidden border border-white/8"
        style={{ background: 'rgba(0,0,0,0.45)' }}>
        <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-white/[0.06] bg-black/30">
          {[...Array(3)].map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />)}
        </div>
        {/* Dashboard widgets */}
        <div className="p-2.5 grid grid-cols-2 gap-1.5">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="rounded p-1.5" style={{ background: i === 0 ? `${color}15` : 'rgba(255,255,255,0.03)' }}>
              <div className="h-1 rounded-full w-2/3 mb-1" style={{ background: i === 0 ? `${color}40` : 'rgba(255,255,255,0.08)' }} />
              <div className="h-3 rounded w-full bg-white/5" />
            </div>
          ))}
        </div>
      </div>
    )
  }
  if (type === 'portfolio') {
    return (
      <div className="absolute inset-x-4 top-8 bottom-2 rounded-lg overflow-hidden border border-white/8"
        style={{ background: 'rgba(0,0,0,0.45)' }}>
        <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-white/[0.06] bg-black/30">
          {[...Array(3)].map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />)}
        </div>
        <div className="p-2.5 space-y-1.5">
          <div className="h-10 rounded-lg w-full" style={{ background: `${color}18` }} />
          <div className="h-1 w-1/2 rounded-full" style={{ background: `${color}40` }} />
          <div className="h-1 w-2/3 rounded-full bg-white/5" />
          <div className="grid grid-cols-2 gap-1 mt-1.5">
            <div className="h-8 rounded" style={{ background: `${color}10` }} />
            <div className="h-8 rounded bg-white/4" />
          </div>
        </div>
      </div>
    )
  }
  // restaurant / finance defaults
  return (
    <div className="absolute inset-x-4 top-8 bottom-2 rounded-lg overflow-hidden border border-white/8"
      style={{ background: 'rgba(0,0,0,0.45)' }}>
      <div className="flex items-center gap-1 px-2.5 py-1.5 border-b border-white/[0.06] bg-black/30">
        {[...Array(3)].map((_, i) => <span key={i} className="w-1.5 h-1.5 rounded-full bg-white/10" />)}
      </div>
      <div className="p-2.5 space-y-1.5">
        <div className="h-12 rounded-lg" style={{ background: `${color}15` }} />
        <div className="space-y-1">
          <div className="h-1 rounded-full w-3/4" style={{ background: `${color}35` }} />
          <div className="h-1 rounded-full w-1/2 bg-white/5" />
        </div>
        <div className="flex gap-1.5 pt-0.5">
          <div className="h-5 w-12 rounded-full" style={{ background: `${color}25` }} />
          <div className="h-5 w-12 rounded-full bg-white/5" />
        </div>
      </div>
    </div>
  )
}

function ProjectCard({ project, index }) {
  const isLarge = project.aspect.includes('col-span-2')
  return (
    <motion.div
      initial={{ filter: 'blur(16px)', opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 48, damping: 20, mass: 1.1, delay: index * 0.08 }}
      className={`${project.aspect} group relative overflow-hidden rounded-2xl border border-white/5 cursor-pointer`}
      style={{ minHeight: project.id === '01' ? 460 : 215 }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.bg} transition-all duration-700 group-hover:scale-105`} />

      {/* Decorative circle */}
      <div className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-10 transition-all duration-700 group-hover:opacity-20 group-hover:scale-110"
        style={{ background: `radial-gradient(circle, ${project.color}, transparent 70%)` }} />

      {/* Top line accent */}
      <div className="absolute top-0 left-0 right-0 h-px transition-all duration-500 group-hover:opacity-80"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`, opacity: 0.3 }} />

      {/* Mock UI */}
      {isLarge
        ? <BrowserMockLarge color={project.color} />
        : <SmallMock type={project.mockType} color={project.color} />
      }

      {/* Overlay gradient on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(0,0,0,0.6) 100%)' }} />

      {/* Content */}
      <div className="relative z-10 p-7 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase" style={{ color: project.color + 'aa' }}>
            {project.id}
          </span>
          <motion.div
            initial={{ opacity: 0, scale: 0.6 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.08 + 0.3 }}
            className="w-7 h-7 rounded-full border flex items-center justify-center
                       opacity-0 group-hover:opacity-100 transition-all duration-400
                       translate-x-2 -translate-y-2 group-hover:translate-x-0 group-hover:translate-y-0"
            style={{ borderColor: project.color + '60' }}
          >
            <ArrowUpRight size={12} style={{ color: project.color }} />
          </motion.div>
        </div>
        <div>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {project.tags.map((t, i) => (
              <span key={i}
                className="font-mono text-[9px] tracking-widest uppercase px-2 py-0.5 rounded-full border"
                style={{ borderColor: project.color + '25', color: project.color + '80', background: project.color + '08' }}>
                {t}
              </span>
            ))}
          </div>
          <h3 className="font-display text-[1.55rem] font-light text-neutral-100 mb-0.5 leading-tight">{project.title}</h3>
          <p className="font-sans text-[12px] text-neutral-600 tracking-wide">{project.category} — {project.year}</p>
        </div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  return (
    <section id="work" className="py-36 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.div
              initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 48, damping: 18, mass: 1.1 }}
              className="flex items-center gap-3 mb-5">
              <div className="h-px w-5 bg-[#C9A84C]/55" />
              <span className="font-mono text-[10.5px] tracking-[0.35em] uppercase text-[#C9A84C]/65">Lavori selezionati</span>
            </motion.div>
            <motion.h2
              initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 48, damping: 18, mass: 1.1, delay: 0.1 }}
              className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light text-neutral-100 leading-tight">
              Ogni progetto, una storia.
            </motion.h2>
          </div>
          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#"
            className="hidden md:flex items-center gap-2 font-mono text-[11px] tracking-widest uppercase text-neutral-600 hover:text-[#C9A84C] transition-colors duration-300 group">
            Tutti i lavori
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>
        <div className="grid grid-cols-3 gap-4 auto-rows-[215px]">
          {projects.map((p, i) => <ProjectCard key={p.id} project={p} index={i} />)}
        </div>
      </div>
    </section>
  )
}
