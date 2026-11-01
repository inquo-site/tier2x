// Pure scoring for GitHub repo "proof-of-work" quality. No network here.
export type RawRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  language: string | null;
  topics?: string[];
  license: { spdx_id?: string | null } | null;
  fork: boolean;
  archived: boolean;
  size: number;
  pushed_at: string;
};

export type RepoSignals = {
  readme: boolean | null;
  languages: Record<string, number>;
};

export type QualityIndicator = { key: string; label: string; ok: boolean | null };

export type DeepRepo = {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stars: number;
  forks: number;
  open_issues: number;
  language: string | null;
  topics: string[];
  languages: Record<string, number>;
  pushed_at: string;
  score: number;
  grade: "A" | "B" | "C" | "D";
  indicators: QualityIndicator[];
  signals_complete: boolean;
};

const DAY = 86_400_000;

export function scoreRepo(r: RawRepo, s: RepoSignals, now = Date.now()): DeepRepo {
  const ageDays = (now - new Date(r.pushed_at).getTime()) / DAY;
  const indicators: QualityIndicator[] = [
    { key: "readme", label: "README", ok: s.readme },
    { key: "description", label: "Description", ok: !!r.description && r.description.trim().length >= 10 },
    { key: "license", label: "License", ok: !!r.license?.spdx_id && r.license.spdx_id !== "NOASSERTION" },
    { key: "live", label: "Live demo", ok: !!r.homepage && /^https?:\/\//.test(r.homepage) },
    { key: "topics", label: "Topics", ok: (r.topics?.length ?? 0) > 0 },
    { key: "active", label: "Active (90d)", ok: ageDays <= 90 },
  ];
  // 10 pts per indicator (60) + traction up to 25 + substance up to 15
  let score = indicators.filter((i) => i.ok).length * 10;
  score += Math.min(25, Math.round(Math.log2(1 + r.stargazers_count + r.forks_count * 2) * 5));
  score += r.size >= 500 ? 15 : r.size >= 100 ? 8 : 0;
  score = Math.max(0, Math.min(100, score));
  const grade = score >= 75 ? "A" : score >= 55 ? "B" : score >= 35 ? "C" : "D";
  return {
    name: r.name,
    description: r.description,
    html_url: r.html_url,
    homepage: r.homepage,
    stars: r.stargazers_count,
    forks: r.forks_count,
    open_issues: r.open_issues_count,
    language: r.language,
    topics: r.topics ?? [],
    languages: s.languages,
    pushed_at: r.pushed_at,
    score,
    grade,
    indicators,
    signals_complete: s.readme !== null,
  };
}

/** Own, non-archived repos ranked by recent push then stars. */
export function pickImportable(repos: RawRepo[], limit = Number.POSITIVE_INFINITY): RawRepo[] {
  return repos
    .filter((r) => !r.fork && !r.archived)
    .sort((a, b) => b.stargazers_count - a.stargazers_count || +new Date(b.pushed_at) - +new Date(a.pushed_at))
    .slice(0, limit);
}

/** Byte-weighted language share across repos, as percentages. */
export function stackBreakdown(repos: Pick<DeepRepo, "languages">[]): { name: string; pct: number }[] {
  const totals: Record<string, number> = {};
  for (const r of repos) for (const [k, v] of Object.entries(r.languages)) totals[k] = (totals[k] ?? 0) + v;
  const sum = Object.values(totals).reduce((a, b) => a + b, 0);
  if (!sum) return [];
  return Object.entries(totals)
    .map(([name, v]) => ({ name, pct: Math.round((v / sum) * 1000) / 10 }))
    .sort((a, b) => b.pct - a.pct)
    .slice(0, 6);
}
