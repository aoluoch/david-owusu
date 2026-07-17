import { useContent } from "../lib/ContentContext";
import {
  AboutAwards,
  AboutBiography,
  AboutQuote,
  AboutTimeline,
  AboutValues,
} from "../components/sections/about";
import { FinalCTA, PageHero } from "../components/sections/shared";

export function AboutPage() {
  const { about } = useContent();

  return (
    <>
      <PageHero
        eyebrow="About David Owusu"
        title="A Life Dedicated to Purpose, Leadership & Global Impact"
        description="Christian leader, apostolic voice, corporate executive, author, mentor, and humanitarian shaping leaders across five continents."
        imageUrl={about.heroImage}
      />
      <AboutBiography />
      <AboutTimeline />
      <AboutValues />
      <AboutAwards />
      <AboutQuote />
      <FinalCTA />
    </>
  );
}
