import { test, expect } from './aidev-guard'
import type { Page } from '@playwright/test'
import { profile, ui, nav, SECTION_IDS } from './helpers'

type Lang = 'en' | 'vi'

/** Element is visible and lies fully inside the current viewport (no scrolling needed). */
async function expectAboveFold(page: Page, sel: ReturnType<Page['locator']>, label: string) {
  await expect(sel, label).toBeVisible()
  const box = await sel.boundingBox()
  const vp = page.viewportSize()!
  expect(box, label).not.toBeNull()
  expect(box!.y, `${label} top`).toBeGreaterThanOrEqual(0)
  expect(box!.y + box!.height, `${label} bottom (viewport ${vp.height})`).toBeLessThanOrEqual(vp.height)
  expect(box!.x + box!.width, `${label} right`).toBeLessThanOrEqual(vp.width)
}

for (const lang of ['en', 'vi'] as Lang[]) {
  test.describe(`first screen 1280x720 [${lang}]`, () => {
    test.use({ locale: lang === 'vi' ? 'vi-VN' : 'en-US', viewport: { width: 1280, height: 720 } })

    test(`AC5: name, role, summary, location, Download CV and a contact link are above the fold [${lang}]`, async ({ page }) => {
      await page.goto('/')
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
      expect(await page.evaluate(() => window.scrollY)).toBe(0)
      const hero = page.locator('#top')
      await expectAboveFold(page, hero.getByRole('heading', { level: 1, name: profile.name[lang] }), 'name')
      await expectAboveFold(page, hero.getByText(profile.role[lang], { exact: true }), 'role')
      await expectAboveFold(page, hero.getByText(profile.focus[lang], { exact: true }), 'focus')
      await expectAboveFold(page, hero.getByText(profile.intro[lang], { exact: true }), 'summary/intro')
      await expectAboveFold(page, hero.getByText(profile.location[lang], { exact: true }), 'location')
      const cv = hero.getByRole('link', { name: ui.downloadCv[lang] })
      await expectAboveFold(page, cv, 'Download CV')
      await expect(cv).toHaveAttribute('href', profile.cv)
      await expect(cv).toHaveAttribute('download', /.*/)
      const email = hero.getByRole('link', { name: ui.emailMe[lang] })
      await expectAboveFold(page, email, 'Email me')
      await expect(email).toHaveAttribute('href', `mailto:${profile.email}`)
      await expectAboveFold(page, hero.getByRole('link', { name: 'LinkedIn' }), 'LinkedIn icon')
    })
  })
}

test('AC6: clicking Download CV downloads Do-Ngoc-Minh-CV.pdf', async ({ page }) => {
  await page.goto('/')
  const [download] = await Promise.all([
    page.waitForEvent('download'),
    page.locator('#top').getByRole('link', { name: /Download CV|Tải CV/ }).click(),
  ])
  expect(download.suggestedFilename()).toBe('Do-Ngoc-Minh-CV.pdf')
  const path = await download.path()
  const fs = await import('node:fs')
  const head = fs.readFileSync(path).subarray(0, 5).toString()
  expect(head).toBe('%PDF-')
})

test.describe('desktop menu 1280x720', () => {
  test.use({ locale: 'en-US', viewport: { width: 1280, height: 720 } })

  test('AC7: each desktop menu item scrolls to its section and is highlighted', async ({ page }) => {
    await page.goto('/')
    const menu = page.getByRole('navigation', { name: ui.primaryNav.en })
    await expect(menu).toBeVisible()
    await expect(menu.getByRole('link')).toHaveText(SECTION_IDS.map((id) => nav[id].en))
    // Page order must follow menu order.
    const order = await page.evaluate(
      (ids) => ids.map((id) => document.getElementById(id)!.getBoundingClientRect().top + window.scrollY),
      [...SECTION_IDS],
    )
    expect([...order].sort((a, b) => a - b)).toEqual(order)

    for (const id of SECTION_IDS) {
      const link = menu.getByRole('link', { name: nav[id].en, exact: true })
      await link.click()
      await expect(page).toHaveURL(new RegExp(`#${id}$`))
      await expect
        .poll(async () => page.evaluate((i) => Math.round(document.getElementById(i)!.getBoundingClientRect().top), id), {
          message: `#${id} scrolled into view`,
        })
        .toBeLessThan(200)
      await expect(link, `${id} highlighted`).toHaveAttribute('aria-current', 'true')
      await expect(menu.locator('[aria-current="true"]')).toHaveCount(1)
    }
  })
})

test.describe('mobile 375px', () => {
  test.use({ locale: 'vi-VN', viewport: { width: 375, height: 740 }, hasTouch: true, isMobile: true })

  test('AC8: opening the mobile menu and clicking each item scrolls there and closes the menu', async ({ page }) => {
    await page.goto('/')
    await expect(page.getByRole('navigation', { name: ui.primaryNav.vi }).first()).toBeHidden()
    for (const id of SECTION_IDS) {
      const burger = page.getByRole('button', { name: ui.openMenu.vi })
      await burger.click()
      await expect(page.getByRole('button', { name: ui.closeMenu.vi })).toHaveAttribute('aria-expanded', 'true')
      const mobileNav = page.locator('#mobile-nav')
      await expect(mobileNav).toBeVisible()
      await expect(mobileNav).toHaveAttribute('aria-label', ui.primaryNav.vi)
      await mobileNav.getByRole('link', { name: nav[id].vi, exact: true }).click()
      await expect(mobileNav).toHaveCount(0)
      await expect(page.getByRole('button', { name: ui.openMenu.vi })).toHaveAttribute('aria-expanded', 'false')
      await expect(page).toHaveURL(new RegExp(`#${id}$`))
      await expect
        .poll(async () => page.evaluate((i) => Math.round(document.getElementById(i)!.getBoundingClientRect().top), id), {
          message: `#${id} scrolled into view`,
        })
        .toBeLessThan(200)
    }
  })

  test('AC9: Escape closes the open mobile menu', async ({ page }) => {
    await page.goto('/')
    await page.getByRole('button', { name: ui.openMenu.vi }).click()
    await expect(page.locator('#mobile-nav')).toBeVisible()
    await page.keyboard.press('Escape')
    await expect(page.locator('#mobile-nav')).toHaveCount(0)
    await expect(page.getByRole('button', { name: ui.openMenu.vi })).toHaveAttribute('aria-expanded', 'false')
  })

  for (const lang of ['vi', 'en'] as Lang[]) {
    test(`AC10: no horizontal scrollbar anywhere on the page at 375px [${lang}]`, async ({ page }) => {
      await page.goto('/')
      if (lang === 'en') await page.getByRole('button', { name: /^en$/i }).click()
      await expect(page.locator('html')).toHaveAttribute('lang', lang)
      const total = await page.evaluate(() => document.documentElement.scrollHeight)
      for (let y = 0; y <= total; y += 300) {
        await page.evaluate((yy) => window.scrollTo(0, yy), y)
        const { sw, cw, sx } = await page.evaluate(() => ({
          sw: document.documentElement.scrollWidth,
          cw: document.documentElement.clientWidth,
          sx: window.scrollX,
        }))
        expect(sw, `scrollWidth at y=${y}`).toBeLessThanOrEqual(cw)
        expect(sx).toBe(0)
      }
      await page.evaluate(() => window.scrollTo(0, 0))
      await page.getByRole('button', { name: lang === 'vi' ? ui.openMenu.vi : ui.openMenu.en }).click()
      expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBeLessThanOrEqual(375)
    })
  }
})
