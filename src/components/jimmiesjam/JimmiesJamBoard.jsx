import { useState } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

const MUSIC_PAIRS = [
  { id: 1, emoji: '🎸', name: 'Guitar' },
  { id: 2, emoji: '🎹', name: 'Piano' },
  { id: 3, emoji: '🥁', name: 'Drums' },
  { id: 4, emoji: '🎺', name: 'Trumpet' },
  { id: 5, emoji: '🎻', name: 'Violin' },
  { id: 6, emoji: '🎷', name: 'Saxophone' },
  { id: 7, emoji: '🪕', name: 'Banjo' },
  { id: 8, emoji: '🎤', name: 'Microphone' },
]

function shuffleArray(array) {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

function initializeGame() {
  const pairs = MUSIC_PAIRS.flatMap((item) => [
    { ...item, uniqueId: `${item.id}-a` },
    { ...item, uniqueId: `${item.id}-b` },
  ])
  return {
    cards: shuffleArray(pairs),
    flipped: [],
    matched: [],
    moves: 0,
    message: '',
    showConfetti: false,
    isChecking: false,
  }
}

export default function JimmiesJamBoard() {
  const [state, setState] = useState(initializeGame)

  const handleCardClick = (uniqueId) => {
    setState((prev) => {
      if (prev.isChecking || prev.flipped.includes(uniqueId) || prev.matched.includes(uniqueId)) {
        return prev
      }

      const newFlipped = [...prev.flipped, uniqueId]

      if (newFlipped.length === 2) {
        const [first, second] = newFlipped
        const firstCard = prev.cards.find((c) => c.uniqueId === first)
        const secondCard = prev.cards.find((c) => c.uniqueId === second)

        if (firstCard.id === secondCard.id) {
          // Match found!
          const newMatched = [...prev.matched, first, second]
          const newMoves = prev.moves + 1
          
          setTimeout(() => {
            setState((s) => ({
              ...s,
              matched: newMatched,
              flipped: [],
              message: '🎵 Perfect match! Keep jamming!',
              isChecking: false,
              showConfetti: newMatched.length === prev.cards.length,
              ...(newMatched.length === prev.cards.length && {
                message: `🎉 You won in ${newMoves} moves! That's a jam session!`
              })
            }))
          }, 500)

          return {
            ...prev,
            flipped: newFlipped,
            moves: newMoves,
            isChecking: true,
          }
        } else {
          // No match
          setTimeout(() => {
            setState((s) => ({
              ...s,
              flipped: [],
              message: '❌ Not a match. Try again!',
              isChecking: false,
            }))
          }, 1000)

          return {
            ...prev,
            flipped: newFlipped,
            moves: prev.moves + 1,
            isChecking: true,
          }
        }
      }

      return {
        ...prev,
        flipped: newFlipped,
      }
    })
  }

  const isCardFlipped = (uniqueId) => {
    return state.flipped.includes(uniqueId) || state.matched.includes(uniqueId)
  }

  const isCardMatched = (uniqueId) => {
    return state.matched.includes(uniqueId)
  }

  const handleNewGame = () => {
    setState(initializeGame())
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--label-primary)' }}
        >
          Jimmie&apos;s Jam
        </h2>
        <p
          className="text-sm"
          style={{ color: 'var(--label-secondary)' }}
        >
          Match the musical instruments and jam out!
        </p>
      </div>

      {/* Stats */}
      <div
        className="text-center p-4 rounded-lg mb-6 font-semibold"
        style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-primary)' }}
      >
        <p>Moves: {state.moves}</p>
        <p className="text-sm mt-1" style={{ color: 'var(--label-secondary)' }}>
          Matched: {state.matched.length / 2} / {MUSIC_PAIRS.length}
        </p>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {state.cards.map((card) => (
          <button
            key={card.uniqueId}
            onClick={() => handleCardClick(card.uniqueId)}
            disabled={state.isChecking || isCardFlipped(card.uniqueId)}
            className="aspect-square rounded-lg font-bold text-4xl transition-all transform hover:scale-105 disabled:cursor-not-allowed"
            style={{
              backgroundColor: isCardFlipped(card.uniqueId)
                ? isCardMatched(card.uniqueId)
                  ? '#34c759'
                  : '#0a84ff'
                : 'var(--fill-secondary)',
              color: isCardFlipped(card.uniqueId) ? 'white' : 'var(--label-tertiary)',
              opacity: isCardMatched(card.uniqueId) ? 0.6 : 1,
            }}
          >
            {isCardFlipped(card.uniqueId) ? card.emoji : '🎵'}
          </button>
        ))}
      </div>

      {/* New Game Button */}
      <button
        onClick={handleNewGame}
        className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        New Game
      </button>

      {/* Toast Message */}
      {state.message && <Toast message={state.message} />}

      {/* Confetti */}
      {state.showConfetti && <Confetti />}
    </div>
  )
}
