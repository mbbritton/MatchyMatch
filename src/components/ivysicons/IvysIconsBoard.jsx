import { useState } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

const ICONS = ['🌟', '🎨', '🎭', '🎪', '🎯', '🎲', '🎸', '🎹', '🎺', '🎻', '🌈', '🌸', '🌺', '🌻', '🌼', '🍀']

export default function IvysIconsBoard() {
  const [pattern, setPattern] = useState([])
  const [userPattern, setUserPattern] = useState([])
  const [level, setLevel] = useState(1)
  const [score, setScore] = useState(0)
  const [gameState, setGameState] = useState('ready') // 'ready', 'showing', 'playing', 'won', 'lost'
  const [message, setMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('ivysicons-highscore')
    return saved ? parseInt(saved, 10) : 0
  })
  const [showingIndex, setShowingIndex] = useState(-1)

  const generatePattern = (length) => {
    const newPattern = []
    for (let i = 0; i < length; i++) {
      // eslint-disable-next-line react-hooks/purity
      newPattern.push(ICONS[Math.floor(Math.random() * ICONS.length)])
    }
    return newPattern
  }

  const startGame = () => {
    const newPattern = generatePattern(level + 2)
    setPattern(newPattern)
    setUserPattern([])
    setGameState('showing')
    setMessage('')
    setShowConfetti(false)
    showPattern(newPattern)
  }

  const showPattern = async (patternToShow) => {
    for (let i = 0; i < patternToShow.length; i++) {
      setShowingIndex(i)
      await new Promise(resolve => setTimeout(resolve, 800))
      setShowingIndex(-1)
      await new Promise(resolve => setTimeout(resolve, 200))
    }
    setGameState('playing')
  }

  const handleIconClick = (icon) => {
    if (gameState !== 'playing') return

    const newUserPattern = [...userPattern, icon]
    setUserPattern(newUserPattern)

    // Check if the current input is correct
    const currentIndex = newUserPattern.length - 1
    if (newUserPattern[currentIndex] !== pattern[currentIndex]) {
      // Wrong!
      setGameState('lost')
      setMessage('❌ Wrong pattern! Try again.')
      return
    }

    // Check if pattern is complete
    if (newUserPattern.length === pattern.length) {
      // Success!
      const points = level * 10
      const newScore = score + points
      setScore(newScore)
      setGameState('won')
      setMessage(`🎉 Perfect! +${points} points`)
      setShowConfetti(true)

      if (newScore > highScore) {
        setHighScore(newScore)
        localStorage.setItem('ivysicons-highscore', newScore.toString())
      }

      // Auto-advance to next level after a delay
      setTimeout(() => {
        setLevel(level + 1)
        startGame()
      }, 2000)
    }
  }

  const handleReset = () => {
    setLevel(1)
    setScore(0)
    setPattern([])
    setUserPattern([])
    setGameState('ready')
    setMessage('')
    setShowConfetti(false)
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {showConfetti && <Confetti />}

      {/* Title */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--label-primary)' }}
        >
          Ivy's Icons
        </h2>
        <p
          className="text-sm"
          style={{ color: 'var(--label-secondary)' }}
        >
          Watch the pattern, then repeat it perfectly!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div
          className="text-center p-4 rounded-lg"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
            Level
          </p>
          <p className="text-2xl font-bold" style={{ color: 'var(--label-primary)' }}>
            {level}
          </p>
        </div>
        <div
          className="text-center p-4 rounded-lg"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
            Score
          </p>
          <p className="text-2xl font-bold" style={{ color: 'var(--label-primary)' }}>
            {score}
          </p>
        </div>
        <div
          className="text-center p-4 rounded-lg"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
            High Score
          </p>
          <p className="text-2xl font-bold" style={{ color: 'var(--label-primary)' }}>
            {highScore}
          </p>
        </div>
      </div>

      {/* Pattern Display */}
      {gameState === 'showing' && (
        <div
          className="p-8 rounded-lg mb-6 text-center"
          style={{ backgroundColor: 'var(--fill-secondary)' }}
        >
          <p className="text-sm mb-4" style={{ color: 'var(--label-secondary)' }}>
            Watch carefully...
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            {pattern.map((icon, index) => (
              <div
                key={index}
                className={`text-5xl transition-all duration-300 ${
                  showingIndex === index ? 'scale-125' : 'opacity-30'
                }`}
              >
                {icon}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* User Input Display */}
      {gameState === 'playing' && (
        <div
          className="p-6 rounded-lg mb-6"
          style={{ backgroundColor: 'var(--fill-secondary)' }}
        >
          <p className="text-sm mb-4 text-center" style={{ color: 'var(--label-secondary)' }}>
            Your turn! ({userPattern.length}/{pattern.length})
          </p>
          <div className="flex justify-center gap-3 flex-wrap min-h-[60px]">
            {userPattern.map((icon, index) => (
              <div key={index} className="text-5xl">
                {icon}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Icon Grid */}
      {(gameState === 'ready' || gameState === 'playing') && (
        <div className="grid grid-cols-4 gap-3 mb-6">
          {ICONS.map((icon, index) => (
            <button
              key={index}
              onClick={() => handleIconClick(icon)}
              disabled={gameState !== 'playing'}
              className="aspect-square rounded-lg text-4xl flex items-center justify-center transition-all hover:scale-110 active:scale-95"
              style={{
                backgroundColor: 'var(--fill-tertiary)',
                opacity: gameState === 'playing' ? 1 : 0.5,
                cursor: gameState === 'playing' ? 'pointer' : 'not-allowed',
              }}
            >
              {icon}
            </button>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex gap-3">
        {gameState === 'ready' && (
          <button
            onClick={startGame}
            className="flex-1 px-6 py-4 rounded-lg font-semibold transition-all hover:opacity-90"
            style={{
              backgroundColor: '#0a84ff',
              color: 'white',
            }}
          >
            Start Game
          </button>
        )}
        {gameState === 'lost' && (
          <>
            <button
              onClick={startGame}
              className="flex-1 px-6 py-4 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: '#0a84ff',
                color: 'white',
              }}
            >
              Try Again
            </button>
            <button
              onClick={handleReset}
              className="flex-1 px-6 py-4 rounded-lg font-semibold transition-all hover:opacity-90"
              style={{
                backgroundColor: 'var(--fill-tertiary)',
                color: 'var(--label-primary)',
              }}
            >
              New Game
            </button>
          </>
        )}
      </div>

      {/* Message Toast */}
      {message && (
        <Toast
          message={message}
          onClose={() => setMessage('')}
        />
      )}
    </div>
  )
}
