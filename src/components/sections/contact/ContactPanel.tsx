import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { ContactForm } from "./ContactForm";
import { ContactInfo } from "./ContactInfo";

export function ContactPanel() {
  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="grid lg:grid-cols-3 gap-8">
          <Reveal className="lg:col-span-1">
            <ContactInfo />
          </Reveal>
          <Reveal className="lg:col-span-2" delay={150}>
            <ContactForm />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
