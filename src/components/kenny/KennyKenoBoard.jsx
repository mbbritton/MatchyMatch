import { useState, useEffect } from 'react'

export default function KennyKenoBoard() {
  const [selectedNumbers, setSelectedNumbers] = useState(new Set())
  const [drawnNumbers, setDrawnNumbers] = useState(new Set())
  const [gameOver, setGameOver] = useState(false)
  const [message, setMessage] = useState('')

  const numbers = Array.from({ length: 80 }, (_, i) => i + 1)

  const handleNumberClick = (num) => {
    if (gameOver || drawnNumbers.has(num)) return

    const newSelected = new Set(selectedNumbers)
    if (newSelected.has(num)) {
      newSelected.delete(num)
    } else if (newSelected.size < 10) {
      newSelected.add(num)
    }
    setSelectedNumbers(newSelected)
  }

  const handleDrawNumbers = () => {
    if (selectedNumbers.size === 0) {
      setMessage('Select at least one number!')
      return
    }

    const drawn = new Set()
    while (drawn.size < 20) {
      drawn.add(Math.floor(Math.random() * 80) + 1)
    }
    setDrawnNumbers(drawn)

    const matches = Array.from(selectedNumbers).filter((num) =>
      drawn.has(num)
    ).length

    setMessage(`You matched ${matches} out of ${selectedNumbers.size} numbers!`)
    setGameOver(true)
  }

  const handleNewGame = () => {
    setSelectedNumbers(new Set())
    setDrawnNumbers(new Set())
    setGameOver(false)
    setMessage('')
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold mb-2">Kenny's Keno</h2>
        <p className="text-sm" style={{ color: 'var(--label-secondary)' }}>
          Select up to 10 numbers, then draw 20 numbers to see how many match!
        </p>
      </div>

      <div className="mb-6 p-4 rounded-lg" style={{ backgroundColor: 'var(--fill-secondary)' }}>
        <p className="text-sm font-medium mb-2">
          Selected: {selectedNumbers.size}/10
        </p>
        <div className="grid grid-cols-10 gap-2">
          {numbers.map((num) => (
            <button
              key={num}
              onClick={() => handleNumberClick(num)}
              disabled={gameOver || drawnNumbers.has(num)}
              className={`
                w-full aspect-square rounded font-bold text-sm transition-all
                ${selectedNumbers.has(num)
                  ? 'bg-blue-500 text-white'
                  : drawnNumbers.has(num)
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-200 dark:bg-gray-700'
                }
                ${gameOver || drawnNumbers.has(num) ? 'cursor-not-allowed opacity-75' : 'hover:opacity-80'}
              `}
            >
              {num}
            </button>
          ))}
        </div>
      </div>

      {message && (
        <div className="mb-6 p-4 rounded-lg text-center font-semibold" style={{ backgroundColor: 'var(--fill-secondary)' }}>
          {message}
        </div>
      )}

      <div className="flex gap-4 justify-center">
        {!gameOver ? (
          <button
            onClick={handleDrawNumbers}
            disabled={selectedNumbers.size === 0}
            className="px-6 py-2 bg-blue-500 text-white rounded font-semibold hover:bg-blue-600 disabled:opacity-50"
          >
            Draw Numbers
          </button>
        ) : (
          <button
            onClick={handleNewGame}
            className="px-6 py-2 bg-green-500 text-white rounded font-semibold hover:bg-green-600"
          >
            Play Again
          </button>
        )}
      </div>
    </div>
  )
}

