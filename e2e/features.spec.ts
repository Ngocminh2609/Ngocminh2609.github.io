import { execSync } from 'node:child_process'
import { test, expect } from './aidev-guard'
import { profile, projects, ui, experience, background, stats, norm, pageCorpus } from './helpers'

test.describe('theme', () => {
  test.use({ colorScheme: 'light', locale: 'en-US' })

  test('AC11: theme toggle changes colours and persists after reload', async ({ page }) => {
    await page.goto('/')
    const bg = () => page.evaluate(() => getComputedStyle(document.body).backgroundColor)
    const html = page.locator('html')
    await expect(html).not.toHaveClass(/\bdark\b/)
    const lightBg = await bg()

    await page.getByRole('button', { name: ui.toDark.en }).click()
    await expect(html).toHaveClass(/\bdark\b/)
    await expect.poll(bg).not.toBe(lightBg)
    const darkBg = await bg()
    await page.reload()
    await expect(html).toHaveClass(/\bdark\b/)
    await expect.poll(bg).toBe(darkBg)

    await page.getByRole('button', { name: ui.toLight.en }).click()
    await expect(html).not.toHaveClass(/\bdark\b/)
    await page.reload()
    await expect(html).not.toHaveClass(/\bdark\b/)
    await expect.poll(bg).toBe(lightBg)
  })
})

