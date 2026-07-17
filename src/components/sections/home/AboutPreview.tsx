import { useContent } from "../../../lib/ContentContext";
import { ButtonLink } from "../../ui/Button";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";

export function AboutPreview() {
  const { aboutPreview } = useContent();

  return (
    <section id="about" className="py-24 bg-light">
      <Container>
        <div className="flex flex-col lg:flex-row items-center gap-16">
          <Reveal className="lg:w-5/12">
            <div className="relative">
              <div
                aria-hidden
                className="absolute -inset-4 rounded-3xl bg-gold/10 blur-2xl"
              />
              <img
                className="relative rounded-2xl shadow-xl w-full object-cover"
                style={{ aspectRatio: "4/5" }}
                loading="lazy"
                src={aboutPreview.imageUrl}
                alt={aboutPreview.imageAlt}
              />
              <div className="absolute -bottom-6 -right-6 hidden md:block bg-navy text-white p-6 rounded-2xl shadow-2xl max-w-[220px]">
                <p className="text-3xl font-heading font-bold text-gold">25+</p>
                <p className="text-sm text-blue-100 mt-1">
                  Years shaping leaders across five continents
                </p>
              </div>
            </div>
          </Reveal>

          <Reveal className="lg:w-7/12" delay={150}>
            <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
              {aboutPreview.eyebrow}
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 leading-tight">
              {aboutPreview.heading}
            </h2>
            <p className="text-gray-600 leading-relaxed mb-8 text-lg">
              {aboutPreview.body}
            </p>
            <ButtonLink to={aboutPreview.ctaTo} variant="primary" size="md">
              {aboutPreview.ctaLabel}
            </ButtonLink>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
