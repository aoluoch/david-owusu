import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { hasMediaUrl } from "../../../lib/utils";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function GalleryPreview() {
  const { galleryPreview } = useContent();

  return (
    <section id="gallery" className="py-24 bg-light">
      <Container>
        <SectionHeading
          eyebrow="Gallery"
          heading="Moments of Impact"
          subheading="A glimpse into conferences, executive engagements, community outreach, and international tours."
        />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {galleryPreview
            .filter((img) => hasMediaUrl(img.url))
            .map((img, i) => (
            <Reveal key={(img.url || img.alt) + i} delay={(i % 4) * 100}>
              <div className="card-lift relative rounded-xl overflow-hidden group">
                {hasMediaUrl(img.url) && (
                  <img
                    className="w-full h-56 object-cover group-hover:scale-110 transition duration-700"
                    loading="lazy"
                    src={img.url}
                    alt={img.alt}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
                {img.category && (
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 text-navy text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition">
                    {img.category}
                  </span>
                )}
              </div>
            </Reveal>
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/gallery"
            className="inline-flex items-center gap-2 font-semibold text-royal hover:text-gold transition"
          >
            View Full Gallery <ArrowRight size={18} />
          </Link>
        </div>
      </Container>
    </section>
  );
}
