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
      background: "#34c759",
      border: "none",
      color: "#ffffff",
    };
    if (s === "present") return {
      background: "#ff9f0a",
      border: "none",
      color: "#ffffff",
    };
    if (s === "absent") return {
      background: "var(--fill-primary)",
      border: "none",
      color: "var(--label-tertiary)",
    };
    return {
      background: "var(--bg-surface)",
      border: "none",
      color: "var(--label-primary)",
      boxShadow: "var(--shadow-sm)",
    };
  };

  return (
    <div className="flex flex-col items-center gap-2 w-full max-w-sm mx-auto px-2 select-none">
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
