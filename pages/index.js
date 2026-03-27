import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Head from "next/head"
import styles from "../styles/globalStyles"

const Globe = dynamic(() => import("../components/globe"), {
  ssr: false,
  loading: () => (
    <div style={{
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      height: "100vh",
      fontFamily: "Poppins"
    }}>
      Loading 3D Globe...
    </div>
  )
})

const AboutPopup = dynamic(() => import("../components/AboutPopup"), { ssr: false })
const ImpactPopup = dynamic(() => import("../components/ImpactPopup"), { ssr: false })
const CalendlyBubble = dynamic(() => import("../components/CalendlyBubble"), { ssr: false })
const ExperiencePopup = dynamic(() => import("../components/ExperiencePopup"), { ssr: false })
const ToolsPopup = dynamic(() => import("../components/ToolsPopup"), { ssr: false })

export default function Home() {
  const [showAbout, setShowAbout] = useState(false)
  const [showImpact, setShowImpact] = useState(false)
  const [showExperience, setShowExperience] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const [globeLoaded, setGlobeLoaded] = useState(false)
  const [globeSize, setGlobeSize] = useState(1)
  const [calendlyOpen, setCalendlyOpen] = useState(false)

  const expandCalendly = () => setCalendlyOpen(true)
  const collapseCalendly = () => setCalendlyOpen(false)

  // ✅ Preload images
  useEffect(() => {
    const imagesToPreload = [
      "/me.svg",
      "/logos/earth2.webp",
      "/earth2.webp",
      "/logos/chatgpt-6.svg",
      "/logos/Google-gemini-icon.webp",
      "/logos/claude-logo.svg",
      "/logos/n8n.webp",
      "/logos/react-2.svg",
      "/logos/next-js.svg",
      "/logos/visual-studio-code-1.svg",
      "/logos/slack-new-logo.svg",
      "/logos/telegram.svg",
      "/logos/github-icon-1.svg",
      "/logos/pipedrive.webp",
      "/logos/vercel.svg",
    ]

    imagesToPreload.forEach((src) => {
      const img = new Image()
      img.src = src
    })

    const texture = new Image()
    texture.src = "/earth2.webp"

    fetch("/earth2.webp")
  }, [])

  // ✅ Preload components
  useEffect(() => {
    import("../components/globe")
    AboutPopup.preload?.()
    ImpactPopup.preload?.() // ✅ FIXED
    ExperiencePopup.preload?.()
    ToolsPopup.preload?.()
  }, [])

  // Responsive globe
  useEffect(() => {
    const resize = () => {
      const w = window.innerWidth
      if (w < 480) setGlobeSize(0.6)
      else if (w < 768) setGlobeSize(0.75)
      else setGlobeSize(1)
    }

    resize()
    window.addEventListener("resize", resize)
    return () => window.removeEventListener("resize", resize)
  }, [])

  return (
    <>
      <Head>
        <link
          href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap"
          rel="stylesheet"
        />
        <link rel="preload" as="image" href="/earth2.webp" />
        <link rel="preload" as="image" href="/me.svg" />
      </Head>

      {/* BACKGROUND */}
      <div style={styles.backgroundLayer} />

      {/* 3D CANVAS */}
      <div
        style={{
          ...styles.canvasLayer,
          filter: globeLoaded ? "blur(0px)" : "blur(10px)",
          opacity: globeLoaded ? 1 : 0.4,
          transition: "filter 1s ease, opacity 1s ease",
        }}
      >
        <Globe
          size={globeSize}
          isPopupOpen={showAbout || showImpact || showExperience || showTools} // ✅ FIXED
          onAbout={() => setShowAbout(true)}
          onSkills={() => setShowImpact(true)} // ✅ keep Globe unchanged
          onExperience={() => setShowExperience(true)}
          onTools={() => setShowTools(true)}
          onSchedule={expandCalendly}
          onLoaded={() => setGlobeLoaded(true)}
        />
      </div>

      {/* POPUPS */}
      {showAbout && (
        <div style={styles.popupOverlay} onClick={() => setShowAbout(false)}>
          <div style={styles.aboutPopup} onClick={(e) => e.stopPropagation()}>
            <AboutPopup onClose={() => setShowAbout(false)} />
          </div>
        </div>
      )}

      {showImpact && (
        <div style={styles.popupOverlay} onClick={() => setShowImpact(false)}>
          <div style={styles.aboutPopup} onClick={(e) => e.stopPropagation()}>
            <ImpactPopup onClose={() => setShowImpact(false)} />
          </div>
        </div>
      )}

      {showExperience && (
        <div style={styles.popupOverlay} onClick={() => setShowExperience(false)}>
          <div style={styles.aboutPopup} onClick={(e) => e.stopPropagation()}>
            <ExperiencePopup onClose={() => setShowExperience(false)} />
          </div>
        </div>
      )}

      {showTools && (
        <div style={styles.popupOverlay} onClick={() => setShowTools(false)}>
          <div style={styles.aboutPopup} onClick={(e) => e.stopPropagation()}>
            <ToolsPopup onClose={() => setShowTools(false)} />
          </div>
        </div>
      )}

      {/* SCHEDULE */}
      <CalendlyBubble
        calendlyOpen={calendlyOpen}
        onExpand={expandCalendly}
        onCollapse={collapseCalendly}
      />
    </>
  )
}