import { useRef, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const items = [
  { image: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=400&q=80', rotation: -3 },
  { image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&q=80', rotation: 2 },
  { image: 'https://images.unsplash.com/photo-1558591710-4b4a1ae0f04d?w=400&q=80', rotation: -2 },
  { image: 'https://images.unsplash.com/photo-1563089145-599997674d42?w=400&q=80', rotation: 3 },
  { image: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=400&q=80', rotation: -1 },
  { image: 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=400&q=80', rotation: 2 },
]

export default function Explorations() {
  const sectionRef = useRef<HTMLElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const col1Ref = useRef<HTMLDivElement>(null)
  const col2Ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  useEffect(() => {
    if (!sectionRef.current || !contentRef.current) return

    const ctx = gsap.context(() => {
      // Pin the center content
      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top top',
        end: 'bottom bottom',
        pin: contentRef.current,
        pinSpacing: false,
      })

      // Parallax columns
      if (col1Ref.current) {
        gsap.to(col1Ref.current, {
          y: -150,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
      if (col2Ref.current) {
        gsap.to(col2Ref.current, {
          y: 150,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 1,
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  const leftItems = items.filter((_, i) => i % 2 === 0)
  const rightItems = items.filter((_, i) => i % 2 === 1)

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] bg-bg">
      {/* Pinned center content */}
      <div ref={contentRef} className="h-screen flex flex-col items-center justify-center z-10 relative pointer-events-none">
        <motion.div
          className="text-center px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-4 mb-4">
            <div className="w-8 h-px bg-stroke" />
            <span className="text-xs text-muted uppercase tracking-[0.3em]">Explorations</span>
            <div className="w-8 h-px bg-stroke" />
          </div>
          <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-4">
            Visual <span className="font-display italic">playground</span>
          </h2>
          <p className="text-sm md:text-base text-muted max-w-md mx-auto mb-8">
            Experimental designs and creative explorations.
          </p>
          <button className="rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-all duration-300 gradient-border-ring pointer-events-auto">
            View on Dribbble
          </button>
        </motion.div>
      </div>

      {/* Parallax columns */}
      <div className="absolute inset-0 z-20 pointer-events-none">
        <div className="max-w-[1400px] mx-auto h-full grid grid-cols-2 gap-12 md:gap-40 px-6">
          <div ref={col1Ref} className="flex flex-col gap-8 pt-[20vh]">
            {leftItems.map((item, i) => (
              <div
                key={i}
                className="aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke pointer-events-auto"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
          <div ref={col2Ref} className="flex flex-col gap-8 pt-[40vh]">
            {rightItems.map((item, i) => (
              <div
                key={i}
                className="aspect-square max-w-[320px] rounded-2xl overflow-hidden border border-stroke pointer-events-auto ml-auto"
                style={{ transform: `rotate(${item.rotation}deg)` }}
              >
                <img src={item.image} alt="" className="w-full h-full object-cover" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}