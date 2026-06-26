import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const stats = [
  { value: '4+', label: 'Projects Done' },
  { value: '95%', label: 'ML Accuracy' },
  { value: '7.0', label: 'CGPA' },
  { value: '8 Days', label: 'Fastest Build' },
]

export default function Stats() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="stats" ref={sectionRef} className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              className="text-center p-8 bg-surface border border-stroke rounded-2xl hover:border-[rgba(137,170,204,0.2)] hover:-translate-y-1 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
            >
              <div className="text-4xl md:text-5xl lg:text-6xl font-display text-text-primary mb-2">
                {stat.value}
              </div>
              <div className="text-xs text-muted uppercase tracking-[0.2em]">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
