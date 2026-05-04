import { useState, useCallback, useEffect } from 'react'
import Home from './components/Home'
import HomeMobile from './components/HomeMobile'
import About from './components/About'
import AboutMobile from './components/AboutMobile'
import Projects from './components/Projects'
import ProjectsMobile from './components/ProjectsMobile'
import ProjectDetail from './components/ProjectDetail'
import Contact from './components/Contact'
import ContactMobile from './components/ContactMobile'

function MobileScaler({ children }) {
  const [scale, setScale] = useState(() => window.innerWidth / 390)

  useEffect(() => {
    const update = () => setScale(window.innerWidth / 390)
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <div style={{
        width: 390,
        height: 844,
        overflow: 'hidden',
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
      }}>
        {children}
      </div>
    </div>
  )
}

function DesktopScaler({ children, bg = '#FFFEF6' }) {
  const [dims, setDims] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))

  useEffect(() => {
    const update = () => setDims({ w: window.innerWidth, h: window.innerHeight })
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  const scale = Math.min(dims.w / 1440, dims.h / 760)
  const offsetX = (dims.w - 1440 * scale) / 2

  return (
    <div style={{ width: '100%', height: '100%', overflow: 'hidden', background: bg, position: 'relative' }}>
      <div style={{
        width: 1440,
        height: 760,
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        position: 'absolute',
        left: offsetX,
        top: 0,
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
    if (page === 'contact')  return <MobileScaler><ContactMobile onNavigate={navigate} /></MobileScaler>
    return <MobileScaler><HomeMobile onNavigate={navigate} /></MobileScaler>
  }

  if (page === 'about')    return <DesktopScaler bg="#680E0F"><About    onNavigate={navigate} /></DesktopScaler>
  if (page === 'projects') return <DesktopScaler bg="#680E0F"><Projects onNavigate={navigate} /></DesktopScaler>
  if (page === 'contact')  return <DesktopScaler bg="#680E0F"><Contact  onNavigate={navigate} /></DesktopScaler>
  if (page.startsWith('project-')) return <DesktopScaler bg="#FFFEF6"><ProjectDetail projectId={page.replace('project-', '')} onNavigate={navigate} /></DesktopScaler>
  return <DesktopScaler bg="#FFFEF6"><Home onNavigate={navigate} /></DesktopScaler>
}
