import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import {
  optimizedImageSrcSet,
  optimizedImageUrl,
} from "../../../lib/appwrite";
import { cn, hasMediaUrl } from "../../../lib/utils";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";

const THUMB_WIDTHS = [400, 640, 960] as const;
const THUMB_SIZES =
  "(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw";
const LIGHTBOX_WIDTH = 1600;

export function GalleryGrid() {
  const { galleryPreview } = useContent();
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [lightbox, setLightbox] = useState<{ url: string; alt: string } | null>(
    null,
  );

  const categories = useMemo(() => {
    const set = new Set<string>();
    galleryPreview.forEach((img) => {
      if (img.category) set.add(img.category);
    });
    return ["All", ...Array.from(set)];
  }, [galleryPreview]);

  const filtered = useMemo(
    () =>
      (activeCategory === "All"
        ? galleryPreview
        : galleryPreview.filter((img) => img.category === activeCategory)
      ).filter((img) => hasMediaUrl(img.url)),
    [activeCategory, galleryPreview],
  );

  return (
    <section className="bg-white py-24">
      <Container>
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "rounded-full border px-5 py-2.5 text-sm font-semibold transition",
                activeCategory === cat
                  ? "border-royal bg-royal text-white"
                  : "border-gray-200 bg-white text-navy hover:border-royal",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((img, i) => {
            const eager = i < 8;
            return (
              <Reveal key={img.url + i} delay={(i % 4) * 80}>
                <button
                  type="button"
                  onClick={() => setLightbox(img)}
                  className="card-lift group relative w-full overflow-hidden rounded-2xl text-left"
                >
                  <img
                    src={optimizedImageUrl(img.url, {
                      width: 640,
                      quality: 70,
                      output: "webp",
                    })}
                    srcSet={optimizedImageSrcSet(img.url, THUMB_WIDTHS, 70)}
                    sizes={THUMB_SIZES}
                    alt={img.alt}
                    loading={eager ? "eager" : "lazy"}
                    fetchPriority={eager ? "high" : "low"}
                    decoding="async"
                    width={640}
                    height={512}
                    className="h-64 w-full bg-light object-cover transition duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/0 to-transparent opacity-0 transition group-hover:opacity-100" />
                  {img.category && (
                    <span className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-navy opacity-0 transition group-hover:opacity-100">
                      {img.category}
                    </span>
                  )}
                </button>
              </Reveal>
            );
          })}
        </div>
      </Container>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-navy/90 p-6 backdrop-blur"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white hover:bg-white/20"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <img
            src={optimizedImageUrl(lightbox.url, {
              width: LIGHTBOX_WIDTH,
              quality: 80,
              output: "webp",
            })}
            alt={lightbox.alt}
            decoding="async"
            width={LIGHTBOX_WIDTH}
            height={1200}
            className="max-h-[85vh] max-w-full rounded-2xl bg-navy/40 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
