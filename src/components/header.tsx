import { useEffect, useState } from 'react'
import { useLang, type Lang } from '../lib/i18n'
import { useTheme } from '../lib/use-theme'
import { useActiveSection } from '../lib/use-active-section'
import { nav, SECTION_IDS, ui } from '../data/ui'
import { profile } from '../data/profile'
import { Icon } from './icon'

const SECTIONS = [...SECTION_IDS]
const LANGS: Lang[] = ['en', 'vi']

function LangSwitch() {
  const { lang, setLang, t } = useLang()
  return (
    <div role="group" aria-label={t(ui.language)} className="flex rounded-full bg-stone-100 p-0.5 text-sm font-semibold dark:bg-stone-800">
      {LANGS.map((code) => (
        <button
          key={code}
          type="button"
          aria-pressed={lang === code}
          onClick={() => setLang(code)}
          className={`rounded-full px-2.5 py-1 uppercase transition-colors ${
            lang === code
              ? 'bg-white text-stone-900 shadow-sm dark:bg-stone-600 dark:text-white'
              : 'text-stone-500 hover:text-stone-800 dark:text-stone-400 dark:hover:text-white'
          }`}
        >
          {code}
        </button>
      ))}
    </div>
  )
}

function ThemeToggle() {
  const { t } = useLang()
  const { dark, toggle } = useTheme()
  const label = t(dark ? ui.toLight : ui.toDark)
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={label}
      title={label}
      className="grid size-9 place-items-center rounded-full text-stone-600 transition-colors hover:bg-stone-100 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-stone-800 dark:hover:text-white"
    >
      <Icon name={dark ? 'sun' : 'moon'} />
    </button>
  )
}

export function Header() {
  const { t } = useLang()
  const active = useActiveSection(SECTIONS)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const linkClass = (id: string) =>
    `rounded-full px-3 py-1.5 text-sm font-medium transition-colors ${
      active === id
        ? 'bg-emerald-50 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300'
        : 'text-stone-600 hover:text-stone-900 dark:text-stone-400 dark:hover:text-white'
    }`

  return (
    <header
      className={`sticky top-0 z-40 border-b backdrop-blur transition-colors ${
        scrolled || open
          ? 'border-stone-200 bg-stone-50/85 dark:border-stone-800 dark:bg-stone-950/85'
          : 'border-transparent bg-transparent'
      }`}
    >
      <a
        href="#main"
        className="sr-only rounded-md bg-emerald-600 px-3 py-2 text-white focus:not-sr-only focus:absolute focus:top-3 focus:left-3"
      >
        {t(ui.skipToContent)}
      </a>
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between gap-4 px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 font-bold text-stone-900 dark:text-white">
          <span className="grid size-8 place-items-center rounded-lg bg-emerald-600 text-sm text-white">M</span>
          <span className="hidden sm:inline">{t(profile.name)}</span>
        </a>

        <nav aria-label={t(ui.primaryNav)} className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a href={`#${id}`} className={linkClass(id)} aria-current={active === id ? 'true' : undefined}>
                  {t(nav[id])}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-1.5">
          <LangSwitch />
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={t(open ? ui.closeMenu : ui.openMenu)}
            className="grid size-9 place-items-center rounded-full text-stone-700 hover:bg-stone-100 lg:hidden dark:text-stone-200 dark:hover:bg-stone-800"
          >
            <Icon name={open ? 'close' : 'menu'} />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-nav" aria-label={t(ui.primaryNav)} className="border-t border-stone-200 px-4 pb-4 lg:hidden dark:border-stone-800">
          <ul className="flex flex-col gap-1 pt-3">
            {SECTIONS.map((id) => (
              <li key={id}>
                <a
                  href={`#${id}`}
                  onClick={() => setOpen(false)}
                  className={`block ${linkClass(id)} py-2.5 text-base`}
                >
                  {t(nav[id])}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  )
}
