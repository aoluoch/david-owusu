import { FeaturedEvent } from "../components/sections/events";
import { PageHero, UpcomingEvents } from "../components/sections/shared";
import { isPastEvent } from "../lib/eventDates";
import { useContent } from "../lib/ContentContext";

export function EventsPage() {
  const { events } = useContent();
  const upcomingEvents = events.filter((event) => !isPastEvent(event));
  const featuredEvent = upcomingEvents.find((event) => event.featured);
  const listedUpcomingEvents = featuredEvent
    ? upcomingEvents.filter((event) =>
        event.id
          ? event.id !== featuredEvent.id
          : event.title !== featuredEvent.title,
      )
    : upcomingEvents;
  const pastEvents = events.filter(isPastEvent);

  return (
    <>
      <PageHero
        eyebrow="Events"
        title="Live Encounters. Global Impact."
        description="Leadership summits, business forums, prayer conferences, and international tours — join us live."
      />
      <FeaturedEvent events={upcomingEvents} requireFeatured />
      <UpcomingEvents
        events={listedUpcomingEvents}
        eyebrow="All Events"
        heading="Complete Event Calendar"
        subheading="Every scheduled gathering — from leadership summits to executive workshops and community initiatives."
        background="light"
      />
      {pastEvents.length > 0 && (
        <UpcomingEvents
          events={pastEvents}
          eyebrow="Past Events"
          heading="Past Gatherings"
          subheading="Previous conferences, forums, and ministry gatherings from the event archive."
          background="white"
          showRegistration={false}
        />
      )}
    </>
  );
}
