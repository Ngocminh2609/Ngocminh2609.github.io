# Profile page refresh: 2026 layout, bilingual Vietnamese–English

## Bối cảnh
[Unverified] The request asks for a format based on "various reputable sources" and "the latest format for 2026". I could not check any outside source in this stage. Every structural choice below that does not come from the request or the code is marked (giả định).

All paths are relative to the FE folder `D:\Source_Code\My_Project\My_Profile`. There is no BE folder, and this feature does not need one.

- **What already exists.** The repo is already a bilingual EN/VI single-page profile for Đỗ Ngọc Minh, built with React 19, Vite 8, TypeScript and Tailwind CSS 4 (`README.md`, `package.json`).
- **Page structure.** `src/App.tsx` renders these parts in order: `Header`, `Hero`, `Solutions`, `Projects`, `Experience`, `Skills`, `Approach` (which also shows education, certification and languages), `Contact`, `Footer`. Each one is a file in `src/components/`.
- **Content.**
  - All profile facts are in `src/data/profile.ts`: name, role, focus, intro, links, stats, solutions, projects, pipeline steps, experience at FPT-IS, skills, approach, education, certification and languages.
  - A comment at the top of that file says the facts must match `public/Do-Ngoc-Minh-CV.pdf`.
  - All interface text (menu, headings, buttons) is in `src/data/ui.ts`.
- **Language.** `src/lib/i18n.tsx` provides the `Text = { en, vi }` type, `LangProvider` and `useLang`.
  - The first language comes from the browser (`vi*` gives VI, anything else gives EN). The choice is saved in `localStorage` through `src/lib/storage.ts`.
  - When the language changes, `<html lang>` and `document.title` are updated.
  - The EN/VI switch is the `LangSwitch` component in `src/components/header.tsx`.
- **Other existing behaviour.**
  - Light/dark theme: `src/lib/use-theme.ts`, plus a script in `index.html` that applies the theme before the page first paints.
  - Highlighting the menu item for the section in view: `src/lib/use-active-section.ts`.
  - Mobile menu that closes with Escape, and a "Skip to content" link: `src/components/header.tsx`.
  - Fade-in on scroll that is turned off under reduced motion: `Reveal` in `src/components/section.tsx`.
- **Static metadata.** The `description` and `og:*` tags in `index.html` are written in English only, and they do not change when the language changes.
- **Hosting.** The two files disagree. `.github/workflows/deploy.yml` deploys to GitHub Pages, while `README.md` says to deploy on Vercel.
- **Files I could not open.** The project index lists no `public/` folder. I could not confirm that `public/avatar.jpg`, `public/Do-Ngoc-Minh-CV.pdf` or `public/favicon.svg` exist.

## Yêu cầu
- The profile page is rewritten with a new layout and new wording that reads as current for 2026 (giả định: what "2026 format" means is listed under "Câu hỏi mở").
- Every piece of text on the page, both content and interface, can be shown in Vietnamese and in English.
- The visitor can switch between the two languages at any time. The choice is kept after a page reload, as it is today.
- The top of the page (first screen, no scrolling) shows (giả định):
  - name
  - role
  - a short summary of what the owner does
  - location
  - a way to contact the owner
  - a way to download the CV
- The page states no new facts about the owner: no new employer, project, number, date, certificate or skill. Everything shown comes from what is in `src/data/profile.ts` today, or from information the owner supplies during review (giả định: "full discretion" covers layout and wording, not facts).
- Every section can be reached from the menu, on desktop and on mobile.
- Features that work today keep working:
  - light/dark mode
  - highlighting the menu item for the section in view
  - "Skip to content"
  - closing the mobile menu with Escape
  - opening external links (GitHub, GitLab, LinkedIn, project repos, demo video)
  - copying the email address and sending an email
  - downloading the CV
- The browser tab title changes to match the selected language, as it does today.
- The page can be read on a phone-width screen without scrolling sideways (giả định).

## Ràng buộc
- Profile facts go in `src/data/profile.ts`, and interface text goes in `src/data/ui.ts`. Components do not contain hard-coded text. Evidence: the comment in `src/data/ui.ts` and the "Sửa nội dung" (content editing) table in `README.md`.
- Every piece of text is a `Text` value `{ en, vi }` and is shown with `t()` from `useLang()` (`src/lib/i18n.tsx`).
- Facts stay in line with `public/Do-Ngoc-Minh-CV.pdf`. Evidence: the comment on line 1 of `src/data/profile.ts`.
- Sections reuse `Section`, `Card`, `Tag` and `Reveal` from `src/components/section.tsx`. Icons come from `Icon` / `IconName` in `src/components/icon.tsx`.
- Section ids come from `SECTION_IDS` and the menu labels from `nav` in `src/data/ui.ts`, which `src/components/header.tsx` uses.
- Styling uses Tailwind CSS 4 utility classes, with a `dark:` variant for each colour. Evidence: `src/components/header.tsx` and `src/components/hero.tsx`.
- Component files are named in kebab-case and are lower-case under `src/components/`. Hooks follow the `use-*.ts` pattern under `src/lib/`.
- Only two runtime dependencies exist today, `react` and `react-dom` (`package.json`). (giả định) No new library is added unless the reviewer agrees.
- The build is `npm run build` (`tsc && vite build`) and it must pass. Evidence: `package.json` and `.github/workflows/deploy.yml`.
- Existing accessibility patterns are kept: `aria-label`, `aria-pressed`, `aria-expanded`, `aria-current`, the skip link and reduced motion. Evidence: `src/components/header.tsx` and `src/components/section.tsx`.

