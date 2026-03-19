export default function Header() {
  return (
    <header className="w-full border-b-2 border-pink-100" style={{ background: "rgba(255,255,255,0.7)", backdropFilter: "blur(8px)" }}>
      <div className="max-w-xl mx-auto px-4 py-4 flex flex-col items-center gap-0.5">
        <h1
          className="text-4xl font-black select-none tracking-tight"
          style={{ background: "linear-gradient(135deg, #f472b6, #a78bfa, #60a5fa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}
        >
          ✨ Matchy Match ✨
        </h1>
        <p className="text-xs font-semibold text-purple-300 tracking-widest uppercase">
          Find the four groups!
        </p>
      </div>
    </header>
  );
}
