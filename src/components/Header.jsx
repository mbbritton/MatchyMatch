export default function Header({ activeGame, onGameChange }) {
  return (
    <header
      style={{
        background: "rgba(13,13,20,0.80)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        borderBottom: "1px solid rgba(255,255,255,0.06)",
        boxShadow: "0 1px 0 rgba(255,255,255,0.03), 0 4px 24px rgba(0,0,0,0.3)",
      }}
      className="w-full sticky top-0 z-40"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-4">

        {/* Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0 min-w-0">
          {/* Logo mark */}
          <div
            className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
            style={{
              background: "linear-gradient(135deg, #f472b6, #a78bfa)",
              boxShadow: "0 2px 10px rgba(167,139,250,0.4)",
            }}
          >
            <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
              <rect x="1" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.9"/>
              <rect x="9" y="1" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="1" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="9" y="9" width="6" height="6" rx="1.5" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <h1
            className="font-display select-none leading-none tracking-tight"
            style={{
              fontSize: "clamp(1.1rem, 3.5vw, 1.35rem)",
              background: "linear-gradient(135deg, #f472b6 0%, #a78bfa 50%, #60a5fa 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              fontWeight: 800,
            }}
          >
            {activeGame === "matchy" ? "Matchy Match" : "Wordle-ish"}
          </h1>
        </div>

        {/* Game switcher */}
        <nav className="seg-control" role="tablist" aria-label="Game switcher">
          {[
            { id: "matchy", label: "Matchy", icon: "◈" },
            { id: "wordle", label: "Wordle", icon: "⬛" },
          ].map(({ id, label, icon }) => {
            const active = activeGame === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => onGameChange(id)}
                className={`seg-control__btn${active ? " seg-control__btn--active" : ""}`}
              >
                <span className="seg-control__icon" aria-hidden="true">{icon}</span>
                <span>{label}</span>
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
