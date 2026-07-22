import { useState } from "react";
import { CheckCircle2, Loader2 } from "lucide-react";
import type { SubmissionType } from "../../types/content";
import { createSubmission } from "../../lib/api";
import { cn } from "../../lib/utils";
import { Button } from "../ui/Button";

interface InquiryFormProps {
  /** The submission type saved with the message. */
  defaultType: SubmissionType;
  /** When provided, shows a type picker so the visitor can change the type. */
  types?: SubmissionType[];
  eyebrow?: string;
  title?: string;
  /** Optional extra single-line field (e.g. event, dates, engagement). */
  subjectLabel?: string;
  messagePlaceholder?: string;
  className?: string;
}

const inputClass =
  "w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 transition";

export function InquiryForm({
  defaultType,
  types,
  eyebrow = "Get in Touch",
  title = "Send a message",
  subjectLabel,
  messagePlaceholder,
  className,
}: InquiryFormProps) {
  const [type, setType] = useState<SubmissionType>(defaultType);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    const form = e.currentTarget;
    const data = new FormData(form);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    try {
      await createSubmission({
        type,
        name: [firstName, lastName].filter(Boolean).join(" "),
        email: String(data.get("email") ?? "").trim(),
        phone: String(data.get("phone") ?? "").trim(),
        organization: String(data.get("organization") ?? "").trim(),
        subject: String(data.get("subject") ?? "").trim(),
        message: String(data.get("message") ?? "").trim(),
      });
      setSubmitted(true);
      form.reset();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div
        className={cn(
          "p-8 md:p-10 rounded-2xl bg-light border border-gray-100 text-center",
          className,
        )}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-royal/10 text-royal">
          <CheckCircle2 size={30} />
        </div>
        <h3 className="font-heading text-2xl font-bold text-navy">
          Thank you — your message has been received.
        </h3>
        <p className="mt-2 text-slate-600">
          David&apos;s team will get back to you as soon as possible.
        </p>
        <button
          type="button"
          onClick={() => setSubmitted(false)}
          className="mt-6 text-sm font-semibold text-royal hover:underline"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "p-8 md:p-10 rounded-2xl bg-light border border-gray-100",
        className,
      )}
    >
      <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">
        {eyebrow}
      </p>
      <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-6">
        {title}
      </h3>

      {types && types.length > 1 && (
        <div className="flex flex-wrap gap-2 mb-6">
          {types.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setType(t)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-semibold transition border",
                type === t
                  ? "bg-royal text-white border-royal"
                  : "bg-white text-navy border-gray-200 hover:border-royal",
              )}
            >
              {t}
            </button>
          ))}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input type="text" name="firstName" required placeholder="First Name" className={inputClass} />
        <input type="text" name="lastName" required placeholder="Last Name" className={inputClass} />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input type="email" name="email" required placeholder="Email Address" className={inputClass} />
        <input type="tel" name="phone" placeholder="Phone Number (optional)" className={inputClass} />
      </div>

      <input
        type="text"
        name="organization"
        placeholder="Organization (optional)"
        className={cn(inputClass, "mb-4")}
      />

      {subjectLabel && (
        <input
          type="text"
          name="subject"
          placeholder={subjectLabel}
          className={cn(inputClass, "mb-4")}
        />
      )}

      <textarea
        name="message"
        required
        rows={5}
        placeholder={messagePlaceholder ?? "Tell us more…"}
        className={cn(inputClass, "mb-6 resize-y")}
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <Button type="submit" variant="primary" size="lg" disabled={submitting}>
          {submitting && <Loader2 size={18} className="animate-spin" />}
          Send Message
        </Button>
        {error && <p className="text-red-600 font-semibold text-sm">{error}</p>}
      </div>
    </form>
  );
}
