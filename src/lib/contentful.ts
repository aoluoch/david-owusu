/**
 * Contentful client + content loader.
 *
 * Behaviour
 * ---------
 * - If VITE_CONTENTFUL_SPACE_ID and VITE_CONTENTFUL_ACCESS_TOKEN are set, we
 *   initialise a real Contentful client and try to fetch content entries.
 * - Otherwise (and any time a fetch fails) we silently fall back to
 *   `defaultSiteContent` so the site keeps rendering.
 *
 * How to add / override CMS content
 * ---------------------------------
 * 1. Create a content type in Contentful (recommended id: `siteContent`)
 *    with a `content` JSON field matching the `SiteContent` shape.
 * 2. Create a single entry of that type. Its JSON payload will be merged
 *    on top of the defaults, so you can override any subset of the site.
 * 3. Set `VITE_CONTENTFUL_SPACE_ID`, `VITE_CONTENTFUL_ACCESS_TOKEN`
 *    (and optionally `VITE_CONTENTFUL_ENVIRONMENT`,
 *    `VITE_CONTENTFUL_CONTENT_TYPE_ID`, `VITE_CONTENTFUL_ENTRY_ID`) in
 *    your `.env` file.
 */

import { createClient, type ContentfulClientApi } from "contentful";
import { defaultSiteContent } from "../data/siteContent";
import type { SiteContent } from "../types/content";

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID as string | undefined;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN as
  | string
  | undefined;
const environment =
  (import.meta.env.VITE_CONTENTFUL_ENVIRONMENT as string | undefined) ??
  "master";
const contentTypeId =
  (import.meta.env.VITE_CONTENTFUL_CONTENT_TYPE_ID as string | undefined) ??
  "siteContent";
const entryId = import.meta.env.VITE_CONTENTFUL_ENTRY_ID as string | undefined;

export const isContentfulConfigured = Boolean(spaceId && accessToken);

let client: ContentfulClientApi<undefined> | null = null;

export function getContentfulClient(): ContentfulClientApi<undefined> | null {
  if (!isContentfulConfigured) return null;
  if (client) return client;
  client = createClient({
    space: spaceId!,
    accessToken: accessToken!,
    environment,
  });
  return client;
}

/**
 * Deeply merge Contentful overrides onto the default content object.
 * Arrays and primitives are replaced wholesale; plain objects merge recursively.
 */
function deepMerge<T>(base: T, override: Partial<T> | undefined | null): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) || typeof base !== "object") {
    return (override as T) ?? base;
  }
  const result: Record<string, unknown> = { ...(base as Record<string, unknown>) };
  for (const key of Object.keys(override)) {
    const baseValue = (base as Record<string, unknown>)[key];
    const overrideValue = (override as Record<string, unknown>)[key];
    if (
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue) &&
      overrideValue &&
      typeof overrideValue === "object" &&
      !Array.isArray(overrideValue)
    ) {
      result[key] = deepMerge(baseValue, overrideValue as Partial<unknown>);
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue;
    }
  }
  return result as T;
}

/**
 * Fetch site content from Contentful, merging with the local defaults.
 *
 * We look for a single entry of `contentTypeId` (defaults to `siteContent`)
 * containing a `content` field with the `SiteContent` JSON shape.
 * If an entry id is supplied, we fetch that specific entry.
 */
export async function fetchSiteContent(): Promise<SiteContent> {
  const c = getContentfulClient();
  if (!c) return defaultSiteContent;

  try {
    let fields: Record<string, unknown> | undefined;

    if (entryId) {
      const entry = await c.getEntry(entryId);
      fields = entry.fields as Record<string, unknown>;
    } else {
      const response = await c.getEntries({
        content_type: contentTypeId,
        limit: 1,
      });
      fields = response.items[0]?.fields as
        | Record<string, unknown>
        | undefined;
    }

    if (!fields) return defaultSiteContent;

    const overrides = (fields.content ??
      fields.data ??
      fields) as Partial<SiteContent>;

    return deepMerge(defaultSiteContent, overrides);
  } catch (error) {
    console.warn(
      "[contentful] Falling back to default content — fetch failed:",
      error,
    );
    return defaultSiteContent;
  }
}
