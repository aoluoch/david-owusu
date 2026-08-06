import type { SiteContent } from "../types/content";

/**
 * Empty content shell used only to keep the UI shape stable before admin
 * content loads. Public copy/media should come from the stored admin content.
 */
export const emptySiteContent: SiteContent = {
  brand: {
    name: "",
    tagline: "",
  },
  nav: [],
  ctaButtons: {
    primary: { label: "", to: "/" },
    secondary: { label: "", to: "/" },
  },
  pageHeaders: {
    about: { eyebrow: "", title: "", description: "" },
    leadership: { eyebrow: "", title: "", description: "" },
    corporate: { eyebrow: "", title: "", description: "" },
  },
  hero: {
    headline: "",
    subheadline: "",
    primaryCta: { label: "", to: "/" },
    secondaryCta: { label: "", to: "/" },
    portraitUrl: "",
    portraitAlt: "",
  },
  stats: [],
  aboutPreview: {
    eyebrow: "",
    heading: "",
    body: "",
    imageUrl: "",
    imageAlt: "",
    ctaLabel: "",
    ctaTo: "/about",
  },
  influenceAreas: [],
  visionMission: {
    vision: { title: "", body: "" },
    mission: { title: "", body: "" },
  },
  organizations: [],
  events: [],
  testimonials: [],
  galleryPreview: [],
  finalCta: {
    heading: "",
    subtext: "",
    primaryCta: { label: "", to: "/" },
    secondaryCta: { label: "", to: "/" },
  },
  footer: {
    brand: "",
    tagline: "",
    columns: [],
    socialLinks: [],
    contact: {
      email: "",
      phone: "",
      address: "",
    },
    copyright: "",
  },
  legal: {
    privacy: {
      title: "",
      updatedAt: "",
      introduction: "",
      sections: [],
    },
    terms: {
      title: "",
      updatedAt: "",
      introduction: "",
      sections: [],
    },
  },
  about: {
    heroImage: "",
    biography: [],
    timeline: [],
    values: [],
    awards: [],
    quote: "",
  },
  leadership: {
    philosophy: "",
    principles: [],
    programs: [],
    books: [],
    speakingTopics: [],
  },
  corporate: {
    bio: "",
    services: [],
    industries: [],
    caseStudies: [],
  },
  contact: {
    email: "",
    phone: "",
    address: "",
    faqs: [],
  },
};
