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
      <rect className="aa-pop" style={{ '--i': 2 }} x="40" y="24" width="42" height="36" rx="8" fill={W} />
      <text {...label} x="61" y="42" fontSize="18" fill={INK}>8</text>
      <path className="aa-rise" d="M61 66V62" stroke={W6} strokeWidth="3" strokeLinecap="round" />
    </g>
  ),
  minesweeper: (
    <g>
      <rect x="14" y="14" width="92" height="92" rx="10" fill="none" stroke={W3} strokeWidth="3" />
      <path d="M45.3 14v92M74.7 14v92M14 45.3h92M14 74.7h92" stroke={W3} strokeWidth="2" />
      <g className="aa-swing">
        <path d="M32 84V32" stroke={W} strokeWidth="4" strokeLinecap="round" />
        <path d="M32 34l20 8-20 8z" fill={W} />
      </g>
      <circle className="aa-pulse" cx="80" cy="76" r="14" fill={W} />
      <g stroke={W} strokeWidth="4" strokeLinecap="round">
        <path d="M80 54v8M80 90v8M58 76h8M94 76h8M66 62l6 6M94 88l-6-6M66 90l6-6M94 64l-6 6" />
      </g>
    </g>
  ),
  // ---- Word ---------------------------------------------------------
  wordle: (
    <g>
      <rect x="12" y="46" width="26" height="28" rx="5" fill={W} />
      <text {...label} x="25" y="60.5" fontSize="15" fill={INK}>W</text>
      <g className="aa-flip">
        <rect x="42" y="46" width="26" height="28" rx="5" fill={W} />
        <text {...label} x="55" y="60.5" fontSize="15" fill={INK}>O</text>
      </g>
      <rect x="72" y="46" width="26" height="28" rx="5" fill="none" stroke={W6} strokeWidth="3" />
      <text {...label} x="85" y="60.5" fontSize="15" fill={W}>?</text>
      <rect x="12" y="82" width="86" height="7" rx="3.5" fill={W3} />
      <rect x="12" y="30" width="60" height="7" rx="3.5" fill={W3} />
    </g>
  ),
  cross: (
    <g>
      <rect x="16" y="16" width="88" height="88" rx="8" fill="none" stroke={W} strokeWidth="3.5" />
      <path d="M38 16v88M60 16v88M82 16v88M16 38h88M16 60h88M16 82h88" stroke={W6} strokeWidth="2.4" />
      <rect x="16" y="38" width="22" height="22" fill={INK} opacity="0.45" />
      <rect x="60" y="60" width="22" height="22" fill={INK} opacity="0.45" />
      <rect className="aa-pop" style={{ '--i': 0 }} x="38" y="16" width="22" height="22" fill={W} />
      <rect className="aa-pop" style={{ '--i': 1 }} x="38" y="38" width="22" height="22" fill={W} />
      <rect className="aa-pop" style={{ '--i': 2 }} x="38" y="60" width="22" height="22" fill={W} />
      <text {...label} x="21" y="21" fontSize="9" fill={W6}>1</text>
      <text {...label} x="87" y="21" fontSize="9" fill={W6}>2</text>
    </g>
  ),
  chain: (
    <g fill="none" stroke={W} strokeWidth="5" strokeLinecap="round">
      <rect className="aa-pop" style={{ '--i': 0 }} x="10" y="48" width="40" height="26" rx="13" />
      <rect className="aa-pop" style={{ '--i': 1 }} x="40" y="30" width="40" height="26" rx="13" stroke={W6} />
      <rect className="aa-pop" style={{ '--i': 2 }} x="70" y="48" width="40" height="26" rx="13" />
      <path d="M26 90h68" stroke={W3} strokeWidth="4" />
    </g>
  ),
  scramble: (
    <g fill={W}>
      <g className="aa-jitter" style={{ '--i': 0 }}>
        <rect x="14" y="52" width="28" height="30" rx="6" transform="rotate(-14 28 67)" />
        <text {...label} x="28" y="67" fontSize="16" fill={INK} transform="rotate(-14 28 67)">A</text>
      </g>
      <g className="aa-jitter" style={{ '--i': 1 }}>
        <rect x="46" y="34" width="28" height="30" rx="6" transform="rotate(9 60 49)" />
        <text {...label} x="60" y="49" fontSize="16" fill={INK} transform="rotate(9 60 49)">C</text>
      </g>
      <g className="aa-jitter" style={{ '--i': 2 }}>
        <rect x="76" y="56" width="28" height="30" rx="6" transform="rotate(18 90 71)" />
        <text {...label} x="90" y="71" fontSize="16" fill={INK} transform="rotate(18 90 71)">B</text>
      </g>
    </g>
  ),
  anagram: (
    <g>
      <rect x="14" y="46" width="32" height="34" rx="7" fill={W} />
      <text {...label} x="30" y="63" fontSize="18" fill={INK}>A</text>
      <rect x="74" y="46" width="32" height="34" rx="7" fill={W} />
      <text {...label} x="90" y="63" fontSize="18" fill={INK}>Z</text>
      <g className="aa-shift" fill="none" stroke={W} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M46 36c8-10 20-10 28 0" />
        <path d="M68 34l6 2-1 6" />
        <path d="M74 90c-8 10-20 10-28 0" />
        <path d="M52 92l-6-2 1-6" />
      </g>
    </g>
  ),
  wordsearch: (
    <g>
      <g transform="rotate(35 60 60)">
        <rect className="aa-sweep" x="20" y="47" width="80" height="26" rx="13" fill={W3} />
      </g>
      {[0, 1, 2, 3].map((r) =>
        [0, 1, 2, 3].map((c) => (
          <text
            key={`${r}-${c}`}
            {...label}
            x={26 + c * 23}
            y={26 + r * 23}
            fontSize="14"
            fill={r === c ? W : W6}
          >
            {'FINDWORDSHERENOW'[r * 4 + c]}
          </text>
        ))
      )}
    </g>
  ),
  hangman: (
    <g fill="none" stroke={W} strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 100h34M28 100V20h40M68 20v14" />
      <circle className="aa-pop" style={{ '--i': 0 }} cx="68" cy="44" r="10" />
      <path className="aa-pop" style={{ '--i': 1 }} d="M68 54v22M68 60l-12 8M68 60l12 8M68 76l-10 14M68 76l10 14" />
      <path d="M84 100h18" stroke={W3} />
    </g>
  ),
  spellingbee: (
    <g>
      <polygon className="aa-pop" style={{ '--i': 0 }} points={hex(60, 60, 17)} fill={W} />
      <text {...label} x="60" y="60" fontSize="16" fill={INK}>B</text>
      <g fill="none" stroke={W6} strokeWidth="3">
        <polygon points={hex(89, 60, 17)} />
        <polygon points={hex(31, 60, 17)} />
        <polygon points={hex(74.7, 34.5, 17)} />
        <polygon points={hex(45.3, 34.5, 17)} />
        <polygon points={hex(74.7, 85.5, 17)} />
        <polygon points={hex(45.3, 85.5, 17)} />
      </g>
    </g>
  ),
  barrysblitz: (
    <g>
      <rect x="16" y="70" width="88" height="10" rx="5" fill={W3} />
      <rect x="16" y="88" width="60" height="10" rx="5" fill={W3} />
      <path className="aa-zap" d="M68 8L34 62h20l-8 42 38-58H62z" fill={W} />
    </g>
  ),
  manjual: (
    <g>
      <path d="M60 30c-10-8-24-10-38-8v58c14-2 28 0 38 8 10-8 24-10 38-8V22c-14-2-28 0-38 8z" fill={W} />
      <path d="M60 30v58" stroke={INK} strokeWidth="3" opacity="0.5" />
      <g stroke={INK} strokeWidth="2.6" strokeLinecap="round" opacity="0.45">
        <path className="aa-pop" style={{ '--i': 0 }} d="M32 44h18M32 56h18M32 68h12" />
        <path className="aa-pop" style={{ '--i': 1 }} d="M70 44h18M70 56h18M70 68h12" />
      </g>
    </g>
  ),
  samiam: (
    <g>
      <g className="aa-bobble">
        <path d="M42 20h36v66H42z" fill={W} />
        <g fill={INK} opacity="0.42">
          <rect x="42" y="30" width="36" height="11" />
          <rect x="42" y="52" width="36" height="11" />
          <rect x="42" y="74" width="36" height="11" />
        </g>
        <ellipse cx="60" cy="86" rx="34" ry="9" fill={W} />
      </g>
      <path d="M20 102h80" stroke={W3} strokeWidth="5" strokeLinecap="round" />
    </g>
  ),
  // ---- Trivia -------------------------------------------------------
  trivia: (
    <g>
      <path d="M22 24h76a8 8 0 018 8v42a8 8 0 01-8 8H62l-18 16v-16H22a8 8 0 01-8-8V32a8 8 0 018-8z" fill={W} />
      <text {...label} className="aa-bobble" x="60" y="53" fontSize="42" fill={INK}>?</text>
    </g>
  ),
  // ---- Memory -------------------------------------------------------
  memory: (
    <g>
      <rect x="10" y="34" width="30" height="44" rx="6" fill={W6} transform="rotate(-8 25 56)" />
      <rect x="80" y="34" width="30" height="44" rx="6" fill={W6} transform="rotate(8 95 56)" />
      <g className="aa-flip">
        <rect x="43" y="30" width="34" height="52" rx="7" fill={W} />
        <path d="M60 42l4.6 9.4L75 53l-7.5 7.3 1.8 10.3L60 65.8 50.7 70.6l1.8-10.3L45 53l10.4-1.6z" fill={INK} opacity="0.5" />
      </g>
    </g>
  ),
  puppyfetch: (
    <g>
      <g className="aa-swing">
        <path d="M30 34a9 9 0 0113-8h34a9 9 0 1113 8 9 9 0 11-13 8H43a9 9 0 01-13-8z" fill={W} />
      </g>
      <g className="aa-pop" style={{ '--i': 1 }} fill={W6}>
        <ellipse cx="60" cy="92" rx="14" ry="11" />
        <ellipse cx="40" cy="76" rx="6" ry="8" />
        <ellipse cx="53" cy="68" rx="6" ry="8" />
        <ellipse cx="67" cy="68" rx="6" ry="8" />
        <ellipse cx="80" cy="76" rx="6" ry="8" />
      </g>
    </g>
  ),
  catmatch: (
    <g>
      <path d="M30 40l-4-22 20 12a44 44 0 0128 0l20-12-4 22a34 34 0 11-60 0z" fill={W} />
      <circle className="aa-blink" cx="46" cy="58" r="4.5" fill={INK} />
      <circle className="aa-blink" style={{ '--i': 1 }} cx="74" cy="58" r="4.5" fill={INK} />
      <path d="M60 70l-5 4h10z" fill={INK} opacity="0.7" />
      <g stroke={INK} strokeWidth="2.4" strokeLinecap="round" opacity="0.45">
        <path d="M34 68h-14M34 76l-12 5M86 68h14M86 76l12 5" />
      </g>
    </g>
  ),
  flipflop: (
    <g>
      <g className="aa-flip">
        <rect x="18" y="38" width="38" height="46" rx="8" fill={W} />
      </g>
      <g className="aa-flip" style={{ '--i': 1 }}>
        <rect x="64" y="38" width="38" height="46" rx="8" fill={W6} />
      </g>
      <path className="aa-shift" d="M40 26c14-8 30-8 42 2" fill="none" stroke={W} strokeWidth="3.5" strokeLinecap="round" />
      <path className="aa-shift" d="M78 22l6 6-8 4" fill="none" stroke={W} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
    </g>
  ),
  martinimatch: (
    <g>
      <path d="M20 26h80L64 66v26h14a4 4 0 010 8H42a4 4 0 010-8h14V66z" fill={W} />
      <circle className="aa-bobble" cx="72" cy="40" r="7" fill={INK} opacity="0.5" />
      <path className="aa-rise" d="M84 20V8" stroke={W6} strokeWidth="3.5" strokeLinecap="round" />
    </g>
  ),
  // ---- Reflex -------------------------------------------------------
  typerace: (
    <g>
      <g fill={W}>
        <rect className="aa-press" style={{ '--i': 0 }} x="18" y="44" width="26" height="26" rx="6" />
        <rect className="aa-press" style={{ '--i': 1 }} x="48" y="44" width="26" height="26" rx="6" />
        <rect className="aa-press" style={{ '--i': 2 }} x="78" y="44" width="26" height="26" rx="6" />
      </g>
      <rect x="30" y="76" width="62" height="16" rx="5" fill={W6} />
      <g stroke={W3} strokeWidth="4" strokeLinecap="round">
        <path d="M12 26h44M12 36h26" />
      </g>
    </g>
  ),
  gregsegg: (
    <g>
      <path className="aa-bobble" d="M60 14c18 0 32 26 32 46a32 32 0 11-64 0c0-20 14-46 32-46z" fill={W} />
      <path d="M42 56l12-6-4 12 14-6-6 12 12-4" fill="none" stroke={INK} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" opacity="0.55" />
    </g>
  ),
  nathanielninja: (
    <g>
      <g className="aa-spin">
        <path d="M60 12l12 36 36 12-36 12-12 36-12-36-36-12 36-12z" fill={W} />
        <circle cx="60" cy="60" r="9" fill={INK} opacity="0.45" />
      </g>
      <text {...label} x="60" y="60" fontSize="14" fill={W}>7</text>
    </g>
  ),
  nickofttime: (
    <g>
      <circle cx="60" cy="66" r="34" fill="none" stroke={W} strokeWidth="5" />
      <rect x="50" y="12" width="20" height="10" rx="4" fill={W} />
      <path d="M60 22v10" stroke={W} strokeWidth="5" strokeLinecap="round" />
      <path className="aa-tick" d="M60 66V44" stroke={W} strokeWidth="5" strokeLinecap="round" />
      <path d="M60 66l16 10" stroke={W6} strokeWidth="4" strokeLinecap="round" />
      <circle cx="60" cy="66" r="4" fill={W} />
    </g>
  ),
  colourclash: (
    <g>
      <circle className="aa-pop" style={{ '--i': 0 }} cx="44" cy="48" r="26" fill={W} opacity="0.85" />
      <circle className="aa-pop" style={{ '--i': 1 }} cx="76" cy="48" r="26" fill={W} opacity="0.45" />
      <circle className="aa-pop" style={{ '--i': 2 }} cx="60" cy="78" r="26" fill={W} opacity="0.62" />
    </g>
  ),
  latcham: (
    <g>
      <path className="aa-shackle" d="M40 52V38a20 20 0 0140 0v14" fill="none" stroke={W} strokeWidth="6" strokeLinecap="round" />
      <rect x="26" y="50" width="68" height="52" rx="12" fill={W} />
      <circle cx="60" cy="70" r="7" fill={INK} opacity="0.5" />
      <path d="M60 77v12" stroke={INK} strokeWidth="5" strokeLinecap="round" opacity="0.5" />
    </g>
  ),
  geoffsgeometry: (
    <g fill="none" stroke={W} strokeWidth="5" strokeLinejoin="round">
      <circle className="aa-pop" style={{ '--i': 0 }} cx="34" cy="34" r="20" />
      <rect className="aa-pop" style={{ '--i': 1 }} x="66" y="14" width="40" height="40" rx="6" stroke={W6} />
      <path className="aa-pop" style={{ '--i': 2 }} d="M60 64l26 40H34z" fill={W} stroke="none" />
    </g>
  ),
  // ---- Chaos --------------------------------------------------------
  diceroll: (
    <g>
      <g className="aa-tumble">
        <rect x="14" y="42" width="48" height="48" rx="10" fill={W} transform="rotate(-10 38 66)" />
        <g fill={INK} opacity="0.6">
          <circle cx="27" cy="55" r="4" />
          <circle cx="38" cy="66" r="4" />
          <circle cx="49" cy="77" r="4" />
        </g>
      </g>
      <g className="aa-tumble" style={{ '--i': 1 }}>
        <rect x="62" y="26" width="42" height="42" rx="9" fill={W6} transform="rotate(12 83 47)" />
        <g fill={INK} opacity="0.5">
          <circle cx="74" cy="38" r="3.6" />
          <circle cx="92" cy="56" r="3.6" />
        </g>
      </g>
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
