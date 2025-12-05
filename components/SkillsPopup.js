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
        width: "360px",
        maxWidth: "90vw",
        color: "white",
        backdropFilter: "blur(10px)",
        textAlign: "center",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>My Skills</h2>

      <p
        style={{
          fontSize: "15px",
          lineHeight: "1.65",
          marginBottom: "20px",
          textAlign: "left",
        }}
      >
        <strong>🔹 Web Development</strong><br/>
        • React.js / Next.js<br/>
        • Component-based UI Architecture<br/>
        • Responsive Design & Layouts<br/><br/>

        <strong>🔹 3D Interfaces</strong><br/>
        • Three.js & React Three Fiber (R3F)<br/>
        • Interactive 3D Animations<br/>
        • Shader & Material Customization<br/><br/>

        <strong>🔹 Automation & CRM Systems</strong><br/>
        • GoHighLevel (GHL): workflows, pipelines, funnels, AI agents<br/>
        • n8n automation workflows<br/>
        • Chatbot Integrations (FB, Telegram)<br/>
        • Webhooks & API-driven automation<br/><br/>

        <strong>🔹 UI/UX & Front-End Engineering</strong><br/>
        • Clean UI systems & layout structure<br/>
        • Visual hierarchy & user-friendly flow<br/><br/>

        <strong>🔹 API Integration</strong><br/>
        • REST APIs & authentication<br/>
        • Third-party service integrations<br/>
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
