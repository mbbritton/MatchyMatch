import { useState } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

const SCENARIOS = [
  {
    question: "Will the next number be odd or even?",
    options: ["Odd", "Even"],
    getResult: () => {
      const num = Math.floor(Math.random() * 100) + 1
      return { answer: num % 2 === 0 ? "Even" : "Odd", detail: `The number was ${num}` }
    }
  },
  {
    question: "Will the coin land on heads or tails?",
    options: ["Heads", "Tails"],
    getResult: () => {
      const result = Math.random() < 0.5 ? "Heads" : "Tails"
      return { answer: result, detail: `It landed on ${result.toLowerCase()}!` }
    }
  },
  {
    question: "Will the dice roll high (4-6) or low (1-3)?",
    options: ["High", "Low"],
    getResult: () => {
      const roll = Math.floor(Math.random() * 6) + 1
      const result = roll >= 4 ? "High" : "Low"
      return { answer: result, detail: `You rolled a ${roll}` }
    }
  },
  {
    question: "Will the card be red or black?",
    options: ["Red", "Black"],
    getResult: () => {
      const suits = ["♥️ Hearts", "♦️ Diamonds", "♠️ Spades", "♣️ Clubs"]
      const suit = suits[Math.floor(Math.random() * suits.length)]
      const result = suit.includes("Hearts") || suit.includes("Diamonds") ? "Red" : "Black"
      return { answer: result, detail: `You drew ${suit}` }
    }
  },
  {
    question: "Will the temperature be above or below 70°F?",
    options: ["Above", "Below"],
    getResult: () => {
      const temp = Math.floor(Math.random() * 60) + 40 // 40-99°F
      const result = temp >= 70 ? "Above" : "Below"
      return { answer: result, detail: `It's ${temp}°F` }
    }
  },
  {
    question: "Will the next letter be a vowel or consonant?",
    options: ["Vowel", "Consonant"],
    getResult: () => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
      const letter = letters[Math.floor(Math.random() * letters.length)]
      const vowels = "AEIOU"
      const result = vowels.includes(letter) ? "Vowel" : "Consonant"
      return { answer: result, detail: `The letter was ${letter}` }
    }
  },
  {
    question: "Will the traffic light be red or green?",
    options: ["Red", "Green"],
    getResult: () => {
      const result = Math.random() < 0.5 ? "Red" : "Green"
      return { answer: result, detail: `The light is ${result.toLowerCase()}!` }
    }
  },
  {
    question: "Will the next shape be a circle or square?",
    options: ["Circle", "Square"],
    getResult: () => {
      const result = Math.random() < 0.5 ? "Circle" : "Square"
      const emoji = result === "Circle" ? "⭕" : "⬜"
      return { answer: result, detail: `It's a ${result.toLowerCase()}! ${emoji}` }
    }
  }
]

function getRandomScenario() {
  return SCENARIOS[Math.floor(Math.random() * SCENARIOS.length)]
}

