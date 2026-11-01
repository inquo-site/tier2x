import { test } from "node:test";
import assert from "node:assert/strict";
import { importGitHub } from "./github-import.server.ts";
import type { RawRepo } from "./repo-quality.ts";

const repo: RawRepo = { name: "project", description: "A shipped application", html_url: "https://github.com/builder/project", homepage: "https://example.org", stargazers_count: 5, forks_count: 0, open_issues_count: 0, language: "TypeScript", topics: ["web"], license: { spdx_id: "MIT" }, fork: false, archived: false, size: 600, pushed_at: new Date().toISOString() };
const response = (value: unknown, budget = "60") => Response.json(value, { headers: { "x-ratelimit-remaining": budget } });

test("paginates public repositories and imports beyond the old six-project limit", async () => {
  const calls: string[] = [];
  const mock: typeof fetch = async (input) => {
    const url = String(input); calls.push(url);
    if (url.includes("/repos?")) return response(url.includes("page=2") ? [{ ...repo, name: "last" }] : Array.from({ length: 100 }, (_, i) => ({ ...repo, name: `project-${i}` })), "0");
    return response({ login: "builder", public_repos: 101 }, "1");
  };
  const result = await importGitHub("builder", mock);
  assert.equal(result.data.top_repos.length, 101);
  assert.equal(calls.length, 3);
  assert.equal(result.data.top_repos[0]?.signals_complete, false);
});

test("README and language evidence are fetched for original repos only", async () => {
  const mock: typeof fetch = async (input) => {
    const url = String(input);
    if (url.includes("/repos?")) return response([repo, { ...repo, name: "fork", fork: true }, { ...repo, name: "archive", archived: true }]);
    if (url.endsWith("/readme")) return response({ name: "README.md" });
    if (url.endsWith("/languages")) return response({ TypeScript: 800, CSS: 200 });
    return response({ login: "builder", public_repos: 3 });
  };
  const result = await importGitHub("builder", mock);
  assert.equal(result.data.imported_count, 1);
  assert.equal(result.data.excluded_count, 2);
  assert.equal(result.data.top_repos[0]?.grade, "A");
  assert.deepEqual(result.data.stack, [{ name: "TypeScript", pct: 80 }, { name: "CSS", pct: 20 }]);
});

test("invalid username cannot change the GitHub request path", async () => {
  await assert.rejects(() => importGitHub("../private"), /valid GitHub username/);
});

test("failed repository listing never returns an empty successful import", async () => {
  const mock: typeof fetch = async (input) => String(input).includes("/repos?") ? new Response("Unavailable", { status: 503 }) : response({ login: "builder" });
  await assert.rejects(() => importGitHub("builder", mock), /503/);
});