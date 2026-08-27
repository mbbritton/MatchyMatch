import { useState, useEffect, useRef } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

export default function BandysBlastBoard() {
  const [score, setScore] = useState(0)
  const [targets, setTargets] = useState([])
  const [gameActive, setGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(30)
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)

  const gameActiveRef = useRef(false)

  useEffect(() => {
    gameActiveRef.current = gameActive
  }, [gameActive])

  // Spawn targets
  useEffect(() => {
    if (!gameActive) return

    const spawnTarget = () => {
      const newTarget = {
        id: Math.random(),
        x: Math.random() * 80 + 10,
        y: Math.random() * 60 + 20,
      }
      setTargets((prev) => [...prev, newTarget])
    }

    const spawnInterval = setInterval(spawnTarget, 800)
    return () => clearInterval(spawnInterval)
  }, [gameActive])

  // Timer
  useEffect(() => {
    if (!gameActive) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        const newTime = prev - 1
        if (newTime <= 0) {
          setGameActive(false)
          setGameOver(true)
        }
        return Math.max(0, newTime)
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  const handleStartGame = () => {
    setScore(0)
    setTargets([])
    setGameActive(true)
    setTimeLeft(30)
    setGameOver(false)
    setMessage('')
    setShowConfetti(false)
  }

  const handleTargetClick = (id) => {
    if (!gameActiveRef.current) return
    setTargets((prev) => prev.filter((t) => t.id !== id))
    setScore((prev) => prev + 1)
    setMessage('💥 Blasted!')
  }

  const handlePlayAgain = () => {
    handleStartGame()
  }

  const handleNewGame = () => {
    setScore(0)
    setTargets([])
    setGameActive(false)
    setTimeLeft(30)
    setGameOver(false)
    setMessage('')
    setShowConfetti(false)
  }

  // Calculate end-game message based on current state
  const getEndGameMessage = () => {
    if (score > 20) return `🌟 Incredible! ${score} blasts!`
    if (score > 10) return `🎉 Great job! ${score} blasts!`
    if (score > 0) return `👍 Not bad! ${score} blasts.`
    return 'Try again!'
  }

  const shouldShowConfetti = gameOver && score > 20

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--label-primary)' }}
        >
          Bandy's Blast
        </h2>
        <p
          className="text-sm"
          style={{ color: 'var(--label-secondary)' }}
        >
          Tap the targets before time runs out!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div
          className="p-4 rounded-lg text-center"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p style={{ color: 'var(--label-secondary)', fontSize: '12px' }}>SCORE</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--label-primary)' }}>
            {score}
          </p>
        </div>
        <div
          className="p-4 rounded-lg text-center"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p style={{ color: 'var(--label-secondary)', fontSize: '12px' }}>TIME</p>
          <p className="text-2xl font-bold" style={{ color: 'var(--label-primary)' }}>
            {timeLeft}s
          </p>
        </div>
      </div>

      {/* Game Area */}
      <div
        className="relative w-full h-96 rounded-lg overflow-hidden border-2 mb-6"
        style={{
          backgroundColor: 'var(--fill-secondary)',
          borderColor: 'var(--fill-tertiary)',
        }}
      >
        {!gameActive && !gameOver && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button
              onClick={handleStartGame}
              className="px-8 py-4 rounded-lg font-semibold text-white text-lg transition-transform hover:scale-105"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Start Game
            </button>
          </div>
        )}

        {gameActive && targets.map((target) => (
          <button
            key={target.id}
            onClick={() => handleTargetClick(target.id)}
            className="absolute w-12 h-12 rounded-full text-2xl transition-transform hover:scale-110 focus:outline-none"
            style={{
              left: `${target.x}%`,
              top: `${target.y}%`,
              transform: 'translate(-50%, -50%)',
              backgroundColor: 'var(--accent)',
            }}
            title="Tap to blast!"
          >
            🎯
          </button>
        ))}

        {gameOver && (
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <p className="text-4xl mb-4">🏁</p>
            <p
              className="text-xl font-bold text-center"
              style={{ color: 'var(--label-primary)' }}
            >
              Game Over!
            </p>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      {gameOver ? (
        <div className="flex gap-3">
          <button
            onClick={handlePlayAgain}
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Play Again
          </button>
          <button
            onClick={handleNewGame}
            className="flex-1 px-6 py-3 rounded-lg font-semibold"
            style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-primary)' }}
          >
            Back
          </button>
        </div>
      ) : gameActive ? (
        <button
          onClick={() => {
            setGameActive(false)
            setGameOver(true)
          }}
          className="w-full px-6 py-3 rounded-lg font-semibold"
          style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-primary)' }}
        >
          Quit Game
        </button>
      ) : null}

      {/* Message */}
      {message && <Toast message={message} />}
      {gameOver && !message && <Toast message={getEndGameMessage()} />}

      {/* Confetti */}
      {shouldShowConfetti && <Confetti />}
    </div>
  )
}
