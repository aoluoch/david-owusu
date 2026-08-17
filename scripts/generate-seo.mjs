import "dotenv/config";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { Client, Databases, Query } from "node-appwrite";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const SITE_URL = (process.env.SITE_URL || process.env.VITE_SITE_URL || "https://davidowusu.org")
  .trim()
  .replace(/\/+$/, "");
const STATIC_ROUTES = [
  "/",
  "/about",
  "/leadership",
  "/corporate",
  "/events",
  "/blog",
  "/gallery",
  "/contact",
  "/invite",
  "/partner",
  "/privacy-policy",
  "/terms-and-conditions",
];
const STATIC_META = {
  "/": ["David Owusu | Official Website", "Dr. David Owusu is a Christian leader, entrepreneur, mentor, and conference speaker equipping people, organizations, and communities for lasting impact."],
  "/about": ["About David Owusu | David Owusu", "Learn about Dr. David Owusu's leadership, ministry, business, and community impact."],
  "/leadership": ["Leadership | David Owusu", "Explore leadership programs, principles, books, and speaking topics from Dr. David Owusu."],
  "/corporate": ["Corporate Services | David Owusu", "Explore corporate consulting, leadership development, and business services from Dr. David Owusu."],
  "/events": ["Events | David Owusu", "Discover leadership summits, business forums, prayer conferences, and international events with Dr. David Owusu."],
  "/blog": ["Blog | David Owusu", "Read articles and reflections from Dr. David Owusu on leadership, faith, business, and enduring impact."],
  "/gallery": ["Gallery | David Owusu", "View moments from Dr. David Owusu's conferences, executive engagements, community outreach, and international tours."],
  "/contact": ["Contact David Owusu | David Owusu", "Contact Dr. David Owusu's team about speaking, coaching, partnerships, prayer, media, or general inquiries."],
  "/invite": ["Invite David Owusu to Speak | David Owusu", "Invite Dr. David Owusu to speak at your conference, leadership gathering, ministry event, or corporate engagement."],
  "/partner": ["Partner With David Owusu | David Owusu", "Explore partnerships that advance leadership, ministry, enterprise, and community transformation with David Owusu."],
  "/privacy-policy": ["Privacy Policy | David Owusu", "Read the privacy policy for the official David Owusu website."],
  "/terms-and-conditions": ["Terms and Conditions | David Owusu", "Read the terms and conditions for using the official David Owusu website."],
};
const NOINDEX_ROUTES = [
  "/admin",
  "/admin/login",
  "/admin/content",
  "/admin/events",
  "/admin/events/new",
  "/admin/blog",
  "/admin/blog/new",
  "/admin/gallery",
  "/admin/messages",
];

function validSiteUrl(value) {
  const url = new URL(value);
  if (url.protocol !== "https:" || url.hostname === "localhost" || url.hostname.endsWith(".local")) {
    throw new Error(`SITE_URL must be a public HTTPS origin, received: ${value}`);
  }
  if (url.pathname !== "/" || url.search || url.hash) {
    throw new Error(`SITE_URL must not contain a path, query, or hash: ${value}`);
  }
}

function validSlug(slug) {
  return typeof slug === "string" && /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug);
}

function xml(value) {
  return String(value).replace(/[<>&'\"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;",
  })[character]);
}

function html(value) {
  return String(value).replace(/[<>&\"]/g, (character) => ({
    "<": "&lt;", ">": "&gt;", "&": "&amp;", '"': "&quot;",
  })[character]);
}

function description(document, type) {
  const source = type === "blog" ? document.excerpt : document.description;
  return String(source || document.title || "").replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim().slice(0, 160);
}

