import { useState, useCallback } from 'react';

// ── Constants ────────────────────────────────────────────────────────────────

const STARTING_MONEY = 100;
const ROUNDS_PER_GAME = 10;

// ── Game state initializer ───────────────────────────────────────────────────

function initializeGame() {
  return {
    money: STARTING_MONEY,
    round: 1,
    currentBet: 0,
    diceResult: null,
    prediction: null, // 'high' | 'low' | null
    gameState: 'ready', // 'ready' | 'rolling' | 'result' | 'won' | 'lost'
    message: '',
    history: [],
  };
}

// ── Dice display component ───────────────────────────────────────────────────

function DiceDisplay({ value, isRolling }) {
  const dots = {
    1: [4],
    2: [0, 8],
    3: [0, 4, 8],
    4: [0, 2, 6, 8],
    5: [0, 2, 4, 6, 8],
    6: [0, 1, 2, 6, 7, 8],
  };

  const dotPositions = value ? dots[value] : [];

  return (
    <div
      style={{
        width: 120,
        height: 120,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(3, 1fr)',
        gap: 8,
        padding: 16,
        background: 'white',
        border: '3px solid var(--label-primary)',
        borderRadius: 12,
        boxShadow: isRolling ? '0 0 20px rgba(0,0,0,0.2)' : 'var(--shadow-md)',
        transform: isRolling ? 'rotate(10deg) scale(1.05)' : 'rotate(0deg) scale(1)',
        transition: 'transform 0.1s ease-out',
      }}
    >
      {[...Array(9)].map((_, idx) => (
        <div
          key={idx}
          style={{
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            background: dotPositions.includes(idx) ? '#333' : 'transparent',
            transition: 'all 0.1s ease-out',
          }}
        />
      ))}
    </div>
  );
}

// ── Bet input ────────────────────────────────────────────────────────────────

function BetInput({ money, onBetChange, currentBet, onRoll }) {
  const handleBetClick = (amount) => {
    const newBet = Math.min(amount, money);
    onBetChange(newBet);
  };

  return (
    <div className="flex flex-col gap-3 w-full">
      <p
        style={{
          fontSize: '0.9rem',
          fontWeight: 600,
          color: 'var(--label-secondary)',
        }}
      >
        Place your bet:
      </p>
      <div className="flex gap-2 flex-wrap justify-center">
        {[10, 20, 50].map((amount) => (
          <button
            key={amount}
            onClick={() => handleBetClick(amount)}
            disabled={amount > money}
            className="px-4 py-2 rounded-xl font-semibold transition-all"
            style={{
              background: currentBet === amount ? 'var(--accent)' : 'var(--fill-secondary)',
              color: currentBet === amount ? 'white' : 'var(--label-primary)',
              opacity: amount > money ? 0.5 : 1,
              cursor: amount > money ? 'not-allowed' : 'pointer',
              fontSize: '0.9rem',
            }}
          >
            ${amount}
          </button>
        ))}
      </div>
      <input
        type="number"
        min="1"
        max={money}
        value={currentBet}
        onChange={(e) => onBetChange(Math.min(parseInt(e.target.value, 10) || 0, money))}
        className="px-3 py-2 rounded-xl border-2 text-center"
        style={{
          borderColor: 'var(--separator)',
          background: 'var(--bg-surface)',
          color: 'var(--label-primary)',
        }}
        placeholder="Custom amount"
      />
      <button
        onClick={onRoll}
        disabled={currentBet === 0 || currentBet > money}
        className="px-6 py-3 rounded-xl font-bold text-white transition-all"
        style={{
          background: currentBet > 0 ? 'linear-gradient(135deg, #007aff, #0051d5)' : 'var(--fill-tertiary)',
          opacity: currentBet > 0 ? 1 : 0.5,
          cursor: currentBet > 0 ? 'pointer' : 'not-allowed',
          fontSize: '1rem',
        }}
      >
        Roll the Dice!
      </button>
    </div>
  );
}

// ── Main board ───────────────────────────────────────────────────────────────

export default function DiceRollerBoard() {
  const [gameKey, setGameKey] = useState(0);

  return (
    <Game
      key={gameKey}
      onNewGame={() => setGameKey((k) => k + 1)}
    />
  );
}

