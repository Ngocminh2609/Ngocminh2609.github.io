import { useLang } from '../lib/i18n'
import { experience } from '../data/profile'
import { ui } from '../data/ui'
import { Icon } from './icon'
import { Card, Reveal, Section, Tag } from './section'

export function Experience() {
  const { t } = useLang()
  return (
    <Section id="experience" eyebrow={t(ui.experienceEyebrow)} title={t(ui.experienceTitle)}>
      <Reveal>
        <Card className="sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="grid size-12 place-items-center rounded-xl bg-stone-800 text-sm font-bold text-white dark:bg-stone-700">FPT</span>
              <div>
                <h3 className="text-xl font-bold text-stone-900 dark:text-white">{experience.company}</h3>
                <p className="font-medium text-stone-600 dark:text-stone-400">{t(experience.role)}</p>
              </div>
            </div>
            <div className="text-sm text-stone-500 sm:text-right dark:text-stone-400">
              <p className="font-semibold text-stone-700 dark:text-stone-300">{t(experience.period)}</p>
              <p className="inline-flex items-center gap-1">
                <Icon name="pin" className="size-3.5" />
                {t(experience.location)}
              </p>
            </div>
          </div>

          <ol className="mt-8 space-y-10 border-l-2 border-stone-200 pl-6 sm:ml-6 dark:border-stone-800">
            {experience.engagements.map((item, i) => (
              <li key={item.name.en} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-1.5 -left-[33px] size-4 rounded-full border-4 border-white dark:border-stone-900 ${
                    i === 0 ? 'bg-emerald-500' : 'bg-stone-300 dark:bg-stone-600'
                  }`}
                />
                <p className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">{t(item.period)}</p>
                <h4 className="mt-1 text-lg font-semibold text-stone-900 dark:text-white">{t(item.name)}</h4>
                <ul className="mt-3 space-y-2">
                  {item.highlights.map((h) => (
                    <li key={h.en} className="flex gap-3 text-stone-700 dark:text-stone-300">
                      <span aria-hidden="true" className="mt-2.5 size-1.5 shrink-0 rounded-full bg-stone-400 dark:bg-stone-500" />
                      <span>{t(h)}</span>
                    </li>
                  ))}
                </ul>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <li key={tag}>
                      <Tag>{tag}</Tag>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </Card>
      </Reveal>
    </Section>
  )
}
