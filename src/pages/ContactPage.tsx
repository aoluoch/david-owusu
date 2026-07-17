import {
  ContactFAQ,
  ContactMap,
  ContactPanel,
} from "../components/sections/contact";
import { PageHero } from "../components/sections/shared";

export function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's Start a Conversation"
        description="Whether you'd like David to speak, coach, partner, or pray — we'd love to hear from you."
      />
      <ContactPanel />
      <ContactFAQ />
      <ContactMap />
    </>
  );
}
