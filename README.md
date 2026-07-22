 # David Owusu — Official Website

Premium, modern, executive-style personal website for **Dr. David Owusu** —
Christian leader, entrepreneur, mentor, and conference speaker.

Built with **React 19**, **TypeScript**, **Vite**, **Tailwind CSS 4**,
**React Router**, **Appwrite** (backend + auth + storage), and **lucide-react**.

It includes a full **admin dashboard** at `/admin` for managing every part of
the site — page content, the navbar buttons, events (with detail pages), and a
blog — with a built-in **rich-text editor** for event and article bodies.

---

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure Appwrite (see "Backend (Appwrite)" below)
cp .env.example .env
# then edit .env with your Appwrite project id + API key

# 3. Provision the backend (database, collections, storage, admin user)
npm run setup:appwrite

# 4. Start the dev server
npm run dev
```

Then visit http://localhost:5173 (public site) and http://localhost:5173/admin
(dashboard). Without Appwrite configured, the public site still renders using
the built-in default content in `src/data/siteContent.ts`.

### Scripts

| Script                   | What it does                                        |
| ------------------------ | --------------------------------------------------- |
| `npm run dev`            | Start Vite dev server                               |
| `npm run build`          | Type-check and produce a production build           |
| `npm run preview`        | Preview the production build                        |
| `npm run lint`           | Lint the project                                    |
| `npm run setup:appwrite` | Create the Appwrite database, collections & bucket  |

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
│   │   ├── ui/                           # Reusable primitives
│   │   │   ├── Container.tsx
│   │   │   ├── Button.tsx                # incl. SmartButtonLink (internal/external)
│   │   │   ├── RichText.tsx              # renders admin-authored HTML
│   │   │   ├── Icon.tsx
│   │   │   ├── Reveal.tsx
│   │   │   ├── CountUp.tsx
│   │   │   └── SectionHeading.tsx
│   │   └── admin/
│   │       └── RichTextEditor.tsx        # WYSIWYG editor (HTML output)
│   │
│   ├── admin/                  # Admin dashboard (guarded by /admin)
│   │   ├── AdminLayout.tsx     # Sidebar shell + logout
│   │   ├── RequireAuth.tsx     # Route guard
│   │   ├── AdminLogin.tsx
│   │   ├── AdminDashboard.tsx
│   │   ├── AdminContent.tsx    # Site content editor (forms + JSON)
│   │   ├── AdminEvents.tsx / AdminEventEdit.tsx
│   │   ├── AdminBlog.tsx / AdminBlogEdit.tsx
│   │   └── components/         # Admin form primitives + MediaInput
│   │
│   ├── hooks/
│   │   ├── useReveal.ts        # Fade-in-on-scroll (IntersectionObserver)
│   │   └── useCountUp.ts       # Animated counter
│   │
│   ├── lib/
│   │   ├── appwrite.ts         # Appwrite client + config + service handles
│   │   ├── api.ts              # Data layer: site content, events, blog, media
│   │   ├── AuthContext.tsx     # Admin auth (Appwrite Account)
│   │   ├── ContentContext.tsx  # React context/provider for site content
│   │   └── utils.ts            # cn(), slugify(), isExternalUrl()
│   │
│   ├── data/
│   │   └── siteContent.ts      # Default/fallback content (used when
│   │                           # Appwrite is not configured)
│   │
│   └── types/
│       └── content.ts          # SiteContent, EventItem, BlogPost interfaces
│
├── scripts/
│   └── setup-appwrite.mjs      # Provisions DB, collections, bucket, admin
├── .env.example                # Appwrite env var template
├── index.html                  # HTML shell + Google Fonts
├── tailwind config lives in `src/index.css` via `@theme`
└── vite.config.ts
```

---

## Backend (Appwrite)

The site uses **Appwrite** for its database, authentication, and file storage.
By default the public site renders the content in `src/data/siteContent.ts`.
Once Appwrite is configured, `ContentProvider` (in `src/lib/ContentContext.tsx`)
fetches the stored content and events and merges them on top of the defaults.

### 1. Create an Appwrite project

