import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CalendarDays,
  FileText,
  Image,
  Mail,
  PlusCircle,
  Settings,
} from "lucide-react";
import { listEvents, listPosts, listSubmissions } from "../lib/api";
import { Card } from "./components/ui";

export function AdminDashboard() {
  const [counts, setCounts] = useState({
    events: 0,
    posts: 0,
    unread: 0,
  });

  useEffect(() => {
    Promise.all([listEvents(), listPosts(), listSubmissions()]).then(
      ([events, posts, submissions]) => {
        setCounts({
          events: events.length,
          posts: posts.length,
          unread: submissions.filter((s) => !s.read).length,
        });
      },
    );
  }, []);

  const stats = [
    { label: "Events", value: counts.events, icon: CalendarDays, to: "/admin/events" },
    { label: "Blog Posts", value: counts.posts, icon: FileText, to: "/admin/blog" },
    {
      label: "Unread Messages",
      value: counts.unread,
      icon: Mail,
      to: "/admin/messages",
    },
  ];

  const actions = [
    { label: "Edit Site Content", to: "/admin/content", icon: Settings },
    { label: "New Event", to: "/admin/events/new", icon: PlusCircle },
    { label: "New Blog Post", to: "/admin/blog/new", icon: PlusCircle },
    { label: "Manage Gallery", to: "/admin/gallery", icon: Image },
    { label: "View Messages", to: "/admin/messages", icon: Mail },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-heading text-2xl font-bold text-navy">Dashboard</h1>
        <p className="mt-1 text-sm text-slate-500">
          Manage every part of the website from here.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-3">
        {stats.map(({ label, value, icon: Icon, to }) => (
          <Link key={label} to={to}>
            <Card className="transition hover:shadow-md">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{label}</p>
                  <p className="mt-1 font-heading text-3xl font-bold text-navy">
                    {value}
                  </p>
                </div>
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-royal/10 text-royal">
                  <Icon size={22} />
                </div>
              </div>
            </Card>
          </Link>
        ))}
      </div>

      <Card title="Quick Actions">
        <div className="grid gap-4 sm:grid-cols-3">
          {actions.map(({ label, to, icon: Icon }) => (
            <Link
              key={label}
              to={to}
              className="flex items-center gap-3 rounded-xl border border-gray-100 p-4 transition hover:border-royal hover:bg-royal/5"
            >
              <Icon size={20} className="text-royal" />
              <span className="text-sm font-semibold text-navy">{label}</span>
            </Link>
          ))}
        </div>
      </Card>
    </div>
  );
}
