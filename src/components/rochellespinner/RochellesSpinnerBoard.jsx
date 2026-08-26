import { useState } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

// Segments alternate win/lose (even index = win) so the wheel is a coin
// flip in disguise. Winners get warm gold/green wedges, losers get red —
// so the odds are readable on the wheel itself, not just after landing.
const segments = ['🎉', '🌟', '💎', '🎁', '🏆', '🎪', '🎨', '🎭']
const winPalette = ['#facc15', '#22c55e', '#eab308', '#16a34a']
const losePalette = ['#f87171', '#ef4444', '#fb7185', '#e11d48']
const colors = segments.map((_, i) =>
  i % 2 === 0 ? winPalette[i / 2] : losePalette[(i - 1) / 2]
)
const segmentSize = 360 / segments.length
const JACKPOT_INDEX = segments.indexOf('🏆')

export default function RochellesSpinnerBoard() {
  const [isSpinning, setIsSpinning] = useState(false)
  const [result, setResult] = useState(null)
  const [wins, setWins] = useState(0)
  const [losses, setLosses] = useState(0)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [message, setMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [confettiCount, setConfettiCount] = useState(60)
  const [rotation, setRotation] = useState(0)

  const handleSpin = () => {
    if (isSpinning) return

    setIsSpinning(true)
    setResult(null)
    setMessage('')

    // Generate random rotation. `spins` must be a whole number of turns —
    // a fractional value would itself shift the final resting angle away
    // from the intended segment.
    const spins = 5 + Math.floor(Math.random() * 5) // 5-9 full rotations
    const randomSegment = Math.floor(Math.random() * segments.length)
    // The pointer is fixed at the top (0deg). To land segment i's centre
    // under it after a clockwise rotation, rotate by 360 minus that centre
    // angle (rotating the wheel clockwise moves each wedge's angle forward,
    // so the wedge that ends up at the top is the one at -rotation).
    const segmentCenterAngle = segmentSize * randomSegment + segmentSize / 2
    const finalRotation = spins * 360 - segmentCenterAngle

    setRotation(finalRotation)

    const currentStreak = streak

    // Simulate spin animation
    setTimeout(() => {
      setResult(randomSegment)

      const isWin = randomSegment % 2 === 0
      const isJackpot = randomSegment === JACKPOT_INDEX

      if (isWin) {
        const nextStreak = currentStreak + 1
        setWins((w) => w + 1)
        setStreak(nextStreak)
        setBestStreak((b) => Math.max(b, nextStreak))
        setConfettiCount(isJackpot ? 150 : 60)
        setMessage(
          isJackpot
            ? '🏆 JACKPOT! Amazing spin!'
            : nextStreak >= 3
            ? `🎉 You won! 🔥 ${nextStreak} in a row!`
            : '🎉 You won!'
        )
        setShowConfetti(true)
      } else {
        setLosses((l) => l + 1)
        setStreak(0)
        setMessage('❌ Try again!')
      }

      setIsSpinning(false)
    }, 3000)
  }

  const handleReset = () => {
    setResult(null)
    setMessage('')
    setShowConfetti(false)
  }

  const handleNewGame = () => {
    setResult(null)
    setWins(0)
    setLosses(0)
    setStreak(0)
    setBestStreak(0)
    setMessage('')
    setShowConfetti(false)
    setRotation(0)
  }

  const isJackpotResult = result === JACKPOT_INDEX

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--label-primary)' }}
        >
          Rochelle's Spinner
        </h2>
        <p
          className="text-sm"
          style={{ color: 'var(--label-secondary)' }}
        >
          Spin the wheel and try your luck!
        </p>
      </div>

      {/* Legend */}
      <div
        className="flex items-center justify-center gap-4 text-xs mb-4"
        style={{ color: 'var(--label-secondary)' }}
      >
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: winPalette[1] }}
          />
          Gold & green win
        </span>
        <span className="flex items-center gap-1.5">
          <span
            className="w-2.5 h-2.5 rounded-full"
            style={{ backgroundColor: losePalette[1] }}
          />
          Red loses
        </span>
      </div>

      {/* Score */}
      <div
        className="text-center p-4 rounded-lg mb-6 font-semibold"
        style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-primary)' }}
      >
        <p>Wins: {wins} | Losses: {losses}</p>
        <p className="text-sm mt-1" style={{ color: 'var(--label-secondary)' }}>
          Win Rate: {wins + losses > 0 ? Math.round((wins / (wins + losses)) * 100) : 0}%
          {bestStreak >= 2 && <> · Best streak: 🔥 {bestStreak}</>}
        </p>
      </div>

      {/* Spinner */}
      <div className="flex justify-center mb-8">
        <div
          className="relative w-64 h-64 rounded-full"
          style={{
            boxShadow:
              result === null
                ? 'none'
                : result % 2 === 0
                ? '0 0 0 6px rgba(34,197,94,0.5), 0 0 30px rgba(34,197,94,0.35)'
                : '0 0 0 6px rgba(239,68,68,0.5), 0 0 30px rgba(239,68,68,0.35)',
            transition: 'box-shadow 0.4s ease',
          }}
          key={isJackpotResult ? `jackpot-${rotation}` : 'wheel'}
        >
          {/* Pointer */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 z-10">
            <div
              className="w-0 h-0 border-l-4 border-r-4 border-t-8"
              style={{
                borderLeftColor: 'transparent',
                borderRightColor: 'transparent',
                borderTopColor: 'var(--label-primary)',
              }}
            />
          </div>

          {/* Wheel */}
          <div
            className={`w-full h-full rounded-full flex items-center justify-center transition-transform ${
              isJackpotResult ? 'shake' : ''
            }`}
            style={{
              transform: `rotate(${rotation}deg)`,
              transitionDuration: isSpinning ? '3s' : '0s',
              transitionTimingFunction: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
              background: `conic-gradient(${colors.map((color, i) => `${color} ${(i * 360) / colors.length}deg ${((i + 1) * 360) / colors.length}deg`).join(', ')})`,
            }}
          >
            {/* Segment labels */}
            {segments.map((emoji, i) => {
              const angle = segmentSize * i + segmentSize / 2
              return (
                <div
                  key={i}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    width: 0,
                    height: 0,
                    transform: `rotate(${angle}deg)`,
                  }}
                >
                  <span
                    style={{
                      position: 'absolute',
                      top: '-92px',
                      left: 0,
                      transform: `translate(-50%, -50%) rotate(${-angle}deg)`,
                      width: '2rem',
                      height: '2rem',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.25rem',
                      lineHeight: 1,
                      backgroundColor: 'rgba(255,255,255,0.85)',
                      borderRadius: '9999px',
                      boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
                    }}
                  >
                    {emoji}
                  </span>
                </div>
              )
            })}

            {/* Center circle */}
            <div
              className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
              style={{ backgroundColor: 'var(--fill-primary)' }}
            >
              🎡
            </div>
          </div>
        </div>
      </div>

      {/* Result Text */}
      {result !== null && (
        <div className="text-center mb-6 spring-pop">
          <p
            className="text-2xl font-bold"
            style={{ color: isJackpotResult ? '#eab308' : 'var(--label-primary)' }}
          >
            {segments[result]}
          </p>
        </div>
      )}

      {/* Spin Button */}
      <button
        onClick={handleSpin}
        disabled={isSpinning}
        className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-opacity disabled:opacity-50 mb-6"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        {isSpinning ? 'Spinning...' : 'Spin the Wheel'}
      </button>

      {/* Action Buttons */}
      {result !== null && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleReset}
            className="flex-1 px-6 py-3 rounded-lg font-semibold"
            style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-primary)' }}
          >
            Again
          </button>
          <button
            onClick={handleNewGame}
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            New Game
          </button>
        </div>
      )}

      {/* Toast Message */}
      {message && <Toast message={message} />}

      {/* Confetti */}
      {showConfetti && <Confetti count={confettiCount} />}
    </div>
  )
}
