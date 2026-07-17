import { FeaturedEvent } from "../components/sections/events";
import {
  FinalCTA,
  PageHero,
  UpcomingEvents,
} from "../components/sections/shared";

export function EventsPage() {
  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Live Encounters. Global Impact."
        description="Leadership summits, business forums, prayer conferences, and international tours — join us live."
      />
      <FeaturedEvent />
      <UpcomingEvents
        eyebrow="All Events"
        heading="Complete Event Calendar"
        subheading="Every scheduled gathering — from leadership summits to executive workshops and community initiatives."
        background="light"
      />
      <FinalCTA />
    </>
  );
}
