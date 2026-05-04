import glass from '../assets/casa.svg'
import mobLine from '../assets/mob-line.svg'
import mobStar from '../assets/mob-star.svg'
import styles from './ProjectsMobile.module.css'

export default function ProjectsMobile({ onNavigate }) {
  return (
    <div className={styles.page}>
      <img src={mobLine} alt="" aria-hidden="true" className={styles.line} />

      <nav className={styles.nav}>
        <button className={styles.navLink} onClick={() => onNavigate('home')}>HOME</button>
        <div className={styles.navDivider} />
        <button className={styles.navLink} onClick={() => onNavigate('about')}>ABOUT</button>
        <div className={styles.navDivider} />
        <button className={`${styles.navLink} ${styles.active}`} onClick={() => onNavigate('projects')}>PROJECTS</button>
        <div className={styles.navDivider} />
        <button className={styles.navLink} onClick={() => onNavigate('contact')}>CONTACT</button>
      </nav>

      <div className={styles.list}>
        <div className={styles.row}>
          <button className={styles.item} onClick={() => onNavigate('project-01')}>
            <span className={styles.num}>01</span>
            <span className={styles.name}>Bome wines</span>
          </button>
          <button className={styles.item} onClick={() => onNavigate('project-02')}>
            <span className={styles.num}>02</span>
            <span className={styles.name}>DUMP Days</span>
          </button>
        </div>

        <button className={styles.itemMid} onClick={() => onNavigate('project-03')}>
          <span className={styles.num}>03</span>
          <span className={styles.name}>Split Airport</span>
        </button>

        <div className={styles.rowBottom}>
          <button className={styles.item} onClick={() => onNavigate('project-04')}>
            <span className={styles.num}>04</span>
            <span className={styles.name}>Lički sokol</span>
          </button>
          <button className={styles.item} onClick={() => onNavigate('project-05')}>
            <span className={styles.num}>05</span>
            <span className={styles.name}>Izračunko</span>
          </button>
        </div>
      </div>

      <img src={glass} alt="" aria-hidden="true" className={styles.glass} />

      <img src={mobStar} alt="" aria-hidden="true" className={styles.star} />

      <div className={styles.clickFrame}>
        <p className={styles.clickLabel}>CLICK FOR MORE</p>
      </div>

      <div className={styles.countFrame}>
        <p className={styles.count}>(5)</p>
      </div>
    </div>
  )
}
