// Written by aidev for its own E2E check — the project's Playwright config, with evidence capture forced on.
// Rewritten on every run; safe to delete.
import { defineConfig } from "@playwright/test";
import projectConfig from "./playwright.config";

export default defineConfig({
  ...projectConfig,
  outputDir: "F:\\Dev\\sources\\claude-sdlc-agents\\runs\\2026-10-16T07-57-42-098Z-My_Profile-2026-10-16-drawing-from-various-reputable-sources-please-rew\\e2e-evidence\\results",
  reporter: [
    ["list"],
    ["json", { outputFile: "F:\\Dev\\sources\\claude-sdlc-agents\\runs\\2026-10-16T07-57-42-098Z-My_Profile-2026-10-16-drawing-from-various-reputable-sources-please-rew\\e2e-evidence\\results.json" }],
    ["html", { outputFolder: "F:\\Dev\\sources\\claude-sdlc-agents\\runs\\2026-10-16T07-57-42-098Z-My_Profile-2026-10-16-drawing-from-various-reputable-sources-please-rew\\e2e-evidence\\report", open: "never" }],
  ],
  use: { ...projectConfig.use, trace: "on", screenshot: "on", video: "on" },
});
