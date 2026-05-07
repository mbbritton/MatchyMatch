export default function ModeToggle({ mode, onChange, disabled }) {
  return (
    <div className="mode-toggle" aria-label="Difficulty selector">

      <span className="mode-toggle__label">Mode</span>

      <div
        className={`seg-control seg-control--sm${disabled ? " seg-control--locked" : ""}`}
        role="group"
        aria-label="Difficulty"
      >
        {[
          { id: "normal", label: "Normal", icon: "✦" },
          { id: "hard",   label: "Hard",   icon: "⚡" },
        ].map(({ id, label, icon }) => {
          const active = mode === id;
          return (
            <button
              key={id}
              onClick={() => !disabled && onChange(id)}
              disabled={disabled && !active}
              aria-pressed={active}
              className={`seg-control__btn${active ? " seg-control__btn--active" : ""}`}
            >
              <span className="seg-control__icon" aria-hidden="true">{icon}</span>
              {label}
            </button>
          );
        })}
      </div>

      {disabled && (
        <span className="mode-toggle__locked-badge" aria-label="Difficulty locked">
          <svg
            width="9" height="9"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
            <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
          </svg>
          locked
        </span>
      )}

    </div>
  );
}
