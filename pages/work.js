// pages/work.js
import { useEffect, useState } from "react";
import styles from "./work.module.css";

export default function Work() {
  const [activeIndex, setActiveIndex] = useState(null);
  const [activeImage, setActiveImage] = useState(0);
  const [theme, setTheme] = useState("dark");
  const [cardIndices, setCardIndices] = useState({});

  // Load theme once
  useEffect(() => {
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);

  // Apply theme
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  // Utility to get images
  const getImages = (item) => {
    if (item.images?.length) return item.images;
    if (item.img) return [item.img];
    return [];
  };

  // Work data
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
    {
      title: "GHL Sales Funnel – High-Converting Build",
      images: [
        "/workflows/GHLSalesFunnel/GHLSalesFunnel.svg",
        "/workflows/GHLSalesFunnel/GHLReceipt.svg",
        "/workflows/GHLSalesFunnel/GHLPricing.svg",
        "/workflows/GHLSalesFunnel/GHLLandingPage.svg",
        "/workflows/GHLSalesFunnel/GHLCheckout.svg",
      ],

      short:
        "Complete GHL sales funnel including landing page, pricing, checkout, and automated receipt.",
      full:
        "This high-converting funnel streamlined onboarding, automated receipts, handled order verification, and boosted conversions while reducing hours of manual work.",
    },
  ];

  // Card slider controls
  const cardPrev = (idx, e) => {
    e.stopPropagation();
    const imgs = getImages(works[idx]);
    setCardIndices((prev) => ({
      ...prev,
      [idx]: (prev[idx] ?? 0) === 0 ? imgs.length - 1 : (prev[idx] ?? 0) - 1,
    }));
  };

  const cardNext = (idx, e) => {
    e.stopPropagation();
    const imgs = getImages(works[idx]);
    setCardIndices((prev) => ({
      ...prev,
      [idx]: (prev[idx] ?? 0) === imgs.length - 1 ? 0 : (prev[idx] ?? 0) + 1,
    }));
  };

  // Open popup
  const openPopup = (idx) => {
    setActiveIndex(idx);
    setActiveImage(cardIndices[idx] ?? 0);
  };

  // Popup arrows
  const popupPrev = (e) => {
    e.stopPropagation();
    const imgs = getImages(works[activeIndex]);
    setActiveImage((prev) => (prev === 0 ? imgs.length - 1 : prev - 1));
  };

  const popupNext = (e) => {
    e.stopPropagation();
    const imgs = getImages(works[activeIndex]);
    setActiveImage((prev) => (prev === imgs.length - 1 ? 0 : prev + 1));
  };

  // Keyboard support
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

  return (
    <div className={styles.page} data-theme={theme}>
      <h1 className={styles.header}>My Work</h1>

      {/* TOP BAR */}
      <div className={styles.topBar}>
        <button className={styles.btnPrimary} onClick={() => (window.location.href = "/")}>
          ⬅ Back to 3D Portfolio
        </button>

        <button className={styles.btnTheme} onClick={toggleTheme}>
          {theme === "dark" ? "🌞 Light Mode" : "🌙 Dark Mode"}
        </button>
      </div>

      {/* CARDS GRID */}
      <div className={styles.grid}>
        {works.map((item, idx) => {
          const imgs = getImages(item);
          const index = cardIndices[idx] ?? 0;

          return (
            <div key={item.title} className={styles.card} onClick={() => openPopup(idx)}>
              <div className={styles.cardImageWrapper}>
                {imgs.length > 1 && (
                  <button className={styles.cardArrowLeft} onClick={(e) => cardPrev(idx, e)}>
                    ‹
                  </button>
                )}

                {imgs.length > 1 && (
                  <button className={styles.cardArrowRight} onClick={(e) => cardNext(idx, e)}>
                    ›
                  </button>
                )}

                <img src={imgs[index]} className={styles.cardImage} />
              </div>

              <h3>{item.title}</h3>
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

            {/* POPUP IMAGE AREA */}
            <div className={styles.popupImageArea}>

              {getImages(works[activeIndex]).length > 1 && (
                <button className={styles.popupArrowLeft} onClick={popupPrev}>
                  ‹
                </button>
              )}

              <img
                src={getImages(works[activeIndex])[activeImage]}
                className={styles.popupImage}
              />

              {getImages(works[activeIndex]).length > 1 && (
                <button className={styles.popupArrowRight} onClick={popupNext}>
                  ›
                </button>
              )}

            </div>


            {/* THUMBNAILS */}
            <div className={styles.thumbRow}>
              {getImages(works[activeIndex]).map((url, i) => (
                <img
                  key={i}
                  src={url}
                  className={`${styles.thumb} ${i === activeImage ? styles.activeThumb : ""}`}
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
    </div>
  );
}
