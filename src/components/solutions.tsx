import { useLang } from '../lib/i18n'
import { solutions, type Solution } from '../data/profile'
import { ui } from '../data/ui'
import { Icon } from './icon'
import { Card, Reveal, Section } from './section'

function SolutionCard({ item }: { item: Solution }) {
  const { t } = useLang()
  return (
    <Card className="flex h-full flex-col">
      <div className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-emerald-50 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300">
          <Icon name={item.icon} />
        </span>
        <h3 className="pt-1.5 text-lg leading-snug font-semibold text-stone-900 dark:text-white">{t(item.problem)}</h3>
      </div>

      <p className="mt-5 text-xs font-semibold tracking-wider text-stone-500 uppercase dark:text-stone-400">
        {t(ui.solutionSteps)}
      </p>
      <ol className="mt-2 space-y-2">
        {item.steps.map((step, i) => (
          <li key={step.en} className="flex gap-3 text-stone-700 dark:text-stone-300">
            <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-stone-100 text-xs font-semibold text-stone-600 dark:bg-stone-800 dark:text-stone-300">
              {i + 1}
            </span>
            <span>{t(step)}</span>
          </li>
        ))}
      </ol>

      {item.result && (
        <div className="mt-4 flex items-center gap-4 rounded-xl bg-emerald-50 px-4 py-3 ring-1 ring-emerald-200 ring-inset dark:bg-emerald-900/30 dark:ring-emerald-800">
          <span className="shrink-0 text-3xl font-extrabold tracking-tight text-emerald-700 dark:text-emerald-300">
            {item.result.value}
          </span>
          <span className="text-sm text-emerald-900 dark:text-emerald-100">
            <span className="block text-xs font-semibold tracking-wider uppercase">{t(ui.solutionResult)}</span>
            {t(item.result.label)}
          </span>
        </div>
      )}

      <div className="mt-auto pt-6">
        <a
          href={item.href}
          className="flex items-start gap-2 border-t border-stone-100 pt-4 text-sm text-stone-600 hover:text-emerald-800 dark:border-stone-800 dark:text-stone-400 dark:hover:text-emerald-300"
        >
          <Icon name="checkCircle" className="mt-0.5 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
          <span>
            <span className="font-semibold text-stone-800 dark:text-stone-200">{t(ui.solutionProof)}: </span>
            {t(item.proof)}
          </span>
        </a>
      </div>
    </Card>
  )
}

export function Solutions() {
  const { t } = useLang()
  return (
    <Section id="solutions" eyebrow={t(ui.solutionsEyebrow)} title={t(ui.solutionsTitle)} intro={t(ui.solutionsIntro)}>
      <div className="grid gap-4 md:grid-cols-2">
        {solutions.map((item) => (
          <Reveal key={item.problem.en}>
            <SolutionCard item={item} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
