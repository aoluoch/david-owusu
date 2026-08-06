import { Calendar, MapPin } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { slugify } from "../../../lib/utils";
import type { EventItem } from "../../../types/content";
import { ButtonLink } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";
import { EventRegistrationButton } from "./EventRegistrationButton";

interface FeaturedEventProps {
  events?: EventItem[];
  requireFeatured?: boolean;
}

export function FeaturedEvent({
  events,
  requireFeatured = false,
}: FeaturedEventProps) {
  const site = useContent();
  const items = events ?? site.events;
  const featured =
    items.find((e) => e.featured) ?? (requireFeatured ? null : items[0]);

  if (!featured) return null;

  const detailTo = `/events/${featured.slug ?? slugify(featured.title)}`;

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeading eyebrow="Featured Event" heading="Save the Date" />
        <Reveal>
          <div className="grid md:grid-cols-2 gap-10 items-center bg-navy rounded-3xl overflow-hidden">
            <div className="flex aspect-[4/3] items-center justify-center overflow-hidden bg-white/5 md:aspect-auto md:h-full">
              <img
                src={featured.imageUrl}
                alt={featured.imageAlt}
                loading="lazy"
                className="h-full w-full object-contain p-4"
              />
            </div>
            <div className="p-10 lg:p-14 text-white">
              <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                Featured
              </p>
              <h3 className="font-heading text-3xl md:text-4xl font-bold mb-4">
                {featured.title}
              </h3>
              <div className="flex flex-wrap items-center gap-5 text-blue-100 text-sm mb-6">
                <span className="inline-flex items-center gap-2">
                  <Calendar size={16} /> {featured.date}
                </span>
                <span className="inline-flex items-center gap-2">
                  <MapPin size={16} /> {featured.location}
                </span>
              </div>
              {featured.description && (
                <p className="text-blue-100 leading-relaxed mb-8">
                  {featured.description}
                </p>
              )}
              <div className="flex flex-wrap gap-3">
                <ButtonLink to={detailTo} variant="gold">
                  View Details
                </ButtonLink>
                <EventRegistrationButton event={featured} variant="outline" />
              </div>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
