import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function AboutBiography() {
  const { about } = useContent();

  return (
    <section className="py-24 bg-white">
      <Container size="md">
        <SectionHeading
          eyebrow="Biography"
          heading="The Story So Far"
          align="left"
        />
        <div className="prose max-w-none">
          {about.biography.map((paragraph, i) => (
            <Reveal key={i} delay={i * 100}>
              <p className="text-gray-600 text-lg leading-relaxed mb-6">
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
