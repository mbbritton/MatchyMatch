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

/* ── Shuffle icon ─────────────────────────────────────────────── */
function ShuffleIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="16 3 21 3 21 8"/>
      <line x1="4" y1="20" x2="21" y2="3"/>
      <polyline points="21 16 21 21 16 21"/>
      <line x1="15" y1="15" x2="21" y2="21"/>
    </svg>
  );
}

/* ── X icon ───────────────────────────────────────────────────── */
function XIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <line x1="18" y1="6" x2="6" y2="18"/>
      <line x1="6" y1="6" x2="18" y2="18"/>
    </svg>
  );
}

/* ── Check icon ───────────────────────────────────────────────── */
function CheckIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12"/>
    </svg>
  );
}

/* ── Replay icon ──────────────────────────────────────────────── */
function ReplayIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 4 23 10 17 10"/>
      <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"/>
    </svg>
  );
}

/* ── End-state card ───────────────────────────────────────────── */
function EndCard({ won, lives, mode, onAction }) {
  return (
    <div
      className="bounce-in w-full rounded-3xl overflow-hidden"
      style={{
        background: won
          ? "linear-gradient(145deg, rgba(167,139,250,0.08) 0%, rgba(244,114,182,0.06) 100%)"
          : "rgba(255,255,255,0.025)",
        border: won
          ? "1px solid rgba(167,139,250,0.22)"
          : "1px solid rgba(255,255,255,0.07)",
        boxShadow: won
          ? "0 8px 48px rgba(167,139,250,0.18), 0 0 0 1px rgba(167,139,250,0.1)"
          : "0 8px 40px rgba(0,0,0,0.5)",
      }}
    >
      {/* Top accent bar */}
      {won && (
        <div
          style={{
            height: 3,
            background: "linear-gradient(90deg, #f472b6, #a78bfa, #60a5fa)",
          }}
        />
      )}

      <div className="flex flex-col items-center gap-5 px-8 py-8">
        {/* Emoji */}
        <div
          className="float w-16 h-16 rounded-2xl flex items-center justify-center text-3xl"
          style={{
            background: won
              ? "linear-gradient(135deg, rgba(244,114,182,0.2), rgba(167,139,250,0.25))"
              : "rgba(255,255,255,0.05)",
            border: won
              ? "1px solid rgba(167,139,250,0.3)"
              : "1px solid rgba(255,255,255,0.09)",
            boxShadow: won ? "0 4px 20px rgba(167,139,250,0.25)" : "none",
          }}
        >
          {won ? "🎉" : "😔"}
        </div>

        {/* Headline */}
        <div className="flex flex-col items-center gap-2 text-center">
          <h2
            className="font-display leading-tight"
            style={{
              fontSize: "clamp(1.6rem, 5vw, 2rem)",
              fontWeight: 800,
              ...(won
                ? {
                    background: "linear-gradient(135deg, #f472b6, #a78bfa)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                  }
                : { color: "var(--text-primary)" }),
            }}
          >
            {won
              ? mode === "hard"
                ? "Hard mode conquered! 🔥"
                : "You nailed it!"
              : "Better luck next time!"}
          </h2>

          <p style={{ fontSize: "13px", color: "var(--text-muted)", lineHeight: 1.6 }}>
            {won ? (
              <>
                Solved with{" "}
                <span style={{ color: "var(--text-secondary)", fontWeight: 700 }}>
                  {lives} {lives === 1 ? "life" : "lives"}
                </span>{" "}
                remaining
              </>
            ) : (
              "The categories are revealed above."
            )}
          </p>
        </div>

        {/* Divider */}
        <div className="divider" style={{ opacity: 0.6 }} />

        {/* CTA */}
        <button onClick={onAction} className="btn-primary">
          {won ? "Play Again" : "Try Again"}
          <ReplayIcon />
        </button>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MAIN COMPONENT
══════════════════════════════════════════════════════════════════ */
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
    setToast(null);
    setTimeout(() => setToast(msg), 10);
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
        showToast("Not quite. Keep going!");
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
  const selectionCount = selected.length;

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-2xl mx-auto px-3 sm:px-6 pt-4 pb-12">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* ── Header row: instruction + mode toggle ── */}
      <div className="flex flex-col items-center gap-3 w-full">
        <p
          style={{
            fontSize: "12px",
            fontWeight: 600,
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            color: "var(--text-muted)",
          }}
        >
          Find five groups of four
        </p>
        <ModeToggle mode={mode} onChange={handleModeChange} disabled={hasStarted} />
      </div>

      {/* ── Board ── */}
      <div className="w-full flex flex-col gap-2">
        {/* Revealed categories */}
        {guessedCategories.map((cat) => (
          <RevealedCategory key={cat.id} category={cat} />
        ))}

        {/* Tile grid */}
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

      {/* ── Action bar ── */}
      {gameState === "playing" && (
        <div className="flex flex-col items-center gap-4 w-full">
          <LivesDisplay lives={lives} maxLives={LIVES_BY_MODE[mode]} />

          {/* Selection counter */}
          <div
            style={{
              fontSize: "11px",
              fontWeight: 600,
              letterSpacing: "0.08em",
              color: selectionCount === MAX_SELECTED ? "var(--violet)" : "var(--text-muted)",
              transition: "color 0.2s ease",
              minHeight: "16px",
            }}
          >
            {selectionCount > 0
              ? `${selectionCount} of ${MAX_SELECTED} selected`
              : "\u00A0"}
          </div>

          {/* Buttons */}
          <div className="flex gap-2 flex-wrap justify-center">
            <button onClick={handleShuffle} className="btn-outline">
              <ShuffleIcon />
              Shuffle
            </button>
            <button
              onClick={handleDeselectAll}
              disabled={selectionCount === 0}
              className="btn-outline"
            >
              <XIcon />
              Deselect
            </button>
            <button
              onClick={handleSubmit}
              disabled={selectionCount !== MAX_SELECTED}
              className="btn-primary"
            >
              Submit
              <CheckIcon />
            </button>
          </div>
        </div>
      )}

      {/* ── End states ── */}
      {(gameState === "won" || gameState === "lost") && (
        <EndCard
          won={gameState === "won"}
          lives={lives}
          mode={mode}
          onAction={onNewGame}
        />
      )}
    </div>
  );
}
