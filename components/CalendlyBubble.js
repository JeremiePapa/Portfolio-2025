export default function CalendlyBubble({ calendlyOpen, onExpand, onCollapse }) {

  // Visible popup style
  const bubbleStyleOpen = {
    position: "fixed",
    top: "50%",
    left: "50%",
    width: "87vw",
    height: "65vh",
    transform: "translate(-50%, -50%)",
    background: "white",
    borderRadius: "20px",
    overflow: "hidden",
    zIndex: 10000,
  };

  // Hidden bubble (preloaded)
  const bubbleStyleHidden = {
    position: "fixed",
    bottom: "20px",
    right: "20px",
    width: "80px",
    height: "80px",
    borderRadius: "12px",
    overflow: "hidden",
    opacity: 0,        // invisible but loaded
    pointerEvents: "none",
    zIndex: 1,
  };

  return (
    <>
      {calendlyOpen && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.4)",
            zIndex: 9000,
          }}
          onClick={onCollapse}
        />
      )}

      <div
        style={calendlyOpen ? bubbleStyleOpen : bubbleStyleHidden}
        onClick={!calendlyOpen ? onExpand : undefined}
      >
        <iframe
          src="https://calendly.com/markjeremiepapa/30min"
          style={{
            width: "100%",
            height: "100%",
            border: "none",
          }}
        />

        {calendlyOpen && (
          <button
            onClick={onCollapse}
            style={{
              position: "absolute",
              top: 10,
              right: 10,
              padding: "6px 12px",
              background: "#2a58ff",
              color: "white",
              border: "none",
              borderRadius: "6px",
              cursor: "pointer",
              zIndex: 10001,
            }}
          >
            Close
          </button>
        )}
      </div>
    </>
  );
}
