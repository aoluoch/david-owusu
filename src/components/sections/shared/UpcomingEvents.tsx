import { Calendar, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import type { EventItem } from "../../../types/content";
import { useContent } from "../../../lib/ContentContext";
import { slugify, hasMediaUrl } from "../../../lib/utils";
import { EventRegistrationButton } from "../events/EventRegistrationButton";
import { ButtonLink } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

interface UpcomingEventsProps {
  events?: EventItem[];
  limit?: number;
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  background?: "light" | "white";
  showRegistration?: boolean;
}

export function UpcomingEvents({
  events,
  limit,
  eyebrow = "Upcoming Events",
  heading = "Join Us at an Upcoming Event",
  subheading = "Live conferences, executive gatherings, and international tours where you can encounter Dr. Owusu in person.",
  background = "light",
  showRegistration = true,
}: UpcomingEventsProps) {
  const site = useContent();
  const allItems = events ?? site.events;
  const items = limit === undefined ? allItems : allItems.slice(0, limit);

  return (
    <section
      id="events"
      className={background === "light" ? "py-24 bg-light" : "py-24 bg-white"}
    >
      <Container>
        <SectionHeading
          eyebrow={eyebrow}
          heading={heading}
          subheading={subheading}
        />

        <div className="grid md:grid-cols-2 gap-8">
          {items.map((event, i) => {
            const slug = event.slug ?? slugify(event.title);
            const detailTo = `/events/${slug}`;
            return (
              <Reveal key={event.id ?? event.title} delay={i * 120}>
                <article className="card-lift group rounded-2xl overflow-hidden shadow-lg bg-white h-full flex flex-col">
                  <Link
                    to={detailTo}
                    className="relative flex h-64 items-center justify-center overflow-hidden bg-light"
                  >
                    {hasMediaUrl(event.imageUrl) && (
                      <img
                        className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                        loading="lazy"
                        src={event.imageUrl}
                        alt={event.imageAlt}
                      />
                    )}
                    {event.featured && (
                      <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold text-navy text-xs font-semibold uppercase tracking-widest">
                        Featured
                      </span>
                    )}
                  </Link>
                  <div className="p-7 flex flex-col flex-1">
                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-gold font-semibold">
                        <Calendar size={16} /> {event.date}
                      </span>
                      <span className="inline-flex items-center gap-1.5">
                        <MapPin size={16} /> {event.location}
                      </span>
                    </div>
                    <Link to={detailTo}>
                      <h3 className="font-heading text-xl md:text-2xl font-bold text-navy mb-3 hover:text-royal transition">
                        {event.title}
                      </h3>
                    </Link>
                    {event.description && (
                      <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                        {event.description}
                      </p>
                    )}
                    <div className="flex flex-wrap gap-3">
                      <ButtonLink to={detailTo} variant="primary" size="md">
                        View Details
                      </ButtonLink>
                      {showRegistration && (
                        <EventRegistrationButton
                          event={event}
                          variant="outlineDark"
                          size="md"
                        />
                      )}
                    </div>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
