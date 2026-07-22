import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { EventItem } from "../types/content";
import { createEvent, getEvent, slugify, updateEvent } from "../lib/api";
import { useContentMeta } from "../lib/ContentContext";
import { RichTextEditor } from "../components/admin/RichTextEditor";
import { AdminButton, Card, Field, Input, Textarea, Toggle } from "./components/ui";
import { MediaInput } from "./components/MediaInput";

const empty: EventItem = {
  slug: "",
  title: "",
  date: "",
  location: "",
  imageUrl: "",
  imageAlt: "",
  ctaLabel: "Register Now",
  ctaTo: "",
  featured: false,
  description: "",
  body: "",
  published: true,
  order: 0,
};

export function AdminEventEdit() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();
  const { refresh } = useContentMeta();

  const [form, setForm] = useState<EventItem>(empty);
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    getEvent(id!)
      .then((e) => e && setForm(e))
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = <K extends keyof EventItem>(key: K, value: EventItem[K]) =>
    setForm((f) => ({ ...f, [key]: value }));

  const handleTitle = (title: string) => {
    setForm((f) => ({
      ...f,
      title,
      slug: slugEdited ? f.slug : slugify(title),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSaving(true);
    try {
      const payload = { ...form, slug: form.slug || slugify(form.title) };
      if (isNew) await createEvent(payload);
      else await updateEvent(id!, payload);
      await refresh();
      navigate("/admin/events");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save event.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading…</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <Link
            to="/admin/events"
            className="rounded-lg p-2 text-slate-500 hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-heading text-2xl font-bold text-navy">
            {isNew ? "New Event" : "Edit Event"}
          </h1>
        </div>
        <AdminButton type="submit" disabled={saving}>
          {saving && <Loader2 size={16} className="animate-spin" />}
          Save Event
        </AdminButton>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Details">
            <div className="space-y-4">
              <Field label="Title">
                <Input
                  value={form.title}
                  onChange={(e) => handleTitle(e.target.value)}
                  required
                />
              </Field>
              <Field label="Slug" hint="Used in the URL: /events/your-slug">
                <Input
                  value={form.slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    set("slug", slugify(e.target.value));
                  }}
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Date" hint="e.g. August 15–17, 2026">
                  <Input
                    value={form.date}
                    onChange={(e) => set("date", e.target.value)}
                  />
                </Field>
                <Field label="Location">
                  <Input
                    value={form.location}
                    onChange={(e) => set("location", e.target.value)}
                  />
                </Field>
              </div>
              <Field label="Short summary" hint="Shown on cards">
                <Textarea
                  value={form.description}
                  onChange={(e) => set("description", e.target.value)}
                />
              </Field>
            </div>
          </Card>

          <Card title="Full Description">
            <RichTextEditor
              value={form.body ?? ""}
              onChange={(html) => set("body", html)}
              placeholder="Full event description shown on the detail page…"
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Publishing">
            <div className="space-y-4">
              <Toggle
                checked={form.published ?? true}
                onChange={(v) => set("published", v)}
                label="Published"
              />
              <Toggle
                checked={form.featured ?? false}
                onChange={(v) => set("featured", v)}
                label="Featured"
              />
              <Field label="Sort order" hint="Lower numbers appear first">
                <Input
                  type="number"
                  value={form.order ?? 0}
                  onChange={(e) => set("order", Number(e.target.value))}
                />
              </Field>
            </div>
          </Card>

          <Card title="Cover Image">
            <div className="space-y-4">
              <MediaInput
                value={form.imageUrl}
                onChange={(url) => set("imageUrl", url)}
              />
              <Field label="Image alt text">
                <Input
                  value={form.imageAlt}
                  onChange={(e) => set("imageAlt", e.target.value)}
                />
              </Field>
            </div>
          </Card>

          <Card title="Call To Action">
            <div className="space-y-4">
              <Field label="Button label">
                <Input
                  value={form.ctaLabel}
                  onChange={(e) => set("ctaLabel", e.target.value)}
                />
              </Field>
              <Field
                label="Button link"
                hint="External URL (https://…) or internal path (/contact)"
              >
                <Input
                  value={form.ctaTo}
                  onChange={(e) => set("ctaTo", e.target.value)}
                  placeholder="https://…"
                />
              </Field>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
