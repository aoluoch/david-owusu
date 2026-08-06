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

export function HomePage() {
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
