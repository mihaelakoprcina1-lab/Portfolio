import linkedinIcon from '../assets/contact-linkedin.svg'
import emailIcon from '../assets/contact-email.svg'
import glass from '../assets/casa.svg'
import styles from './ContactMobile.module.css'

export default function ContactMobile({ onNavigate }) {
  return (
    <div className={styles.page}>
      <div className={styles.vLine} />

      <nav className={styles.nav}>
        <button className={styles.navLink} onClick={() => onNavigate('home')}>HOME</button>
        <div className={styles.navDivider} />
        <button className={styles.navLink} onClick={() => onNavigate('about')}>ABOUT</button>
        <div className={styles.navDivider} />
        <button className={styles.navLink} onClick={() => onNavigate('projects')}>PROJECTS</button>
        <div className={styles.navDivider} />
        <button className={`${styles.navLink} ${styles.active}`} onClick={() => onNavigate('contact')}>CONTACT</button>
      </nav>

      <div className={styles.titleFrame}>
        <p className={styles.title}>Let's be friends.</p>
      </div>

      <div className={styles.subFrame}>
        <p className={styles.sub}>I SHOWED YOU MY COCKTAILS.</p>
      </div>

      <img src={glass} alt="" aria-hidden="true" className={styles.glass} />

      <div className={styles.social}>
        <a
          href="https://www.linkedin.com/in/mihaela-kopr%C4%8Dina-7834aa281/"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.socialItem}
        >
          <div className={styles.iconBtn}>
            <img src={linkedinIcon} alt="LinkedIn" className={styles.icon} />
          </div>
          <span className={styles.label}>LINKEDIN</span>
        </a>

        <a href="mailto:mihaela.koprcina1@gmail.com" className={styles.socialItem}>
          <div className={styles.iconBtn}>
            <img src={emailIcon} alt="Email" className={styles.icon} />
          </div>
          <span className={styles.label}>EMAIL</span>
        </a>
      </div>
    </div>
  )
}
