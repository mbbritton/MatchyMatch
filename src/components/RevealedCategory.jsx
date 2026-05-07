import { COLOR_STYLES } from "../data/puzzles";

export default function RevealedCategory({ category }) {
  const styles = COLOR_STYLES[category.color];

  return (
    <div
      className="bounce-in rounded-2xl px-5 py-4 flex flex-col items-center justify-center gap-1.5 w-full"
      style={{
        background: styles.bg,
        border: `1.5px solid ${styles.border}`,
        minHeight: "5rem",
        boxShadow: `0 4px 20px ${styles.glow}`,
      }}
    >
      <div className="flex items-center gap-2">
        <span style={{ fontSize: "14px" }} aria-hidden="true">{styles.emoji}</span>
        <p
          className="text-xs font-bold tracking-[0.15em] uppercase font-display not-italic"
          style={{ color: styles.titleColor, fontFamily: "'Lato', sans-serif", letterSpacing: "0.12em" }}
        >
          {category.title}
        </p>
        <span style={{ fontSize: "14px" }} aria-hidden="true">{styles.emoji}</span>
      </div>
      <p
        className="text-xs font-medium tracking-wide"
        style={{ color: styles.wordsColor }}
      >
        {category.words.join("  ·  ")}
      </p>
    </div>
  );
}
