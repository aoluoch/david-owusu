/**
 * Appwrite client + configuration.
 *
 * All IDs are configurable via environment variables so the same code works
 * against Appwrite Cloud or a self-hosted instance. See `.env.example` and
 * `scripts/setup-appwrite.mjs` (run `npm run setup:appwrite`) which provisions
 * the database, collections, and storage bucket that match these defaults.
 */

import {
  Account,
  Client,
  Databases,
  ID,
  Permission,
  Query,
  Role,
  Storage,
} from "appwrite";

const env = import.meta.env;

export const appwriteConfig = {
  endpoint:
    (env.VITE_APPWRITE_ENDPOINT as string | undefined) ??
    "https://cloud.appwrite.io/v1",
  projectId: env.VITE_APPWRITE_PROJECT_ID as string | undefined,
  databaseId:
    (env.VITE_APPWRITE_DATABASE_ID as string | undefined) ?? "main",
  siteContentCollectionId:
    (env.VITE_APPWRITE_SITE_CONTENT_COLLECTION_ID as string | undefined) ??
    "site_content",
  siteContentDocId:
    (env.VITE_APPWRITE_SITE_CONTENT_DOC_ID as string | undefined) ?? "main",
  eventsCollectionId:
    (env.VITE_APPWRITE_EVENTS_COLLECTION_ID as string | undefined) ?? "events",
  blogCollectionId:
    (env.VITE_APPWRITE_BLOG_COLLECTION_ID as string | undefined) ?? "blog",
  submissionsCollectionId:
    (env.VITE_APPWRITE_SUBMISSIONS_COLLECTION_ID as string | undefined) ??
    "submissions",
  bucketId: (env.VITE_APPWRITE_BUCKET_ID as string | undefined) ?? "media",
};

/** True when the minimum Appwrite configuration is present. */
export const isAppwriteConfigured = Boolean(appwriteConfig.projectId);

let client: Client | null = null;

export function getClient(): Client {
  if (client) return client;
  client = new Client()
    .setEndpoint(appwriteConfig.endpoint)
    .setProject(appwriteConfig.projectId ?? "");
  return client;
}

export const account = new Account(getClient());
export const databases = new Databases(getClient());
export const storage = new Storage(getClient());

export { ID, Permission, Query, Role };

/**
 * Public URL for a file stored in the media bucket. Uses the `view` endpoint
 * so the image can be embedded directly in an <img> tag.
 */
export function fileUrl(fileId: string): string {
  const { endpoint, bucketId, projectId } = appwriteConfig;
  return `${endpoint}/storage/buckets/${bucketId}/files/${fileId}/view?project=${projectId}`;
}

/** Realtime channel for every document in a collection. */
export function collectionChannel(collectionId: string): string {
  return `databases.${appwriteConfig.databaseId}.collections.${collectionId}.documents`;
}

/**
 * Subscribe to one or more Appwrite Realtime channels. Returns an unsubscribe
 * function. When Appwrite is not configured this is a no-op, so callers can use
 * it unconditionally.
 */
export function subscribe(
  channels: string | string[],
  callback: (payload: unknown) => void,
): () => void {
  if (!isAppwriteConfigured) return () => {};
  try {
    return getClient().subscribe(channels, callback);
  } catch {
    return () => {};
  }
}
