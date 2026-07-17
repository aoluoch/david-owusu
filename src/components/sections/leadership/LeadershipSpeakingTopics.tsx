import { Check } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function LeadershipSpeakingTopics() {
  const { leadership } = useContent();

  return (
    <section id="speaking" className="py-24 bg-light">
      <Container size="md">
        <SectionHeading
          eyebrow="Speaking Topics"
          heading="Talks & Keynotes"
          subheading="Signature topics available for conferences, executive retreats, and leadership summits."
        />
        <div className="grid md:grid-cols-2 gap-4">
          {leadership.speakingTopics.map((topic, i) => (
            <Reveal key={topic} delay={i * 60}>
              <div className="flex items-center gap-4 p-5 rounded-2xl bg-white shadow-sm border border-gray-100 card-lift">
                <div className="w-9 h-9 rounded-full bg-royal/10 text-royal flex items-center justify-center shrink-0">
                  <Check size={18} />
                </div>
                <p className="text-navy font-medium">{topic}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
