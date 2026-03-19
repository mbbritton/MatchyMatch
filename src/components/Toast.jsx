import { clsx } from "clsx";
import { useEffect, useState } from "react";

export default function Toast({ message, onDone }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onDone, 300);
    }, 1500);
    return () => clearTimeout(timer);
  }, [onDone]);

  return (
    <div
      className={clsx(
        "fixed top-20 left-1/2 -translate-x-1/2 z-50",
        "text-white text-sm font-black px-6 py-2.5 rounded-full shadow-lg",
        "transition-all duration-300",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2"
      )}
      style={{ background: "linear-gradient(135deg, #f472b6, #a78bfa)", boxShadow: "0 4px 20px rgba(167,139,250,0.4)" }}
    >
      {message}
    </div>
  );
}
