import { useState } from "react";
import { Check, Minus, Star, GitFork, ExternalLink, Code2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { DeepRepo } from "@/lib/repo-quality";

export function GitHubProjects({ data }: { data: any }) {
  const [expanded, setExpanded] = useState(false);
  const repos: DeepRepo[] = data?.top_repos ?? [];
  const stack: { name: string; pct: number }[] = data?.stack ?? [];
  if (!repos.length) return <p className="py-6 text-sm text-muted-foreground">No original, active public projects imported yet.</p>;
  return (
    <section className="mt-8 min-w-0" aria-label="GitHub project evidence">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div><div className="flex items-center gap-2 text-xs text-muted-foreground"><Code2 className="size-4" /> PUBLIC PROJECTS</div><h2 className="mt-2 font-display text-2xl">Proof of work <span className="text-muted-foreground">/ {repos.length}</span></h2></div>
        {data.imported_at && <p className="text-xs text-muted-foreground">Imported {new Date(data.imported_at).toLocaleDateString()}</p>}
      </div>
      <p className="mt-2 text-xs text-muted-foreground">Repository evidence score · not a source-code audit or verified account ownership.</p>
      {stack.length > 0 && <div className="my-5 flex flex-wrap gap-2">{stack.map((language) => <span key={language.name} className="border-b-2 border-primary bg-secondary px-3 py-2 text-xs">{language.name} <span className="text-muted-foreground">{language.pct}%</span></span>)}</div>}
      {data.warnings?.length > 0 && <p role="status" className="my-4 text-xs text-muted-foreground">Some README or language checks are pending. Scores with pending checks are provisional.</p>}
      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {(expanded ? repos : repos.slice(0, 6)).map((repo) => <article key={repo.name} className="min-w-0 rounded-lg border border-border bg-card p-5">
          <div className="flex items-start justify-between gap-3"><h3 className="min-w-0 break-words font-display text-lg">{repo.name}</h3>{typeof repo.score === "number" && <div className="shrink-0 text-right"><span className="font-display text-xl text-foreground">{repo.grade}</span><p className="text-xs text-muted-foreground">{repo.score}/100{repo.signals_complete === false ? "*" : ""}</p></div>}</div>
          <p className="mt-2 break-words text-sm text-muted-foreground">{repo.description || "No description provided."}</p>
          <div className="mt-4 flex flex-wrap gap-3 text-xs text-muted-foreground"><span>{repo.language || "No primary language"}</span><span className="inline-flex items-center gap-1"><Star className="size-3" />{repo.stars}</span><span className="inline-flex items-center gap-1"><GitFork className="size-3" />{repo.forks}</span></div>
          {repo.indicators && <div className="mt-4 grid grid-cols-2 gap-2 text-xs">{repo.indicators.map((indicator) => <span key={indicator.key} className={`inline-flex items-center gap-1.5 ${indicator.ok ? "text-foreground" : "text-muted-foreground"}`}>{indicator.ok ? <Check className="size-3" /> : <Minus className="size-3" />}{indicator.label}{indicator.ok === null ? " · pending" : ""}</span>)}</div>}
          <div className="mt-5 flex gap-2"><Button asChild variant="outline" size="sm"><a href={repo.html_url} target="_blank" rel="noreferrer">See code <ExternalLink /></a></Button>{repo.homepage && /^https?:\/\//.test(repo.homepage) && <Button asChild variant="ghost" size="sm"><a href={repo.homepage} target="_blank" rel="noreferrer">Live demo <ExternalLink /></a></Button>}</div>
        </article>)}
      </div>
      {repos.length > 6 && <Button variant="outline" className="mt-5" onClick={() => setExpanded(!expanded)}>{expanded ? "Show fewer" : `View all ${repos.length} projects`}</Button>}
    </section>
  );
}