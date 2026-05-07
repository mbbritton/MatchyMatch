export default function Footer() {
  return (
    <footer
      className="w-full py-5 px-4 sm:px-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <div className="max-w-2xl mx-auto flex items-center justify-center gap-2">
        <span
          style={{
            fontSize: "11px",
            fontWeight: 500,
            color: "var(--text-muted)",
            letterSpacing: "0.04em",
          }}
        >
          Co-created by
        </span>
        <span
          style={{
            fontSize: "11px",
            fontWeight: 700,
            background: "linear-gradient(135deg, #f472b6, #a78bfa)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "0.02em",
          }}
        >
          Mackenzie Bright &amp; Forge
        </span>
        <span
          aria-hidden="true"
          style={{ fontSize: "11px", color: "var(--text-faint)" }}
        >
          ✦
        </span>
      </div>
    </footer>
  );
}
