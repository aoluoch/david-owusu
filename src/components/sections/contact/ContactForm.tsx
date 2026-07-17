import { useState } from "react";
import { cn } from "../../../lib/utils";
import { Button } from "../../ui/Button";

export type InquiryType =
  | "Speaking Invitation"
  | "Business Inquiry"
  | "Prayer Request"
  | "Media Request"
  | "Partnership";

const inquiryTypes: InquiryType[] = [
  "Speaking Invitation",
  "Business Inquiry",
  "Prayer Request",
  "Media Request",
  "Partnership",
];

export function ContactForm() {
  const [inquiry, setInquiry] = useState<InquiryType>("Speaking Invitation");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    e.currentTarget.reset();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-8 md:p-10 rounded-2xl bg-light border border-gray-100"
    >
      <p className="text-gold font-semibold text-sm uppercase tracking-widest mb-2">
        Contact Form
      </p>
      <h3 className="font-heading text-2xl md:text-3xl font-bold text-navy mb-6">
        Send us a message
      </h3>

      <div className="flex flex-wrap gap-2 mb-6">
        {inquiryTypes.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setInquiry(t)}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-semibold transition border",
              inquiry === t
                ? "bg-royal text-white border-royal"
                : "bg-white text-navy border-gray-200 hover:border-royal",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          type="text"
          name="firstName"
          required
          placeholder="First Name"
          className="w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 transition"
        />
        <input
          type="text"
          name="lastName"
          required
          placeholder="Last Name"
          className="w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 transition"
        />
      </div>

      <div className="grid md:grid-cols-2 gap-4 mb-4">
        <input
          type="email"
          name="email"
          required
          placeholder="Email Address"
          className="w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 transition"
        />
        <input
          type="tel"
          name="phone"
          placeholder="Phone Number (optional)"
          className="w-full px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 transition"
        />
      </div>

      <input
        type="text"
        name="organization"
        placeholder="Organization (optional)"
        className="w-full mb-4 px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 transition"
      />

      <textarea
        name="message"
        required
        rows={5}
        placeholder={`Tell us more about your ${inquiry.toLowerCase()}...`}
        className="w-full mb-6 px-5 py-3 rounded-xl bg-white border border-gray-200 focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20 transition resize-y"
      />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Button type="submit" variant="primary" size="lg">
          Send Message
        </Button>
        {submitted && (
          <p className="text-royal font-semibold text-sm">
            Thank you — your message has been received.
          </p>
        )}
      </div>
    </form>
  );
}
