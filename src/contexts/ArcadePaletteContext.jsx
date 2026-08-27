import { createContext, useContext, useCallback, useEffect, useMemo, useState } from 'react'
import { PALETTES, DEFAULT_PALETTE } from '../data/arcadePalettes'

const STORAGE_KEY = 'matchy.palette'

const ArcadePaletteContext = createContext(null)

function getInitialPalette() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || `"${DEFAULT_PALETTE}"`)
    return PALETTES[stored] ? stored : DEFAULT_PALETTE
  } catch {
    return DEFAULT_PALETTE
  }
}

export function ArcadePaletteProvider({ children }) {
  const [palette, setPaletteState] = useState(getInitialPalette)

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(palette))
    } catch {
      // ignore write failures (private browsing, storage full, etc.)
    }
  }, [palette])

  const setPalette = useCallback((next) => {
    if (PALETTES[next]) setPaletteState(next)
  }, [])

  const value = useMemo(
    () => ({ palette, theme: PALETTES[palette] ?? PALETTES[DEFAULT_PALETTE], setPalette }),
    [palette, setPalette]
  )

  return <ArcadePaletteContext.Provider value={value}>{children}</ArcadePaletteContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components -- co-located with its provider, standard context+hook pairing
export function useArcadePalette() {
  const ctx = useContext(ArcadePaletteContext)
  if (!ctx) throw new Error('useArcadePalette must be used within an ArcadePaletteProvider')
  return ctx
}
