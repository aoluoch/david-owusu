import { Calendar, MapPin } from "lucide-react";
import type { EventItem } from "../../../types/content";
import { useContent } from "../../../lib/ContentContext";
import { ButtonAnchor } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

interface UpcomingEventsProps {
  events?: EventItem[];
  eyebrow?: string;
  heading?: string;
  subheading?: string;
  background?: "light" | "white";
}

export function UpcomingEvents({
  events,
  eyebrow = "Upcoming Events",
  heading = "Join Us at an Upcoming Event",
  subheading = "Live conferences, executive gatherings, and international tours where you can encounter Dr. Owusu in person.",
  background = "light",
}: UpcomingEventsProps) {
  const site = useContent();
  const items = events ?? site.events;

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
          {items.map((event, i) => (
            <Reveal key={event.title} delay={i * 120}>
              <article className="card-lift group rounded-2xl overflow-hidden shadow-lg bg-white h-full flex flex-col">
                <div className="relative overflow-hidden">
                  <img
                    className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                    src={event.imageUrl}
                    alt={event.imageAlt}
                  />
                  {event.featured && (
                    <span className="absolute top-4 left-4 px-3 py-1 rounded-full bg-gold text-navy text-xs font-semibold uppercase tracking-widest">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-7 flex flex-col flex-1">
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 mb-3">
                    <span className="inline-flex items-center gap-1.5 text-gold font-semibold">
                      <Calendar size={16} /> {event.date}
                    </span>
                    <span className="inline-flex items-center gap-1.5">
                      <MapPin size={16} /> {event.location}
                    </span>
                  </div>
                  <h3 className="font-heading text-xl md:text-2xl font-bold text-navy mb-3">
                    {event.title}
                  </h3>
                  {event.description && (
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                      {event.description}
                    </p>
                  )}
                  <div>
                    <ButtonAnchor href={event.ctaTo} variant="primary" size="md">
                      {event.ctaLabel}
                    </ButtonAnchor>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
