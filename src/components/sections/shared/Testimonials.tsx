import { Quote, Star } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { hasMediaUrl } from "../../../lib/utils";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function Testimonials() {
  const { testimonials } = useContent();

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Testimonials"
          heading="What Leaders Are Saying"
          subheading="From executives, ministers, and public figures who have been mentored, coached, and shaped by Dr. Owusu."
        />

        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 120}>
              <div className="card-lift relative p-8 rounded-2xl bg-light border border-gray-100 h-full">
                <Quote
                  className="absolute top-6 right-6 text-gold/25"
                  size={44}
                />
                <div className="flex gap-1 text-gold mb-4">
                  {Array.from({ length: t.rating ?? 5 }).map((_, k) => (
                    <Star key={k} size={16} fill="currentColor" />
                  ))}
                </div>
                <p className="text-gray-600 italic mb-6 leading-relaxed relative">
                  “{t.quote}”
                </p>
                <div className="flex items-center gap-3">
                  {hasMediaUrl(t.photoUrl) ? (
                    <img
                      className="h-12 w-12 rounded-full object-cover ring-2 ring-gold/30"
                      loading="lazy"
                      decoding="async"
                      width={96}
                      height={96}
                      src={t.photoUrl}
                      alt={t.name}
                    />
                  ) : (
                    <div
                      aria-hidden
                      className="flex h-12 w-12 items-center justify-center rounded-full bg-royal/10 font-semibold text-royal ring-2 ring-gold/30"
                    >
                      {t.name.trim().charAt(0) || "?"}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold text-navy text-sm">{t.name}</p>
                    <p className="text-gray-400 text-xs">{t.role}</p>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
