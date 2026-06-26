import { useState, useEffect, useCallback } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SelectedWorks from './components/SelectedWorks'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Journal from './components/Journal'
import Stats from './components/Stats'
import ContactFooter from './components/ContactFooter'

function App() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'work', 'skills', 'experience', 'journal', 'stats', 'contact']
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el) {
          const rect = el.getBoundingClientRect()
          if (rect.top <= 250 && rect.bottom >= 250) {
            setActiveSection(id)
            break
          }
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' })
    }
  }, [])

  return (
    <>
      {isLoading && <LoadingScreen onComplete={() => setIsLoading(false)} />}
      <Navbar activeSection={activeSection} onNavigate={scrollTo} />
      <Hero />
      <SelectedWorks />
      <Skills />
      <Experience />
      <Journal />
      <Stats />
      <ContactFooter />
    </>
  )
}

export default App
