import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function LeadershipPrinciples() {
  const { leadership } = useContent();

  return (
    <section className="py-24 bg-light">
      <Container>
        <SectionHeading
          eyebrow="Principles"
          heading="Four Anchors of Enduring Leadership"
        />
        <div className="grid md:grid-cols-2 gap-8">
          {leadership.principles.map((principle, i) => (
            <Reveal key={principle.title} delay={(i % 2) * 100}>
              <div className="card-lift h-full p-8 rounded-2xl bg-white border border-gray-100 flex gap-5">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-royal text-white flex items-center justify-center font-heading font-bold text-lg">
                  {i + 1}
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-navy mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed text-sm">
                    {principle.description}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
