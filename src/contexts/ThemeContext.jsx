import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react'

const STORAGE_KEY = 'puzzlr-theme'
const LEGACY_STORAGE_KEY = 'puzzlr-dark-mode'
const THEMES = ['system', 'light', 'dark', 'midnight']

const ThemeContext = createContext(null)

function prefersDark() {
  return window.matchMedia('(prefers-color-scheme: dark)').matches
}

function getInitialTheme() {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (THEMES.includes(stored)) return stored

  const legacy = localStorage.getItem(LEGACY_STORAGE_KEY)
  if (legacy !== null) return legacy === 'true' ? 'dark' : 'light'

  return 'system'
}

function applyResolvedTheme(resolved) {
  const root = document.documentElement
  root.dataset.theme = resolved
  root.classList.toggle('dark', resolved !== 'light')
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme)
  const [systemPrefersDark, setSystemPrefersDark] = useState(prefersDark)

  const resolvedTheme = useMemo(
    () => (theme === 'system' ? (systemPrefersDark ? 'dark' : 'light') : theme),
    [theme, systemPrefersDark]
  )

  useEffect(() => {
    applyResolvedTheme(resolvedTheme)
  }, [resolvedTheme])

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, theme)
  }, [theme])

  useEffect(() => {
    const mql = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e) => setSystemPrefersDark(e.matches)
    mql.addEventListener('change', handleChange)
    return () => mql.removeEventListener('change', handleChange)
  }, [])

  const setTheme = useCallback((next) => {
    if (THEMES.includes(next)) setThemeState(next)
  }, [])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      dark: resolvedTheme !== 'light',
      setTheme,
    }),
    [theme, resolvedTheme, setTheme]
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- co-located with its provider, standard context+hook pairing
export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}
