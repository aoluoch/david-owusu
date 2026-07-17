import type { ReactNode } from "react";
import { Container } from "../../ui/Container";

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  description?: string;
  imageUrl?: string;
  children?: ReactNode;
}

export function PageHero({
  eyebrow,
  title,
  description,
  imageUrl,
  children,
}: PageHeroProps) {
  return (
    <section className="hero-gradient relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-32">
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/></svg>')",
          backgroundSize: "500px",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-gold/20 blur-3xl"
      />

      <Container>
        <div className="relative grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            {eyebrow && (
              <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
                {eyebrow}
              </p>
            )}
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {title}
            </h1>
            {description && (
              <p className="text-blue-100 text-lg leading-relaxed max-w-xl mx-auto lg:mx-0">
                {description}
              </p>
            )}
            {children && <div className="mt-8">{children}</div>}
          </div>

          {imageUrl && (
            <div className="relative flex justify-center lg:justify-end">
              <div className="absolute -inset-4 rounded-3xl bg-gold/30 blur-3xl" />
              <img
                src={imageUrl}
                alt={title}
                loading="eager"
                className="relative rounded-3xl shadow-2xl w-80 md:w-96 object-cover ring-1 ring-white/10"
                style={{ aspectRatio: "4/5" }}
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
