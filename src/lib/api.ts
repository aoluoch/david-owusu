/**
 * Data-access layer built on top of Appwrite.
 *
 * - Site content lives in a single "singleton" document whose `data` attribute
 *   holds a JSON blob matching (a subset of) the `SiteContent` shape.
 * - Events and blog posts each live in their own collection so they can have
 *   detail pages, slugs, and rich-text bodies.
 */

import type { Models } from "appwrite";
import {
  ID,
  Permission,
  Query,
  Role,
  appwriteConfig,
  databases,
  fileUrl,
  isAppwriteConfigured,
  storage,
} from "./appwrite";
import { emptySiteContent } from "../data/siteContent";
import { slugify } from "./utils";
import type {
  BlogPost,
  EventItem,
  GalleryImage,
  SiteContent,
  Submission,
} from "../types/content";

export { slugify };

const {
  databaseId,
  siteContentCollectionId,
  siteContentDocId,
  eventsCollectionId,
  blogCollectionId,
  submissionsCollectionId,
  bucketId,
} = appwriteConfig;

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function deepMerge<T>(base: T, override: Partial<T> | undefined | null): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) || typeof base !== "object") {
    return (override as T) ?? base;
  }
  const result: Record<string, unknown> = {
    ...(base as Record<string, unknown>),
  };
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

/** Document permissions: create is granted at collection level, not per document. */
const publicDocumentPermissions = [
  Permission.read(Role.any()),
  Permission.update(Role.users()),
  Permission.delete(Role.users()),
];

/* -------------------------------------------------------------------------- */
/* Mapping between Appwrite documents and domain types                         */
/* -------------------------------------------------------------------------- */

type AnyDoc = Models.Document & Record<string, unknown>;

function mapEvent(doc: AnyDoc): EventItem {
  return {
    id: doc.$id,
    slug: (doc.slug as string) || slugify((doc.title as string) ?? doc.$id),
    title: (doc.title as string) ?? "",
    date: (doc.date as string) ?? "",
    location: (doc.location as string) ?? "",
    imageUrl: (doc.imageUrl as string) ?? "",
    imageAlt: (doc.imageAlt as string) ?? (doc.title as string) ?? "",
    ctaLabel: (doc.ctaLabel as string) || "Register Now",
    ctaTo: (doc.ctaTo as string) || "",
    registrationEnabled:
      doc.registrationEnabled === undefined
        ? true
        : Boolean(doc.registrationEnabled),
    featured: Boolean(doc.featured),
    description: (doc.description as string) || undefined,
    body: (doc.body as string) || undefined,
    published: doc.published === undefined ? true : Boolean(doc.published),
    order: typeof doc.order === "number" ? (doc.order as number) : 0,
  };
}

function eventToData(event: Partial<EventItem>): Record<string, unknown> {
  return {
    slug: event.slug,
    title: event.title,
    date: event.date,
    location: event.location,
    imageUrl: event.imageUrl,
    imageAlt: event.imageAlt,
    ctaLabel: event.ctaLabel,
    ctaTo: event.ctaTo,
    registrationEnabled: event.registrationEnabled ?? true,
    featured: event.featured ?? false,
    description: event.description ?? "",
    body: event.body ?? "",
    published: event.published ?? true,
    order: event.order ?? 0,
  };
}

function mapPost(doc: AnyDoc): BlogPost {
  return {
    id: doc.$id,
    slug: (doc.slug as string) || slugify((doc.title as string) ?? doc.$id),
    title: (doc.title as string) ?? "",
    excerpt: (doc.excerpt as string) ?? "",
    body: (doc.body as string) ?? "",
    coverImageUrl: (doc.coverImageUrl as string) ?? "",
    coverImageAlt: (doc.coverImageAlt as string) ?? (doc.title as string) ?? "",
    author: (doc.author as string) ?? "",
    tags: Array.isArray(doc.tags) ? (doc.tags as string[]) : [],
    published: doc.published === undefined ? true : Boolean(doc.published),
    publishedAt:
      (doc.publishedAt as string) ||
      (doc.$createdAt as string) ||
      new Date().toISOString(),
  };
}

