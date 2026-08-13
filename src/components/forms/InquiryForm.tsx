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
  "w-full min-w-0 max-w-full px-4 py-3 sm:px-5 rounded-xl bg-white border border-gray-200 text-base focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 transition";

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
          "rounded-2xl border border-gray-100 bg-light p-5 text-center sm:p-8 md:p-10",
          className,
        )}
      >
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-royal/10 text-royal">
          <CheckCircle2 size={30} />
        </div>
        <h3 className="font-heading text-xl font-bold text-navy sm:text-2xl">
          Thank you — your message has been received.
        </h3>
        <p className="mt-2 text-sm text-slate-600 sm:text-base">
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
        "min-w-0 rounded-2xl border border-gray-100 bg-light p-5 sm:p-8 md:p-10",
        className,
      )}
    >
      <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-gold sm:text-sm">
        {eyebrow}
      </p>
      <h3 className="mb-5 font-heading text-xl font-bold text-navy sm:mb-6 sm:text-2xl md:text-3xl">
        {title}
      </h3>

      {types && types.length > 1 && (
        <>
          <label className="mb-5 block sm:hidden">
            <span className="sr-only">Inquiry type</span>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as SubmissionType)}
              className={cn(inputClass, "cursor-pointer pr-10")}
            >
              {types.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <div className="mb-6 hidden flex-wrap gap-2 sm:flex">
            {types.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={cn(
                  "rounded-full border px-4 py-2 text-sm font-semibold transition",
                  type === t
                    ? "border-royal bg-royal text-white"
                    : "border-gray-200 bg-white text-navy hover:border-royal",
                )}
              >
                {t}
              </button>
            ))}
          </div>
        </>
      )}

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="text"
          name="firstName"
          required
          placeholder="First Name"
          autoComplete="given-name"
          className={inputClass}
        />
        <input
          type="text"
          name="lastName"
          required
          placeholder="Last Name"
          autoComplete="family-name"
          className={inputClass}
        />
      </div>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <input
          type="email"
          name="email"
          required
          placeholder="Email Address"
          autoComplete="email"
          className={inputClass}
        />
        <input
          type="tel"
          name="phone"
          required
          placeholder="Phone Number"
          autoComplete="tel"
          className={inputClass}
        />
      </div>

      <input
        type="text"
        name="organization"
        required
        placeholder="Organization"
        autoComplete="organization"
        className={cn(inputClass, "mb-4")}
      />

      {subjectLabel && (
        <input
          type="text"
          name="subject"
          required
          placeholder={subjectLabel}
          className={cn(inputClass, "mb-4")}
        />
      )}

      <textarea
        name="message"
        required
        rows={5}
        placeholder={messagePlaceholder ?? "Tell us more…"}
        className={cn(inputClass, "mb-6 min-h-32 resize-y")}
      />

      <div className="flex flex-col items-stretch gap-3 sm:flex-row sm:items-center sm:gap-4">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          disabled={submitting}
          className="w-full sm:w-auto"
        >
          {submitting && <Loader2 size={18} className="animate-spin" />}
          Send Message
        </Button>
        {error && (
          <p className="text-sm font-semibold text-red-600 sm:flex-1">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
