import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Icon } from "../../ui/Icon";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function CorporateServices() {
  const { corporate } = useContent();

  return (
    <section className="py-24 bg-light">
      <Container>
        <SectionHeading
          eyebrow="Services"
          heading="Consulting & Coaching Services"
          subheading="Tailored engagements designed to move leaders and organizations from ambition to enduring results."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {corporate.services.map((service, i) => (
            <Reveal key={service.title} delay={(i % 3) * 100}>
              <div className="card-lift h-full p-8 rounded-2xl bg-white border border-gray-100">
                <div className="w-14 h-14 mb-5 rounded-2xl bg-royal/10 text-royal flex items-center justify-center">
                  <Icon name={service.icon} size={26} />
                </div>
                <h3 className="font-heading text-xl font-bold text-navy mb-3">
                  {service.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
