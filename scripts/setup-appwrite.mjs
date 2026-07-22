/**
 * Provisions the Appwrite backend for this site: database, collections,
 * attributes, indexes, storage bucket, and (optionally) an admin user.
 *
 * Usage:
 *   1. Fill in .env (VITE_APPWRITE_PROJECT_ID, APPWRITE_API_KEY, and
 *      optionally ADMIN_EMAIL / ADMIN_PASSWORD).
 *   2. Run: npm run setup:appwrite
 *
 * The script is idempotent — re-running it skips resources that already exist.
 */

import "dotenv/config";
import {
  Client,
  Databases,
  ID,
  Permission,
  Role,
  Storage,
  Users,
} from "node-appwrite";

const endpoint =
  process.env.APPWRITE_ENDPOINT ||
  process.env.VITE_APPWRITE_ENDPOINT ||
  "https://cloud.appwrite.io/v1";
const projectId =
  process.env.APPWRITE_PROJECT_ID || process.env.VITE_APPWRITE_PROJECT_ID;
const apiKey = process.env.APPWRITE_API_KEY;

const DB = process.env.VITE_APPWRITE_DATABASE_ID || "main";
const SITE = process.env.VITE_APPWRITE_SITE_CONTENT_COLLECTION_ID || "site_content";
const SITE_DOC = process.env.VITE_APPWRITE_SITE_CONTENT_DOC_ID || "main";
const EVENTS = process.env.VITE_APPWRITE_EVENTS_COLLECTION_ID || "events";
const BLOG = process.env.VITE_APPWRITE_BLOG_COLLECTION_ID || "blog";
const SUBMISSIONS =
  process.env.VITE_APPWRITE_SUBMISSIONS_COLLECTION_ID || "submissions";
const BUCKET = process.env.VITE_APPWRITE_BUCKET_ID || "media";

if (!projectId || !apiKey) {
  console.error(
    "\n✖ Missing config. Set VITE_APPWRITE_PROJECT_ID and APPWRITE_API_KEY in .env\n",
  );
  process.exit(1);
}

const client = new Client()
  .setEndpoint(endpoint)
  .setProject(projectId)
  .setKey(apiKey);

const databases = new Databases(client);
const storage = new Storage(client);
const users = new Users(client);

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/** Run a creator, ignoring "already exists" (409) errors. */
async function ensure(label, fn) {
  try {
    await fn();
    console.log(`  ✓ ${label}`);
  } catch (err) {
    if (err?.code === 409) {
      console.log(`  • ${label} (already exists)`);
    } else {
      console.error(`  ✖ ${label}:`, err?.message || err);
      throw err;
    }
  }
}

const collectionPermissions = [
  Permission.read(Role.any()),
  Permission.create(Role.users()),
  Permission.update(Role.users()),
  Permission.delete(Role.users()),
];

async function str(collectionId, key, size, required = false, array = false) {
  await ensure(`attr ${collectionId}.${key}`, () =>
    databases.createStringAttribute({
      databaseId: DB,
      collectionId,
      key,
      size,
      required,
      array,
    }),
  );
}
async function bool(collectionId, key, xdefault = false) {
  await ensure(`attr ${collectionId}.${key}`, () =>
    databases.createBooleanAttribute({
      databaseId: DB,
      collectionId,
      key,
      required: false,
      xdefault,
    }),
  );
}
async function int(collectionId, key, xdefault = 0) {
  await ensure(`attr ${collectionId}.${key}`, () =>
    databases.createIntegerAttribute({
      databaseId: DB,
      collectionId,
      key,
      required: false,
      xdefault,
    }),
  );
}
async function datetime(collectionId, key) {
  await ensure(`attr ${collectionId}.${key}`, () =>
    databases.createDatetimeAttribute({
      databaseId: DB,
      collectionId,
      key,
      required: false,
    }),
  );
}
async function index(collectionId, key, attributes, type = "key") {
  await ensure(`index ${collectionId}.${key}`, () =>
    databases.createIndex({
      databaseId: DB,
      collectionId,
      key,
      type,
      attributes,
    }),
  );
}

