export default function SkillsPopup({ onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 9999,
        background: "rgba(113,113,113,0.8)",
        border: "5px solid rgba(255,255,255,0.64)",
        padding: "30px",
        borderRadius: "20px",
        width: "340px",
        maxWidth: "90vw",
        color: "white",
        backdropFilter: "blur(10px)",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>My Skills</h2>

      <p style={{ fontSize: "15px", lineHeight: "1.6", marginBottom: "20px" }}>
        • Web Development (React, Next.js)<br/>
        • 3D Interfaces (Three.js, R3F)<br/>
        • Automation (n8n, Zapier, chatbot)<br/>
        • UI/UX & Front-End Systems<br/>
        • API Integrations<br/>
      </p>

      <button
        onClick={onClose}
        style={{
          padding: "10px 20px",
          background: "#2a58ff",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontSize: "15px",
          cursor: "pointer",
          transition: "0.2s",
        }}
      >
        Close
      </button>
    </div>
  );
}
