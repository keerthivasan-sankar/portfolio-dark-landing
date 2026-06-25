import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const works = [
  {
    title: 'ExamBuddy',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&q=80',
  },
  {
    title: 'Sound Detection',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/3]',
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&q=80',
  },
  {
    title: 'Adaptive Streaming',
    span: 'md:col-span-5',
    aspect: 'aspect-[4/3]',
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&q=80',
  },
  {
    title: 'Brand Identity',
    span: 'md:col-span-7',
    aspect: 'aspect-[16/10]',
    image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&q=80',
  },
]

export default function SelectedWorks() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-card', {
        y: 60,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="work" ref={sectionRef} className="bg-bg py-12 md:py-16">
      <div className="max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        {/* Header */}
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
            A selection of projects I&apos;ve worked on, from concept to launch.
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-6">
          {works.map((work, i) => (
            <div key={i} className={`work-card ${work.span} group relative rounded-3xl overflow-hidden border border-stroke cursor-pointer`}>
              <div className={`${work.aspect} relative overflow-hidden`}>
                <img
                  src={work.image}
                  alt={work.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                />
                {/* Halftone overlay */}
                <div
                  className="absolute inset-0 opacity-20 mix-blend-multiply pointer-events-none"
                  style={{
                    backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)',
                    backgroundSize: '4px 4px',
                  }}
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-bg/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-lg flex items-center justify-center">
                  <div className="relative inline-flex items-center gap-2 rounded-full px-5 py-2.5 bg-white text-bg font-medium text-sm gradient-border-ring">
                    <span>View</span>
                    <span className="font-display italic">— {work.title}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}