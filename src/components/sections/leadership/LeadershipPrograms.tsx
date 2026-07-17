import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Icon } from "../../ui/Icon";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function LeadershipPrograms() {
  const { leadership } = useContent();

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Programs"
          heading="Development Programs & Cohorts"
          subheading="Structured pathways for individuals, teams, and organizations to grow in leadership."
        />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.programs.map((program, i) => (
            <Reveal key={program.title} delay={i * 100}>
              <div className="card-lift h-full p-8 rounded-2xl bg-light border border-gray-100 text-center">
                <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-gold/15 text-gold flex items-center justify-center">
                  <Icon name={program.icon} size={26} />
                </div>
                <h3 className="font-heading text-lg font-bold text-navy mb-2">
                  {program.title}
                </h3>
                <p className="text-gray-500 text-sm leading-relaxed">
                  {program.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
