import { useContent } from "../lib/ContentContext";
import {
  AboutAwards,
  AboutBiography,
  AboutQuote,
  AboutValues,
} from "../components/sections/about";
import { PageHero } from "../components/sections/shared";

export function AboutPage() {
  const { about, pageHeaders } = useContent();

  return (
    <>
      <PageHero
        eyebrow={pageHeaders.about.eyebrow}
        title={pageHeaders.about.title}
        description={pageHeaders.about.description}
        imageUrl={about.heroImage}
      />
      <AboutBiography />
      {/* Life journey / milestone timeline intentionally hidden. */}
      <AboutValues />
      <AboutAwards />
      <AboutQuote />
    </>
  );
}
