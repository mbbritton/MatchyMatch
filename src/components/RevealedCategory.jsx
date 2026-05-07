import { COLOR_STYLES } from "../data/puzzles";

export default function RevealedCategory({ category }) {
  const styles = COLOR_STYLES[category.color];

  return (
    <div
      className="bounce-in rounded-2xl w-full overflow-hidden"
      style={{
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        boxShadow: `0 4px 28px ${styles.glow}, 0 1px 0 rgba(255,255,255,0.05)`,
      }}
    >
      <div className="flex items-center gap-3 px-5 py-4">
        {/* Color dot / emoji badge */}
        <div
          className="shrink-0 w-8 h-8 rounded-xl flex items-center justify-center text-base"
          style={{
            background: styles.dotBg,
            border: `1px solid ${styles.border}`,
          }}
        >
          {styles.emoji}
        </div>

        {/* Text */}
        <div className="flex flex-col gap-0.5 min-w-0">
          <p
            className="text-xs font-bold tracking-[0.14em] uppercase leading-none"
            style={{ color: styles.titleColor }}
          >
            {category.title}
          </p>
          <p
            className="text-xs font-medium leading-snug truncate"
            style={{ color: styles.wordsColor, letterSpacing: "0.04em" }}
          >
            {category.words.join("  ·  ")}
          </p>
        </div>
      </div>
    </div>
  );
}
