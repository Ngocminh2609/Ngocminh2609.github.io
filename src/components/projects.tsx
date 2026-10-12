import { Fragment } from 'react'
import { useLang } from '../lib/i18n'
import { pipelineSteps, projects, type Project } from '../data/profile'
import { ui } from '../data/ui'
import { Icon } from './icon'
import { Card, Reveal, Section, Tag } from './section'

function Pipeline() {
  const { t } = useLang()
  return (
    <figure className="mt-6 rounded-xl bg-stone-50 p-4 ring-1 ring-stone-200 sm:p-5 dark:bg-stone-950/60 dark:ring-stone-800">
      <figcaption className="text-sm font-semibold text-stone-700 dark:text-stone-300">{t(ui.pipelineTitle)}</figcaption>
      <ol className="mt-4 flex flex-col gap-2 lg:flex-row lg:items-stretch">
        {pipelineSteps.map((step, i) => (
          <Fragment key={step.label.en}>
            {i > 0 && (
              <li aria-hidden="true" className="flex justify-center text-stone-400 lg:items-center dark:text-stone-600">
                <Icon name="arrowRight" className="size-4 rotate-90 lg:rotate-0" />
              </li>
            )}
            <li
              className="pipeline-step flex-1 rounded-lg border border-stone-200 bg-white px-3 py-2.5 dark:border-stone-700 dark:bg-stone-900"
              style={{ animationDelay: `${i * 1.2}s` }}
            >
              <span className="block text-xs font-semibold text-emerald-700 dark:text-emerald-400">{i + 1}</span>
              <span className="block font-semibold text-stone-900 dark:text-white">{t(step.label)}</span>
              <span className="block text-xs text-stone-500 dark:text-stone-400">{t(step.detail)}</span>
            </li>
          </Fragment>
        ))}
      </ol>
      <p className="mt-3 flex items-start gap-2 rounded-lg border border-dashed border-amber-300 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-700/60 dark:bg-amber-950/30 dark:text-amber-200">
        <Icon name="loop" className="mt-0.5 size-4 shrink-0" />
        {t(ui.pipelineLoop)}
      </p>
    </figure>
  )
}

function ProjectCard({ project }: { project: Project }) {
  const { t } = useLang()
  return (
    <Card className="flex h-full flex-col sm:p-8">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
        <h3 className="text-2xl font-bold text-stone-900 dark:text-white">{project.name}</h3>
        <span className="text-sm font-medium text-stone-500 dark:text-stone-400">{t(project.period)}</span>
      </div>
      <p className="mt-1 font-medium text-emerald-700 dark:text-emerald-400">{t(project.subtitle)}</p>
      {project.role && <p className="mt-1 text-sm text-stone-500 dark:text-stone-400">{t(project.role)}</p>}
      <p className="mt-4 text-stone-700 dark:text-stone-300">{t(project.summary)}</p>

      {project.showPipeline && <Pipeline />}

      <ul className="mt-6 space-y-3">
        {project.highlights.map((item) => (
          <li key={item.en} className="flex gap-3 text-stone-700 dark:text-stone-300">
            <Icon name="check" className="mt-1 size-4 shrink-0 text-emerald-600 dark:text-emerald-400" />
            <span>{t(item)}</span>
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <ul className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <li key={tag}>
              <Tag>{tag}</Tag>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
          {project.video && (
            <a
              href={project.video}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-4 py-2 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
            >
              <Icon name="play" className="size-4" />
              {t(ui.watchDemo)}
            </a>
          )}
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-800 hover:underline dark:text-emerald-400 dark:hover:text-emerald-300"
          >
            <Icon name="github" className="size-4" />
            {t(ui.viewCode)}
            <Icon name="external" className="size-3.5" />
          </a>
        </div>
      </div>
    </Card>
  )
}

export function Projects() {
  const { t } = useLang()
  return (
    <Section id="projects" eyebrow={t(ui.projectsEyebrow)} title={t(ui.projectsTitle)} intro={t(ui.projectsIntro)}>
      <div className="grid gap-6">
        {projects.map((project) => (
          <Reveal key={project.name}>
            <ProjectCard project={project} />
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
