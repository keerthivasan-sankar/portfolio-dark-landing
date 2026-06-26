import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const projects = [
  {
    title: 'ExamBuddy',
    category: 'Full-Stack Web App',
    description: 'A web-based exam preparation platform designed to help students practice and track their progress with comprehensive testing tools.',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
    tech: ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    links: [
      { label: 'Live Demo', url: 'https://keerthivasan-sankar.github.io/exam-buddy/' },
      { label: 'GitHub', url: 'https://github.com/keerthivasan-sankar/exam-buddy' },
    ],
    reverse: false,
  },
  {
    title: 'Sound & Music Detection System',
    category: 'Machine Learning',
    description: 'A Python-based ML model that detects sound and music using hybrid audio features (spectral, temporal, and mel spectrogram). Achieved 95.0% accuracy with XGBoost.',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
    tech: ['Python', 'XGBoost', 'Librosa', 'Scikit-learn', 'NumPy'],
    links: [
      { label: 'View Details', url: '#' },
    ],
    reverse: true,
  },
  {
    title: 'Adaptive Bitrate Streaming System',
    category: 'Networking',
    description: 'A web-based adaptive bitrate streaming system designed for local networks. Dynamically adjusts video quality based on bandwidth conditions.',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
    tech: ['JavaScript', 'Network Protocols', 'Bandwidth Optimization', 'Video Streaming'],
    links: [
      { label: 'View Details', url: '#' },
    ],
    reverse: false,
  },
  {
    title: 'Cloud/Cloud — Startup UI/UX',
    category: 'UI/UX Design',
    description: 'Full-cycle UI/UX design for a cloud-based startup. Conducted user research, created wireframes, built design systems, and developed interactive prototypes in Figma.',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
    tech: ['Figma', 'User Research', 'Wireframing', 'Prototyping', 'Design Systems'],
    links: [
      { label: 'View Case Study', url: '#' },
    ],
    reverse: true,
  },
]

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="work" ref={sectionRef} className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Selected Work</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
            Featured <span className="font-display italic">projects</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-lg">
            A curated selection of projects from my resume — from concept to deployment.
          </p>
        </motion.div>

        <div className="flex flex-col gap-8 md:gap-12">
          {projects.map((project, i) => (
            <motion.div
              key={i}
              className={`grid grid-cols-1 md:grid-cols-2 gap-0 bg-surface border border-stroke rounded-3xl overflow-hidden group hover:border-[rgba(137,170,204,0.3)] transition-all duration-400 cursor-pointer ${project.reverse ? 'md:[direction:rtl]' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.15 }}
              whileHover={{ y: -4 }}
            >
              <div className="aspect-[16/10] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
              </div>
              <div className={`p-8 md:p-10 flex flex-col justify-center ${project.reverse ? 'md:[direction:ltr]' : ''}`}>
                <div className="flex items-center gap-2 text-xs text-accent-1 uppercase tracking-[0.15em] mb-4">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-1" />
                  {project.category}
                </div>
                <h3 className="text-2xl md:text-3xl text-text-primary font-semibold mb-4">
                  {project.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed mb-6">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs px-3.5 py-1.5 rounded-full bg-[rgba(137,170,204,0.1)] border border-[rgba(137,170,204,0.2)] text-accent-1"
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  {project.links.map((link) => (
                    <a
                      key={link.label}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-text-primary hover:text-accent-1 transition-colors border-b border-transparent hover:border-accent-1 pb-0.5"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {link.label} ↗
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
