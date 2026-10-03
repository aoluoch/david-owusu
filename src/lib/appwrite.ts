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

/** Public site content should remain opt-in. Admin auth still works when the
 * Appwrite project is configured, but the public pages do not rely on admin data
 * unless explicitly enabled. */
export const isPublicAppwriteContentEnabled =
  (env.VITE_ENABLE_PUBLIC_APPWRITE_CONTENT ?? "false").toLowerCase() === "true";

export const canUsePublicAppwriteData =
  Boolean(appwriteConfig.projectId) && isPublicAppwriteContentEnabled;

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

const STORAGE_FILE_PATH =
  /\/storage\/buckets\/([^/]+)\/files\/([^/]+)\/(view|download|preview)\/?$/i;

export interface ImagePreviewOptions {
  width?: number;
  height?: number;
  quality?: number;
  output?: "webp" | "avif" | "jpg" | "jpeg" | "png";
  gravity?: "center" | "auto" | "top" | "left" | "right" | "bottom";
}

function parseStorageFile(
  url: string,
): {
  origin: string;
  pathname: string;
  bucketId: string;
  fileId: string;
  project: string;
} | null {
  try {
    const parsed = new URL(url);
    const match = parsed.pathname.match(STORAGE_FILE_PATH);
    if (!match) return null;
    return {
      origin: parsed.origin,
      pathname: parsed.pathname,
      bucketId: match[1],
      fileId: match[2],
      project:
        parsed.searchParams.get("project") ?? appwriteConfig.projectId ?? "",
    };
  } catch {
    return null;
  }
}

/**
 * Appwrite Image Preview URL. Resizes and converts on the fly so gallery
 * tiles do not download the original multi-megabyte file.
 */
export function optimizedImageUrl(
  url: string,
  options: ImagePreviewOptions = {},
): string {
  const file = parseStorageFile(url);
  if (!file || !file.project) return url;

  const params = new URLSearchParams({ project: file.project });
  if (options.width) params.set("width", String(options.width));
  if (options.height) params.set("height", String(options.height));
  if (options.quality != null) params.set("quality", String(options.quality));
  params.set("output", options.output ?? "webp");
  if (options.gravity) params.set("gravity", options.gravity);

  const previewPath = file.pathname.replace(
    /\/(view|download|preview)\/?$/i,
    "/preview",
  );
  return `${file.origin}${previewPath}?${params}`;
}

export function optimizedImageSrcSet(
  url: string,
  widths: readonly number[],
  quality = 72,
): string | undefined {
  if (!parseStorageFile(url)) return undefined;
  return widths
    .map(
      (width) =>
        `${optimizedImageUrl(url, { width, quality, output: "webp" })} ${width}w`,
    )
    .join(", ");
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
  if (!canUsePublicAppwriteData) return () => {};
  try {
    return getClient().subscribe(channels, callback);
  } catch {
    return () => {};
  }
}
