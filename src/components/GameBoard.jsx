import { useState, useCallback, useRef } from "react";
import { clsx } from "clsx";
import Tile from "./Tile";
import RevealedCategory from "./RevealedCategory";
import LivesDisplay from "./LivesDisplay";
import ModeToggle from "./ModeToggle";
import Toast from "./Toast";

const MAX_SELECTED = 4;
const LIVES_BY_MODE = { normal: 5, hard: 3 };

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

  const [mode, setMode] = useState("normal");
  const [hasStarted, setHasStarted] = useState(false);
  const [tiles, setTiles] = useState(() => shuffleArray(allWords));
  const [selected, setSelected] = useState([]);
  const [revealed, setRevealed] = useState([]);
  const [lives, setLives] = useState(LIVES_BY_MODE["normal"]);
  const [toast, setToast] = useState(null);
  const [isShaking, setIsShaking] = useState(false);
  const [gameState, setGameState] = useState("playing");
  const [guessedCategories, setGuessedCategories] = useState([]);
  const gridRef = useRef(null);

  const isWordRevealed = (word) => revealed.includes(word);
  const isWordSelected = (word) => selected.includes(word);

  const showToast = useCallback((msg) => {
    setToast(msg);
  }, []);

  const handleModeChange = (newMode) => {
    if (hasStarted) return;
    setMode(newMode);
    setLives(LIVES_BY_MODE[newMode]);
    setTiles(shuffleArray(allWords));
    setSelected([]);
    setRevealed([]);
    setGuessedCategories([]);
    setGameState("playing");
  };

  const handleTileClick = (word) => {
    if (gameState !== "playing") return;
    if (isWordRevealed(word)) return;
    if (isWordSelected(word)) {
      setSelected((prev) => prev.filter((w) => w !== word));
    } else {
      if (selected.length >= MAX_SELECTED) return;
      setSelected((prev) => [...prev, word]);
    }
  };

  const handleShuffle = () => {
    const unrevealed = tiles.filter((t) => !isWordRevealed(t.word));
    const shuffled = shuffleArray(unrevealed);
    setTiles((prev) => {
      const revealedTiles = prev.filter((t) => isWordRevealed(t.word));
      return [...revealedTiles, ...shuffled];
    });
  };

  const handleDeselectAll = () => setSelected([]);

  const handleSubmit = () => {
    if (selected.length !== MAX_SELECTED) return;
    if (gameState !== "playing") return;

    if (!hasStarted) setHasStarted(true);

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
      const oneAway = selectedCategoryIds.some(
        (id) => selectedCategoryIds.filter((x) => x === id).length === 3
      );

      triggerShake();
      const newLives = lives - 1;
      setLives(newLives);
      setSelected([]);

      if (oneAway && mode === "normal") {
        showToast("So close — one away! 👀");
      } else {
        showToast("Not quite! 😅");
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

  const unrevealed = tiles.filter((t) => !isWordRevealed(t.word));

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto px-4 py-8">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Subtitle + mode toggle */}
      <div className="flex flex-col items-center gap-3">
        <p className="text-sm font-bold tracking-wide" style={{ color: "#c084fc" }}>
          Group the words into four matching sets 🌸
        </p>
        <ModeToggle mode={mode} onChange={handleModeChange} disabled={hasStarted} />
      </div>

      {/* Board */}
      <div className="w-full flex flex-col gap-2.5">
        {guessedCategories.map((cat) => (
          <RevealedCategory key={cat.id} category={cat} />
        ))}

        {unrevealed.length > 0 && (
          <div
            ref={gridRef}
            className={clsx(
              "grid gap-2.5 w-full",
              "grid-cols-4 sm:grid-cols-5",
              isShaking && "shake"
            )}
          >
            {unrevealed.map(({ word }) => (
              <Tile
                key={word}
                word={word}
                isSelected={isWordSelected(word)}
                isRevealed={false}
                onClick={() => handleTileClick(word)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Controls */}
      {gameState === "playing" && (
        <div className="flex flex-col items-center gap-4 w-full">
          <LivesDisplay lives={lives} maxLives={LIVES_BY_MODE[mode]} />
          <div className="flex gap-3 flex-wrap justify-center">
            <button onClick={handleShuffle} className="btn-outline">
              🔀 Shuffle
            </button>
            <button
              onClick={handleDeselectAll}
              disabled={selected.length === 0}
              className="btn-outline"
            >
              ✕ Deselect All
            </button>
            <button
              onClick={handleSubmit}
              disabled={selected.length !== MAX_SELECTED}
              className="btn-primary"
            >
              Submit ✨
            </button>
          </div>
        </div>
      )}

      {/* Win state */}
      {gameState === "won" && (
        <div
          className="bounce-in flex flex-col items-center gap-4 mt-2 p-8 rounded-3xl w-full"
          style={{
            background: "rgba(255,255,255,0.7)",
            boxShadow: "0 8px 32px rgba(167,139,250,0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="text-6xl">🎉✨🌸</div>
          <h2
            className="text-3xl font-black"
            style={{
              background: "linear-gradient(135deg, #f472b6, #a78bfa)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            {mode === "hard" ? "Hard mode conquered! 🔥" : "You nailed it!"}
          </h2>
          <p className="font-semibold text-sm" style={{ color: "#9ca3af" }}>
            Solved with {lives} 💜 remaining!
          </p>
          <button onClick={onNewGame} className="btn-primary mt-2">
            Play Again 🌟
          </button>
        </div>
      )}

      {/* Lose state */}
      {gameState === "lost" && (
        <div
          className="bounce-in flex flex-col items-center gap-4 mt-2 p-8 rounded-3xl w-full"
          style={{
            background: "rgba(255,255,255,0.7)",
            boxShadow: "0 8px 32px rgba(167,139,250,0.15)",
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="text-6xl">🥺💫</div>
          <h2 className="text-3xl font-black" style={{ color: "#7c3aed" }}>
            So close!
          </h2>
          <p className="font-semibold text-sm" style={{ color: "#9ca3af" }}>
            The answers are revealed above.
          </p>
          <button onClick={onNewGame} className="btn-primary mt-2">
            Try Again 🌈
          </button>
        </div>
      )}
    </div>
  );
}
