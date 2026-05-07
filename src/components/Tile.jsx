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
        "focus-visible:ring-rose-400/50",
        {
          "opacity-0 pointer-events-none": isRevealed,
        }
      )}
      style={
        isSelected
          ? {
              background: "linear-gradient(135deg, rgba(232,96,122,0.18), rgba(155,126,200,0.18))",
              border: "2px solid rgba(232,96,122,0.55)",
              color: "#9b3a52",
              boxShadow: "0 0 0 1px rgba(232,96,122,0.25), 0 4px 16px rgba(232,96,122,0.15), inset 0 1px 0 rgba(255,255,255,0.6)",
              transform: "scale(0.96)",
            }
          : {
              background: "rgba(255,255,255,0.72)",
              border: "1.5px solid rgba(180,120,100,0.18)",
              color: "var(--text-secondary)",
              boxShadow: "0 2px 8px rgba(140,80,60,0.08), inset 0 1px 0 rgba(255,255,255,0.9)",
            }
      }
      onMouseEnter={(e) => {
        if (!isSelected && !isRevealed) {
          e.currentTarget.style.background = "rgba(255,255,255,0.92)";
          e.currentTarget.style.borderColor = "rgba(232,96,122,0.35)";
          e.currentTarget.style.color = "var(--accent-rose)";
          e.currentTarget.style.transform = "translateY(-2px)";
          e.currentTarget.style.boxShadow = "0 6px 20px rgba(232,96,122,0.14), inset 0 1px 0 rgba(255,255,255,0.9)";
        }
      }}
      onMouseLeave={(e) => {
        if (!isSelected && !isRevealed) {
          e.currentTarget.style.background = "rgba(255,255,255,0.72)";
          e.currentTarget.style.borderColor = "rgba(180,120,100,0.18)";
          e.currentTarget.style.color = "var(--text-secondary)";
          e.currentTarget.style.transform = "";
          e.currentTarget.style.boxShadow = "0 2px 8px rgba(140,80,60,0.08), inset 0 1px 0 rgba(255,255,255,0.9)";
        }
      }}
    >
      {word}
    </button>
  );
}
