export default function Header({ activeGame, onGameChange }) {
  return (
    <header className="w-full border-b-2 border-pink-100" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
      <div className="max-w-xl mx-auto px-4 py-4 flex flex-col items-center gap-3">
        {/* Title */}
        <div className="flex flex-col items-center gap-0.5">
          <h1
            className="text-4xl font-black select-none tracking-tight"
            style={{ background: "linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
          >
            {activeGame === "matchy" ? "✨ Matchy Match ✨" : "🟩 Wordle-ish 🟩"}
          </h1>
          <p className="text-xs font-semibold text-purple-300 tracking-widest uppercase">
            {activeGame === "matchy" ? "Find the four groups!" : "Guess the 5-letter word!"}
          </p>
        </div>

        {/* Game switcher tabs */}
        <div className="flex gap-2">
          <button
            onClick={() => onGameChange("matchy")}
            className="btn-outline"
            style={
              activeGame === "matchy"
                ? { background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)", color: "#4c1d95", borderColor: "#f9a8d4" }
                : {}
            }
          >
            🃏 Matchy Match
          </button>
          <button
            onClick={() => onGameChange("wordle")}
            className="btn-outline"
            style={
              activeGame === "wordle"
                ? { background: "linear-gradient(135deg, #86efac, #4ade80)", color: "#14532d", borderColor: "#86efac" }
                : {}
            }
          >
            🟩 Wordle-ish
          </button>
        </div>
      </div>
    </header>
  );
}
