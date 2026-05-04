import { useState, useRef, useCallback } from 'react'
import coupe from '../assets/coupe.png'
import ellipse from '../assets/ellipse.svg'
import star7 from '../assets/star-home.svg'
import styles from './Home.module.css'

const WHISKEY_SOUR = {
  name: 'Whiskey Sour',
  ingredients: [
    'BOURBON.....................2 oz',
    'LEMON JUICE...............3/4 oz',
    'SYMPLE SYRUP..............1/2 oz',
    'EGG WHITE......................1',
  ],
}

const PAGE_W = 1440
const PAGE_H = 760
const BADGE_W = 143
const BADGE_H = 58
// Default badge center position: calc(50% - 143px/2 - 0.5px), top: 446px
const DEFAULT_POS = { x: (PAGE_W - BADGE_W) / 2 - 0.5, y: 446 }
// Coupe glass bounds (left: calc(50%-477px)=243, top:274, w:954, h:486)
const GLASS = { x1: 243, x2: 1197, y1: 274 }

export default function Home({ onNavigate }) {
  const [secret, setSecret] = useState(null)
  const [badgePos, setBadgePos] = useState(DEFAULT_POS)
  const [following, setFollowing] = useState(false)
  const pageRef = useRef(null)

  const handleBadgeClick = () => setSecret(WHISKEY_SOUR)

  const handleMouseMove = useCallback((e) => {
    const rect = pageRef.current?.getBoundingClientRect()
    if (!rect) return
    const mx = e.clientX - rect.left
    const my = e.clientY - rect.top

    const inGlass = mx >= GLASS.x1 && mx <= GLASS.x2 && my >= GLASS.y1

    if (!inGlass) {
      setFollowing(false)
      setBadgePos(DEFAULT_POS)
      return
    }

    setFollowing(true)
    setBadgePos({
      x: Math.max(0, Math.min(PAGE_W - BADGE_W, mx - BADGE_W / 2)),
      y: Math.max(0, Math.min(PAGE_H - BADGE_H, my - BADGE_H / 2)),
    })
  }, [])

  return (
    <div ref={pageRef} className={styles.page} onMouseMove={handleMouseMove}>

      {/* Dashed circle */}
      <img src={ellipse} alt="" aria-hidden="true" className={styles.circle} />

      {/* Horizontal line */}
      <div className={styles.hLine} aria-hidden="true" />

      {/* Star markers where line meets circle */}
      <img src={star7} alt="" aria-hidden="true" className={styles.star7} />
      <img src={star7} alt="" aria-hidden="true" className={styles.star8} />

      {/* Top center nav */}
      <nav className={styles.nav}>
        <button className={`${styles.navLink} ${styles.active}`}>HOME</button>
        <span className={styles.navDivider} aria-hidden="true" />
        <button className={styles.navLink} onClick={() => onNavigate('about')}>ABOUT</button>
        <span className={styles.navDivider} aria-hidden="true" />
        <button className={styles.navLink} onClick={() => onNavigate('projects')}>PROJECTS</button>
        <span className={styles.navDivider} aria-hidden="true" />
        <button className={styles.navLink} onClick={() => onNavigate('contact')}>CONTACT</button>
      </nav>

      {/* Hero heading – two separate elements per Figma */}
      <p className={styles.heroLine1}>
        Hey, you are in right moment for a cockta..
      </p>
      <p className={styles.heroLine2}>
        I mean, my <em className={styles.portfolio}>portfolio</em>
      </p>

      {/* Coupe glass */}
      <img src={coupe} alt="coupe glass" className={styles.coupeGlass} />

      {/* CLICK FOR SECRET badge — flees the cursor when mouse is over the glass */}
      <button
        className={styles.clickBadge}
        style={{
          left: badgePos.x,
          top: badgePos.y,
          transition: following
            ? 'opacity 0.2s ease'
            : 'left 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), top 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.2s ease',
        }}
        onClick={handleBadgeClick}
      >
        <img src={star7} alt="" aria-hidden="true" className={styles.badgeStar} />
        <span className={styles.badgeText}>CLICK FOR SECRET</span>
      </button>

      {/* Secret cocktail panel */}
      {secret && (
        <div className={styles.secretPanel}>
          <div className={styles.secretHeader}>
            <p className={styles.secretName}>{secret.name}</p>
            <p className={styles.secretSub}>You really came for a cocktail?</p>
          </div>
          <div className={styles.secretIngredients}>
            {secret.ingredients.map((line) => (
              <p key={line} className={styles.ingredient}>{line}</p>
            ))}
          </div>
        </div>
      )}

      {/* Left sidebar */}
      <p className={styles.year}>/2026</p>
      <p className={styles.bio}>
        I am Mihaela, UX/UI designer who likes to move pixels around
      </p>

    </div>
  )
}
