export default function ModeToggle({ mode, onChange, disabled }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs font-bold" style={{ color: "#a78bfa" }}>Mode:</span>
      <div
        className="flex rounded-full p-0.5"
        style={{ background: "rgba(255,255,255,0.7)", border: "2px solid #ddd6fe" }}
      >
        <button
          onClick={() => onChange("normal")}
          disabled={disabled}
          className="px-5 py-2 rounded-full text-sm font-black whitespace-nowrap transition-all duration-200 disabled:cursor-not-allowed"
          style={
            mode === "normal"
              ? { background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)", color: "#4c1d95" }
              : { background: "transparent", color: "#a78bfa" }
          }
        >
          Normal
        </button>
        <button
          onClick={() => onChange("hard")}
          disabled={disabled}
          className="px-5 py-2 rounded-full text-sm font-black whitespace-nowrap transition-all duration-200 disabled:cursor-not-allowed"
          style={
            mode === "hard"
              ? { background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)", color: "#4c1d95" }
              : { background: "transparent", color: "#a78bfa" }
          }
        >
          Hard 🔥
        </button>
      </div>
      {disabled && (
        <span className="text-xs" style={{ color: "#d1d5db" }}>locked</span>
      )}
    </div>
  );
}
