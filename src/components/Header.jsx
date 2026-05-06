
�
�export default function Header({ activeGame, onGameChange }) {
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
      <div className="max-w-2xl mx-auto px-6 py-5 flex flex-col items-center gap-5">

        {/* Wordmark */}
        <div className="flex flex-col items-center gap-1">
          <h1
            className="font-display select-none tracking-tight leading-none"
            style={{
              fontSize: "clamp(2rem, 6vw, 2.75rem)",
              background: "linear-gradient(135deg, #f06292 0%, #9c6fef 50%, #5b9cf6 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            {activeGame === "matchy" ? "Matchy Match" : "Wordle-ish"}
          </h1>
          <p
            className="text-xs font-semibold tracking-[0.18em] uppercase"
            style={{ color: "var(--text-muted)" }}
          >
            {activeGame === "matchy"
              ? "Find the four groups"
              : "Guess the five-letter word"}
          </p>
        </div>

        {/* Game switcher — segmented pill */}
        <div
          className="flex gap-1.5 p-1.5 rounded-full"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          {[
            { id: "matchy", label: "Matchy Match", icon: "◈" },
            { id: "wordle", label: "Wordle-ish",   icon: "⬛" },
          ].map(({ id, label, icon }) => {
            const active = activeGame === id;
            return (
              <button
                key={id}
                onClick={() => onGameChange(id)}
                style={
                  active
                    ? {
                        background: "linear-gradient(135deg, #f06292, #9c6fef)",
                        color: "#fff",
                        boxShadow: "0 2px 12px rgba(156,111,239,0.4)",
                      }
                    : {
                        background: "transparent",
                        color: "var(--text-muted)",
                      }
                }
                className="flex items-center gap-2.5 px-6 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 cursor-pointer select-none"
              >
                <span style={{ fontSize: "13px" }}>{icon}</span>
                {label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
