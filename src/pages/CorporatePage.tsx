import {
  CorporateBio,
  CorporateCaseStudies,
  CorporateIndustries,
  CorporateServices,
} from "../components/sections/corporate";
import {
  FeaturedOrganizations,
  FinalCTA,
  PageHero,
} from "../components/sections/shared";

export function CorporatePage() {
  return (
    <>
      <PageHero
        eyebrow="Corporate"
        title="Executive Advisory, Coaching & Strategic Consulting"
        description="A trusted counsel to boards, CEOs, and executive teams navigating growth, transition, and transformation."
      />
      <CorporateBio />
      <CorporateServices />
      <CorporateIndustries />
      <CorporateCaseStudies />
      <FeaturedOrganizations />
      <FinalCTA />
    </>
  );
}
