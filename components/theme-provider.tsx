'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'

type Theme = 'dark' | 'light'

type ThemeContextValue = {
  theme: Theme
  toggleTheme: () => void
  setTheme: (theme: Theme) => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('dark')

  // Hydrate from storage on mount
  useEffect(() => {
    const stored = window.localStorage.getItem('varellen-theme') as Theme | null
    if (stored === 'light' || stored === 'dark') {
      setThemeState(stored)
    }
  }, [])

  const applyTheme = useCallback((next: Theme) => {
    const root = document.documentElement
    root.classList.add('theme-transition')
    root.classList.toggle('dark', next === 'dark')
    root.classList.toggle('light', next === 'light')
    root.style.colorScheme = next
    window.localStorage.setItem('varellen-theme', next)
    window.clearTimeout((window as any).__themeTimer)
    ;(window as any).__themeTimer = window.setTimeout(() => {
      root.classList.remove('theme-transition')
    }, 750)
  }, [])

  useEffect(() => {
    applyTheme(theme)
  }, [theme, applyTheme])

  const setTheme = useCallback((next: Theme) => setThemeState(next), [])
  const toggleTheme = useCallback(
    () => setThemeState((t) => (t === 'dark' ? 'light' : 'dark')),
    [],
  )

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within ThemeProvider')
  return ctx
}
