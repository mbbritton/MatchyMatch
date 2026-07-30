import { useState, useEffect } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

const EMOJIS = ['🎭', '🎨', '🎪', '🎬', '🎸', '🎯', '🎲', '🎮']

export default function CurtisCurtainsBoard() {
  const [curtains, setCurtains] = useState([])
  const [revealed, setRevealed] = useState([])
  const [matched, setMatched] = useState([])
  const [moves, setMoves] = useState(0)
  const [gameWon, setGameWon] = useState(false)
  const [message, setMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)

  // Initialize game
  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    // Create pairs of emojis
    const pairs = [...EMOJIS, ...EMOJIS]
    // Shuffle the array
    const shuffled = pairs.sort(() => Math.random() - 0.5)
    setCurtains(shuffled)
    setRevealed([])
    setMatched([])
    setMoves(0)
    setGameWon(false)
    setMessage('')
    setShowConfetti(false)
  }

  const handleCurtainClick = (index) => {
    // Don't allow clicking if already revealed, matched, or two curtains are already open
    if (revealed.includes(index) || matched.includes(index) || revealed.length >= 2) {
      return
    }

    const newRevealed = [...revealed, index]
    setRevealed(newRevealed)

    // Check for match when two curtains are revealed
    if (newRevealed.length === 2) {
      setMoves(moves + 1)
      const [first, second] = newRevealed
      
      if (curtains[first] === curtains[second]) {
        // Match found!
        setMessage('✨ Perfect match!')
        const newMatched = [...matched, first, second]
        setMatched(newMatched)
        setRevealed([])
        
        // Check if game is won
        if (newMatched.length === curtains.length) {
          setGameWon(true)
          setShowConfetti(true)
          setMessage(`🎉 You won in ${moves + 1} moves!`)
        }
      } else {
        // No match - close curtains after a delay
        setMessage('Try again!')
        setTimeout(() => {
          setRevealed([])
          setMessage('')
        }, 1000)
      }
    }
  }

  const handleNewGame = () => {
    initializeGame()
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--label-primary)' }}
        >
          Curtis's Curtains
        </h2>
        <p
          className="text-sm"
          style={{ color: 'var(--label-secondary)' }}
        >
          Peek behind the curtains and find all the matching pairs!
        </p>
      </div>

      {/* Stats */}
      <div
        className="text-center p-4 rounded-lg mb-6 font-semibold"
        style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-primary)' }}
      >
        <p>Moves: {moves}</p>
        <p className="text-sm mt-1" style={{ color: 'var(--label-secondary)' }}>
          Pairs Found: {matched.length / 2} / {curtains.length / 2}
        </p>
      </div>

      {/* Curtains Grid */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {curtains.map((emoji, index) => {
          const isRevealed = revealed.includes(index) || matched.includes(index)
          const isMatched = matched.includes(index)
          
          return (
            <button
              key={index}
              onClick={() => handleCurtainClick(index)}
              disabled={isMatched || gameWon}
              className="aspect-square rounded-lg font-bold text-4xl transition-all transform hover:scale-105 disabled:cursor-not-allowed"
              style={{
                backgroundColor: isMatched 
                  ? 'var(--green)' 
                  : isRevealed 
                  ? 'var(--fill-secondary)' 
                  : 'var(--accent)',
                color: isRevealed ? 'var(--label-primary)' : 'white',
                opacity: isMatched ? 0.6 : 1,
              }}
            >
              {isRevealed ? emoji : '🎭'}
            </button>
          )
        })}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-6">
        <button
          onClick={handleNewGame}
          className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-opacity hover:opacity-90"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          New Game
        </button>
      </div>

      {/* Toast Message */}
      {message && <Toast message={message} />}

      {/* Confetti */}
      {showConfetti && <Confetti />}
    </div>
  )
}
