import { useState, useCallback, useRef } from "react";
import { clsx } from "clsx";
import Tile from "./Tile";
import RevealedCategory from "./RevealedCategory";
import LivesDisplay from "./LivesDisplay";
import Toast from "./Toast";
import { COLOR_STYLES } from "../data/puzzles";

const MAX_SELECTED = 4;
const MAX_LIVES = 4;

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function GameBoard({ puzzle, onNewGame }) {
  const allWords = puzzle.categories.flatMap((c) =>
    c.words.map((w) => ({ word: w, categoryId: c.id }))
  );

  const [tiles, setTiles] = useState(() => shuffleArray(allWords));
  const [selected, setSelected] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [lives, setLives] = useState(MAX_LIVES);
  const [toast, setToast] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [gameState, setGameState] = useState("playing"); // 'playing' | 'won' | 'lost'
  const [guessedCategories, setGuessedCategories] = useState([]);
  const gridRef = useRef(null);

  const isRevealed = (word) => revealed.includes(word);
  const isSelected = (word) => selected.includes(word);

  const showToast = useCallback((msg) => {
    setToast(msg);
  }, []);

  const handleTileClick = (word) => {
    if (gameState !== "playing") return;
    if (isRevealed(word)) return;

    if (isSelected(word)) {
      setSelected((prev) => prev.filter((w) => w !== word));
    } else {
      if (selected.length >= MAX_SELECTED) return;
      setSelected((prev) => [...prev, word]);
    }
  };

  const handleShuffle = () => {
    const unrevealed = tiles.filter((t) => !isRevealed(t.word));
    const shuffled = shuffleArray(unrevealed);
    setTiles((prev) => {
      const revealedTiles = prev.filter((t) => isRevealed(t.word));
      return [...revealedTiles, ...shuffled];
    });
  };

  const handleDeselectAll = () => {
    setSelected([]);
  };

  const handleSubmit = () => {
    if (selected.length !== MAX_SELECTED) return;
    if (gameState !== "playing") return;

    const selectedCategoryIds = selected.map((word) => {
      const tile = allWords.find((t) => t.word === word);
      return tile?.categoryId;
    });

    const allSame = selectedCategoryIds.every((id) => id === selectedCategoryIds[0]);

    if (allSame) {
      const matchedCategory = puzzle.categories.find(
        (c) => c.id === selectedCategoryIds[0]
      );

      setRevealed((prev) => [...prev, ...selected]);
      setSelected([]);
      const newGuessed = [...guessedCategories, matchedCategory];
      setGuessedCategories(newGuessed);

      if (newGuessed.length === puzzle.categories.length) {
        setTimeout(() => setGameState("won"), 400);
      }
    } else {
      const oneAway = selectedCategoryIds.filter(
        (id, _, arr) => arr.filter((x) => x === id).length === 3
      ).length > 0;

      triggerShake();
      const newLives = lives - 1;
      setLives(newLives);
      setSelected([]);

      if (oneAway) {
        showToast("One away!");
      } else {
        showToast("Not quite!");
      }

      if (newLives <= 0) {
        setTimeout(() => {
          const remaining = puzzle.categories.filter(
            (c) => !guessedCategories.find((g) => g.id === c.id)
          );
          setGuessedCategories((prev) => [...prev, ...remaining]);
          setRevealed(allWords.map((t) => t.word));
          setGameState("lost");
        }, 600);
      }
    }
  };

  const triggerShake = () => {
    setIsShaking(true);
    setTimeout(() => setIsShaking(false), 500);
  };

  const unrevealed = tiles.filter((t) => !isRevealed(t.word));

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-xl mx-auto px-4 py-6">
      {toast && (
        <Toast message={toast} onDone={() => setToast(null)} />
      )}

      <p className="text-sm font-bold tracking-wide" style={{ color: "#c084fc" }}>
        Group the words into four matching sets 🌸
      </p>

      <div className="w-full flex flex-col gap-2">
        {guessedCategories.map((cat) => (
          <RevealedCategory key={cat.id} category={cat} />
        ))}

        {unrevealed.length > 0 && (
          <div
            ref={gridRef}
            className={clsx(
              "grid grid-cols-4 gap-2 w-full",
              isShaking && "shake"
            )}
          >
            {unrevealed.map(({ word }) => (
              <Tile
                key={word}
                word={word}
                isSelected={isSelected(word)}
                isRevealed={false}
                onClick={() => handleTileClick(word)}
              />
            ))}
          </div>
        )}
      </div>

      {gameState === "playing" && (
        <>
          <LivesDisplay lives={lives} maxLives={MAX_LIVES} />

          <div className="flex gap-3 flex-wrap justify-center">
            <button
              onClick={handleShuffle}
              className="px-5 py-2 rounded-full text-sm font-black transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-95"
              style={{ background: "rgba(255,255,255,0.8)", color: "#7c3aed", border: "2px solid #ddd6fe", boxShadow: "0 2px 6px rgba(167,139,250,0.15)" }}
            >
              🔀 Shuffle
            </button>
            <button
              onClick={handleDeselectAll}
              disabled={selected.length === 0}
              className="px-5 py-2 rounded-full text-sm font-black transition-all duration-150 hover:-translate-y-0.5 hover:shadow-md active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              style={{ background: "rgba(255,255,255,0.8)", color: "#7c3aed", border: "2px solid #ddd6fe", boxShadow: "0 2px 6px rgba(167,139,250,0.15)" }}
            >
              ✕ Deselect All
            </button>
            <button
              onClick={handleSubmit}
              disabled={selected.length !== MAX_SELECTED}
              className="px-5 py-2 rounded-full text-sm font-black text-white transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:translate-y-0 disabled:hover:shadow-none"
              style={{ background: selected.length === MAX_SELECTED ? "linear-gradient(135deg, #f472b6, #a78bfa)" : "#d1d5db", boxShadow: selected.length === MAX_SELECTED ? "0 4px 14px rgba(167,139,250,0.4)" : "none" }}
            >
              Submit ✨
            </button>
          </div>
        </>
      )}

      {gameState === "won" && (
        <div className="bounce-in flex flex-col items-center gap-3 mt-4 p-6 rounded-3xl w-full"
          style={{ background: "rgba(255,255,255,0.7)", boxShadow: "0 8px 32px rgba(167,139,250,0.15)", backdropFilter: "blur(8px)" }}>
          <div className="text-5xl">🎉✨🌸</div>
          <h2 className="text-2xl font-black" style={{ background: "linear-gradient(135deg, #f472b6, #a78bfa)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>You nailed it!</h2>
          <p className="font-semibold text-sm" style={{ color: "#9ca3af" }}>
            Solved with {lives} 💜 remaining!
          </p>
          <button
            onClick={onNewGame}
            className="px-6 py-2.5 rounded-full text-white text-sm font-black transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg mt-1"
            style={{ background: "linear-gradient(135deg, #f472b6, #a78bfa)", boxShadow: "0 4px 14px rgba(167,139,250,0.4)" }}
          >
            Play Again 🌟
          </button>
        </div>
      )}

      {gameState === "lost" && (
        <div className="bounce-in flex flex-col items-center gap-3 mt-4 p-6 rounded-3xl w-full"
          style={{ background: "rgba(255,255,255,0.7)", boxShadow: "0 8px 32px rgba(167,139,250,0.15)", backdropFilter: "blur(8px)" }}>
          <div className="text-5xl">🥺�</div>
          <h2 className="text-2xl font-black" style={{ color: "#7c3aed" }}>So close!</h2>
          <p className="font-semibold text-sm" style={{ color: "#9ca3af" }}>
            The answers are revealed above.
          </p>
          <button
            onClick={onNewGame}
            className="px-6 py-2.5 rounded-full text-white text-sm font-black transition-all duration-150 hover:-translate-y-0.5 hover:shadow-lg mt-1"
            style={{ background: "linear-gradient(135deg, #a78bfa, #60a5fa)", boxShadow: "0 4px 14px rgba(167,139,250,0.4)" }}
          >
            Try Again 🌈
          </button>
        </div>
      )}
    </div>
  );
}
