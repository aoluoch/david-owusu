import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CalendarDays } from "lucide-react";
import type { BlogPost } from "../types/content";
import { listPosts } from "../lib/api";
import { appwriteConfig, collectionChannel, subscribe } from "../lib/appwrite";
import { Container } from "../components/ui/Container";
import { Reveal } from "../components/ui/Reveal";
import { PageHero } from "../components/sections/shared";
import { PageLoader } from "../components/ui/PageLoader";
import { hasMediaUrl } from "../lib/utils";

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

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    const load = () =>
      listPosts({ publishedOnly: true })
        .then((p) => mounted && setPosts(p))
        .finally(() => mounted && setLoading(false));
    load();
    // Live updates when posts are created/edited/deleted in the admin.
    const unsubscribe = subscribe(
      collectionChannel(appwriteConfig.blogCollectionId),
      () => {
        load();
      },
    );
    return () => {
      mounted = false;
      unsubscribe();
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Blog"
        title="Insights on Leadership & Purpose"
        description="Articles, reflections, and teaching from Dr. David Owusu on leadership, faith, business, and building enduring impact."
      />

      <section className="py-24 bg-white">
        <Container>
          {loading ? (
            <PageLoader variant="page" label="Loading articles" />
          ) : posts.length === 0 ? (
            <p className="text-center text-slate-500">
              No articles published yet. Check back soon.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post, i) => (
                <Reveal key={post.id ?? post.slug} delay={(i % 3) * 100}>
                  <Link
                    to={`/blog/${post.slug}`}
                    className="card-lift group flex h-full flex-col overflow-hidden rounded-2xl bg-white shadow-lg"
                  >
                    <div className="flex h-56 items-center justify-center overflow-hidden bg-light">
                      {hasMediaUrl(post.coverImageUrl) && (
                        <img
                          src={post.coverImageUrl}
                          alt={post.coverImageAlt}
                          loading="lazy"
                          className="h-full w-full object-contain p-3 transition duration-500 group-hover:scale-105"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col p-6">
                      {post.tags?.[0] && (
                        <span className="mb-3 inline-block w-fit rounded-full bg-royal/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-royal">
                          {post.tags[0]}
                        </span>
                      )}
                      <h3 className="mb-3 font-heading text-xl font-bold text-navy transition group-hover:text-royal">
                        {post.title}
                      </h3>
                      <p className="mb-5 flex-1 text-sm leading-relaxed text-gray-500">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-400">
                        <CalendarDays size={14} />
                        {formatDate(post.publishedAt)}
                        {post.author && <span>· {post.author}</span>}
                      </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          )}
        </Container>
      </section>
    </>
  );
}
