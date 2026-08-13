import { useEffect, useState } from "react";
import { ArrowDown, ArrowUp, Loader2, Plus, Trash2 } from "lucide-react";
import type { GalleryImage } from "../types/content";
import { fetchGallery, saveGallery } from "../lib/api";
import { useContentMeta } from "../lib/ContentContext";
import { PageLoader } from "../components/ui/PageLoader";
import { AdminButton, Card, Field, Input } from "./components/ui";
import { MediaInput } from "./components/MediaInput";

const emptyImage: GalleryImage = { url: "", alt: "", category: "" };

export function AdminGallery() {
  const { refresh } = useContentMeta();
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchGallery()
      .then((gallery) => setImages(gallery))
      .finally(() => setLoading(false));
  }, []);

  const update = (index: number, patch: Partial<GalleryImage>) =>
    setImages((prev) =>
      prev.map((img, i) => (i === index ? { ...img, ...patch } : img)),
    );

  const addImage = () => setImages((prev) => [...prev, { ...emptyImage }]);

  const removeImage = (index: number) =>
    setImages((prev) => prev.filter((_, i) => i !== index));

  const move = (index: number, direction: -1 | 1) =>
    setImages((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });

  const handleSave = async () => {
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      // Drop entries with no image so we never persist empty tiles.
      const cleaned = images
        .filter((img) => img.url.trim())
        .map((img) => ({
          url: img.url.trim(),
          alt: img.alt.trim(),
          category: img.category?.trim() || undefined,
        }));
      await saveGallery(cleaned);
      setImages(cleaned);
      await refresh();
      setMessage("Gallery saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save gallery.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <PageLoader variant="inline" label="Loading gallery" />;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Gallery</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage the images shown on the Gallery page. Uploads are stored in
            the Appwrite media bucket.
          </p>
        </div>
        <AdminButton onClick={handleSave} disabled={saving}>
          {saving && <Loader2 size={16} className="animate-spin" />}
          Save Gallery
        </AdminButton>
      </div>

      {message && (
        <div className="rounded-lg bg-green-50 p-3 text-sm text-green-700">
          {message}
        </div>
      )}
      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      {images.length === 0 ? (
        <Card>
          <p className="text-sm text-slate-500">
            No images yet. Add your first one below.
          </p>
        </Card>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {images.map((img, index) => (
            <Card key={index} className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Image {index + 1}
                </span>
                <div className="flex items-center gap-1">
                  <button
                    type="button"
                    onClick={() => move(index, -1)}
                    disabled={index === 0}
                    title="Move up"
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-gray-100 disabled:opacity-30"
                  >
                    <ArrowUp size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => move(index, 1)}
                    disabled={index === images.length - 1}
                    title="Move down"
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-gray-100 disabled:opacity-30"
                  >
                    <ArrowDown size={16} />
                  </button>
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    title="Delete"
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <Field label="Image">
                <MediaInput
                  value={img.url}
                  onChange={(url) => update(index, { url })}
                />
              </Field>
              <Field label="Alt text" hint="Describes the image for accessibility">
                <Input
                  value={img.alt}
                  onChange={(e) => update(index, { alt: e.target.value })}
                  placeholder="e.g. David speaking at a conference"
                />
              </Field>
              <Field label="Category" hint="Groups images into filter tabs">
                <Input
                  value={img.category ?? ""}
                  onChange={(e) => update(index, { category: e.target.value })}
                  placeholder="e.g. Conferences"
                />
              </Field>
            </Card>
          ))}
        </div>
      )}

      <div>
        <AdminButton variant="ghost" onClick={addImage}>
          <Plus size={16} /> Add Image
        </AdminButton>
      </div>
    </div>
  );
}
