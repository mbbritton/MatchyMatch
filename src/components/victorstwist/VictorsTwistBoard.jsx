import { useState, useEffect, useCallback, useRef } from 'react'

// ── Constants ─────────────────────────────────────────────────────

const GAME_DURATION = 30  // seconds
const SPAWN_INTERVAL = 800  // ms between pretzel spawns
const FALL_SPEED = 2.5  // pixels per frame
const PRETZEL_SIZE = 50  // pixels
const BASKET_WIDTH = 80
const BASKET_HEIGHT = 70

// ── Helpers ───────────────────────────────────────────────────────

function randomX(max) {
  return Math.floor(Math.random() * (max - PRETZEL_SIZE))
}

// ── Pretzel component ─────────────────────────────────────────────

function FallingPretzel({ x, y, onCatch }) {
  return (
    <div
      style={{
        position: 'absolute',
        left: x,
        top: y,
        fontSize: PRETZEL_SIZE,
        lineHeight: 1,
        cursor: 'pointer',
        userSelect: 'none',
        transition: 'transform 0.1s ease',
      }}
      onClick={onCatch}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.2)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
    >
      🥨
    </div>
  )
}

// ── Score popup ───────────────────────────────────────────────────

function ScorePopup({ x, y, id }) {
  return (
    <div
      key={id}
      style={{
        position: 'absolute',
        left: x + PRETZEL_SIZE / 2,
        top: y,
        pointerEvents: 'none',
        fontSize: '1.5rem',
        fontWeight: 800,
        color: '#ff9f0a',
        animation: 'score-float 0.8s ease-out forwards',
        zIndex: 999,
        textShadow: '0 2px 8px rgba(0,0,0,0.15)',
        transform: 'translate(-50%, 0)',
      }}
    >
      +10
    </div>
  )
}

// ── Game Over screen ──────────────────────────────────────────────

