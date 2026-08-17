import {
  AboutPreview,
  AreasOfInfluence,
  GalleryPreview,
  Hero,
  ImpactStats,
  VisionMission,
} from "../components/sections/home";
import {
  FeaturedOrganizations,
  Testimonials,
  UpcomingEvents,
} from "../components/sections/shared";
import { useContent } from "../lib/ContentContext";
import {
  DEFAULT_DESCRIPTION,
  organizationJsonLd,
  useSeo,
  websiteJsonLd,
} from "../lib/seo";

export function HomePage() {
  const content = useContent();
  useSeo({
    title: "David Owusu | Official Website",
    description: content.hero.subheadline || DEFAULT_DESCRIPTION,
    path: "/",
    image: content.hero.portraitUrl || undefined,
    jsonLd: [websiteJsonLd(), organizationJsonLd(content)],
  });

  return (
    <>
      <Hero />
      <ImpactStats />
      <AboutPreview />
      <AreasOfInfluence />
      <VisionMission />
      <FeaturedOrganizations limit={3} />
      <UpcomingEvents limit={2} />
      <Testimonials />
      <GalleryPreview />
    </>
  );
}