function eventDateSelection(value) {
  const normalized = String(value || "").replace(/[–—]/g, "-").replace(/\s+/g, " ").trim();
  const monthIndex = {
    jan: 1, january: 1, feb: 2, february: 2, mar: 3, march: 3,
    apr: 4, april: 4, may: 5, jun: 6, june: 6, jul: 7, july: 7,
    aug: 8, august: 8, sep: 9, sept: 9, september: 9,
    oct: 10, october: 10, nov: 11, november: 11, dec: 12, december: 12,
  };
  const iso = (month, day, year) => {
    const number = monthIndex[month.toLowerCase()];
    return number ? `${year}-${String(number).padStart(2, "0")}-${day.padStart(2, "0")}` : "";
  };
  let match = normalized.match(/^([A-Za-z]+)\s+(\d{1,2})\s*-\s*(\d{1,2}),?\s+(\d{4})$/);
  if (match) return { startDate: iso(match[1], match[2], match[4]), endDate: iso(match[1], match[3], match[4]) };
  match = normalized.match(/^([A-Za-z]+)\s+(\d{1,2})\s*-\s*([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (match) return { startDate: iso(match[1], match[2], match[5]), endDate: iso(match[3], match[4], match[5]) };
  match = normalized.match(/^([A-Za-z]+)\s+(\d{1,2}),?\s+(\d{4})$/);
  if (match) return { startDate: iso(match[1], match[2], match[3]), endDate: "" };
  const parsed = new Date(normalized);
  return Number.isNaN(parsed.getTime())
    ? { startDate: "", endDate: "" }
    : { startDate: parsed.toISOString().slice(0, 10), endDate: "" };
}

function routeJsonLd(route) {
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const segments = route.path.split("/").filter(Boolean);
  const labels = {
    about: "About",
    leadership: "Leadership",
    corporate: "Corporate Services",
    events: "Events",
    blog: "Blog",
    gallery: "Gallery",
    contact: "Contact",
    invite: "Invite David",
    partner: "Partner",
    "privacy-policy": "Privacy Policy",
    "terms-and-conditions": "Terms and Conditions",
  };
  const schemas = [];
  if (segments.length) {
    schemas.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
        ...segments.map((segment, index) => ({
          "@type": "ListItem",
          position: index + 2,
          name: index === segments.length - 1 && route.item
            ? route.item.title
            : labels[segment] || segment,
          item: `${SITE_URL}/${segments.slice(0, index + 1).join("/")}`,
        })),
      ],
    });
  }
  if (route.type === "blog") {
    schemas.unshift({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: route.item.title,
      description: description(route.item, route.type),
      image: route.item.coverImageUrl || undefined,
      datePublished: route.item.publishedAt,
      dateModified: route.item.$updatedAt || route.item.publishedAt,
      author: { "@type": "Person", name: route.item.author || "David Owusu", url: `${SITE_URL}/about` },
      publisher: { "@id": `${SITE_URL}/#organization` },
      mainEntityOfPage: canonical,
    });
  }
  if (route.type === "event") {
    const { startDate, endDate } = eventDateSelection(route.item.date);
    schemas.unshift({
      "@context": "https://schema.org",
      "@type": "Event",
      name: route.item.title,
      description: description(route.item, route.type),
      image: route.item.imageUrl || undefined,
      startDate: startDate || undefined,
      endDate: endDate || undefined,
      eventStatus: "https://schema.org/EventScheduled",
      eventAttendanceMode: route.item.location
        ? "https://schema.org/OfflineEventAttendanceMode"
        : undefined,
      location: route.item.location
        ? { "@type": "Place", name: route.item.location }
        : undefined,
      organizer: { "@id": `${SITE_URL}/#organization` },
      url: canonical,
    });
  }
  return schemas;
}

async function listPublished(collectionId) {
  const projectId = process.env.APPWRITE_PROJECT_ID || process.env.VITE_APPWRITE_PROJECT_ID;
  if (!projectId) return [];

  const client = new Client()
    .setEndpoint(process.env.APPWRITE_ENDPOINT || process.env.VITE_APPWRITE_ENDPOINT || "https://cloud.appwrite.io/v1")
    .setProject(projectId);
  const apiKey = process.env.APPWRITE_API_KEY;
  if (apiKey) client.setKey(apiKey);

  const databases = new Databases(client);
  const databaseId = process.env.VITE_APPWRITE_DATABASE_ID || "main";
  const documents = [];
  for (let offset = 0; ; offset += 100) {
    const result = await databases.listDocuments({
      databaseId,
      collectionId,
      queries: [Query.equal("published", true), Query.limit(100), Query.offset(offset)],
    });
    documents.push(...result.documents);
    if (result.documents.length < 100) break;
  }
  return documents.filter((document) => {
    if (validSlug(document.slug)) return true;
    console.warn(`Skipping ${collectionId} document with invalid sitemap slug: ${document.slug || "(empty)"}`);
    return false;
  });
}

async function contentRoutes() {
  const eventsId = process.env.VITE_APPWRITE_EVENTS_COLLECTION_ID || "events";
  const blogId = process.env.VITE_APPWRITE_BLOG_COLLECTION_ID || "blog";
  const [events, posts] = await Promise.all([listPublished(eventsId), listPublished(blogId)]);
  const routes = [
    ...events.map((item) => ({ path: `/events/${item.slug}`, type: "event", item })),
    ...posts.map((item) => ({ path: `/blog/${item.slug}`, type: "blog", item })),
  ];
  const paths = new Set();
  for (const route of routes) {
    if (paths.has(route.path)) {
      throw new Error(`Duplicate published slug resolves to ${route.path}`);
    }
    paths.add(route.path);
  }
  return routes;
}

function lastModified(item) {
  const value = item?.$updatedAt || item?.publishedAt;
  const date = value ? new Date(value) : null;
  return date && !Number.isNaN(date.getTime()) ? date.toISOString() : undefined;
}