function GameOverScreen({ score, caught, missed, onPlayAgain }) {
  const total = caught + missed
  const accuracy = total > 0 ? Math.round((caught / total) * 100) : 0
  const rating =
    score >= 200
      ? { emoji: '🏆', label: 'Pretzel Master!', color: '#ffd700' }
      : score >= 150
        ? { emoji: '🎉', label: 'Twisted Pro!', color: '#34c759' }
        : score >= 100
          ? { emoji: '🥨', label: 'Getting Salty!', color: '#ff9f0a' }
          : { emoji: '🥖', label: 'Bread Beginner', color: '#ff6b6b' }

  return (
    <div
      className="spring-pop flex flex-col items-center gap-6 p-8 rounded-3xl w-full max-w-sm mx-auto"
      style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-xl)' }}
    >
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 22,
          background: `linear-gradient(145deg, ${rating.color}, ${rating.color}cc)`,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: 36,
          boxShadow: `0 8px 24px ${rating.color}40`,
        }}
      >
        {rating.emoji}
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--label-primary)',
          }}
        >
          {rating.label}
        </h2>
        <p style={{ fontSize: '0.95rem', color: 'var(--label-tertiary)' }}>
          Victor's pretzels have been judged.
        </p>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-3 gap-3 w-full"
        style={{ borderTop: '1px solid var(--fill-tertiary)', paddingTop: '1.25rem' }}
      >
        {[
          { label: 'Score', value: score, color: '#0a84ff' },
          { label: 'Caught', value: caught, color: '#34c759' },
          { label: 'Accuracy', value: `${accuracy}%`, color: '#ff9f0a' },
        ].map(({ label, value, color }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span style={{ fontSize: '1.25rem', fontWeight: 700, color }}>
              {value}
            </span>
            <span
              style={{
                fontSize: '0.65rem',
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

      <button onClick={onPlayAgain} className="btn-primary w-full">
        Play Again
      </button>
    </div>
  )
}

// ── Main Board ────────────────────────────────────────────────────

export default function VictorsTwistBoard() {
  const [phase, setPhase] = useState('menu') // menu | playing | gameover
  const [pretzels, setPretzels] = useState([])
  const [basketX, setBasketX] = useState(0)
  const [timeLeft, setTimeLeft] = useState(GAME_DURATION)
  const [score, setScore] = useState(0)
  const [caught, setCaught] = useState(0)
  const [missed, setMissed] = useState(0)
  const [scorePopups, setScorePopups] = useState([])
  const [gameWidth, setGameWidth] = useState(400)

  const pretzelIdRef = useRef(0)
  const popupIdRef = useRef(0)
  const gameAreaRef = useRef(null)
  const animationFrameRef = useRef(null)

  useEffect(() => {
    if (gameAreaRef.current) {
      setGameWidth(gameAreaRef.current.offsetWidth)
      setBasketX((gameAreaRef.current.offsetWidth - BASKET_WIDTH) / 2)
    }
  }, [phase])

  const endGame = useCallback(() => {
    setPhase('gameover')
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current)
    }
  }, [])

  // ── Countdown timer ───────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id)
          endGame()
          return 0
        }
        return t - 1
      })
    }, 1000)
    return () => clearInterval(id)
  }, [phase, endGame])

  // ── Pretzel spawner ───────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return

    const spawnInterval = setInterval(() => {
      const id = ++pretzelIdRef.current
      setPretzels((prev) => [
        ...prev,
        { id, x: randomX(gameWidth), y: -PRETZEL_SIZE }
      ])
    }, SPAWN_INTERVAL)

    return () => clearInterval(spawnInterval)
  }, [phase, gameWidth])

  // ── Animation loop (move pretzels) ────────────────────────────
  useEffect(() => {
    if (phase !== 'playing') return

    const animate = () => {
      setPretzels((prev) => {
        const updated = prev
          .map((p) => ({ ...p, y: p.y + FALL_SPEED }))
          .filter((p) => {
            // Check if pretzel hit the ground
            if (p.y >= 400) {
              setMissed((m) => m + 1)
              return false
            }
            return true
          })
        return updated
      })
      animationFrameRef.current = requestAnimationFrame(animate)
    }

    animationFrameRef.current = requestAnimationFrame(animate)
    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current)
      }
    }
  }, [phase])

  // ── Catch pretzel ─────────────────────────────────────────────
  const handleCatch = useCallback((pretzelId, x, y) => {
    setPretzels((prev) => prev.filter((p) => p.id !== pretzelId))
    setScore((s) => s + 10)
    setCaught((c) => c + 1)

    // Score popup
    const pid = ++popupIdRef.current
    setScorePopups((p) => [...p, { id: pid, x, y }])
    setTimeout(() => {
      setScorePopups((p) => p.filter((x) => x.id !== pid))
    }, 800)
  }, [])

  // ── Mouse move for basket ─────────────────────────────────────
  const handleMouseMove = useCallback((e) => {
    if (phase !== 'playing' || !gameAreaRef.current) return
    const rect = gameAreaRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left - BASKET_WIDTH / 2
    setBasketX(Math.max(0, Math.min(x, gameWidth - BASKET_WIDTH)))
  }, [phase, gameWidth])

  // ── Start / restart ───────────────────────────────────────────
  const startGame = () => {
    setPretzels([])
    setTimeLeft(GAME_DURATION)
    setScore(0)
    setCaught(0)
    setMissed(0)
    setScorePopups([])
    pretzelIdRef.current = 0
    popupIdRef.current = 0
    setPhase('playing')
  }

  // ── Menu ──────────────────────────────────────────────────────
  if (phase === 'menu') {
    return (
      <div className="flex flex-col items-center gap-8 w-full max-w-md mx-auto">
        <style>{KEYFRAMES}</style>
        <div className="flex flex-col items-center gap-3 text-center">
          <span style={{ fontSize: '4rem' }}>🥨</span>
          <h2
            style={{
              fontSize: '2rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--label-primary)',
            }}
          >
            Victor's Twist
          </h2>
          <p style={{ fontSize: '1rem', color: 'var(--label-secondary)', maxWidth: 320 }}>
            Victor's pretzel factory is in chaos! Catch the falling pretzels before they hit the ground. Move your mouse to control the basket!
          </p>
        </div>

        <div
          className="flex flex-col gap-3 w-full rounded-2xl p-5"
          style={{ background: 'var(--fill-tertiary)' }}
        >
          {[
            { emoji: '🥨', text: 'Click falling pretzels to catch them — 10 pts each' },
            { emoji: '🧺', text: 'Move your mouse to position the basket' },
            { emoji: '💔', text: 'Miss a pretzel and it's game over points!' },
            { emoji: '⏱️', text: `You have ${GAME_DURATION} seconds. Go fast!` },
          ].map(({ emoji, text }) => (
            <div key={text} className="flex items-center gap-3">
              <span style={{ fontSize: '1.5rem', width: 32, textAlign: 'center' }}>{emoji}</span>
              <span style={{ fontSize: '0.9rem', color: 'var(--label-secondary)' }}>{text}</span>
            </div>
          ))}
        </div>

        <button onClick={startGame} className="btn-primary w-full" style={{ maxWidth: 320 }}>
          🥨 Let's Get Twisted!
        </button>
      </div>
    )
  }

  // ── Game Over ─────────────────────────────────────────────────
  if (phase === 'gameover') {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto">
        <style>{KEYFRAMES}</style>
        <GameOverScreen
          score={score}
          caught={caught}
          missed={missed}
          onPlayAgain={startGame}
        />
      </div>
    )
  }

  // ── Playing ───────────────────────────────────────────────────
  const timerColor =
    timeLeft <= 5 ? '#ff3b30' : timeLeft <= 10 ? '#ff9f0a' : '#34c759'

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto">
      <style>{KEYFRAMES}</style>

      {/* Header */}
      <h2
        style={{
          fontSize: '1.5rem',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          color: 'var(--label-primary)',
          textAlign: 'center',
        }}
      >
        Victor's Twist 🥨
      </h2>

      {/* Stats row */}
      <div className="flex items-center justify-center gap-4 flex-wrap">
        {[
          { label: 'Time', value: `${timeLeft}s`, color: timerColor },
          { label: 'Score', value: score, color: '#0a84ff' },
          { label: 'Caught', value: caught, color: '#34c759' },
          { label: 'Missed', value: missed, color: '#ff6b6b' },
        ].map(({ label, value, color }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-2xl"
            style={{ background: 'var(--fill-tertiary)' }}
          >
            <span
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color,
                letterSpacing: '-0.02em',
                animation:
                  label === 'Time' && timeLeft <= 5 ? 'pulse-warn 0.8s infinite' : 'none',
              }}
            >
              {value}
            </span>
            <span
              style={{
                fontSize: '0.65rem',
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

      {/* Timer bar */}
      <div
        style={{
          width: '100%',
          height: 6,
          borderRadius: 999,
          background: 'var(--fill-tertiary)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: `${(timeLeft / GAME_DURATION) * 100}%`,
            borderRadius: 999,
            background: timerColor,
            transition: 'width 1s linear, background 0.3s',
          }}
        />
      </div>

      {/* Game Area */}
      <div
        ref={gameAreaRef}
        onMouseMove={handleMouseMove}
        style={{
          position: 'relative',
          width: '100%',
          height: 450,
          borderRadius: 16,
          border: '3px solid var(--fill-tertiary)',
          background: 'linear-gradient(180deg, var(--bg-surface) 0%, var(--fill-secondary) 100%)',
          overflow: 'hidden',
          cursor: 'none',
        }}
      >
        {scorePopups.map(({ id, x, y }) => (
          <ScorePopup key={id} id={id} x={x} y={y} />
        ))}

        {pretzels.map((pretzel) => (
          <FallingPretzel
            key={pretzel.id}
            x={pretzel.x}
            y={pretzel.y}
            onCatch={() => handleCatch(pretzel.id, pretzel.x, pretzel.y)}
          />
        ))}

        {/* Basket */}
        <div
          style={{
            position: 'absolute',
            left: basketX,
            bottom: 20,
            width: BASKET_WIDTH,
            height: BASKET_HEIGHT,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '3rem',
            transition: 'left 0.1s ease-out',
            pointerEvents: 'none',
          }}
        >
          🧺
        </div>
      </div>

      <p
        style={{
          fontSize: '0.78rem',
          color: 'var(--label-tertiary)',
          textAlign: 'center',
          maxWidth: 300,
        }}
      >
        Move your mouse to catch Victor's pretzels! 🥨
      </p>
    </div>
  )
}

// ── Keyframe animations ───────────────────────────────────────────

const KEYFRAMES = `
@keyframes score-float {
  0%   { opacity: 1; transform: translate(-50%, 0); }
  100% { opacity: 0; transform: translate(-50%, -60px); }
}
@keyframes pulse-warn {
  0%, 100% { opacity: 1; }
  50%       { opacity: 0.4; }
}
@keyframes spring-pop {
  0%   { transform: scale(0.8); opacity: 0; }
  60%  { transform: scale(1.05); }
  100% { transform: scale(1); opacity: 1; }
}
`
