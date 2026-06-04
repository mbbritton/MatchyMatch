import { useState, useEffect, useRef, useCallback } from 'react'

// ── Constants ────────────────────────────────────────────────────────────────

const BUTTONS = [
  { id: 0, label: 'Green',  color: '#34c759', activeColor: '#a8f5bc', shadow: 'rgba(52,199,89,0.55)' },
  { id: 1, label: 'Red',    color: '#ff3b30', activeColor: '#ffb3af', shadow: 'rgba(255,59,48,0.55)' },
  { id: 2, label: 'Yellow', color: '#ffd60a', activeColor: '#fff3a3', shadow: 'rgba(255,214,10,0.55)' },
  { id: 3, label: 'Blue',   color: '#0a84ff', activeColor: '#a3d4ff', shadow: 'rgba(10,132,255,0.55)' },
]

// Playback speed tiers (ms per flash)
const SPEEDS = [
  { label: 'Easy',   flashMs: 700, gapMs: 200 },
  { label: 'Normal', flashMs: 500, gapMs: 150 },
  { label: 'Hard',   flashMs: 300, gapMs: 100 },
]

// ── Helpers ──────────────────────────────────────────────────────────────────

function randomButton() {
  return Math.floor(Math.random() * 4)
}

// ── Simon button ─────────────────────────────────────────────────────────────

function SimonButton({ btn, isLit, isDisabled, onClick }) {
  return (
    <button
      onClick={() => !isDisabled && onClick(btn.id)}
      disabled={isDisabled}
      aria-label={btn.label}
      style={{
        width: '100%',
        aspectRatio: '1 / 1',
        borderRadius: 20,
        border: 'none',
        cursor: isDisabled ? 'default' : 'pointer',
        background: isLit ? btn.activeColor : btn.color,
        boxShadow: isLit
          ? `0 0 32px 8px ${btn.shadow}, inset 0 2px 8px rgba(255,255,255,0.4)`
          : `0 4px 16px ${btn.shadow}40, inset 0 2px 4px rgba(255,255,255,0.2)`,
        transform: isLit ? 'scale(1.07)' : 'scale(1)',
        transition: 'transform 0.1s ease, background 0.08s ease, box-shadow 0.1s ease',
        outline: 'none',
        opacity: isDisabled && !isLit ? 0.75 : 1,
      }}
    />
  )
}

// ── Stats bar ─────────────────────────────────────────────────────────────────

