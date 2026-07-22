import { Container } from "../components/ui/Container";
import { Reveal } from "../components/ui/Reveal";
import { InquiryForm } from "../components/forms/InquiryForm";
import { PageHero } from "../components/sections/shared";

export function PartnerPage() {
  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="Partner With Us"
        description="Join a global movement advancing leadership, ministry, and community transformation. Let's explore how we can work together."
      />
      <section className="py-24 bg-white">
        <Container>
          <Reveal className="mx-auto max-w-2xl">
            <InquiryForm
              defaultType="Partnership"
              eyebrow="Partnership Inquiry"
              title="Let's build something together"
              subjectLabel="Organization & area of partnership"
              messagePlaceholder="Tell us about your organization and the kind of partnership you have in mind…"
            />
          </Reveal>
        </Container>
      </section>
    </>
  );
}
