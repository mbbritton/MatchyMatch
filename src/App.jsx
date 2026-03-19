import { useState } from 'react'
import Header from './components/Header'
import GameBoard from './components/GameBoard'
import { puzzles } from './data/puzzles'

function App() {
  const [puzzleIndex, setPuzzleIndex] = useState(0)
  const [gameKey, setGameKey] = useState(0)

  const handleNewGame = () => {
    const nextIndex = (puzzleIndex + 1) % puzzles.length
    setPuzzleIndex(nextIndex)
    setGameKey((k) => k + 1)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col items-center">
        <GameBoard
          key={gameKey}
          puzzle={puzzles[puzzleIndex]}
          onNewGame={handleNewGame}
        />
      </main>
    </div>
  )
}

export default App
