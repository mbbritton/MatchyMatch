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
      background: "linear-gradient(135deg, rgba(122,171,138,0.40), rgba(80,150,110,0.35))",
      border: "1.5px solid rgba(100,160,120,0.55)",
      color: "#1a5c35",
    };
    if (s === "present") return {
      background: "linear-gradient(135deg, rgba(212,168,67,0.35), rgba(200,140,40,0.30))",
      border: "1.5px solid rgba(212,168,67,0.55)",
      color: "#7a5200",
    };
    if (s === "absent") return {
      background: "rgba(200,180,170,0.22)",
      border: "1.5px solid rgba(180,140,120,0.20)",
      color: "var(--text-muted)",
    };
    return {
      background: "rgba(255,255,255,0.72)",
      border: "1.5px solid rgba(180,120,100,0.18)",
      color: "var(--text-secondary)",
      boxShadow: "0 2px 6px rgba(140,80,60,0.07)",
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
                  "rounded-xl font-bold uppercase",
                  "flex items-center justify-center",
                  "transition-all duration-150 active:scale-95 cursor-pointer",
                  isWide ? "px-2 text-xs min-w-[56px] h-14" : "w-10 h-14 text-sm p-0"
                )}
                style={stateStyle(key)}
                onMouseEnter={(e) => {
                  const s = letterStates[key];
                  if (!s) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.95)";
                    e.currentTarget.style.borderColor = "rgba(232,96,122,0.35)";
                    e.currentTarget.style.color = "var(--accent-rose)";
                  }
                }}
                onMouseLeave={(e) => {
                  const s = letterStates[key];
                  if (!s) {
                    e.currentTarget.style.background = "rgba(255,255,255,0.72)";
                    e.currentTarget.style.borderColor = "rgba(180,120,100,0.18)";
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
