import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

/** Read-only connectivity check; no documents or connection details are returned. */
export const checkMongoConnection = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async () => {
    const uri = process.env["STORAGE_MONGODB_URI"];
    if (!uri) return { connected: false, message: "MongoDB secret is not available." };
    try {
      const { withMongoDatabase } = await import("./mongodb.server");
      await withMongoDatabase(uri, async (db) => {
        await db.command({ ping: 1 });
      });
      return { connected: true, message: "MongoDB connection verified." };
    } catch {
      return { connected: false, message: "MongoDB connection failed. Check credentials and Atlas network access." };
    }
  });