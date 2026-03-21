import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
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
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef()

  return (
    <motion.div
      ref={ref}
      initial={{ filter: 'blur(16px)', opacity: 0, y: 36, scale: 0.96 }}
      whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ type: 'spring', stiffness: 48, damping: 20, mass: 1.1, delay: index * 0.08 }}
      className={`${project.aspect} group relative overflow-hidden rounded-2xl
                  border border-white/5 cursor-pointer`}
      style={{ minHeight: project.id === '01' ? 460 : 215 }}
    >
      {/* Gradient background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${project.bg} transition-all duration-700 group-hover:scale-105`} />

      {/* Decorative circle */}
      <div
        className="absolute -bottom-16 -right-16 w-56 h-56 rounded-full opacity-10 transition-all duration-700 group-hover:opacity-20 group-hover:scale-110"
        style={{ background: `radial-gradient(circle, ${project.color}, transparent 70%)` }}
      />

      {/* Top line accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-all duration-500 group-hover:opacity-80"
        style={{ background: `linear-gradient(90deg, transparent, ${project.color}60, transparent)`, opacity: 0.3 }}
      />

      {/* Content */}
      <div className="relative z-10 p-7 h-full flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <span className="font-mono text-[10px] tracking-[0.3em] uppercase"
            style={{ color: project.color + 'aa' }}>
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
          <h3 className="font-display text-[1.55rem] font-light text-neutral-100 mb-0.5 leading-tight">
            {project.title}
          </h3>
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

        {/* Header */}
        <div className="flex items-end justify-between mb-16">
          <div>
            <motion.div
              initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 48, damping: 18, mass: 1.1 }}
              className="flex items-center gap-3 mb-5"
            >
              <div className="h-px w-5 bg-[#C9A84C]/55" />
              <span className="font-mono text-[10.5px] tracking-[0.35em] uppercase text-[#C9A84C]/65">
                Lavori selezionati
              </span>
            </motion.div>
            <motion.h2
              initial={{ filter: 'blur(16px)', opacity: 0, y: 28, scale: 0.95 }}
              whileInView={{ filter: 'blur(0px)', opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: 'spring', stiffness: 48, damping: 18, mass: 1.1, delay: 0.1 }}
              className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-light
                         text-neutral-100 leading-tight"
            >
              Ogni progetto, una storia.
            </motion.h2>
          </div>

          <motion.a
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            href="#"
            className="hidden md:flex items-center gap-2 font-mono text-[11px]
                       tracking-widest uppercase text-neutral-600 hover:text-[#C9A84C]
                       transition-colors duration-300 group"
          >
            Tutti i lavori
            <ArrowUpRight size={13} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </motion.a>
        </div>

        {/* Bento grid */}
        <div className="grid grid-cols-3 gap-4 auto-rows-[215px]">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
