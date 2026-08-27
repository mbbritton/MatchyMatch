import { useState, useEffect } from 'react'
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

export default function JimmiesJamBoard() {
  const [cards, setCards] = useState([])
  const [flipped, setFlipped] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [message, setMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [isChecking, setIsChecking] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Create pairs of cards
    const pairs = MUSIC_PAIRS.flatMap((item) => [
      { ...item, uniqueId: `${item.id}-a` },
      { ...item, uniqueId: `${item.id}-b` },
    ])
    setCards(shuffleArray(pairs))
    setFlipped([])
    setMatched([])
    setMoves(0)
    setMessage('')
    setShowConfetti(false)
  }

  const handleCardClick = (uniqueId) => {
    if (isChecking || flipped.includes(uniqueId) || matched.includes(uniqueId)) {
      return
    }

    const newFlipped = [...flipped, uniqueId]
    setFlipped(newFlipped)

    if (newFlipped.length === 2) {
      setIsChecking(true)
      setMoves(moves + 1)

      const [first, second] = newFlipped
      const firstCard = cards.find((c) => c.uniqueId === first)
      const secondCard = cards.find((c) => c.uniqueId === second)

      if (firstCard.id === secondCard.id) {
        // Match found!
        setTimeout(() => {
          setMatched([...matched, first, second])
          setFlipped([])
          setMessage('🎵 Perfect match! Keep jamming!')
          setIsChecking(false)

          // Check if game is complete
          if (matched.length + 2 === cards.length) {
            setShowConfetti(true)
            setMessage(`🎉 You won in ${moves + 1} moves! That's a jam session!`)
          }
        }, 500)
      } else {
        // No match
        setTimeout(() => {
          setFlipped([])
          setMessage('❌ Not a match. Try again!')
          setIsChecking(false)
        }, 1000)
      }
    }
  }

  const isCardFlipped = (uniqueId) => {
    return flipped.includes(uniqueId) || matched.includes(uniqueId)
  }

  const isCardMatched = (uniqueId) => {
    return matched.includes(uniqueId)
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
        <p>Moves: {moves}</p>
        <p className="text-sm mt-1" style={{ color: 'var(--label-secondary)' }}>
          Matched: {matched.length / 2} / {MUSIC_PAIRS.length}
        </p>
      </div>

      {/* Game Board */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {cards.map((card) => (
          <button
            key={card.uniqueId}
            onClick={() => handleCardClick(card.uniqueId)}
            disabled={isChecking || isCardFlipped(card.uniqueId)}
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
        onClick={initializeGame}
        className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
        style={{ backgroundColor: 'var(--accent)' }}
      >
        New Game
      </button>

      {/* Toast Message */}
      {message && <Toast message={message} />}

      {/* Confetti */}
      {showConfetti && <Confetti />}
    </div>
  )
}
