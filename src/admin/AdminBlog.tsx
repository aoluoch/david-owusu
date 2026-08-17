import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Pencil, Plus, Trash2 } from "lucide-react";
import type { BlogPost } from "../types/content";
import { deletePost, listPosts } from "../lib/api";
import { PageLoader } from "../components/ui/PageLoader";
import { hasMediaUrl } from "../lib/utils";
import { AdminButton, Card } from "./components/ui";

function formatDate(iso: string): string {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? "" : d.toLocaleDateString();
}

export function AdminBlog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  const load = () => {
    setLoading(true);
    listPosts()
      .then(setPosts)
      .finally(() => setLoading(false));
  };

  // The initial request owns this screen's loading state.
  // eslint-disable-next-line react-hooks/set-state-in-effect
  useEffect(load, []);

  const handleDelete = async (post: BlogPost) => {
    if (!post.id) return;
    if (!window.confirm(`Delete "${post.title}"? This cannot be undone.`))
      return;
    await deletePost(post.id);
    load();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-heading text-2xl font-bold text-navy">Blog</h1>
          <p className="mt-1 text-sm text-slate-500">
            Write and manage articles for the blog.
          </p>
        </div>
        <Link to="/admin/blog/new">
          <AdminButton>
            <Plus size={16} /> New Post
          </AdminButton>
        </Link>
      </div>

      <Card className="p-0">
        {loading ? (
          <PageLoader variant="inline" />
        ) : posts.length === 0 ? (
          <p className="p-6 text-sm text-slate-500">
            No posts yet. Write your first article.
          </p>
        ) : (
          <div className="divide-y divide-gray-100">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50"
              >
                {hasMediaUrl(post.coverImageUrl) ? (
                  <img
                    src={post.coverImageUrl}
                    alt=""
                    className="h-14 w-20 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="h-14 w-20 shrink-0 rounded-lg bg-gray-100" />
                )}
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold text-navy">
                    {post.title}
                  </p>
                  <p className="truncate text-sm text-slate-500">
                    {post.author && `${post.author} · `}
                    {formatDate(post.publishedAt)}
                  </p>
                </div>
                <span
                  className={
                    post.published
                      ? "rounded-full bg-green-100 px-2.5 py-1 text-xs font-semibold text-green-700"
                      : "rounded-full bg-gray-100 px-2.5 py-1 text-xs font-semibold text-gray-500"
                  }
                >
                  {post.published ? "Published" : "Draft"}
                </span>
                <div className="flex items-center gap-1">
                  <Link
                    to={`/admin/blog/${post.id}`}
                    className="rounded-lg p-2 text-slate-500 hover:bg-royal/10 hover:text-royal"
                    title="Edit"
                  >
                    <Pencil size={16} />
                  </Link>
                  <button
                    onClick={() => handleDelete(post)}
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
