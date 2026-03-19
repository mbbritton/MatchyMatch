import { clsx } from "clsx";

export default function LivesDisplay({ lives, maxLives = 4 }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-600 font-medium">Mistakes remaining:</span>
      <div className="flex gap-1.5">
        {Array.from({ length: maxLives }).map((_, i) => (
          <div
            key={i}
            className={clsx(
              "w-4 h-4 rounded-full transition-all duration-300",
              i < lives ? "bg-gray-800 scale-100" : "bg-gray-300 scale-75"
            )}
          />
        ))}
      </div>
    </div>
  );
}
