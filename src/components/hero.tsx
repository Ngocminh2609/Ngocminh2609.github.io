import { useState } from 'react'
import { useLang } from '../lib/i18n'
import { profile, stats } from '../data/profile'
import { ui } from '../data/ui'
import { Icon } from './icon'

function Avatar() {
  const { t } = useLang()
  const [failed, setFailed] = useState(false)
  const initials = profile.name.en
    .split(' ')
    .map((part) => part[0])
    .join('')

  return (
    <div className="relative mx-auto w-fit md:mx-0">
      <div aria-hidden="true" className="absolute -inset-3 rotate-6 rounded-[2rem] bg-emerald-200/70 dark:bg-emerald-900/50" />
      {failed ? (
        <div className="relative grid size-40 place-items-center rounded-3xl bg-emerald-600 text-4xl font-bold text-white sm:size-48">
          {initials}
        </div>
      ) : (
        <img
          src={profile.avatar}
          alt={t(profile.name)}
          width={206}
          height={206}
          onError={() => setFailed(true)}
          className="relative size-40 rounded-3xl object-cover shadow-lg ring-4 ring-white sm:size-48 dark:ring-stone-900"
        />
      )}
    </div>
  )
}

export function Hero() {
  const { t } = useLang()

  return (
    <section id="top" className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(60rem_30rem_at_80%_-10%,var(--color-emerald-100),transparent)] dark:bg-[radial-gradient(60rem_30rem_at_80%_-10%,color-mix(in_oklab,var(--color-emerald-900)_45%,transparent),transparent)]"
      />
      <div className="mx-auto grid max-w-5xl items-center gap-12 px-4 pt-12 pb-16 sm:px-6 sm:pt-20 md:grid-cols-[1fr_auto] md:gap-16">
        <div className="order-2 md:order-1">
          <p className="inline-flex items-center gap-1.5 rounded-full bg-white px-3 py-1 text-sm font-medium text-stone-600 shadow-sm ring-1 ring-stone-200 dark:bg-stone-900 dark:text-stone-300 dark:ring-stone-800">
            <Icon name="pin" className="size-4 text-emerald-600 dark:text-emerald-400" />
            {t(profile.location)}
          </p>
          <p className="mt-6 text-lg font-medium text-stone-500 dark:text-stone-400">{t(ui.greeting)}</p>
          <h1 className="mt-1 text-4xl font-extrabold tracking-tight text-stone-900 sm:text-5xl lg:text-6xl dark:text-white">
            {t(profile.name)}
          </h1>
          <p className="mt-3 text-xl font-semibold text-emerald-700 sm:text-2xl dark:text-emerald-400">{t(profile.role)}</p>
          <p className="mt-1 text-sm font-medium text-stone-500 dark:text-stone-400">{profile.focus}</p>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-stone-700 dark:text-stone-300">{t(profile.intro)}</p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-5 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 focus-visible:outline-offset-4"
            >
              {t(ui.viewProjects)}
              <Icon name="arrowRight" className="size-4" />
            </a>
            <a
              href={profile.cv}
              download
              className="inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 font-semibold text-stone-800 shadow-sm ring-1 ring-stone-300 transition hover:bg-stone-50 dark:bg-stone-900 dark:text-stone-100 dark:ring-stone-700 dark:hover:bg-stone-800"
            >
              <Icon name="download" className="size-4" />
              {t(ui.downloadCv)}
            </a>
            <ul className="ml-1 flex items-center gap-1">
              {profile.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.label}
                    title={link.label}
                    className="grid size-11 place-items-center rounded-full text-stone-600 transition hover:bg-stone-200/60 hover:text-stone-900 dark:text-stone-400 dark:hover:bg-stone-800 dark:hover:text-white"
                  >
                    <Icon name={link.icon} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="order-1 md:order-2">
          <Avatar />
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 pb-8 sm:px-6">
        <h2 className="sr-only">{t(ui.statsLabel)}</h2>
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-stone-200 bg-stone-200 lg:grid-cols-4 dark:border-stone-800 dark:bg-stone-800">
          {stats.map((stat) => (
            <div key={stat.value} className="flex flex-col-reverse justify-end gap-1 bg-white p-5 sm:p-6 dark:bg-stone-900">
              <dt className="text-sm text-stone-600 dark:text-stone-400">{t(stat.label)}</dt>
              <dd className="text-3xl font-bold tracking-tight text-stone-900 dark:text-white">{stat.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
