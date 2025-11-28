import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import Head from "next/head"
import styles from "../styles/globalStyles"

const Globe = dynamic(() => import("../components/globe"), { ssr: false })
const AboutPopup = dynamic(() => import("../components/AboutPopup"), { ssr: false })
const SkillsPopup = dynamic(() => import("../components/SkillsPopup"), { ssr: false })
const CalendlyBubble = dynamic(() => import("../components/CalendlyBubble"), { ssr: false })
const ExperiencePopup = dynamic(() => import("../components/ExperiencePopup"), { ssr: false })
const ToolsPopup = dynamic(() => import("../components/ToolsPopup"), { ssr: false })

export default function Home() {
  const [showAbout, setShowAbout] = useState(false)
  const [showSkills, setShowSkills] = useState(false)
  const [showExperience, setShowExperience] = useState(false)
  const [showTools, setShowTools] = useState(false)
  const [globeSize, setGlobeSize] = useState(1)

  // FIX: Missing Calendly state
  const [calendlyOpen, setCalendlyOpen] = useState(false)

  // EXPAND Calendly
  const expandCalendly = () => {
  setCalendlyOpen(true);
};

const collapseCalendly = () => {
  setCalendlyOpen(false);
};

  // Responsive globe size
  useEffect(() => {
    const resize = () => {
      const w = window.innerWidth
      let scale = 1

      if (w < 480) scale = 0.6      // mobile
      else if (w < 768) scale = 0.75  // tablet
      else scale = 1.2               // desktop

      setGlobeSize(scale)

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
      </Head>

      {/* BACKGROUND */}
      <div style={styles.backgroundLayer}></div>

      {/* 3D CANVAS */}
      <div style={styles.canvasLayer}>
        <Globe
          size={globeSize}
          isPopupOpen={
            showAbout ||
            showSkills ||
            showExperience ||
            showTools
          }
          onAbout={() => setShowAbout(true)}
          onSkills={() => setShowSkills(true)}
          onExperience={() => setShowExperience(true)}
          onTools={() => setShowTools(true)}
          onSchedule={expandCalendly}
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

      {showSkills && (
        <div style={styles.popupOverlay} onClick={() => setShowSkills(false)}>
          <div style={styles.aboutPopup} onClick={(e) => e.stopPropagation()}>
            <SkillsPopup onClose={() => setShowSkills(false)} />
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


      {/* Calendly Floating Bubble */}
      <CalendlyBubble
        calendlyOpen={calendlyOpen}
        onExpand={expandCalendly}
        onCollapse={collapseCalendly}
      />
    </>
  )
}
