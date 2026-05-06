import { clsx } from "clsx";

// state: "empty" | "active" | "filled" | "correct" | "present" | "absent"
export default function WordleTile({ letter = "", state = "empty", flipDelay = 0, bounce = false }) {
  const isRevealed = state === "correct" || state === "present" || state === "absent";

  const stateStyles = {
    empty:   { background: "rgba(255,255,255,0.6)",  border: "2px solid #e9d5ff", color: "#374151" },
    active:  { background: "rgba(255,255,255,0.9)",  border: "2px solid #a78bfa", color: "#374151" },
    filled:  { background: "rgba(255,255,255,0.9)",  border: "2px solid #7c3aed", color: "#374151" },
    correct: { background: "linear-gradient(135deg, #86efac, #4ade80)", border: "2px solid #22c55e", color: "#14532d" },
    present: { background: "linear-gradient(135deg, #fde68a, #fbbf24)", border: "2px solid #f59e0b", color: "#78350f" },
    absent:  { background: "linear-gradient(135deg, #d1d5db, #9ca3af)", border: "2px solid #6b7280", color: "#fff" },
  };

  return (
    <div
      className={clsx(
        "wordle-tile relative flex items-center justify-center",
        "w-14 h-14 rounded-xl select-none",
        "text-xl font-black uppercase tracking-wider",
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
