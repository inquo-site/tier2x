import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { supabase } from "@/integrations/supabase/client";
import { authErrorMessage } from "@/lib/auth-flow";

export const Route = createFileRoute("/reset-password")({
  head: () => ({ meta: [
    { title: "Reset your password — Tier2X" },
    { name: "description", content: "Securely reset your Tier2X account password using the recovery link sent to your email." },
    { property: "og:title", content: "Reset your password — Tier2X" },
    { property: "og:description", content: "Recover access to your Tier2X student-builder account." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: "noindex, nofollow" },
  ] }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const { user, loading, recoveryReady } = useAuth();
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    const params = new URLSearchParams(window.location.hash.slice(1));
    if (params.has("error")) setError("This recovery link is invalid or expired. Request a new reset email.");
  }, []);

  const submit = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!user || !recoveryReady) { setError("Open the password-reset link from your email first."); return; }
    if (password !== confirmation) { setError("Passwords do not match."); return; }
    setBusy(true);
    setError("");
    try {
      const { error: updateError } = await supabase.auth.updateUser({ password });
      if (updateError) throw updateError;
      setPassword("");
      setConfirmation("");
      setDone(true);
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) setError("Your password was updated, but sign-out failed. Please sign out before signing in again.");
    } catch (err) { setError(authErrorMessage(err)); }
    finally { setBusy(false); }
  };

  return <main className="flex min-h-screen items-center justify-center bg-background p-6 text-foreground">
    <div className="w-full max-w-sm">
      <Link to="/" className="text-2xl font-semibold">Tier2X.</Link>
      <h1 className="mt-10 font-display text-3xl">{done ? "Password updated" : "Reset your password"}</h1>
      {loading ? <Loader2 aria-label="Checking recovery link" className="mt-6 h-5 w-5 animate-spin" /> : done ?
        <p role="status" className="mt-4 text-sm text-muted-foreground">Your new password is ready. Sign in again to continue.</p> : user && recoveryReady ?
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input className="input-ink" aria-label="New password" type="password" autoComplete="new-password" placeholder="New password (min 6 chars)" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} />
          <input className="input-ink" aria-label="Confirm new password" type="password" autoComplete="new-password" placeholder="Confirm new password" required minLength={6} value={confirmation} onChange={e => setConfirmation(e.target.value)} />
          <Button disabled={busy} className="h-12 w-full" type="submit">{busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}Update password</Button>
        </form> : <p className="mt-4 text-sm text-muted-foreground">Open the secure reset link from your email. If it has expired, request a new one from the sign-in page.</p>}
      {error && <p role="alert" className="mt-4 text-sm text-destructive">{error}</p>}
      <Button asChild variant="link" className="mt-6 h-auto p-0"><Link to="/auth">Back to sign in</Link></Button>
    </div>
  </main>;
}