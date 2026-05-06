import { clsx } from "clsx";
import { COLOR_STYLES } from "../data/puzzles";

export default function RevealedCategory({ category }) {
  const styles = COLOR_STYLES[category.color];

  return (
    <div
      className={clsx(
        "bounce-in rounded-2xl px-4 py-3 flex flex-col items-center justify-center gap-1",
        "w-full",
        styles.revealed
      )}
      style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.08)", minHeight: "4.5rem" }}
    >
      <p className={clsx("text-sm font-black tracking-widest uppercase", styles.text)}>
        {styles.emoji} {category.title}
      </p>
      <p
        className={clsx("text-xs font-semibold tracking-wide uppercase", styles.text)}
        style={{ opacity: 0.7 }}
      >
        {category.words.join("  ·  ")}
      </p>
    </div>
  );
}
