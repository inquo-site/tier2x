import { MongoClient, type Db } from "mongodb";

/** Request-scoped connection: never reuse sockets across hosted requests. */
export async function withMongoDatabase<T>(
  uri: string,
  operation: (database: Db) => Promise<T>,
): Promise<T> {
  const client = new MongoClient(uri, {
    appName: "Tier2X",
    maxPoolSize: 1,
    minPoolSize: 0,
    serverSelectionTimeoutMS: 8000,
    connectTimeoutMS: 8000,
    socketTimeoutMS: 10000,
  });
  try {
    await client.connect();
    return await operation(client.db("tier2x"));
  } catch {
    // Driver errors can contain credentials and cluster details; never expose them.
    throw new Error("MongoDB connection failed. Check credentials and Atlas network access.");
  } finally {
    await client.close().catch(() => undefined);
  }
}