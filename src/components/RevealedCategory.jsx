import { clsx } from "clsx";
import { COLOR_STYLES } from "../data/puzzles";

export default function RevealedCategory({ category }) {
  const styles = COLOR_STYLES[category.color];

  return (
    <div
      className="bounce-in rounded-2xl px-5 py-4 flex flex-col items-center justify-center gap-1.5 w-full"
      style={{
        background: styles.bg,
        border: `1px solid ${styles.border}`,
        minHeight: "5rem",
        boxShadow: `0 4px 24px ${styles.glow}`,
      }}
    >
      <p
        className="text-xs font-bold tracking-[0.15em] uppercase"
        style={{ color: styles.titleColor }}
      >
        {category.title}
      </p>
      <p
        className="text-xs font-medium tracking-wide"
        style={{ color: styles.wordsColor }}
      >
        {category.words.join("  ·  ")}
      </p>
    </div>
  );
}
