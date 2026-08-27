// Per-game tile art for the Arcade hub. Each entry is a bare SVG fragment
// drawn on a 120x120 canvas, rendered in white over the card's gradient
// tile. Elements tagged with an `aa-*` class animate while the card is
// hovered (see the "Tile art" block in index.css) — everything else is
// static so a full grid reads calm at rest.
const W = 'rgba(255,255,255,0.96)'
const W6 = 'rgba(255,255,255,0.62)'
const W3 = 'rgba(255,255,255,0.26)'
const INK = 'rgba(24,10,64,0.62)'

const label = {
  fontFamily: 'var(--font-mono-display), ui-monospace, monospace',
  fontWeight: 700,
  textAnchor: 'middle',
  dominantBaseline: 'central',
}

// Pointy-top hexagon, used by the Spelling Bee honeycomb.
function hex(cx, cy, r) {
  const w = r * 0.866
  const h = r * 0.5
  return `${cx},${cy - r} ${cx + w},${cy - h} ${cx + w},${cy + h} ${cx},${cy + r} ${cx - w},${cy + h} ${cx - w},${cy - h}`
}

export const GAME_ART = {
  // ---- Puzzle -------------------------------------------------------
  matchy: (
    <g>
      <rect className="aa-pop" style={{ '--i': 0 }} x="12" y="24" width="44" height="22" rx="11" fill={W} />
      <rect className="aa-pop" style={{ '--i': 1 }} x="64" y="24" width="44" height="22" rx="11" fill={W} />
      <rect x="12" y="52" width="44" height="22" rx="11" fill="none" stroke={W6} strokeWidth="3" />
      <rect x="64" y="52" width="44" height="22" rx="11" fill="none" stroke={W6} strokeWidth="3" />
      <rect x="12" y="80" width="44" height="22" rx="11" fill="none" stroke={W3} strokeWidth="3" />
      <rect x="64" y="80" width="44" height="22" rx="11" fill="none" stroke={W3} strokeWidth="3" />
    </g>
  ),
  crunch: (
    <g>
      <rect x="18" y="18" width="84" height="84" rx="16" fill="none" stroke={W6} strokeWidth="3" />
      <g stroke={W} strokeWidth="5" strokeLinecap="round">
        <path className="aa-pop" style={{ '--i': 0 }} d="M32 40h16M40 32v16" />
        <path className="aa-pop" style={{ '--i': 1 }} d="M72 40h16" />
        <path className="aa-pop" style={{ '--i': 2 }} d="M34 74l12 12M46 74L34 86" />
        <path className="aa-pop" style={{ '--i': 3 }} d="M72 80h16" />
      </g>
      <circle cx="80" cy="71" r="2.6" fill={W} />
      <circle cx="80" cy="89" r="2.6" fill={W} />
    </g>
  ),
  sudoku: (
    <g>
      <rect x="16" y="16" width="88" height="88" rx="8" fill="none" stroke={W} strokeWidth="4" />
      <path d="M45.3 16v88M74.7 16v88M16 45.3h88M16 74.7h88" stroke={W} strokeWidth="3.5" />
      <path d="M25.8 16v88M35.5 16v88M55 16v88M64.8 16v88M84.3 16v88M94 16v88M16 25.8h88M16 35.5h88M16 55h88M16 64.8h88M16 84.3h88M16 94h88" stroke={W3} strokeWidth="1.4" />
      <text {...label} className="aa-pop" style={{ '--i': 0 }} x="30.6" y="30.6" fontSize="13" fill={W}>5</text>
      <text {...label} className="aa-pop" style={{ '--i': 1 }} x="60" y="60" fontSize="13" fill={W}>3</text>
      <text {...label} className="aa-pop" style={{ '--i': 2 }} x="89.2" y="89.2" fontSize="13" fill={W}>9</text>
    </g>
  ),
  mathquiz: (
    <g>
      <text {...label} x="60" y="56" fontSize="54" fill={W}>π</text>
      <text {...label} className="aa-pop" style={{ '--i': 0 }} x="26" y="30" fontSize="22" fill={W6}>√</text>
      <text {...label} className="aa-pop" style={{ '--i': 1 }} x="94" y="34" fontSize="22" fill={W6}>Σ</text>
      <path d="M28 92h64" stroke={W} strokeWidth="4" strokeLinecap="round" />
      <path d="M40 84l8 8-8 8M80 84l-8 8 8 8" stroke={W6} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  ),
