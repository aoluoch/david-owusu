/**
 * Content type definitions for the David Owusu website.
 *
 * These interfaces describe the shape of content used across the site.
 * They are also used to type responses from Contentful so that content
 * can be authored in the CMS and rendered directly by React components.
 */

export type IconName =
  | "book-open"
  | "compass"
  | "briefcase"
  | "trending-up"
  | "heart-handshake"
  | "building"
  | "globe"
  | "mic"
  | "users"
  | "award"
  | "target"
  | "eye"
  | "sparkles"
  | "shield"
  | "graduation-cap"
  | "handshake"
  | "megaphone"
  | "calendar"
  | "map-pin"
  | "mail"
  | "phone";

export interface NavLink {
  label: string;
  to: string;
}

/** The hero band (eyebrow + title + description) at the top of a page. */
export interface PageHeader {
  eyebrow: string;
  title: string;
  description: string;
}

export interface HeroContent {
  eyebrow?: string;
  headline: string;
  subheadline: string;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
  portraitUrl: string;
  portraitAlt: string;
}

export interface Stat {
  value: number;
  label: string;
  icon: IconName;
  suffix?: string;
}

export interface AboutPreviewContent {
  eyebrow: string;
  heading: string;
  body: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel: string;
  ctaTo: string;
}

export interface InfluenceArea {
  title: string;
  description: string;
  icon: IconName;
}

export interface VisionMission {
  vision: { title: string; body: string };
  mission: { title: string; body: string };
}

export interface Organization {
  name: string;
  description: string;
  logoUrl: string;
  websiteEnabled?: boolean;
  websiteUrl?: string;
}

export interface EventItem {
  id?: string;
  slug?: string;
  title: string;
  date: string;
  location: string;
  imageUrl: string;
  imageAlt: string;
  ctaLabel: string;
  ctaTo: string;
  registrationEnabled?: boolean;
  featured?: boolean;
  /** Short plain-text summary shown on cards. */
  description?: string;
  /** Full rich-text (HTML) body shown on the event detail page. */
  body?: string;
  published?: boolean;
  order?: number;
}

export interface BlogPost {
  id?: string;
  slug: string;
  title: string;
  excerpt: string;
  /** Rich-text (HTML) body. */
  body: string;
  coverImageUrl: string;
  coverImageAlt: string;
  author: string;
  tags: string[];
  published: boolean;
  /** ISO date string. */
  publishedAt: string;
}

/** The kind of inquiry a visitor submitted through a public form. */
export type SubmissionType =
  | "Speaking Invitation"
  | "Partnership"
  | "Business Inquiry"
  | "Prayer Request"
  | "Media Request"
  | "Event Registration"
  | "General";

/** A message submitted by a site visitor, received by the admin. */
export interface Submission {
  id?: string;
  type: SubmissionType | string;
  name: string;
  email: string;
  phone?: string;
  organization?: string;
  /** Optional context line (e.g. event name, date, engagement). */
  subject?: string;
  message: string;
  read: boolean;
  /** ISO date string (Appwrite `$createdAt`). */
  createdAt: string;
}

export interface Testimonial {
  quote: string;
  name: string;
  role: string;
  photoUrl: string;
  rating?: number;
}

export interface GalleryImage {
  url: string;
  alt: string;
  category?: string;
}

export interface CTASection {
  heading: string;
  subtext: string;
  primaryCta: { label: string; to: string };
  secondaryCta: { label: string; to: string };
}

export interface FooterContent {
  brand: string;
  tagline: string;
  columns: { title: string; links: NavLink[] }[];
  socialLinks: { label: string; to: string }[];
  contact: { email: string; phone: string; address: string };
  copyright: string;
}

export interface LegalPageContent {
  title: string;
  updatedAt: string;
  introduction: string;
  sections: { title: string; body: string[] }[];
}

export interface TimelineItem {
  year: string;
  title: string;
  description: string;
}

export interface Value {
  title: string;
  description: string;
  icon: IconName;
}

export interface Book {
  title: string;
  description: string;
  coverUrl: string;
  purchaseUrl?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: IconName;
}

export interface SiteContent {
  brand: { name: string; tagline: string };
  nav: NavLink[];
  ctaButtons: { primary: NavLink; secondary: NavLink };
  /** Editable page hero bands for the static content pages. */
  pageHeaders: {
    about: PageHeader;
    leadership: PageHeader;
    corporate: PageHeader;
  };
  hero: HeroContent;
  stats: Stat[];
  aboutPreview: AboutPreviewContent;
  influenceAreas: InfluenceArea[];
  visionMission: VisionMission;
  organizations: Organization[];
  events: EventItem[];
  testimonials: Testimonial[];
  galleryPreview: GalleryImage[];
  finalCta: CTASection;
  footer: FooterContent;
  legal: {
    privacy: LegalPageContent;
    terms: LegalPageContent;
  };

  about: {
    heroImage: string;
    biography: string[];
    timeline: TimelineItem[];
    values: Value[];
    awards: string[];
    quote: string;
  };

  leadership: {
    philosophy: string;
    principles: { title: string; description: string }[];
    programs: { title: string; description: string; icon: IconName }[];
    books: Book[];
    speakingTopics: string[];
  };

  corporate: {
    bio: string;
    services: Service[];
    industries: string[];
    caseStudies: {
      title: string;
      client: string;
      outcome: string;
      imageUrl: string;
    }[];
  };

  contact: {
    email: string;
    phone: string;
    address: string;
    faqs: { q: string; a: string }[];
  };
}
