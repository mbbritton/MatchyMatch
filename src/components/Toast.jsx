import { useEffect, useState } from "react";
import { clsx } from "clsx";

export default function Toast({ message, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 350);
    }, 2000);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      role="status"
      aria-live="polite"
      className={clsx(
        "fixed top-20 left-1/2 -translate-x-1/2 z-50",
        "flex items-center gap-2.5",
        "text-sm font-semibold px-5 py-3 rounded-2xl",
        "pointer-events-none select-none",
        "transition-all duration-350",
        visible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-2 scale-95"
      )}
      style={{
        background: "rgba(22,22,36,0.94)",
        border: "1px solid rgba(255,255,255,0.11)",
        color: "var(--text-primary)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        boxShadow:
          "0 8px 40px rgba(0,0,0,0.55), 0 0 0 1px rgba(167,139,250,0.18), inset 0 1px 0 rgba(255,255,255,0.06)",
        letterSpacing: "0.01em",
      }}
    >
      {/* Accent dot */}
      <span
        aria-hidden="true"
        style={{
          width: 6,
          height: 6,
          borderRadius: "50%",
          background: "linear-gradient(135deg, #f472b6, #a78bfa)",
          flexShrink: 0,
          boxShadow: "0 0 8px rgba(167,139,250,0.7)",
        }}
      />
      {message}
    </div>
  );
}
