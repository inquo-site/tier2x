import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";
import { importGitHub } from "./github-import.server";

const HANDLE_RE = /^[a-z0-9][a-z0-9-]{1,38}$/;
const URL_OR_EMPTY = z.string().trim().max(300).optional().nullable();

const SaveSchema = z.object({
  handle: z.string().trim().toLowerCase().regex(HANDLE_RE, "Handle: 2-39 chars, lowercase, digits, hyphens"),
  display_name: z.string().trim().max(80).optional().nullable(),
  headline: z.string().trim().max(140).optional().nullable(),
  bio: z.string().trim().max(1000).optional().nullable(),
  github_username: z.string().trim().regex(/^[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,37}[a-zA-Z0-9])?$/, "Enter a GitHub username, not a URL").optional().nullable(),
  codeforces_handle: z.string().trim().max(24).optional().nullable(),
  leetcode_url: URL_OR_EMPTY,
  linkedin_url: URL_OR_EMPTY,
  portfolio_url: URL_OR_EMPTY,
  location: z.string().trim().max(80).optional().nullable(),
});

function serverPublicClient() {
  const url = process.env['SUPABASE_URL'];
  const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
  if (!url || !key) throw new Error("Profile service is unavailable.");
  return createClient<Database>(
    url,
    key,
    { auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
      global: { fetch: (input, init) => {
        const headers = new Headers(init?.headers);
        if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
        headers.set("apikey", key);
        return fetch(input, { ...init, headers });
      } },
    },
  );
}

async function fetchCodeforces(handle: string) {
  const [infoRes, ratingRes] = await Promise.all([
    fetch(`https://codeforces.com/api/user.info?handles=${encodeURIComponent(handle)}`),
    fetch(`https://codeforces.com/api/user.rating?handle=${encodeURIComponent(handle)}`),
  ]);
  const info = await infoRes.json();
  if (info.status !== "OK") throw new Error(`Codeforces handle "${handle}" not found`);
  const rating = await ratingRes.json();
  const u = info.result[0];
  const contests: any[] = rating.status === "OK" ? rating.result : [];
  return {
    handle: u.handle,
    rank: u.rank,
    maxRank: u.maxRank,
    rating: u.rating,
    maxRating: u.maxRating,
    avatar: u.titlePhoto,
    country: u.country,
    contests_count: contests.length,
    recent_contests: contests.slice(-5).reverse().map((c) => ({
      name: c.contestName,
      rank: c.rank,
      newRating: c.newRating,
      oldRating: c.oldRating,
    })),
  };
}

export const saveDevProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((data: unknown) => SaveSchema.parse(data))
  .handler(async ({ data, context }) => {
    const { data: previous, error: previousError } = await context.supabase.from("dev_profiles").select("github_username, codeforces_handle").eq("user_id", context.userId).maybeSingle();
    if (previousError) throw new Error(previousError.message);
    const warnings: string[] = [];
    let imported: Awaited<ReturnType<typeof importGitHub>> | undefined;
    if (data.github_username && previous?.github_username !== data.github_username) {
      try { imported = await importGitHub(data.github_username); warnings.push(...imported.warnings); }
      catch (error) { warnings.push(error instanceof Error ? error.message : "GitHub import failed. Use Sync to retry."); }
    }
    const { error } = await context.supabase
      .from("dev_profiles")
      .upsert({ user_id: context.userId, ...data,
        ...(previous?.github_username !== data.github_username ? { github_data: null } : {}),
        ...(previous?.codeforces_handle !== data.codeforces_handle ? { codeforces_data: null } : {}),
        ...(imported ? { github_data: imported.data, synced_at: new Date().toISOString() } : {}),
      }, { onConflict: "user_id" });
    if (error) throw new Error(error.message);
    return { ok: true, warnings };
  });

export const syncDevProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data: row, error } = await context.supabase
      .from("dev_profiles")
      .select("github_username, codeforces_handle, github_data, codeforces_data")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    if (!row) throw new Error("Create your report card first.");

    const errors: string[] = [];
    let github_data = row.github_data;
    let codeforces_data = row.codeforces_data;
    let succeeded = false;

    if (row.github_username) {
      try {
        const imported = await importGitHub(row.github_username);
        github_data = imported.data;
        errors.push(...imported.warnings);
        succeeded = true;
      }
      catch (e: any) { errors.push(e.message); }
    }
    if (row.codeforces_handle) {
      try { codeforces_data = await fetchCodeforces(row.codeforces_handle); succeeded = true; }
      catch (e: any) { errors.push(e.message); }
    }

    const { error: upErr } = await context.supabase
      .from("dev_profiles")
      .update({
        github_data,
        codeforces_data,
        ...(succeeded ? { synced_at: new Date().toISOString() } : {}),
      })
      .eq("user_id", context.userId);
    if (upErr) throw new Error(upErr.message);

    return { ok: true, errors };
  });

export const getMyDevProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("dev_profiles")
      .select("*")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { profile: data };
  });

export const getDevProfileByHandle = createServerFn({ method: "GET" })
  .inputValidator((data: { handle: string }) => ({
    handle: z.string().trim().toLowerCase().regex(HANDLE_RE).parse(data.handle),
  }))
  .handler(async ({ data }) => {
    const supabase = serverPublicClient();
    const { data: profile, error } = await supabase
      .from("dev_profiles")
      .select("handle, display_name, headline, bio, github_username, codeforces_handle, leetcode_url, linkedin_url, portfolio_url, location, github_data, codeforces_data, synced_at")
      .eq("handle", data.handle)
      .maybeSingle();
    if (error) throw new Error(error.message);
    return { profile };
  });
