export default function Header({ activeGame, onGameChange }) {
  return (
    <header
      style={{
        background: "rgba(13,13,18,0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255,255,255,0.07)",
      }}
      className="w-full sticky top-0 z-40"
    >
      <div className="max-w-2xl mx-auto px-6 sm:px-8 py-4 flex items-center justify-between gap-6">

        {/* Wordmark */}
        <h1
          className="font-display select-none tracking-tight leading-none shrink-0"
          style={{
            fontSize: "clamp(1.4rem, 4vw, 1.85rem)",
            background: "linear-gradient(135deg, #f06292 0%, #9c6fef 50%, #5b9cf6 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}
        >
          {activeGame === "matchy" ? "Matchy Match" : "Wordle-ish"}
        </h1>

        {/* Game switcher — segmented pill */}
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
