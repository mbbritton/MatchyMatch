import { useState } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

// ── Mystery data ─────────────────────────────────────────────────────────────

const MYSTERIES = [
  {
    answer: 'elephant',
    clues: [
      "I am the largest land animal on Earth.",
      "I have a long, flexible nose I use to drink and grab things.",
      "I live in Africa and Asia and travel in herds.",
      "My tusks are made of ivory.",
      "I never forget — or so they say.",
    ],
  },
  {
    answer: 'piano',
    clues: [
      "I have 88 keys but open no doors.",
      "I can be grand or upright.",
      "I produce sound when hammers strike strings inside me.",
      "Beethoven and Mozart were famous for playing me.",
      "My name comes from the Italian for 'soft and loud'.",
    ],
  },
  {
    answer: 'volcano',
    clues: [
      "I am a mountain, but I can be dangerous.",
      "I can be found on land or under the sea.",
      "I am formed where tectonic plates meet.",
      "I erupt with lava, ash, and gas.",
      "Pompeii was famously destroyed by one of me.",
    ],
  },
  {
    answer: 'library',
    clues: [
      "You can visit me for free in most cities.",
      "I am full of knowledge, but you must be quiet inside.",
      "You can borrow things from me and return them later.",
      "I am organised using the Dewey Decimal System.",
      "I house thousands of books, magazines, and more.",
    ],
  },
  {
    answer: 'chocolate',
    clues: [
      "I come in dark, milk, and white varieties.",
      "I am made from the seeds of the cacao tree.",
      "I melt at body temperature.",
      "Switzerland and Belgium are famous for making me.",
      "I am one of the world's most popular sweet treats.",
    ],
  },
  {
    answer: 'compass',
    clues: [
      "I am a tool used for navigation.",
      "I always point in the same direction.",
      "Sailors and hikers rely on me.",
      "I work because of Earth's magnetic field.",
      "My needle points toward magnetic north.",
    ],
  },
  {
    answer: 'penguin',
    clues: [
      "I am a bird, but I cannot fly.",
      "I am an excellent swimmer.",
      "I live in the Southern Hemisphere, mostly in Antarctica.",
      "I wear a natural black-and-white 'tuxedo'.",
      "I huddle together in large groups to stay warm.",
    ],
  },
  {
    answer: 'rainbow',
    clues: [
      "I appear in the sky after rain.",
      "I am caused by light refracting through water droplets.",
      "I have seven colours.",
      "You can never reach my end.",
      "Red, orange, yellow, green, blue, indigo, and violet make me up.",
    ],
  },
  {
    answer: 'submarine',
    clues: [
      "I am a vessel that travels underwater.",
      "I am used by navies around the world.",
      "I can stay submerged for weeks at a time.",
      "I use sonar to navigate in the dark depths.",
      "The Beatles sang a famous song about a yellow one of me.",
    ],
  },
  {
    answer: 'mirror',
    clues: [
      "I show you something, but it is reversed.",
      "I am made of glass with a reflective coating.",
      "Snow White's stepmother asked me a famous question.",
      "Breaking me is said to bring seven years of bad luck.",
      "I reflect light and show you your own image.",
    ],
  },
]

const POINTS_BY_CLUE = [500, 400, 300, 200, 100]

function pickRandomMystery() {
  return MYSTERIES[Math.floor(Math.random() * MYSTERIES.length)]
}

// ── Sub-components ────────────────────────────────────────────────────────────

function ClueCard({ clueNumber, text }) {
  return (
    <div
      className="rounded-xl p-4 mb-3"
      style={{ backgroundColor: 'var(--fill-secondary)', borderLeft: '4px solid var(--accent)' }}
    >
      <p
        className="text-xs font-semibold mb-1"
        style={{ color: 'var(--label-tertiary)', letterSpacing: '0.06em', textTransform: 'uppercase' }}
      >
        Clue {clueNumber}
      </p>
      <p style={{ color: 'var(--label-primary)', fontSize: '0.95rem', lineHeight: 1.5 }}>
        {text}
      </p>
    </div>
  )
}

// ── Main board ────────────────────────────────────────────────────────────────

