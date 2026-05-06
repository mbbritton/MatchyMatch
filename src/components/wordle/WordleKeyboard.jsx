import { clsx } from "clsx";

const ROWS = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"],
];

// letterStates: { [letter]: "correct" | "present" | "absent" | undefined }
export default function WordleKeyboard({ onKey, letterStates = {} }) {
  const stateStyle = (key) => {
    const s = letterStates[key];
    if (s === "correct") return { background: "linear-gradient(135deg, #86efac, #4ade80)", color: "#14532d", border: "none" };
    if (s === "present") return { background: "linear-gradient(135deg, #fde68a, #fbbf24)", color: "#78350f", border: "none" };
    if (s === "absent")  return { background: "linear-gradient(135deg, #d1d5db, #9ca3af)", color: "#fff",    border: "none" };
    return {};
  };

  return (
    <div className="flex flex-col items-center gap-1.5 w-full max-w-sm mx-auto select-none">
      {ROWS.map((row, ri) => (
        <div key={ri} className="flex gap-1.5 justify-center">
          {row.map((key) => {
            const isWide = key === "ENTER" || key === "⌫";
            return (
              <button
                key={key}
                onClick={() => onKey(key)}
                className={clsx(
                  "btn-outline rounded-xl font-black uppercase",
                  "flex items-center justify-center",
                  "transition-all duration-150 active:scale-95",
                  isWide ? "px-2 text-xs min-w-[52px] h-14" : "w-10 h-14 text-sm p-0"
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
