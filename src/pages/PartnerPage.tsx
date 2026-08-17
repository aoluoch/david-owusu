import { Container } from "../components/ui/Container";
import { Reveal } from "../components/ui/Reveal";
import { InquiryForm } from "../components/forms/InquiryForm";
import { PageHero } from "../components/sections/shared";
import { breadcrumbJsonLd, useSeo } from "../lib/seo";

export function PartnerPage() {
  useSeo({
    title: "Partner With David Owusu",
    description:
      "Explore partnerships that advance leadership, ministry, enterprise, and community transformation with David Owusu.",
    path: "/partner",
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Partner", path: "/partner" },
      ]),
    ],
  });

  return (
    <>
      <PageHero
        eyebrow="Partnership"
        title="Partner With Us"
        description="Join a global movement advancing leadership, ministry, and community transformation. Let's explore how we can work together."
      />
      <section className="bg-white py-12 sm:py-16 lg:py-24">
        <Container>
          <Reveal className="mx-auto min-w-0 max-w-2xl">
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