export default function DerricksDerrictiveBoard() {
  const [gameState, setGameState] = useState('menu') // 'menu' | 'playing' | 'won' | 'lost'
  const [mystery, setMystery] = useState(null)
  const [cluesRevealed, setCluesRevealed] = useState(1)
  const [guess, setGuess] = useState('')
  const [message, setMessage] = useState('')
  const [messageKey, setMessageKey] = useState(0)
  const [score, setScore] = useState(0)
  const [totalScore, setTotalScore] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [wrongGuesses, setWrongGuesses] = useState([])

  const showMessage = (msg) => {
    setMessage(msg)
    setMessageKey((k) => k + 1)
  }

  const handleStart = () => {
    const m = pickRandomMystery()
    setMystery(m)
    setCluesRevealed(1)
    setGuess('')
    setMessage('')
    setWrongGuesses([])
    setScore(0)
    setShowConfetti(false)
    setGameState('playing')
  }

  const handleGuess = () => {
    if (!guess.trim()) return
    const normalised = guess.trim().toLowerCase()
    if (normalised === mystery.answer.toLowerCase()) {
      const earned = POINTS_BY_CLUE[cluesRevealed - 1]
      setScore(earned)
      setTotalScore((prev) => prev + earned)
      setShowConfetti(true)
      setGameState('won')
    } else {
      setWrongGuesses((prev) => [...prev, guess.trim()])
      showMessage(`🔎 Not quite, detective. Keep investigating!`)
      setGuess('')
    }
  }

  const handleNextClue = () => {
    if (cluesRevealed >= mystery.clues.length) {
      // All clues exhausted
      setGameState('lost')
    } else {
      setCluesRevealed((prev) => prev + 1)
      showMessage(`💡 New clue revealed!`)
    }
  }

  const handleGiveUp = () => {
    setGameState('lost')
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleGuess()
  }

  // ── Menu ──────────────────────────────────────────────────────────
  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🕵️</div>
          <h2
            className="text-3xl font-bold tracking-tight mb-2"
            style={{ color: 'var(--label-primary)' }}
          >
            Derrick's Derrictive
          </h2>
          <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
            Crack the case — deduce the mystery word from Derrick's clues!
          </p>
        </div>

        {totalScore > 0 && (
          <div
            className="px-6 py-3 rounded-xl text-center"
            style={{ backgroundColor: 'var(--fill-tertiary)' }}
          >
            <p className="text-xs" style={{ color: 'var(--label-secondary)' }}>
              TOTAL SCORE
            </p>
            <p className="text-2xl font-bold" style={{ color: 'var(--label-primary)' }}>
              {totalScore}
            </p>
          </div>
        )}

        <div
          className="w-full rounded-2xl p-5"
          style={{ backgroundColor: 'var(--fill-secondary)' }}
        >
          <h3
            className="font-semibold mb-3"
            style={{ color: 'var(--label-primary)' }}
          >
            How to play
          </h3>
          <ul className="space-y-2 text-sm" style={{ color: 'var(--label-secondary)' }}>
            <li>🔍 Read Derrick's clue and guess the mystery word</li>
            <li>💡 Reveal more clues if you're stuck (costs points)</li>
            <li>⭐ Fewer clues used = higher score (max 500)</li>
            <li>🏆 Solve it on the first clue for a perfect score!</li>
          </ul>
        </div>

        <button
          onClick={handleStart}
          className="w-full px-8 py-4 rounded-xl font-semibold text-white text-lg transition-transform hover:scale-105"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Start Investigation
        </button>
      </div>
    )
  }

  // ── Won ───────────────────────────────────────────────────────────
  if (gameState === 'won') {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6">
        {showConfetti && <Confetti />}
        <div
          className="w-full rounded-2xl p-8 text-center"
          style={{ backgroundColor: 'var(--bg-surface)', boxShadow: 'var(--shadow-xl)' }}
        >
          <div className="text-6xl mb-4">🎉</div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--label-primary)' }}
          >
            Case Closed!
          </h2>
          <p className="mb-1" style={{ color: 'var(--label-secondary)' }}>
            The mystery word was
          </p>
          <p
            className="text-3xl font-bold mb-4"
            style={{ color: 'var(--accent)', textTransform: 'capitalize' }}
          >
            {mystery.answer}
          </p>
          <p className="text-sm mb-2" style={{ color: 'var(--label-secondary)' }}>
            You solved it using {cluesRevealed} {cluesRevealed === 1 ? 'clue' : 'clues'}
          </p>
          <p
            className="text-4xl font-bold mb-6"
            style={{ color: 'var(--label-primary)' }}
          >
            +{score} pts
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleStart}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-white"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Next Case
            </button>
            <button
              onClick={() => setGameState('menu')}
              className="flex-1 px-6 py-3 rounded-xl font-semibold"
              style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-primary)' }}
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Lost ──────────────────────────────────────────────────────────
  if (gameState === 'lost') {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6">
        <div
          className="w-full rounded-2xl p-8 text-center"
          style={{ backgroundColor: 'var(--bg-surface)', boxShadow: 'var(--shadow-xl)' }}
        >
          <div className="text-6xl mb-4">🔎</div>
          <h2
            className="text-2xl font-bold mb-2"
            style={{ color: 'var(--label-primary)' }}
          >
            Case Unsolved
          </h2>
          <p className="mb-1" style={{ color: 'var(--label-secondary)' }}>
            The mystery word was
          </p>
          <p
            className="text-3xl font-bold mb-6"
            style={{ color: '#ff3b30', textTransform: 'capitalize' }}
          >
            {mystery.answer}
          </p>
          <div className="flex gap-3">
            <button
              onClick={handleStart}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-white"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Try Again
            </button>
            <button
              onClick={() => setGameState('menu')}
              className="flex-1 px-6 py-3 rounded-xl font-semibold"
              style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-primary)' }}
            >
              Menu
            </button>
          </div>
        </div>
      </div>
    )
  }

  // ── Playing ───────────────────────────────────────────────────────
  const potentialPoints = POINTS_BY_CLUE[cluesRevealed - 1]
  const cluesLeft = mystery.clues.length - cluesRevealed

  return (
    <div className="w-full max-w-lg mx-auto flex flex-col gap-4">
      {/* Header */}
      <div className="text-center">
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: 'var(--label-primary)' }}
        >
          🕵️ Derrick's Derrictive
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--label-secondary)' }}>
          Crack the case — what's the mystery word?
        </p>
      </div>

      {/* Score bar */}
      <div className="grid grid-cols-3 gap-3">
        <div
          className="p-3 rounded-xl text-center"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-xs" style={{ color: 'var(--label-secondary)' }}>CLUES USED</p>
          <p className="text-xl font-bold" style={{ color: 'var(--label-primary)' }}>
            {cluesRevealed} / {mystery.clues.length}
          </p>
        </div>
        <div
          className="p-3 rounded-xl text-center"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-xs" style={{ color: 'var(--label-secondary)' }}>POTENTIAL</p>
          <p className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
            {potentialPoints}
          </p>
        </div>
        <div
          className="p-3 rounded-xl text-center"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-xs" style={{ color: 'var(--label-secondary)' }}>TOTAL</p>
          <p className="text-xl font-bold" style={{ color: 'var(--label-primary)' }}>
            {totalScore}
          </p>
        </div>
      </div>

      {/* Clues */}
      <div>
        {mystery.clues.slice(0, cluesRevealed).map((clue, i) => (
          <ClueCard key={i} clueNumber={i + 1} text={clue} />
        ))}
      </div>

      {/* Wrong guesses */}
      {wrongGuesses.length > 0 && (
        <div
          className="rounded-xl p-3"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-xs mb-1" style={{ color: 'var(--label-tertiary)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            Ruled out
          </p>
          <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
            {wrongGuesses.join(', ')}
          </p>
        </div>
      )}

      {/* Guess input */}
      <div className="flex gap-2">
        <input
          type="text"
          value={guess}
          onChange={(e) => setGuess(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Your deduction…"
          className="flex-1 px-4 py-3 rounded-xl text-sm"
          style={{
            backgroundColor: 'var(--fill-secondary)',
            color: 'var(--label-primary)',
            border: '1.5px solid var(--separator)',
            outline: 'none',
          }}
        />
        <button
          onClick={handleGuess}
          disabled={!guess.trim()}
          className="px-5 py-3 rounded-xl font-semibold text-white disabled:opacity-40"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Solve
        </button>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        {cluesLeft > 0 ? (
          <button
            onClick={handleNextClue}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm"
            style={{ backgroundColor: 'var(--fill-secondary)', color: 'var(--label-primary)', border: '1.5px solid var(--separator)' }}
          >
            💡 Next Clue ({cluesLeft} left)
          </button>
        ) : (
          <button
            onClick={handleGiveUp}
            className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm"
            style={{ backgroundColor: 'var(--fill-secondary)', color: '#ff3b30', border: '1.5px solid var(--separator)' }}
          >
            🏳️ Give Up
          </button>
        )}
        <button
          onClick={() => setGameState('menu')}
          className="px-4 py-3 rounded-xl font-semibold text-sm"
          style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-secondary)' }}
        >
          Menu
        </button>
      </div>

      {/* Toast */}
      {message && <Toast key={messageKey} message={message} />}
    </div>
  )
}
