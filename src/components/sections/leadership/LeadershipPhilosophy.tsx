import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function LeadershipPhilosophy() {
  const { leadership } = useContent();

  return (
    <section className="py-24 bg-white">
      <Container size="md">
        <SectionHeading
          eyebrow="Philosophy"
          heading="Our Leadership Philosophy"
          align="left"
        />
        <Reveal>
          <p className="text-gray-600 text-xl leading-relaxed border-l-4 border-gold pl-6 italic">
            {leadership.philosophy}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
