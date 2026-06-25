import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'
import Hls from 'hls.js'

const roles = ['Creative', 'Fullstack', 'Founder', 'Scholar']

export default function Hero() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [roleIndex, setRoleIndex] = useState(0)
  const [roleKey, setRoleKey] = useState(0)

  // HLS video setup
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const hlsUrl = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

    if (Hls.isSupported()) {
      const hls = new Hls()
      hls.loadSource(hlsUrl)
      hls.attachMedia(video)
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch(() => {})
      })
      return () => { hls.destroy() }
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = hlsUrl
      video.addEventListener('loadedmetadata', () => {
        video.play().catch(() => {})
      })
    }
  }, [])

  // Role cycling
  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => {
        const next = (prev + 1) % roles.length
        setRoleKey((k) => k + 1)
        return next
      })
    }, 2000)
    return () => clearInterval(interval)
  }, [])

  // GSAP entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.name-reveal', {
        opacity: 0,
        y: 50,
        duration: 1.2,
        delay: 0.1,
        ease: 'power3.out',
      })
      gsap.from('.blur-in', {
        opacity: 0,
        filter: 'blur(10px)',
        y: 20,
        duration: 1,
        stagger: 0.1,
        delay: 0.3,
        ease: 'power3.out',
      })
    }, containerRef)
    return () => ctx.revert()
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background video */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-bg to-transparent" />
      </div>

      {/* Hero content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto pt-24">
        <motion.p
          className="blur-in text-xs text-muted uppercase tracking-[0.3em] mb-8"
          initial={{ opacity: 0 }}
        >
          COLLECTION &apos;26
        </motion.p>

        <h1 className="name-reveal text-6xl md:text-8xl lg:text-9xl font-display italic leading-[0.9] tracking-tight text-text-primary mb-6">
          Keerthivasan S
        </h1>

        <p className="blur-in text-lg md:text-xl text-text-primary mb-4">
          A{' '}
          <span
            key={roleKey}
            className="font-display italic text-text-primary animate-role-fade-in inline-block"
          >
            {roles[roleIndex]}
          </span>{' '}
          lives in Puducherry.
        </p>

        <p className="blur-in text-sm md:text-base text-muted max-w-md mx-auto mb-12">
          Designing seamless digital interactions by focusing on the unique nuances which bring systems to life.
        </p>

        <div className="blur-in inline-flex gap-4">
          <button
            onClick={() => scrollTo('work')}
            className="rounded-full text-sm px-7 py-3.5 bg-text-primary text-bg hover:bg-bg hover:text-text-primary transition-all duration-300 hover:scale-105 gradient-border-ring"
          >
            See Works
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="rounded-full text-sm px-7 py-3.5 border-2 border-stroke bg-bg text-text-primary hover:border-transparent transition-all duration-300 hover:scale-105 gradient-border-ring"
          >
            Reach out...
          </button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
        <span className="text-xs text-muted uppercase tracking-[0.2em]">Scroll</span>
        <div className="relative w-px h-10 bg-stroke overflow-hidden">
          <div className="absolute w-full h-1/2 bg-text-primary/40 animate-scroll-down" />
        </div>
      </div>
    </section>
  )
}