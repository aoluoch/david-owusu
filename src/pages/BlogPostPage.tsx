import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, CalendarDays, User } from "lucide-react";
import type { BlogPost } from "../types/content";
import { getPostBySlug } from "../lib/api";
import { Container } from "../components/ui/Container";
import { RichText } from "../components/ui/RichText";
import { PageLoader } from "../components/ui/PageLoader";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleDateString(undefined, {
        year: "numeric",
        month: "long",
        day: "numeric",
      });
}

export function BlogPostPage() {
  const { slug = "" } = useParams();
  const [loaded, setLoaded] = useState<{
    slug: string;
    post: BlogPost | null;
  } | null>(null);
  const loading = loaded?.slug !== slug;
  const post = loaded?.post ?? null;

  useEffect(() => {
    let mounted = true;
    getPostBySlug(slug).then((p) => mounted && setLoaded({ slug, post: p }));
    return () => {
      mounted = false;
    };
  }, [slug]);

  if (loading) {
    return (
      <PageLoader
        variant="page"
        tone="dark"
        className="min-h-screen hero-gradient"
        label="Loading article"
      />
    );
  }

  if (!post) {
    return (
      <div className="pt-40 pb-32">
        <Container>
          <div className="text-center">
            <h1 className="mb-4 font-heading text-3xl font-bold text-navy">
              Article not found
            </h1>
            <Link to="/blog" className="font-semibold text-royal">
              ← Back to the blog
            </Link>
          </div>
        </Container>
      </div>
    );
  }

  return (
    <>
      <section className="hero-gradient pt-36 pb-20 lg:pt-44">
        <Container>
          <div className="mx-auto max-w-3xl">
            <Link
              to="/blog"
              className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-blue-100 transition hover:text-gold"
            >
              <ArrowLeft size={16} /> All Articles
            </Link>
            {post.tags?.[0] && (
              <span className="mb-4 inline-block rounded-full bg-gold/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
                {post.tags[0]}
              </span>
            )}
            <h1 className="mb-6 font-heading text-4xl font-bold leading-tight text-white md:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-5 text-sm text-blue-100">
              {post.author && (
                <span className="inline-flex items-center gap-2">
                  <User size={16} className="text-gold" /> {post.author}
                </span>
              )}
              <span className="inline-flex items-center gap-2">
                <CalendarDays size={16} className="text-gold" />
                {formatDate(post.publishedAt)}
              </span>
            </div>
          </div>
        </Container>
      </section>

      <article className="py-16 lg:py-24 bg-white">
        <Container>
          <div className="mx-auto max-w-3xl">
            {post.coverImageUrl && (
              <div className="mb-10 flex max-h-[520px] min-h-72 items-center justify-center overflow-hidden rounded-2xl bg-light shadow-lg">
                <img
                  src={post.coverImageUrl}
                  alt={post.coverImageAlt}
                  className="max-h-[520px] w-full object-contain p-3"
                />
              </div>
            )}
            <RichText html={post.body} className="text-lg" />

            {post.tags.length > 1 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-gray-100 pt-8">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-light px-3 py-1 text-xs font-semibold text-slate-600"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Container>
      </article>
    </>
  );
}
