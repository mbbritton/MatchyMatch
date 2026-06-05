import { useState, useEffect, useRef, useCallback } from 'react'

// ── Questions ─────────────────────────────────────────────────────────────────

const ALL_QUESTIONS = [
  // Animals
  { statement: 'A group of flamingos is called a flamboyance.', answer: true, category: '🦩 Animals' },
  { statement: 'Elephants are the only animals that cannot jump.', answer: false, category: '🦩 Animals', explanation: 'Hippos and rhinos also cannot jump!' },
  { statement: 'Octopuses have three hearts.', answer: true, category: '🦩 Animals' },
  { statement: 'A snail can sleep for up to 3 years.', answer: true, category: '🦩 Animals' },
  { statement: 'Sharks are the only fish that can blink with both eyes.', answer: false, category: '🦩 Animals', explanation: 'Sharks cannot blink at all — they have no eyelids.' },
  { statement: 'Cows have best friends and get stressed when separated.', answer: true, category: '🦩 Animals' },
  { statement: 'A group of crows is called a murder.', answer: true, category: '🦩 Animals' },
  { statement: 'Penguins can fly short distances.', answer: false, category: '🦩 Animals', explanation: 'Penguins are flightless birds — their wings evolved into flippers.' },
  { statement: 'Butterflies taste with their feet.', answer: true, category: '🦩 Animals' },
  { statement: 'A goldfish has a memory of only 3 seconds.', answer: false, category: '🦩 Animals', explanation: 'Goldfish can actually remember things for months!' },
  { statement: 'Wombats produce cube-shaped poop.', answer: true, category: '🦩 Animals' },
  { statement: 'Dolphins sleep with one eye open.', answer: true, category: '🦩 Animals' },

  // Science
  { statement: 'Lightning never strikes the same place twice.', answer: false, category: '🔬 Science', explanation: 'Lightning frequently strikes the same place multiple times.' },
  { statement: 'Hot water can freeze faster than cold water.', answer: true, category: '🔬 Science', explanation: "This is known as the Mpemba effect." },
  { statement: 'Humans share about 60% of their DNA with bananas.', answer: true, category: '🔬 Science' },
  { statement: 'Sound travels faster in water than in air.', answer: true, category: '🔬 Science' },
  { statement: 'The Great Wall of China is visible from space with the naked eye.', answer: false, category: '🔬 Science', explanation: 'Astronauts have confirmed it cannot be seen from space without aid.' },
  { statement: 'Diamonds are made of carbon.', answer: true, category: '🔬 Science' },
  { statement: 'The human body has more bacterial cells than human cells.', answer: true, category: '🔬 Science' },
  { statement: 'Glass is a slow-moving liquid.', answer: false, category: '🔬 Science', explanation: 'Glass is an amorphous solid, not a liquid.' },

  // Geography
  { statement: 'Australia is wider than the Moon.', answer: true, category: '🌍 Geography', explanation: "Australia is ~4,000 km wide; the Moon's diameter is ~3,474 km." },
  { statement: 'Russia has a border with the United States.', answer: true, category: '🌍 Geography', explanation: 'Russia and the US are separated by only ~4 km at the Diomede Islands.' },
  { statement: 'The Amazon River flows into the Pacific Ocean.', answer: false, category: '🌍 Geography', explanation: 'The Amazon flows into the Atlantic Ocean.' },
  { statement: 'Canada has more lakes than the rest of the world combined.', answer: true, category: '🌍 Geography' },
  { statement: 'The Sahara is the largest desert in the world.', answer: false, category: '🌍 Geography', explanation: 'Antarctica is the largest desert — the Sahara is the largest hot desert.' },
  { statement: 'Vatican City is the smallest country in the world.', answer: true, category: '🌍 Geography' },

  // History & Culture
  { statement: 'Cleopatra lived closer in time to the Moon landing than to the building of the Great Pyramid.', answer: true, category: '📜 History', explanation: 'The pyramids were built ~2560 BC; Cleopatra lived ~30 BC; Moon landing 1969 AD.' },
  { statement: 'The Eiffel Tower was originally intended to be a permanent structure.', answer: false, category: '📜 History', explanation: 'It was built as a temporary exhibit for the 1889 World Fair.' },
  { statement: 'Oxford University is older than the Aztec Empire.', answer: true, category: '📜 History', explanation: 'Oxford was founded ~1096 AD; the Aztec Empire ~1428 AD.' },
  { statement: 'Napoleon Bonaparte was unusually short for his time.', answer: false, category: '📜 History', explanation: "Napoleon was about 5'7\" — average height for a Frenchman of his era." },

  // Food & Drink
  { statement: 'Honey never expires.', answer: true, category: '🍯 Food', explanation: 'Archaeologists have found 3,000-year-old honey in Egyptian tombs, still edible.' },
  { statement: 'Peanuts are technically nuts.', answer: false, category: '🍯 Food', explanation: 'Peanuts are legumes — they grow underground like beans.' },
  { statement: 'Strawberries are not technically berries.', answer: true, category: '🍯 Food', explanation: 'Botanically, strawberries are "accessory fruits". Bananas, however, are berries!' },
  { statement: 'Carrots were originally purple.', answer: true, category: '🍯 Food', explanation: 'Orange carrots were cultivated in the Netherlands in the 17th century.' },
  { statement: 'Chocolate was once used as currency.', answer: true, category: '🍯 Food', explanation: 'The Aztecs used cacao beans as currency.' },

  // Space
  { statement: 'A day on Venus is longer than a year on Venus.', answer: true, category: '🚀 Space', explanation: 'Venus rotates so slowly that its day (243 Earth days) exceeds its year (225 Earth days).' },
  { statement: 'The Sun is a yellow star.', answer: false, category: '🚀 Space', explanation: 'The Sun is actually a white star — it appears yellow due to Earth\'s atmosphere.' },
  { statement: 'There are more stars in the universe than grains of sand on Earth.', answer: true, category: '🚀 Space' },
  { statement: 'Pluto is smaller than Russia.', answer: true, category: '🚀 Space', explanation: "Pluto's surface area is ~17.7M km²; Russia's is ~17.1M km²." },

  // Human Body
  { statement: 'Humans are the only animals that blush.', answer: true, category: '🧬 Body', explanation: 'Charles Darwin called blushing "the most peculiar and most human of all expressions."' },
  { statement: 'Your nose and ears never stop growing.', answer: true, category: '🧬 Body' },
  { statement: 'The human eye can distinguish about 10 million colours.', answer: true, category: '🧬 Body' },
  { statement: 'You use 43 muscles to frown and only 17 to smile.', answer: false, category: '🧬 Body', explanation: 'The exact numbers are debated, but smiling actually uses more muscles than frowning.' },
]

