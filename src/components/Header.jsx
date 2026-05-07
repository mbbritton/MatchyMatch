export default function Header({ activeGame, onGameChange }) {
  return (
    <header
      style={{
        background: "rgba(253, 246, 240, 0.88)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderBottom: "1.5px solid rgba(210, 150, 160, 0.22)",
        boxShadow: "0 2px 16px rgba(232, 96, 122, 0.07)",
      }}
      className="w-full sticky top-0 z-40"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

        {/* Wordmark */}
        <h1
          className="font-display select-none leading-none shrink-0 min-w-0 italic"
          style={{
            fontSize: "clamp(1.4rem, 4vw, 1.85rem)",
            background: "linear-gradient(135deg, #e8607a 0%, #b07ec8 55%, #7aaa8a 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            letterSpacing: "-0.01em",
          }}
        >
          {activeGame === "matchy" ? "🌸 Matchy Match" : "🌿 Wordle-ish"}
        </h1>

        {/* Game switcher — segmented pill */}
        <nav className="seg-control" role="tablist" aria-label="Game switcher">
          {[
            { id: "matchy", label: "Matchy", icon: "🌸" },
            { id: "wordle", label: "Wordle", icon: "🌿" },
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
