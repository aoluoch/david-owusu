import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, MapPin } from "lucide-react";
import type { EventItem } from "../types/content";
import { getEventBySlug } from "../lib/api";
import { Container } from "../components/ui/Container";
import { RichText } from "../components/ui/RichText";
import { EventRegistrationButton } from "../components/sections/events";

export function EventDetailPage() {
  const { slug = "" } = useParams();
  const [loaded, setLoaded] = useState<{
    slug: string;
    event: EventItem | null;
  } | null>(null);
  const loading = loaded?.slug !== slug;
  const event = loaded?.event ?? null;

  useEffect(() => {
    let mounted = true;
    getEventBySlug(slug).then((e) => mounted && setLoaded({ slug, event: e }));
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <div className="pt-40 pb-32 text-center text-slate-500">Loading…</div>
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
              {event.imageUrl && (
                <div className="mb-10 flex max-h-[520px] min-h-72 items-center justify-center overflow-hidden rounded-2xl bg-light shadow-lg">
                  <img
                    src={event.imageUrl}
                    alt={event.imageAlt}
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
        </Container>
      </section>
    </>
  );
}
