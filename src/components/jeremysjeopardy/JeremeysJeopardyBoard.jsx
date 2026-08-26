import { useState } from 'react'
import Toast from '../Toast'
import Confetti from '../Confetti'

const QUESTIONS = [
  {
    clue: 'The capital of France',
    answer: 'Paris',
  },
  {
    clue: 'The largest planet in our solar system',
    answer: 'Jupiter',
  },
  {
    clue: 'The author of Romeo and Juliet',
    answer: 'Shakespeare',
  },
  {
    clue: 'The chemical symbol for gold',
    answer: 'Au',
  },
  {
    clue: 'The year the Titanic sank',
    answer: '1912',
  },
]

export default function JeremeysJeopardyBoard() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState('')
  const [score, setScore] = useState(0)
  const [answered, setAnswered] = useState(false)
  const [isCorrect, setIsCorrect] = useState(false)
  const [showConfetti, setShowConfetti] = useState(false)

  const currentQuestion = QUESTIONS[currentIndex]

  const handleSubmit = () => {
    const correct = userAnswer.toLowerCase().trim() === currentQuestion.answer.toLowerCase().trim()
    setIsCorrect(correct)
    setAnswered(true)
    if (correct) {
      setScore(score + 1)
      setShowConfetti(true)
    }
  }

  const handleNext = () => {
    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setUserAnswer('')
      setAnswered(false)
      setIsCorrect(false)
      setShowConfetti(false)
    }
  }

  const handleNewGame = () => {
    setCurrentIndex(0)
    setUserAnswer('')
    setScore(0)
    setAnswered(false)
    setIsCorrect(false)
    setShowConfetti(false)
  }

  const isGameOver = currentIndex === QUESTIONS.length - 1 && answered

  return (
    <div className="w-full max-w-md mx-auto">
      {showConfetti && <Confetti />}

      <div className="text-center mb-8">
        <h2
          className="text-3xl font-bold tracking-tight mb-2"
          style={{ color: 'var(--label-primary)' }}
        >
          Jeremy's Jeopardy
        </h2>
        <p
          className="text-sm"
          style={{ color: 'var(--label-secondary)' }}
        >
          Answer the clue with the correct response!
        </p>
      </div>

      <div
        className="text-center p-4 rounded-lg mb-6 font-semibold"
        style={{ backgroundColor: 'var(--fill-tertiary)', color: 'var(--label-primary)' }}
      >
        <p>Score: {score} / {QUESTIONS.length}</p>
        <p className="text-sm mt-1" style={{ color: 'var(--label-secondary)' }}>
          Question {currentIndex + 1} of {QUESTIONS.length}
        </p>
      </div>

      <div
        className="p-6 rounded-lg mb-6"
        style={{ backgroundColor: 'var(--fill-secondary)' }}
      >
        <p
          className="text-lg font-semibold text-center"
          style={{ color: 'var(--label-primary)' }}
        >
          {currentQuestion.clue}
        </p>
      </div>

      {!answered ? (
        <div className="flex gap-3 mb-6">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter your answer..."
            className="flex-1 px-4 py-3 rounded-lg"
            style={{
              backgroundColor: 'var(--fill-tertiary)',
              color: 'var(--label-primary)',
              border: '1px solid var(--fill-quaternary)',
            }}
          />
          <button
            onClick={handleSubmit}
            disabled={!userAnswer.trim()}
            className="px-6 py-3 rounded-lg font-semibold text-white disabled:opacity-50"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            Submit
          </button>
        </div>
      ) : (
        <div className="mb-6">
          <div
            className={`p-4 rounded-lg text-center ${
              isCorrect ? 'bg-green-100' : 'bg-red-100'
            }`}
            style={{
              backgroundColor: isCorrect ? 'rgba(52, 199, 89, 0.1)' : 'rgba(255, 59, 48, 0.1)',
            }}
          >
            <p
              className="font-semibold"
              style={{
                color: isCorrect ? '#34c759' : '#ff3b30',
              }}
            >
              {isCorrect ? '✓ Correct!' : `✗ Incorrect. The answer is: ${currentQuestion.answer}`}
            </p>
          </div>
        </div>
      )}

      {answered && (
        <div className="flex gap-3">
          {!isGameOver && (
            <button
              onClick={handleNext}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Next
            </button>
          )}
          {isGameOver && (
            <button
              onClick={handleNewGame}
              className="flex-1 px-6 py-3 rounded-lg font-semibold text-white"
              style={{ backgroundColor: 'var(--accent)' }}
            >
              Play Again
            </button>
          )}
        </div>
      )}
    </div>
  )
}
