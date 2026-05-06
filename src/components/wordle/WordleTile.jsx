import { clsx } from "clsx";

// state: "empty" | "active" | "filled" | "correct" | "present" | "absent"
export default function WordleTile({ letter = "", state = "empty", flipDelay = 0, bounce = false }) {
  const isRevealed = state === "correct" || state === "present" || state === "absent";

  const stateStyles = {
    empty: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.09)",
      color: "transparent",
    },
    active: {
      background: "rgba(255,255,255,0.03)",
      border: "1px solid rgba(255,255,255,0.15)",
      color: "var(--text-primary)",
    },
    filled: {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(156,111,239,0.5)",
      color: "var(--text-primary)",
    },
    correct: {
      background: "linear-gradient(135deg, rgba(52,211,153,0.25), rgba(16,185,129,0.25))",
      border: "1px solid rgba(52,211,153,0.5)",
      color: "#6ee7b7",
    },
    present: {
      background: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(245,158,11,0.2))",
      border: "1px solid rgba(251,191,36,0.45)",
      color: "#fde68a",
    },
    absent: {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.07)",
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
      }}
    >
      {letter}
    </div>
  );
}
