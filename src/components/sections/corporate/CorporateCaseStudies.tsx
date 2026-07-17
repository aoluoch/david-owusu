import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function CorporateCaseStudies() {
  const { corporate } = useContent();

  return (
    <section className="py-24 bg-light">
      <Container>
        <SectionHeading
          eyebrow="Case Studies"
          heading="Selected Engagements"
          subheading="Anonymized snapshots of executive engagements and the outcomes achieved."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corporate.caseStudies.map((study, i) => (
            <Reveal key={study.title} delay={(i % 3) * 100}>
              <article className="card-lift h-full rounded-2xl overflow-hidden bg-white border border-gray-100 flex flex-col">
                <div className="aspect-video overflow-hidden">
                  <img
                    src={study.imageUrl}
                    alt={study.title}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <p className="text-gold text-xs font-semibold uppercase tracking-widest mb-2">
                    {study.client}
                  </p>
                  <h3 className="font-heading text-xl font-bold text-navy mb-3">
                    {study.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed flex-1">
                    {study.outcome}
                  </p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
