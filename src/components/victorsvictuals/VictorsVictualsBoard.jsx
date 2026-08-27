import { useState, useEffect } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

// ── Food data ─────────────────────────────────────────────────────────────

const FOODS = [
  { id: 1, emoji: '🥨', name: 'Pretzel' },
  { id: 2, emoji: '🍕', name: 'Pizza' },
  { id: 3, emoji: '🍔', name: 'Burger' },
  { id: 4, emoji: '🌮', name: 'Taco' },
  { id: 5, emoji: '🍰', name: 'Cake' },
  { id: 6, emoji: '🍪', name: 'Cookie' },
  { id: 7, emoji: '🍩', name: 'Donut' },
  { id: 8, emoji: '🌭', name: 'Hot Dog' },
  { id: 9, emoji: '🍦', name: 'Ice Cream' },
  { id: 10, emoji: '🥗', name: 'Salad' },
]

function shuffleArray(array) {
  const arr = [...array]
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[j]] = [arr[j], arr[i]]
  }
  return arr
}

// ── Sub-components ────────────────────────────────────────────────────────────

function FoodCard({ food, isFlipped, isMatched, onClick }) {
  return (
    <button
      onClick={onClick}
      disabled={isFlipped || isMatched}
      className="aspect-square rounded-xl transition-all duration-300 transform hover:scale-105 disabled:cursor-not-allowed"
      style={{
        backgroundColor: isMatched 
          ? 'var(--accent)' 
          : isFlipped 
          ? 'var(--fill-secondary)' 
          : 'var(--fill-tertiary)',
        border: '2px solid var(--separator)',
        opacity: isMatched ? 0.6 : 1,
      }}
    >
      <div className="w-full h-full flex items-center justify-center">
        {isFlipped || isMatched ? (
          <span style={{ fontSize: 'clamp(32px, 8vw, 48px)' }}>{food.emoji}</span>
        ) : (
          <span style={{ fontSize: 'clamp(28px, 6vw, 36px)' }}>🍽️</span>
        )}
      </div>
    </button>
  )
}

// ── Main board ────────────────────────────────────────────────────────────────