async function generatePublicFiles(dynamicRoutes) {
  const output = path.join(ROOT, "public");
  await mkdir(output, { recursive: true });
  const entries = [
    ...STATIC_ROUTES.map((route) => ({ path: route })),
    ...dynamicRoutes,
  ].sort((a, b) => a.path.localeCompare(b.path));
  const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...entries.map(({ path: route, item }) => {
      const modified = lastModified(item);
      return `  <url>\n    <loc>${xml(`${SITE_URL}${route === "/" ? "/" : route}`)}</loc>${modified ? `\n    <lastmod>${modified}</lastmod>` : ""}\n  </url>`;
    }),
    "</urlset>",
    "",
  ].join("\n");
  const robots = [
    "User-agent: *",
    "Allow: /",
    "Disallow: /admin",
    "Disallow: /admin/",
    "Disallow: /*?*",
    "",
    `Sitemap: ${SITE_URL}/sitemap.xml`,
    "",
  ].join("\n");
  await Promise.all([
    writeFile(path.join(output, "sitemap.xml"), sitemap),
    writeFile(path.join(output, "robots.txt"), robots),
  ]);
  console.log(`Generated sitemap.xml with ${entries.length} canonical URLs and robots.txt.`);
}

function replaceHead(source, route) {
  const isDynamic = Boolean(route.item);
  const title = isDynamic
    ? `${route.item.title} | David Owusu`
    : route.noindex
      ? `${route.path === "/404" ? "Page Not Found" : "Website Administration"} | David Owusu`
      : STATIC_META[route.path][0];
  const summary = isDynamic
    ? description(route.item, route.type)
    : route.noindex
      ? route.path === "/404"
        ? "The requested page could not be found on the David Owusu website."
        : "Private website administration area."
      : STATIC_META[route.path][1];
  const canonical = `${SITE_URL}${route.path === "/" ? "/" : route.path}`;
  const image = isDynamic ? (route.type === "blog" ? route.item.coverImageUrl : route.item.imageUrl) : "";
  const type = route.type === "blog" ? "article" : "website";
  let result = source
    .replace(/<title>.*?<\/title>/s, `<title>${html(title)}</title>`)
    .replace(/<meta\s+name="description"[\s\S]*?\/>/, `<meta name="description" content="${html(summary)}" />`)
    .replace(
      /<meta\s+name="robots"[^>]*>/,
      `<meta name="robots" content="${route.noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large"}" />`,
    )
    .replace(
      /<link\s+rel="canonical"[^>]*>/,
      route.path === "/404" ? "" : `<link rel="canonical" href="${html(canonical)}" />`,
    )
    .replace(/<meta\s+property="og:title"[^>]*>/, `<meta property="og:title" content="${html(title)}" />`)
    .replace(/<meta\s+property="og:description"[^>]*>/, `<meta property="og:description" content="${html(summary)}" />`)
    .replace(/<meta\s+property="og:type"[^>]*>/, `<meta property="og:type" content="${type}" />`)
    .replace(/<meta\s+property="og:url"[^>]*>/, `<meta property="og:url" content="${html(canonical)}" />`)
    .replace(/<meta\s+name="twitter:title"[^>]*>/, `<meta name="twitter:title" content="${html(title)}" />`)
    .replace(/<meta\s+name="twitter:description"[^>]*>/, `<meta name="twitter:description" content="${html(summary)}" />`);
  if (image) {
    result = result
      .replace(/<meta\s+property="og:image"[^>]*>/, `<meta property="og:image" content="${html(image)}" />`)
      .replace(/<meta\s+name="twitter:image"[^>]*>/, `<meta name="twitter:image" content="${html(image)}" />`);
  }
  const schemas = route.noindex ? [] : routeJsonLd(route);
  if (schemas.length) {
    const scripts = schemas
      .map((schema) => `<script type="application/ld+json">${JSON.stringify(schema).replace(/</g, "\\u003c")}</script>`)
      .join("\n    ");
    result = result.replace("</head>", `    ${scripts}\n  </head>`);
  }
  return result;
}

async function generateRouteShells(dynamicRoutes) {
  const dist = path.join(ROOT, "dist");
  const source = await readFile(path.join(dist, "index.html"), "utf8");
  const routes = [
    ...STATIC_ROUTES.map((route) => ({ path: route })),
    ...dynamicRoutes,
    ...NOINDEX_ROUTES.map((route) => ({ path: route, noindex: true })),
  ];
  await Promise.all(routes.filter(({ path: route }) => route !== "/").map(async (route) => {
    const directory = path.join(dist, route.path.slice(1));
    await mkdir(directory, { recursive: true });
    await writeFile(path.join(directory, "index.html"), replaceHead(source, route));
  }));
  await writeFile(path.join(dist, "index.html"), replaceHead(source, { path: "/" }));
  await writeFile(
    path.join(dist, "404.html"),
    replaceHead(source, { path: "/404", noindex: true }),
  );
  console.log(`Generated ${routes.length} route-specific HTML entry points and 404.html.`);
}

validSiteUrl(SITE_URL);
let dynamicRoutes = [];
try {
  dynamicRoutes = await contentRoutes();
} catch (error) {
  console.error(`Unable to load published Appwrite content for SEO generation: ${error.message}`);
  if (
    process.env.APPWRITE_PROJECT_ID ||
    process.env.VITE_APPWRITE_PROJECT_ID ||
    process.env.CI ||
    process.env.NODE_ENV === "production"
  ) process.exit(1);
}

if (process.argv.includes("--route-shells")) {
  await generateRouteShells(dynamicRoutes);
} else {
  await generatePublicFiles(dynamicRoutes);
}