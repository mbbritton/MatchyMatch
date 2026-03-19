import { clsx } from "clsx";

export default function LivesDisplay({ lives, maxLives = 4 }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-bold" style={{ color: "#a78bfa" }}>Mistakes remaining:</span>
      <div className="flex gap-1">
        {Array.from({ length: maxLives }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              "text-lg transition-all duration-300",
              i < lives ? "opacity-100 scale-100" : "opacity-20 scale-75 grayscale"
            )}
          >
            💜
          </span>
        ))}
      </div>
    </div>
  );
}
