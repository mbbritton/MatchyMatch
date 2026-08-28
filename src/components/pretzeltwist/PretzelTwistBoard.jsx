import { useState, useEffect, useCallback, useRef } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

// Pretzel-themed pairs - each pair has a twisted theme
const PAIRS = [
  { id: 1, emoji: '🥨', name: 'Pretzel' },
  { id: 2, emoji: '🌀', name: 'Spiral' },
  { id: 3, emoji: '🔀', name: 'Twist' },
  { id: 4, emoji: '🎭', name: 'Drama' },
  { id: 5, emoji: '🌪️', name: 'Tornado' },
  { id: 6, emoji: '🧬', name: 'DNA' },
  { id: 7, emoji: '🎢', name: 'Coaster' },
  { id: 8, emoji: '🔗', name: 'Chain' },
]

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

function createDeck() {
  // Create pairs (2 of each card)
  const deck = []
  PAIRS.forEach((pair) => {
    deck.push({ ...pair, uniqueId: `${pair.id}-a` })
    deck.push({ ...pair, uniqueId: `${pair.id}-b` })
  })
  return shuffleArray(deck)
}

export default function PretzelTwistBoard() {
  const [cards, setCards] = useState(() => createDeck())
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameState, setGameState] = useState('playing') // 'playing' | 'won'
  const [toastMsg, setToastMsg] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [elapsedSeconds, setElapsedSeconds] = useState(0)
  const timerRef = useRef(null)
  const startTimeRef = useRef(null)

  // Initialize start time on mount
  useEffect(() => {
    if (startTimeRef.current === null) {
      startTimeRef.current = Date.now()
    }
  }, [])

  const showToast = useCallback((msg) => {
    setToastMsg(msg)
  }, [])

  // Timer effect - updates elapsed seconds
  useEffect(() => {
    if (gameState !== 'playing' || startTimeRef.current === null) {
      clearInterval(timerRef.current)
      return
    }

    timerRef.current = setInterval(() => {
      setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000))
    }, 1000)

    return () => clearInterval(timerRef.current)
  }, [gameState])

  const handleCardClick = useCallback((uniqueId) => {
    if (gameState !== 'playing') return
    if (flipped.length === 2) return
    if (flipped.includes(uniqueId)) return
    if (matched.includes(cards.find((c) => c.uniqueId === uniqueId).id)) return

    const newFlipped = [...flipped, uniqueId]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      const [first, second] = newFlipped
      const firstCard = cards.find((c) => c.uniqueId === first)
      const secondCard = cards.find((c) => c.uniqueId === second)

      setMoves((m) => m + 1)

      if (firstCard.id === secondCard.id) {
        // Match!
        setTimeout(() => {
          const newMatched = [...matched, firstCard.id]
          setMatched(newMatched)
          setFlipped([])
          showToast('Twisted to perfection! 🥨')
          
          // Check for win condition
          if (newMatched.length === PAIRS.length) {
            setGameState('won')
            setShowConfetti(true)
            if (startTimeRef.current !== null) {
              setElapsedSeconds(Math.floor((Date.now() - startTimeRef.current) / 1000))
            }
          }
        }, 500)
      } else {
        // No match - flip back after delay
        setTimeout(() => {
          setFlipped([])
        }, 1000)
      }
    }
  }, [gameState, flipped, matched, cards, showToast])

  const handlePlayAgain = () => {
    setCards(createDeck())
    setFlipped([])
    setMatched([])
    setMoves(0)
    setGameState('playing')
    setShowConfetti(false)
    setToastMsg('')
    setElapsedSeconds(0)
    startTimeRef.current = Date.now()
  }

  const isFlipped = (uniqueId) => flipped.includes(uniqueId)
  const isMatched = (card) => matched.includes(card.id)

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-6">
        <h2
          className="text-3xl font-bold tracking-tight mb-1"
          style={{ color: 'var(--label-primary)' }}
        >
          Pretzel's Twist 🥨
        </h2>
        <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
          Match all the twisted pairs!
        </p>
      </div>

      {/* Stats */}
      <div
        className="rounded-xl p-4 mb-5 flex justify-around"
        style={{ backgroundColor: 'var(--fill-secondary)' }}
      >
        <div className="text-center">
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-1"
            style={{ color: 'var(--label-tertiary)' }}
          >
            Moves
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: 'var(--label-primary)' }}
          >
            {moves}
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-1"
            style={{ color: 'var(--label-tertiary)' }}
          >
            Matched
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: 'var(--label-primary)' }}
          >
            {matched.length}/{PAIRS.length}
          </p>
        </div>
        <div className="text-center">
          <p
            className="text-xs font-semibold uppercase tracking-wide mb-1"
            style={{ color: 'var(--label-tertiary)' }}
          >
            Time
          </p>
          <p
            className="text-2xl font-bold"
            style={{ color: 'var(--label-primary)' }}
          >
            {elapsedSeconds}s
          </p>
        </div>
      </div>

      {/* Game Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((card) => {
          const flippedState = isFlipped(card.uniqueId) || isMatched(card)
          return (
            <button
              key={card.uniqueId}
              onClick={() => handleCardClick(card.uniqueId)}
              disabled={flippedState || flipped.length === 2}
              className="aspect-square rounded-xl font-bold text-4xl transition-all duration-500 transform hover:scale-105 disabled:cursor-default"
              style={{
                backgroundColor: flippedState
                  ? isMatched(card)
                    ? '#34c759'
                    : 'var(--accent)'
                  : 'var(--fill-tertiary)',
                color: flippedState ? 'white' : 'transparent',
                border: '2px solid var(--label-tertiary)',
                opacity: isMatched(card) ? 0.6 : 1,
                transform: flippedState ? 'rotateY(180deg)' : 'rotateY(0deg)',
              }}
            >
              {flippedState ? card.emoji : '?'}
            </button>
          )
        })}
      </div>

      {/* Win state */}
      {gameState === 'won' && (
        <div
          className="rounded-xl p-5 mb-6 text-center"
          style={{ backgroundColor: '#34c75920' }}
        >
          <p className="text-4xl mb-2">🎉</p>
          <p className="text-xl font-bold mb-1" style={{ color: '#34c759' }}>
            You're all twisted up now!
          </p>
          <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
            You matched all pairs in {moves} moves and {elapsedSeconds} seconds!
          </p>
        </div>
      )}

      {/* Play Again */}
      {gameState === 'won' && (
        <button
          onClick={handlePlayAgain}
          className="w-full px-6 py-3 rounded-lg font-semibold text-white"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Play Again
        </button>
      )}

      {/* Toast */}
      {toastMsg && <Toast message={toastMsg} onDone={() => setToastMsg('')} />}

      {/* Confetti */}
      {showConfetti && <Confetti />}
    </div>
  )
}
