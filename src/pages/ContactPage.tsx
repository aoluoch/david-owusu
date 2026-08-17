import { ContactFAQ, ContactPanel } from "../components/sections/contact";
import { PageHero } from "../components/sections/shared";
import { breadcrumbJsonLd, useSeo } from "../lib/seo";

export function ContactPage() {
  useSeo({
    title: "Contact David Owusu",
    description:
      "Contact Dr. David Owusu's team about speaking, coaching, partnerships, prayer, media, or general inquiries.",
    path: "/contact",
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: "Contact", path: "/contact" },
      ]),
    ],
  });

  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Start a Conversation"
        description="Whether you'd like David to speak, coach, partner, or pray — we'd love to hear from you."
      />
      <ContactPanel />
      <ContactFAQ />
    </>
  );
}
