import { useState } from 'react'
import Header from './components/Header'
import GameBoard from './components/GameBoard'
import WordleBoard from './components/wordle/WordleBoard'
import { puzzles } from './data/puzzles'

const envIndex = parseInt(import.meta.env.VITE_PUZZLE_INDEX, 10)
const PUZZLE_INDEX =
  Number.isFinite(envIndex) && envIndex >= 0 && envIndex < puzzles.length
    ? envIndex
    : 0

function App() {
  const [activeGame, setActiveGame] = useState('matchy')
  const [gameKey, setGameKey] = useState(0)

  const handleNewGame = () => {
    setGameKey((k) => k + 1)
  }

  const handleGameChange = (game) => {
    setActiveGame(game)
    setGameKey((k) => k + 1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header activeGame={activeGame} onGameChange={handleGameChange} />
      <main className="flex-1 flex flex-col items-center pt-6 pb-10 px-4">
        {activeGame === 'matchy' ? (
          <GameBoard
            key={`matchy-${gameKey}`}
            puzzle={puzzles[PUZZLE_INDEX]}
            onNewGame={handleNewGame}
          />
        ) : (
          <WordleBoard key={`wordle-${gameKey}`} />
        )}
      </main>
    </div>
  )
}

export default App
