import { useState } from 'react'
import Header from './components/Header'
import GameBoard from './components/GameBoard'
import { puzzles } from './data/puzzles'

const envIndex = parseInt(import.meta.env.VITE_PUZZLE_INDEX, 10)
const PUZZLE_INDEX =
  Number.isFinite(envIndex) && envIndex >= 0 && envIndex < puzzles.length
    ? envIndex
    : 0

function App() {
  const [gameKey, setGameKey] = useState(0)

  const handleNewGame = () => {
    setGameKey((k) => k + 1)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center">
        <GameBoard
          key={gameKey}
          puzzle={puzzles[PUZZLE_INDEX]}
          onNewGame={handleNewGame}
        />
      </main>
    </div>
  )
}

export default App
