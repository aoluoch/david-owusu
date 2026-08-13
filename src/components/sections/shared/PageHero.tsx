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
    <section className="hero-gradient relative overflow-hidden pt-28 pb-16 sm:pt-36 sm:pb-24 lg:pt-44 lg:pb-32">
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
        <div className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="min-w-0 text-center lg:text-left">
            {eyebrow && (
              <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-gold sm:text-sm">
                {eyebrow}
              </p>
            )}
            <h1 className="mb-4 font-heading text-3xl font-bold leading-tight text-white sm:mb-6 sm:text-4xl md:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description && (
              <p className="mx-auto max-w-xl text-base leading-relaxed text-blue-100 sm:text-lg lg:mx-0">
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
                className="relative w-full max-w-80 rounded-3xl object-cover shadow-2xl ring-1 ring-white/10 md:max-w-96"
                style={{ aspectRatio: "4/5" }}
              />
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