async function main() {
  console.log(`\nSetting up Appwrite at ${endpoint} (project ${projectId})\n`);

  console.log("Database:");
  await ensure(`database ${DB}`, () =>
    databases.create({ databaseId: DB, name: "Main" }),
  );

  console.log("\nCollections:");
  await ensure(`collection ${SITE}`, () =>
    databases.createCollection({
      databaseId: DB,
      collectionId: SITE,
      name: "Site Content",
      permissions: collectionPermissions,
      documentSecurity: true,
    }),
  );
  await ensure(`collection ${EVENTS}`, () =>
    databases.createCollection({
      databaseId: DB,
      collectionId: EVENTS,
      name: "Events",
      permissions: collectionPermissions,
      documentSecurity: true,
    }),
  );
  await ensure(`collection ${BLOG}`, () =>
    databases.createCollection({
      databaseId: DB,
      collectionId: BLOG,
      name: "Blog",
      permissions: collectionPermissions,
      documentSecurity: true,
    }),
  );
  // Submissions: anyone may create (public forms), only admins may read/manage.
  await ensure(`collection ${SUBMISSIONS}`, () =>
    databases.createCollection({
      databaseId: DB,
      collectionId: SUBMISSIONS,
      name: "Submissions",
      permissions: [
        Permission.create(Role.any()),
        Permission.read(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ],
      documentSecurity: false,
    }),
  );

  console.log("\nAttributes:");
  // Site content — single JSON blob.
  await str(SITE, "data", 1000000, false);

  // Events.
  await str(EVENTS, "slug", 255, true);
  await str(EVENTS, "title", 255, true);
  await str(EVENTS, "date", 255);
  await str(EVENTS, "location", 255);
  await str(EVENTS, "imageUrl", 2000);
  await str(EVENTS, "imageAlt", 500);
  await str(EVENTS, "ctaLabel", 255);
  await str(EVENTS, "ctaTo", 2000);
  await str(EVENTS, "description", 5000);
  await str(EVENTS, "body", 1000000);
  await bool(EVENTS, "featured", false);
  await bool(EVENTS, "published", true);
  await int(EVENTS, "order", 0);

  // Blog.
  await str(BLOG, "slug", 255, true);
  await str(BLOG, "title", 255, true);
  await str(BLOG, "excerpt", 2000);
  await str(BLOG, "body", 1000000);
  await str(BLOG, "coverImageUrl", 2000);
  await str(BLOG, "coverImageAlt", 500);
  await str(BLOG, "author", 255);
  await str(BLOG, "tags", 100, false, true);
  await bool(BLOG, "published", true);
  await datetime(BLOG, "publishedAt");

  // Submissions (visitor messages).
  await str(SUBMISSIONS, "type", 100, true);
  await str(SUBMISSIONS, "name", 255, true);
  await str(SUBMISSIONS, "email", 255, true);
  await str(SUBMISSIONS, "phone", 50);
  await str(SUBMISSIONS, "organization", 255);
  await str(SUBMISSIONS, "subject", 500);
  await str(SUBMISSIONS, "message", 10000, true);
  await bool(SUBMISSIONS, "read", false);

  // Attributes are processed asynchronously — wait before indexing.
  console.log("\nWaiting for attributes to be available…");
  await sleep(6000);

  console.log("\nIndexes:");
  await index(EVENTS, "idx_slug", ["slug"]);
  await index(EVENTS, "idx_order", ["order"]);
  await index(EVENTS, "idx_published", ["published"]);
  await index(BLOG, "idx_slug", ["slug"]);
  await index(BLOG, "idx_publishedAt", ["publishedAt"]);
  await index(BLOG, "idx_published", ["published"]);

  console.log("\nStorage:");
  await ensure(`bucket ${BUCKET}`, () =>
    storage.createBucket({
      bucketId: BUCKET,
      name: "Media",
      permissions: [
        Permission.read(Role.any()),
        Permission.create(Role.users()),
        Permission.update(Role.users()),
        Permission.delete(Role.users()),
      ],
      fileSecurity: false,
    }),
  );

  console.log("\nSeed data:");
  await ensure("site content document", () =>
    databases.createDocument({
      databaseId: DB,
      collectionId: SITE,
      documentId: SITE_DOC,
      data: { data: "{}" },
      permissions: collectionPermissions,
    }),
  );
  await seedEvents();
  await seedBlog();

  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;
  if (email && password) {
    console.log("\nAdmin user:");
    await ensure(`user ${email}`, () =>
      users.create({
        userId: ID.unique(),
        email,
        password,
        name: "Site Admin",
      }),
    );
  } else {
    console.log(
      "\n• No ADMIN_EMAIL/ADMIN_PASSWORD set — create an admin user in the Appwrite console (Auth) to log in at /admin/login.",
    );
  }

  console.log("\n✅ Appwrite setup complete.\n");
}

async function seedEvents() {
  const existing = await databases.listDocuments({
    databaseId: DB,
    collectionId: EVENTS,
  });
  if (existing.total > 0) {
    console.log("  • events (already seeded)");
    return;
  }
  const events = [
    {
      slug: "global-leadership-summit-2026",
      title: "Global Leadership Summit 2026",
      date: "August 15–17, 2026",
      location: "Johannesburg, South Africa",
      imageUrl:
        "https://images.pexels.com/photos/22669860/pexels-photo-22669860.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Large auditorium with dynamic stage lighting during a conference",
      ctaLabel: "Register Now",
      ctaTo: "#",
      description:
        "Three days of world-class teaching, mentorship, and connection for leaders who want to shape nations.",
      body: "<p>Three days of world-class teaching, mentorship, and connection for leaders who want to shape nations.</p>",
      featured: true,
      published: true,
      order: 0,
    },
    {
      slug: "kingdom-business-forum",
      title: "Kingdom Business Forum",
      date: "October 3–5, 2026",
      location: "Accra, Ghana",
      imageUrl:
        "https://images.pexels.com/photos/20733081/pexels-photo-20733081.jpeg?auto=compress&cs=tinysrgb&w=800",
      imageAlt: "Large audience attending a speaker at a conference",
      ctaLabel: "Register Now",
      ctaTo: "#",
      description:
        "A gathering of marketplace leaders exploring Kingdom principles for building enduring enterprises.",
      body: "<p>A gathering of marketplace leaders exploring Kingdom principles for building enduring enterprises.</p>",
      featured: false,
      published: true,
      order: 1,
    },
  ];
  for (const e of events) {
    await databases.createDocument({
      databaseId: DB,
      collectionId: EVENTS,
      documentId: ID.unique(),
      data: e,
      permissions: collectionPermissions,
    });
  }
  console.log(`  ✓ seeded ${events.length} events`);
}

async function seedBlog() {
  const existing = await databases.listDocuments({
    databaseId: DB,
    collectionId: BLOG,
  });
  if (existing.total > 0) {
    console.log("  • blog (already seeded)");
    return;
  }
  await databases.createDocument({
    databaseId: DB,
    collectionId: BLOG,
    documentId: ID.unique(),
    data: {
      slug: "why-character-outlasts-competence",
      title: "Why Character Outlasts Competence",
      excerpt:
        "Skills open doors, but character keeps you in the room. A short reflection on the foundation of enduring leadership.",
      body: "<p>Skills open doors, but character keeps you in the room.</p><h2>The foundation</h2><p>Great cultures value the person as much as the outcome. When we invest in who leaders are — not just what they do — we build organizations designed to last.</p>",
      coverImageUrl:
        "https://images.pexels.com/photos/8761349/pexels-photo-8761349.jpeg?auto=compress&cs=tinysrgb&w=800",
      coverImageAlt: "Diverse group of adults engaged in a business seminar",
      author: "David Owusu",
      tags: ["Leadership", "Character"],
      published: true,
      publishedAt: new Date().toISOString(),
    },
    permissions: collectionPermissions,
  });
  console.log("  ✓ seeded 1 blog post");
}

main().catch((err) => {
  console.error("\n✖ Setup failed:", err?.message || err);
  process.exit(1);
});
