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
      img: "/workflows/FB-AI-Agent.jpg",
      short: "AI-driven workflow that responds instantly to leads and organizes data.",
      full: "This automation handles lead intake, routes data into CRM, and replies instantly.",
    },
    {
      title: "GHL Website + AI Chatbot Integration",
      img: "/workflows/GHL-Website-with-ai-chat.jpg",
      short: "High-converting website with a fully embedded AI health assistant.",
      full: "Built an optimized GoHighLevel website and integrated an AI assistant.",
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
      short: "Complete GHL sales funnel including landing page, pricing, checkout.",
      full: "This high-converting funnel streamlined onboarding and automated receipts.",
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

      {/* GRID */}
      <div className={styles.grid}>
        {works.map((item, idx) => {
          const imgs = getImages(item);
          const index = cardIndices[idx] ?? 0;

          return (
            <div
              key={item.title}
              className={styles.card}
              onClick={() => openPopup(idx)}
              onTouchStart={onTouchStart}
              onTouchEnd={(e) => onTouchEndCard(idx, e)}
            >
              <div className={styles.cardImageWrapper}>
                
                {/* Arrows only for multi-image cards */}
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

                {/* Correct fade animation ONLY if multiple images */}
                <img
                  src={imgs[index]}
                  alt={item.title}
                  className={`${styles.cardImage} ${
                    imgs.length > 1
                      ? cardAnimDirection[idx] === "left"
                        ? styles.slideFadeLeftEnter
                        : cardAnimDirection[idx] === "right"
                        ? styles.slideFadeRightEnter
                        : ""
                      : ""
                  }`}
                />
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

    </div>
  );
}
