import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Icon } from "../../ui/Icon";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function AreasOfInfluence() {
  const { influenceAreas } = useContent();

  return (
    <section id="influence" className="py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Areas of Influence"
          heading="Spheres of Leadership & Impact"
          subheading="Six intersecting spheres where David Owusu equips leaders, builds organizations, and transforms communities."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {influenceAreas.map((area, i) => (
            <Reveal key={area.title} delay={(i % 3) * 100}>
              <div className="card-lift group h-full p-8 rounded-2xl bg-light border border-gray-100 text-center relative overflow-hidden">
                <div
                  aria-hidden
                  className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-royal/5 group-hover:bg-gold/10 transition"
                />
                <div className="relative">
                  <div className="w-16 h-16 mx-auto mb-5 rounded-2xl bg-royal/10 text-royal flex items-center justify-center group-hover:bg-royal group-hover:text-white transition">
                    <Icon name={area.icon} size={28} />
                  </div>
                  <h3 className="font-heading text-xl font-bold text-navy mb-3">
                    {area.title}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {area.description}
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
