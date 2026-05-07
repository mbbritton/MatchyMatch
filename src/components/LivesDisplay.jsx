export default function LivesDisplay({ lives, maxLives = 5 }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="text-xs font-bold tracking-[0.14em] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        Lives remaining
      </span>
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: maxLives }).map((_, i) => {
          const alive = i < lives;
          return (
            <span
              key={i}
              className="transition-all duration-300 select-none"
              style={{
                fontSize: "18px",
                lineHeight: 1,
                filter: alive
                  ? "drop-shadow(0 2px 4px rgba(232,96,122,0.35))"
                  : "grayscale(1) opacity(0.3)",
                transform: alive ? "scale(1)" : "scale(0.8)",
                display: "inline-block",
              }}
              aria-label={alive ? "life" : "lost life"}
            >
              🌸
            </span>
          );
        })}
      </div>
    </div>
  );
}
