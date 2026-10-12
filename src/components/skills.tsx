import { useLang } from '../lib/i18n'
import { skills } from '../data/profile'
import { ui } from '../data/ui'
import { Card, Reveal, Section, Tag } from './section'

export function Skills() {
  const { t } = useLang()
  return (
    <Section id="skills" eyebrow={t(ui.skillsEyebrow)} title={t(ui.skillsTitle)}>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {skills.map((group) => (
          <Reveal key={group.group.en}>
            <Card className="h-full p-5">
              <h3 className="font-semibold text-stone-900 dark:text-white">{t(group.group)}</h3>
              <ul className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item}>
                    <Tag>{item}</Tag>
                  </li>
                ))}
              </ul>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}