1. Sign in to [Appwrite Cloud](https://cloud.appwrite.io) (or your self-hosted
   instance) and create a **project**. Copy its **Project ID**.
2. In **Overview → Integrate → Web App**, add a platform with the hostname you
   run the site on (e.g. `localhost`) so the browser SDK is allowed.
3. In **Settings → API keys**, create an **API key** with **Databases** and
   **Storage** scopes (used only by the setup script, never in the browser).

### 2. Configure environment variables

Copy `.env.example` to `.env` and fill in:

```env
VITE_APPWRITE_ENDPOINT=https://cloud.appwrite.io/v1
VITE_APPWRITE_PROJECT_ID=your_project_id

# Server-only — used by the setup script:
APPWRITE_API_KEY=your_api_key
ADMIN_EMAIL=you@example.com     # optional: seeds an admin login
ADMIN_PASSWORD=super-secret     # optional (min 8 chars)
```

The collection / database / bucket IDs default to `main`, `site_content`,
`events`, `blog`, and `media`. Override them with the optional
`VITE_APPWRITE_*` variables in `.env.example` if you prefer different names.

### 3. Provision the backend

```bash
npm run setup:appwrite
```

This idempotent script creates the database, the `site_content`, `events`, and
`blog` collections (with attributes + indexes), the `media` storage bucket, a
seed content document, a couple of sample events, one blog post, and — if
`ADMIN_EMAIL`/`ADMIN_PASSWORD` are set — an admin user. Re-running it safely
skips anything that already exists.

If you did not seed an admin user, create one manually in **Auth → Users** in
the Appwrite console; that email/password is what you use to sign in.

---

## Admin Dashboard

Sign in at **`/admin/login`**, then manage everything from **`/admin`**:

| Section          | Route              | Manages                                                       |
| ---------------- | ------------------ | ------------------------------------------------------------- |
| Dashboard        | `/admin`           | Overview + quick actions                                      |
| Site Content     | `/admin/content`   | Brand, **navbar buttons**, hero, home sections, contact, footer, and an **Advanced JSON** tab for everything else (stats, influence areas, testimonials, organizations, gallery, awards, books, services, FAQs, nav…) |
| Events           | `/admin/events`    | Create / edit / delete events; each gets its own detail page at `/events/:slug` |
| Blog             | `/admin/blog`      | Create / edit / delete articles shown at `/blog` and `/blog/:slug` |

**Rich text:** event and article bodies use the editor in
`src/components/admin/RichTextEditor.tsx` (headings, bold/italic/underline,
lists, quotes, links) and render via `src/components/ui/RichText.tsx`.

**Images:** any image field lets you paste a URL or upload a file, which is
stored in the Appwrite `media` bucket (see `MediaInput`).

**Navbar buttons:** the two CTA buttons are configured under *Site Content →
General & Buttons*. They accept internal paths (`/contact`) or external URLs
(`https://…`) and render correctly for both via `SmartButtonLink`.

### How data flows

- **Public content** — `useContent()` reads the merged `SiteContent`
  (defaults + stored blob + published events) provided by `ContentProvider`.
- **Events / blog** — fetched from their Appwrite collections in
  `src/lib/api.ts`. Detail pages load a single item by slug.
- **Auth** — `src/lib/AuthContext.tsx` wraps Appwrite Account; `RequireAuth`
  guards all `/admin` routes.

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
| `/events/:slug`| EventDetailPage     | Event hero, rich-text body, details sidebar, FinalCTA |
| `/blog`        | BlogPage            | PageHero, article grid, FinalCTA                     |
| `/blog/:slug`  | BlogPostPage        | Article hero, rich-text body, tags, FinalCTA         |
| `/gallery`     | GalleryPage         | PageHero, GalleryGrid, FinalCTA                      |
| `/contact`     | ContactPage         | PageHero, ContactPanel (Info + Form), ContactFAQ, ContactMap |
| `/admin/*`     | Admin dashboard     | Login, dashboard, content editor, events, blog       |
| `*`            | NotFoundPage        | 404                                                  |

### Wiring a component to the CMS

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

So when you edit `about.biography` in the admin (Site Content → Advanced JSON),
the component picks it up automatically — no page-level changes required.
