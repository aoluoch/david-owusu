import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function ContactFAQ() {
  const { contact } = useContent();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <section className="bg-light py-12 sm:py-16 lg:py-24">
      <Container size="md">
        <SectionHeading eyebrow="FAQ" heading="Frequently Asked Questions" />
        <div className="space-y-3 sm:space-y-4">
          {contact.faqs.map((faq, i) => {
            const open = openFaq === i;
            return (
              <Reveal key={faq.q} delay={i * 60} className="min-w-0">
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full rounded-2xl border border-gray-100 bg-white p-4 text-left shadow-sm transition hover:border-royal/30 sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3 sm:items-center sm:gap-4">
                    <h3 className="min-w-0 font-heading text-base font-semibold text-navy sm:text-lg">
                      {faq.q}
                    </h3>
                    <ChevronDown
                      size={22}
                      className={cn(
                        "text-royal shrink-0 transition-transform",
                        open && "rotate-180",
                      )}
                    />
                  </div>
                  <div
                    className={cn(
                      "grid transition-all duration-300 overflow-hidden",
                      open
                        ? "grid-rows-[1fr] opacity-100 mt-4"
                        : "grid-rows-[0fr] opacity-0",
                    )}
                  >
                    <div className="min-h-0">
                      <p className="text-sm leading-relaxed text-gray-600 sm:text-base">{faq.a}</p>
                    </div>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
