import { useState, useEffect, useRef } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

const COLORS = [
  { id: 0, name: 'red', color: '#ff3b30', activeColor: '#ff6961' },
  { id: 1, name: 'blue', color: '#007aff', activeColor: '#4da6ff' },
  { id: 2, name: 'green', color: '#34c759', activeColor: '#5ee87a' },
  { id: 3, name: 'yellow', color: '#ffcc00', activeColor: '#ffd633' },
]

export default function SimonSaysBoard() {
  const [sequence, setSequence] = useState([])
  const [playerSequence, setPlayerSequence] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [isPlayerTurn, setIsPlayerTurn] = useState(false)
  const [activeButton, setActiveButton] = useState(null)
  const [score, setScore] = useState(0)
  const [highScore, setHighScore] = useState(0)
  const [gameState, setGameState] = useState('ready') // 'ready', 'playing', 'won', 'lost'
  const [message, setMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)
  const audioContextRef = useRef(null)

  // Initialize audio context
  useEffect(() => {
    audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)()
    return () => {
      if (audioContextRef.current) {
        audioContextRef.current.close()
      }
    }
  }, [])

  // Play sound for a button
  const playSound = (colorId) => {
    if (!audioContextRef.current) return
    
    const frequencies = [329.63, 261.63, 392.00, 440.00] // E4, C4, G4, A4
    const oscillator = audioContextRef.current.createOscillator()
    const gainNode = audioContextRef.current.createGain()
    
    oscillator.connect(gainNode)
    gainNode.connect(audioContextRef.current.destination)
    
    oscillator.frequency.value = frequencies[colorId]
    oscillator.type = 'sine'
    
    gainNode.gain.setValueAtTime(0.3, audioContextRef.current.currentTime)
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContextRef.current.currentTime + 0.3)
    
    oscillator.start(audioContextRef.current.currentTime)
    oscillator.stop(audioContextRef.current.currentTime + 0.3)
  }

  // Start a new game
  const startGame = () => {
    const newSequence = [Math.floor(Math.random() * 4)]
    setSequence(newSequence)
    setPlayerSequence([])
    setScore(0)
    setGameState('playing')
    setIsPlaying(true)
    setIsPlayerTurn(false)
    setMessage('Watch the sequence!')
    setShowConfetti(false)
    playSequence(newSequence)
  }

  // Play the sequence for the player to watch
  const playSequence = async (seq) => {
    setIsPlayerTurn(false)
    
    for (let i = 0; i < seq.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 500))
      setActiveButton(seq[i])
      playSound(seq[i])
      await new Promise(resolve => setTimeout(resolve, 500))
      setActiveButton(null)
    }
    
    setIsPlayerTurn(true)
    setMessage('Your turn! Repeat the sequence.')
  }

  // Handle player clicking a button
  const handleButtonClick = (colorId) => {
    if (!isPlayerTurn || gameState !== 'playing') return

    playSound(colorId)
    setActiveButton(colorId)
    setTimeout(() => setActiveButton(null), 300)

    const newPlayerSequence = [...playerSequence, colorId]
    setPlayerSequence(newPlayerSequence)

    // Check if the player's move is correct
    if (colorId !== sequence[newPlayerSequence.length - 1]) {
      // Wrong move - game over
      setGameState('lost')
      setIsPlayerTurn(false)
      setMessage(`Game Over! Final score: ${score}`)
      if (score > highScore) {
        setHighScore(score)
      }
      return
    }

    // Check if player completed the sequence
    if (newPlayerSequence.length === sequence.length) {
      const newScore = score + 1
      setScore(newScore)
      setPlayerSequence([])
      
      // Check for win condition (reached level 10)
      if (newScore >= 10) {
        setGameState('won')
        setIsPlayerTurn(false)
        setMessage(`🎉 Amazing! You completed 10 rounds!`)
        setShowConfetti(true)
        if (newScore > highScore) {
          setHighScore(newScore)
        }
        return
      }

      // Add new color to sequence
      setMessage('Correct! Watch the next sequence...')
      setTimeout(() => {
        const newSequence = [...sequence, Math.floor(Math.random() * 4)]
        setSequence(newSequence)
        playSequence(newSequence)
      }, 1000)
    }
  }

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--label-primary)' }}
        >
          Simon Says
        </h2>
        <p
          className="text-sm"
          style={{ color: 'var(--label-secondary)' }}
        >
          Watch and repeat the color sequence
        </p>
      </div>

      {/* Score Display */}
      <div
        className="text-center p-4 rounded-lg mb-6"
        style={{ backgroundColor: 'var(--fill-tertiary)' }}
      >
        <div className="flex justify-around">
          <div>
            <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
              Round
            </p>
            <p className="text-2xl font-bold" style={{ color: 'var(--label-primary)' }}>
              {score}
            </p>
          </div>
          <div>
            <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
              High Score
            </p>
            <p className="text-2xl font-bold" style={{ color: 'var(--label-primary)' }}>
              {highScore}
            </p>
          </div>
        </div>
      </div>

      {/* Game Board - 2x2 Grid of colored buttons */}
      <div className="grid grid-cols-2 gap-4 mb-6 aspect-square">
        {COLORS.map((color) => (
          <button
            key={color.id}
            onClick={() => handleButtonClick(color.id)}
            disabled={!isPlayerTurn}
            className="rounded-lg transition-all duration-150 transform active:scale-95 disabled:cursor-not-allowed"
            style={{
              backgroundColor: activeButton === color.id ? color.activeColor : color.color,
              opacity: !isPlayerTurn ? 0.6 : 1,
              boxShadow: activeButton === color.id ? '0 0 20px rgba(255,255,255,0.5)' : 'none',
            }}
          >
            <span className="sr-only">{color.name}</span>
          </button>
        ))}
      </div>

      {/* Status Message */}
      <div
        className="text-center p-3 rounded-lg mb-6 font-medium"
        style={{ 
          backgroundColor: 'var(--fill-secondary)',
          color: 'var(--label-primary)',
          minHeight: '3rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
        {message || 'Press Start to begin!'}
      </div>

      {/* Buttons */}
      <div className="flex gap-3">
        <button
          onClick={startGame}
          className="flex-1 px-6 py-3 rounded-lg font-semibold text-white transition-opacity"
          style={{ backgroundColor: 'var(--accent)' }}
        >
          {gameState === 'ready' ? 'Start Game' : 'New Game'}
        </button>
      </div>

      {/* Instructions */}
      {gameState === 'ready' && (
        <div
          className="mt-6 p-4 rounded-lg text-sm"
          style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-secondary)' }}
        >
          <p className="font-semibold mb-2" style={{ color: 'var(--label-primary)' }}>
            How to Play:
          </p>
          <ul className="space-y-1 list-disc list-inside">
            <li>Watch the sequence of colors light up</li>
            <li>Repeat the sequence by clicking the colors</li>
            <li>Each round adds one more color</li>
            <li>Reach round 10 to win!</li>
          </ul>
        </div>
      )}

      {/* Toast Message */}
      {message && gameState !== 'ready' && (
        <Toast message={message} />
      )}

      {/* Confetti */}
      {showConfetti && (
        <Confetti />
      )}
    </div>
  )
}