const ROUND_COUNT = 10
const QUESTION_TIME = 12 // seconds per question

// ── Helpers ───────────────────────────────────────────────────────────────────

function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

function pickQuestions() {
  return shuffle(ALL_QUESTIONS).slice(0, ROUND_COUNT)
}

function getRating(score) {
  const pct = score / ROUND_COUNT
  if (pct === 1)   return { emoji: '🎭', label: 'Toby or Not Toby? TOBY!', color: '#ffd700' }
  if (pct >= 0.8)  return { emoji: '🌟', label: 'Practically a Toby!', color: '#34c759' }
  if (pct >= 0.6)  return { emoji: '🎯', label: 'Not bad, not Toby…', color: '#0a84ff' }
  if (pct >= 0.4)  return { emoji: '🤔', label: 'To be… uncertain.', color: '#ff9f0a' }
  return               { emoji: '💀', label: 'Not to be correct!', color: '#ff3b30' }
}

// ── Sub-components ────────────────────────────────────────────────────────────

function TimerBar({ timeLeft, total }) {
  const pct = (timeLeft / total) * 100
  const color = timeLeft <= 3 ? '#ff3b30' : timeLeft <= 6 ? '#ff9f0a' : '#34c759'
  return (
    <div
      style={{
        width: '100%',
        height: 6,
        borderRadius: 999,
        background: 'var(--fill-tertiary)',
        overflow: 'hidden',
      }}
    >
      <div
        style={{
          height: '100%',
          width: `${pct}%`,
          borderRadius: 999,
          background: color,
          transition: 'width 1s linear, background 0.3s',
        }}
      />
    </div>
  )
}

