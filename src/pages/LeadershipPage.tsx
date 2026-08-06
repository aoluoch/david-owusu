import { useContent } from "../lib/ContentContext";
import {
  LeadershipBooks,
  LeadershipPhilosophy,
  LeadershipPrinciples,
  LeadershipPrograms,
  LeadershipSpeakingTopics,
} from "../components/sections/leadership";
import { PageHero } from "../components/sections/shared";

export function LeadershipPage() {
  const { pageHeaders } = useContent();

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
