import { useContent } from "../lib/ContentContext";
import type { LegalPageContent } from "../types/content";
import { Container } from "../components/ui/Container";
import { Reveal } from "../components/ui/Reveal";
import { PageHero } from "../components/sections/shared";
import { breadcrumbJsonLd, useSeo } from "../lib/seo";

interface LegalPageProps {
  page: "privacy" | "terms";
}

export function LegalPage({ page }: LegalPageProps) {
  const { legal } = useContent();
  const content: LegalPageContent = legal[page];
  const path = page === "privacy" ? "/privacy-policy" : "/terms-and-conditions";
  const fallbackTitle = page === "privacy" ? "Privacy Policy" : "Terms and Conditions";

  useSeo({
    title: content.title || fallbackTitle,
    description:
      content.introduction ||
      `Read the ${fallbackTitle.toLowerCase()} for the official David Owusu website.`,
    path,
    jsonLd: [
      breadcrumbJsonLd([
        { name: "Home", path: "/" },
        { name: content.title || fallbackTitle, path },
      ]),
    ],
  });

  return (
    <>
      <PageHero
        eyebrow="Legal"
        title={content.title}
        description={`Last updated ${content.updatedAt}`}
      />
      <section className="bg-white py-20">
        <Container size="md">
          <Reveal className="space-y-10">
            <p className="text-lg leading-relaxed text-slate-600">
              {content.introduction}
            </p>

            {content.sections.map((section) => (
              <section key={section.title} className="space-y-4">
                <h2 className="font-heading text-2xl font-bold text-navy">
                  {section.title}
                </h2>
                {section.body.map((paragraph, index) => (
                  <p key={index} className="leading-relaxed text-slate-600">
                    {paragraph}
                  </p>
                ))}
              </section>
            ))}
          </Reveal>
        </Container>
      </section>
    </>
  );
}
