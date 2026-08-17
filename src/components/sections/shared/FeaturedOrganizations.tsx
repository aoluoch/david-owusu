import { ArrowUpRight } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { hasMediaUrl } from "../../../lib/utils";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

interface FeaturedOrganizationsProps {
  limit?: number;
}

function isActiveWebsite(url?: string, enabled = true) {
  const normalized = url?.trim();
  return enabled && Boolean(normalized) && normalized !== "#";
}

function initialsFor(name: string) {
  const words = name.trim().split(/\s+/).filter(Boolean);
  const letters = words.length > 1 ? [words[0], words[1]] : [words[0] ?? ""];
  return letters.map((word) => word[0]).join("").toUpperCase();
}

function OrganizationPlaceholder({ name }: { name: string }) {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-[radial-gradient(circle_at_top_left,#f9d976_0,#f7f9ff_34%,#ffffff_70%)] px-6 text-center">
      <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-2xl bg-navy text-2xl font-bold text-white shadow-lg">
        {initialsFor(name)}
      </div>
      <span className="max-w-xs font-heading text-lg font-bold leading-tight text-navy">
        {name}
      </span>
    </div>
  );
}

export function FeaturedOrganizations({ limit }: FeaturedOrganizationsProps) {
  const { organizations } = useContent();
  const visibleOrganizations =
    limit === undefined ? organizations : organizations.slice(0, limit);

  return (
    <section className="py-24 bg-white">
      <Container>
        <SectionHeading
          eyebrow="Organizations"
          heading="Institutions & Initiatives"
          subheading="A portfolio of organizations built to raise leaders, transform enterprises, and serve communities."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleOrganizations.map((org, i) => (
            <Reveal key={org.name} delay={(i % 3) * 100}>
              <div className="card-lift group h-full rounded-2xl bg-light border border-gray-100 overflow-hidden flex flex-col">
                <div className="aspect-video overflow-hidden bg-white p-4">
                  {hasMediaUrl(org.logoUrl) ? (
                    <img
                      src={org.logoUrl}
                      alt={org.name}
                      loading="lazy"
                      decoding="async"
                      width={320}
                      height={192}
                      className="h-full w-full object-contain transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <OrganizationPlaceholder name={org.name} />
                  )}
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <h3 className="font-heading text-xl font-bold text-navy mb-2">
                    {org.name}
                  </h3>
                  <p className="text-gray-500 text-sm leading-relaxed flex-1">
                    {org.description}
                  </p>
                  {isActiveWebsite(org.websiteUrl, org.websiteEnabled !== false) && (
                    <a
                      href={org.websiteUrl?.trim()}
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
