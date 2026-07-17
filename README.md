# David Owusu — Official Website

Premium, modern, executive-style personal website for **Dr. David Owusu** —
Christian leader, entrepreneur, mentor, and conference speaker.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4**,
**React Router**, **Contentful**, and **lucide-react**.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. (Optional) Configure Contentful
cp .env.example .env
# then edit .env with your Contentful credentials

# 3. Start the dev server
npm run dev
```

Then visit http://localhost:5173.

### Scripts

| Script            | What it does                             |
| ----------------- | ---------------------------------------- |
| `npm run dev`     | Start Vite dev server                    |
| `npm run build`   | Type-check and produce a production build |
| `npm run preview` | Preview the production build             |
| `npm run lint`    | Lint the project                          |

---

## Folder Structure

```
davidowusu/
├── public/                     # Static assets
├── src/
│   ├── main.tsx                # React entry
│   ├── App.tsx                 # ContentProvider + RouterProvider
│   ├── index.css               # Tailwind + brand theme
│   │
│   ├── router/
│   │   └── index.tsx           # Route table (uses MainLayout)
│   │
│   ├── layouts/
│   │   └── MainLayout.tsx      # Navbar + <Outlet/> + Footer
│   │
│   ├── pages/                  # Route-level components
│   │   ├── HomePage.tsx
│   │   ├── AboutPage.tsx
│   │   ├── LeadershipPage.tsx
│   │   ├── CorporatePage.tsx
│   │   ├── EventsPage.tsx
│   │   ├── GalleryPage.tsx
│   │   ├── ContactPage.tsx
│   │   └── NotFoundPage.tsx
│   │
│   ├── components/
│   │   ├── layout/                       # Navbar, Footer
│   │   ├── sections/                     # Every section is its own component,
│   │   │   │                             # grouped by the page it belongs to.
│   │   │   ├── shared/                   # Reused across pages
│   │   │   │   ├── PageHero.tsx
│   │   │   │   ├── FinalCTA.tsx
│   │   │   │   ├── Testimonials.tsx
│   │   │   │   ├── UpcomingEvents.tsx
│   │   │   │   ├── FeaturedOrganizations.tsx
│   │   │   │   └── index.ts              # barrel export
│   │   │   ├── home/                     # Home page sections
│   │   │   │   ├── Hero.tsx
│   │   │   │   ├── ImpactStats.tsx
│   │   │   │   ├── AboutPreview.tsx
│   │   │   │   ├── AreasOfInfluence.tsx
│   │   │   │   ├── VisionMission.tsx
│   │   │   │   ├── GalleryPreview.tsx
│   │   │   │   └── index.ts
│   │   │   ├── about/                    # About page sections
│   │   │   │   ├── AboutBiography.tsx
│   │   │   │   ├── AboutTimeline.tsx
│   │   │   │   ├── AboutValues.tsx
│   │   │   │   ├── AboutAwards.tsx
│   │   │   │   ├── AboutQuote.tsx
│   │   │   │   └── index.ts
│   │   │   ├── leadership/               # Leadership page sections
│   │   │   │   ├── LeadershipPhilosophy.tsx
│   │   │   │   ├── LeadershipPrinciples.tsx
│   │   │   │   ├── LeadershipPrograms.tsx
│   │   │   │   ├── LeadershipBooks.tsx
│   │   │   │   ├── LeadershipSpeakingTopics.tsx
│   │   │   │   └── index.ts
│   │   │   ├── corporate/                # Corporate page sections
│   │   │   │   ├── CorporateBio.tsx
│   │   │   │   ├── CorporateServices.tsx
│   │   │   │   ├── CorporateIndustries.tsx
│   │   │   │   ├── CorporateCaseStudies.tsx
│   │   │   │   └── index.ts
│   │   │   ├── events/                   # Events page sections
│   │   │   │   ├── FeaturedEvent.tsx
│   │   │   │   └── index.ts
│   │   │   ├── gallery/                  # Gallery page sections
│   │   │   │   ├── GalleryGrid.tsx       # (grid + lightbox + filters)
│   │   │   │   └── index.ts
│   │   │   ├── contact/                  # Contact page sections
│   │   │   │   ├── ContactInfo.tsx
│   │   │   │   ├── ContactForm.tsx
│   │   │   │   ├── ContactPanel.tsx      # Info + Form together
│   │   │   │   ├── ContactFAQ.tsx
│   │   │   │   ├── ContactMap.tsx
│   │   │   │   └── index.ts
│   │   │   └── index.ts                  # namespaced re-exports
│   │   └── ui/                           # Reusable primitives
│   │       ├── Container.tsx
│   │       ├── Button.tsx
│   │       ├── Icon.tsx
│   │       ├── Reveal.tsx
│   │       ├── CountUp.tsx
│   │       └── SectionHeading.tsx
│   │
│   ├── hooks/
│   │   ├── useReveal.ts        # Fade-in-on-scroll (IntersectionObserver)
│   │   └── useCountUp.ts       # Animated counter
│   │
│   ├── lib/
│   │   ├── contentful.ts       # Contentful client + fetch helpers
│   │   ├── ContentContext.tsx  # React context/provider for site content
│   │   └── utils.ts            # cn() classnames helper
│   │
│   ├── data/
│   │   └── siteContent.ts      # Default/fallback content (used when
│   │                           # Contentful is not configured)
│   │
│   └── types/
│       └── content.ts          # SiteContent type + related interfaces
│
├── .env.example                # Contentful env var template
├── index.html                  # HTML shell + Google Fonts
├── tailwind config lives in `src/index.css` via `@theme`
└── vite.config.ts
```

---

## Content Management (Contentful)

By default the site renders content from `src/data/siteContent.ts`.
Once Contentful is configured, the app automatically fetches from the CMS and
merges those values on top of the defaults (any field you don't override in
Contentful will keep using the default).

### 1. Create the content type

In your Contentful space create a content type — recommended id:

- **Content type id**: `siteContent`
- **Field**:
  - `content` — type **JSON Object**

### 2. Create an entry

Add a single entry of type `siteContent`. In its `content` JSON field, paste
any subset of the shape defined in `src/types/content.ts`. For example:

```json
{
  "hero": {
    "headline": "Raising Leaders. Transforming Nations.",
    "subheadline": "Updated straight from Contentful."
  },
  "stats": [
    { "value": 60, "label": "Countries Reached", "icon": "globe" }
  ]
}
```

### 3. Add environment variables

Create a `.env` file at the project root:

```env
VITE_CONTENTFUL_SPACE_ID=your_space_id
VITE_CONTENTFUL_ACCESS_TOKEN=your_delivery_api_token

