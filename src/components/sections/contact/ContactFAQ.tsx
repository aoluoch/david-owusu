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
    <section className="py-24 bg-light">
      <Container size="md">
        <SectionHeading eyebrow="FAQ" heading="Frequently Asked Questions" />
        <div className="space-y-4">
          {contact.faqs.map((faq, i) => {
            const open = openFaq === i;
            return (
              <Reveal key={faq.q} delay={i * 60}>
                <button
                  type="button"
                  onClick={() => setOpenFaq(open ? null : i)}
                  className="w-full text-left p-6 rounded-2xl bg-white shadow-sm border border-gray-100 hover:border-royal/30 transition"
                >
                  <div className="flex items-center justify-between gap-4">
                    <h3 className="font-heading text-lg font-semibold text-navy">
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
                      <p className="text-gray-600 leading-relaxed">{faq.a}</p>
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
