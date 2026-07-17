import { useContent } from "../../../lib/ContentContext";
import { ButtonLink } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";

export function FinalCTA() {
  const { finalCta } = useContent();

  return (
    <section id="contact-cta" className="py-24 hero-gradient relative overflow-hidden">
      <div
        aria-hidden
        className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] rounded-full bg-gold/15 blur-3xl"
      />
      <Container size="md">
        <Reveal className="text-center relative">
          <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
            Partner With Us
          </p>
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6 leading-tight">
            {finalCta.heading}
          </h2>
          <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
            {finalCta.subtext}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <ButtonLink to={finalCta.primaryCta.to} variant="gold">
              {finalCta.primaryCta.label}
            </ButtonLink>
            <ButtonLink to={finalCta.secondaryCta.to} variant="outline">
              {finalCta.secondaryCta.label}
            </ButtonLink>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
