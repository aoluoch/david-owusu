import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Loader2 } from "lucide-react";
import type { BlogPost } from "../types/content";
import { createPost, getPost, slugify, updatePost } from "../lib/api";
import { RichTextEditor } from "../components/admin/RichTextEditor";
import { AdminButton, Card, Field, Input, Textarea, Toggle } from "./components/ui";
import { MediaInput } from "./components/MediaInput";

function toDateInput(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? new Date().toISOString().slice(0, 10)
    : d.toISOString().slice(0, 10);
}

const empty: BlogPost = {
  slug: "",
  title: "",
  excerpt: "",
  body: "",
  coverImageUrl: "",
  coverImageAlt: "",
  author: "",
  tags: [],
  published: true,
  publishedAt: new Date().toISOString(),
};

export function AdminBlogEdit() {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const navigate = useNavigate();

  const [form, setForm] = useState<BlogPost>(empty);
  const [tagsText, setTagsText] = useState("");
  const [slugEdited, setSlugEdited] = useState(false);
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isNew) return;
    getPost(id!)
      .then((p) => {
        if (p) {
          setForm(p);
          setTagsText(p.tags.join(", "));
        }
      })
      .finally(() => setLoading(false));
  }, [id, isNew]);

  const set = <K extends keyof BlogPost>(key: K, value: BlogPost[K]) =>
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
      const payload: BlogPost = {
        ...form,
        slug: form.slug || slugify(form.title),
        tags: tagsText
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean),
      };
      if (isNew) await createPost(payload);
      else await updatePost(id!, payload);
      navigate("/admin/blog");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save post.");
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
            to="/admin/blog"
            className="rounded-lg p-2 text-slate-500 hover:bg-gray-100"
          >
            <ArrowLeft size={18} />
          </Link>
          <h1 className="font-heading text-2xl font-bold text-navy">
            {isNew ? "New Post" : "Edit Post"}
          </h1>
        </div>
        <AdminButton type="submit" disabled={saving}>
          {saving && <Loader2 size={16} className="animate-spin" />}
          Save Post
        </AdminButton>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <Card title="Article">
            <div className="space-y-4">
              <Field label="Title">
                <Input
                  value={form.title}
                  onChange={(e) => handleTitle(e.target.value)}
                  required
                />
              </Field>
              <Field label="Slug" hint="Used in the URL: /blog/your-slug">
                <Input
                  value={form.slug}
                  onChange={(e) => {
                    setSlugEdited(true);
                    set("slug", slugify(e.target.value));
                  }}
                />
              </Field>
              <Field label="Excerpt" hint="Short summary shown on cards">
                <Textarea
                  value={form.excerpt}
                  onChange={(e) => set("excerpt", e.target.value)}
                />
              </Field>
            </div>
          </Card>

          <Card title="Content">
            <RichTextEditor
              value={form.body}
              onChange={(html) => set("body", html)}
              placeholder="Write your article…"
            />
          </Card>
        </div>

        <div className="space-y-6">
          <Card title="Publishing">
            <div className="space-y-4">
              <Toggle
                checked={form.published}
                onChange={(v) => set("published", v)}
                label="Published"
              />
              <Field label="Publish date">
                <Input
                  type="date"
                  value={toDateInput(form.publishedAt)}
                  onChange={(e) =>
                    set(
                      "publishedAt",
                      new Date(e.target.value).toISOString(),
                    )
                  }
                />
              </Field>
              <Field label="Author">
                <Input
                  value={form.author}
                  onChange={(e) => set("author", e.target.value)}
                />
              </Field>
              <Field label="Tags" hint="Comma-separated">
                <Input
                  value={tagsText}
                  onChange={(e) => setTagsText(e.target.value)}
                  placeholder="Leadership, Faith"
                />
              </Field>
            </div>
          </Card>

          <Card title="Cover Image">
            <div className="space-y-4">
              <MediaInput
                value={form.coverImageUrl}
                onChange={(url) => set("coverImageUrl", url)}
              />
              <Field label="Image alt text">
                <Input
                  value={form.coverImageAlt}
                  onChange={(e) => set("coverImageAlt", e.target.value)}
                />
              </Field>
            </div>
          </Card>
        </div>
      </div>
    </form>
  );
}
