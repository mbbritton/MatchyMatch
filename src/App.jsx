import { useState } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import GameBoard from './components/GameBoard'
import WordleBoard from './components/wordle/WordleBoard'
import NumberCrunchBoard from './components/numbercrunch/NumberCrunchBoard'
import CrosswordBoard from './components/crossword/CrosswordBoard'
import WordChainBoard from './components/wordchain/WordChainBoard'
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
      <main className="flex-1 flex flex-col items-center pt-6 pb-10 px-4 sm:px-6">
        {activeGame === 'matchy' ? (
          <GameBoard
            key={`matchy-${gameKey}`}
            puzzle={puzzles[PUZZLE_INDEX]}
            onNewGame={handleNewGame}
          />
        ) : activeGame === 'wordle' ? (
          <WordleBoard key={`wordle-${gameKey}`} />
        ) : activeGame === 'crunch' ? (
          <NumberCrunchBoard key={`crunch-${gameKey}`} />
        ) : activeGame === 'cross' ? (
          <CrosswordBoard key={`cross-${gameKey}`} />
        ) : (
          <WordChainBoard key={`chain-${gameKey}`} />
        )}
      </main>
      <Footer />
    </div>
  )
}

export default App
