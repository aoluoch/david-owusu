import { useContent } from "../lib/ContentContext";
import {
  AboutAwards,
  AboutBiography,
  AboutQuote,
  AboutValues,
} from "../components/sections/about";
import { PageHero } from "../components/sections/shared";
import { breadcrumbJsonLd, organizationJsonLd, useSeo } from "../lib/seo";

export function AboutPage() {
  const content = useContent();
  const { about, pageHeaders } = content;

  useSeo({
    title: pageHeaders.about.title || "About David Owusu",
    description:
      pageHeaders.about.description ||
      "Learn about Dr. David Owusu's leadership, ministry, business, and community impact.",
    path: "/about",
    image: about.heroImage || undefined,
    jsonLd: [
      organizationJsonLd(content),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
      ]),
    ],
  });

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
