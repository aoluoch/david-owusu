import { useContent } from "../../../lib/ContentContext";
import { ButtonLink } from "../../ui/Button";

export function Hero() {
  const { hero } = useContent();

  return (
    <header
      id="home"
      className="hero-gradient relative overflow-hidden pt-32 pb-20 lg:pt-40 lg:pb-32"
    >
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><circle cx=%2250%22 cy=%2250%22 r=%2240%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.5%22/><circle cx=%2250%22 cy=%2250%22 r=%2225%22 fill=%22none%22 stroke=%22white%22 stroke-width=%220.3%22/></svg>')",
          backgroundSize: "600px",
          backgroundPosition: "center",
        }}
      />
      <div
        aria-hidden
        className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-gold/20 blur-3xl animate-pulse"
      />
      <div
        aria-hidden
        className="absolute bottom-0 right-0 w-[32rem] h-[32rem] rounded-full bg-royal/40 blur-3xl"
      />

      <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center justify-between gap-12 px-4 sm:px-6 lg:flex-row">
        <div className="lg:w-1/2 text-center lg:text-left">
          <p className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-100 text-xs uppercase tracking-widest font-medium mb-6">
            Global Christian Leader • Speaker • Mentor
          </p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold text-white leading-[1.05] mb-6">
            {hero.headline}
          </h1>
          <p className="text-lg md:text-xl text-blue-100 leading-relaxed mb-10 max-w-xl mx-auto lg:mx-0">
            {hero.subheadline}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <ButtonLink to={hero.primaryCta.to} variant="gold">
              {hero.primaryCta.label}
            </ButtonLink>
            <ButtonLink to={hero.secondaryCta.to} variant="outline">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="lg:w-1/2 flex justify-center lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-6 rounded-3xl bg-gold/30 blur-3xl" />
            <div className="absolute -inset-1 rounded-3xl gold-gradient opacity-60 blur" />
            <img
              className="relative rounded-3xl shadow-2xl w-72 md:w-96 object-cover ring-1 ring-white/10"
              style={{ aspectRatio: "3/4" }}
              loading="eager"
              src={hero.portraitUrl}
              alt={hero.portraitAlt}
            />
          </div>
        </div>
      </div>
    </header>
  );
}
