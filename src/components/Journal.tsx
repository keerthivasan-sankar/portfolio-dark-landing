import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const journals = [
  {
    title: 'Building ExamBuddy in 8 Days',
    readTime: '5 min read',
    date: 'Jun 2026',
    image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=200&q=80',
  },
  {
    title: 'Hybrid ML Features for Audio',
    readTime: '8 min read',
    date: 'Mar 2026',
    image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=200&q=80',
  },
  {
    title: 'Adaptive Bitrate Streaming',
    readTime: '6 min read',
    date: 'Nov 2024',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=200&q=80',
  },
  {
    title: 'Full-Stack Dev Journey',
    readTime: '4 min read',
    date: 'Jan 2026',
    image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=200&q=80',
  },
]

export default function Journal() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="bg-bg py-16 md:py-24">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <motion.div
          className="mb-12 md:mb-16"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <div className="flex items-center gap-4 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Journal</span>
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
            Recent <span className="font-display italic">thoughts</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-lg">
            Insights and learnings from my journey in design and development.
          </p>
        </motion.div>

        <div className="flex flex-col gap-4">
          {journals.map((entry, i) => (
            <motion.div
              key={i}
              className="flex items-center gap-4 md:gap-6 p-4 bg-surface/30 hover:bg-surface border border-stroke rounded-[40px] sm:rounded-full transition-colors duration-300 cursor-pointer group"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.1 }}
            >
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0">
                <img src={entry.image} alt={entry.title} className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm md:text-base text-text-primary font-medium truncate group-hover:text-text-primary transition-colors">
                  {entry.title}
                </h3>
                <div className="flex items-center gap-3 mt-1">
                  <span className="text-xs text-muted">{entry.readTime}</span>
                  <span className="w-1 h-1 rounded-full bg-muted" />
                  <span className="text-xs text-muted">{entry.date}</span>
                </div>
              </div>
              <div className="text-muted text-lg hidden sm:block">→</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}