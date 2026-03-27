import styles from "../styles/globalStyles";

export default function AboutPopup({ onClose }) {
  return (
    <div style={styles.aboutCard}>

      {/* Avatar */}
      <div style={styles.avatarWrap}>
        <img src="/me.svg" alt="Jeremie" style={styles.aboutAvatar} />
      </div>

      {/* Headline */}
      <h2 style={{ marginBottom: "10px" }}>
        Jeremie — Automation & Backend Developer
      </h2>

      {/* Description */}
      <p style={styles.aboutText}>
        I design and build scalable automation systems that streamline business
        operations, reduce manual work, and improve efficiency.
        <br /><br />

        My core focus is backend automation using tools like <b>n8n</b>,{" "}
        <b>GoHighLevel</b>,{" "}
        <b>Zapier</b>, <b>Supabase</b>, and AI integrations such as{" "}
        <b>VAPI</b> and <b>LLMs</b>.
        <br /><br />

        I specialize in:
        <br />
        • Workflow automation (end-to-end systems)<br />
        • API integrations & webhook architectures<br />
        • AI agents & voice automation<br />
        • CRM and lead management systems<br />
        • Data pipelines (Google Sheets, databases, APIs)
        <br /><br />

        I approach every project with a focus on reliability, scalability, and
        clean system design — building solutions that are not just functional,
        but production-ready.
      </p>

     

        <button style={styles.closeBtn} onClick={onClose}>
          Close
        </button>
      </div>
  );
}
