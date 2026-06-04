import { useState, useEffect, useCallback } from "react";
import { clsx } from "clsx";
import Toast from "../Toast";

// ── Dice component ────────────────────────────────────────────────

function Dice({ value, isRolling }) {
  const faces = {
    1: "⚀",
    2: "⚁",
    3: "⚂",
    4: "⚃",
    5: "⚄",
    6: "⚅",
  };

  return (
    <div
      className={clsx(
        "flex items-center justify-center rounded-lg font-bold text-4xl transition-all",
        isRolling && "animate-bounce"
      )}
      style={{
        width: 80,
        height: 80,
        background: "linear-gradient(145deg, var(--accent), #5856d6)",
        boxShadow: "0 4px 14px rgba(0,122,255,0.25)",
        color: "#fff",
      }}
    >
      {faces[value] || "?"}
    </div>
  );
}

// ── Stats display ─────────────────────────────────────────────────

function StatsDisplay({ currentScore, targetScore, rolls, lives }) {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {[
        { label: "Score", value: currentScore, color: "#007aff" },
        { label: "Target", value: targetScore, color: "#34c759" },
        { label: "Rolls", value: rolls, color: "#ff9f0a" },
        { label: "Lives", value: lives, color: "#ff6b6b" },
      ].map(({ label, value, color }) => (
        <div
          key={label}
          className="flex flex-col items-center gap-1 px-4 py-2 rounded-2xl"
          style={{ background: "var(--fill-tertiary)" }}
        >
          <span
            style={{
              fontSize: "1.25rem",
              fontWeight: 700,
              color: color,
              letterSpacing: "-0.02em",
            }}
          >
            {value}
          </span>
          <span
            style={{
              fontSize: "0.65rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--label-tertiary)",
            }}
          >
            {label}
          </span>
        </div>
      ))}
    </div>
  );
}

// ── Win screen ────────────────────────────────────────────────────

function WinScreen({ rolls, lives, targetScore, onPlayAgain }) {
  const rating =
    rolls <= 5
      ? { emoji: "🏆", label: "Perfect!" }
      : rolls <= 10
      ? { emoji: "🌟", label: "Excellent!" }
      : rolls <= 15
      ? { emoji: "👍", label: "Good job!" }
      : { emoji: "🎉", label: "You did it!" };

  return (
    <div
      className="spring-pop flex flex-col items-center gap-6 p-8 rounded-3xl w-full max-w-sm mx-auto"
      style={{ background: "var(--bg-surface)", boxShadow: "var(--shadow-xl)" }}
    >
      {/* Icon */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 22,
          background: "linear-gradient(145deg, #34c759, #30d158)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          boxShadow: "0 8px 24px rgba(52,199,89,0.35)",
        }}
      >
        {rating.emoji}
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--label-primary)",
          }}
        >
          {rating.label}
        </h2>
        <p style={{ fontSize: "0.95rem", color: "var(--label-tertiary)" }}>
          You reached {targetScore} points!
        </p>
      </div>

      {/* Stats */}
      <div className="flex gap-6">
        {[
          { label: "Rolls", value: rolls },
          { label: "Lives Left", value: lives },
        ].map(({ label, value }) => (
          <div key={label} className="flex flex-col items-center gap-0.5">
            <span
              style={{
                fontSize: "1.5rem",
                fontWeight: 800,
                letterSpacing: "-0.03em",
                color: "var(--label-primary)",
              }}
            >
              {value}
            </span>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--label-tertiary)",
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      <button onClick={onPlayAgain} className="btn-primary w-full">
        Play Again
      </button>
    </div>
  );
}

// ── Loss screen ───────────────────────────────────────────────────

function LossScreen({ rolls, targetScore, onPlayAgain }) {
  return (
    <div
      className="spring-pop flex flex-col items-center gap-6 p-8 rounded-3xl w-full max-w-sm mx-auto"
      style={{ background: "var(--bg-surface)", boxShadow: "var(--shadow-xl)" }}
    >
      {/* Icon */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: 22,
          background: "linear-gradient(145deg, #ff6b6b, #ff5252)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 36,
          boxShadow: "0 8px 24px rgba(255,107,107,0.35)",
        }}
      >
        😢
      </div>

      <div className="flex flex-col items-center gap-1 text-center">
        <h2
          style={{
            fontSize: "1.75rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--label-primary)",
          }}
        >
          Out of Lives!
        </h2>
        <p style={{ fontSize: "0.95rem", color: "var(--label-tertiary)" }}>
          You needed {targetScore} points. Better luck next time!
        </p>
      </div>

      {/* Stats */}
      <div className="flex flex-col items-center gap-0.5">
        <span
          style={{
            fontSize: "1.5rem",
            fontWeight: 800,
            letterSpacing: "-0.03em",
            color: "var(--label-primary)",
          }}
        >
          {rolls}
        </span>
        <span
          style={{
            fontSize: "0.7rem",
            fontWeight: 600,
            letterSpacing: "0.05em",
            textTransform: "uppercase",
            color: "var(--label-tertiary)",
          }}
        >
          Rolls Attempted
        </span>
      </div>

      <button onClick={onPlayAgain} className="btn-primary w-full">
        Try Again
      </button>
    </div>
  );
}

