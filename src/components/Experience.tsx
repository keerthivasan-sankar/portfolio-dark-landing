import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const experiences = [
  {
    icon: '🎓',
    title: 'Bachelor of Technology — Computer Science & Engineering',
    subtitle: 'Manakula Vinayagar Institute of Technology, Puducherry',
    description: 'CGPA: 7.0. Focused on software engineering, machine learning, and data science with hands-on project experience. Expected graduation: Jun 2026.',
    date: '2022 — 2026',
  },
  {
    icon: '🏫',
    title: 'Higher Secondary Certificate (HSC)',
    subtitle: 'Holy Flowers Higher Secondary School, Kariyamanikkam, Puducherry',
    description: 'Secured 79% in Tamil Nadu State Board examinations.',
    date: '2022',
  },
  {
    icon: '📚',
    title: 'Secondary School Leaving Certificate (SSLC)',
    subtitle: 'Holy Flowers Higher Secondary School, Kariyamanikkam, Puducherry',
    description: 'Secured 71% in Tamil Nadu State Board examinations.',
    date: '2020',
  },
]

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="experience" ref={sectionRef} className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Experience</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
            Journey & <span className="font-display italic">education</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-lg">
            My academic background and journey.
          </p>
        </motion.div>

        <div className="flex flex-col gap-6">
          {experiences.map((exp, i) => (
            <motion.div
              key={i}
              className="flex gap-6 p-7 bg-surface border border-stroke rounded-2xl hover:border-[rgba(137,170,204,0.2)] transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.15 }}
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[rgba(137,170,204,0.2)] to-[rgba(78,133,191,0.2)] flex items-center justify-center flex-shrink-0 text-xl">
                {exp.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg text-text-primary font-semibold mb-1">{exp.title}</h3>
                <div className="text-sm text-accent-1 mb-2">{exp.subtitle}</div>
                <p className="text-sm text-muted leading-relaxed mb-2">{exp.description}</p>
                <div className="text-xs text-muted tracking-wider">{exp.date}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
