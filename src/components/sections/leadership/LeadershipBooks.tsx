import { BookOpen } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";
import { SectionHeading } from "../../ui/SectionHeading";

export function LeadershipBooks() {
  const { leadership } = useContent();

  return (
    <section id="books" className="py-24 bg-navy relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 80% 20%, rgba(200,160,70,0.3), transparent 40%)",
        }}
      />
      <Container>
        <SectionHeading
          eyebrow="Books"
          heading="Featured Publications"
          subheading="Read the frameworks, stories, and principles behind two decades of leadership impact."
          invert
        />
        <div className="grid md:grid-cols-3 gap-8">
          {leadership.books.map((book, i) => (
            <Reveal key={book.title} delay={i * 120}>
              <div className="group h-full p-6 rounded-2xl bg-white/5 backdrop-blur border border-white/10 flex flex-col">
                <div className="rounded-xl overflow-hidden mb-6 aspect-[3/4]">
                  <img
                    src={book.coverUrl}
                    alt={book.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                    loading="lazy"
                  />
                </div>
                <h3 className="font-heading text-xl font-bold text-white mb-2">
                  {book.title}
                </h3>
                <p className="text-blue-100 text-sm leading-relaxed mb-5 flex-1">
                  {book.description}
                </p>
                {book.purchaseUrl && (
                  <a
                    href={book.purchaseUrl}
                    className="inline-flex items-center gap-2 text-gold font-semibold text-sm hover:text-white transition"
                  >
                    <BookOpen size={16} /> Read More
                  </a>
                )}
              </div>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
