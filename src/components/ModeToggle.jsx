export default function ModeToggle({ mode, onChange, disabled }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold" style={{ color: "#a78bfa" }}>Mode:</span>
      <button
        onClick={() => onChange("normal")}
        disabled={disabled}
        className="btn-outline"
        style={
          mode === "normal"
            ? { background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)", color: "#4c1d95", borderColor: "#f9a8d4" }
            : {}
        }
      >
        Normal
      </button>
      <button
        onClick={() => onChange("hard")}
        disabled={disabled}
        className="btn-outline"
        style={
          mode === "hard"
            ? { background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)", color: "#4c1d95", borderColor: "#f9a8d4" }
            : {}
        }
      >
        Hard 🔥
      </button>
      {disabled && (
        <span className="text-xs" style={{ color: "#d1d5db" }}>locked</span>
      )}
    </div>
  );
}
