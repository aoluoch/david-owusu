import { useContent } from "../lib/ContentContext";
import {
  LeadershipBooks,
  LeadershipPhilosophy,
  LeadershipPrinciples,
  LeadershipPrograms,
  LeadershipSpeakingTopics,
} from "../components/sections/leadership";
import { PageHero } from "../components/sections/shared";
import { breadcrumbJsonLd, organizationJsonLd, useSeo } from "../lib/seo";

export function LeadershipPage() {
  const content = useContent();
  const { pageHeaders } = content;

  useSeo({
    title: pageHeaders.leadership.title || "Leadership",
    description:
      pageHeaders.leadership.description ||
      "Leadership programs, principles, books, and speaking topics from Dr. David Owusu.",
    path: "/leadership",
    jsonLd: [
      organizationJsonLd(content),
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Leadership", path: "/leadership" },
      ]),
    ],
  });

  return (
    <>
      <PageHero
        eyebrow={pageHeaders.leadership.eyebrow}
        title={pageHeaders.leadership.title}
        description={pageHeaders.leadership.description}
      />
      <LeadershipPhilosophy />
      <LeadershipPrinciples />
      <LeadershipPrograms />
      <LeadershipBooks />
      <LeadershipSpeakingTopics />
    </>
  );
}
