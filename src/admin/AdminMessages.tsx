import { useEffect, useMemo, useState } from "react";
import {
  Mail,
  MailOpen,
  Phone,
  Building2,
  Trash2,
  RefreshCw,
} from "lucide-react";
import type { Submission } from "../types/content";
import {
  deleteSubmission,
  listSubmissions,
  setSubmissionRead,
} from "../lib/api";
import { cn } from "../lib/utils";
import { PageLoader } from "../components/ui/PageLoader";
import { AdminButton, Card } from "./components/ui";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime())
    ? ""
    : d.toLocaleString(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
      });
}

export function AdminMessages() {
  const [items, setItems] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const load = () => {
    setLoading(true);
    setError(null);
    listSubmissions()
      .then(setItems)
      .catch((e) =>
        setError(e instanceof Error ? e.message : "Failed to load messages."),
      )
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const unreadCount = useMemo(
    () => items.filter((m) => !m.read).length,
    [items],
  );

  const visible = useMemo(
    () => (filter === "unread" ? items.filter((m) => !m.read) : items),
    [items, filter],
  );

  const selected = useMemo(
    () => items.find((m) => m.id === selectedId) ?? null,
    [items, selectedId],
  );

  const openMessage = async (m: Submission) => {
    setSelectedId(m.id ?? null);
    if (!m.read && m.id) {
      setItems((prev) =>
        prev.map((x) => (x.id === m.id ? { ...x, read: true } : x)),
      );
      try {
        await setSubmissionRead(m.id, true);
      } catch {
        /* keep optimistic state */
      }
    }
  };

  const toggleRead = async (m: Submission) => {
    if (!m.id) return;
    const next = !m.read;
    setItems((prev) =>
      prev.map((x) => (x.id === m.id ? { ...x, read: next } : x)),
    );
    try {
      await setSubmissionRead(m.id, next);
    } catch {
      load();
    }
  };

  const handleDelete = async (m: Submission) => {
    if (!m.id) return;
    if (!window.confirm(`Delete this message from ${m.name}?`)) return;
    await deleteSubmission(m.id);
    if (selectedId === m.id) setSelectedId(null);
    setItems((prev) => prev.filter((x) => x.id !== m.id));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Messages</h1>
          <p className="mt-1 text-sm text-slate-500">
            Inquiries submitted through the website forms.
            {unreadCount > 0 && (
              <span className="ml-2 rounded-full bg-royal px-2 py-0.5 text-xs font-semibold text-white">
                {unreadCount} unread
              </span>
            )}
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex rounded-lg border border-gray-200 p-0.5">
            {(["all", "unread"] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={cn(
                  "rounded-md px-3 py-1.5 text-sm font-semibold capitalize transition",
                  filter === f
                    ? "bg-royal text-white"
                    : "text-slate-500 hover:text-navy",
                )}
              >
                {f}
              </button>
            ))}
          </div>
          <AdminButton variant="ghost" onClick={load}>
            <RefreshCw size={16} /> Refresh
          </AdminButton>
        </div>
      </div>

      {error && (
        <div className="rounded-lg bg-red-50 p-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-5">
        {/* List */}
        <Card className="p-0 lg:col-span-2">
          {loading ? (
            <PageLoader variant="inline" />
          ) : visible.length === 0 ? (
            <p className="p-6 text-sm text-slate-500">
              {filter === "unread"
                ? "No unread messages."
                : "No messages yet."}
            </p>
          ) : (
            <div className="max-h-[70vh] divide-y divide-gray-100 overflow-y-auto">
              {visible.map((m) => (
                <button
                  key={m.id}
                  onClick={() => openMessage(m)}
                  className={cn(
                    "flex w-full items-start gap-3 p-4 text-left transition hover:bg-gray-50",
                    selectedId === m.id && "bg-royal/5",
                  )}
                >
                  <span
                    className={cn(
                      "mt-1.5 h-2 w-2 shrink-0 rounded-full",
                      m.read ? "bg-transparent" : "bg-royal",
                    )}
                  />
                  <span className="min-w-0 flex-1">
                    <span className="flex items-center justify-between gap-2">
                      <span
                        className={cn(
                          "truncate text-sm",
                          m.read
                            ? "font-medium text-slate-600"
                            : "font-bold text-navy",
                        )}
                      >
                        {m.name || "Anonymous"}
                      </span>
                      <span className="shrink-0 text-xs text-slate-400">
                        {formatDate(m.createdAt)}
                      </span>
                    </span>
                    <span className="mt-0.5 block truncate text-xs font-semibold text-royal">
                      {m.type}
                    </span>
                    <span className="mt-0.5 block truncate text-sm text-slate-500">
                      {m.message}
                    </span>
                  </span>
                </button>
              ))}
            </div>
          )}
        </Card>

        {/* Detail */}
        <div className="lg:col-span-3">
          {selected ? (
            <Card className="space-y-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <span className="inline-block rounded-full bg-royal/10 px-3 py-1 text-xs font-semibold text-royal">
                    {selected.type}
                  </span>
                  <h2 className="mt-3 font-heading text-xl font-bold text-navy">
                    {selected.name || "Anonymous"}
                  </h2>
                  <p className="text-sm text-slate-400">
                    {formatDate(selected.createdAt)}
                  </p>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => toggleRead(selected)}
                    title={selected.read ? "Mark as unread" : "Mark as read"}
                    className="rounded-lg p-2 text-slate-500 hover:bg-royal/10 hover:text-royal"
                  >
                    {selected.read ? (
                      <MailOpen size={18} />
                    ) : (
                      <Mail size={18} />
                    )}
                  </button>
                  <button
                    onClick={() => handleDelete(selected)}
                    title="Delete"
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>

              <div className="grid gap-3 rounded-xl bg-light p-4 text-sm sm:grid-cols-2">
                <a
                  href={`mailto:${selected.email}`}
                  className="flex items-center gap-2 text-slate-700 hover:text-royal"
                >
                  <Mail size={16} className="text-royal" />
                  {selected.email}
                </a>
                {selected.phone && (
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex items-center gap-2 text-slate-700 hover:text-royal"
                  >
                    <Phone size={16} className="text-royal" />
                    {selected.phone}
                  </a>
                )}
                {selected.organization && (
                  <span className="flex items-center gap-2 text-slate-700">
                    <Building2 size={16} className="text-royal" />
                    {selected.organization}
                  </span>
                )}
              </div>

              {selected.subject && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                    Subject
                  </p>
                  <p className="mt-1 text-slate-700">{selected.subject}</p>
                </div>
              )}

              <div>
                <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Message
                </p>
                <p className="mt-1 whitespace-pre-wrap leading-relaxed text-slate-700">
                  {selected.message}
                </p>
              </div>

              <div>
                <a
                  href={`mailto:${selected.email}?subject=${encodeURIComponent(
                    `Re: ${selected.type}`,
                  )}`}
                >
                  <AdminButton>Reply by Email</AdminButton>
                </a>
              </div>
            </Card>
          ) : (
            <Card>
              <p className="text-sm text-slate-500">
                Select a message to read it.
              </p>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
