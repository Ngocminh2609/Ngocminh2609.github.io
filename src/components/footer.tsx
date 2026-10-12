import { useLang } from '../lib/i18n'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { Icon } from './icon'

export function Footer() {
  const { t } = useLang()
  return (
    <footer className="border-t border-stone-200 dark:border-stone-800">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-4 py-8 text-sm text-stone-500 sm:flex-row sm:px-6 dark:text-stone-400">
        <p>
          © {new Date().getFullYear()} {t(profile.name)}. {t(ui.builtWith)}
        </p>
        <a href="#top" className="inline-flex items-center gap-1.5 font-medium hover:text-stone-900 dark:hover:text-white">
          <Icon name="arrowUp" className="size-4" />
          {t(ui.backToTop)}
        </a>
      </div>
    </footer>
  )
}
