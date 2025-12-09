import styles from "../styles/globalStyles"

export default function AboutPopup({ onClose }) {
  return (
    <div style={styles.aboutCard}>

      {/* Avatar wrapper (circle) */}
      <div style={styles.avatarWrap}>
        <img src="/me.svg" alt="Me" style={styles.aboutAvatar} />
      </div>

      <p style={styles.aboutText}>
        Hi! I'm Jeremie — a self-taught automation and web development
        specialist. I build smart systems using tools like n8n, modern web
        tech, and AI-powered workflows.  
        <br /><br />
        I love turning complex challenges into simple, automated, scalable
        solutions that save time and increase efficiency 🚀
      </p>

      <button style={styles.closeBtn} onClick={onClose}>
        Close
      </button>
    </div>
  )
}
