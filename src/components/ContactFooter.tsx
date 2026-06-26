import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import Hls from 'hls.js'

export default function ContactFooter() {
  const videoRef = useRef<HTMLVideoElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)

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

  useEffect(() => {
    if (!marqueeRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        xPercent: -50,
        duration: 40,
        ease: 'none',
        repeat: -1,
      })
    })
    return () => ctx.revert()
  }, [])

  const marqueeText = 'BUILDING THE FUTURE • '.repeat(10)

  return (
    <section id="contact" className="relative bg-bg pt-16 md:pt-20 pb-8 md:pb-12 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden scale-y-[-1] opacity-15">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute top-1/2 left-1/2 min-w-full min-h-full object-cover -translate-x-1/2 -translate-y-1/2"
        />
        <div className="absolute inset-0 bg-black/70" />
      </div>

      <div className="relative z-10 overflow-hidden py-8 md:py-12">
        <div ref={marqueeRef} className="whitespace-nowrap text-4xl md:text-6xl lg:text-7xl font-display text-text-primary/[0.04]">
          {marqueeText}
        </div>
      </div>

      <div className="relative z-10 text-center px-6 mb-16">
        <h2 className="text-3xl md:text-4xl lg:text-5xl text-text-primary mb-6 font-semibold">
          Let&apos;s <span className="font-display italic font-normal">create</span> something together
        </h2>
        <a
          href="mailto:kkeerthivasan811@gmail.com"
          className="inline-flex items-center gap-2 rounded-full text-sm px-8 py-4 border-2 border-stroke bg-bg text-text-primary hover:border-accent-1 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_20px_rgba(137,170,204,0.15)]"
        >
          kkeerthivasan811@gmail.com
          <span>↗</span>
        </a>
      </div>

      <div className="relative z-10 max-w-[1200px] mx-auto px-6 md:px-10 lg:px-16">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-stroke">
          <div className="flex items-center gap-8">
            <a
              href="https://linkedin.com/in/keerthivasan-sankar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-text-primary transition-colors relative group"
            >
              LinkedIn
              <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-accent-1 group-hover:w-full transition-all duration-300" />
            </a>
            <a
              href="https://github.com/keerthivasan-sankar"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-muted hover:text-text-primary transition-colors relative group"
            >
              GitHub
              <span className="absolute bottom-[-4px] left-0 w-0 h-px bg-accent-1 group-hover:w-full transition-all duration-300" />
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500" />
            </span>
            <span className="text-xs text-muted">Available for projects</span>
          </div>
        </div>
      </div>
    </section>
  )
}
