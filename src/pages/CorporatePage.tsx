import { useContent } from "../lib/ContentContext";
import {
  CorporateBio,
  CorporateIndustries,
  CorporateServices,
} from "../components/sections/corporate";
import { FeaturedOrganizations, PageHero } from "../components/sections/shared";
import {
  breadcrumbJsonLd,
  organizationJsonLd,
  servicesJsonLd,
  useSeo,
} from "../lib/seo";

export function CorporatePage() {
  const content = useContent();
  const { corporate, pageHeaders } = content;

  useSeo({
    title: pageHeaders.corporate.title || "Corporate Services",
    description:
      pageHeaders.corporate.description ||
      "Corporate consulting, leadership, and business services from Dr. David Owusu.",
    path: "/corporate",
    jsonLd: [
      organizationJsonLd(content),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Corporate", path: "/corporate" },
      ]),
      ...servicesJsonLd(corporate.services),
    ],
  });

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
