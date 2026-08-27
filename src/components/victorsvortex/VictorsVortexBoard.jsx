import { useState, useEffect, useRef } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

export default function VictorsVortexBoard() {
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(false)
  const [timeLeft, setTimeLeft] = useState(45)
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')
  const [spirals, setSpirals] = useState([])
  const [rotation, setRotation] = useState(0)

  const gameActiveRef = useRef(false)

  useEffect(() => {
    gameActiveRef.current = gameActive
  }, [gameActive])

  // Spawn spiraling targets
  useEffect(() => {
    if (!gameActive) return

    const spawnSpiral = () => {
      const angle = Math.random() * 360
      const distance = 30
      const newSpiral = {
        id: Math.random(),
        angle,
        distance,
        speed: 0.5 + Math.random() * 1.5,
        color: ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFA07A', '#98D8C8'][
          Math.floor(Math.random() * 5)
        ],
      }
      setSpirals((prev) => [...prev, newSpiral])
    }

    const spawnInterval = setInterval(spawnSpiral, 1000)
    return () => clearInterval(spawnInterval)
  }, [gameActive])

  // Animate spirals moving inward
  useEffect(() => {
    if (!gameActive) return

    const animationInterval = setInterval(() => {
      setRotation((prev) => prev + 2)
      setSpirals((prev) =>
        prev
          .map((spiral) => ({
            ...spiral,
            distance: spiral.distance - spiral.speed,
          }))
          .filter((spiral) => spiral.distance > 5)
      )
    }, 50)

    return () => clearInterval(animationInterval)
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
    setSpirals([])
    setGameActive(true)
    setTimeLeft(45)
    setGameOver(false)
    setMessage('')
    setRotation(0)
  }

  const handleSpiralClick = (id) => {
    if (!gameActiveRef.current) return
    setSpirals((prev) => prev.filter((s) => s.id !== id))
    setScore((prev) => prev + 1)
    setMessage('🌀 Caught!')
  }

  const handlePlayAgain = () => {
    handleStartGame()
  }

  const handleNewGame = () => {
    setScore(0)
    setSpirals([])
    setGameActive(false)
    setTimeLeft(45)
    setGameOver(false)
    setMessage('')
    setRotation(0)
  }

  const getEndGameMessage = () => {
    if (score > 30) return `🌟 Vortex Master! ${score} spirals!`
    if (score > 15) return `🎉 Great vortex! ${score} spirals!`
    if (score > 0) return `👍 Not bad! ${score} spirals.`
    return 'Try again!'
  }

  const shouldShowConfetti = gameOver && score > 30

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--label-primary)' }}
        >
          Victor's Vortex
        </h2>
        <p
          className="text-sm"
          style={{ color: 'var(--label-secondary)' }}
        >
          Click the spirals before they reach the center!
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

        {gameActive && (
          <div className="absolute inset-0 flex items-center justify-center">
            {/* Center vortex */}
            <div
              className="absolute w-16 h-16 rounded-full border-4 opacity-30"
              style={{
                borderColor: 'var(--accent)',
                animation: 'spin 2s linear infinite',
              }}
            />
            {spirals.map((spiral) => {
              const angleRad = ((spiral.angle + rotation) * Math.PI) / 180
              const x = 50 + spiral.distance * Math.cos(angleRad)
              const y = 50 + spiral.distance * Math.sin(angleRad)
              return (
                <button
                  key={spiral.id}
                  onClick={() => handleSpiralClick(spiral.id)}
                  className="absolute w-10 h-10 rounded-full text-xl transition-transform hover:scale-110 focus:outline-none flex items-center justify-center"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: 'translate(-50%, -50%)',
                    backgroundColor: spiral.color,
                    boxShadow: `0 0 10px ${spiral.color}`,
                  }}
                  title="Click to catch!"
                >
                  🌀
                </button>
              )
            })}
          </div>
        )}

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
