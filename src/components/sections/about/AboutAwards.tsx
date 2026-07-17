import { Award } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function AboutAwards() {
  const { about } = useContent();

  return (
    <section className="py-24 bg-light">
      <Container size="md">
        <SectionHeading eyebrow="Recognition" heading="Awards & Honours" />
        <div className="grid md:grid-cols-2 gap-4">
          {about.awards.map((award, i) => (
            <Reveal key={award} delay={i * 80}>
              <div className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-sm border border-gray-100">
                <div className="w-10 h-10 rounded-full bg-gold/10 text-gold flex items-center justify-center shrink-0">
                  <Award size={20} />
                </div>
                <p className="text-navy font-medium">{award}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
