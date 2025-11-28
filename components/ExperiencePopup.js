export default function ExperiencePopup({ onClose }) {
  const popupStyle = {
    background: "rgba(113,113,113,0.8)",
    border: "5px solid rgba(255,255,255,0.64)",
    padding: "30px",
    borderRadius: "20px",
    width: "320px",
    color: "white",
    backdropFilter: "blur(10px)",
    textAlign: "left",
    fontFamily: "Poppins, sans-serif",
    lineHeight: "1.5",
  }

  const paragraph = {
    marginBottom: "12px",
    fontSize: "14px",
  }

  const titleStyle = {
    fontSize: "20px",
    fontWeight: "600",
    textAlign: "center",
    marginBottom: "15px",
  }

  const closeBtnStyle = {
    marginTop: "20px",
    padding: "10px 20px",
    background: "#2a58ff",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    width: "100%",
  }

  return (
    <div style={popupStyle}>
      <h2 style={titleStyle}>Experience</h2>

      <p style={paragraph}>
        I specialized in transforming fully-manual workflows into automated,
        streamlined systems using tools such as n8n, Google Sheets, Google
        Forms, Pipedrive, and custom AI assistants.
      </p>

      <p style={paragraph}>
        Previously, the team spent 3–4 hours every day manually checking
        submissions, sorting leads, replying to inquiries, sending photos,
        and updating spreadsheets. I built an end-to-end automation that
        handled all these tasks instantly and consistently.
      </p>

      <p style={paragraph}>
        With automation running 24/7, the company saved over 60–80 hours
        per month. Lead response time dropped from hours to seconds, no
        leads were ever missed, and the team was able to focus entirely on
        core sales activities instead of admin work.
      </p>

      <p style={paragraph}>
        My workflow system provided centralized data, smart lead scoring,
        automatic pipelines, and AI-generated replies — fully eliminating
        errors and delays caused by manual processes.
      </p>

      <button style={closeBtnStyle} onClick={onClose}>
        Close
      </button>
    </div>
  )
}
