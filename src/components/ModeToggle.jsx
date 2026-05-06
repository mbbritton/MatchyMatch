�export default function ModeToggle({ mode, onChange, disabled }) {
  return (
    <div className="flex items-center gap-3">
      <span
        className="text-xs font-semibold tracking-[0.12em] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        Difficulty
      </span>

      {/* Segmented control */}
      <div
        className="flex gap-1 p-0.5 rounded-full"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.08)",
        }}
      >
        {[
          { id: "normal", label: "Normal" },
          { id: "hard",   label: "Hard" },
        ].map(({ id, label }) => {
          const active = mode === id;
          return (
            <button
              key={id}
              onClick={() => onChange(id)}
              disabled={disabled}
              style={
                active
                  ? {
                      background: "linear-gradient(135deg, #f06292, #9c6fef)",
                      color: "#fff",
                      boxShadow: "0 2px 10px rgba(156,111,239,0.35)",
                    }
                  : {
                      background: "transparent",
                      color: disabled ? "var(--text-muted)" : "var(--text-secondary)",
                    }
              }
              className="px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 cursor-pointer select-none disabled:cursor-not-allowed"
            >
              {label}
            </button>
          );
        })}
      </div>

      {disabled && (
        <span
          className="text-xs italic"
          style={{ color: "var(--text-muted)" }}
        >
          locked
        </span>
      )}
    </div>
  );
}
