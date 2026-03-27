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
        width: "380px",
        maxWidth: "90vw",
        color: "white",
        backdropFilter: "blur(10px)",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <h2 style={{ marginBottom: "15px", textAlign: "center" }}>
        Business Impact
      </h2>

      <p
        style={{
          fontSize: "14px",
          lineHeight: "1.8",
          textAlign: "left",
          marginBottom: "20px",
        }}
      >
        <strong>🔹 Time Saved (Automation)</strong><br />
        🔹 Reduced manual scheduling & lead handling by ~15–30 hours/week<br />
        🔹 Automated follow-ups and CRM updates, saving ~40–80 hours/month<br />
        🔹 Replaced repetitive admin work with AI-driven workflows<br /><br />

        <strong>🔹 Operational Efficiency</strong><br />
        🔹 Enabled 24/7 automated responses (no missed leads)<br />
        🔹 Reduced response time from hours → seconds<br />
        🔹 Eliminated manual data entry and multi-step processes<br /><br />

        <strong>🔹 Revenue & Conversion Impact</strong><br />
        🔹 Increased lead conversion through instant engagement systems<br />
        🔹 Reduced drop-offs with automated follow-ups and reminders<br />
        🔹 Improved funnel performance with optimized GHL systems<br /><br />

        <strong>🔹 Cost Savings</strong><br />
        🔹 Reduced need for manual admin roles through automation<br />
        🔹 Lowered operational costs by replacing repetitive workflows<br />
        🔹 Built systems that scale without increasing manpower
      </p>

      <button
        onClick={onClose}
        style={{
          width: "100%",
          padding: "10px",
          background: "#2a58ff",
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