export default function MizeWellBoard() {
  const [currentScenario, setCurrentScenario] = useState(() => getRandomScenario())
  const [prediction, setPrediction] = useState(null)
  const [result, setResult] = useState(null)
  const [isRevealing, setIsRevealing] = useState(false)
  const [score, setScore] = useState(0)
  const [streak, setStreak] = useState(0)
  const [totalGuesses, setTotalGuesses] = useState(0)
  const [message, setMessage] = useState('')
  const [showConfetti, setShowConfetti] = useState(false)

  const handlePredict = (choice) => {
    if (isRevealing || result !== null) return
    setPrediction(choice)
    setMessage('')
  }

  const handleReveal = () => {
    if (!prediction || isRevealing) return

    setIsRevealing(true)
    setMessage('')

    // Simulate suspense
    setTimeout(() => {
      const outcome = currentScenario.getResult()
      setResult(outcome)
      setTotalGuesses(totalGuesses + 1)

      if (outcome.answer === prediction) {
        setScore(score + 1)
        setStreak(streak + 1)
        if (streak + 1 >= 3) {
          setMessage(`🔥 ${streak + 1} in a row! You're on fire!`)
          setShowConfetti(true)
        } else {
          setMessage('✅ Correct! Mize well keep going!')
        }
      } else {
        setStreak(0)
        setMessage(`❌ Wrong! ${outcome.detail}`)
      }

      setIsRevealing(false)
    }, 1200)
  }

  const handleNext = () => {
    setPrediction(null)
    setResult(null)
    setMessage('')
    setShowConfetti(false)
    // Pick a different scenario
    const available = SCENARIOS.filter(s => s !== currentScenario)
    setCurrentScenario(available[Math.floor(Math.random() * available.length)])
  }

  const handleReset = () => {
    setPrediction(null)
    setResult(null)
    setScore(0)
    setStreak(0)
    setTotalGuesses(0)
    setMessage('')
    setShowConfetti(false)
    setCurrentScenario(getRandomScenario())
  }

  const accuracy = totalGuesses > 0 ? Math.round((score / totalGuesses) * 100) : 0

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--label-primary)' }}
        >
          Mize Well
        </h2>
        <p
          className="text-sm"
          style={{ color: 'var(--label-secondary)' }}
        >
          Make your prediction — you mize well try your luck!
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-3 mb-6">
        <div
          className="p-3 rounded-lg text-center"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-xs mb-1" style={{ color: 'var(--label-secondary)' }}>
            Score
          </p>
          <p className="text-xl font-bold" style={{ color: 'var(--label-primary)' }}>
            {score}
          </p>
        </div>
        <div
          className="p-3 rounded-lg text-center"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-xs mb-1" style={{ color: 'var(--label-secondary)' }}>
            Streak
          </p>
          <p className="text-xl font-bold" style={{ color: streak >= 3 ? '#ff9f0a' : 'var(--label-primary)' }}>
            {streak} {streak >= 3 ? '🔥' : ''}
          </p>
        </div>
        <div
          className="p-3 rounded-lg text-center"
          style={{ backgroundColor: 'var(--fill-tertiary)' }}
        >
          <p className="text-xs mb-1" style={{ color: 'var(--label-secondary)' }}>
            Accuracy
          </p>
          <p className="text-xl font-bold" style={{ color: 'var(--label-primary)' }}>
            {accuracy}%
          </p>
        </div>
      </div>

      {/* Question Card */}
      <div
        className="rounded-xl p-6 mb-6 text-center"
        style={{ backgroundColor: 'var(--fill-secondary)' }}
      >
        <p className="text-4xl mb-4">🔮</p>
        <p
          className="text-lg font-semibold mb-4"
          style={{ color: 'var(--label-primary)' }}
        >
          {currentScenario.question}
        </p>

        {/* Result Display */}
        {result && (
          <div className="mb-4">
            <p
              className="text-2xl font-bold mb-2"
              style={{ color: result.answer === prediction ? '#34c759' : '#ff3b30' }}
            >
              {result.answer}
            </p>
            <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
              {result.detail}
            </p>
          </div>
        )}

        {/* Prediction Buttons */}
        {!result && (
          <div className="flex gap-3 mb-4">
            {currentScenario.options.map((option) => (
              <button
                key={option}
                onClick={() => handlePredict(option)}
                disabled={isRevealing}
                className={`flex-1 px-6 py-4 rounded-lg font-semibold transition-all ${
                  prediction === option
                    ? 'ring-2 ring-offset-2'
                    : 'opacity-70 hover:opacity-100'
                }`}
                style={{
                  backgroundColor: prediction === option ? 'var(--accent)' : 'var(--fill-tertiary)',
                  color: prediction === option ? 'white' : 'var(--label-primary)',
                  ringColor: 'var(--accent)',
                }}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {/* Reveal Button */}
        {prediction && !result && (
          <button
            onClick={handleReveal}
            disabled={isRevealing}
            className="w-full px-6 py-3 rounded-lg font-semibold text-white transition-opacity disabled:opacity-50"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            {isRevealing ? 'Revealing...' : 'Reveal'}
          </button>
        )}
      </div>

      {/* Action Buttons */}
      {result && (
        <div className="flex gap-3 mb-6">
          <button
            onClick={handleNext}
            className="flex-1 px-6 py-3 rounded-lg font-semibold text-white"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Next Challenge
          </button>
          <button
            onClick={handleReset}
            className="px-6 py-3 rounded-lg font-semibold"
            style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-primary)' }}
          >
            Reset
          </button>
        </div>
      )}

      {/* Toast Message */}
      {message && <Toast message={message} />}

      {/* Confetti */}
      {showConfetti && <Confetti />}
    </div>
  )
}
