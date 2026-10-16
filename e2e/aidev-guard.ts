// Written by aidev before every E2E run, and rewritten before its own check — edits here are discarded.
// Import `test` and `expect` from this file in every E2E test. A test fails when, while it ran, an API
// call to the app (fetch/XHR to localhost) answered 5xx, failed at the network level, or answered a 4xx
// the test did not declare with apiGuard.allow(), or when the page threw an uncaught error.
import { test as base, expect, type Page, type Request } from "@playwright/test";

export { expect };

export interface ApiProblem {
  kind: "http" | "network" | "page-error";
  method?: string;
  url: string;
  status?: number;
  message?: string;
}

export interface ApiGuard {
  /**
   * Declares an error response this test provokes on purpose, e.g. allow(400, /\/api\/units/) in a
   * "rejects an invalid code" test. Only 4xx can be allowed: a 5xx is always a defect.
   */
  allow(status: number, url?: RegExp | string): void;
}

interface GuardState {
  problems: ApiProblem[];
  allowed: { status: number; url?: RegExp | string }[];
}

const LOOPBACK = new Set(["localhost", "127.0.0.1", "[::1]", "::1"]);

function isAppApiCall(request: Request): boolean {
  if (!["fetch", "xhr"].includes(request.resourceType())) return false;
  try {
    return LOOPBACK.has(new URL(request.url()).hostname);
  } catch {
    return false;
  }
}

function matches(pattern: RegExp | string | undefined, url: string): boolean {
  if (pattern === undefined) return true;
  return typeof pattern === "string" ? url.includes(pattern) : pattern.test(url);
}

function describe(problem: ApiProblem): string {
  if (problem.kind === "http") return `  ${problem.method} ${problem.url} -> HTTP ${problem.status}`;
  if (problem.kind === "network") return `  ${problem.method} ${problem.url} -> ${problem.message}`;
  return `  page error on ${problem.url}: ${problem.message}`;
}

export const test = base.extend<{ apiGuard: ApiGuard; aidevGuardState: GuardState; aidevGuard: void }>({
  aidevGuardState: async ({}, use) => {
    await use({ problems: [], allowed: [] });
  },

  apiGuard: async ({ aidevGuardState }, use) => {
    await use({
      allow(status, url) {
        if (status >= 500) throw new Error("apiGuard.allow: a 5xx response cannot be allowed — it is always a defect.");
        aidevGuardState.allowed.push({ status, url });
      },
    });
  },

  aidevGuard: [
    async ({ context, aidevGuardState: state }, use, testInfo) => {
      context.on("response", (response) => {
        const request = response.request();
        if (!isAppApiCall(request) || response.status() < 400) return;
        state.problems.push({ kind: "http", method: request.method(), url: request.url(), status: response.status() });
      });
      context.on("requestfailed", (request) => {
        if (!isAppApiCall(request)) return;
        const message = request.failure()?.errorText ?? "request failed";
        // Leaving a page cancels its in-flight calls; that is navigation, not a failing API.
        if (/ERR_ABORTED|NS_BINDING_ABORTED|cancelled/i.test(message)) return;
        state.problems.push({ kind: "network", method: request.method(), url: request.url(), message });
      });
      const watch = (page: Page) =>
        page.on("pageerror", (error) => state.problems.push({ kind: "page-error", url: page.url(), message: error.message }));
      context.pages().forEach(watch);
      context.on("page", watch);

      await use();

      const unexpected = state.problems.filter(
        (problem) =>
          !(
            problem.kind === "http" &&
            (problem.status ?? 500) < 500 &&
            state.allowed.some((allowed) => allowed.status === problem.status && matches(allowed.url, problem.url))
          ),
      );
      await testInfo.attach("aidev-api-problems", { body: JSON.stringify(unexpected), contentType: "application/json" });
      if (unexpected.length) {
        throw new Error(
          `aidev API guard: ${unexpected.length} problem(s) while this test ran:\n${unexpected.map(describe).join("\n")}`,
        );
      }
    },
    { auto: true },
  ],
});
