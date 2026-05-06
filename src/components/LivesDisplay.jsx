import { clsx } from "clsx";

export default function LivesDisplay({ lives, maxLives = 4 }) {
  return (
    <div className="flex flex-col items-center gap-2.5">
      <span
        className="text-xs font-semibold tracking-[0.12em] uppercase"
        style={{ color: "var(--text-muted)" }}
      >
        Lives remaining
      </span>
      <div className="flex gap-2 items-center">
        {Array.from({ length: maxLives }).map((_, i) => {
          const alive = i < lives;
          return (
            <div
              key={i}
              className="transition-all duration-300"
              style={{
                width: 10,
                height: 10,
                borderRadius: "50%",
                background: alive
                  ? "linear-gradient(135deg, #f06292, #9c6fef)"
                  : "rgba(255,255,255,0.1)",
                boxShadow: alive
                  ? "0 0 8px rgba(156,111,239,0.6)"
                  : "none",
                transform: alive ? "scale(1)" : "scale(0.75)",
              }}
            />
          );
        })}
      </div>
    </div>
  );
}
