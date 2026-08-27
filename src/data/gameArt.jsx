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
  '2048': (
    <g>
      <rect className="aa-pop" style={{ '--i': 0 }} x="20" y="66" width="34" height="34" rx="7" fill={W} />
      <text {...label} x="37" y="83.5" fontSize="16" fill={INK}>2</text>
      <rect className="aa-pop" style={{ '--i': 1 }} x="60" y="66" width="34" height="34" rx="7" fill={W} />
      <text {...label} x="77" y="83.5" fontSize="16" fill={INK}>4</text>
      <rect className="aa-pop" style={{ '--i': 2 }} x="20" y="26" width="74" height="34" rx="7" fill={W} />
      <text {...label} x="57" y="43.5" fontSize="22" fill={INK}>2048</text>
    </g>
  ),
  minesweeper: (
    <g>
      <rect x="18" y="18" width="84" height="84" rx="10" fill="none" stroke={W6} strokeWidth="3" />
      <path d="M18 44h84M18 70h84M44 18v84M70 18v84" stroke={W3} strokeWidth="2" />
      <circle className="aa-pop" style={{ '--i': 0 }} cx="31" cy="31" r="8" fill={W} />
      <circle className="aa-pop" style={{ '--i': 1 }} cx="57" cy="57" r="8" fill={W} />
      <circle className="aa-pop" style={{ '--i': 2 }} cx="83" cy="31" r="8" fill={W} />
      <path d="M57 49v-8M57 73v-8M49 57h-8M73 57h-8M51.3 51.3l-5.7-5.7M62.7 62.7l5.7 5.7M62.7 51.3l5.7-5.7M51.3 62.7l-5.7 5.7" stroke={W6} strokeWidth="2.5" strokeLinecap="round" />
    </g>
  ),
  // ---- Word ---------------------------------------------------------
  wordle: (
    <g>
      {[0, 1, 2, 3, 4].map((col) => (
        <rect
          key={col}
          className="aa-pop"
          style={{ '--i': col }}
          x={14 + col * 19}
          y="38"
          width="14"
          height="14"
          rx="3"
          fill={col < 2 ? W : col === 2 ? W6 : W3}
        />
      ))}
      {[0, 1, 2, 3, 4].map((col) => (
        <rect key={col} x={14 + col * 19} y="58" width="14" height="14" rx="3" fill="none" stroke={W3} strokeWidth="2" />
      ))}
      {[0, 1, 2, 3, 4].map((col) => (
        <rect key={col} x={14 + col * 19} y="78" width="14" height="14" rx="3" fill="none" stroke={W3} strokeWidth="2" />
      ))}
    </g>
  ),
  cross: (
    <g>
      <rect x="38" y="14" width="14" height="92" rx="4" fill={W6} />
      <rect x="14" y="38" width="92" height="14" rx="4" fill={W6} />
      <rect className="aa-pop" style={{ '--i': 0 }} x="38" y="14" width="14" height="28" rx="4" fill={W} />
      <rect className="aa-pop" style={{ '--i': 1 }} x="66" y="38" width="40" height="14" rx="4" fill={W} />
      <rect className="aa-pop" style={{ '--i': 2 }} x="38" y="78" width="14" height="28" rx="4" fill={W} />
    </g>
  ),
  chain: (
    <g>
      <circle cx="26" cy="60" r="14" fill="none" stroke={W} strokeWidth="5" />
      <circle className="aa-pop" style={{ '--i': 0 }} cx="60" cy="60" r="14" fill="none" stroke={W} strokeWidth="5" />
      <circle cx="94" cy="60" r="14" fill="none" stroke={W6} strokeWidth="5" />
      <path d="M40 60h6M74 60h6" stroke={W} strokeWidth="5" strokeLinecap="round" />
    </g>
  ),
  scramble: (
    <g>
      <text {...label} className="aa-pop" style={{ '--i': 0 }} x="30" y="46" fontSize="32" fill={W}>S</text>
      <text {...label} className="aa-pop" style={{ '--i': 1 }} x="60" y="72" fontSize="32" fill={W}>C</text>
      <text {...label} className="aa-pop" style={{ '--i': 2 }} x="90" y="46" fontSize="32" fill={W}>R</text>
      <path d="M18 90h84" stroke={W3} strokeWidth="3" strokeLinecap="round" strokeDasharray="6 6" />
    </g>
  ),
  anagram: (
    <g>
      <text {...label} x="60" y="52" fontSize="44" fill={W6}>?</text>
      <text {...label} className="aa-pop" style={{ '--i': 0 }} x="28" y="86" fontSize="22" fill={W}>A</text>
      <text {...label} className="aa-pop" style={{ '--i': 1 }} x="60" y="86" fontSize="22" fill={W}>→</text>
      <text {...label} className="aa-pop" style={{ '--i': 2 }} x="92" y="86" fontSize="22" fill={W}>Z</text>
    </g>
  ),
  hangman: (
    <g>
      <path d="M20 100h80" stroke={W} strokeWidth="5" strokeLinecap="round" />
      <path d="M40 100V20h40" stroke={W} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M80 20v14" stroke={W} strokeWidth="5" strokeLinecap="round" />
      <circle className="aa-bobble" cx="80" cy="44" r="10" fill="none" stroke={W} strokeWidth="4" />
      <path d="M80 54v22M70 62l10 6 10-6" stroke={W6} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  spellingbee: (
    <g>
      <polygon points={hex(60, 60, 32)} fill={W} />
      <polygon points={hex(60, 60, 22)} fill={INK} opacity="0.3" />
      <text {...label} className="aa-bobble" x="60" y="61" fontSize="26" fill={W}>B</text>
      <polygon points={hex(60, 14, 12)} fill={W6} />
      <polygon points={hex(60, 106, 12)} fill={W6} />
      <polygon points={hex(19, 37, 12)} fill={W3} />
      <polygon points={hex(101, 37, 12)} fill={W3} />
      <polygon points={hex(19, 83, 12)} fill={W3} />
      <polygon points={hex(101, 83, 12)} fill={W3} />
    </g>
  ),
  wordsearch: (
    <g>
      {Array.from({ length: 5 }, (_, r) =>
        Array.from({ length: 5 }, (_, c) => (
          <text key={`${r}-${c}`} {...label} x={22 + c * 20} y={24 + r * 20} fontSize="11" fill={r === 1 && c >= 1 && c <= 3 ? W : W3}>
            {r === 1 && c === 1 ? 'W' : r === 1 && c === 2 ? 'O' : r === 1 && c === 3 ? 'R' : String.fromCharCode(65 + ((r * 5 + c * 3) % 26))}
          </text>
        ))
      )}
      <rect x="28" y="16" width="54" height="16" rx="4" fill="none" stroke={W6} strokeWidth="2" />
    </g>
  ),
  typerace: (
    <g>
      <rect x="14" y="52" width="92" height="36" rx="8" fill="none" stroke={W6} strokeWidth="3" />
      <path className="aa-pop" style={{ '--i': 0 }} d="M24 70h28" stroke={W} strokeWidth="5" strokeLinecap="round" />
      <path className="aa-pop" style={{ '--i': 1 }} d="M58 70h38" stroke={W3} strokeWidth="5" strokeLinecap="round" />
      <path d="M60 52V36" stroke={W6} strokeWidth="3" strokeLinecap="round" />
      <path className="aa-pop" style={{ '--i': 2 }} d="M48 28l12-12 12 12" stroke={W} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </g>
  ),
  manjual: (
    <g>
      <text {...label} x="60" y="52" fontSize="42" fill={W}>M</text>
      <rect x="20" y="74" width="80" height="14" rx="7" fill={W6} />
      <rect className="aa-pop" style={{ '--i': 0 }} x="20" y="74" width="50" height="14" rx="7" fill={W} />
    </g>
  ),
  samiam: (
    <g>
      <text {...label} x="60" y="48" fontSize="38" fill={W}>S</text>
      <text {...label} className="aa-pop" style={{ '--i': 0 }} x="36" y="82" fontSize="22" fill={W6}>A</text>
      <text {...label} className="aa-pop" style={{ '--i': 1 }} x="60" y="82" fontSize="22" fill={W}>M</text>
      <text {...label} className="aa-pop" style={{ '--i': 2 }} x="84" y="82" fontSize="22" fill={W6}>!</text>
    </g>
  ),
  // ---- Trivia -------------------------------------------------------
  trivia: (
    <g>
      <circle cx="60" cy="52" r="28" fill="none" stroke={W6} strokeWidth="4" />
      <text {...label} className="aa-bobble" x="60" y="53" fontSize="36" fill={W}>?</text>
      <circle cx="60" cy="92" r="5" fill={W} />
    </g>
  ),
  jeremysjeopardy: (
    <g>
      <rect x="14" y="24" width="92" height="56" rx="8" fill="none" stroke={W6} strokeWidth="3" />
      <text {...label} className="aa-pop" style={{ '--i': 0 }} x="60" y="52" fontSize="32" fill={W}>J!</text>
      <rect x="14" y="88" width="92" height="12" rx="6" fill={W3} />
      <rect className="aa-pop" style={{ '--i': 1 }} x="14" y="88" width="60" height="12" rx="6" fill={W6} />
    </g>
  ),
  // ---- Memory -------------------------------------------------------
  memory: (
    <g>
      {[0, 1, 2, 3].map((i) => (
        <rect
          key={i}
          className="aa-pop"
          style={{ '--i': i }}
          x={16 + (i % 2) * 48}
          y={16 + Math.floor(i / 2) * 48}
          width="36"
          height="36"
          rx="8"
          fill={i % 2 === 0 ? W : W6}
        />
      ))}
      {[4, 5, 6, 7].map((i) => (
        <rect
          key={i}
          x={16 + ((i - 4) % 2) * 48}
          y={16 + Math.floor((i - 4) / 2) * 48 + 48}
          width="36"
          height="36"
          rx="8"
          fill="none"
          stroke={W3}
          strokeWidth="3"
        />
      ))}
    </g>
  ),
  puppyfetch: (
    <g>
      <text {...label} className="aa-bobble" x="60" y="52" fontSize="52" fill={W}>🐾</text>
      <rect x="20" y="84" width="80" height="14" rx="7" fill={W3} />
      <rect className="aa-pop" style={{ '--i': 0 }} x="20" y="84" width="44" height="14" rx="7" fill={W6} />
    </g>
  ),
  catmatch: (
    <g>
      <text {...label} className="aa-bobble" x="60" y="52" fontSize="52" fill={W}>🐱</text>
      <rect x="20" y="84" width="80" height="14" rx="7" fill={W3} />
      <rect className="aa-pop" style={{ '--i': 0 }} x="20" y="84" width="56" height="14" rx="7" fill={W6} />
    </g>
  ),
  flipflop: (
    <g>
      <rect className="aa-pop" style={{ '--i': 0 }} x="16" y="30" width="38" height="52" rx="8" fill={W} />
      <rect className="aa-pop" style={{ '--i': 1 }} x="66" y="30" width="38" height="52" rx="8" fill={W6} />
      <text {...label} x="35" y="57" fontSize="22" fill={INK}>?</text>
      <text {...label} x="85" y="57" fontSize="22" fill={INK}>★</text>
    </g>
  ),
  martinimatch: (
    <g>
      <path className="aa-bobble" d="M36 28l24 32 24-32z" fill={W} />
      <rect x="56" y="60" width="8" height="24" rx="4" fill={W} />
      <ellipse cx="60" cy="88" rx="18" ry="6" fill={W6} />
      <circle className="aa-pop" style={{ '--i': 0 }} cx="88" cy="36" r="8" fill={W6} />
      <circle className="aa-pop" style={{ '--i': 1 }} cx="32" cy="80" r="6" fill={W3} />
    </g>
  ),
  gabbysgift: (
    <g>
      <rect x="22" y="38" width="76" height="60" rx="10" fill={W6} />
      <rect className="aa-pop" style={{ '--i': 0 }} x="22" y="28" width="76" height="18" rx="9" fill={W} />
      <path d="M60 28v70" stroke={W} strokeWidth="4" strokeLinecap="round" />
      <path className="aa-pop" style={{ '--i': 1 }} d="M60 28c0-14-18-14-18 0s18 0 18 0" fill={W} />
      <path className="aa-pop" style={{ '--i': 2 }} d="M60 28c0-14 18-14 18 0s-18 0-18 0" fill={W6} />
    </g>
  ),
  ivysicons: (
    <g>
      <text {...label} className="aa-pop" style={{ '--i': 0 }} x="32" y="42" fontSize="28" fill={W}>★</text>
      <text {...label} className="aa-pop" style={{ '--i': 1 }} x="88" y="42" fontSize="28" fill={W6}>●</text>
      <text {...label} className="aa-pop" style={{ '--i': 2 }} x="32" y="82" fontSize="28" fill={W6}>▲</text>
      <text {...label} className="aa-pop" style={{ '--i': 3 }} x="88" y="82" fontSize="28" fill={W}>♦</text>
    </g>
  ),
  // ---- Reflex -------------------------------------------------------
  barrysblitz: (
    <g>
      <path className="aa-pop" style={{ '--i': 0 }} d="M50 16l-18 40h22l-16 48 42-56H56z" fill={W} />
    </g>
  ),
  gregsegg: (
    <g>
      <ellipse className="aa-bobble" cx="60" cy="62" rx="26" ry="32" fill={W} />
      <ellipse cx="60" cy="62" rx="16" ry="20" fill="none" stroke={INK} strokeWidth="3" opacity="0.3" />
    </g>
  ),
  nathanielninja: (
    <g>
      <circle cx="60" cy="44" r="20" fill={W} />
      <rect x="28" y="60" width="64" height="36" rx="10" fill={W6} />
      <rect x="38" y="38" width="44" height="12" rx="6" fill={INK} opacity="0.4" />
      <path className="aa-pop" style={{ '--i': 0 }} d="M22 80l16-10M98 80l-16-10" stroke={W} strokeWidth="5" strokeLinecap="round" />
    </g>
  ),
  nickofttime: (
    <g>
      <circle cx="60" cy="58" r="34" fill="none" stroke={W6} strokeWidth="5" />
      <path className="aa-pop" style={{ '--i': 0 }} d="M60 30v28l18 10" stroke={W} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="60" cy="58" r="4" fill={W} />
      <path d="M60 24v-8M60 100v-8M24 58h-8M104 58h-8" stroke={W6} strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  colourclash: (
    <g>
      <rect className="aa-pop" style={{ '--i': 0 }} x="14" y="30" width="40" height="22" rx="11" fill={W} />
      <rect className="aa-pop" style={{ '--i': 1 }} x="66" y="30" width="40" height="22" rx="11" fill={W6} />
      <rect x="14" y="68" width="40" height="22" rx="11" fill={W3} />
      <rect x="66" y="68" width="40" height="22" rx="11" fill={W3} />
      <path d="M54 41h12M54 79h12" stroke={W6} strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  latcham: (
    <g>
      <rect x="34" y="44" width="52" height="44" rx="8" fill={W6} />
      <path className="aa-bobble" d="M44 44V32a16 16 0 0132 0v12" fill="none" stroke={W} strokeWidth="6" strokeLinecap="round" />
      <circle cx="60" cy="66" r="8" fill={W} />
      <rect x="56" y="66" width="8" height="14" rx="4" fill={W} />
    </g>
  ),
  geoffsgeometry: (
    <g>
      <polygon className="aa-pop" style={{ '--i': 0 }} points="60,18 100,82 20,82" fill="none" stroke={W} strokeWidth="5" strokeLinejoin="round" />
      <circle className="aa-pop" style={{ '--i': 1 }} cx="60" cy="60" r="20" fill="none" stroke={W6} strokeWidth="4" />
      <rect className="aa-pop" style={{ '--i': 2 }} x="42" y="42" width="36" height="36" rx="4" fill="none" stroke={W3} strokeWidth="3" />
    </g>
  ),
  bandysblast: (
    <g>
      <circle className="aa-pulse" cx="60" cy="52" r="22" fill={W} />
      <circle cx="60" cy="52" r="14" fill="none" stroke={INK} strokeWidth="3" opacity="0.3" />
      <circle cx="60" cy="52" r="5" fill={INK} opacity="0.4" />
      <path className="aa-pop" style={{ '--i': 0 }} d="M22 90l16-16M98 90L82 74" stroke={W6} strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  // ---- Chaos --------------------------------------------------------
  diceroll: (
    <g>
      <rect className="aa-pop" style={{ '--i': 0 }} x="14" y="30" width="44" height="44" rx="10" fill={W} />
      <rect className="aa-pop" style={{ '--i': 1 }} x="62" y="46" width="44" height="44" rx="10" fill={W6} />
      <circle cx="30" cy="46" r="4" fill={INK} opacity="0.5" />
      <circle cx="44" cy="60" r="4" fill={INK} opacity="0.5" />
      <circle cx="30" cy="60" r="4" fill={INK} opacity="0.5" />
      <circle cx="44" cy="46" r="4" fill={INK} opacity="0.5" />
      <circle cx="78" cy="62" r="4" fill={INK} opacity="0.5" />
      <circle cx="92" cy="76" r="4" fill={INK} opacity="0.5" />
    </g>
  ),
  flipcoin: (
    <g>
      <path className="aa-arc" d="M22 90c10-40 26-58 38-58" fill="none" stroke={W3} strokeWidth="3" strokeDasharray="5 7" strokeLinecap="round" />
      <g className="aa-flip">
        <circle cx="66" cy="60" r="30" fill={W} />
        <circle cx="66" cy="60" r="22" fill="none" stroke={INK} strokeWidth="3" opacity="0.4" />
        <text {...label} x="66" y="61" fontSize="24" fill={INK} opacity="0.6">H</text>
      </g>
    </g>
  ),
  kennykeno: (
    <g>
      <g className="aa-pop" style={{ '--i': 0 }}>
        <circle cx="34" cy="46" r="20" fill={W} />
        <text {...label} x="34" y="46" fontSize="17" fill={INK}>7</text>
      </g>
      <g className="aa-pop" style={{ '--i': 1 }}>
        <circle cx="80" cy="38" r="17" fill={W6} />
        <text {...label} x="80" y="38" fontSize="15" fill={INK}>21</text>
      </g>
      <g className="aa-pop" style={{ '--i': 2 }}>
        <circle cx="62" cy="82" r="22" fill={W} />
        <text {...label} x="62" y="82" fontSize="18" fill={INK}>13</text>
      </g>
    </g>
  ),
  rochellespinner: (
    <g>
      <g className="aa-spin">
        <circle cx="60" cy="64" r="34" fill="none" stroke={W} strokeWidth="5" />
        <path d="M60 30v68M26 64h68M36 40l48 48M84 40L36 88" stroke={W6} strokeWidth="3" />
        <circle cx="60" cy="64" r="7" fill={W} />
      </g>
      <path d="M60 16l9 16H51z" fill={W} />
    </g>
  ),
  mizewell: (
    <g>
      <circle cx="60" cy="52" r="28" fill="none" stroke={W6} strokeWidth="4" />
      <text {...label} x="60" y="53" fontSize="32" fill={W}>🔮</text>
      <path className="aa-pop" style={{ '--i': 0 }} d="M36 88h48" stroke={W} strokeWidth="5" strokeLinecap="round" />
      <path className="aa-pop" style={{ '--i': 1 }} d="M44 96h32" stroke={W6} strokeWidth="4" strokeLinecap="round" />
    </g>
  ),
  // ---- Strategy -----------------------------------------------------
  tictactoe: (
    <g>
      <path d="M44 18v84M76 18v84M18 44h84M18 76h84" stroke={W6} strokeWidth="4" strokeLinecap="round" />
      <path className="aa-pop" style={{ '--i': 0 }} d="M22 22l16 16M38 22L22 38" stroke={W} strokeWidth="5.5" strokeLinecap="round" />
      <circle className="aa-pop" style={{ '--i': 1 }} cx="60" cy="60" r="11" fill="none" stroke={W} strokeWidth="5.5" />
      <path className="aa-pop" style={{ '--i': 2 }} d="M82 82l16 16M98 82l-16 16" stroke={W} strokeWidth="5.5" strokeLinecap="round" />
    </g>
  ),
  chess: (
    <g>
      <text {...label} className="aa-bobble" x="60" y="56" fontSize="76" fill={W}>♞</text>
      <rect x="24" y="94" width="72" height="10" rx="4" fill={W6} />
    </g>
  ),
  // ---- Arcade -------------------------------------------------------
  snake: (
    <g>
      <path className="aa-crawl" d="M20 84h28V56h24v28h28" fill="none" stroke={W} strokeWidth="13" strokeLinecap="round" strokeLinejoin="round" />
      <circle className="aa-pulse" cx="34" cy="30" r="9" fill={W} />
      <path d="M34 21v-6" stroke={W6} strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  greatwall: (
    <g>
      <g fill={W6}>
        <rect x="14" y="20" width="26" height="12" rx="3" />
        <rect x="44" y="20" width="26" height="12" rx="3" />
        <rect x="74" y="20" width="26" height="12" rx="3" />
        <rect x="14" y="36" width="26" height="12" rx="3" opacity="0.7" />
        <rect className="aa-pop" style={{ '--i': 1 }} x="44" y="36" width="26" height="12" rx="3" fill={W} />
        <rect x="74" y="36" width="26" height="12" rx="3" opacity="0.7" />
      </g>
      <circle className="aa-rise" cx="60" cy="66" r="7" fill={W} />
      <rect x="38" y="92" width="46" height="10" rx="5" fill={W} />
    </g>
  ),
  // ---- Derrick's Derrictive -----------------------------------------
  derricksderrictive: (
    <g>
      {/* Magnifying glass */}
      <circle className="aa-bobble" cx="52" cy="50" r="22" fill="none" stroke={W} strokeWidth="6" />
      <circle cx="52" cy="50" r="13" fill={W3} />
      <path className="aa-pop" style={{ '--i': 0 }} d="M68 66l18 18" stroke={W} strokeWidth="7" strokeLinecap="round" />
      {/* Clue dots */}
      <circle className="aa-pop" style={{ '--i': 1 }} cx="28" cy="88" r="5" fill={W} />
      <circle className="aa-pop" style={{ '--i': 2 }} cx="44" cy="94" r="5" fill={W6} />
      <circle className="aa-pop" style={{ '--i': 3 }} cx="60" cy="96" r="5" fill={W3} />
    </g>
  ),
}

// Anything without bespoke art falls back to a joystick — still art, never
// initials.
export const FALLBACK_ART = (
  <g>
    <rect x="22" y="70" width="76" height="30" rx="10" fill={W} />
    <path d="M60 70V38" stroke={W} strokeWidth="7" strokeLinecap="round" />
    <circle className="aa-bobble" cx="60" cy="30" r="14" fill={W} />
    <circle cx="42" cy="85" r="4.5" fill={INK} opacity="0.5" />
    <circle cx="78" cy="85" r="4.5" fill={INK} opacity="0.5" />
  </g>
)

export function artFor(id) {
  return GAME_ART[id] || FALLBACK_ART
}