// ── Main board ────────────────────────────────────────────────────

export default function DiceRollerBoard() {
  const TARGET_SCORE = 50;
  const INITIAL_LIVES = 5;

  const [currentScore, setCurrentScore] = useState(0);
  const [diceValue, setDiceValue] = useState(1);
  const [rolls, setRolls] = useState(0);
  const [lives, setLives] = useState(INITIAL_LIVES);
  const [gameState, setGameState] = useState("playing"); // 'playing' | 'won' | 'lost'
  const [isRolling, setIsRolling] = useState(false);
  const [toast, setToast] = useState(null);

  const showToast = useCallback((msg) => setToast(msg), []);

  const handleRoll = useCallback(() => {
    if (isRolling || gameState !== "playing") return;

    setIsRolling(true);

    // Simulate rolling animation
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      setDiceValue(Math.floor(Math.random() * 6) + 1);
      rollCount++;
      if (rollCount > 10) {
        clearInterval(rollInterval);
        const finalValue = Math.floor(Math.random() * 6) + 1;
        setDiceValue(finalValue);

        // Update score
        const newScore = currentScore + finalValue;
        setCurrentScore(newScore);
        setRolls((r) => r + 1);

        // Check win condition
        if (newScore >= TARGET_SCORE) {
          setGameState("won");
          showToast("🎉 You won!");
        } else if (newScore > TARGET_SCORE) {
          // Bust - lose a life
          const newLives = lives - 1;
          setLives(newLives);
          showToast("💥 Bust! Over the target!");
          if (newLives <= 0) {
            setGameState("lost");
          }
        }

        setIsRolling(false);
      }
    }, 100);
  }, [isRolling, gameState, currentScore, lives, TARGET_SCORE, showToast]);

  const handlePlayAgain = () => {
    setCurrentScore(0);
    setDiceValue(1);
    setRolls(0);
    setLives(INITIAL_LIVES);
    setGameState("playing");
    setIsRolling(false);
  };

  const handleStand = () => {
    if (currentScore >= TARGET_SCORE) {
      setGameState("won");
    }
  };

  // ── Won screen ───────────────────────────────────────────────────
  if (gameState === "won") {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4 sm:px-6 pt-6 pb-12">
        <WinScreen
          rolls={rolls}
          lives={lives}
          targetScore={TARGET_SCORE}
          onPlayAgain={handlePlayAgain}
        />
      </div>
    );
  }

  // ── Lost screen ───────────────────────────────────────────────────
  if (gameState === "lost") {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4 sm:px-6 pt-6 pb-12">
        <LossScreen
          rolls={rolls}
          targetScore={TARGET_SCORE}
          onPlayAgain={handlePlayAgain}
        />
      </div>
    );
  }

  // ── Playing screen ───────────────────────────────────────────────
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4 sm:px-6 pt-4 pb-12">
      {toast && <Toast message={toast} onDone={() => setToast(null)} />}

      {/* Title */}
      <div className="text-center">
        <h2
          style={{
            fontSize: "1.5rem",
            fontWeight: 700,
            letterSpacing: "-0.03em",
            color: "var(--label-primary)",
          }}
        >
          Reach {TARGET_SCORE} Points
        </h2>
        <p style={{ fontSize: "0.9rem", color: "var(--label-tertiary)" }}>
          Roll the dice and get as close as possible without going over!
        </p>
      </div>

      {/* Stats */}
      <StatsDisplay
        currentScore={currentScore}
        targetScore={TARGET_SCORE}
        rolls={rolls}
        lives={lives}
      />

      {/* Lives display */}
      <div className="flex gap-2 justify-center">
        {Array.from({ length: INITIAL_LIVES }).map((_, i) => (
          <span
            key={i}
            style={{
              fontSize: "1.5rem",
              opacity: i < lives ? 1 : 0.3,
              transition: "opacity 0.3s ease",
            }}
          >
            💜
          </span>
        ))}
      </div>

      {/* Dice display */}
      <div className="flex justify-center">
        <Dice value={diceValue} isRolling={isRolling} />
      </div>

      {/* Buttons */}
      <div className="flex gap-3 w-full max-w-xs">
        <button
          onClick={handleRoll}
          disabled={isRolling || gameState !== "playing"}
          className="btn-primary flex-1"
        >
          🎲 Roll
        </button>
        <button
          onClick={handleStand}
          disabled={currentScore < TARGET_SCORE || isRolling}
          className="btn-ghost flex-1"
        >
          ✋ Stand
        </button>
      </div>

      {/* Instructions */}
      <p
        className="text-center"
        style={{
          fontSize: "0.78rem",
          color: "var(--label-tertiary)",
          letterSpacing: "-0.01em",
          maxWidth: 300,
        }}
      >
        Roll the dice to add to your score. Reach exactly {TARGET_SCORE} or higher to win, but
        don't go over or you'll lose a life!
      </p>
    </div>
  );
}
