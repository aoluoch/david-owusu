import { useContent } from "../lib/ContentContext";
import {
  CorporateBio,
  CorporateIndustries,
  CorporateServices,
} from "../components/sections/corporate";
import { FeaturedOrganizations, PageHero } from "../components/sections/shared";

export function CorporatePage() {
  const { pageHeaders } = useContent();

  return (
    <>
      <PageHero
        eyebrow={pageHeaders.corporate.eyebrow}
        title={pageHeaders.corporate.title}
        description={pageHeaders.corporate.description}
      />
      <CorporateBio />
      <CorporateServices />
      <CorporateIndustries />
      {/* Corporate case studies intentionally hidden. */}
      <FeaturedOrganizations />
    </>
  );
}
