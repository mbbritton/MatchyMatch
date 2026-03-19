import { clsx } from "clsx";

export default function Tile({ word, isSelected, isRevealed, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={isRevealed}
      className={clsx(
        "tile-transition relative flex items-center justify-center rounded-2xl",
        "text-xs font-black tracking-wider uppercase cursor-pointer select-none",
        "h-16 w-full focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-300",
        "transition-all duration-150",
        {
          "scale-95 shadow-inner": isSelected,
          "hover:-translate-y-0.5 hover:shadow-md active:scale-95": !isSelected && !isRevealed,
          "opacity-0 pointer-events-none": isRevealed,
        }
      )}
      style={isSelected
        ? { background: "linear-gradient(135deg, #f9a8d4, #c4b5fd)", color: "#4c1d95", boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)" }
        : { background: "rgba(255,255,255,0.85)", color: "#374151", boxShadow: "0 2px 6px rgba(167,139,250,0.15), 0 1px 2px rgba(0,0,0,0.06)" }
      }
    >
      {word}
    </button>
  );
}
