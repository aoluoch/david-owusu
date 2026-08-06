import { useState, type FormEvent } from "react";
import { CheckCircle2, Loader2, X } from "lucide-react";
import type { EventItem } from "../../../types/content";
import { createEventRegistration, slugify } from "../../../lib/api";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/Button";

interface EventRegistrationButtonProps {
  event: EventItem;
  variant?: "primary" | "gold" | "outline" | "outlineDark";
  size?: "md" | "lg";
  className?: string;
}

const inputClass =
  "w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-royal focus:ring-2 focus:ring-royal/20";

export function EventRegistrationButton({
  event,
  variant = "primary",
  size = "md",
  className,
}: EventRegistrationButtonProps) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (event.registrationEnabled === false) return null;

  const eventId = event.id ?? event.slug ?? slugify(event.title);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      await createEventRegistration({
        eventId,
        eventTitle: event.title,
        name: String(data.get("name") ?? "").trim(),
        email: String(data.get("email") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
      });
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Registration failed. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant={variant}
        size={size}
        className={className}
        onClick={() => {
          setOpen(true);
          setSubmitted(false);
          setError(null);
        }}
      >
        {event.ctaLabel || "Register Now"}
      </Button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-navy/70 px-4 py-8 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="event-registration-title"
        >
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl md:p-8">
            <div className="mb-5 flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                  Event Registration
                </p>
                <h2
                  id="event-registration-title"
                  className="mt-1 font-heading text-2xl font-bold text-navy"
                >
                  {event.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="rounded-full p-2 text-slate-500 transition hover:bg-gray-100 hover:text-navy"
                aria-label="Close registration form"
              >
                <X size={20} />
              </button>
            </div>

            {submitted ? (
              <div className="rounded-xl bg-green-50 p-5 text-center">
                <CheckCircle2 className="mx-auto mb-3 text-green-600" size={34} />
                <p className="font-semibold text-navy">
                  Registration received.
                </p>
                <p className="mt-1 text-sm text-slate-600">
                  Thank you. The team has your details for this event.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  className={inputClass}
                  name="name"
                  placeholder="Full Name"
                  required
                  type="text"
                />
                <input
                  className={inputClass}
                  name="email"
                  placeholder="Email Address"
                  required
                  type="email"
                />
                <input
                  className={inputClass}
                  name="phone"
                  placeholder="Phone Number"
                  required
                  type="tel"
                />
                {error && (
                  <p className="rounded-lg bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
                    {error}
                  </p>
                )}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={submitting}
                    className={cn("w-full sm:w-auto", submitting && "opacity-70")}
                  >
                    {submitting && <Loader2 size={18} className="animate-spin" />}
                    Submit Registration
                  </Button>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="rounded-full px-5 py-2.5 text-sm font-semibold text-slate-500 transition hover:bg-gray-100 hover:text-navy"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
}