function postToData(post: Partial<BlogPost>): Record<string, unknown> {
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt ?? "",
    body: post.body ?? "",
    coverImageUrl: post.coverImageUrl ?? "",
    coverImageAlt: post.coverImageAlt ?? "",
    author: post.author ?? "",
    tags: post.tags ?? [],
    published: post.published ?? true,
    publishedAt: post.publishedAt || new Date().toISOString(),
  };
}

/* -------------------------------------------------------------------------- */
/* Site content (singleton JSON blob)                                          */
/* -------------------------------------------------------------------------- */

/**
 * The site-content blob excludes `events`, which are always sourced from the
 * dedicated events collection.
 */
export type SiteContentBlob = Omit<SiteContent, "events">;

export async function fetchSiteContentBlob(): Promise<Partial<SiteContentBlob> | null> {
  if (!isAppwriteConfigured) return null;
  try {
    const doc = await databases.getDocument<AnyDoc>({
      databaseId,
      collectionId: siteContentCollectionId,
      documentId: siteContentDocId,
    });
    const raw = doc.data as string | undefined;
    if (!raw) return null;
    return JSON.parse(raw) as Partial<SiteContentBlob>;
  } catch {
    return null;
  }
}

/**
 * Full site content used by the public site: admin-authored content merged
 * into an empty structural shell, with events sourced from their collection.
 */
export async function fetchSiteContent(): Promise<SiteContent> {
  let content: SiteContent = emptySiteContent;

  const blob = await fetchSiteContentBlob();
  if (blob) content = deepMerge(content, blob as Partial<SiteContent>);

  const events = await listEvents({ publishedOnly: true });
  if (events.length) content = { ...content, events };

  return content;
}

/** Persist the site-content blob (everything except events). */
export async function saveSiteContentBlob(
  content: SiteContentBlob,
): Promise<void> {
  const data = JSON.stringify(content);
  try {
    await databases.updateDocument({
      databaseId,
      collectionId: siteContentCollectionId,
      documentId: siteContentDocId,
      data: { data },
    });
  } catch {
    // Document doesn't exist yet — create it.
    await databases.createDocument({
      databaseId,
      collectionId: siteContentCollectionId,
      documentId: siteContentDocId,
      data: { data },
      permissions: publicDocumentPermissions,
    });
  }
}

/* -------------------------------------------------------------------------- */
/* Events                                                                      */
/* -------------------------------------------------------------------------- */

export async function listEvents(
  opts: { publishedOnly?: boolean } = {},
): Promise<EventItem[]> {
  if (!isAppwriteConfigured) {
    return [];
  }
  try {
    const limit = 100;
    let offset = 0;
    const documents: AnyDoc[] = [];

    while (true) {
      const queries = [
        Query.orderAsc("order"),
        Query.limit(limit),
        Query.offset(offset),
      ];
      if (opts.publishedOnly) queries.push(Query.equal("published", true));
      const res = await databases.listDocuments<AnyDoc>({
        databaseId,
        collectionId: eventsCollectionId,
        queries,
      });

      documents.push(...res.documents);
      if (res.documents.length < limit) break;
      offset += limit;
    }

    return documents.map(mapEvent);
  } catch {
    return [];
  }
}

export async function getEventBySlug(slug: string): Promise<EventItem | null> {
  if (!isAppwriteConfigured) {
    return null;
  }
  try {
    const res = await databases.listDocuments<AnyDoc>({
      databaseId,
      collectionId: eventsCollectionId,
      queries: [Query.equal("slug", slug), Query.limit(1)],
    });
    const doc = res.documents[0];
    return doc ? mapEvent(doc) : null;
  } catch {
    return null;
  }
}

