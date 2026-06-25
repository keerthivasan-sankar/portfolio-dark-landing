import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const words = ['Design', 'Create', 'Inspire']

interface LoadingScreenProps {
  onComplete: () => void
}

export default function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const rafRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / 2700, 1)
      const newCount = Math.floor(progress * 100)
      setCount(newCount)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate)
      } else {
        setTimeout(() => onComplete(), 400)
      }
    }

    rafRef.current = requestAnimationFrame(animate)

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [onComplete])

  useEffect(() => {
    const interval = setInterval(() => {
      setWordIndex((prev) => (prev + 1) % words.length)
    }, 900)
    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-bg flex flex-col items-center justify-center"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Top-left label */}
      <motion.div
        className="absolute top-8 left-8 text-xs text-muted uppercase tracking-[0.3em]"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        Portfolio
      </motion.div>

      {/* Center rotating words */}
      <div className="relative h-20 md:h-28 flex items-center justify-center overflow-hidden mb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={wordIndex}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -20, opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            className="text-4xl md:text-6xl lg:text-7xl font-display italic text-text-primary/80"
          >
            {words[wordIndex]}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Bottom-right counter */}
      <div className="absolute bottom-24 right-8 md:right-12">
        <div className="text-6xl md:text-8xl lg:text-9xl font-display text-text-primary tabular-nums">
          {String(count).padStart(3, '0')}
        </div>
      </div>

      {/* Bottom progress bar */}
      <div className="absolute bottom-8 left-8 right-8 h-[3px] bg-stroke/50 rounded-full overflow-hidden">
        <motion.div
          className="h-full accent-gradient"
          style={{
            width: `${count}%`,
            boxShadow: '0 0 8px rgba(137, 170, 204, 0.35)',
          }}
          initial={{ width: 0 }}
        />
      </div>
    </motion.div>
  )
}