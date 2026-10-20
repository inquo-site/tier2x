export function safeAuthDestination(value: unknown): string | undefined {
  if (typeof value !== "string" || !value.startsWith("/") || value.startsWith("//") || value.includes("\\")) return undefined;
  const base = "https://app.local";
  try {
    const url = new URL(value, base);
    return url.origin === base ? `${url.pathname}${url.search}${url.hash}` : undefined;
  } catch {
    return undefined;
  }
}

export function isRecoveryHash(hash: string): boolean {
  const params = new URLSearchParams(hash.replace(/^#/, ""));
  return params.get("type") === "recovery" && Boolean(params.get("access_token")) && !params.has("error");
}

export function authErrorMessage(error: unknown): string {
  const message = error instanceof Error ? error.message : String((error as { message?: string })?.message ?? "");
  if (/failed to fetch|network|timeout|fetch failed|service unavailable|502|503|504/i.test(message)) return "Account service is unavailable. Please try again later.";
  if (/invalid login credentials/i.test(message)) return "Wrong email or password.";
  if (/email not confirmed/i.test(message)) return "Confirm your email first. Check your inbox or resend the confirmation.";
  if (/rate limit|too many requests/i.test(message)) return "Too many attempts. Please wait a few minutes and try again.";
  if (/expired|otp_expired|invalid.*token/i.test(message)) return "This link has expired. Please request a new password-reset email.";
  return message || "Unable to complete this request. Please try again.";
}