import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import type { BlogPost, EventItem, Service, SiteContent } from "../types/content";
import { parseEventDateSelection } from "./eventDates";

export const SITE_URL =
  ((import.meta.env.VITE_SITE_URL as string | undefined) ??
    "https://davidowusu.org").replace(/\/+$/, "");

export const SITE_NAME = "David Owusu";
export const DEFAULT_DESCRIPTION =
  "Dr. David Owusu is a Christian leader, entrepreneur, mentor, and conference speaker equipping people, organizations, and communities for lasting impact.";

const DEFAULT_IMAGE =
  "https://fra.cloud.appwrite.io/v1/storage/buckets/media/files/6a6de759001bb81b2f0f/view?project=6a574a10002318a5d6cc";

export function absoluteUrl(path = "/"): string {
  if (/^https?:\/\//i.test(path)) return path;
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_URL}${cleanPath === "/" ? "/" : cleanPath.replace(/\/+$/, "")}`;
}

export function stripHtml(html = ""): string {
  return html.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();
}

export function truncateText(text: string, maxLength = 160): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength - 1).trim()}...`;
}

function upsertMeta(attribute: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(
    `meta[${attribute}="${key}"]`,
  );
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attribute, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

function removeMeta(attribute: "name" | "property", key: string) {
  document.head.querySelector(`meta[${attribute}="${key}"]`)?.remove();
}

function upsertLink(rel: string, href: string) {
  let el = document.head.querySelector<HTMLLinkElement>(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.rel = rel;
    document.head.appendChild(el);
  }
  el.href = href;
}

function setJsonLd(id: string, data: unknown) {
  let el = document.getElementById(id) as HTMLScriptElement | null;
  if (!el) {
    el = document.createElement("script");
    el.id = id;
    el.type = "application/ld+json";
    document.head.appendChild(el);
  }
  el.text = JSON.stringify(data);
}

function removeJsonLd(id: string) {
  document.getElementById(id)?.remove();
}

export interface SeoConfig {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
  noindex?: boolean;
  jsonLd?: unknown[];
}

export function useSeo({
  title,
  description = DEFAULT_DESCRIPTION,
  path,
  image = DEFAULT_IMAGE,
  type = "website",
  publishedTime,
  noindex = false,
  jsonLd = [],
}: SeoConfig) {
  const location = useLocation();
  const canonical = absoluteUrl(path ?? location.pathname);
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const summary = truncateText(description);
  const shareImage = absoluteUrl(image);

  useEffect(() => {
    document.title = fullTitle;
    upsertMeta("name", "description", summary);
    upsertMeta(
      "name",
      "robots",
      noindex ? "noindex, nofollow" : "index, follow, max-image-preview:large",
    );
    upsertLink("canonical", canonical);

    upsertMeta("property", "og:site_name", SITE_NAME);
    upsertMeta("property", "og:title", fullTitle);
    upsertMeta("property", "og:description", summary);
    upsertMeta("property", "og:type", type);
    upsertMeta("property", "og:url", canonical);
    upsertMeta("property", "og:image", shareImage);
    upsertMeta("property", "og:image:alt", `${title} - ${SITE_NAME}`);

    upsertMeta("name", "twitter:card", "summary_large_image");
    upsertMeta("name", "twitter:title", fullTitle);
    upsertMeta("name", "twitter:description", summary);
    upsertMeta("name", "twitter:image", shareImage);

    if (type === "article") {
      upsertMeta("property", "article:publisher", `${SITE_URL}/`);
      if (publishedTime) {
        upsertMeta("property", "article:published_time", publishedTime);
      } else {
        removeMeta("property", "article:published_time");
      }
    } else {
      removeMeta("property", "article:publisher");
      removeMeta("property", "article:published_time");
    }

    if (jsonLd.length) {
      setJsonLd(
        "page-json-ld",
        jsonLd.length === 1 ? jsonLd[0] : { "@context": "https://schema.org", "@graph": jsonLd },
      );
    } else {
      removeJsonLd("page-json-ld");
    }
  }, [canonical, fullTitle, jsonLd, noindex, publishedTime, shareImage, summary, title, type]);
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: SITE_NAME,
    url: `${SITE_URL}/`,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function organizationJsonLd(content?: SiteContent) {
  const contact = content?.footer?.contact;
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: content?.brand?.name || SITE_NAME,
    url: `${SITE_URL}/`,
    description: content?.brand?.tagline || DEFAULT_DESCRIPTION,
    email: contact?.email || undefined,
    telephone: contact?.phone || undefined,
    address: contact?.address || undefined,
    sameAs: content?.footer?.socialLinks?.map((link) => link.to).filter(Boolean),
  };
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}

export function articleJsonLd(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: truncateText(post.excerpt || stripHtml(post.body)),
    image: post.coverImageUrl || undefined,
    author: post.author ? { "@type": "Person", name: post.author } : undefined,
    datePublished: post.publishedAt,
    publisher: { "@id": `${SITE_URL}/#organization` },
    mainEntityOfPage: absoluteUrl(`/blog/${post.slug}`),
  };
}

export function eventJsonLd(event: EventItem) {
  const { startDate, endDate } = parseEventDateSelection(event.date);
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: truncateText(event.description || stripHtml(event.body || "")),
    image: event.imageUrl || undefined,
    startDate: startDate || undefined,
    endDate: endDate || undefined,
    location: event.location
      ? { "@type": "Place", name: event.location }
      : undefined,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: event.location
      ? "https://schema.org/OfflineEventAttendanceMode"
      : undefined,
    url: absoluteUrl(`/events/${event.slug ?? ""}`),
    organizer: { "@id": `${SITE_URL}/#organization` },
  };
}

export function servicesJsonLd(services: Service[]) {
  return services
    .filter((service) => service.title && service.description)
    .map((service) => ({
      "@context": "https://schema.org",
      "@type": "Service",
      name: service.title,
      description: service.description,
      provider: { "@id": `${SITE_URL}/#organization` },
      areaServed: "Worldwide",
      url: absoluteUrl("/corporate"),
    }));
}
