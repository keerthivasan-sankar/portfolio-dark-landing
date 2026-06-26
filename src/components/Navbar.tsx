import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

interface NavbarProps {
  activeSection: string
  onNavigate: (id: string) => void
}

const navLinks = [
  { id: 'home', label: 'Home' },
  { id: 'work', label: 'Work' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Resume' },
]

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 100)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 md:pt-6 px-4">
      <motion.div
        className="inline-flex items-center rounded-full backdrop-blur-md border border-white/10 bg-surface px-2 py-2"
        animate={{
          boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.2)' : '0 0 0 rgba(0,0,0,0)',
        }}
        transition={{ duration: 0.3 }}
      >
        <button
          onClick={() => onNavigate('home')}
          className="flex items-center justify-center w-9 h-9 rounded-full bg-bg cursor-pointer hover:scale-110 transition-transform duration-300 relative"
        >
          <div className="absolute inset-0 rounded-full accent-gradient" style={{ padding: '1.5px' }}>
            <div className="w-full h-full rounded-full bg-bg flex items-center justify-center">
              <span className="font-display italic text-[13px] text-text-primary">KS</span>
            </div>
          </div>
        </button>

        <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        <nav className="flex items-center gap-0.5">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => onNavigate(link.id)}
              className={`
                text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 transition-colors duration-200
                ${activeSection === link.id
                  ? 'text-text-primary bg-stroke/50'
                  : 'text-muted hover:text-text-primary hover:bg-stroke/50'
                }
              `}
            >
              {link.label}
            </button>
          ))}
        </nav>

        <div className="hidden sm:block w-px h-5 bg-stroke mx-1" />

        <button
          onClick={() => onNavigate('contact')}
          className="relative text-xs sm:text-sm rounded-full px-3 sm:px-4 py-1.5 sm:py-2 group"
        >
          <span className="absolute inset-[-2px] rounded-full accent-gradient opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <span className="relative flex items-center gap-1 bg-surface rounded-full backdrop-blur-md px-3 py-1.5 text-text-primary">
            Say hi <span className="text-xs">↗</span>
          </span>
        </button>
      </motion.div>
    </div>
  )
}