function Game({ onNewGame }) {
  const [state, setState] = useState(initializeGame());

  const handleBetChange = useCallback((amount) => {
    setState((prev) => ({
      ...prev,
      currentBet: amount,
    }));
  }, []);

  const handlePrediction = useCallback((prediction) => {
    setState((prev) => ({
      ...prev,
      prediction,
    }));
  }, []);

  const rollDice = useCallback(() => {
    if (state.currentBet === 0) return;

    setState((prev) => ({
      ...prev,
      gameState: 'rolling',
      diceResult: null,
    }));

    // Simulate rolling animation
    let rollCount = 0;
    const rollInterval = setInterval(() => {
      rollCount++;
      setState((prev) => ({
        ...prev,
        diceResult: Math.floor(Math.random() * 6) + 1,
      }));

      if (rollCount >= 10) {
        clearInterval(rollInterval);
        // Final result
        const finalResult = Math.floor(Math.random() * 6) + 1;
        setState((prev) => {
          const isHigh = finalResult > 3;
          const isPredictionCorrect =
            (prev.prediction === 'high' && isHigh) ||
            (prev.prediction === 'low' && !isHigh);

          const winnings = isPredictionCorrect
            ? prev.currentBet * 2
            : 0;
          const newMoney =
            prev.money - prev.currentBet + winnings;
          const newRound = prev.round + 1;
          const gameEnded = newMoney === 0 || newRound > ROUNDS_PER_GAME;

          const newState = {
            ...prev,
            diceResult: finalResult,
            gameState: 'result',
            money: newMoney,
            message: isPredictionCorrect
              ? `You won $${prev.currentBet}! 🎉`
              : `You lost $${prev.currentBet} 😢`,
            history: [
              ...prev.history,
              {
                round: prev.round,
                bet: prev.currentBet,
                result: finalResult,
                prediction: prev.prediction,
                won: isPredictionCorrect,
              },
            ],
          };

          if (gameEnded) {
            if (newMoney === 0) {
              newState.gameState = 'lost';
            } else if (newRound > ROUNDS_PER_GAME) {
              newState.gameState = 'won';
            }
          } else {
            newState.round = newRound;
          }

          return newState;
        });
      }
    }, 80);
  }, [state.currentBet, state.prediction]);

  const handleNextRound = useCallback(() => {
    setState((prev) => ({
      ...prev,
      gameState: 'ready',
      currentBet: 0,
      diceResult: null,
      prediction: null,
      message: '',
    }));
  }, []);

  const { money, round, currentBet, diceResult, prediction, gameState, message, history } = state;

  // ── Game over screens ────────────────────────────────────────────

  if (gameState === 'won') {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4 sm:px-6 pt-6 pb-12">
        <div
          className="spring-pop flex flex-col items-center gap-6 p-8 rounded-3xl w-full"
          style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-xl)' }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: 'linear-gradient(145deg, #34c759, #30d158)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              boxShadow: '0 8px 24px rgba(52,199,89,0.35)',
            }}
          >
            🏆
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--label-primary)',
              }}
            >
              You won the game!
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--label-tertiary)' }}>
              Final balance:
            </p>
            <p
              style={{
                fontSize: '1.5rem',
                fontWeight: 800,
                color: 'var(--accent)',
              }}
            >
              ${money}
            </p>
          </div>
          <button onClick={onNewGame} className="btn-primary">
            Play Again
          </button>
        </div>
      </div>
    );
  }

  if (gameState === 'lost') {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg mx-auto px-4 sm:px-6 pt-6 pb-12">
        <div
          className="spring-pop flex flex-col items-center gap-6 p-8 rounded-3xl w-full"
          style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-xl)' }}
        >
          <div
            style={{
              width: 72,
              height: 72,
              borderRadius: 20,
              background: 'linear-gradient(145deg, #ff3b30, #ff453a)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 32,
              boxShadow: '0 8px 24px rgba(255,59,48,0.35)',
            }}
          >
            💸
          </div>
          <div className="flex flex-col items-center gap-1.5">
            <h2
              style={{
                fontSize: '1.75rem',
                fontWeight: 700,
                letterSpacing: '-0.03em',
                color: 'var(--label-primary)',
              }}
            >
              You're out of money!
            </h2>
            <p style={{ fontSize: '0.9rem', color: 'var(--label-tertiary)' }}>
              Better luck next time!
            </p>
          </div>
          <button onClick={onNewGame} className="btn-primary">
            Play Again
          </button>
        </div>
      </div>
    );
  }

  // ── Main playing screen ──────────────────────────────────────────

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-lg mx-auto px-4 sm:px-6 pt-6 pb-12">
      {/* Title */}
      <div className="w-full flex flex-col items-center gap-2">
        <h2
          style={{
            fontSize: '1.75rem',
            fontWeight: 700,
            letterSpacing: '-0.03em',
            color: 'var(--label-primary)',
          }}
        >
          Dice Roller
        </h2>
        <p style={{ fontSize: '0.85rem', color: 'var(--label-tertiary)' }}>
          Predict high or low and roll the dice!
        </p>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 justify-center flex-wrap">
        {[
          { label: 'Round', value: `${round}/${ROUNDS_PER_GAME}` },
          { label: 'Money', value: `$${money}` },
        ].map(({ label, value }) => (
          <div
            key={label}
            className="flex flex-col items-center gap-0.5 px-4 py-2 rounded-2xl"
            style={{ background: 'var(--fill-tertiary)', minWidth: 90 }}
          >
            <span
              style={{
                fontSize: '1.1rem',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: 'var(--label-primary)',
              }}
            >
              {value}
            </span>
            <span
              style={{
                fontSize: '0.62rem',
                fontWeight: 600,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
                color: 'var(--label-tertiary)',
              }}
            >
              {label}
            </span>
          </div>
        ))}
      </div>

      {/* Game area */}
      <div
        className="w-full flex flex-col items-center gap-6 rounded-3xl p-6"
        style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-md)' }}
      >
        {/* Dice display */}
        <DiceDisplay value={diceResult} isRolling={gameState === 'rolling'} />

        {/* Result message */}
        {gameState === 'result' && (
          <div
            className="text-center font-bold text-lg px-4 py-2 rounded-xl"
            style={{
              color: message.includes('won') ? '#34c759' : '#ff3b30',
              background:
                message.includes('won') ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)',
            }}
          >
            {message}
          </div>
        )}

        {/* Prediction buttons */}
        {gameState === 'ready' && (
          <div className="flex gap-3 w-full justify-center">
            {['low', 'high'].map((pred) => (
              <button
                key={pred}
                onClick={() => handlePrediction(pred)}
                className="flex-1 px-4 py-3 rounded-xl font-bold text-white transition-all"
                style={{
                  background:
                    prediction === pred
                      ? 'linear-gradient(135deg, #007aff, #0051d5)'
                      : 'var(--fill-secondary)',
                  color: prediction === pred ? 'white' : 'var(--label-primary)',
                }}
              >
                {pred === 'low' ? '📉 Low (1-3)' : '📈 High (4-6)'}
              </button>
            ))}
          </div>
        )}

        {/* Bet input */}
        {gameState === 'ready' && (
          <BetInput
            money={money}
            onBetChange={handleBetChange}
            currentBet={currentBet}
            onRoll={rollDice}
          />
        )}

        {/* Next round button */}
        {gameState === 'result' && (
          <button onClick={handleNextRound} className="btn-primary">
            Next Round
          </button>
        )}
      </div>

      {/* History */}
      {history.length > 0 && (
        <div
          className="w-full rounded-2xl p-4"
          style={{ background: 'var(--bg-surface)' }}
        >
          <p
            style={{
              fontSize: '0.85rem',
              fontWeight: 600,
              color: 'var(--label-secondary)',
              marginBottom: '0.75rem',
            }}
          >
            Recent Rolls
          </p>
          <div className="flex flex-col gap-2">
            {history.slice(-5).map((entry, idx) => (
              <div
                key={idx}
                className="flex justify-between text-sm px-3 py-2 rounded-lg"
                style={{
                  background: entry.won ? 'rgba(52,199,89,0.1)' : 'rgba(255,59,48,0.1)',
                }}
              >
                <span style={{ color: 'var(--label-secondary)' }}>
                  {entry.prediction === 'high' ? '📈' : '📉'} Roll {entry.result}
                </span>
                <span
                  style={{
                    fontWeight: 600,
                    color: entry.won ? '#34c759' : '#ff3b30',
                  }}
                >
                  {entry.won ? '+' : '-'}${entry.bet}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