export async function getEvent(id: string): Promise<EventItem | null> {
  const doc = await databases.getDocument<AnyDoc>({
    databaseId,
    collectionId: eventsCollectionId,
    documentId: id,
  });
  return mapEvent(doc);
}

export async function createEvent(event: Partial<EventItem>): Promise<EventItem> {
  const doc = await databases.createDocument<AnyDoc>({
    databaseId,
    collectionId: eventsCollectionId,
    documentId: ID.unique(),
    data: eventToData(event),
    permissions: publicDocumentPermissions,
  });
  return mapEvent(doc);
}

export async function updateEvent(
  id: string,
  event: Partial<EventItem>,
): Promise<EventItem> {
  const doc = await databases.updateDocument<AnyDoc>({
    databaseId,
    collectionId: eventsCollectionId,
    documentId: id,
    data: eventToData(event),
  });
  return mapEvent(doc);
}

export async function deleteEvent(id: string): Promise<void> {
  await databases.deleteDocument({
    databaseId,
    collectionId: eventsCollectionId,
    documentId: id,
  });
}

/* -------------------------------------------------------------------------- */
/* Blog                                                                        */
/* -------------------------------------------------------------------------- */

export async function listPosts(
  opts: { publishedOnly?: boolean } = {},
): Promise<BlogPost[]> {
  if (!isAppwriteConfigured) return [];
  try {
    const queries = [Query.orderDesc("publishedAt"), Query.limit(100)];
    if (opts.publishedOnly) queries.push(Query.equal("published", true));
    const res = await databases.listDocuments<AnyDoc>({
      databaseId,
      collectionId: blogCollectionId,
      queries,
    });
    return res.documents.map(mapPost);
  } catch {
    return [];
  }
}

export async function getPostBySlug(slug: string): Promise<BlogPost | null> {
  if (!isAppwriteConfigured) return null;
  try {
    const res = await databases.listDocuments<AnyDoc>({
      databaseId,
      collectionId: blogCollectionId,
      queries: [Query.equal("slug", slug), Query.limit(1)],
    });
    const doc = res.documents[0];
    return doc ? mapPost(doc) : null;
  } catch {
    return null;
  }
}

export async function getPost(id: string): Promise<BlogPost | null> {
  const doc = await databases.getDocument<AnyDoc>({
    databaseId,
    collectionId: blogCollectionId,
    documentId: id,
  });
  return mapPost(doc);
}

export async function createPost(post: Partial<BlogPost>): Promise<BlogPost> {
  const doc = await databases.createDocument<AnyDoc>({
    databaseId,
    collectionId: blogCollectionId,
    documentId: ID.unique(),
    data: postToData(post),
    permissions: publicDocumentPermissions,
  });
  return mapPost(doc);
}

export async function updatePost(
  id: string,
  post: Partial<BlogPost>,
): Promise<BlogPost> {
  const doc = await databases.updateDocument<AnyDoc>({
    databaseId,
    collectionId: blogCollectionId,
    documentId: id,
    data: postToData(post),
  });
  return mapPost(doc);
}

export async function deletePost(id: string): Promise<void> {
  await databases.deleteDocument({
    databaseId,
    collectionId: blogCollectionId,
    documentId: id,
  });
}

/* -------------------------------------------------------------------------- */
/* Submissions (contact / invitation / partnership messages)                  */
/* -------------------------------------------------------------------------- */

function mapSubmission(doc: AnyDoc): Submission {
  return {
    id: doc.$id,
    type: (doc.type as string) ?? "General",
    name: (doc.name as string) ?? "",
    email: (doc.email as string) ?? "",
    phone: (doc.phone as string) || undefined,
    organization: (doc.organization as string) || undefined,
    subject: (doc.subject as string) || undefined,
    message: (doc.message as string) ?? "",
    read: Boolean(doc.read),
    createdAt: (doc.$createdAt as string) ?? new Date().toISOString(),
  };
}

