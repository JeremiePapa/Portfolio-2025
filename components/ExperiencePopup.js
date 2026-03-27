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
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
        Experience
      </h2>

      <div
        style={{
          fontSize: "14px",
          lineHeight: "1.8",
          textAlign: "left",
          marginBottom: "20px",
        }}
      >
        <b>Automation & AI Systems</b><br />
        🔹 n8n workflow automation<br />
        🔹 AI agents & voice systems (VAPI)<br />
        🔹 Scheduling, lead routing, CRM automation<br /><br />

        <b>GoHighLevel (GHL)</b><br />
        🔹 Funnel building (landing, pricing, checkout)<br />
        🔹 Chatbots & appointment integrations<br />
        🔹 CRM pipelines and automation<br /><br />

        <b>Integrations & Backend</b><br />
        🔹 API integrations & webhooks<br />
        🔹 Google Sheets, Supabase, external APIs<br />
        🔹 Data pipelines & automation logic<br /><br />

        <b>Web Development</b><br />
        🔹 Frontend UI (React / Next.js)<br />
        🔹 Portfolio systems & client projects<br />
      </div>

      <a
        href="/work"
        style={{
          display: "block",
          padding: "12px",
          background: "#2a58ff",
          borderRadius: "10px",
          color: "white",
          fontSize: "15px",
          textDecoration: "none",
          textAlign: "center",
          marginBottom: "12px",
          fontWeight: "500",
        }}
      >
        View My Work →
      </a>

      <button
        onClick={onClose}
        style={{
          width: "100%",
          padding: "10px",
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