for (const [lang, locale] of [['en', 'en-US'], ['vi', 'vi-VN']] as const) {
  test.describe(`keyboard + clipboard [${lang}]`, () => {
    test.use({ locale })

    test(`AC12: first Tab shows the skip link, Enter moves focus to main content [${lang}]`, async ({ page }) => {
      await page.goto('/')
      await page.locator('#main').waitFor()
      await page.keyboard.press('Tab')
      const skip = page.getByRole('link', { name: ui.skipToContent[lang] })
      await expect(skip).toBeFocused()
      await expect(skip).toBeVisible()
      const box = await skip.boundingBox()
      expect(box!.width).toBeGreaterThan(20)
      await page.keyboard.press('Enter')
      await expect(page).toHaveURL(/#main$/)
      // Sequential focus now continues from <main>: the next Tab lands inside it, not back in the header.
      await page.keyboard.press('Tab')
      const inMain = await page.evaluate(() => !!document.activeElement?.closest('#main'))
      expect(inMain).toBe(true)
    })

    test(`AC13: Copy email shows the copied confirmation and copies the address [${lang}]`, async ({ page, context }) => {
      await context.grantPermissions(['clipboard-read', 'clipboard-write'])
      await page.goto('/')
      const contact = page.locator('#contact')
      const btn = contact.getByRole('button', { name: ui.copyEmail[lang] })
      await btn.scrollIntoViewIfNeeded()
      await btn.click()
      await expect(contact.getByText(ui.copied[lang], { exact: true })).toBeVisible()
      expect(await page.evaluate(() => navigator.clipboard.readText())).toBe(profile.email)
      const send = contact.getByRole('link', { name: ui.sendEmail[lang] })
      await expect(send).toHaveAttribute('href', `mailto:${profile.email}`)
      await expect(contact.getByRole('link', { name: profile.email })).toHaveAttribute('href', `mailto:${profile.email}`)
    })
  })
}

test('AC14: GitHub, GitLab, LinkedIn, project source and demo links open the right URL in a new tab', async ({ page, context }) => {
  // External sites are stubbed so the test checks the address the tab opens, not third-party uptime.
  await context.route(/^https:\/\/(github\.com|gitlab\.com|www\.linkedin\.com|drive\.google\.com)\//, (r) =>
    r.fulfill({ status: 200, contentType: 'text/html', body: '<title>stub</title>' }),
  )
  await page.goto('/')
  const targets: { loc: ReturnType<typeof page.locator>; href: string; label: string }[] = []
  for (const scope of ['#top', '#contact']) {
    for (const l of profile.links) {
      targets.push({ loc: page.locator(scope).getByRole('link', { name: l.label }), href: l.href, label: `${scope} ${l.label}` })
    }
  }
  const projectSection = page.locator('#projects')
  const sourceLinks = projectSection.getByRole('link', { name: /View source|Xem mã nguồn/ })
  await expect(sourceLinks).toHaveCount(projects.length)
  projects.forEach((p, i) => targets.push({ loc: sourceLinks.nth(i), href: p.repo, label: `${p.name} source` }))
  for (const p of projects.filter((x) => x.video)) {
    targets.push({ loc: projectSection.getByRole('link', { name: /Watch demo video|Xem video demo/ }), href: p.video!, label: `${p.name} demo` })
  }

  for (const t of targets) {
    await expect(t.loc, t.label).toHaveCount(1)
    await expect(t.loc, t.label).toHaveAttribute('target', '_blank')
    await expect(t.loc, t.label).toHaveAttribute('href', t.href)
    await t.loc.scrollIntoViewIfNeeded()
    const [popup] = await Promise.all([context.waitForEvent('page'), t.loc.click()])
    await popup.waitForLoadState()
    expect(popup.url(), t.label).toBe(t.href)
    await popup.close()
  }
})

test('AC15: company, projects, dates, numbers, education and certification match profile.ts at cc670fcd', async ({ page }) => {
  const baseline = execSync('git show cc670fcd:src/data/profile.ts', { encoding: 'utf8' })
  const facts = [
    experience.company,
    ...projects.map((p) => p.name),
    '08/2026', '02/2026 – 08/2026', '02/2025', '07/2026', '02/2025 – 06/2026', '2020 – 2025',
    '1.5+', '1,300+', '800+', '30→72%', '−97%',
    background.education.school.en, background.education.degree.en,
    background.certification.name, background.certification.issuer.en,
  ]
  // Ranges are built with range()/since() in the source, so check their endpoints as literals.
  const atoms = facts.flatMap((f) => (/^\d{2}\/\d{4} – \d{2}\/\d{4}$/.test(f) ? f.split(' – ') : [f]))
  for (const f of atoms) expect(baseline, `fact "${f}" exists at cc670fcd`).toContain(f)
  expect(baseline).toContain("range('02/2026', '08/2026')")
  expect(baseline).toContain("range('02/2025', '06/2026')")
  expect(baseline).toContain("since('08/2026')")
  expect(baseline).toContain("since('07/2026')")
  expect(baseline).toContain("since('02/2025')")
  // The current data module must hold the same stats values as the baseline.
  for (const s of stats) expect(baseline).toContain(`value: '${s.value}'`)

  await page.goto('/')
  await page.getByRole('button', { name: /^en$/i }).click()
  const corpus = await pageCorpus(page)
  for (const f of facts) expect(corpus, `page shows "${f}"`).toContain(norm(f))
  for (const p of projects) expect(corpus).toContain(norm(p.period.en))
  for (const e of experience.engagements) {
    expect(corpus).toContain(norm(e.name.en))
    expect(corpus).toContain(norm(e.period.en))
  }
  expect(corpus).toContain(norm(experience.period.en))
  expect(corpus).toContain('07/2026')
})

test.describe('avatar', () => {
  test('AC16: avatar failing to load shows the initials instead', async ({ page }) => {
    await page.route('**/avatar.jpg', (r) => r.fulfill({ status: 404, body: '' }))
    await page.goto('/')
    const hero = page.locator('#top')
    await expect(hero.locator('img')).toHaveCount(0)
    await expect(hero.getByText('DNM', { exact: true })).toBeVisible()
  })

  test('AC16 (control): avatar image loads normally when available', async ({ page }) => {
    await page.goto('/')
    const img = page.locator('#top img')
    await expect(img).toBeVisible()
    await expect.poll(() => img.evaluate((el: HTMLImageElement) => el.complete && el.naturalWidth)).toBeGreaterThan(0)
  })
})