/**
 * Store a visitor message. Called from the public forms — the `submissions`
 * collection grants `create` to anyone, while reads are limited to admins.
 */
export async function createSubmission(
  submission: Omit<Submission, "id" | "read" | "createdAt">,
): Promise<void> {
  if (!isAppwriteConfigured) {
    throw new Error("Messaging is not configured yet. Please try again later.");
  }
  await databases.createDocument({
    databaseId,
    collectionId: submissionsCollectionId,
    documentId: ID.unique(),
    data: {
      type: submission.type,
      name: submission.name,
      email: submission.email,
      phone: submission.phone ?? "",
      organization: submission.organization ?? "",
      subject: submission.subject ?? "",
      message: submission.message,
      read: false,
    },
  });
}

export async function listSubmissions(): Promise<Submission[]> {
  if (!isAppwriteConfigured) return [];
  const res = await databases.listDocuments<AnyDoc>({
    databaseId,
    collectionId: submissionsCollectionId,
    queries: [Query.orderDesc("$createdAt"), Query.limit(200)],
  });
  return res.documents.map(mapSubmission);
}

export async function setSubmissionRead(
  id: string,
  read: boolean,
): Promise<void> {
  await databases.updateDocument({
    databaseId,
    collectionId: submissionsCollectionId,
    documentId: id,
    data: { read },
  });
}

export async function deleteSubmission(id: string): Promise<void> {
  await databases.deleteDocument({
    databaseId,
    collectionId: submissionsCollectionId,
    documentId: id,
  });
}

/* -------------------------------------------------------------------------- */
/* Event registrations                                                         */
/* -------------------------------------------------------------------------- */

export async function createEventRegistration({
  eventId,
  eventTitle,
  name,
  email,
  phone,
}: {
  eventId: string;
  eventTitle: string;
  name: string;
  email: string;
  phone: string;
}): Promise<void> {
  if (!isAppwriteConfigured) {
    throw new Error("Registration is not configured yet. Please try again later.");
  }
  await databases.createDocument({
    databaseId,
    collectionId: submissionsCollectionId,
    documentId: ID.unique(),
    data: {
      type: "Event Registration",
      name,
      email,
      phone,
      organization: eventTitle,
      subject: eventId,
      message: `Registration for ${eventTitle}`,
      read: false,
    },
  });
}

export async function listEventRegistrations(
  eventId: string,
): Promise<Submission[]> {
  const submissions = await listSubmissions();
  return submissions.filter(
    (item) => item.type === "Event Registration" && item.subject === eventId,
  );
}

/* -------------------------------------------------------------------------- */
/* Gallery                                                                     */
/* -------------------------------------------------------------------------- */

/**
 * The gallery lives inside the site-content blob (`galleryPreview`). These
 * helpers read/write only that slice so the Gallery admin can manage images
 * without touching the rest of the content, while every image is stored in the
 * Appwrite media bucket via `uploadMedia`.
 */
export async function fetchGallery(): Promise<GalleryImage[]> {
  const blob = await fetchSiteContentBlob();
  return blob?.galleryPreview ?? [];
}

export async function saveGallery(gallery: GalleryImage[]): Promise<void> {
  const stored = (await fetchSiteContentBlob()) ?? {};
  const next = { ...stored, galleryPreview: gallery } as SiteContentBlob;
  await saveSiteContentBlob(next);
}

/* -------------------------------------------------------------------------- */
/* Media                                                                       */
/* -------------------------------------------------------------------------- */

/** Upload a file to the media bucket and return its public URL. */
export async function uploadMedia(file: File): Promise<string> {
  const created = await storage.createFile({
    bucketId,
    fileId: ID.unique(),
    file,
    permissions: [Permission.read(Role.any())],
  });
  return fileUrl(created.$id);
}
