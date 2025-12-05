import { useState, useRef, useEffect } from "react";

export default function ToolsPopup({ onClose }) {
  
  const rawTools = {
    AI: [
      { name: "ChatGPT", logo: "chatgpt-6.svg", desc: "AI assistant for content, coding, and workflows." },
      { name: "Google Gemini", logo: "Google-gemini-icon.webp", desc: "Multimodal AI for creative and analytical tasks." },
      { name: "Claude", logo: "claude-logo.svg", desc: "Advanced AI model for deep reasoning and writing." },
    ],

    Design: [
      { name: "Photoshop", logo: "adobe-photoshop-2.svg", desc: "Design, banners, and image editing." },
    ],

    Development: [
      { name: "GitHub", logo: "github-icon-1.svg", desc: "Version control and software collaboration platform." },
      { name: "Kali Linux", logo: "kali-1.svg", desc: "Security testing and penetration tools." },
      { name: "Next.js", logo: "next-js.svg", desc: "Framework for routing, APIs, and SSR." },
      { name: "PowerShell", logo: "powershell.svg", desc: "Windows-based automation and scripting." },
      { name: "React Three Fiber (R3F)", logo: "react-2.svg", desc: "React renderer for Three.js scenes." },
      { name: "Terminal", logo: "terminal.webp", desc: "System & development command-line tool." },
      { name: "Three.js", logo: "threejs-1.svg", desc: "3D graphics rendering engine." },
      { name: "VS Code", logo: "visual-studio-code-1.svg", desc: "Editor for React, Next.js, and automation." },
    ],

    Automation: [
      { name: "GoHighLevel (GHL)", logo: "GHL.svg", desc: "CRM, funnels, pipelines, automations, and AI workflows." },
      { name: "Google Drive", logo: "drive-google.svg", desc: "Cloud storage integrated with automation processes." },
      { name: "Google Forms", logo: "google-forms.svg", desc: "Lead capture integrated into automation flows." },
      { name: "Google Sheets", logo: "google-sheets-logo-icon.svg", desc: "Tracking, organizing data, automation triggers." },
      { name: "n8n", logo: "n8n.webp", desc: "Automation workflows and API integrations." },
      { name: "Pipedrive CRM", logo: "pipedrive.webp", desc: "Sales pipeline, leads, and workflow triggers." },
    ],

    Communication: [
      { name: "Facebook", logo: "facebook.svg", desc: "Lead sources and automation messaging." },
      { name: "Slack", logo: "slack-new-logo.svg", desc: "Team communication, alerts, and AI assistants." },
      { name: "Telegram", logo: "telegram.svg", desc: "Messaging platform for alerts and integrations." },
    ],
  };

  // ⭐ Scroll reference
  const scrollRef = useRef(null);

  // ⭐ Sort each category alphabetically
  const sortedTools = Object.fromEntries(
    Object.entries(rawTools).map(([category, items]) => [
      category,
      items.slice().sort((a, b) => a.name.localeCompare(b.name)),
    ])
  );

  // ⭐ Build ALL category sorted alphabetically
  const ALL_ITEMS = Object.values(sortedTools)
    .flat()
    .filter((item, index, arr) => index === arr.findIndex((x) => x.name === item.name))
    .sort((a, b) => a.name.localeCompare(b.name));

  const categories = ["All", ...Object.keys(sortedTools)];

  const [activeCategory, setActiveCategory] = useState("All");

  const getToolsForCategory = () =>
    activeCategory === "All" ? ALL_ITEMS : sortedTools[activeCategory];

  // ⭐ Reset scroll on category change
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0;
    }
  }, [activeCategory]);

  // ----- UI STYLES -----

  const popupStyle = {
    background: "rgba(113, 113, 113, 0.8)",
    border: "5px solid rgba(255, 255, 255, 0.64)",
    padding: "30px",
    borderRadius: "20px",
    width: "320px",
    color: "white",
    backdropFilter: "blur(10px)",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
  };

  const tabStyle = (category) => ({
    padding: "8px 14px",
    margin: "0 6px 10px",
    borderRadius: "8px",
    cursor: "pointer",
    background: activeCategory === category ? "#2a58ff" : "rgba(255,255,255,0.15)",
    color: activeCategory === category ? "white" : "#ddd",
    border: "none",
    fontSize: "13px",
  });

  const toolRow = {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    marginBottom: "15px",
  };

  const logoStyle = {
    width: "50px",
    height: "100px",
    borderRadius: "5px",
    objectFit: "contain",
  };

  // ----- RENDER -----

  return (
    <div style={popupStyle}>
      <h2 style={{ marginBottom: "15px" }}>My Tools</h2>

      <div style={{ marginBottom: "15px", display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
        {categories.map((cat) => (
          <button
            key={cat}
            style={tabStyle(cat)}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ⭐ Scrollable tools container */}
      <div
        ref={scrollRef}
        style={{
          textAlign: "left",
          maxHeight: "300px",
          overflowY: "auto",
          paddingRight: 5,
        }}
      >
        {getToolsForCategory().map((tool) => (
          <div key={tool.name} style={toolRow}>
            {tool.logo && (
              <img src={`/logos/${tool.logo}`} alt={tool.name} style={logoStyle} />
            )}
            <div>
              <strong>{tool.name}</strong>
              <p style={{ fontSize: "13px", marginTop: "3px", color: "#e0e0e0" }}>
                {tool.desc}
              </p>
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={onClose}
        style={{
          marginTop: "20px",
          padding: "10px 20px",
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
