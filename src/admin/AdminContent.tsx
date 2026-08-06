import { useEffect, useMemo, useState } from "react";
import { Loader2 } from "lucide-react";
import type { IconName, SiteContent } from "../types/content";
import { emptySiteContent } from "../data/siteContent";
import {
  fetchSiteContentBlob,
  saveSiteContentBlob,
  type SiteContentBlob,
} from "../lib/api";
import { useContentMeta } from "../lib/ContentContext";
import { cn } from "../lib/utils";
import {
  AdminButton,
  Card,
  Field,
  Input,
  Textarea,
  Toggle,
} from "./components/ui";
import { MediaInput } from "./components/MediaInput";
import { ItemListEditor, StringListEditor } from "./components/ListEditor";

function baseBlob(): SiteContentBlob {
  const blob: Partial<SiteContent> = structuredClone(emptySiteContent);
  delete (blob as { events?: unknown }).events;
  return blob as SiteContentBlob;
}

type Tab =
  | "general"
  | "hero"
  | "home"
  | "about"
  | "leadership"
  | "corporate"
  | "contact"
  | "advanced";

const tabs: { id: Tab; label: string }[] = [
  { id: "general", label: "General & Buttons" },
  { id: "hero", label: "Hero" },
  { id: "home", label: "Home Sections" },
  { id: "about", label: "About Page" },
  { id: "leadership", label: "Leadership Page" },
  { id: "corporate", label: "Corporate Page" },
  { id: "contact", label: "Contact & Footer" },
  { id: "advanced", label: "Advanced (JSON)" },
];

