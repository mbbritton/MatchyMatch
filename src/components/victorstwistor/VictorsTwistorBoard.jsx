import { useState, useEffect } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

export default function VictorsTwistorBoard() {
  const [pattern, setPattern] = useState([])
  const [userPattern, setUserPattern] = useState([])
  const [level, setLevel] = useState(1)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isShowingPattern, setIsShowingPattern] = useState(false)
  const [score, setScore] = useState(0)
  const [message, setMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const [gameOver, setGameOver] = useState(false)

  const directions = ['↑', '→', '↓', '←']
  const colors = ['#0a84ff', '#ff3b30', '#34c759', '#ff9500']

  const generatePattern = (length) => {
    const newPattern = []
    for (let i = 0; i < length; i++) {
      newPattern.push(Math.floor(Math.random() * 4))
    }
    return newPattern
  }

  useEffect(() => {
    if (!isPlaying && !gameOver) {
      startNewLevel()
    }
  }, [])

  const startNewLevel = () => {
    const newPattern = generatePattern(level + 2)
    setPattern(newPattern)
    setUserPattern([])
    setIsPlaying(false)
    setIsShowingPattern(true)
    setMessage('')
    showPatternSequence(newPattern)
  }

  const showPatternSequence = (patternToShow) => {
    let index = 0
    const interval = setInterval(() => {
      if (index >= patternToShow.length) {
        clearInterval(interval)
        setIsShowingPattern(false)
        setIsPlaying(true)
        return
      }
      // Flash the direction
      const btn = document.getElementById(`twist-btn-${patternToShow[index]}`)
      if (btn) {
        btn.style.transform = 'scale(1.2)'
        setTimeout(() => {
          btn.style.transform = 'scale(1)'
        }, 300)
      }
      index++
    }, 600)
  }

  const handleDirectionClick = (index) => {
    if (!isPlaying || isShowingPattern) return

    const newUserPattern = [...userPattern, index]
    setUserPattern(newUserPattern)

    // Check if the current input matches the pattern so far
    if (pattern[newUserPattern.length - 1] !== index) {
      // Wrong input
      setMessage('❌ Wrong twist! Try again.')
      setGameOver(true)
      setIsPlaying(false)
      return
    }

    // Check if pattern is complete
    if (newUserPattern.length === pattern.length) {
      // Success!
      const newScore = score + (level * 10)
      setScore(newScore)
      setMessage(`🎉 Level ${level} complete! +${level * 10} points`)
      setShowConfetti(true)
      setTimeout(() => {
        setShowConfetti(false)
        setLevel(level + 1)
        setTimeout(() => {
          startNewLevel()
        }, 500)
      }, 1500)
      setIsPlaying(false)
    }
  }

  const handleRestart = () => {
    setLevel(1)
    setScore(0)
    setGameOver(false)
    setUserPattern([])
    setMessage('')
    setTimeout(() => {
      startNewLevel()
    }, 100)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--label-primary)' }}
        >
          Victor's Twistor
        </h2>
        <p
          className="text-sm"
          style={{ color: 'var(--label-secondary)' }}
        >
          Watch the twist pattern, then repeat it!
        </p>
      </div>

      {/* Score and Level */}
      <div
        className="text-center p-4 rounded-lg mb-6 font-semibold"
        style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-primary)' }}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>Level</p>
            <p className="text-2xl">{level}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>Score</p>
            <p className="text-2xl">{score}</p>
          </div>
          <div>
            <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>Sequence</p>
            <p className="text-2xl">{pattern.length}</p>
          </div>
        </div>
      </div>

      {/* Status Message */}
      <div className="text-center mb-6 h-6">
        {isShowingPattern && (
          <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
            Watch the pattern...
          </p>
        )}
        {isPlaying && (
          <p className="text-sm font-semibold" style={{ color: '#34c759' }}>
            Your turn! ({userPattern.length}/{pattern.length})
          </p>
        )}
      </div>

      {/* Direction Buttons in Pretzel/Twist Pattern */}
      <div className="relative w-full aspect-square max-w-[320px] mx-auto mb-8">
        {directions.map((dir, index) => {
          const positions = [
            { top: '10%', left: '50%', transform: 'translate(-50%, 0)' }, // Up
            { top: '50%', right: '10%', transform: 'translate(0, -50%)' }, // Right
            { bottom: '10%', left: '50%', transform: 'translate(-50%, 0)' }, // Down
            { top: '50%', left: '10%', transform: 'translate(0, -50%)' }, // Left
          ]

          return (
            <button
              key={index}
              id={`twist-btn-${index}`}
              onClick={() => handleDirectionClick(index)}
              disabled={!isPlaying || isShowingPattern}
              className="absolute w-20 h-20 rounded-full font-bold text-4xl transition-all disabled:opacity-50 shadow-lg"
              style={{
                ...positions[index],
                backgroundColor: colors[index],
                color: 'white',
                border: userPattern.length > 0 && userPattern[userPattern.length - 1] === index ? '4px solid white' : 'none',
              }}
            >
              {dir}
            </button>
          )
        })}

        {/* Center Circle */}
        <div
          className="absolute top-1/2 left-1/2 w-24 h-24 rounded-full flex items-center justify-center text-6xl"
          style={{
            transform: 'translate(-50%, -50%)',
            backgroundColor: 'var(--fill-secondary)',
            border: '4px solid var(--separator)',
          }}
        >
          🥨
        </div>
      </div>

      {/* Action Buttons */}
      {gameOver && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleRestart}
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Try Again
          </button>
        </div>
      )}

      {!gameOver && !isShowingPattern && !isPlaying && level === 1 && (
        <div className="text-center mb-6">
          <button
            onClick={startNewLevel}
            className="px-8 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Start Game
          </button>
        </div>
      )}

      {/* Instructions */}
      <div
        className="text-center p-4 rounded-lg text-sm"
        style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-secondary)' }}
      >
        <p>Watch the arrows light up in sequence, then tap them in the same order!</p>
        <p className="mt-2">Each level adds more twists to the pattern. 🥨</p>
      </div>

      {/* Toast Message */}
      {message && <Toast message={message} />}

      {/* Confetti */}
      {showConfetti && <Confetti />}
    </div>
  )
}
