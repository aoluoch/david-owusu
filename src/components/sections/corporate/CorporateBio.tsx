import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function CorporateBio() {
  const { corporate } = useContent();

  return (
    <section className="py-24 bg-white">
      <Container size="md">
        <SectionHeading
          eyebrow="Corporate Biography"
          heading="Where Ministry Meets the Marketplace"
          align="left"
        />
        <Reveal>
          <p className="text-gray-600 text-lg leading-relaxed">
            {corporate.bio}
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
