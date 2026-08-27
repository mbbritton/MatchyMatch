import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ThemeProvider } from './contexts/ThemeContext'
import { ArcadePaletteProvider } from './contexts/ArcadePaletteContext'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ThemeProvider>
      <ArcadePaletteProvider>
        <App />
      </ArcadePaletteProvider>
    </ThemeProvider>
  </StrictMode>,
)
