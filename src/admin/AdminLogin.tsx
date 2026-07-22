import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Loader2, Lock } from "lucide-react";
import { useAuth } from "../lib/AuthContext";
import { AdminButton, Field, Input } from "./components/ui";

export function AdminLogin() {
  const { login, user, configured } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const from =
    (location.state as { from?: { pathname?: string } } | null)?.from
      ?.pathname ?? "/admin";

  if (user) {
    navigate(from, { replace: true });
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Invalid email or password.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-navy px-6">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-gold text-navy">
            <Lock size={26} />
          </div>
          <h1 className="font-heading text-2xl font-bold text-white">
            Admin Sign In
          </h1>
          <p className="mt-1 text-sm text-blue-200">
            Manage the David Owusu website
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-2xl bg-white p-7 shadow-2xl"
        >
          {!configured && (
            <div className="rounded-lg bg-amber-50 p-3 text-xs text-amber-700">
              Appwrite is not configured. Set <code>VITE_APPWRITE_PROJECT_ID</code>{" "}
              in your <code>.env</code> and run <code>npm run setup:appwrite</code>.
            </div>
          )}
          <Field label="Email">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              placeholder="you@example.com"
            />
          </Field>
          <Field label="Password">
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              placeholder="••••••••"
            />
          </Field>

          {error && <p className="text-sm text-red-600">{error}</p>}

          <AdminButton
            type="submit"
            disabled={submitting || !configured}
            className="w-full"
          >
            {submitting && <Loader2 size={16} className="animate-spin" />}
            Sign In
          </AdminButton>
        </form>
      </div>
    </div>
  );
}
