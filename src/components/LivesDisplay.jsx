export default function LivesDisplay({ lives, maxLives = 5 }) {
  // Flower petals: full = 🌸, lost = 🤍
  const flowers = ["🌸", "🌺", "🌼", "🌷", "💐"];

  return (
    <div className="flex flex-col items-center gap-2">
      <span
        className="text-xs font-bold tracking-[0.12em] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        Lives remaining
      </span>
      <div className="flex gap-1.5 items-center">
        {Array.from({ length: maxLives }).map((_, i) => {
          const alive = i < lives;
          const flower = flowers[i % flowers.length];
          return (
            <span
              key={i}
              className="transition-all duration-300 select-none"
              style={{
                fontSize: alive ? "1.35rem" : "1.1rem",
                opacity: alive ? 1 : 0.22,
                filter: alive ? "drop-shadow(0 2px 4px rgba(232,96,122,0.35))" : "grayscale(1)",
                transform: alive ? "scale(1)" : "scale(0.78)",
                display: "inline-block",
                lineHeight: 1,
              }}
              aria-label={alive ? "life" : "lost life"}
            >
              {alive ? flower : "🤍"}
            </span>
          );
        })}
      </div>
    </div>
  );
}
