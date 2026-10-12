import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { readPref, writePref } from './storage'

export type Lang = 'en' | 'vi'
export type Text = Record<Lang, string>

const LANG_KEY = 'lang'

type LangContextValue = {
  lang: Lang
  setLang: (lang: Lang) => void
  t: (text: Text) => string
}

const LangContext = createContext<LangContextValue | null>(null)

function initialLang(): Lang {
  const saved = readPref(LANG_KEY)
  if (saved === 'en' || saved === 'vi') return saved
  return navigator.language?.toLowerCase().startsWith('vi') ? 'vi' : 'en'
}

export function LangProvider({ title, children }: { title: Text; children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    document.title = title[lang]
  }, [lang, title])

  const setLang = (next: Lang) => {
    setLangState(next)
    writePref(LANG_KEY, next)
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t: (text) => text[lang] }}>
      {children}
    </LangContext.Provider>
  )
}

export function useLang(): LangContextValue {
  const value = useContext(LangContext)
  if (!value) throw new Error('useLang must be used inside <LangProvider>')
  return value
}
