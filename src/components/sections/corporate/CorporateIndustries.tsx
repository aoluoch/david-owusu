import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function CorporateIndustries() {
  const { corporate } = useContent();

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Industries"
          heading="Industries Served"
          subheading="Two decades of engagements across sectors — with a common thread of leadership, culture, and transformation."
        />
        <Reveal>
          <div className="flex flex-wrap justify-center gap-3">
            {corporate.industries.map((industry) => (
              <span
                key={industry}
                className="px-5 py-2.5 rounded-full bg-light border border-gray-200 text-navy font-medium text-sm card-lift"
              >
                {industry}
              </span>
            ))}
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
