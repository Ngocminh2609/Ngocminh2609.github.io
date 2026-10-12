import { useState } from 'react'
import { writePref } from './storage'

// index.html sets the initial `dark` class before React loads; this hook only reads and toggles it.
export function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  const toggle = () => {
    const next = !dark
    document.documentElement.classList.toggle('dark', next)
    writePref('theme', next ? 'dark' : 'light')
    setDark(next)
  }

  return { dark, toggle }
}
