import { test } from "node:test";
import assert from "node:assert/strict";
import { scoreRepo, pickImportable, stackBreakdown, type RawRepo } from "./repo-quality.ts";

const now = Date.parse("2026-10-31T00:00:00Z");
const base: RawRepo = {
  name: "x", description: null, html_url: "", homepage: null, stargazers_count: 0, forks_count: 0,
  open_issues_count: 0, language: null, topics: [], license: null, fork: false, archived: false, size: 0,
  pushed_at: "2025-01-01T00:00:00Z",
};

test("bare repo scores 0 and grade D", () => {
  const r = scoreRepo(base, { readme: false, languages: {} }, now);
  assert.equal(r.score, 0);
  assert.equal(r.grade, "D");
});

test("fully documented, active, substantial repo gets grade A", () => {
  const r = scoreRepo(
    { ...base, description: "A real useful project", homepage: "https://x.dev", topics: ["ai"], license: { spdx_id: "MIT" }, size: 800, pushed_at: "2026-10-20T00:00:00Z" },
    { readme: true, languages: {} }, now,
  );
  assert.equal(r.score, 75);
  assert.equal(r.grade, "A");
});

test("forks and archived repos are not imported", () => {
  const picked = pickImportable([{ ...base, name: "f", fork: true }, { ...base, name: "a", archived: true }, { ...base, name: "ok" }]);
  assert.deepEqual(picked.map((r) => r.name), ["ok"]);
});

test("stack breakdown is byte-weighted", () => {
  assert.deepEqual(stackBreakdown([{ languages: { TS: 300 } }, { languages: { TS: 100, Go: 100 } }]), [
    { name: "TS", pct: 80 }, { name: "Go", pct: 20 },
  ]);
});
