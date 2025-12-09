const styles = {
  backgroundLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "radial-gradient(circle at center 50%, #2a58ff 0%, #0f0f34 20%, #000000 40%)",
    zIndex: 0,          // stays behind everything
    },

  canvasLayer: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    zIndex: 1,          // above background, below UI
    overflow: "hidden",
    },


  aboutPopup: {
    position: "absolute",
    right: "40px",
    top: "50%",
    transform: "translateY(-50%)",
    zIndex: 9999,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  popupOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100vw",
    height: "100vh",
    background: "rgba(0,0,0,0.3)",  // subtle dark fade (optional)
    backdropFilter: "blur(4px)",     // slight blur for nice UI
    zIndex: 9998,
    },
  // ABOUT POPUP POSITION (centered)
  aboutPopup: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
    },

// ABOUT CARD STYLING
  aboutCard: {
    background: "rgba(113, 113, 113, 0.8)",
    border: "5px solid rgba(255, 255, 255, 0.64)",
    padding: "30px",
    borderRadius: "20px",
    width: "320px",
    color: "white",
    backdropFilter: "blur(10px)",
    textAlign: "center",
    fontFamily: "Poppins, sans-serif",
    },

/* NEW — AVATAR WRAPPER (Circle frame) */
  avatarWrap: {
    width: "200px",
    height: "200px",
    borderRadius: "50%",
    overflow: "hidden",
    margin: "0 auto 15px",
    border: "5px solid #2a58ff",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "rgba(113, 113, 113, 0.8)",
  },


  /* UPDATED — AVATAR IMAGE (Inside image zooms) */
  aboutAvatar: {
    width: "140%",
    height: "140%",
    objectFit: "cover",
    objectPosition: "center 35%",
    transform: "scale(1.2)",
  },

aboutText: {
  fontSize: "15px",
  lineHeight: "1.5",
  marginBottom: "20px",
},

closeBtn: {
  padding: "10px 20px",
  background: "#2a58ff",
  border: "none",
  borderRadius: "10px",
  color: "white",
  fontSize: "15px",
  cursor: "pointer",
  transition: "0.2s",
},
aboutButton: {
  position: "absolute",
  top: "30px",
  left: "50%",
  transform: "translateX(-50%)",
  zIndex: 9999,
}
  // add more styles here later...
}

export default styles