# Optional overrides:
# VITE_CONTENTFUL_ENVIRONMENT=master
# VITE_CONTENTFUL_CONTENT_TYPE_ID=siteContent
# VITE_CONTENTFUL_ENTRY_ID=some_entry_id
```

Restart `npm run dev` and any values you set in Contentful will override the
defaults on next page load.

### Where do updates land?

`ContentProvider` (in `src/lib/ContentContext.tsx`) fetches content once at
startup. Every page/component reads via `useContent()`, so a single edit in
Contentful flows through the whole app — the hero, stats, influence cards,
events, testimonials, gallery, about page, leadership page, corporate page,
contact info, footer… all of it.

---

## Brand System

- **Fonts** – Playfair Display (headings), Poppins (body). Loaded from Google
  Fonts in `index.html`.
- **Colors** – Royal Blue `#0B3C91`, Navy `#102542`, Gold `#C8A046`, Light
  `#F5F7FA`, Slate `#1F2937`. Wired into Tailwind via `@theme` in
  `src/index.css` — use e.g. `text-royal`, `bg-navy`, `text-gold`.
- **Motion** – Reveal-on-scroll (`useReveal`), count-up stats (`useCountUp`),
  hover lifts (`card-lift`), smooth scrolling, and a glassy sticky nav.

---

## Pages

Pages are pure **composition** — they only import and arrange section
components. All layout, styling, and content-fetching happens inside the
section components themselves. That means editing a page never requires
touching JSX/HTML — you just reorder or add/remove components.

Example — `src/pages/AboutPage.tsx`:

```tsx
import {
  AboutAwards, AboutBiography, AboutQuote,
  AboutTimeline, AboutValues,
} from "../components/sections/about";
import { FinalCTA, PageHero } from "../components/sections/shared";

export function AboutPage() {
  const { about } = useContent();
  return (
    <>
      <PageHero eyebrow="About David Owusu" title="..." imageUrl={about.heroImage} />
      <AboutBiography />
      <AboutTimeline />
      <AboutValues />
      <AboutAwards />
      <AboutQuote />
      <FinalCTA />
    </>
  );
}
```

| Route          | Page                | Composed of                                          |
| -------------- | ------------------- | ---------------------------------------------------- |
| `/`            | HomePage            | Hero, ImpactStats, AboutPreview, AreasOfInfluence, VisionMission, FeaturedOrganizations, UpcomingEvents, Testimonials, GalleryPreview, FinalCTA |
| `/about`       | AboutPage           | PageHero, AboutBiography, AboutTimeline, AboutValues, AboutAwards, AboutQuote, FinalCTA |
| `/leadership`  | LeadershipPage      | PageHero, LeadershipPhilosophy, LeadershipPrinciples, LeadershipPrograms, LeadershipBooks, LeadershipSpeakingTopics, Testimonials, FinalCTA |
| `/corporate`   | CorporatePage       | PageHero, CorporateBio, CorporateServices, CorporateIndustries, CorporateCaseStudies, FeaturedOrganizations, FinalCTA |
| `/events`      | EventsPage          | PageHero, FeaturedEvent, UpcomingEvents, FinalCTA    |
| `/gallery`     | GalleryPage         | PageHero, GalleryGrid, FinalCTA                      |
| `/contact`     | ContactPage         | PageHero, ContactPanel (Info + Form), ContactFAQ, ContactMap |
| `*`            | NotFoundPage        | 404                                                  |

### Wiring a component to Contentful

Every section component reads its own slice of content via `useContent()`:

```tsx
// src/components/sections/about/AboutBiography.tsx
export function AboutBiography() {
  const { about } = useContent();
  return (
    <section>
      {about.biography.map((p, i) => <p key={i}>{p}</p>)}
    </section>
  );
}
```

So when you add a matching field in Contentful (e.g. `about.biography`) the
component picks it up automatically — no page-level changes required.
