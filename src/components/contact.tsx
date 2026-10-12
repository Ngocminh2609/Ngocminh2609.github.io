import { useEffect, useState } from 'react'
import { useLang } from '../lib/i18n'
import { profile } from '../data/profile'
import { ui } from '../data/ui'
import { Icon } from './icon'
import { Reveal } from './section'

function CopyEmailButton() {
  const { t } = useLang()
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!copied) return
    const timer = setTimeout(() => setCopied(false), 2000)
    return () => clearTimeout(timer)
  }, [copied])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
    } catch {
      // Clipboard can be blocked (insecure origin, permissions); the mailto link still works.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      className="inline-flex items-center gap-2 rounded-full bg-white/10 px-5 py-3 font-semibold text-white ring-1 ring-white/30 transition hover:bg-white/20"
    >
      <Icon name={copied ? 'check' : 'copy'} className="size-4" />
      <span aria-live="polite">{t(copied ? ui.copied : ui.copyEmail)}</span>
    </button>
  )
}

export function Contact() {
  const { t } = useLang()
  return (
    <section id="contact" aria-labelledby="contact-title" className="scroll-mt-20 py-20 sm:py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-emerald-700 px-6 py-12 text-center sm:px-12 sm:py-16 dark:bg-emerald-800">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(40rem_20rem_at_50%_-20%,rgb(255_255_255/0.18),transparent)]"
            />
            <p className="relative text-sm font-semibold tracking-wider text-emerald-100 uppercase">{t(ui.contactEyebrow)}</p>
            <h2 id="contact-title" className="relative mt-2 text-3xl font-bold tracking-tight text-white sm:text-4xl">
              {t(ui.contactTitle)}
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-emerald-50">{t(ui.contactBody)}</p>
            <a
              href={`mailto:${profile.email}`}
              className="relative mt-6 inline-block text-xl font-semibold break-all text-white underline decoration-emerald-300 underline-offset-4 hover:decoration-white sm:text-2xl"
            >
              {profile.email}
            </a>
            <div className="relative mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-emerald-800 shadow-sm transition hover:bg-emerald-50"
              >
                <Icon name="mail" className="size-4" />
                {t(ui.sendEmail)}
              </a>
              <CopyEmailButton />
            </div>
            <ul className="relative mt-8 flex flex-wrap justify-center gap-x-6 gap-y-3">
              {profile.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 font-medium text-emerald-50 hover:text-white hover:underline"
                  >
                    <Icon name={link.icon} className="size-4" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
