import { defineConfig, devices } from '@playwright/test'

const PORT = Number(process.env.E2E_PORT ?? 57306)
const BASE_URL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: BASE_URL,
    ...devices['Desktop Chrome'],
    viewport: { width: 1280, height: 720 },
  },
  webServer: [
    {
      // Production build (tsc && vite build) served by vite preview: same artefact CI deploys.
      command: `npm run build && npx vite preview --port ${PORT} --strictPort --host localhost`,
      url: BASE_URL,
      reuseExistingServer: false,
      timeout: 180_000,
    },
  ],
})
