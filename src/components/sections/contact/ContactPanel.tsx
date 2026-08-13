import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export function ContactPanel() {
  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <Container>
        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          <Reveal className="min-w-0 lg:col-span-1">
            <ContactInfo />
          </Reveal>
          <Reveal className="min-w-0 lg:col-span-2" delay={150}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
