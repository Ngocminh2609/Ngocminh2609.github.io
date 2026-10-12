import { LangProvider } from './lib/i18n'
import { profile } from './data/profile'
import { Header } from './components/header'
import { Hero } from './components/hero'
import { Solutions } from './components/solutions'
import { Projects } from './components/projects'
import { Experience } from './components/experience'
import { Skills } from './components/skills'
import { Approach } from './components/approach'
import { Contact } from './components/contact'
import { Footer } from './components/footer'

export default function App() {
  return (
    <LangProvider title={profile.pageTitle}>
      <Header />
      <main id="main">
        <Hero />
        <Solutions />
        <Projects />
        <Experience />
        <Skills />
        <Approach />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  )
}
