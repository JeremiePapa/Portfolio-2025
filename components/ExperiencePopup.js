export default function ExperiencePopup({ onClose }) {
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
        width: "360px",
        maxWidth: "90vw",
        color: "white",
        backdropFilter: "blur(10px)",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>Experience</h2>

      <p style={{ fontSize: "15px", lineHeight: "1.6", marginBottom: "20px", textAlign: "left" }}>
        • Automation workflows (AI Agents, n8n, GHL) <br />
        • GHL funnel building (landing page, pricing, checkout, receipts) <br />
        • GHL chatbot + appointment integrations <br />
        • API integrations & lead routing automation <br />
        • Smart chatbot systems using LLMs <br />
        • Full-stack web development for clients <br />
      </p>

      {/* SEE MY WORK BUTTON */}
      <a
        href="/work"
        style={{
          display: "inline-block",
          padding: "10px 20px",
          background: "#2a58ff",
          borderRadius: "10px",
          color: "white",
          fontSize: "15px",
          textDecoration: "none",
          cursor: "pointer",
          marginBottom: "15px",
        }}
      >
        See My Work →
      </a>

      <br />

      <button
        onClick={onClose}
        style={{
          padding: "10px 20px",
          background: "rgba(255,255,255,0.2)",
          border: "none",
          borderRadius: "10px",
          color: "white",
          fontSize: "15px",
          cursor: "pointer",
        }}
      >
        Close
      </button>
    </div>
  );
}
