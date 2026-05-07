export default function LivesDisplay({ lives, maxLives = 5 }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <span
        style={{
          fontSize: "10px",
          fontWeight: 700,
          letterSpacing: "0.13em",
          textTransform: "uppercase",
          color: "var(--text-muted)",
        }}
      >
        Lives remaining
      </span>

      <div className="flex gap-1.5 items-center">
        {Array.from({ length: maxLives }).map((_, i) => {
          const alive = i < lives;
          return (
            <svg
              key={i}
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill={alive ? "url(#heart-grad)" : "none"}
              stroke={alive ? "none" : "rgba(255,255,255,0.15)"}
              strokeWidth="1.5"
              style={{
                transition: "all 0.35s cubic-bezier(0.34,1.56,0.64,1)",
                transform: alive ? "scale(1)" : "scale(0.75)",
                filter: alive ? "drop-shadow(0 0 6px rgba(244,114,182,0.55))" : "none",
                opacity: alive ? 1 : 0.35,
              }}
            >
              <defs>
                <linearGradient id="heart-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#f472b6" />
                  <stop offset="100%" stopColor="#a78bfa" />
                </linearGradient>
              </defs>
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
          );
        })}
      </div>
    </div>
  );
}
