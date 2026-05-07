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
        showToast("One away — so close!");
      } else {
        showToast("Not quite. Try again!");
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
    <div className="flex flex-col items-center gap-6 w-full max-w-2xl mx-auto px-4 sm:px-6 pt-6 pb-10">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Controls row */}
      <div className="flex flex-col items-center gap-3 w-full">
        <p
          className="text-xs font-bold tracking-[0.12em] uppercase"
          style={{ color: "var(--text-muted)" }}
        >
          🌸 Group the words into five matching sets 🌸
        </p>
        <ModeToggle mode={mode} onChange={handleModeChange} disabled={hasStarted} />
      </div>

      {/* Board */}
      <div className="w-full flex flex-col gap-2">
        {guessedCategories.map((cat) => (
          <RevealedCategory key={cat.id} category={cat} />
        ))}

        {unrevealed.length > 0 && (
          <div
            ref={gridRef}
            className={clsx(
              "grid gap-2 w-full",
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

      {/* Action bar */}
      {gameState === "playing" && (
        <div className="flex flex-col items-center gap-5 w-full">
          <LivesDisplay lives={lives} maxLives={LIVES_BY_MODE[mode]} />

          <div className="flex gap-2.5 flex-wrap justify-center">
            <button onClick={handleShuffle} className="btn-outline">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="16 3 21 3 21 8"/><line x1="4" y1="20" x2="21" y2="3"/>
                <polyline points="21 16 21 21 16 21"/><line x1="15" y1="15" x2="21" y2="21"/>
              </svg>
              Shuffle
            </button>
            <button
              onClick={handleDeselectAll}
              disabled={selected.length === 0}
              className="btn-outline"
            >
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
              Deselect
            </button>
            <button
              onClick={handleSubmit}
              disabled={selected.length !== MAX_SELECTED}
              className="btn-primary"
            >
              Submit
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="20 6 9 17 4 12"/>
              </svg>
            </button>
          </div>
        </div>
      )}

      {/* Win state */}
      {gameState === "won" && (
        <div
          className="bounce-in flex flex-col items-center gap-5 mt-2 p-8 rounded-3xl w-full"
          style={{
            background: "linear-gradient(135deg, rgba(255,240,245,0.95) 0%, rgba(245,235,255,0.95) 50%, rgba(235,248,240,0.95) 100%)",
            border: "1.5px solid rgba(232, 96, 122, 0.25)",
            boxShadow: "0 8px 48px rgba(232, 96, 122, 0.14), 0 0 0 1px rgba(176,126,200,0.12)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{
              background: "linear-gradient(135deg, rgba(232,96,122,0.15), rgba(176,126,200,0.15))",
              border: "1.5px solid rgba(232,96,122,0.28)",
            }}
          >
            🌸
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <h2
              className="font-display text-3xl italic"
              style={{
                background: "linear-gradient(135deg, #e8607a, #b07ec8)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {mode === "hard" ? "Bloomed in hard mode!" : "You're in full bloom!"}
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              Solved with{" "}
              <span style={{ color: "var(--text-secondary)", fontWeight: 700 }}>
                {lives} {lives === 1 ? "petal" : "petals"}
              </span>{" "}
              remaining 🌷
            </p>
          </div>
          <button onClick={onNewGame} className="btn-primary mt-1">
            Play Again
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </button>
        </div>
      )}

      {/* Lose state */}
      {gameState === "lost" && (
        <div
          className="bounce-in flex flex-col items-center gap-5 mt-2 p-8 rounded-3xl w-full"
          style={{
            background: "linear-gradient(135deg, rgba(255,245,240,0.95) 0%, rgba(255,240,248,0.95) 100%)",
            border: "1.5px solid rgba(210, 150, 160, 0.28)",
            boxShadow: "0 8px 48px rgba(180, 80, 100, 0.10)",
            backdropFilter: "blur(16px)",
          }}
        >
          <div
            className="w-16 h-16 rounded-full flex items-center justify-center text-3xl"
            style={{
              background: "rgba(232, 96, 122, 0.08)",
              border: "1.5px solid rgba(232, 96, 122, 0.22)",
            }}
          >
            🥀
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <h2
              className="font-display text-3xl italic"
              style={{ color: "var(--text-primary)" }}
            >
              A petal fell…
            </h2>
            <p className="text-sm" style={{ color: "var(--text-muted)" }}>
              The answers are revealed above. Every flower blooms again! 🌱
            </p>
          </div>
          <button onClick={onNewGame} className="btn-primary mt-1">
            Try Again
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