function AnswerButton({ label, emoji, colorTrue, colorFalse, isTrue, onClick, disabled, chosen, correct }) {
  const baseColor = isTrue ? '#34c759' : '#ff3b30'
  const isChosen = chosen === isTrue
  const isCorrect = correct === isTrue

  let bg = 'var(--bg-surface)'
  let border = `2px solid ${baseColor}44`
  let scale = 'scale(1)'

  if (chosen !== null) {
    if (isChosen && isCorrect) {
      bg = `${baseColor}22`
      border = `2px solid ${baseColor}`
      scale = 'scale(1.03)'
    } else if (isChosen && !isCorrect) {
      bg = '#ff3b3022'
      border = '2px solid #ff3b30'
    } else if (!isChosen && isCorrect) {
      bg = `${baseColor}11`
      border = `2px solid ${baseColor}88`
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        flex: 1,
        padding: '1.1rem 0.5rem',
        borderRadius: 20,
        border,
        background: bg,
        cursor: disabled ? 'default' : 'pointer',
        transform: scale,
        transition: 'all 0.2s cubic-bezier(0.34,1.56,0.64,1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 6,
        boxShadow: isChosen && isCorrect ? `0 4px 20px ${baseColor}44` : 'var(--shadow-sm)',
      }}
    >
      <span style={{ fontSize: '2.2rem', lineHeight: 1 }}>{emoji}</span>
      <span
        style={{
          fontSize: '1rem',
          fontWeight: 800,
          letterSpacing: '-0.01em',
          color: chosen !== null ? (isCorrect ? baseColor : isChosen ? '#ff3b30' : 'var(--label-tertiary)') : 'var(--label-primary)',
        }}
      >
        {label}
      </span>
    </button>
  )
}

// ── Main Board ────────────────────────────────────────────────────────────────

