import { clsx } from "clsx";

const ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"],
];

export default function WordleKeyboard({ onKey, letterStates = {} }) {
  const stateStyle = (key) => {
    const s = letterStates[key];
    if (s === "correct") return {
      background: "linear-gradient(135deg, rgba(52,211,153,0.3), rgba(16,185,129,0.3))",
      border: "1px solid rgba(52,211,153,0.5)",
      color: "#6ee7b7",
    };
    if (s === "present") return {
      background: "linear-gradient(135deg, rgba(251,191,36,0.25), rgba(245,158,11,0.25))",
      border: "1px solid rgba(251,191,36,0.45)",
      color: "#fde68a",
    };
    if (s === "absent") return {
      background: "rgba(255,255,255,0.04)",
      border: "1px solid rgba(255,255,255,0.06)",
      color: "var(--text-muted)",
    };
    return {
      background: "rgba(255,255,255,0.06)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "var(--text-secondary)",
    };
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-sm mx-auto select-none">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1.5 justify-center">
          {row.map((key) => {
            const isWide = key === "ENTER" || key === "⌫";
            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={clsx(
                  "rounded-xl font-semibold uppercase",
                  "flex items-center justify-center",
                  "transition-all duration-150 active:scale-95 cursor-pointer",
                  isWide ? "px-2 text-xs min-w-[56px] h-14" : "w-10 h-14 text-sm p-0"
                )}
                style={stateStyle(key)}
                onMouseEnter={(e) => {
                  const s = letterStates[key];
                  if (!s) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                    e.currentTarget.style.color = "var(--text-primary)";
                  }
                }}
                onMouseLeave={(e) => {
                  const s = letterStates[key];
                  if (!s) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                    e.currentTarget.style.color = "var(--text-secondary)";
                  }
                }}
              >
                {key}
              </button>
            );
          })}
        </div>
      ))}
    </div>
  );
}
