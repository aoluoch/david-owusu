import {
  LeadershipBooks,
  LeadershipPhilosophy,
  LeadershipPrinciples,
  LeadershipPrograms,
  LeadershipSpeakingTopics,
} from "../components/sections/leadership";
import {
  FinalCTA,
  PageHero,
  Testimonials,
} from "../components/sections/shared";

export function LeadershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Leadership"
        title="Raising Leaders Worthy of Trust"
        description="Frameworks, programs, and resources for leaders who want to grow in character, competence, and calling."
      />
      <LeadershipPhilosophy />
      <LeadershipPrinciples />
      <LeadershipPrograms />
      <LeadershipBooks />
      <LeadershipSpeakingTopics />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
