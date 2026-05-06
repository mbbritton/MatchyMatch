import { clsx } from "clsx";

export default function LivesDisplay({ lives, maxLives = 4 }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-bold tracking-wide" style={{ color: "#a78bfa" }}>
        Lives remaining
      </span>
      <div className="flex gap-2">
        {Array.from({ length: maxLives }).map((_, i) => (
          <span
            key={i}
            className={clsx(
              "text-2xl transition-all duration-300",
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
