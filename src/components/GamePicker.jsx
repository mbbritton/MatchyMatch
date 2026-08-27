import { useEffect, useMemo, useRef, useState } from 'react'
import { Settings, Check } from 'lucide-react'
import { GAMES } from '../data/games'
import { PALETTES, PALETTE_ORDER, DEFAULT_PALETTE } from '../data/arcadePalettes'
import Confetti from './Confetti'

const ARCADE_LETTERS = 'Arcade'.split('')

// Slight per-card resting tilt, cycled across the grid — straightens on
// hover. Adapted from the Arcade design spec's ROTS values.
const ROTS = ['-1.1deg', '0.8deg', '-0.5deg', '1.2deg', '-0.9deg', '0.4deg', '1deg', '-1.4deg']

function initialsFor(name) {
  return name
    .split(/[\s-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('')
}

// Stagger for card entrance/sway/initials-bob, capped so a big grid doesn't
// end up with a multi-second wait for the last row.
function staggerDelay(index) {
  return `${Math.min(index, 11) * 45}ms`
}

const CATEGORIES = ['All', ...Array.from(new Set(GAMES.map((g) => g.tag))).sort()]

const FAVORITES_KEY = 'matchy.favorites'
const RECENTS_KEY = 'matchy.recents'
const PALETTE_KEY = 'matchy.palette'
const MAX_RECENTS = 5

export default function GamePicker({ onGameSelect }) {
  const [query, setQuery] = useState('')
  const [tag, setTag] = useState('All')
  const [sort, setSort] = useState('default')
  const [favOnly, setFavOnly] = useState(false)
  const [openId, setOpenId] = useState(null)
  const [favorites, setFavorites] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(FAVORITES_KEY) || '[]')
      return Array.isArray(stored) ? stored : []
    } catch {
      return []
    }
  })
  const [recents, setRecents] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(RECENTS_KEY) || '[]')
      return Array.isArray(stored) ? stored : []
    } catch {
      return []
    }
  })
  const [palette, setPaletteState] = useState(() => {
    try {
      const stored = JSON.parse(localStorage.getItem(PALETTE_KEY) || `"${DEFAULT_PALETTE}"`)
      return PALETTES[stored] ? stored : DEFAULT_PALETTE
    } catch {
      return DEFAULT_PALETTE
    }
  })
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [chipBounce, setChipBounce] = useState(null)
  const [bounceId, setBounceId] = useState(null)
  const [secretTaps, setSecretTaps] = useState(0)
  const [secretOn, setSecretOn] = useState(false)
  const [confetti, setConfetti] = useState(null)

  const settingsRef = useRef(null)
  const chipTimeoutRef = useRef(null)
  const bounceTimeoutRef = useRef(null)
  const secretTimeoutRef = useRef(null)
  const confettiTimeoutRef = useRef(null)
  const confettiKeyRef = useRef(0)

  const theme = PALETTES[palette] ?? PALETTES[DEFAULT_PALETTE]

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites))
  }, [favorites])

  useEffect(() => {
    localStorage.setItem(RECENTS_KEY, JSON.stringify(recents))
  }, [recents])

  useEffect(() => {
    if (!openId) return
    const onKey = (e) => {
      if (e.key === 'Escape') setOpenId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openId])

  useEffect(() => {
    if (!settingsOpen) return undefined
    const onPointerDown = (e) => {
      if (settingsRef.current && !settingsRef.current.contains(e.target)) setSettingsOpen(false)
    }
    const onKey = (e) => {
      if (e.key === 'Escape') setSettingsOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [settingsOpen])

  useEffect(() => {
    return () => {
      clearTimeout(chipTimeoutRef.current)
      clearTimeout(bounceTimeoutRef.current)
      clearTimeout(secretTimeoutRef.current)
      clearTimeout(confettiTimeoutRef.current)
    }
  }, [])

  const burstConfetti = (count) => {
    confettiKeyRef.current += 1
    setConfetti({ key: confettiKeyRef.current, count })
    clearTimeout(confettiTimeoutRef.current)
    confettiTimeoutRef.current = setTimeout(() => setConfetti(null), 2600)
  }

  const setPalette = (key) => {
    setPaletteState(key)
    try {
      localStorage.setItem(PALETTE_KEY, JSON.stringify(key))
    } catch {
      // ignore write failures (private browsing, storage full, etc.)
    }
  }

  const GAME_BY_ID = useMemo(
    () =>
      Object.fromEntries(
        GAMES.map((g, i) => [
          g.id,
          { ...g, tile: theme.tiles[i % theme.tiles.length], rot: ROTS[i % ROTS.length] },
        ])
      ),
    [theme]
  )

  const toggleFavorite = (id) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]
    )
    setBounceId(id)
    clearTimeout(bounceTimeoutRef.current)
    bounceTimeoutRef.current = setTimeout(() => setBounceId(null), 450)
  }

  const recordRecent = (id) => {
    setRecents((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, MAX_RECENTS))
  }

  const playGame = (id) => {
    recordRecent(id)
    setOpenId(null)
    onGameSelect(id)
  }

  const handleTagClick = (c) => {
    setTag(c)
    setChipBounce(c)
    clearTimeout(chipTimeoutRef.current)
    chipTimeoutRef.current = setTimeout(() => setChipBounce(null), 330)
  }

  const handleToggleFavOnly = () => {
    if (!favOnly) burstConfetti(18)
    setFavOnly((v) => !v)
  }

  const handleSecretTap = () => {
    const taps = secretTaps + 1
    if (taps >= 5) {
      burstConfetti(140)
      setSecretTaps(0)
      setSecretOn(true)
      clearTimeout(secretTimeoutRef.current)
      secretTimeoutRef.current = setTimeout(() => setSecretOn(false), 3200)
    } else {
      setSecretTaps(taps)
    }
  }

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    let list = GAMES.filter((g) => {
      if (tag !== 'All' && g.tag !== tag) return false
      if (favOnly && !favorites.includes(g.id)) return false
      if (
        q &&
        !g.name.toLowerCase().includes(q) &&
        !g.description.toLowerCase().includes(q) &&
        !(g.builder && g.builder.toLowerCase().includes(q))
      ) return false
      return true
    })
    if (sort === 'az') {
      list = [...list].sort((a, b) => a.name.localeCompare(b.name))
    } else if (sort === 'newest') {
      list = [...list].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    } else if (sort === 'oldest') {
      list = [...list].sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt))
    }
    return list
  }, [query, tag, favOnly, favorites, sort])

  const categoryCount = CATEGORIES.length - 1

  const handleSurprise = () => {
    const pool = filtered.length > 0 ? filtered : GAMES
    const pick = pool[Math.floor(Math.random() * pool.length)]
    burstConfetti(24)
    setOpenId(pick.id)
  }

  const clearFilters = () => {
    setQuery('')
    setTag('All')
    setFavOnly(false)
  }

  return (
    <div
      className="w-full"
      style={{
        '--arcade-blue': theme.primary,
        '--arcade-blue-hover': theme.primaryHover,
        '--arcade-blue-active': theme.primaryPress,
        '--arcade-blue-tint': theme.tint,
      }}
    >
      {confetti && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 999, pointerEvents: 'none' }}>
          <Confetti key={confetti.key} count={confetti.count} />
        </div>
      )}

      {/* Hero */}
      <div className="arcade-hero -mx-4 sm:-mx-8 px-4 sm:px-8 pt-12 sm:pt-16 pb-16 sm:pb-24">
        <div className="max-w-5xl mx-auto flex flex-col lg:flex-row lg:items-end justify-between gap-10">
          <div className="max-w-xl">
            <div className="flex items-center gap-3 mb-6 flex-wrap">
              <button type="button" onClick={handleSecretTap} className="arcade-badge">
                AI Bootcamp
              </button>
              <span className="arcade-eyebrow">build · ship · play</span>
            </div>
            <h2
              className="m-0 tracking-tight"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(44px, 8vw, 76px)',
                lineHeight: 0.96,
                fontWeight: 300,
                letterSpacing: '-0.03em',
                color: 'var(--arcade-text)',
              }}
            >
              The{' '}
              <span style={{ display: 'inline-flex' }}>
                {ARCADE_LETTERS.map((ch, i) => (
                  <span
                    key={ch + i}
                    className="arcade-title-letter"
                    style={{
                      color: theme.letters[i % theme.letters.length],
                      '--letter-delay': `${i * 90}ms`,
                    }}
                  >
                    {ch}
                  </span>
                ))}
              </span>
            </h2>
            <p
              className="mt-5"
              style={{ fontSize: 16, lineHeight: 1.5, color: 'var(--arcade-text-muted)' }}
            >
              {GAMES.length} tiny games, zero instructions, mandatory puns.
            </p>
          </div>
          <div className="flex gap-4 relative">
            <div className="absolute -top-14 right-0" ref={settingsRef}>
              <button
                type="button"
                onClick={() => setSettingsOpen((o) => !o)}
                aria-label="Choose palette"
                aria-haspopup="menu"
                aria-expanded={settingsOpen}
                title="Palette"
                className={`arcade-settings-btn ${settingsOpen ? 'arcade-settings-btn--open' : ''}`}
              >
                <Settings size={17} strokeWidth={2} />
              </button>

              {settingsOpen && (
                <div className="arcade-settings-panel slide-down" role="menu" aria-label="Palette">
                  <div className="arcade-settings-panel__label">Palette</div>
                  {PALETTE_ORDER.map((key) => {
                    const p = PALETTES[key]
                    const active = palette === key
                    return (
                      <button
                        key={key}
                        type="button"
                        role="menuitemradio"
                        aria-checked={active}
                        onClick={() => {
                          setPalette(key)
                          setSettingsOpen(false)
                        }}
                        className={`arcade-settings-panel__row ${active ? 'arcade-settings-panel__row--active' : ''}`}
                      >
                        <span className="arcade-settings-panel__dot" style={{ background: p.primary }} />
                        <span className="arcade-settings-panel__label-text">{p.label}</span>
                        {active && <Check size={15} strokeWidth={2.5} color={p.primary} />}
                      </button>
                    )
                  })}
                </div>
              )}
            </div>
            <div className="arcade-stat">
              <div className="arcade-stat__num" style={{ color: 'var(--arcade-blue)' }}>{GAMES.length}</div>
              <div className="arcade-stat__label">games</div>
            </div>
            <div className="arcade-stat">
              <div className="arcade-stat__num" style={{ color: 'var(--arcade-pink)' }}>{categoryCount}</div>
              <div className="arcade-stat__label">categories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Toolbar */}
      <div className="arcade-toolbar -mx-4 sm:-mx-8 px-4 sm:px-8">
        <div className="max-w-5xl mx-auto pt-8 pb-6 flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:justify-between">
            <div className="arcade-search-wrap relative w-full sm:w-[280px]">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search games"
                className="arcade-search"
              />
              <svg
                width="16" height="16" viewBox="0 0 24 24" fill="none"
                stroke="var(--arcade-text-faint)" strokeWidth="2" strokeLinecap="round"
                className="arcade-search-icon"
                style={{ position: 'absolute', left: 15, top: 14 }}
              >
                <circle cx="11" cy="11" r="7" />
                <path d="M20 20l-3.5-3.5" />
              </svg>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleToggleFavOnly}
                className={`arcade-btn arcade-btn--icon-tada ${favOnly ? 'arcade-btn--fav-active' : ''}`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill={favOnly ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                  <path d="M12 3.5l2.7 5.6 6.1.9-4.4 4.3 1 6.2-5.4-2.9-5.4 2.9 1-6.2L3.2 10l6.1-.9z" />
                </svg>
                Favorites
              </button>

              <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className="arcade-select"
              >
                <option value="default">Default order</option>
                <option value="az">A – Z</option>
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>

              <button onClick={handleSurprise} className="arcade-btn arcade-btn--primary arcade-btn--dice">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3.5" y="3.5" width="17" height="17" rx="4"></rect>
                  <circle cx="8.5" cy="8.5" r="1.4" fill="currentColor"></circle>
                  <circle cx="15.5" cy="15.5" r="1.4" fill="currentColor"></circle>
                  <circle cx="12" cy="12" r="1.4" fill="currentColor"></circle>
                </svg>
                Surprise me
              </button>
            </div>
          </div>

          <div className="arcade-chip-row">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                onClick={() => handleTagClick(c)}
                className={`arcade-chip ${tag === c ? 'arcade-chip--active' : ''} ${chipBounce === c ? 'arcade-chip--bounce' : ''}`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Jump back in */}
      {recents.length > 0 && (
        <div className="max-w-5xl mx-auto pt-12">
          <div className="arcade-eyebrow" style={{ marginBottom: 14 }}>Jump back in</div>
          <div className="flex gap-3 flex-wrap">
            {recents.map((id) => {
              const g = GAME_BY_ID[id]
              if (!g) return null
              return (
                <button key={id} onClick={() => setOpenId(id)} className="arcade-recent">
                  <span className="arcade-recent__avatar" style={{ background: g.tile }}>
                    {initialsFor(g.name)}
                  </span>
                  {g.name}
                </button>
              )
            })}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="max-w-5xl mx-auto pt-16 pb-10">
        {filtered.length === 0 ? (
          <div className="arcade-empty">
            <div style={{ fontSize: 22, fontWeight: 300, color: 'var(--arcade-text)' }}>No games match that.</div>
            <p style={{ margin: '10px 0 20px', fontSize: 14, color: 'var(--arcade-text-muted)' }}>
              Try a looser search — the puns are doing a lot of work here.
            </p>
            <button onClick={clearFilters} className="arcade-btn arcade-btn--primary" style={{ margin: '0 auto' }}>
              Clear filters
            </button>
          </div>
        ) : (
          <div className="arcade-grid">
            {filtered.map((game, index) => {
              const isFav = favorites.includes(game.id)
              const g = GAME_BY_ID[game.id]
              const delay = staggerDelay(index)
              return (
                <div
                  key={game.id}
                  role="button"
                  tabIndex={0}
                  onClick={() => setOpenId(game.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setOpenId(game.id)
                    }
                  }}
                  className="arcade-card"
                  style={{ '--rot': g.rot, '--card-delay': delay }}
                >
                  <div className="arcade-card__tile" style={{ background: g.tile }}>
                    <span className="arcade-card__initials" style={{ '--card-delay': delay }}>
                      {initialsFor(game.name)}
                    </span>
                    <span className="arcade-card__tag">{game.tag}</span>
                  </div>

                  <button
                    aria-label={isFav ? 'Remove from favorites' : 'Add to favorites'}
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleFavorite(game.id)
                    }}
                    className={`arcade-card__fav ${isFav ? 'arcade-card__fav--active' : ''} ${bounceId === game.id ? 'arcade-card__fav--bounce' : ''}`}
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill={isFav ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                      <path d="M12 3.5l2.7 5.6 6.1.9-4.4 4.3 1 6.2-5.4-2.9-5.4 2.9 1-6.2L3.2 10l6.1-.9z" />
                    </svg>
                  </button>

                  <div className="flex items-center gap-2">
                    <h3 className="arcade-card__title">{game.name}</h3>
                    {game.isNew && <span className="arcade-card__new">New</span>}
                  </div>
                  <div className="arcade-card__byline">{game.builder ? `by ${game.builder}` : game.tag}</div>
                  <p className="arcade-card__desc">{game.description}</p>
                </div>
              )
            })}
          </div>
        )}
      </div>

      {/* Secret toast */}
      {secretOn && (
        <div className="arcade-secret-toast">
          <span className="arcade-secret-toast__icon">🕹</span>
          You found the secret. Nothing here but confetti.
        </div>
      )}

      {/* Preview modal */}
      {openId && GAME_BY_ID[openId] && (
        <div
          onClick={() => setOpenId(null)}
          className="arcade-modal-backdrop"
        >
          <div onClick={(e) => e.stopPropagation()} className="arcade-modal">
            <div className="arcade-modal__art" style={{ background: GAME_BY_ID[openId].tile }}>
              <span className="arcade-modal__initials">{initialsFor(GAME_BY_ID[openId].name)}</span>
              <button
                onClick={() => setOpenId(null)}
                aria-label="Close"
                className="arcade-modal__close"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                  <path d="M6 6l12 12M18 6L6 18" />
                </svg>
              </button>
            </div>
            <div className="arcade-modal__body">
              <div className="flex items-center gap-2.5 flex-wrap">
                <h3 className="arcade-modal__title">{GAME_BY_ID[openId].name}</h3>
                <span className="arcade-modal__tag">{GAME_BY_ID[openId].tag}</span>
              </div>
              {GAME_BY_ID[openId].builder && (
                <div className="arcade-modal__byline">by {GAME_BY_ID[openId].builder}</div>
              )}
              <p className="arcade-modal__desc">{GAME_BY_ID[openId].description}</p>
              <div className="flex items-center gap-3 flex-wrap" style={{ marginTop: 26 }}>
                <button onClick={() => playGame(openId)} className="arcade-btn arcade-btn--primary arcade-play-btn" style={{ height: 52, padding: '0 28px', fontSize: 16 }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M7 4.5l13 7.5-13 7.5z" />
                  </svg>
                  Play now
                </button>
                <button
                  onClick={() => toggleFavorite(openId)}
                  className={`arcade-btn arcade-btn--icon-tada ${favorites.includes(openId) ? 'arcade-btn--fav-active' : ''}`}
                  style={{ height: 52, padding: '0 22px', fontSize: 15 }}
                >
                  <svg width="17" height="17" viewBox="0 0 24 24" fill={favorites.includes(openId) ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth="2" strokeLinejoin="round">
                    <path d="M12 3.5l2.7 5.6 6.1.9-4.4 4.3 1 6.2-5.4-2.9-5.4 2.9 1-6.2L3.2 10l6.1-.9z" />
                  </svg>
                  {favorites.includes(openId) ? 'Favorited' : 'Add to favorites'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
