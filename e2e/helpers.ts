import type { Page } from '@playwright/test'
import * as profileData from '../src/data/profile'
import * as uiData from '../src/data/ui'

export type T = { en: string; vi: string }
export const { profile, stats, projects, experience, background } = profileData
export const { ui, nav, SECTION_IDS } = uiData

const isText = (v: unknown): v is T =>
  !!v && typeof v === 'object' && Object.keys(v).sort().join() === 'en,vi' &&
  typeof (v as T).en === 'string' && typeof (v as T).vi === 'string'

/** Every bilingual Text value in the data modules, with its path. */
export function allTexts(): { path: string; text: T }[] {
  const out: { path: string; text: T }[] = []
  const walk = (v: unknown, path: string) => {
    if (isText(v)) return void out.push({ path, text: v })
    if (Array.isArray(v)) return v.forEach((x, i) => walk(x, `${path}[${i}]`))
    if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) walk(x, `${path}.${k}`)
  }
  for (const [k, v] of Object.entries(profileData)) walk(v, k)
  walk(uiData.ui, 'ui')
  walk(uiData.nav, 'nav')
  return out
}

/** Plain (non-Text) strings in the data: proper names, tags, handles. */
export function plainStrings(): string[] {
  const out: string[] = []
  const walk = (v: unknown) => {
    if (isText(v)) return
    if (typeof v === 'string') return void out.push(v)
    if (Array.isArray(v)) return v.forEach(walk)
    if (v && typeof v === 'object') Object.values(v).forEach(walk)
  }
  walk(profileData)
  return out
}

/** Texts that are only rendered in one state (title, after-click, toggled labels). */
export const STATEFUL = new Set(['profile.pageTitle', 'ui.copied', 'ui.toLight', 'ui.toDark', 'ui.openMenu', 'ui.closeMenu'])

/** Everything the page exposes as text: textContent + accessible-name attributes. */
export async function pageCorpus(page: Page): Promise<string> {
  return page.evaluate(() => {
    const attrs = [...document.querySelectorAll('[aria-label],[title],[alt]')].flatMap((el) =>
      ['aria-label', 'title', 'alt'].map((a) => el.getAttribute(a) ?? ''),
    )
    return [document.body.textContent ?? '', ...attrs].join('\n').replace(/\s+/g, ' ')
  })
}

export const norm = (s: string) => s.replace(/\s+/g, ' ')

export async function gotoFresh(page: Page, path = '/') {
  await page.goto(path)
  await page.locator('#main').waitFor()
}
