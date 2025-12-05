export default function ImagePopup({ src, onClose }) {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        background: "rgba(0,0,0,0.7)",
        backdropFilter: "blur(4px)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 99999,
      }}
      onClick={onClose}
    >
      <img
        src={src}
        alt="Workflow Preview"
        style={{
          maxWidth: "90vw",
          maxHeight: "90vh",
          borderRadius: "12px",
          border: "3px solid white",
          boxShadow: "0 0 25px rgba(0,0,0,0.8)",
          cursor: "zoom-in",
        }}
      />
    </div>
  );
}
