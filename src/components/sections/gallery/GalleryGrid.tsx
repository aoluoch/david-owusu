import { useMemo, useState } from "react";
import { X } from "lucide-react";
import { useContent } from "../../../lib/ContentContext";
import { cn } from "../../../lib/utils";
import { Container } from "../../ui/Container";
import { Reveal } from "../../ui/Reveal";

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
      activeCategory === "All"
        ? galleryPreview
        : galleryPreview.filter((img) => img.category === activeCategory),
    [activeCategory, galleryPreview],
  );

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="mb-12 flex flex-wrap justify-center gap-3">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2.5 rounded-full text-sm font-semibold transition border",
                activeCategory === cat
                  ? "bg-royal text-white border-royal"
                  : "bg-white text-navy border-gray-200 hover:border-royal hover:text-royal",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filtered.map((img, i) => (
            <Reveal key={img.url + i} delay={(i % 4) * 80}>
              <button
                type="button"
                onClick={() => setLightbox(img)}
                className="group relative rounded-2xl overflow-hidden card-lift w-full text-left"
              >
                <img
                  src={img.url}
                  alt={img.alt}
                  loading="lazy"
                  className="w-full h-64 object-cover group-hover:scale-110 transition duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/0 to-transparent opacity-0 group-hover:opacity-100 transition" />
                {img.category && (
                  <span className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-white/90 text-navy text-xs font-semibold uppercase tracking-widest opacity-0 group-hover:opacity-100 transition">
                    {img.category}
                  </span>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      </Container>

      {lightbox && (
        <div
          className="fixed inset-0 z-[60] bg-navy/90 backdrop-blur flex items-center justify-center p-6"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <button
            onClick={() => setLightbox(null)}
            className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center"
            aria-label="Close"
          >
            <X size={22} />
          </button>
          <img
            src={lightbox.url}
            alt={lightbox.alt}
            className="max-w-full max-h-[85vh] rounded-2xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </section>
  );
}
