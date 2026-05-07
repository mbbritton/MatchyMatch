import { clsx } from "clsx";

export default function Tile({ word, isSelected, isRevealed, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={isRevealed}
      aria-pressed={isSelected}
      className={clsx(
        "tile-transition relative flex items-center justify-center rounded-2xl",
        "text-[11px] font-bold tracking-widest uppercase cursor-pointer select-none",
        "h-[60px] sm:h-[66px] w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-violet-400/40",
        { "opacity-0 pointer-events-none": isRevealed }
      )}
      style={
        isSelected
          ? {
              background: "linear-gradient(145deg, rgba(244,114,182,0.22) 0%, rgba(167,139,250,0.28) 100%)",
              border: "1.5px solid rgba(167,139,250,0.65)",
              color: "#e9d5ff",
              boxShadow:
                "0 0 0 1px rgba(167,139,250,0.25), 0 4px 16px rgba(167,139,250,0.2), inset 0 1px 0 rgba(255,255,255,0.12)",
              transform: "scale(0.95)",
            }
          : {
              background: "rgba(255,255,255,0.045)",
              border: "1px solid rgba(255,255,255,0.08)",
              color: "var(--text-secondary)",
              boxShadow: "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)",
            }
      }
      onMouseEnter={(e) => {
        if (!isSelected && !isRevealed) {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.16)";
          e.currentTarget.style.color = "var(--text-primary)";
          e.currentTarget.style.transform = "translateY(-2px) scale(1.01)";
          e.currentTarget.style.boxShadow =
            "0 8px 24px rgba(0,0,0,0.45), inset 0 1px 0 rgba(255,255,255,0.1)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !isRevealed) {
          e.currentTarget.style.background = "rgba(255,255,255,0.045)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.08)";
          e.currentTarget.style.color = "var(--text-secondary)";
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow =
            "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.06)";
        }
      }}
    >
      {/* Subtle inner highlight */}
      {!isSelected && (
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "inherit",
            background: "linear-gradient(180deg, rgba(255,255,255,0.04) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
      )}
      <span style={{ position: "relative", zIndex: 1, letterSpacing: "0.1em" }}>
        {word}
      </span>
    </button>
  );
}
