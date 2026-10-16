import { test, expect } from './aidev-guard'
import type { Page } from '@playwright/test'
import { allTexts, plainStrings, pageCorpus, STATEFUL, norm, profile, SECTION_IDS, nav } from './helpers'

type Lang = 'en' | 'vi'
const other = (l: Lang): Lang => (l === 'en' ? 'vi' : 'en')

/** Asserts every bilingual string is shown in `lang` and none of the other language's version remains. */
async function expectAllIn(page: Page, lang: Lang) {
  const corpus = await pageCorpus(page)
  const texts = allTexts().filter((x) => !STATEFUL.has(x.path) && x.text.en !== x.text.vi)
  const missing = texts.filter((x) => !corpus.includes(norm(x.text[lang]))).map((x) => `${x.path}: ${x.text[lang]}`)
  expect(missing, `strings missing in ${lang}`).toEqual([])

  // A string from the other language counts as leftover only if it cannot be explained as part of
  // this language's text or a proper name / tech tag (e.g. "Back end" is identical in both).
  const allowed = [...allTexts().map((x) => norm(x.text[lang])), ...plainStrings()].join('\n')
  const leftovers = texts
    .map((x) => ({ path: x.path, s: norm(x.text[other(lang)]) }))
    .filter(({ s }) => !allowed.includes(s) && corpus.includes(s))
    .map(({ path, s }) => `${path}: ${s}`)
  expect(leftovers, `${other(lang)} strings left on a ${lang} page`).toEqual([])
}

test.describe('browser language = Vietnamese', () => {
  test.use({ locale: 'vi-VN' })

  test('AC1: opens in Vietnamese with VI title and <html lang="vi">', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('Đỗ Ngọc Minh · Kỹ sư phần mềm Full-stack')
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    await expect(page.getByRole('button', { name: /^vi$/i })).toHaveAttribute('aria-pressed', 'true')
    await expectAllIn(page, 'vi')
  })

  test('AC3: clicking EN switches every section to English and survives reload', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    await page.getByRole('button', { name: /^en$/i }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page).toHaveTitle(profile.pageTitle.en)
    for (const id of SECTION_IDS) {
      await expect(page.locator(`#${id}-title`)).toBeAttached()
    }
    await expect(page.getByRole('navigation').first().getByRole('link', { name: nav.experience.en })).toBeAttached()
    await expectAllIn(page, 'en')

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page).toHaveTitle('Do Ngoc Minh · Full-stack Software Engineer')
    await expectAllIn(page, 'en')
  })
})

test.describe('browser language = English', () => {
  test.use({ locale: 'en-US' })

  test('AC2: opens in English with EN title and <html lang="en">', async ({ page }) => {
    await page.goto('/')
    await expect(page).toHaveTitle('Do Ngoc Minh · Full-stack Software Engineer')
    await expect(page.locator('html')).toHaveAttribute('lang', 'en')
    await expect(page.getByRole('button', { name: /^en$/i })).toHaveAttribute('aria-pressed', 'true')
    await expectAllIn(page, 'en')
  })

  test('AC4: clicking VI switches every section to Vietnamese with no English sentence left', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: /^vi$/i }).click()
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    await expect(page).toHaveTitle('Đỗ Ngọc Minh · Kỹ sư phần mềm Full-stack')
    await expectAllIn(page, 'vi')

    await page.reload()
    await expect(page.locator('html')).toHaveAttribute('lang', 'vi')
    await expectAllIn(page, 'vi')
  })
})
