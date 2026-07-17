import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Icon } from "../../ui/Icon";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function AboutValues() {
  const { about } = useContent();

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Core Values"
          heading="What Guides His Leadership"
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {about.values.map((value, i) => (
            <Reveal key={value.title} delay={i * 100}>
              <div className="card-lift h-full p-8 rounded-2xl bg-light border border-gray-100 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-royal/10 text-royal flex items-center justify-center">
                  <Icon name={value.icon} size={26} />
                </div>
                <h3 className="font-heading text-xl font-bold text-navy mb-2">
                  {value.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {value.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