export function AdminContent() {
  const { refresh } = useContentMeta();
  const [content, setContent] = useState<SiteContentBlob>(baseBlob);
  const [tab, setTab] = useState<Tab>("general");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jsonText, setJsonText] = useState("");

  useEffect(() => {
    fetchSiteContentBlob()
      .then((stored) => {
        if (stored) {
          setContent((prev) => deepMerge(prev, stored));
        }
      })
      .finally(() => setLoading(false));
  }, []);

  const jsonPreview = useMemo(
    () => JSON.stringify(content, null, 2),
    [content],
  );

  /** Immutably update a nested part of the content. */
  const patch = (producer: (draft: SiteContentBlob) => void) => {
    setContent((prev) => {
      const draft = structuredClone(prev);
      producer(draft);
      return draft;
    });
  };

  const handleTabChange = (next: Tab) => {
    if (next === "advanced") setJsonText(jsonPreview);
    setTab(next);
  };

  const handleSave = async () => {
    setError(null);
    setMessage(null);
    setSaving(true);
    try {
      await saveSiteContentBlob(content);
      await refresh();
      setMessage("Content saved.");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to save content.");
    } finally {
      setSaving(false);
    }
  };

  const applyJson = () => {
    setError(null);
    try {
      const parsed = JSON.parse(jsonText) as SiteContentBlob;
      setContent(parsed);
      setMessage("JSON applied. Click Save to persist.");
    } catch {
      setError("Invalid JSON — please fix and try again.");
    }
  };

  if (loading) {
    return <p className="text-sm text-slate-500">Loading content…</p>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">
            Site Content
          </h1>
          <p className="mt-1 text-sm text-slate-500">
            Edit the text, images, and buttons across the site.
          </p>
        </div>
        <AdminButton onClick={handleSave} disabled={saving}>
          {saving && <Loader2 size={16} className="animate-spin" />}
          Save Changes
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

      <div className="flex flex-wrap gap-2 border-b border-gray-200">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => handleTabChange(t.id)}
            className={cn(
              "-mb-px border-b-2 px-4 py-2.5 text-sm font-semibold transition",
              tab === t.id
                ? "border-royal text-royal"
                : "border-transparent text-slate-500 hover:text-navy",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "general" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Brand">
            <div className="space-y-4">
              <Field label="Brand name">
                <Input
                  value={content.brand.name}
                  onChange={(e) => patch((d) => (d.brand.name = e.target.value))}
                />
              </Field>
              <Field label="Tagline">
                <Textarea
                  value={content.brand.tagline}
                  onChange={(e) =>
                    patch((d) => (d.brand.tagline = e.target.value))
                  }
                />
              </Field>
            </div>
          </Card>

          <Card title="Navbar Buttons">
            <div className="space-y-5">
              <div className="space-y-3 rounded-lg bg-light p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Primary button
                </p>
                <Field label="Label">
                  <Input
                    value={content.ctaButtons.primary.label}
                    onChange={(e) =>
                      patch((d) => (d.ctaButtons.primary.label = e.target.value))
                    }
                  />
                </Field>
                <Field label="Link" hint="/contact or https://…">
                  <Input
                    value={content.ctaButtons.primary.to}
                    onChange={(e) =>
                      patch((d) => (d.ctaButtons.primary.to = e.target.value))
                    }
                  />
                </Field>
              </div>
              <div className="space-y-3 rounded-lg bg-light p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Secondary button
                </p>
                <Field label="Label">
                  <Input
                    value={content.ctaButtons.secondary.label}
                    onChange={(e) =>
                      patch(
                        (d) => (d.ctaButtons.secondary.label = e.target.value),
                      )
                    }
                  />
                </Field>
                <Field label="Link" hint="/contact or https://…">
                  <Input
                    value={content.ctaButtons.secondary.to}
                    onChange={(e) =>
                      patch((d) => (d.ctaButtons.secondary.to = e.target.value))
                    }
                  />
                </Field>
              </div>
            </div>
          </Card>
        </div>
      )}

      {tab === "hero" && (
        <Card title="Homepage Hero">
          <div className="grid gap-4 lg:grid-cols-2">
            <Field label="Headline">
              <Textarea
                value={content.hero.headline}
                onChange={(e) => patch((d) => (d.hero.headline = e.target.value))}
              />
            </Field>
            <Field label="Subheadline">
              <Textarea
                value={content.hero.subheadline}
                onChange={(e) =>
                  patch((d) => (d.hero.subheadline = e.target.value))
                }
              />
            </Field>
            <Field label="Primary button label">
              <Input
                value={content.hero.primaryCta.label}
                onChange={(e) =>
                  patch((d) => (d.hero.primaryCta.label = e.target.value))
                }
              />
            </Field>
            <Field label="Primary button link">
              <Input
                value={content.hero.primaryCta.to}
                onChange={(e) =>
                  patch((d) => (d.hero.primaryCta.to = e.target.value))
                }
              />
            </Field>
            <Field label="Secondary button label">
              <Input
                value={content.hero.secondaryCta.label}
                onChange={(e) =>
                  patch((d) => (d.hero.secondaryCta.label = e.target.value))
                }
              />
            </Field>
            <Field label="Secondary button link">
              <Input
                value={content.hero.secondaryCta.to}
                onChange={(e) =>
                  patch((d) => (d.hero.secondaryCta.to = e.target.value))
                }
              />
            </Field>
            <div className="lg:col-span-2">
              <Field label="Portrait image">
                <MediaInput
                  value={content.hero.portraitUrl}
                  onChange={(url) => patch((d) => (d.hero.portraitUrl = url))}
                />
              </Field>
            </div>
            <Field label="Portrait alt text">
              <Input
                value={content.hero.portraitAlt}
                onChange={(e) =>
                  patch((d) => (d.hero.portraitAlt = e.target.value))
                }
              />
            </Field>
          </div>
        </Card>
      )}

      {tab === "home" && (
        <div className="space-y-6">
          <Card title="About Preview">
            <div className="grid gap-4 lg:grid-cols-2">
              <Field label="Eyebrow">
                <Input
                  value={content.aboutPreview.eyebrow}
                  onChange={(e) =>
                    patch((d) => (d.aboutPreview.eyebrow = e.target.value))
                  }
                />
              </Field>
              <Field label="Heading">
                <Input
                  value={content.aboutPreview.heading}
                  onChange={(e) =>
                    patch((d) => (d.aboutPreview.heading = e.target.value))
                  }
                />
              </Field>
              <div className="lg:col-span-2">
                <Field label="Body">
                  <Textarea
                    value={content.aboutPreview.body}
                    onChange={(e) =>
                      patch((d) => (d.aboutPreview.body = e.target.value))
                    }
                  />
                </Field>
              </div>
              <Field label="Button label">
                <Input
                  value={content.aboutPreview.ctaLabel}
                  onChange={(e) =>
                    patch((d) => (d.aboutPreview.ctaLabel = e.target.value))
                  }
                />
              </Field>
              <Field label="Button link">
                <Input
                  value={content.aboutPreview.ctaTo}
                  onChange={(e) =>
                    patch((d) => (d.aboutPreview.ctaTo = e.target.value))
                  }
                />
              </Field>
              <div className="lg:col-span-2">
                <Field label="Image">
                  <MediaInput
                    value={content.aboutPreview.imageUrl}
                    onChange={(url) =>
                      patch((d) => (d.aboutPreview.imageUrl = url))
                    }
                  />
                </Field>
              </div>
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card title="Vision">
              <div className="space-y-4">
                <Field label="Title">
                  <Input
                    value={content.visionMission.vision.title}
                    onChange={(e) =>
                      patch(
                        (d) => (d.visionMission.vision.title = e.target.value),
                      )
                    }
                  />
                </Field>
                <Field label="Body">
                  <Textarea
                    value={content.visionMission.vision.body}
                    onChange={(e) =>
                      patch(
                        (d) => (d.visionMission.vision.body = e.target.value),
                      )
                    }
                  />
                </Field>
              </div>
            </Card>
            <Card title="Mission">
              <div className="space-y-4">
                <Field label="Title">
                  <Input
                    value={content.visionMission.mission.title}
                    onChange={(e) =>
                      patch(
                        (d) => (d.visionMission.mission.title = e.target.value),
                      )
                    }
                  />
                </Field>
                <Field label="Body">
                  <Textarea
                    value={content.visionMission.mission.body}
                    onChange={(e) =>
                      patch(
                        (d) => (d.visionMission.mission.body = e.target.value),
                      )
                    }
                  />
                </Field>
              </div>
            </Card>
          </div>

          <Card title="Organizations & Institutions">
            <ItemListEditor
              items={content.organizations}
              onChange={(v) => patch((d) => (d.organizations = v))}
              template={() => ({
                name: "",
                description: "",
                logoUrl: "",
                websiteEnabled: false,
                websiteUrl: "",
              })}
              itemLabel="Organization"
              addLabel="Add organization"
              renderItem={(item, update) => {
                const websiteEnabled =
                  item.websiteEnabled ?? Boolean(item.websiteUrl?.trim());

                return (
                  <>
                    <Field label="Name">
                      <Input
                        value={item.name}
                        onChange={(e) => update({ name: e.target.value })}
                      />
                    </Field>
                    <Field label="Description">
                      <Textarea
                        value={item.description}
                        onChange={(e) => update({ description: e.target.value })}
                      />
                    </Field>
                    <Field
                      label="Logo image"
                      hint="Leave blank to show a generated institution placeholder."
                    >
                      <MediaInput
                        value={item.logoUrl}
                        onChange={(url) => update({ logoUrl: url })}
                      />
                    </Field>
                    <Toggle
                      checked={websiteEnabled}
                      onChange={(checked) => update({ websiteEnabled: checked })}
                      label="Show Visit Website link"
                    />
                    <Field label="Website link">
                      <Input
                        value={item.websiteUrl ?? ""}
                        onChange={(e) => update({ websiteUrl: e.target.value })}
                        placeholder="https://..."
                        disabled={!websiteEnabled}
                      />
                    </Field>
                  </>
                );
              }}
            />
          </Card>
        </div>
      )}

      {tab === "about" && (
        <div className="space-y-6">
          <Card title="Page Header">
            <div className="grid gap-4">
              <Field label="Eyebrow">
                <Input
                  value={content.pageHeaders.about.eyebrow}
                  onChange={(e) =>
                    patch((d) => (d.pageHeaders.about.eyebrow = e.target.value))
                  }
                />
              </Field>
              <Field label="Title">
                <Input
                  value={content.pageHeaders.about.title}
                  onChange={(e) =>
                    patch((d) => (d.pageHeaders.about.title = e.target.value))
                  }
                />
              </Field>
              <Field label="Description">
                <Textarea
                  value={content.pageHeaders.about.description}
                  onChange={(e) =>
                    patch(
                      (d) =>
                        (d.pageHeaders.about.description = e.target.value),
                    )
                  }
                />
              </Field>
            </div>
          </Card>

          <Card title="About Hero & Quote">
            <div className="space-y-4">
              <Field label="Hero image">
                <MediaInput
                  value={content.about.heroImage}
                  onChange={(url) => patch((d) => (d.about.heroImage = url))}
                />
              </Field>
              <Field label="Pull quote">
                <Textarea
                  value={content.about.quote}
                  onChange={(e) => patch((d) => (d.about.quote = e.target.value))}
                />
              </Field>
            </div>
          </Card>

          <Card title="Biography">
            <p className="mb-4 text-sm text-slate-500">
              Each entry is a paragraph shown on the About page.
            </p>
            <StringListEditor
              items={content.about.biography}
              onChange={(v) => patch((d) => (d.about.biography = v))}
              multiline
              placeholder="Biography paragraph…"
              addLabel="Add paragraph"
            />
          </Card>

          {/* Life journey / milestone timeline editor intentionally hidden. */}

          <Card title="Values">
            <ItemListEditor
              items={content.about.values}
              onChange={(v) => patch((d) => (d.about.values = v))}
              template={() => ({
                title: "",
                description: "",
                icon: "sparkles" as IconName,
              })}
              itemLabel="Value"
              addLabel="Add value"
              renderItem={(item, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Title">
                      <Input
                        value={item.title}
                        onChange={(e) => update({ title: e.target.value })}
                      />
                    </Field>
                    <Field label="Icon" hint="lucide icon name, e.g. shield">
                      <Input
                        value={item.icon}
                        onChange={(e) =>
                          update({ icon: e.target.value as IconName })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea
                      value={item.description}
                      onChange={(e) => update({ description: e.target.value })}
                    />
                  </Field>
                </>
              )}
            />
          </Card>

          <Card title="Awards">
            <StringListEditor
              items={content.about.awards}
              onChange={(v) => patch((d) => (d.about.awards = v))}
              placeholder="Award or recognition…"
              addLabel="Add award"
            />
          </Card>
        </div>
      )}

      {tab === "leadership" && (
        <div className="space-y-6">
          <Card title="Page Header">
            <div className="grid gap-4">
              <Field label="Eyebrow">
                <Input
                  value={content.pageHeaders.leadership.eyebrow}
                  onChange={(e) =>
                    patch(
                      (d) =>
                        (d.pageHeaders.leadership.eyebrow = e.target.value),
                    )
                  }
                />
              </Field>
              <Field label="Title">
                <Input
                  value={content.pageHeaders.leadership.title}
                  onChange={(e) =>
                    patch(
                      (d) => (d.pageHeaders.leadership.title = e.target.value),
                    )
                  }
                />
              </Field>
              <Field label="Description">
                <Textarea
                  value={content.pageHeaders.leadership.description}
                  onChange={(e) =>
                    patch(
                      (d) =>
                        (d.pageHeaders.leadership.description =
                          e.target.value),
                    )
                  }
                />
              </Field>
            </div>
          </Card>

          <Card title="Philosophy">
            <Field label="Leadership philosophy">
              <Textarea
                value={content.leadership.philosophy}
                onChange={(e) =>
                  patch((d) => (d.leadership.philosophy = e.target.value))
                }
                className="min-h-32"
              />
            </Field>
          </Card>

          <Card title="Principles">
            <ItemListEditor
              items={content.leadership.principles}
              onChange={(v) => patch((d) => (d.leadership.principles = v))}
              template={() => ({ title: "", description: "" })}
              itemLabel="Principle"
              addLabel="Add principle"
              renderItem={(item, update) => (
                <>
                  <Field label="Title">
                    <Input
                      value={item.title}
                      onChange={(e) => update({ title: e.target.value })}
                    />
                  </Field>
                  <Field label="Description">
                    <Textarea
                      value={item.description}
                      onChange={(e) => update({ description: e.target.value })}
                    />
                  </Field>
                </>
              )}
            />
          </Card>

          <Card title="Programs">
            <ItemListEditor
              items={content.leadership.programs}
              onChange={(v) => patch((d) => (d.leadership.programs = v))}
              template={() => ({
                title: "",
                description: "",
                icon: "briefcase" as IconName,
              })}
              itemLabel="Program"
              addLabel="Add program"
              renderItem={(item, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Title">
                      <Input
                        value={item.title}
                        onChange={(e) => update({ title: e.target.value })}
                      />
                    </Field>
                    <Field label="Icon" hint="lucide icon name">
                      <Input
                        value={item.icon}
                        onChange={(e) =>
                          update({ icon: e.target.value as IconName })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea
                      value={item.description}
                      onChange={(e) => update({ description: e.target.value })}
                    />
                  </Field>
                </>
              )}
            />
          </Card>

          <Card title="Books">
            <ItemListEditor
              items={content.leadership.books}
              onChange={(v) => patch((d) => (d.leadership.books = v))}
              template={() => ({
                title: "",
                description: "",
                coverUrl: "",
                purchaseUrl: "",
              })}
              itemLabel="Book"
              addLabel="Add book"
              renderItem={(item, update) => (
                <>
                  <Field label="Title">
                    <Input
                      value={item.title}
                      onChange={(e) => update({ title: e.target.value })}
                    />
                  </Field>
                  <Field label="Description">
                    <Textarea
                      value={item.description}
                      onChange={(e) => update({ description: e.target.value })}
                    />
                  </Field>
                  <Field label="Cover image">
                    <MediaInput
                      value={item.coverUrl}
                      onChange={(url) => update({ coverUrl: url })}
                    />
                  </Field>
                  <Field label="Purchase link">
                    <Input
                      value={item.purchaseUrl ?? ""}
                      onChange={(e) => update({ purchaseUrl: e.target.value })}
                      placeholder="https://…"
                    />
                  </Field>
                </>
              )}
            />
          </Card>

          <Card title="Speaking Topics">
            <StringListEditor
              items={content.leadership.speakingTopics}
              onChange={(v) => patch((d) => (d.leadership.speakingTopics = v))}
              placeholder="Speaking topic…"
              addLabel="Add topic"
            />
          </Card>
        </div>
      )}

      {tab === "corporate" && (
        <div className="space-y-6">
          <Card title="Page Header">
            <div className="grid gap-4">
              <Field label="Eyebrow">
                <Input
                  value={content.pageHeaders.corporate.eyebrow}
                  onChange={(e) =>
                    patch(
                      (d) =>
                        (d.pageHeaders.corporate.eyebrow = e.target.value),
                    )
                  }
                />
              </Field>
              <Field label="Title">
                <Input
                  value={content.pageHeaders.corporate.title}
                  onChange={(e) =>
                    patch(
                      (d) => (d.pageHeaders.corporate.title = e.target.value),
                    )
                  }
                />
              </Field>
              <Field label="Description">
                <Textarea
                  value={content.pageHeaders.corporate.description}
                  onChange={(e) =>
                    patch(
                      (d) =>
                        (d.pageHeaders.corporate.description = e.target.value),
                    )
                  }
                />
              </Field>
            </div>
          </Card>

          <Card title="Corporate Bio">
            <Field label="Introduction">
              <Textarea
                value={content.corporate.bio}
                onChange={(e) =>
                  patch((d) => (d.corporate.bio = e.target.value))
                }
                className="min-h-32"
              />
            </Field>
          </Card>

          <Card title="Services">
            <ItemListEditor
              items={content.corporate.services}
              onChange={(v) => patch((d) => (d.corporate.services = v))}
              template={() => ({
                title: "",
                description: "",
                icon: "briefcase" as IconName,
              })}
              itemLabel="Service"
              addLabel="Add service"
              renderItem={(item, update) => (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <Field label="Title">
                      <Input
                        value={item.title}
                        onChange={(e) => update({ title: e.target.value })}
                      />
                    </Field>
                    <Field label="Icon" hint="lucide icon name">
                      <Input
                        value={item.icon}
                        onChange={(e) =>
                          update({ icon: e.target.value as IconName })
                        }
                      />
                    </Field>
                  </div>
                  <Field label="Description">
                    <Textarea
                      value={item.description}
                      onChange={(e) => update({ description: e.target.value })}
                    />
                  </Field>
                </>
              )}
            />
          </Card>

          <Card title="Industries">
            <p className="mb-4 text-sm text-slate-500">
              These appear as the Industries Served chips on the Corporate page.
            </p>
            <StringListEditor
              items={content.corporate.industries}
              onChange={(v) => patch((d) => (d.corporate.industries = v))}
              placeholder="Industry…"
              addLabel="Add industry"
            />
          </Card>

          {/* Corporate case studies editor intentionally hidden. */}
        </div>
      )}

      {tab === "contact" && (
        <div className="grid gap-6 lg:grid-cols-2">
          <Card title="Contact Details">
            <div className="space-y-4">
              <Field label="Email">
                <Input
                  value={content.contact.email}
                  onChange={(e) =>
                    patch((d) => (d.contact.email = e.target.value))
                  }
                />
              </Field>
              <Field label="Phone">
                <Input
                  value={content.contact.phone}
                  onChange={(e) =>
                    patch((d) => (d.contact.phone = e.target.value))
                  }
                />
              </Field>
              <Field label="Address">
                <Input
                  value={content.contact.address}
                  onChange={(e) =>
                    patch((d) => (d.contact.address = e.target.value))
                  }
                />
              </Field>
            </div>
          </Card>

          <Card title="Footer">
            <div className="space-y-4">
              <Field label="Brand">
                <Input
                  value={content.footer.brand}
                  onChange={(e) =>
                    patch((d) => (d.footer.brand = e.target.value))
                  }
                />
              </Field>
              <Field label="Tagline">
                <Textarea
                  value={content.footer.tagline}
                  onChange={(e) =>
                    patch((d) => (d.footer.tagline = e.target.value))
                  }
                />
              </Field>
              <Field label="Copyright">
                <Input
                  value={content.footer.copyright}
                  onChange={(e) =>
                    patch((d) => (d.footer.copyright = e.target.value))
                  }
                />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Footer email">
                  <Input
                    value={content.footer.contact.email}
                    onChange={(e) =>
                      patch((d) => (d.footer.contact.email = e.target.value))
                    }
                  />
                </Field>
                <Field label="Footer phone">
                  <Input
                    value={content.footer.contact.phone}
                    onChange={(e) =>
                      patch((d) => (d.footer.contact.phone = e.target.value))
                    }
                  />
                </Field>
                <Field label="Footer address">
                  <Input
                    value={content.footer.contact.address}
                    onChange={(e) =>
                      patch((d) => (d.footer.contact.address = e.target.value))
                    }
                  />
                </Field>
              </div>
            </div>
          </Card>

          <Card title="Footer Link Columns" className="lg:col-span-2">
            <ItemListEditor
              items={content.footer.columns}
              onChange={(v) => patch((d) => (d.footer.columns = v))}
              template={() => ({ title: "", links: [] })}
              itemLabel="Column"
              addLabel="Add column"
              renderItem={(column, update) => (
                <>
                  <Field label="Column title">
                    <Input
                      value={column.title}
                      onChange={(e) => update({ title: e.target.value })}
                    />
                  </Field>
                  <ItemListEditor
                    items={column.links}
                    onChange={(links) => update({ links })}
                    template={() => ({ label: "", to: "" })}
                    itemLabel="Link"
                    addLabel="Add link"
                    renderItem={(link, updateLink) => (
                      <div className="grid gap-3 sm:grid-cols-2">
                        <Field label="Label">
                          <Input
                            value={link.label}
                            onChange={(e) =>
                              updateLink({ label: e.target.value })
                            }
                          />
                        </Field>
                        <Field
                          label="URL"
                          hint="/about, #section, or https://..."
                        >
                          <Input
                            value={link.to}
                            onChange={(e) => updateLink({ to: e.target.value })}
                          />
                        </Field>
                      </div>
                    )}
                  />
                </>
              )}
            />
          </Card>

          <Card title="Social Media Links" className="lg:col-span-2">
            <ItemListEditor
              items={content.footer.socialLinks}
              onChange={(v) => patch((d) => (d.footer.socialLinks = v))}
              template={() => ({ label: "LinkedIn", to: "#" })}
              itemLabel="Social link"
              addLabel="Add social link"
              renderItem={(item, update) => (
                <div className="grid gap-3 sm:grid-cols-2">
                  <Field
                    label="Platform"
                    hint="LinkedIn, X, Instagram, Facebook, or YouTube"
                  >
                    <Input
                      value={item.label}
                      onChange={(e) => update({ label: e.target.value })}
                    />
                  </Field>
                  <Field label="URL" hint="Opens in a new browser tab">
                    <Input
                      value={item.to}
                      onChange={(e) => update({ to: e.target.value })}
                    />
                  </Field>
                </div>
              )}
            />
          </Card>
        </div>
      )}

      {tab === "advanced" && (
        <Card title="Full Content (JSON)">
          <p className="mb-4 text-sm text-slate-500">
            Advanced: edit any part of the site content — including stats,
            areas of influence, testimonials, organizations, gallery, awards,
            books, services, FAQs, and navigation. Edit the JSON below, click
            Apply, then Save Changes.
          </p>
          <Textarea
            value={jsonText}
            onChange={(e) => setJsonText(e.target.value)}
            className="min-h-[480px] font-mono text-xs"
            spellCheck={false}
          />
          <div className="mt-4">
            <AdminButton variant="ghost" onClick={applyJson}>
              Apply JSON
            </AdminButton>
          </div>
        </Card>
      )}
    </div>
  );
}

/* Local deep-merge (defaults + stored overrides) so the editor always has a
 * complete object to bind form fields to. */
function deepMerge<T>(base: T, override: Partial<T> | undefined | null): T {
  if (override === undefined || override === null) return base;
  if (Array.isArray(base) || typeof base !== "object") {
    return (override as T) ?? base;
  }
  const result: Record<string, unknown> = {
    ...(base as Record<string, unknown>),
  };
  for (const key of Object.keys(override)) {
    const baseValue = (base as Record<string, unknown>)[key];
    const overrideValue = (override as Record<string, unknown>)[key];
    if (
      baseValue &&
      typeof baseValue === "object" &&
      !Array.isArray(baseValue) &&
      overrideValue &&
      typeof overrideValue === "object" &&
      !Array.isArray(overrideValue)
    ) {
      result[key] = deepMerge(baseValue, overrideValue as Partial<unknown>);
    } else if (overrideValue !== undefined) {
      result[key] = overrideValue;
    }
  }
  return result as T;
}
