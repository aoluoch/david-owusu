import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import type { EventItem } from "../types/content";
import { deleteEvent, listEvents } from "../lib/api";
import { AdminButton, Card } from "./components/ui";

export function AdminEvents() {
  const [events, setEvents] = useState<EventItem[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    listEvents()
      .then(setEvents)
      .finally(() => setLoading(false));
  };

  useEffect(load, []);

  const handleDelete = async (event: EventItem) => {
    if (!event.id) return;
    if (!window.confirm(`Delete "${event.title}"? This cannot be undone.`))
      return;
    await deleteEvent(event.id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Events</h1>
          <p className="mt-1 text-sm text-slate-500">
            Manage events shown on the site and their detail pages.
          </p>
        </div>
        <Link to="/admin/events/new">
          <AdminButton>
            <Plus size={16} /> New Event
          </AdminButton>
        </Link>
      </div>

      <Card className="p-0">
        {loading ? (
          <p className="p-6 text-sm text-slate-500">Loading…</p>
        ) : events.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">
            No events yet. Create your first one.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {events.map((event) => (
              <div
                key={event.id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50"
              >
                <img
                  src={event.imageUrl}
                  alt=""
                  className="h-14 w-20 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="truncate font-semibold text-navy">
                      {event.title}
                    </p>
                    {event.featured && (
                      <Star size={14} className="shrink-0 text-gold" fill="currentColor" />
                    )}
                  </div>
                  <p className="truncate text-sm text-slate-500">
                    {event.date} · {event.location}
                  </p>
                </div>
                <span
                  className={
                    event.published
                      ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700"
                      : "rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500"
                  }
                >
                  {event.published ? "Published" : "Draft"}
                </span>
                <div className="flex items-center gap-1">
                  <Link
                    to={`/admin/events/${event.id}`}
                    className="rounded-lg p-2 text-slate-500 hover:bg-royal/10 hover:text-royal"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(event)}
                    className="rounded-lg p-2 text-slate-500 hover:bg-red-50 hover:text-red-600"
                    title="Delete"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  );
}
