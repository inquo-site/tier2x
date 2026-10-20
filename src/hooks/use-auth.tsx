import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { useRouter } from "@tanstack/react-router";
import { useQueryClient } from "@tanstack/react-query";
import { isRecoveryHash } from "@/lib/auth-flow";

type AuthCtx = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  recoveryReady: boolean;
};

const Ctx = createContext<AuthCtx>({ user: null, session: null, loading: true, recoveryReady: false });

export function AuthProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [recoveryReady, setRecoveryReady] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  useEffect(() => {
    let active = true;
    let transitioned = false;
    const recoveryCallback = isRecoveryHash(window.location.hash);
    const { data: sub } = supabase.auth.onAuthStateChange((event, s) => {
      if (!active) return;
      if (event !== "INITIAL_SESSION") transitioned = true;
      setSession(s);
      setLoading(false);
      if (event === "PASSWORD_RECOVERY" || (event === "INITIAL_SESSION" && recoveryCallback && s)) setRecoveryReady(true);
      if (event === "SIGNED_OUT") setRecoveryReady(false);
      if (event === "SIGNED_IN" || event === "SIGNED_OUT" || event === "USER_UPDATED") {
        // Schedule outside the auth callback to avoid re-entering the auth lock.
        setTimeout(() => {
          if (!active) return;
          void router.invalidate();
          if (event === "SIGNED_OUT") queryClient.clear();
          else void queryClient.invalidateQueries();
        }, 0);
      }
    });
    void (async () => {
      try {
        const { data, error } = await supabase.auth.getUser();
        if (!active || transitioned) return;
        if (error || !data.user) setSession(null);
        else {
          const { data: stored } = await supabase.auth.getSession();
          if (active && !transitioned) {
            setSession(stored.session);
            if (recoveryCallback && stored.session) setRecoveryReady(true);
          }
        }
      } catch {
        if (active && !transitioned) setSession(null);
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => { active = false; sub.subscription.unsubscribe(); };
  }, [router, queryClient]);

  return (
    <Ctx.Provider value={{ user: session?.user ?? null, session, loading, recoveryReady }}>
      {children}
    </Ctx.Provider>
  );
}

export const useAuth = () => useContext(Ctx);
