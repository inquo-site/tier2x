import { pickImportable, scoreRepo, stackBreakdown, type RawRepo } from "./repo-quality";

const USERNAME = /^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/;
const HEADERS = { Accept: "application/vnd.github+json", "User-Agent": "Tier2X-Public-Projects", "X-GitHub-Api-Version": "2022-11-28" };

/** Public metadata only; never workspace credentials or private repositories. */
export async function importGitHub(username: string, request: typeof fetch = fetch) {
  if (!USERNAME.test(username)) throw new Error("Enter a valid GitHub username, not a URL.");
  let remaining = 60;
  async function get(path: string, allowMissing = false) {
    const response = await request(`https://api.github.com${path}`, { headers: HEADERS, signal: AbortSignal.timeout(15000) });
    const budget = response.headers.get("x-ratelimit-remaining");
    if (budget !== null) remaining = Number(budget);
    if (allowMissing && response.status === 404) return null;
    if (!response.ok) {
      const body = await response.text();
      console.error(`GitHub request failed [${response.status}]: ${body}`);
      if (response.status === 403 || response.status === 429) throw new Error("GitHub is limiting public requests. Please try syncing again later; your saved projects are unchanged.");
      if (response.status === 404) throw new Error(`GitHub user "${username}" was not found.`);
      throw new Error(`GitHub could not complete the import (${response.status}). Please try again later.`);
    }
    return response.json();
  }
  const user = await get(`/users/${encodeURIComponent(username)}`);
  const repos: RawRepo[] = [];
  for (let page = 1; ; page++) {
    const batch = await get(`/users/${encodeURIComponent(username)}/repos?type=owner&sort=updated&per_page=100&page=${page}`) as RawRepo[];
    repos.push(...batch);
    if (batch.length < 100) break;
  }
  const selected = pickImportable(repos);
  const projects = [];
  const warnings: string[] = [];
  for (const repo of selected) {
    let readme: boolean | null = null;
    let languages: Record<string, number> = {};
    // Keep all projects, even when GitHub's anonymous detail budget is exhausted.
    if (remaining >= 2) {
      try {
        const path = `/repos/${encodeURIComponent(user.login)}/${encodeURIComponent(repo.name)}`;
        readme = (await get(`${path}/readme`, true)) !== null;
        languages = await get(`${path}/languages`);
      } catch (error) {
        readme = null;
        if (!warnings.length) warnings.push(error instanceof Error ? error.message : "Some project details are unavailable.");
      }
    }
    projects.push(scoreRepo(repo, { readme, languages }));
  }
  if (projects.some((repo) => !repo.signals_complete) && !warnings.length) {
    warnings.push("All eligible public projects were imported. GitHub's public request limit left some README and language checks pending.");
  }
  return {
    data: {
      login: user.login as string, name: user.name as string | null,
      avatar_url: user.avatar_url as string, bio: user.bio as string | null,
      followers: user.followers as number, following: user.following as number,
      public_repos: user.public_repos as number, html_url: user.html_url as string,
      company: user.company as string | null, location: user.location as string | null,
      top_repos: projects, stack: stackBreakdown(projects),
      imported_count: projects.length, excluded_count: repos.length - selected.length,
      imported_at: new Date().toISOString(), warnings,
    },
    warnings,
  };
}