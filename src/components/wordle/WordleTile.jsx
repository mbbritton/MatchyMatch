import { clsx } from "clsx";

// state: "empty" | "active" | "filled" | "correct" | "present" | "absent"
export default function WordleTile({ letter = "", state = "empty", flipDelay = 0, bounce = false }) {
  const isRevealed = state === "correct" || state === "present" || state === "absent";

  const stateStyles = {
    empty: {
      background: "rgba(255,255,255,0.65)",
      border: "1.5px solid rgba(180,120,100,0.16)",
      color: "transparent",
    },
    active: {
      background: "rgba(255,255,255,0.80)",
      border: "1.5px solid rgba(180,120,100,0.30)",
      color: "var(--text-primary)",
    },
    filled: {
      background: "rgba(255,255,255,0.85)",
      border: "1.5px solid rgba(155,126,200,0.50)",
      color: "var(--text-primary)",
    },
    correct: {
      background: "linear-gradient(135deg, rgba(122,171,138,0.35), rgba(80,150,110,0.30))",
      border: "1.5px solid rgba(100,160,120,0.55)",
      color: "#1a5c35",
    },
    present: {
      background: "linear-gradient(135deg, rgba(212,168,67,0.30), rgba(200,140,40,0.25))",
      border: "1.5px solid rgba(212,168,67,0.55)",
      color: "#7a5200",
    },
    absent: {
      background: "rgba(200,180,170,0.20)",
      border: "1.5px solid rgba(180,140,120,0.22)",
      color: "var(--text-muted)",
    },
  };

  return (
    <div
      className={clsx(
        "wordle-tile relative flex items-center justify-center",
        "w-14 h-14 rounded-xl select-none",
        "text-xl font-bold uppercase tracking-wider",
        isRevealed && "wordle-flip",
        bounce && "wordle-bounce",
      )}
      style={{
        ...stateStyles[state],
        animationDelay: isRevealed ? `${flipDelay}ms` : "0ms",
        perspective: "250px",
        boxShadow: "0 2px 8px rgba(140,80,60,0.08)",
      }}
    >
      {letter}
    </div>
  );
}
