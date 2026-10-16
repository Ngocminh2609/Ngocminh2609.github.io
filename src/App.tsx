import type { ComponentType } from 'react'
import { LangProvider } from './lib/i18n'
import { profile } from './data/profile'
import { SECTION_IDS, type SectionId } from './data/ui'
import { Header } from './components/header'
import { Hero } from './components/hero'
import { Solutions } from './components/solutions'
import { Projects } from './components/projects'
import { Experience } from './components/experience'
import { Skills } from './components/skills'
import { Approach } from './components/approach'
import { Contact } from './components/contact'
import { Footer } from './components/footer'

// Page order follows SECTION_IDS (the menu order); the Record type makes a missing section a compile error.
const SECTIONS: Record<SectionId, ComponentType> = {
  experience: Experience,
  projects: Projects,
  solutions: Solutions,
  skills: Skills,
  approach: Approach,
  contact: Contact,
}

export default function App() {
  return (
    <LangProvider title={profile.pageTitle}>
      <Header />
      <main id="main">
        <Hero />
        {SECTION_IDS.map((id) => {
          const C = SECTIONS[id]
          return <C key={id} />
        })}
      </main>
      <Footer />
    </LangProvider>
  )
}
