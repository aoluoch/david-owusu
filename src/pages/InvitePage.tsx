import { Container } from "../components/ui/Container";
import { Reveal } from "../components/ui/Reveal";
import { InquiryForm } from "../components/forms/InquiryForm";
import { PageHero } from "../components/sections/shared";

export function InvitePage() {
  return (
    <>
      <PageHero
        eyebrow="Speaking & Engagements"
        title="Invite David to Speak"
        description="Share your event details and our team will respond with availability, requirements, and next steps."
      />
      <section className="py-24 bg-white">
        <Container>
          <Reveal className="mx-auto max-w-2xl">
            <InquiryForm
              defaultType="Speaking Invitation"
              eyebrow="Speaking Invitation"
              title="Tell us about your event"
              subjectLabel="Event name & preferred date(s)"
              messagePlaceholder="Describe your audience, theme, location, and what you're hoping David will address…"
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
