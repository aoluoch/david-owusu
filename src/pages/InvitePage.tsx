import { Container } from "../components/ui/Container";
import { Reveal } from "../components/ui/Reveal";
import { InquiryForm } from "../components/forms/InquiryForm";
import { PageHero } from "../components/sections/shared";
import { breadcrumbJsonLd, useSeo } from "../lib/seo";

export function InvitePage() {
  useSeo({
    title: "Invite David Owusu to Speak",
    description:
      "Invite Dr. David Owusu to speak at your conference, leadership gathering, ministry event, or corporate engagement.",
    path: "/invite",
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Invite David", path: "/invite" },
      ]),
    ],
  });

  return (
    <>
      <PageHero
        eyebrow="Speaking & Engagements"
        title="Invite David to Speak"
        description="Share your event details and our team will respond with availability, requirements, and next steps."
      />
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <Container>
          <Reveal className="mx-auto min-w-0 max-w-2xl">
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
