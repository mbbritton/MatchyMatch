export default function Header({ activeGame, onGameChange }) {
  return (
    <header
      style={{
        background: "rgba(242,242,247,0.85)",
        backdropFilter: "blur(24px) saturate(180%)",
        WebkitBackdropFilter: "blur(24px) saturate(180%)",
        borderBottom: "0.5px solid rgba(0,0,0,0.12)",
      }}
      className="w-full sticky top-0 z-40"
    >
      <div className="max-w-2xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-4">

        {/* Wordmark */}
        <div className="flex items-center gap-2.5 shrink-0 min-w-0">
          <div
            style={{
              width: 30,
              height: 30,
              borderRadius: 8,
              background: "var(--accent)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              boxShadow: "0 2px 8px rgba(0,122,255,0.35)",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <rect x="3" y="3" width="7" height="7" rx="1.5" fill="white" opacity="0.9"/>
              <rect x="14" y="3" width="7" height="7" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="3" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.6"/>
              <rect x="14" y="14" width="7" height="7" rx="1.5" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <h1
            className="select-none leading-none"
            style={{
              fontSize: "clamp(1.1rem, 3.5vw, 1.3rem)",
              fontWeight: 700,
              letterSpacing: "-0.025em",
              color: "var(--label-primary)",
            }}
          >
            Puzzlr
          </h1>
        </div>

        {/* Game switcher — iOS segmented control */}
        <nav className="seg-control" role="tablist" aria-label="Game switcher">
          {[
            { id: "matchy",   label: "Matchy"   },
            { id: "wordle",   label: "Wordle"   },
            { id: "crunch",   label: "Crunch"   },
            { id: "cross",    label: "Cross"    },
            { id: "chain",    label: "Chain"    },
            { id: "scramble", label: "Scramble" },
            { id: "anagram",  label: "Anagram"  },
            { id: "sudoku",   label: "Sudoku"   },
          ].map(({ id, label }) => {
            const active = activeGame === id;
            return (
              <button
                key={id}
                role="tab"
                aria-selected={active}
                onClick={() => onGameChange(id)}
                className={`seg-control__btn${active ? " seg-control__btn--active" : ""}`}
              >
                {label}
              </button>
            );
          })}
        </nav>

      </div>
    </header>
  );
}
