// pages/work.js
import { useState, useEffect } from "react";

export default function Work() {
  const [activeItem, setActiveItem] = useState(null);
  const [theme, setTheme] = useState("dark");

  // Load saved theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  // Apply theme class to body
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const works = [
    {
      title: "AI Agent Workflow – Facebook Messenger",
      img: "/workflows/FB-AI-Agent.jpg",
      short:
        "AI-driven workflow that responds instantly to leads and organizes data.",
      full:
        "This automation handles lead intake, routes data into CRM, and replies instantly to new inquiries via AI. The client reduced manual workload by 70% and increased response speed dramatically.",
    },
    {
      title: "GHL Website + AI Chatbot Integration",
      img: "/workflows/GHL-Website-with-ai-chat.jpg",
      short:
        "High-converting website with a fully embedded AI health assistant.",
      full:
        "Built an optimized GoHighLevel website and integrated a 24/7 AI chat assistant that helps visitors book appointments, ask questions, and navigate services. The client saved countless hours on customer support.",
    },
  ];

  // THEME COLORS
  const colors = {
    dark: {
      bg: "#0d0d16",
      card: "#1a1a27",
      text: "white",
      popup: "#1a1a27",
      border: "#2a58ff",
    },
    light: {
      bg: "#f5f5f5",
      card: "white",
      text: "#111",
      popup: "white",
      border: "#2a58ff",
    },
  };

  const c = colors[theme];

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "40px 20px",
        background: c.bg,
        color: c.text,
        transition: "0.3s",
        fontFamily: "Poppins, sans-serif",
      }}
    >
        <style jsx global>{`
            html, body {
                margin: 0 !important;
                padding: 0 !important;
                background: #0d0d16 !important; /* dark mode bg */
                overflow-x: hidden !important;
            }

            body[data-theme="light"] {
                background: #f4f4f4 !important;
            }

            /* Remove any unwanted outlines or borders */
            * {
                outline: none !important;
                box-shadow: none !important;
            }
            `}</style>


      {/* HEADER */}
      <h1 style={{ textAlign: "center", marginBottom: "20px" }}>My Work</h1>

      {/* TOP ACTION BAR */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "25px",
        }}
      >
        {/* Back to 3D button */}
        <button
          onClick={() => (window.location.href = "/")}
          style={{
            padding: "10px 20px",
            background: c.border,
            border: "none",
            borderRadius: "10px",
            color: "white",
            cursor: "pointer",
          }}
        >
          ⬅ Back to 3D Portfolio
        </button>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          style={{
            padding: "10px 20px",
            background: "transparent",
            border: `2px solid ${c.border}`,
            borderRadius: "10px",
            color: c.text,
            cursor: "pointer",
          }}
        >
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* WORK GRID */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "25px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}
      >
        {works.map((item) => (
          <div
            key={item.title}
            onClick={() => setActiveItem(item)}
            style={{
              background: c.card,
              padding: "15px",
              borderRadius: "14px",
              cursor: "pointer",
              transition: "0.2s",
            }}
          >
            <img
              src={item.img}
              alt={item.title}
              style={{
                width: "100%",
                borderRadius: "10px",
                marginBottom: "10px",
              }}
            />
            <h3>{item.title}</h3>
            <p style={{ fontSize: "14px", opacity: 0.8 }}>{item.short}</p>
          </div>
        ))}
      </div>

      {/* POPUP */}
      {activeItem && (
        <div
          onClick={() => setActiveItem(null)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.55)",
            backdropFilter: "blur(4px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            zIndex: 9999,
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: c.popup,
              borderRadius: "18px",
              maxWidth: "850px",
              width: "100%",
              padding: "30px",
              color: c.text,
              boxShadow: "0 10px 40px rgba(0,0,0,0.25)",
              maxHeight: "90vh",
              overflowY: "auto",
              transition: "0.3s",
            }}
          >
            <h2>{activeItem.title}</h2>

            <img
              src={activeItem.img}
              alt={activeItem.title}
              style={{
                width: "100%",
                borderRadius: "12px",
                margin: "20px 0",
              }}
            />

            <p style={{ fontSize: "16px", lineHeight: "1.6" }}>
              {activeItem.full}
            </p>

            {/* BUTTONS */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "25px",
              }}
            >
              <button
                onClick={() => (window.location.href = "/")}
                style={{
                  padding: "10px 18px",
                  background: c.border,
                  border: "none",
                  borderRadius: "8px",
                  color: "white",
                  cursor: "pointer",
                }}
              >
                ⬅ Back to 3D Portfolio
              </button>

              <button
                onClick={() => setActiveItem(null)}
                style={{
                  padding: "10px 18px",
                  background: "transparent",
                  border: `2px solid ${c.border}`,
                  borderRadius: "8px",
                  color: c.text,
                  cursor: "pointer",
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