export default function VictorsVictualsBoard() {
  const [gameState, setGameState] = useState('menu') // 'menu' | 'playing' | 'won'
  const [cards, setCards] = useState([])
  const [flippedIndices, setFlippedIndices] = useState([])
  const [matchedIds, setMatchedIds] = useState([])
  const [moves, setMoves] = useState(0)
  const [message, setMessage] = useState('')
  const [messageKey, setMessageKey] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [bestScore, setBestScore] = useState(() => {
    try {
      const stored = localStorage.getItem('victorsvictuals.bestScore')
      return stored ? parseInt(stored, 10) : null
    } catch {
      return null
    }
  })

  const showMessage = (msg) => {
    setMessage(msg)
    setMessageKey((k) => k + 1)
  }

  const initGame = () => {
    // Create pairs of foods
    const selectedFoods = FOODS.slice(0, 8) // Use 8 different foods = 16 cards
    const pairs = [...selectedFoods, ...selectedFoods]
    const shuffled = shuffleArray(pairs).map((food, idx) => ({
      ...food,
      uniqueId: `${food.id}-${idx}`,
    }))
    
    setCards(shuffled)
    setFlippedIndices([])
    setMatchedIds([])
    setMoves(0)
    setMessage('')
    setShowConfetti(false)
    setGameState('playing')
  }

  useEffect(() => {
    if (flippedIndices.length === 2) {
      const [first, second] = flippedIndices
      const firstCard = cards[first]
      const secondCard = cards[second]

      if (firstCard.id === secondCard.id) {
        // Match!
        setMatchedIds((prev) => [...prev, firstCard.id])
        showMessage('🎉 Perfect match!')
        setFlippedIndices([])
        
        // Check if game is won
        const newMatchedCount = matchedIds.length + 1
        if (newMatchedCount === 8) {
          setTimeout(() => {
            setShowConfetti(true)
            setGameState('won')
            // Update best score
            if (bestScore === null || moves + 1 < bestScore) {
              setBestScore(moves + 1)
              localStorage.setItem('victorsvictuals.bestScore', moves + 1)
            }
          }, 600)
        }
      } else {
        // No match
        showMessage('🤔 Try again!')
        setTimeout(() => {
          setFlippedIndices([])
        }, 1000)
      }
      setMoves((m) => m + 1)
    }
  }, [flippedIndices, cards, matchedIds, moves, bestScore])

  const handleCardClick = (index) => {
    if (flippedIndices.length >= 2) return
    if (flippedIndices.includes(index)) return
    
    setFlippedIndices((prev) => [...prev, index])
  }

  // ── Menu ──────────────────────────────────────────────────────────
  if (gameState === 'menu') {
    return (
      <div className="w-full max-w-lg mx-auto flex flex-col items-center gap-6">
        <div className="text-center">
          <div className="text-6xl mb-4">🥨</div>
          <h2
            className="text-3xl font-bold tracking-tight mb-2"
            style={{ color: 'var(--label-primary)' }}
          >
            Victor's Victuals
          </h2>
          <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
            Match the food pairs and satisfy your appetite!
          </p>
        </div>

        {bestScore !== null && (
          <div
            className="px-6 py-3 rounded-xl text-center"
            style={{ backgroundColor: 'var(--fill-tertiary)' }}
          >
            <p className="text-xs" style={{ color: 'var(--label-secondary)' }}>
              BEST SCORE
            </p>
            <p className="text-2xl font-bold" style={{ color: 'var(--label-primary)' }}>
              {bestScore} moves
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
            <li>🍽️ Click cards to reveal delicious foods</li>
            <li>🎯 Find matching pairs of the same food</li>
            <li>🧠 Remember where each food is located</li>
            <li>🏆 Complete the board in as few moves as possible!</li>
          </ul>
        </div>

        <button
          onClick={initGame}
          className="w-full px-8 py-4 rounded-xl font-semibold text-white text-lg transition-transform hover:scale-105"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          Start Game
        </button>
      </div>
    )
  }

  // ── Won ───────────────────────────────────────────────────────────
  if (gameState === 'won') {
    const isNewBest = moves === bestScore
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
            Feast Complete!
          </h2>
          <p className="mb-4" style={{ color: 'var(--label-secondary)' }}>
            You matched all the victuals!
          </p>
          <div
            className="inline-block px-6 py-3 rounded-xl mb-6"
            style={{ backgroundColor: 'var(--fill-tertiary)' }}
          >
            <p className="text-xs mb-1" style={{ color: 'var(--label-secondary)' }}>
              MOVES
            </p>
            <p
              className="text-4xl font-bold"
              style={{ color: 'var(--accent)' }}
            >
              {moves}
            </p>
            {isNewBest && (
              <p className="text-xs mt-2" style={{ color: 'var(--accent)' }}>
                🏆 New Best Score!
              </p>
            )}
          </div>
          <div className="flex gap-3">
            <button
              onClick={initGame}
              className="flex-1 px-6 py-3 rounded-xl font-semibold text-white"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Play Again
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
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col gap-4">
      {/* Header */}
      <div className="text-center">
        <h2
          className="text-2xl font-bold tracking-tight"
          style={{ color: 'var(--label-primary)' }}
        >
          🥨 Victor's Victuals
        </h2>
        <p className="text-sm mt-1" style={{ color: 'var(--label-secondary)' }}>
          Match all the food pairs!
        </p>
      </div>

      {/* Score bar */}
      <div className="grid grid-cols-3 gap-3">
        <div
          className="p-3 rounded-xl text-center"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-xs" style={{ color: 'var(--label-secondary)' }}>MOVES</p>
          <p className="text-xl font-bold" style={{ color: 'var(--label-primary)' }}>
            {moves}
          </p>
        </div>
        <div
          className="p-3 rounded-xl text-center"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-xs" style={{ color: 'var(--label-secondary)' }}>MATCHED</p>
          <p className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
            {matchedIds.length} / 8
          </p>
        </div>
        <div
          className="p-3 rounded-xl text-center"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-xs" style={{ color: 'var(--label-secondary)' }}>BEST</p>
          <p className="text-xl font-bold" style={{ color: 'var(--label-primary)' }}>
            {bestScore !== null ? bestScore : '--'}
          </p>
        </div>
      </div>

      {/* Game grid */}
      <div className="grid grid-cols-4 gap-3 p-4">
        {cards.map((card, index) => (
          <FoodCard
            key={card.uniqueId}
            food={card}
            isFlipped={flippedIndices.includes(index)}
            isMatched={matchedIds.includes(card.id)}
            onClick={() => handleCardClick(index)}
          />
        ))}
      </div>

      {/* Action button */}
      <div className="flex gap-3">
        <button
          onClick={initGame}
          className="flex-1 px-4 py-3 rounded-xl font-semibold text-sm"
          style={{ backgroundColor: 'var(--fill-secondary)', color: 'var(--label-primary)', border: '1.5px solid var(--separator)' }}
        >
          New Game
        </button>
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
