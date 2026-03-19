import { clsx } from "clsx";

export default function Tile({ word, isSelected, isRevealed, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={isRevealed}
      className={clsx(
        "tile-transition relative flex items-center justify-center rounded-lg",
        "text-sm font-extrabold tracking-wider uppercase cursor-pointer select-none",
        "h-16 w-full border-2 focus:outline-none",
        {
          "bg-gray-800 border-gray-800 text-white scale-95": isSelected,
          "bg-gray-100 border-gray-100 text-gray-900 hover:bg-gray-200 hover:border-gray-200 active:scale-95":
            !isSelected && !isRevealed,
          "opacity-0 pointer-events-none": isRevealed,
        }
      )}
    >
      {word}
    </button>
  );
}
