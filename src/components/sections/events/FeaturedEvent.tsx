import { Calendar, MapPin } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { ButtonAnchor } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function FeaturedEvent() {
  const { events } = useContent();
  const featured = events.find((e) => e.featured) ?? events[0];

  if (!featured) return null;

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeading eyebrow="Featured Event" heading="Save the Date" />
        <Reveal>
          <div className="grid md:grid-cols-2 gap-10 items-center bg-navy rounded-3xl overflow-hidden">
            <div className="aspect-[4/3] md:aspect-auto md:h-full overflow-hidden">
              <img
                src={featured.imageUrl}
                alt={featured.imageAlt}
                loading="lazy"
                className="w-full h-full object-cover"
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
              <ButtonAnchor href={featured.ctaTo} variant="gold">
                {featured.ctaLabel}
              </ButtonAnchor>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
