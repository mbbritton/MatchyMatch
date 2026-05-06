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
      <div className="max-w-2xl mx-auto px-6 py-4 flex items-center justify-between gap-4">

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

        {/* Game switcher — segmented control */}
        <div
          className="flex p-1 rounded-xl"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.09)",
          }}
        >
          {[
            { id: "matchy", label: "Matchy", icon: "◈" },
            { id: "wordle", label: "Wordle", icon: "⬛" },
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
                        boxShadow: "0 2px 10px rgba(156,111,239,0.45)",
                      }
                    : {
                        background: "transparent",
                        color: "rgba(155,147,196,0.55)",
                      }
                }
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 cursor-pointer select-none"
              >
                <span style={{ fontSize: "12px", lineHeight: 1 }}>{icon}</span>
                {label}
              </button>
            );
          })}
        </div>

      </div>
    </header>
  );
}