## Tiêu chí nghiệm thu
- [ ] Open the page with the browser language set to Vietnamese. All visible text is in Vietnamese, the tab title is "Đỗ Ngọc Minh · Kỹ sư phần mềm Full-stack", and `<html lang>` is `vi`.
- [ ] Open the page with the browser language set to English. All visible text is in English, the tab title is "Do Ngoc Minh · Full-stack Software Engineer", and `<html lang>` is `en`.
- [ ] Click "EN" while the page is in Vietnamese. Every section changes to English. Reload the page, and it is still in English.
- [ ] Click "VI" while the page is in English. Every section changes to Vietnamese, and no English sentence remains apart from technology names and proper names (giả định).
- [ ] At a 1280px-wide window, without scrolling, these are visible: name, role, summary, location, the "Download CV" / "Tải CV" button and at least one contact link.
- [ ] Click "Download CV". The browser downloads `Do-Ngoc-Minh-CV.pdf`.
- [ ] Click each item in the desktop menu. The page scrolls to that section, and that menu item is highlighted.
- [ ] At a 375px-wide window, open the mobile menu, then click a menu item. The page scrolls to that section and the menu closes.
- [ ] At a 375px-wide window, open the mobile menu, then press Escape. The menu closes.
- [ ] At a 375px-wide window, scroll the whole page. There is no horizontal scrollbar.
- [ ] Click the light/dark mode button. The colours change. Reload the page, and the same mode is still applied.
- [ ] Press Tab once on page load. "Skip to content" / "Bỏ qua, đến nội dung" appears. Press Enter, and focus moves to the main content.
- [ ] Click "Copy email" / "Sao chép email". "Copied!" / "Đã sao chép!" is shown.
- [ ] Click the GitHub, GitLab and LinkedIn links and each project's "View source" link. Each one opens the correct address in a new tab.
- [ ] Compare the page with `src/data/profile.ts` as it is at commit `cc670fcd`. All of these match the original or the version the owner approved during review:
  - every company name
  - every project name
  - every date range
  - every number: 1.5+, 1,300+, 800+, 30→72%, −97%
  - education
  - certification
- [ ] If the avatar image fails to load, the owner's initials are shown in its place (current behaviour of `Avatar` in `src/components/hero.tsx`).

## Câu hỏi mở
1. **Sources and format.** Which "reputable sources" or which "2026 format" do you mean, for example a specific template, site or guideline? Without this, I have to assume the structure myself.
2. **How the two languages are shown.** Should "bilingual" stay as an EN/VI switch, as it is today, or should both languages appear on screen together, side by side or one under the other?
3. **Which sections to keep.** Should all current sections stay: Solutions, Projects, Experience, Skills, Approach (with education/languages) and Contact? Should any be merged, removed, or reordered? For example, should Experience come before Projects?
4. **What "full discretion" covers.** Can I rewrite only the wording, or also change facts and numbers, for example updating "1.5+ years" as of 10/2026? If facts change, who updates `public/Do-Ngoc-Minh-CV.pdf` to match?
5. **Visual identity.** Should the visual identity change? Today it uses an emerald colour, the Be Vietnam Pro font and the "M" logo.
6. **Things that may be needed but were not asked for.** Should any of these be added?
   - an "Open to work" / availability status
   - a separate About / Summary section
   - a print view or a printable one-page CV
   - Vietnamese SEO metadata (`description`, `og:*`), since today it is English only in `index.html`
   - structured data for search engines
   - a contact form
7. **Hosting.** Is the site deployed on GitHub Pages (`.github/workflows/deploy.yml`) or on Vercel (`README.md`)? This decides whether resource paths such as `/avatar.jpg` and `/Do-Ngoc-Minh-CV.pdf` need a subpath.
8. **Missing files.** Do `public/avatar.jpg`, `public/Do-Ngoc-Minh-CV.pdf` and `public/favicon.svg` exist in the repo? They are not in the project index.
9. **Demo video.** The Tech Nova demo link points to a Google Drive folder. Should it stay, given that `src/data/profile.ts` notes the live servers are down?
