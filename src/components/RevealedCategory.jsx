import { clsx } from "clsx";
import { COLOR_STYLES } from "../data/puzzles";

export default function RevealedCategory({ category }) {
  const styles = COLOR_STYLES[category.color];

  return (
    <div
      className={clsx(
        "bounce-in rounded-lg p-4 flex flex-col items-center justify-center gap-1",
        "w-full h-16",
        styles.revealed
      )}
    >
      <p className={clsx("text-xs font-black tracking-widest uppercase", styles.text)}>
        {category.title}
      </p>
      <p className={clsx("text-xs font-semibold tracking-wide uppercase opacity-80", styles.text)}>
        {category.words.join(", ")}
      </p>
    </div>
  );
}
