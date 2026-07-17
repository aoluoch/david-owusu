import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function AboutTimeline() {
  const { about } = useContent();

  return (
    <section className="py-24 bg-light">
      <Container>
        <SectionHeading eyebrow="Life Journey" heading="Milestones & Timeline" />
        <div className="relative">
          <div
            aria-hidden
            className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-royal/30 to-transparent"
          />
          <div className="space-y-10">
            {about.timeline.map((item, i) => (
              <Reveal key={item.year + item.title} delay={i * 80}>
                <div
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-12 ${
                    i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  <div className="hidden md:block md:w-1/2" />
                  <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-2 w-4 h-4 rounded-full bg-gold ring-4 ring-gold/20" />
                  <div className="pl-12 md:pl-0 md:w-1/2">
                    <div className="bg-white p-6 rounded-2xl shadow-md border border-gray-100">
                      <p className="text-royal font-heading font-bold text-2xl mb-1">
                        {item.year}
                      </p>
                      <h3 className="font-heading text-xl font-bold text-navy mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
