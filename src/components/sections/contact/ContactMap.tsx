import { MapPin } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";

export function ContactMap() {
  const { contact } = useContent();

  return (
    <section className="py-24 bg-white">
      <Container>
        <Reveal>
          <div className="rounded-3xl overflow-hidden border border-gray-100 shadow-lg aspect-[16/7] bg-light flex items-center justify-center">
            <div className="text-center px-6">
              <MapPin className="mx-auto text-gold mb-3" size={40} />
              <p className="font-heading text-navy text-2xl font-bold mb-2">
                Head Office
              </p>
              <p className="text-gray-500">{contact.address}</p>
              <p className="text-gray-400 text-sm mt-3">
                Interactive map placeholder — connect Google Maps API for a live map.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
