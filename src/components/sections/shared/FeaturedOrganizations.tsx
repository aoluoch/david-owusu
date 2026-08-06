import { ArrowUpRight } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function FeaturedOrganizations() {
  const { organizations } = useContent();

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Organizations"
          heading="Institutions & Initiatives"
          subheading="A portfolio of organizations built to raise leaders, transform enterprises, and serve communities."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {organizations.map((org, i) => (
            <Reveal key={org.name} delay={(i % 3) * 100}>
              <div className="card-lift group h-full rounded-2xl bg-light border border-gray-100 overflow-hidden flex flex-col">
                <div className="aspect-video overflow-hidden bg-white p-4">
                  <img
                    src={org.logoUrl}
                    alt={org.name}
                    loading="lazy"
                    className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-xl font-bold text-navy mb-2">
                    {org.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {org.description}
                  </p>
                  {org.websiteUrl && (
                    <a
                      href={org.websiteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-5 inline-flex items-center gap-1 text-royal font-semibold text-sm hover:text-gold transition"
                    >
                      Visit Website
                      <ArrowUpRight size={16} />
                    </a>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