function StatsBar({ round, best }) {
  return (
    <div className="flex items-center gap-4 justify-center flex-wrap">
      {[
        { label: 'Round', value: round },
        { label: 'Best',  value: best  },
      ].map(({ label, value }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-0.5 px-5 py-2 rounded-2xl"
          style={{ background: 'var(--fill-tertiary)', minWidth: 80 }}
        >
          <span
            style={{
              fontSize: '1.2rem',
              fontWeight: 700,
              letterSpacing: '-0.02em',
              color: 'var(--label-primary)',
            }}
          >
            {value}
          </span>
          <span
            style={{
              fontSize: '0.62rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--label-tertiary)',
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

// ── Speed picker ──────────────────────────────────────────────────────────────

function SpeedPicker({ selected, onChange, disabled }) {
  return (
    <div className="flex items-center gap-2">
      <span
        style={{
          fontSize: '0.72rem',
          fontWeight: 600,
          letterSpacing: '0.05em',
          textTransform: 'uppercase',
          color: 'var(--label-tertiary)',
        }}
      >
        Speed
      </span>
      <div className="flex gap-1.5">
        {SPEEDS.map((s, i) => {
          const active = selected === i
          return (
            <button
              key={s.label}
              onClick={() => !disabled && onChange(i)}
              disabled={disabled}
              style={{
                padding: '4px 12px',
                borderRadius: 999,
                border: 'none',
                fontSize: '0.78rem',
                fontWeight: active ? 600 : 500,
                cursor: disabled ? 'not-allowed' : 'pointer',
                background: active ? 'var(--accent)' : 'var(--fill-tertiary)',
                color: active ? '#fff' : 'var(--label-secondary)',
                boxShadow: active ? '0 2px 8px rgba(0,122,255,0.3)' : 'none',
                transition: 'all 0.15s ease',
                opacity: disabled && !active ? 0.5 : 1,
              }}
            >
              {s.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

// ── Main board ────────────────────────────────────────────────────────────────

export default function SimonSaysBoard() {
  // Game state
  const [status, setStatus] = useState('idle') // idle | showing | input | lost
  const [sequence, setSequence] = useState([])
  const [playerIndex, setPlayerIndex] = useState(0)
  const [litButton, setLitButton] = useState(null)
  const [round, setRound] = useState(0)
  const [best, setBest] = useState(0)
  const [speedIdx, setSpeedIdx] = useState(1)
  const [message, setMessage] = useState('Press Start to play!')
  const [wrongFlash, setWrongFlash] = useState(false)

  const timeoutsRef = useRef([])

  // Clear all pending timeouts
  const clearAll = useCallback(() => {
    timeoutsRef.current.forEach(clearTimeout)
    timeoutsRef.current = []
  }, [])

  const schedule = useCallback((fn, ms) => {
    const id = setTimeout(fn, ms)
    timeoutsRef.current.push(id)
    return id
  }, [])

  // ── Play back the sequence ──────────────────────────────────────
  const playSequence = useCallback(
    (seq) => {
      setStatus('showing')
      setPlayerIndex(0)
      setMessage('Watch carefully…')

      const { flashMs, gapMs } = SPEEDS[speedIdx]
      const stepMs = flashMs + gapMs

      seq.forEach((btnId, i) => {
        // Light up
        schedule(() => setLitButton(btnId), i * stepMs)
        // Turn off
        schedule(() => setLitButton(null), i * stepMs + flashMs)
      })

      // After all flashes, allow player input
      schedule(() => {
        setStatus('input')
        setMessage('Your turn!')
      }, seq.length * stepMs + 100)
    },
    [speedIdx, schedule]
  )

  // ── Start / restart ─────────────────────────────────────────────
  const startGame = useCallback(() => {
    clearAll()
    const first = [randomButton()]
    setSequence(first)
    setRound(1)
    setPlayerIndex(0)
    setWrongFlash(false)
    playSequence(first)
  }, [clearAll, playSequence])

  // ── Handle player button press ──────────────────────────────────
  const handleButtonPress = useCallback(
    (btnId) => {
      if (status !== 'input') return

      const expected = sequence[playerIndex]

      if (btnId !== expected) {
        // Wrong!
        clearAll()
        setLitButton(null)
        setWrongFlash(true)
        setStatus('lost')
        setBest((b) => Math.max(b, round - 1))
        setMessage(`Wrong! You reached round ${round}.`)
        return
      }

      // Correct press — light it briefly
      setLitButton(btnId)
      schedule(() => setLitButton(null), 200)

      const nextIndex = playerIndex + 1

      if (nextIndex === sequence.length) {
        // Completed the sequence — advance to next round
        const newRound = round + 1
        const newSeq = [...sequence, randomButton()]
        setSequence(newSeq)
        setRound(newRound)
        setPlayerIndex(0)
        setStatus('showing')
        setMessage('Nice! Get ready…')
        setBest((b) => Math.max(b, newRound - 1))

        schedule(() => playSequence(newSeq), 900)
      } else {
        setPlayerIndex(nextIndex)
      }
    },
    [status, sequence, playerIndex, round, clearAll, schedule, playSequence]
  )

  // ── Cleanup on unmount ──────────────────────────────────────────
  useEffect(() => () => clearAll(), [clearAll])

  const isDisabled = status !== 'input'

  // ── Status message colour ───────────────────────────────────────
  const msgColor =
    status === 'lost'
      ? '#ff3b30'
      : status === 'input'
        ? '#34c759'
        : 'var(--label-secondary)'

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-sm mx-auto px-4 sm:px-6 pt-6 pb-12">

      {/* Title */}
      <div className="flex flex-col items-center gap-1">
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--label-primary)',
          }}
        >
          Simon Says
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--label-tertiary)', textAlign: 'center' }}>
          Repeat the colour sequence — one step longer each round!
        </p>
      </div>

      {/* Stats */}
      <StatsBar round={round} best={best} />

      {/* Speed picker (only when idle or lost) */}
      <SpeedPicker
        selected={speedIdx}
        onChange={setSpeedIdx}
        disabled={status === 'showing' || status === 'input'}
      />

      {/* Status message */}
      <div
        style={{
          fontSize: '1rem',
          fontWeight: 600,
          color: msgColor,
          minHeight: 28,
          textAlign: 'center',
          transition: 'color 0.2s ease',
        }}
      >
        {message}
      </div>

      {/* Simon grid — 2×2 */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 16,
          width: '100%',
          maxWidth: 320,
          padding: 20,
          borderRadius: 28,
          background: 'var(--bg-surface)',
          boxShadow: wrongFlash
            ? '0 0 0 4px rgba(255,59,48,0.5), var(--shadow-xl)'
            : 'var(--shadow-xl)',
          transition: 'box-shadow 0.2s ease',
        }}
      >
        {BUTTONS.map((btn) => (
          <SimonButton
            key={btn.id}
            btn={btn}
            isLit={litButton === btn.id}
            isDisabled={isDisabled}
            onClick={handleButtonPress}
          />
        ))}
      </div>

      {/* Progress dots */}
      {status !== 'idle' && sequence.length > 0 && (
        <div className="flex gap-1.5 flex-wrap justify-center" style={{ maxWidth: 280 }}>
          {sequence.map((btnId, i) => (
            <div
              key={i}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background:
                  status === 'input' && i < playerIndex
                    ? BUTTONS[btnId].color
                    : status === 'input' && i === playerIndex
                      ? 'var(--accent)'
                      : 'var(--fill-secondary)',
                transition: 'background 0.2s ease',
                boxShadow:
                  status === 'input' && i === playerIndex
                    ? '0 0 6px rgba(0,122,255,0.6)'
                    : 'none',
              }}
            />
          ))}
        </div>
      )}

      {/* Action buttons */}
      {status === 'idle' || status === 'lost' ? (
        <button onClick={startGame} className="btn-primary">
          {status === 'lost' ? '🔄 Try Again' : '▶ Start Game'}
        </button>
      ) : (
        <button onClick={startGame} className="btn-ghost">
          🔄 Restart
        </button>
      )}

      {/* Instructions */}
      <p
        className="text-center"
        style={{
          fontSize: '0.75rem',
          color: 'var(--label-tertiary)',
          letterSpacing: '-0.01em',
          maxWidth: 280,
        }}
      >
        Watch the colours light up, then tap them back in the same order. Each round adds one more step!
      </p>
    </div>
  )
}
