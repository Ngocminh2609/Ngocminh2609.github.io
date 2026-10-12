import { useLang } from '../lib/i18n'
import { approach, background } from '../data/profile'
import { ui } from '../data/ui'
import { Icon } from './icon'
import { Card, Reveal, Section } from './section'

function Dots({ filled }: { filled: number }) {
  return (
    <span aria-hidden="true" className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`size-2.5 rounded-full ${i < filled ? 'bg-emerald-500' : 'bg-stone-200 dark:bg-stone-700'}`}
        />
      ))}
    </span>
  )
}

export function Approach() {
  const { t } = useLang()
  const { education, certification, languages } = background

  return (
    <Section id="approach" eyebrow={t(ui.approachEyebrow)} title={t(ui.approachTitle)}>
      <div className="grid gap-4 sm:grid-cols-2">
        {approach.map((item) => (
          <Reveal key={item.title.en}>
            <Card className="h-full">
              <span className="grid size-11 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
                <Icon name={item.icon} />
              </span>
              <h3 className="mt-4 text-lg font-semibold text-stone-900 dark:text-white">{t(item.title)}</h3>
              <p className="mt-2 text-stone-600 dark:text-stone-400">{t(item.body)}</p>
            </Card>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-12">
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="p-5">
            <h3 className="text-sm font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
              {t(ui.educationTitle)}
            </h3>
            <p className="mt-3 font-semibold text-stone-900 dark:text-white">{t(education.school)}</p>
            <p className="text-stone-600 dark:text-stone-400">{t(education.degree)}</p>
            <p className="mt-1 text-sm text-stone-500">{education.period}</p>
          </Card>
          <Card className="p-5">
            <h3 className="text-sm font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
              {t(ui.certificationTitle)}
            </h3>
            <p className="mt-3 font-semibold text-stone-900 dark:text-white">{certification.name}</p>
            <p className="text-stone-600 dark:text-stone-400">{t(certification.issuer)}</p>
            <p className="mt-1 text-sm text-stone-500">{certification.date}</p>
          </Card>
          <Card className="p-5">
            <h3 className="text-sm font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
              {t(ui.languagesTitle)}
            </h3>
            <ul className="mt-3 space-y-3">
              {languages.map((l) => (
                <li key={l.name.en}>
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-semibold text-stone-900 dark:text-white">{t(l.name)}</span>
                    <Dots filled={l.dots} />
                  </div>
                  <p className="text-sm text-stone-600 dark:text-stone-400">{t(l.level)}</p>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </Reveal>
    </Section>
  )
}
