// pages/work.js
import { useEffect, useState } from "react";
import styles from "./work.module.css";

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(null);      // selected card (popup)
  const [activeImage, setActiveImage] = useState(0);         // popup image index
  const [theme, setTheme] = useState("dark");                // theme
  const [cardIndices, setCardIndices] = useState({});        // image index per card
  const [cardAnimDirection, setCardAnimDirection] = useState({}); // animation per card
  const [popupAnimDirection, setPopupAnimDirection] = useState(null); // popup fade direction
  const [filter, setFilter] = useState("All");
  // Zoom viewer state
  const [zoomImage, setZoomImage] = useState(null);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [lastDistance, setLastDistance] = useState(null);
  

  // Load theme
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  // Prevent background scroll when popup is open
  useEffect(() => {
    document.body.style.overflow = activeIndex !== null ? "hidden" : "";
    return () => (document.body.style.overflow = "");
  }, [activeIndex]);

  // Apply theme
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (zoomImage) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [zoomImage]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Safe image getter
  const getImages = (item) => {
    if (!item) return [];
    if (Array.isArray(item.images) && item.images.length > 0) return item.images;
    if (item.img) return [item.img];
    return [];
  };

  // WORK DATA
  const works = [
    {
      title: "AI Agent Workflow – Facebook Messenger",
      category: ["n8n"],
      img: "/workflows/FB-AI-Agent.jpg",
      short: "AI-driven workflow that responds instantly to leads and organizes data.",
      full: "This automation handles lead intake, routes data into CRM, and replies instantly.",
    },
    {
      title: "GHL Website + AI Chatbot Integration",
      category: ["GoHighLevel"],
      img: "/workflows/GHL-Website-with-ai-chat.jpg",
      short: "High-converting website with a fully embedded AI health assistant.",
      full: "Built an optimized GoHighLevel website and integrated an AI assistant.",
    },
    {
      title: "GHL Sales Funnel – High-Converting Build",
      category: ["GoHighLevel"],
      images: [
        "/workflows/GHLSalesFunnel/GHLSalesFunnel.svg",
        "/workflows/GHLSalesFunnel/GHLReceipt.svg",
        "/workflows/GHLSalesFunnel/GHLPricing.svg",
        "/workflows/GHLSalesFunnel/GHLLandingPage.svg",
        "/workflows/GHLSalesFunnel/GHLCheckout.svg",
      ],
      short: "Complete GHL sales funnel including landing page, pricing, checkout.",
      full: "This high-converting funnel streamlined onboarding and automated receipts.",
    },
    {
        title: "PH Lead Generation Automation – Google Maps API",
        category: ["n8n"],
        images: [
          "/LeadGenPh.svg"
        ],
        short: "Automated Google Maps lead scraper for PH businesses using TextSearch + Place Details API.",
        full: "This automation gathers PH-based business leads (such as dental clinics and service providers) using Google Maps APIs. It automatically extracts business name, phone number, website, and Place ID for deduplication.\n\nHow it works:\n\n1. A query generator builds search terms for targeted PH cities.\n2. The Google Maps TextSearch API returns matching businesses.\n3. The Place Details API enriches each result with contact information.\n4. Custom dedupe logic prevents adding the same clinic twice.\n5. New leads are appended to Google Sheets for easy CRM import.\n6. A daily schedule keeps the lead list updated.\n\nThis workflow is designed for scalable lead generation across multiple Philippine cities."


      },
      {
        title: "AI Video Automation – Veo3 + Social Publishing",
        category: ["n8n"],
        images: [
          "/workflows/ai-video-automation.png"
        ],
        short: "Fully automated pipeline that generates AI videos and publishes to Facebook Reels and YouTube Shorts.",
        full: `This automation generates and distributes short-form video content end-to-end using n8n and AI.

      Workflow Architecture:

      1. AI Prompt Generation  
      Gemini generates structured prompts for video creation.

      2. Authentication Layer  
      JWT is created and exchanged for an access token to securely call the Veo3 API.

      3. Video Generation (Veo3)  
      The system submits the prompt and starts an asynchronous video generation job.

      4. Polling System  
      A wait-and-check loop continuously monitors the job status until completion.

      5. Validation & Error Handling  
      Ensures failed or incomplete jobs are handled safely before proceeding.

      6. Multi-Platform Publishing  
      The final video is automatically uploaded to:
      • Facebook Reels  
      • YouTube Shorts  

      Key Features:

      • Fully automated (idea → video → publish)  
      • Async-safe polling architecture  
      • Modular and scalable workflow design  
      • Ready for high-volume content generation  

      Technologies Used:

      n8n  
      Google Gemini  
      JWT Authentication  
      Veo3 API  
      Facebook Graph API  
      YouTube Data API`
      },
      {
        title: "AI Content Repurposing Automation – Zapier",
        category: ["Zapier"],
        images: [
          "/workflows/AI_content_repurposing_zapier.jpg"
        ],
        short: "AI pipeline that converts uploaded content into multiple social media posts automatically.",
        full: `This automation transforms long-form content into ready-to-publish social media posts using AI.

        The system monitors a Google Drive folder for newly uploaded media files such as videos or recordings. Once a new file is detected, the workflow automatically begins processing the content.

        Workflow architecture:

        1. Google Drive Trigger  
          Detects newly uploaded content files.

        2. File Filtering  
          Ensures only supported media types are processed.

        3. AI Transcription  
          The audio from the file is automatically transcribed into text.

        4. AI Content Generation  
          The transcription is converted into blog posts and social media content.

        5. Content Routing via Zapier Paths  
          The workflow splits into multiple distribution channels.

        6. LinkedIn Publishing  
          Automatically generates and posts a LinkedIn update.

        7. Facebook Page Publishing  
          Creates formatted Facebook posts ready for audience engagement.

        This system enables businesses to repurpose a single piece of content into multiple marketing assets without manual work.

        Key Benefits:

        • Eliminates manual content repurposing  
        • Reduces content production time  
        • Ensures consistent multi-platform publishing  
        • Scales marketing output from a single source

        Technologies Used:

        Zapier  
        AI by Zapier  
        Google Drive  
        LinkedIn API  
        Facebook Pages API`
      },
      {
        title: "Asana CRM Lead Engagement Workflow – Zapier",
        category: ["Zapier"],
        images: [
          "/workflows/Asana_CRM_Lead_Engagement_Workflow.jpg"
        ],
        short: "Automated CRM pipeline that manages lead engagement and follow-ups based on task status.",
        full: `This automation acts as a CRM engagement engine built around Asana task statuses.

        Whenever a task representing a lead is updated in Asana, the system automatically evaluates the pipeline stage and triggers the appropriate engagement workflow.

        Workflow structure:

        Trigger:
        Asana Task Updated

        The workflow then splits into multiple automation paths based on the task stage.

        Pipeline Stages:

        1. Ready to Start  
        When a lead enters the pipeline, the system automatically creates a dedicated lead folder in Google Drive and generates a new Asana task for marketing preparation.

        2. No Response  
        If a lead does not respond, the automation sends a follow-up email after a delay to re-engage the prospect.

        3. Quoted  
        When a quote is sent, the system triggers automated follow-up reminders to ensure the lead continues through the sales process.

        4. Approved  
        Once the client approves the quote, the automation retrieves the project PDF and sends a personalized onboarding email.

        5. Paid and Closed  
        When a deal closes, AI analyzes the engagement data and automatically sends a recommendation or upsell email.

        Core Automation Features:

        • Automated lead lifecycle management  
        • Intelligent email follow-up sequences  
        • CRM pipeline stage automation  
        • Document retrieval and onboarding workflows  
        • AI-powered engagement analysis

        Technologies Used:

        Zapier  
        Asana  
        Gmail  
        Google Drive  
        AI by Zapier`
      },
  ];

  // Swipe support
  let touchStartX = 0;
  const onTouchStart = (e) => (touchStartX = e.touches[0].clientX);

  const onTouchEndCard = (idx, e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) cardPrev(idx, e);
    if (diff < -50) cardNext(idx, e);
  };

  const onTouchEndPopup = (e) => {
    const diff = e.changedTouches[0].clientX - touchStartX;
    if (diff > 50) popupPrev(e);
    if (diff < -50) popupNext(e);
  };

  // CARD SLIDER
  const cardPrev = (idx, e) => {
    e.stopPropagation();
    setCardAnimDirection((p) => ({ ...p, [idx]: "right" }));
    const imgs = getImages(works[idx]);
    setCardIndices((p) => ({
      ...p,
      [idx]: (p[idx] ?? 0) === 0 ? imgs.length - 1 : (p[idx] ?? 0) - 1,
    }));
  };

  const cardNext = (idx, e) => {
    e.stopPropagation();
    setCardAnimDirection((p) => ({ ...p, [idx]: "left" }));
    const imgs = getImages(works[idx]);
    setCardIndices((p) => ({
      ...p,
      [idx]: (p[idx] ?? 0) === imgs.length - 1 ? 0 : (p[idx] ?? 0) + 1,
    }));
  };

  // POPUP
  const openPopup = (idx) => {
    setActiveIndex(idx);
    setActiveImage(cardIndices[idx] ?? 0);
  };

  const popupPrev = (e) => {
    e.stopPropagation();
    setPopupAnimDirection("right");
    const imgs = getImages(works[activeIndex]);
    setActiveImage((p) => (p === 0 ? imgs.length - 1 : p - 1));
  };

  const popupNext = (e) => {
    e.stopPropagation();
    setPopupAnimDirection("left");
    const imgs = getImages(works[activeIndex]);
    setActiveImage((p) => (p === imgs.length - 1 ? 0 : p + 1));
  };

  // Zoom handlers
  const handleWheel = (e) => {
    e.preventDefault();

    const zoomSpeed = 0.1;
    const newScale =
      e.deltaY < 0 ? scale + zoomSpeed : scale - zoomSpeed;

    setScale(Math.min(Math.max(newScale, 1), 4));
  };

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartPos({
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || scale === 1) return;

    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

    // 👇 ADD HERE (RIGHT BELOW)

    // Touch helpers
    const getDistance = (touches) => {
      const dx = touches[0].clientX - touches[1].clientX;
      const dy = touches[0].clientY - touches[1].clientY;
      return Math.sqrt(dx * dx + dy * dy);
    };

    const handleTouchStart = (e) => {
      if (e.touches.length === 1) {
        const touch = e.touches[0];
        setIsDragging(true);
        setStartPos({
          x: touch.clientX - position.x,
          y: touch.clientY - position.y,
        });
      }
    };

    const handleTouchMove = (e) => {
      if (e.touches.length === 2) {
        const dist = getDistance(e.touches);

        if (lastDistance) {
          const delta = dist - lastDistance;
          setScale((s) =>
            Math.min(Math.max(s + delta * 0.005, 1), 4)
          );
        }

        setLastDistance(dist);
      } else if (isDragging && scale > 1) {
        const touch = e.touches[0];
        setPosition({
          x: touch.clientX - startPos.x,
          y: touch.clientY - startPos.y,
        });
      }
    };

    const handleTouchEnd = () => {
      setIsDragging(false);
      setLastDistance(null);
    };
  
  // Keyboard navigation
  useEffect(() => {
    if (activeIndex === null) return;
    const handler = (e) => {
      if (e.key === "Escape") setActiveIndex(null);
      if (e.key === "ArrowLeft") popupPrev(e);
      if (e.key === "ArrowRight") popupNext(e);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [activeIndex]);

  // RENDER
  return (
    <div className={styles.page} data-theme={theme}>

      {/* Fix theme background */}
      <style jsx global>{`
        html, body { margin: 0; padding: 0; background: #0d0d16; }
        body[data-theme="light"] { background: #f5f5f5; }
      `}</style>

      <h1 className={styles.header}>My Work</h1>

      <div className={styles.topBar}>
        <button className={styles.btnPrimary} onClick={() => (window.location.href = "/")}>
          ⬅ Back to 3D Portfolio
        </button>
        <button className={styles.btnTheme} onClick={toggleTheme}>
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      <div className={styles.filterBar}>
        {["All","n8n","Zapier","GoHighLevel"].map((cat)=>(
          <button
            key={cat}
            className={`${styles.filterBtn} ${filter === cat ? styles.activeFilter : ""}`}
            onClick={()=>setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className={styles.grid}>
        {works
          .map((item, originalIndex) => ({ item, originalIndex })) // preserve index
          .filter(({ item }) => filter === "All" || item.category?.includes(filter))
          .map(({ item, originalIndex }) => {
          const imgs = getImages(item);
          const index = cardIndices[originalIndex] ?? 0;

          return (
            <div
              key={item.title}
              className={styles.card}
              onClick={() => openPopup(originalIndex)}
              onTouchStart={onTouchStart}
              onTouchEnd={(e) => onTouchEndCard(originalIndex, e)}
            >
              <div className={styles.cardImageWrapper}>
                
                {imgs.length > 1 && (
                  <button
                    className={styles.cardArrowLeft}
                    onClick={(e) => cardPrev(originalIndex, e)}
                  >
                    ‹
                  </button>
                )}

                {imgs.length > 1 && (
                  <button
                    className={styles.cardArrowRight}
                    onClick={(e) => cardNext(originalIndex, e)}
                  >
                    ›
                  </button>
                )}

                <img
                  src={imgs[index]}
                  alt={item.title}
                  className={`${styles.cardImage} ${
                    imgs.length > 1
                      ? cardAnimDirection[originalIndex] === "left"
                        ? styles.slideFadeLeftEnter
                        : cardAnimDirection[originalIndex] === "right"
                        ? styles.slideFadeRightEnter
                        : ""
                      : ""
                  }`}
                />
              </div>

              <h3>{item.title}</h3>

              {item.category && (
                <span className={styles.category}>{item.category}</span>
              )}

              <p className={styles.cardText}>{item.short}</p>
            </div>
          );
        })}
      </div>

      {/* POPUP */}
      {activeIndex !== null && (
        <div className={styles.popupOverlay} onClick={() => setActiveIndex(null)}>
          <div className={styles.popupBox} onClick={(e) => e.stopPropagation()}>

            <h2>{works[activeIndex].title}</h2>

            <div
              className={styles.popupImageArea}
              onTouchStart={onTouchStart}
              onTouchEnd={onTouchEndPopup}
            >
              {getImages(works[activeIndex]).length > 1 && (
                <button className={styles.popupArrowLeft} onClick={popupPrev}>‹</button>
              )}

              {/* Popup fade animation */}
              <img
                key={activeImage}
                src={getImages(works[activeIndex])[activeImage]}
                onClick={() => {
                  setZoomImage(getImages(works[activeIndex])[activeImage]);
                  setScale(1);
                  setPosition({ x: 0, y: 0 });
                }}
                style={{ cursor: "zoom-in" }}
                className={`${styles.popupImage} ${
                  popupAnimDirection === "left"
                    ? styles.slideFadeLeftEnter
                    : styles.slideFadeRightEnter
                }`}
              />

              {getImages(works[activeIndex]).length > 1 && (
                <button className={styles.popupArrowRight} onClick={popupNext}>›</button>
              )}
            </div>

            {/* Thumbnails */}
            <div className={styles.thumbRow}>
              {getImages(works[activeIndex]).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  className={`${styles.thumb} ${
                    i === activeImage ? styles.activeThumb : ""
                  }`}
                  onClick={() => setActiveImage(i)}
                />
              ))}
            </div>

            <p className={styles.popupText}>{works[activeIndex].full}</p>

            <div className={styles.popupButtons}>
              <button className={styles.btnPrimary} onClick={() => (window.location.href = "/")}>
                ⬅ Back to 3D Portfolio
              </button>
              <button className={styles.btnTheme} onClick={() => setActiveIndex(null)}>
                Close
              </button>
            </div>
            
          </div>
        </div>
        
      )}
              {zoomImage && (
                <div
                  onWheel={handleWheel}
                  onMouseMove={handleMouseMove}
                  onMouseUp={handleMouseUp}
                  onMouseLeave={handleMouseUp}
                  onClick={(e) => {
                    if (!isDragging) setZoomImage(null);
                  }}

                  // ✅ ADD MOBILE SUPPORT
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}

                  style={{
                    position: "fixed",
                    top: 0,
                    left: 0,
                    width: "100vw",
                    height: "100vh",
                    background: "rgba(0,0,0,0.9)",
                    backdropFilter: "blur(8px)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 9999,
                    overflow: "hidden",
                    cursor: isDragging ? "grabbing" : "grab",
                  }}
                >
                  <img
                    src={zoomImage}
                    onMouseDown={(e) => {
                      e.stopPropagation();
                      handleMouseDown(e);
                    }}
                    onClick={(e) => e.stopPropagation()}

                    // 👇 ADD THIS LINE
                    onDoubleClick={() => {
                      setScale(1);
                      setPosition({ x: 0, y: 0 });
                    }}

                    draggable={false}
                    style={{
                      transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
                      transition: isDragging ? "none" : "transform 0.1s ease",
                      userSelect: "none",

                      maxWidth: "calc(100vw - 40px)",
                      maxHeight: "calc(100vh - 40px)",
                      objectFit: "contain",
                      borderRadius: "12px",
                      boxShadow: "0 0 40px rgba(0,0,0,0.8)",
                    }}
                  />
                </div>
              )}
    </div>
    
  );
  
}
