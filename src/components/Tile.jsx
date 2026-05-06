import { clsx } from "clsx";

export default function Tile({ word, isSelected, isRevealed, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={isRevealed}
      className={clsx(
        "tile-transition relative flex items-center justify-center rounded-2xl",
        "text-xs font-bold tracking-widest uppercase cursor-pointer select-none",
        "h-16 w-full focus:outline-none focus-visible:ring-2",
        "focus-visible:ring-violet-500/50",
        {
          "opacity-0 pointer-events-none": isRevealed,
        }
      )}
      style={
        isSelected
          ? {
              background: "linear-gradient(135deg, rgba(240,98,146,0.25), rgba(156,111,239,0.25))",
              border: "1px solid rgba(156,111,239,0.6)",
              color: "#e2d9ff",
              boxShadow: "0 0 0 1px rgba(156,111,239,0.3), inset 0 1px 0 rgba(255,255,255,0.08)",
              transform: "scale(0.96)",
            }
          : {
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.09)",
              color: "var(--text-secondary)",
              boxShadow: "0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)",
            }
      }
      onMouseEnter={(e) => {
        if (!isSelected && !isRevealed) {
          e.currentTarget.style.background = "rgba(255,255,255,0.08)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.15)";
          e.currentTarget.style.color = "var(--text-primary)";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !isRevealed) {
          e.currentTarget.style.background = "rgba(255,255,255,0.05)";
          e.currentTarget.style.borderColor = "rgba(255,255,255,0.09)";
          e.currentTarget.style.color = "var(--text-secondary)";
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)";
        }
      }}
    >
      {word}
    </button>
  );
}
