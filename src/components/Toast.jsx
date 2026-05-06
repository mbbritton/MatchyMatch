import { clsx } from "clsx";
import { useEffect, useState } from "react";

export default function Toast({ message, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 1800);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className={clsx(
        "fixed top-24 left-1/2 -translate-x-1/2 z-50",
        "text-sm font-semibold px-5 py-2.5 rounded-full",
        "transition-all duration-300 pointer-events-none",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-3"
      )}
      style={{
        background: "rgba(26,26,36,0.92)",
        border: "1px solid rgba(255,255,255,0.12)",
        color: "var(--text-primary)",
        backdropFilter: "blur(16px)",
        WebkitBackdropFilter: "blur(16px)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(156,111,239,0.2)",
        letterSpacing: "0.01em",
      }}
    >
      {message}
    </div>
  );
}
