import { ButtonLink } from "../components/ui/Button";
import { Container } from "../components/ui/Container";
import { useSeo } from "../lib/seo";

export function NotFoundPage() {
  useSeo({
    title: "Page Not Found",
    description: "The requested page could not be found on the David Owusu website.",
    noindex: true,
  });

  return (
    <section className="hero-gradient pt-40 pb-32 text-center text-white">
      <Container size="sm">
        <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-3">
          404
        </p>
        <h1 className="font-heading text-4xl md:text-6xl font-bold mb-6">
          Page not found
        </h1>
        <p className="text-blue-100 text-lg mb-10">
          The page you're looking for has moved or doesn't exist. Let's get you
          back on track.
        </p>
        <ButtonLink to="/" variant="gold">
          Return Home
        </ButtonLink>
      </Container>
    </section>
  );
}
