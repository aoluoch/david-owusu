import { MapPin } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";

export function ContactMap() {
  const { contact } = useContent();

  return (
    <section className="bg-white py-12 sm:py-16 lg:py-24">
      <Container>
        <Reveal className="min-w-0">
          <div className="flex aspect-[4/3] items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-light shadow-lg sm:aspect-[16/9] sm:rounded-3xl lg:aspect-[16/7]">
            <div className="px-4 text-center sm:px-6">
              <MapPin className="mx-auto mb-3 text-gold" size={40} />
              <p className="mb-2 font-heading text-xl font-bold text-navy sm:text-2xl">
                Head Office
              </p>
              <p className="break-words text-gray-500">{contact.address}</p>
              <p className="mt-3 text-xs text-gray-400 sm:text-sm">
                Interactive map placeholder — connect Google Maps API for a live map.
              </p>
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
