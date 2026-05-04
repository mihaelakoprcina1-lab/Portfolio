import { useState, useCallback, useEffect } from 'react'
import Home from './components/Home'
import HomeMobile from './components/HomeMobile'
import About from './components/About'
import AboutMobile from './components/AboutMobile'
import Projects from './components/Projects'
import ProjectsMobile from './components/ProjectsMobile'
import ProjectDetail from './components/ProjectDetail'
import Contact from './components/Contact'

function MobileScaler({ children }) {
  const [scale, setScale] = useState(() => window.innerWidth / 390)

  useEffect(() => {
    const update = () => setScale(window.innerWidth / 390)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100svh', overflow: 'hidden' }}>
      <div style={{
        width: 390,
        height: 844,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}>
        {children}
      </div>
    </div>
  )
}

function DesktopScaler({ children }) {
  const getScale = () => Math.min(
    window.innerWidth  / 1440,
    window.innerHeight / 760
  )
  const [scale, setScale] = useState(getScale)

  useEffect(() => {
    const update = () => setScale(getScale())
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div style={{ width: '100vw', height: '100vh', overflow: 'hidden', background: '#680E0F' }}>
      <div style={{
        width: 1440,
        height: 760,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}>
        {children}
      </div>
    </div>
  )
}

export default function App() {
  const [page, setPage] = useState('home')
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < 768)

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  const navigate = useCallback((next) => setPage(next), [])

  if (isMobile) {
    if (page === 'about')    return <MobileScaler><AboutMobile    onNavigate={navigate} /></MobileScaler>
    if (page === 'projects') return <MobileScaler><ProjectsMobile onNavigate={navigate} /></MobileScaler>
    if (page.startsWith('project-')) return <ProjectDetail projectId={page.replace('project-', '')} onNavigate={navigate} />
    if (page === 'contact')  return <Contact onNavigate={navigate} />
    return <MobileScaler><HomeMobile onNavigate={navigate} /></MobileScaler>
  }

  if (page === 'about')    return <DesktopScaler><About    onNavigate={navigate} /></DesktopScaler>
  if (page === 'projects') return <DesktopScaler><Projects onNavigate={navigate} /></DesktopScaler>
  if (page.startsWith('project-')) return <DesktopScaler><ProjectDetail projectId={page.replace('project-', '')} onNavigate={navigate} /></DesktopScaler>
  if (page === 'contact')  return <DesktopScaler><Contact  onNavigate={navigate} /></DesktopScaler>
  return <DesktopScaler><Home onNavigate={navigate} /></DesktopScaler>
}