export default function TobyOrNotTobyBoard() {
  const [phase, setPhase] = useState('menu') // menu | playing | gameover
  const [questions, setQuestions] = useState([])
  const [qIndex, setQIndex] = useState(0)
  const [chosen, setChosen] = useState(null)   // true | false | null
  const [score, setScore] = useState(0)
  const [results, setResults] = useState([])   // { correct: bool, points: number }[]
  const [timeLeft, setTimeLeft] = useState(QUESTION_TIME)
  const [streak, setStreak] = useState(0)
  const [bestStreak, setBestStreak] = useState(0)
  const [scorePopup, setScorePopup] = useState(null)
  const popupRef = useRef(0)
  const timerRef = useRef(null)

  const currentQ = questions[qIndex]

  // ── Timer ─────────────────────────────────────────────────────
  useEffect(() => {
    if (phase !== 'playing' || chosen !== null) return
    if (timeLeft <= 0) {
      handleAnswer(null) // time's up = wrong
      return
    }
    timerRef.current = setTimeout(() => setTimeLeft((t) => t - 1), 1000)
    return () => clearTimeout(timerRef.current)
  }, [phase, timeLeft, chosen])

  // ── Advance to next question after a short delay ──────────────
  useEffect(() => {
    if (chosen === null) return
    const id = setTimeout(() => {
      const nextIndex = qIndex + 1
      if (nextIndex >= ROUND_COUNT) {
        setPhase('gameover')
      } else {
        setQIndex(nextIndex)
        setChosen(null)
        setTimeLeft(QUESTION_TIME)
      }
    }, 1600)
    return () => clearTimeout(id)
  }, [chosen, qIndex])

  const handleAnswer = useCallback(
    (pick) => {
      if (chosen !== null || !currentQ) return
      clearTimeout(timerRef.current)

      const isCorrect = pick === currentQ.answer
      const timeBonus = Math.max(0, Math.floor(timeLeft / 2)) // up to +6 bonus pts
      const pts = isCorrect ? 10 + timeBonus : 0

      const newStreak = isCorrect ? streak + 1 : 0
      setStreak(newStreak)
      setBestStreak((b) => Math.max(b, newStreak))
      setChosen(pick)
      setScore((s) => s + pts)
      setResults((r) => [...r, { correct: isCorrect, points: pts }])

      if (isCorrect) {
        const pid = ++popupRef.current
        setScorePopup({ id: pid, pts })
        setTimeout(() => setScorePopup(null), 900)
      }
    },
    [chosen, currentQ, streak, timeLeft]
  )

  // ── Keyboard support ──────────────────────────────────────────
  useEffect(() => {
    const onKey = (e) => {
      if (phase !== 'playing') return
      if (e.key === 'ArrowLeft' || e.key.toLowerCase() === 't') handleAnswer(true)
      if (e.key === 'ArrowRight' || e.key.toLowerCase() === 'f') handleAnswer(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [phase, handleAnswer])

  const startGame = () => {
    setQuestions(pickQuestions())
    setQIndex(0)
    setChosen(null)
    setScore(0)
    setResults([])
    setTimeLeft(QUESTION_TIME)
    setStreak(0)
    setBestStreak(0)
    setScorePopup(null)
    setPhase('playing')
  }

  // ── Menu ──────────────────────────────────────────────────────
  if (phase === 'menu') {
    return (
      <div
        className="spring-pop flex flex-col items-center gap-6 p-8 rounded-3xl w-full max-w-sm mx-auto"
        style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-xl)' }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 22,
            background: 'linear-gradient(145deg, #bf5af2, #5e5ce6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 38,
            boxShadow: '0 8px 24px rgba(191,90,242,0.35)',
          }}
        >
          🎭
        </div>

        <div className="flex flex-col items-center gap-2 text-center">
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: 'var(--label-primary)',
            }}
          >
            Toby or Not Toby?
          </h2>
          <p style={{ fontSize: '0.95rem', color: 'var(--label-secondary)', lineHeight: 1.5 }}>
            That is the question! Decide if each wild fact is{' '}
            <span style={{ color: '#34c759', fontWeight: 700 }}>TRUE</span> or{' '}
            <span style={{ color: '#ff3b30', fontWeight: 700 }}>FALSE</span> before time runs out.
          </p>
        </div>

        <div
          className="w-full rounded-2xl p-4 flex flex-col gap-2"
          style={{ background: 'var(--fill-tertiary)' }}
        >
          {[
            { label: 'Questions', value: `${ROUND_COUNT} per round` },
            { label: 'Time per question', value: `${QUESTION_TIME}s` },
            { label: 'Scoring', value: '10 pts + time bonus' },
            { label: 'Controls', value: 'T = True · F = False' },
          ].map(({ label, value }) => (
            <div key={label} style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.85rem', color: 'var(--label-tertiary)' }}>{label}</span>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--label-primary)' }}>
                {value}
              </span>
            </div>
          ))}
        </div>

        <button onClick={startGame} className="btn-primary w-full">
          🎭 To Play, or Not to Play?
        </button>
      </div>
    )
  }

  // ── Game Over ─────────────────────────────────────────────────
  if (phase === 'gameover') {
    const rating = getRating(results.filter((r) => r.correct).length)
    const correctCount = results.filter((r) => r.correct).length
    const totalPts = results.reduce((sum, r) => sum + r.points, 0)

    return (
      <div
        className="spring-pop flex flex-col items-center gap-6 p-8 rounded-3xl w-full max-w-sm mx-auto"
        style={{ background: 'var(--bg-surface)', boxShadow: 'var(--shadow-xl)' }}
      >
        <div
          style={{
            width: 80,
            height: 80,
            borderRadius: 22,
            background: `linear-gradient(145deg, ${rating.color}, ${rating.color}cc)`,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 36,
            boxShadow: `0 8px 24px ${rating.color}44`,
          }}
        >
          {rating.emoji}
        </div>

        <div className="flex flex-col items-center gap-1 text-center">
          <h2
            style={{
              fontSize: '1.75rem',
              fontWeight: 700,
              letterSpacing: '-0.03em',
              color: 'var(--label-primary)',
            }}
          >
            {rating.label}
          </h2>
          <p style={{ fontSize: '0.9rem', color: 'var(--label-tertiary)' }}>
            {correctCount} / {ROUND_COUNT} correct
          </p>
        </div>

        {/* Stats */}
        <div
          className="grid grid-cols-3 gap-3 w-full"
          style={{ borderTop: '1px solid var(--fill-tertiary)', paddingTop: '1.25rem' }}
        >
          {[
            { label: 'Score', value: totalPts, color: '#bf5af2' },
            { label: 'Correct', value: correctCount, color: '#34c759' },
            { label: 'Best Streak', value: `${bestStreak}🔥`, color: '#ff9f0a' },
          ].map(({ label, value, color }) => (
            <div key={label} className="flex flex-col items-center gap-0.5">
              <span style={{ fontSize: '1.25rem', fontWeight: 700, color }}>{value}</span>
              <span
                style={{
                  fontSize: '0.65rem',
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

        {/* Per-question breakdown */}
        <div
          className="w-full rounded-2xl p-4 flex flex-col gap-1.5"
          style={{ background: 'var(--fill-tertiary)', maxHeight: 200, overflowY: 'auto' }}
        >
          {results.map((r, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--label-tertiary)' }}>
                Q{i + 1}
              </span>
              <span
                style={{
                  fontSize: '0.82rem',
                  fontWeight: 700,
                  color: r.correct ? '#34c759' : '#ff3b30',
                }}
              >
                {r.correct ? `✅ +${r.points}` : '❌ Miss'}
              </span>
            </div>
          ))}
        </div>

        <button onClick={startGame} className="btn-primary w-full">
          🎭 Play Again
        </button>
      </div>
    )
  }

  // ── Playing ───────────────────────────────────────────────────
  if (!currentQ) return null

  const isAnswered = chosen !== null
  const isCorrect = chosen === currentQ.answer

  return (
    <div
      className="flex flex-col items-center gap-5 w-full max-w-md mx-auto px-4 sm:px-6 pt-4 pb-12"
      style={{ userSelect: 'none' }}
    >
      <style>{KEYFRAMES}</style>

      {/* Score popup */}
      {scorePopup && (
        <div
          key={scorePopup.id}
          style={{
            position: 'fixed',
            pointerEvents: 'none',
            top: '38%',
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: '2rem',
            fontWeight: 800,
            color: '#34c759',
            animation: 'toby-float 0.9s ease-out forwards',
            zIndex: 999,
            textShadow: '0 2px 8px rgba(0,0,0,0.15)',
          }}
        >
          +{scorePopup.pts}
        </div>
      )}

      {/* Header row */}
      <div className="w-full flex items-center justify-between">
        <div className="flex flex-col items-start gap-0.5">
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--label-tertiary)',
            }}
          >
            Question
          </span>
          <span
            style={{
              fontSize: '1rem',
              fontWeight: 700,
              color: 'var(--label-primary)',
            }}
          >
            {qIndex + 1} / {ROUND_COUNT}
          </span>
        </div>

        {/* Score */}
        <div className="flex flex-col items-center gap-0.5">
          <span style={{ fontSize: '1.1rem', fontWeight: 800, color: '#bf5af2' }}>{score}</span>
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--label-tertiary)',
            }}
          >
            Score
          </span>
        </div>

        {/* Streak */}
        <div className="flex flex-col items-end gap-0.5">
          <span style={{ fontSize: '1rem', fontWeight: 700, color: '#ff9f0a' }}>
            {streak > 0 ? `${streak}🔥` : '—'}
          </span>
          <span
            style={{
              fontSize: '0.65rem',
              fontWeight: 600,
              letterSpacing: '0.06em',
              textTransform: 'uppercase',
              color: 'var(--label-tertiary)',
            }}
          >
            Streak
          </span>
        </div>
      </div>

      {/* Timer bar */}
      <TimerBar timeLeft={timeLeft} total={QUESTION_TIME} />

      {/* Category badge */}
      <div
        style={{
          padding: '4px 14px',
          borderRadius: 999,
          background: 'var(--fill-tertiary)',
          fontSize: '0.75rem',
          fontWeight: 600,
          color: 'var(--label-secondary)',
          letterSpacing: '0.02em',
        }}
      >
        {currentQ.category}
      </div>

      {/* Statement card */}
      <div
        key={qIndex}
        className="w-full rounded-3xl p-6 flex flex-col items-center gap-3"
        style={{
          background: 'var(--bg-surface)',
          boxShadow: 'var(--shadow-md)',
          minHeight: 140,
          animation: 'toby-slide 0.35s cubic-bezier(0.34,1.56,0.64,1)',
        }}
      >
        <span style={{ fontSize: '2.5rem', lineHeight: 1 }}>🎭</span>
        <p
          style={{
            fontSize: 'clamp(0.95rem, 3vw, 1.1rem)',
            fontWeight: 600,
            color: 'var(--label-primary)',
            textAlign: 'center',
            lineHeight: 1.5,
            letterSpacing: '-0.01em',
          }}
        >
          {currentQ.statement}
        </p>
      </div>

      {/* Feedback / explanation */}
      <div style={{ minHeight: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {isAnswered && (
          <div
            style={{
              textAlign: 'center',
              animation: 'toby-badge 0.35s ease-out',
            }}
          >
            <p
              style={{
                fontSize: '1rem',
                fontWeight: 700,
                color: isCorrect ? '#34c759' : '#ff3b30',
              }}
            >
              {isCorrect ? '✅ Correct!' : `❌ Wrong — it's ${currentQ.answer ? 'TRUE' : 'FALSE'}`}
            </p>
            {currentQ.explanation && (
              <p
                style={{
                  fontSize: '0.8rem',
                  color: 'var(--label-tertiary)',
                  marginTop: 4,
                  maxWidth: 320,
                }}
              >
                {currentQ.explanation}
              </p>
            )}
          </div>
        )}
        {!isAnswered && (
          <p style={{ fontSize: '0.78rem', color: 'var(--label-tertiary)' }}>
            ← T = True &nbsp;·&nbsp; F = False = →
          </p>
        )}
      </div>

      {/* Answer buttons */}
      <div className="flex gap-4 w-full">
        <AnswerButton
          label="TRUE"
          emoji="✅"
          isTrue={true}
          onClick={() => handleAnswer(true)}
          disabled={isAnswered}
          chosen={chosen}
          correct={currentQ.answer}
        />
        <AnswerButton
          label="FALSE"
          emoji="❌"
          isTrue={false}
          onClick={() => handleAnswer(false)}
          disabled={isAnswered}
          chosen={chosen}
          correct={currentQ.answer}
        />
      </div>

      {/* Progress dots */}
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', justifyContent: 'center' }}>
        {Array.from({ length: ROUND_COUNT }).map((_, i) => {
          const res = results[i]
          const isActive = i === qIndex
          const color =
            res === undefined
              ? isActive
                ? '#bf5af2'
                : 'var(--fill-tertiary)'
              : res.correct
                ? '#34c759'
                : '#ff3b30'
          return (
            <div
              key={i}
              style={{
                width: isActive ? 14 : 10,
                height: isActive ? 14 : 10,
                borderRadius: '50%',
                background: color,
                transition: 'all 0.2s ease',
                boxShadow: isActive ? `0 0 8px ${color}88` : 'none',
              }}
            />
          )
        })}
      </div>
    </div>
  )
}

// ── Keyframes ─────────────────────────────────────────────────────────────────

const KEYFRAMES = `
@keyframes toby-slide {
  0%   { opacity: 0; transform: translateY(18px) scale(0.97); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}
@keyframes toby-badge {
  0%   { opacity: 0; transform: scale(0.85); }
  60%  { transform: scale(1.06); }
  100% { opacity: 1; transform: scale(1); }
}
@keyframes toby-float {
  0%   { opacity: 1; transform: translateX(-50%) translateY(0); }
  100% { opacity: 0; transform: translateX(-50%) translateY(-60px); }
}
`
