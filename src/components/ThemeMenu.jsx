import { useEffect, useRef, useState } from 'react'
import { Sun, Moon, MoonStar, Monitor, Check } from 'lucide-react'
import { useTheme } from '../contexts/ThemeContext'

const OPTIONS = [
  { value: 'system', label: 'System', Icon: Monitor },
  { value: 'light', label: 'Light', Icon: Sun },
  { value: 'dark', label: 'Dark', Icon: Moon },
  { value: 'midnight', label: 'Midnight', Icon: MoonStar },
]

const TRIGGER_ICON = {
  system: Monitor,
  light: Sun,
  dark: Moon,
  midnight: MoonStar,
}

function ThemeOption(props) {
  const { value, label, Icon, active, onSelect } = props
  return (
    <button
      type="button"
      role="menuitemradio"
      aria-checked={active}
      className={`theme-menu__item${active ? ' theme-menu__item--active' : ''}`}
      onClick={() => onSelect(value)}
    >
      <span className="theme-menu__item-icon">
        <Icon size={16} strokeWidth={2} />
      </span>
      {label}
      {active && (
        <span className="theme-menu__item-check">
          <Check size={14} strokeWidth={2.5} />
        </span>
      )}
    </button>
  )
}

export default function ThemeMenu() {
  const { theme, setTheme } = useTheme()
  const [open, setOpen] = useState(false)
  const rootRef = useRef(null)

  useEffect(() => {
    if (!open) return undefined

    const handlePointerDown = (e) => {
      if (rootRef.current && !rootRef.current.contains(e.target)) setOpen(false)
    }
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setOpen(false)
    }

    document.addEventListener('mousedown', handlePointerDown)
    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('mousedown', handlePointerDown)
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [open])

  const TriggerIcon = TRIGGER_ICON[theme] ?? Monitor

  return (
    <div className="theme-menu" ref={rootRef}>
      <button
        type="button"
        className="theme-menu__trigger"
        onClick={() => setOpen((o) => !o)}
        aria-label="Choose theme"
        aria-haspopup="menu"
        aria-expanded={open}
        title="Theme"
      >
        <TriggerIcon size={16} strokeWidth={2} />
      </button>

      {open && (
        <div className="theme-menu__panel slide-down" role="menu" aria-label="Theme">
          {OPTIONS.map((option) => (
            <ThemeOption
              key={option.value}
              {...option}
              active={theme === option.value}
              onSelect={(value) => {
                setTheme(value)
                setOpen(false)
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
