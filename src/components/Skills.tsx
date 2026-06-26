import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const skillCategories = [
  {
    title: 'Languages',
    skills: ['Python', 'Java', 'C++', 'C', 'SQL', 'JavaScript'],
  },
  {
    title: 'Web & Data',
    skills: ['NumPy', 'Pandas', 'Matplotlib', 'Scikit-learn', 'HTML5', 'CSS3'],
  },
  {
    title: 'Tools',
    skills: ['Git', 'Figma', 'Excel', 'Canva', 'VS Code'],
  },
  {
    title: 'Soft Skills',
    skills: ['Communication', 'Problem Solving', 'Time Management', 'Teamwork', 'Adaptability'],
  },
]

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="skills" ref={sectionRef} className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Skills</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
            Technical <span className="font-display italic">arsenal</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-lg">
            Technologies and tools I've mastered through projects and internships.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={i}
              className="bg-surface border border-stroke rounded-2xl p-7 hover:border-[rgba(137,170,204,0.3)] hover:-translate-y-0.5 transition-all duration-300"
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="text-sm text-accent-1 uppercase tracking-[0.15em] font-semibold mb-4">
                {cat.title}
              </div>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="text-xs px-3 py-1.5 rounded-lg bg-[rgba(255,255,255,0.03)] border border-stroke text-muted hover:text-text-primary hover:border-accent-1 hover:bg-[rgba(137,170,204,0.05)] transition-all duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
