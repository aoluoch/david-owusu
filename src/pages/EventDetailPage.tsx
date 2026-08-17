import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import type { EventItem } from "../types/content";
import { getEventBySlug } from "../lib/api";
import { Container } from "../components/ui/Container";
import { RichText } from "../components/ui/RichText";
import { EventRegistrationButton } from "../components/sections/events";
import { PageLoader } from "../components/ui/PageLoader";
import { hasMediaUrl } from "../lib/utils";
import {
  breadcrumbJsonLd,
  eventJsonLd,
  stripHtml,
  useSeo,
} from "../lib/seo";

export function EventDetailPage() {
  const { slug = "" } = useParams();
  const [loaded, setLoaded] = useState<{
    slug: string;
    event: EventItem | null;
  } | null>(null);
  const loading = loaded?.slug !== slug;
  const event = loaded?.event ?? null;

  useSeo({
    title: loading ? "Event" : event?.title || "Event Not Found",
    description:
      event?.description ||
      stripHtml(event?.body || "") ||
      "Event details from Dr. David Owusu.",
    path: `/events/${slug}`,
    image: event?.imageUrl || undefined,
    noindex: !loading && !event,
    jsonLd: event
      ? [
          eventJsonLd(event),
          breadcrumbJsonLd([
            { name: "Home", path: "/" },
            { name: "Events", path: "/events" },
            { name: event.title, path: `/events/${slug}` },
          ]),
        ]
      : [],
  });

  useEffect(() => {
    let mounted = true;
    getEventBySlug(slug).then((e) => mounted && setLoaded({ slug, event: e }));
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <PageLoader
        variant="page"
        tone="dark"
        className="min-h-screen hero-gradient"
        label="Loading event"
      />
    );
  }

  if (!event) {
    return (
      <div className="pt-40 pb-32">
        <Container>
          <div className="text-center">
            <h1 className="font-heading text-3xl font-bold text-navy mb-4">
              Event not found
            </h1>
            <Link to="/events" className="text-royal font-semibold">
              ← Back to all events
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <section className="hero-gradient pt-36 pb-20 lg:pt-44">
        <Container>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-blue-100 hover:text-gold transition mb-6 text-sm font-semibold"
          >
            <ArrowLeft size={16} /> All Events
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl font-bold text-white leading-tight mb-6 max-w-3xl">
            {event.title}
          </h1>
          <div className="flex flex-wrap items-center gap-5 text-blue-100">
            <span className="inline-flex items-center gap-2">
              <Calendar size={18} className="text-gold" /> {event.date}
            </span>
            <span className="inline-flex items-center gap-2">
              <MapPin size={18} className="text-gold" /> {event.location}
            </span>
          </div>
        </Container>
      </section>

      <section className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {hasMediaUrl(event.imageUrl) && (
                <div className="mb-10 flex max-h-[520px] min-h-72 items-center justify-center overflow-hidden rounded-2xl bg-light shadow-lg">
                  <img
                    src={event.imageUrl}
                    alt={event.imageAlt}
                    loading="eager"
                    decoding="async"
                    fetchPriority="high"
                    width={1200}
                    height={675}
                    className="max-h-[520px] w-full object-contain p-3"
                  />
                </div>
              )}
              {event.body ? (
                <RichText html={event.body} />
              ) : (
                event.description && (
                  <p className="text-lg leading-relaxed text-slate-600">
                    {event.description}
                  </p>
                )
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="sticky top-28 rounded-2xl border border-gray-100 shadow-lg p-7 bg-light">
                <h2 className="font-heading text-xl font-bold text-navy mb-4">
                  Event Details
                </h2>
                <dl className="space-y-4 text-sm">
                  <div>
                    <dt className="text-gray-500">Date</dt>
                    <dd className="font-semibold text-navy">{event.date}</dd>
                  </div>
                  <div>
                    <dt className="text-gray-500">Location</dt>
                    <dd className="font-semibold text-navy">{event.location}</dd>
                  </div>
                </dl>
                <div className="mt-6">
                  <EventRegistrationButton
                    event={event}
                    variant="primary"
                    size="md"
                    className="w-full"
                  />
                </div>
              </div>
            </aside>
          </div>
          <nav aria-label="Related pages" className="mt-12 border-t border-gray-100 pt-8 text-sm">
            <Link to="/events" className="font-semibold text-royal hover:text-gold">
              Browse all events
            </Link>
            <span className="mx-3 text-gray-300" aria-hidden>•</span>
            <Link to="/invite" className="font-semibold text-royal hover:text-gold">
              Invite David to speak
            </Link>
          </nav>
        </Container>
      </section>
    </>
  );
}
