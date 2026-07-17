import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";

export function AboutQuote() {
  const { about } = useContent();

  return (
    <section className="py-24 bg-navy relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 30%, rgba(200,160,70,0.5), transparent 40%)",
        }}
      />
      <Container size="md">
        <Reveal className="text-center relative">
          <p className="text-gold font-heading text-6xl leading-none mb-4">
            &ldquo;
          </p>
          <blockquote className="font-heading text-2xl md:text-3xl lg:text-4xl text-white leading-tight italic mb-6">
            {about.quote}
          </blockquote>
          <p className="text-gold font-semibold uppercase tracking-widest text-sm">
            — Dr. David Owusu
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
